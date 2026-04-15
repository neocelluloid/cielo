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
		throw error(404, `Profile not found: ${params.handle}`);

	}
}