<script>
  let { post, expanded = false } = $props();

  const author = $derived(post.author ?? {});
  const record = $derived(post.record ?? {});

  const images = $derived(
    post.embed?.$type === 'app.bsky.embed.images#view'
      ? post.embed.images
      : []
  );

  const video = $derived(
    post.embed?.$type === 'app.bsky.embed.video#view'
      ? post.embed
      : null
  );

  const externalEmbed = $derived(
    post.embed?.$type === 'app.bsky.embed.external#view'
      ? post.embed.external
      : null
  );
</script>

<article>
  <header>
    <div class="avatar">
      {#if post.author.avatar}
        <img src={post.author.avatar} alt="" loading="lazy" />
      {:else}
        {post.author.displayName?.[0] ?? post.author.handle?.[0] ?? '?'}
      {/if}
    </div>
    <div class="meta">
      <a href="/profile/{post.author.handle}" class="display">
        {post.author.displayName || post.author.handle}
      </a>
      <span class="handle">@{post.author.handle}</span>
    </div>
    <span class="time">{timeAgo(post.record.createdAt)}</span>
  </header>

  <p class="text">{post.record.text}</p>

  {#if images.length}
    <img
      src={images[0].thumb}
      alt={images[0].alt ?? ''}
      loading="lazy"
    />

  {:else if video}
    <div class="video-wrap">
      {#if video.playlist}
        <div class="video-ratio">
          <video
            controls
            playsinline
            preload="metadata"
            poster={video.thumbnail || undefined}
          >
            <source src={video.playlist} type="application/x-mpegURL" />
          </video>
        </div>
      {:else if video.thumbnail}
        <div class="video-thumb">
          <img src={video.thumbnail} alt={video.alt ?? 'Video'} loading="lazy" />
          <div class="play-badge">▶</div>
        </div>
      {/if}
    </div>

  {:else if externalEmbed}
    <a class="external-card" href={externalEmbed.uri} target="_blank" rel="noopener noreferrer">
      {#if externalEmbed.thumb}
        <img src={externalEmbed.thumb} alt={externalEmbed.title ?? ''} loading="lazy" />
      {/if}
      <div class="external-meta">
        <span class="external-title">{externalEmbed.title ?? externalEmbed.uri}</span>
        <span class="external-domain">{new URL(externalEmbed.uri).hostname}</span>
      </div>
    </a>
  {/if}

  <footer>
    <span>💬 {post.replyCount}</span>
    <span>🔁 {post.repostCount}</span>
    <span>❤️ {post.likeCount}</span>
    {#if !expanded && post.replyCount > 0}
      
      <a href="/post/{encodeURIComponent(post.uri)}"
        class="view-thread"
      >
        View thread →
      </a>

  </footer>
</article>

<script context="module">
  function timeAgo(iso) {
    if (!iso) return '';
    const s = (Date.now() - new Date(iso)) / 1000;
    if (s < 60)    return `${Math.floor(s)}s`;
    if (s < 3600)  return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`;
    return `${Math.floor(s / 86400)}d`;
  }
</script>

<style>
  article {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #e8f0fe;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: #0085ff;
    overflow: hidden;
    flex-shrink: 0;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e8e8e4;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center top;  /* favour top of image for portraits */
  }
  .meta {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .display {
    font-family: 'Instrument-Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #111;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .display:hover { text-decoration: underline; }
  .handle {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 400;
    color: #aaa;
    letter-spacing: 0.01em;
  }
   /* RichText post body */
  article :global(.post-body) {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.7;
    color: #222;
    letter-spacing: 0.01em;
  }

  /* TimeAgo */
  article :global(.time) {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #ccc;
    flex-shrink: 0;
  }

/*  .time   { font-size: 12px; color: #aaa; flex-shrink: 0; }
  .text   { font-size: 14px; line-height: 1.65; color: #111; white-space: pre-wrap; word-break: break-word; }
*/  .embed  { width: 100%; border-radius: 8px; border: 1px solid #e8e8e8; max-height: 300px; object-fit: cover; display: block; }
  footer  { display: flex; gap: 1.25rem; padding-top: 0.5rem; border-top: 1px solid #f0f0f0; font-size: 13px; color: #888; }
  .video-wrap {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e8e8e4;
  background: #000;
}

/* locks aspect ratio to 16:9 before metadata loads */
.video-ratio {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-ratio video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 0;
  border: none;
  object-fit: contain;
  background: #000;
}
  .post-link {
    text-decoration: none;
    color: inherit;
  }

  .post-link:hover .post-body {
    color: #0085ff;
  }

  .view-thread {
    margin-left: auto;
    font-family: 'Syne', sans-serif;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #0085ff;
    text-decoration: none;
  }

  .view-thread:hover { text-decoration: underline; }

</style>


