import { BSKY_HANDLE, BSKY_APP_PASSWORD } from '$env/static/private';
import { ensureSession, searchPosts } from '$lib/api/bluesky';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const query = url.searchParams.get('q') ?? '';
	if (!query.trim()) {
		return { posts: [], query: '' };
	}
	try {
		await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
		const data = await searchPosts(query);
		const posts = (data.posts ?? []).filter(item => item?.uri);
		return { posts, query };
	} catch(e) {
		throw error(500, `Search failed: ${e.message}`);
	}
}