export async function load({ params }) {
  try {
    await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
    const data = await getPostThread(decodeURIComponent(params.uri));
    return { thread: data.thread };
  } catch (e) {
    if (e.status === 401) {
      botSession.session = null;
      await ensureSession(BSKY_HANDLE, BSKY_APP_PASSWORD);
      const data = await getPostThread(decodeURIComponent(params.uri));
      return { thread: data.thread };
    }
    throw error(404, `Post not found: ${e.message}`);
  }
}