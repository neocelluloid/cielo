<script>
  // import Avatar from '$lib/components/shared/Avatar.svelte';
  // import TimeAgo from '$lib/components/shared/TimeAgo.svelte';

  let { node, depth = 0 } = $props();

  const post    = $derived(node.post ?? {});
  const author  = $derived(post.author ?? {});
  const record  = $derived(post.record ?? {});
  const replies = $derived(
    (node.replies ?? [])
      .filter(r => r?.post?.uri)
      .sort((a, b) => (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0))
  );

  // collapse deep threads
  const MAX_DEPTH  = 4;
  let expanded     = $state(depth < 2);
</script>

<div class="reply" style="--depth: {Math.min(depth, MAX_DEPTH)}">
  <div class="reply-line"></div>

  <div class="reply-body">
    <div class="reply-header">
      <a href="/profile/{author.handle}" class="author-link">
        <Avatar {author} size={28} />
      </a>
      <div class="meta">
        <a href="/profile/{author.handle}" class="display">
          {author.displayName ?? author.handle}
        </a>
        <span class="handle">@{author.handle}</span>
      </div>
      <!-- <TimeAgo iso={record.createdAt} /> -->
    </div>

    <p class="reply-text">{record.text ?? ''}</p>

    <div class="reply-footer">
      <span class="stat">💬 {post.replyCount  ?? 0}</span>
      <span class="stat">🔁 {post.repostCount ?? 0}</span>
      <span class="stat">❤️ {post.likeCount   ?? 0}</span>
    </div>

    {#if replies.length && depth < MAX_DEPTH}
      {#if expanded}
        <div class="nested-replies">
          {#each replies as reply (reply.post.cid)}
            <svelte:self node={reply} depth={depth + 1} />
          {/each}
        </div>
      {:else}
        <button class="expand-btn" onclick={() => expanded = true}>
          Show {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
        </button>
      {/if}
    {/if}
  </div>
</div>

<style>
  .reply {
    display: flex;
    gap: 10px;
    padding-left: calc(var(--depth) * 20px);
  }

  .reply-line {
    width: 1px;
    background: #e8e8e4;
    flex-shrink: 0;
    margin: 28px 0 0 13px;
    align-self: stretch;
  }

  .reply-body {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    background: #ffffff;
    border: 1px solid #e8e8e4;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .reply-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .author-link {
    flex-shrink: 0;
    text-decoration: none;
  }

  .meta {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
    flex-wrap: wrap;
  }

  .display {
    font-family: 'Syne', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    color: #111;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .display:hover { text-decoration: underline; }

  .handle {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #aaa;
    white-space: nowrap;
  }

  .reply-text {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    line-height: 1.65;
    color: #222;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .reply-footer {
    display: flex;
    gap: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 10.5px;
    letter-spacing: 0.06em;
    color: #bbb;
  }

  .stat { display: flex; align-items: center; gap: 4px; }

  .nested-replies {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .expand-btn {
    align-self: flex-start;
    background: none;
    border: 1px solid #e8e8e4;
    border-radius: 99px;
    padding: 4px 12px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #0085ff;
    cursor: pointer;
    transition: background 0.12s;
    margin-top: 4px;
  }

  .expand-btn:hover { background: #eef5ff; }
</style>