// src/routes/api/search/+server.js
import { BSKY_HANDLE, BSKY_APP_PASSWORD } from '$env/static/private';
import { ensureSession, searchPosts } from '$lib/api/bluesky';
import { json } from '@sveltejs/kit';

// src/routes/api/search/+server.ts
export async function GET({ url }) {
  const query  = url.searchParams.get('q')      ?? '';
  const cursor = url.searchParams.get('cursor') ?? '';

  await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
  const data = await searchPosts(query, cursor);
  const posts = (data.posts ?? []).filter(p => p?.uri);

  console.log('cursor in:', cursor);
  console.log('cursor out:', data.cursor);   // ← check this in terminal
  console.log('posts returned:', posts.length);

  return json({ posts, nextCursor: data.cursor ?? null });
}