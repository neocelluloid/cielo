// fetch posts using app credentials here. this file only ever runs on server (in node.js)
import { BSKY_HANDLE, BSKY_APP_PASSWORD } from '$env/static/private';
import { ensureSession, getFeed, agent } from '$lib/api/bluesky';
import { error } from '@sveltejs/kit';

const FEED_URIS = {
  'discover':      'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
  'with-friends':  'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/with-friends',
  'videos':        'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/thevids',
  'best-of':       'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/best-of-follows',
};

const DEFAULT_FEED = FEED_URIS['discover'];

export async function load({ params }) {
  const feedUri = FEED_URIS[params.uri]
               ?? decodeURIComponent(params.uri)
               ?? DEFAULT_FEED;

  try {

    await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
    // temporary — find correct URIs
    const result = await agent.app.bsky.feed.getActorFeeds({ actor: 'bsky.app' });
    console.log(result);
    // const feeds = JSON.parse(JSON.stringify(result.data.feeds));
    // console.log(feeds.map(f => ({ name: f.displayName, uri: f.uri })));

    const data = await getFeed(feedUri);
    // console.log(data);
    const posts = (data.feed ?? [])
      .filter(item => item?.post?.uri)
      .map(item => JSON.parse(JSON.stringify(item))); // strip to plain objects

    // temporary — see what embed types exist in the video feed
    posts.forEach(item => {
    if (item.post.embed) {
      console.log('embed type:', item.post.embed.$type);
    }
});
    return {
      posts,
      feedUri,
      slug: params.uri,
    };
  } 
  catch (e) 
  {
    throw error(500, `Could not load feed: ${e.message}`);
  }
}