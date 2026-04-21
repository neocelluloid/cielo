import { BSKY_HANDLE, BSKY_APP_PASSWORD } from '$env/static/private';
import { ensureSession, getProfile, getAuthorFeed } from '$lib/api/bluesky';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
		const [profile, feed] = await Promise.all([
			getProfile(params.handle),
			getAuthorFeed(params.handle),
		]);
		const posts = (feed.feed ?? []).filter(item => item?.post?.uri);
		return {profile, posts};
	} catch(e) {
	    if (e.status === 401) {
	      // session expired mid-request — reset and retry once
	      session.session = null;
	      await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
	      const data = await getFeed(feedUri);
	      return { posts: data.feed ?? [] };
	    }
	    throw error(500, e.message);
  	}
}
