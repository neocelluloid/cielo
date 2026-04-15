<script>
  import PostCard from '$lib/components/feed/PostCard.svelte';
  import { searchPosts } from '$lib/api/bluesky';

  let { data } = $props();

  let allPosts    = $state(data.posts ?? []);
  let nextCursor  = $state(data.nextCursor ?? null);
  let loadingMore = $state(false);
  let exhausted   = $state(!data.nextCursor);
  let sentinel    = $state(null); // ref to the sentinel div

  // reset when query changes
  $effect(() => {
    allPosts   = data.posts ?? [];
    nextCursor = data.nextCursor ?? null;
    exhausted  = !data.nextCursor;
  });

  // wire up IntersectionObserver to the sentinel element
  $effect(() => {
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || loadingMore || exhausted) return;
        await loadMore();
      },
      { rootMargin: '200px' } // trigger 200px before sentinel is visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect(); // cleanup on destroy
  });

  async function loadMore() {
    if (!nextCursor || loadingMore || exhausted) return;
    loadingMore = true;
    try {
      const url = `/api/search?q=${encodeURIComponent(data.query)}&cursor=${encodeURIComponent(nextCursor)}`;
      const res  = await fetch(url);          // calls your Node.js server
      const more = await res.json();          // Node.js calls BlueSky with auth
      allPosts   = [...allPosts, ...more.posts];
      nextCursor = more.nextCursor ?? null;
      exhausted  = !more.nextCursor || !more.posts.length;
    } catch (e) {
      console.error('Failed to load more:', e);
    } finally {
      loadingMore = false;
    }
}

  // async function loadMore() {
  //   if (!nextCursor || loadingMore || exhausted) return;
  //   loadingMore = true;
  //   try {
  //     const more = await searchPosts(data.query, nextCursor);
  //     const newPosts = (more.posts ?? []).filter(p => p?.uri);
  //     allPosts   = [...allPosts, ...newPosts];
  //     nextCursor = more.cursor ?? null;
  //     exhausted  = !more.cursor || !newPosts.length;
  //   } catch (e) {
  //     console.error('Failed to load more:', e);
  //   } finally {
  //     loadingMore = false;
  //   }
  // }
</script>

<div class="search-page">
  {#if !data.query}
    <div class="empty-state">
      <span class="empty-icon">⌕</span>
      <p class="empty-title">Search Cielo</p>
      <p class="empty-sub">Type something in the search bar above</p>
    </div>

  {:else if !allPosts.length && !loadingMore}
    <div class="empty-state">
      <span class="empty-icon">◌</span>
      <p class="empty-title">No results</p>
      <p class="empty-sub">Nothing found for <em>{data.query}</em></p>
    </div>

  {:else}
    <div class="results-header">
      <span class="results-query">{data.query}</span>
      <span class="results-count">{allPosts.length} results</span>
    </div>

    <div class="posts">
      {#each allPosts as post (post.cid)}
        <PostCard {post} />
      {/each}
    </div>

    <!-- sentinel — observed by IntersectionObserver -->
    <div bind:this={sentinel} class="sentinel">
      {#if loadingMore}
        <div class="spinner"></div>
      {:else if exhausted}
        <p class="exhausted">— end of results —</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Instrument+Sans:wght@400;500&display=swap');

  .search-page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 40px;
    color: #ddd;
    margin-bottom: 16px;
    display: block;
    font-family: 'Syne', sans-serif;
  }

  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #bbb;
    margin: 0 0 6px;
    letter-spacing: 0.02em;
  }

  .empty-sub {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #ccc;
    margin: 0;
  }

  .empty-sub em {
    font-style: italic;
    color: #aaa;
  }

  .results-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 1px solid #e8e8e4;
    background: #fafaf8;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .results-query {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #111;
    letter-spacing: 0.02em;
  }

  .results-count {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #bbb;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .posts {
    padding: 14px 16px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sentinel {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
    min-height: 80px;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e8e8e4;
    border-top-color: #0085ff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .exhausted {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ddd;
    margin: 0;
  }
</style>

<!-- <script>
  import PostCard from '$lib/components/feed/PostCard.svelte';

  let { data } = $props();
</script>

<div class="search-page">
  {#if !data.query}
    <div class="empty-state">
      <span class="empty-icon">⌕</span>
      <p class="empty-title">Search Cielo</p>
      <p class="empty-sub">Type something in the search bar above</p>
    </div>

  {:else if !data.posts.length}
    <div class="empty-state">
      <span class="empty-icon">◌</span>
      <p class="empty-title">No results</p>
      <p class="empty-sub">Nothing found for <em>{data.query}</em></p>
    </div>

  {:else}
    <div class="results-header">
      <span class="results-query">{data.query}</span>
      <span class="results-count">{data.posts.length} results</span>
    </div>

    <div class="posts">
      {#each data.posts as post (post.cid)}
        <PostCard {post} />
      {/each}
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Instrument+Sans:wght@400;500&display=swap');

  .search-page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 40px;
    color: #ddd;
    margin-bottom: 16px;
    display: block;
    font-family: 'Syne', sans-serif;
  }

  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #bbb;
    margin: 0 0 6px;
    letter-spacing: 0.02em;
  }

  .empty-sub {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #ccc;
    margin: 0;
  }

  .empty-sub em {
    font-style: italic;
    color: #aaa;
  }

  .results-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 1px solid #e8e8e4;
    background: #fafaf8;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .results-query {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #111;
    letter-spacing: 0.02em;
  }

  .results-count {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #bbb;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .posts {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style> -->