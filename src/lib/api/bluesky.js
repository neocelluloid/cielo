import { BskyAgent, Agent, CredentialSession } from '@atproto/api';

const session = new CredentialSession(new URL('https://bsky.social'))
export const agent = new Agent(session); 

let sessionReady = false;
let handle       = '';
let password     = '';

export async function ensureSession(handle, password) {
  if (sessionReady) return;
  await session.login({
    identifier: handle,
    password,
  });
  sessionReady = true;
}

// export const agent = new BskyAgent({ service: 'https://bsky.social', });

// export async function ensureSession(h, p) {
//   handle   = h;
//   password = p;
//   if (sessionReady) return;
//   await login();
// }

// async function login() {
//   await agent.login({ identifier: handle, password });
//   // await _agent.login({ identifier: handle, password });
//   sessionReady = true;
// }

async function withSession(fn) {
  try {
    return await fn();
  } catch (e) {
    if (e.status === 401) {
      // session expired — re-login and retry once
      sessionReady = false;
      await login();
      return await fn();
    }
    throw e;
  }
}


// let sessionReady = false;

// export async function ensureSession(handle, password) {
//   if (sessionReady) return;
//   if (!handle || !password) {
//     throw new Error(
//       `Missing credentials — handle: "${handle}", password: "${password ? '***' : 'undefined'}"`
//     );
//   }
//   console.log(handle, password);

//   await agent.login({ identifier: handle, password });
//   sessionReady = true;
// }


// async function ensureSession() {
//   if (sessionReady) return;
//   await agent.login({
//     identifier: import.meta.env.VITE_BSKY_HANDLE,
//     password:   import.meta.env.VITE_BSKY_APP_PASSWORD,
//   });
//   sessionReady = true;
// }

export async function getFeed(feedUri, signal, cursor = '') {
  await ensureSession();
  const res = await agent.app.bsky.feed.getFeed({
    feed:   feedUri,
    limit:  30,
    cursor: cursor || undefined,
  });
  return res.data;
}

export async function getProfile(handle) {
  const res = await agent.app.bsky.actor.getProfile({ actor: handle });
  return JSON.parse(JSON.stringify(res.data));
}

export async function getAuthorFeed(handle, cursor = '') {
  const res = await agent.app.bsky.feed.getAuthorFeed({
    actor:  handle,
    limit:  30,
    cursor: cursor || undefined,
  });
  return JSON.parse(JSON.stringify(res.data));
}

export async function searchPosts(query, cursor = '') {
  const res = await agent.app.bsky.feed.searchPosts({
    q:      query,
    limit:  25,
    cursor: cursor || undefined,
  });
  return JSON.parse(JSON.stringify(res.data)); // { posts: [...], cursor }
}