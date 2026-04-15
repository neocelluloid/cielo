<script>
  let { currentUri = '' } = $props();

  const feeds = [
    { slug: 'discover',     name: 'Discover',             description: 'Top posts across BlueSky',          icon: '✦' },
    { slug: 'with-friends', name: 'Popular with friends', description: 'Posts popular in your network',     icon: '👥' },
    { slug: 'videos',       name: 'Video',                description: 'Videos from across BlueSky',        icon: '🎬' },
    { slug: 'whats-hot',    name: "What's hot classic",   description: 'Classic hot feed',                  icon: '🔥' },
    { slug: 'best-of',      name: 'Best of follows',      description: 'Best posts from people you follow', icon: '⭐' },
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<aside>
  <div class="wordmark">
    <span class="wordmark-text">Cielo</span>
    <div class="wordmark-rule"></div>
  </div>

  <nav>
    <p class="label">Feeds</p>
    {#each feeds as feed (feed.slug)}
      
      <a  href="/feed/{feed.slug}"
        class:active={currentUri === feed.slug}
      >
        <span class="icon">{feed.icon}</span>
        <div class="feed-meta">
          <span class="name">{feed.name}</span>
          <span class="desc">{feed.description}</span>
        </div>
      </a>
    {/each}
  </nav>

  <footer>
    <span class="footer-text">the sky, open to all</span>
  </footer>
</aside>

<style>
  aside {
    width: 33%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fafaf8;
    border-right: 1px solid #e8e8e4;
    overflow: hidden;
    font-family: 'Instrument Sans', sans-serif;
  }

  .wordmark {
    padding: 24px 22px 20px;
    border-bottom: 1px solid #e8e8e4;
    flex-shrink: 0;
  }

  .wordmark-text {
    display: block;
    font-family: 'Instrument Sans', serif;
    font-size: 36px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: 0.01em;
    color: #111;
    line-height: 1;
    margin-bottom: 10px;
  }

  .wordmark-rule {
    height: 1px;
    background: linear-gradient(to right, #0085ff 30%, transparent 100%);
    width: 100%;
  }

  nav {
    flex: 1;
    overflow-y: auto;
    padding: 14px 10px;
  }

  nav::-webkit-scrollbar { width: 3px; }
  nav::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 99px;
  }

  .label {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #bbb;
    padding: 4px 12px 10px;
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #666;
    transition: background 0.12s, color 0.12s;
    border-left: 2px solid transparent;
    margin-bottom: 2px;
  }

  a:hover {
    background: #f0f0ec;
    color: #111;
  }

  a.active {
    background: #eef5ff;
    color: #0085ff;
    border-left-color: #0085ff;
  }

  .icon {
    font-size: 14px;
    flex-shrink: 0;
    width: 22px;
    text-align: center;
    opacity: 0.8;
  }

  .feed-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .name {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .desc {
    font-family: 'Cormorant', serif;
    font-size: 12.5px;
    font-weight: 400;
    font-style: italic;
    color: #aaa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  a.active .name { color: #0085ff; }
  a.active .desc { color: #7ab8ff; }

  footer {
    padding: 14px 22px;
    border-top: 1px solid #e8e8e4;
    flex-shrink: 0;
  }

  .footer-text {
    font-family: 'Cormorant', serif;
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    color: #ccc;
    letter-spacing: 0.04em;
  }
</style>