<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Instrument+Sans:wght@400;500&family=Cormorant:ital,wght@1,300;1,400&display=swap" rel="stylesheet">
</svelte:head>

<div class="welcome">
  <div class="inner">

    <div class="logo">
      <div class="logo-dot"></div>
      <span class="logo-text">Cielo</span>
    </div>

    <h1 class="heading">
      The sky,<br>
      <em>open to all.</em>
    </h1>

    <p class="body">
      A quiet place to read the web's most open social network.
      Choose a feed from the sidebar to begin.
    </p>

    <div class="feeds-hint">
      <span class="hint-label">Available feeds</span>
      <div class="hint-feeds">
        <a href="/feed/discover"     class="hint-feed">✦ Discover</a>
        <a href="/feed/with-friends" class="hint-feed">👥 Popular with friends</a>
        <a href="/feed/videos"       class="hint-feed">🎬 Video</a>
        <a href="/feed/best-of"      class="hint-feed">⭐ Best of follows</a>
      </div>
    </div>

  </div>
</div>

<style>
  .welcome {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    background: #f7f7f5;
  }

  .inner {
    max-width: 480px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0085ff;
    flex-shrink: 0;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #111;
  }

  .heading {
    font-family: 'Cormorant', serif;
    font-size: 52px;
    font-weight: 300;
    line-height: 1.1;
    color: #111;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .heading em {
    font-style: italic;
    color: #0085ff;
  }

  .body {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    color: #666;
    margin: 0;
  }

  .feeds-hint {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e8e8e4;
    border-radius: 12px;
  }

  .hint-label {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #bbb;
  }

  .hint-feeds {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .hint-feed {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    color: #444;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background 0.12s, border-color 0.12s, color 0.12s;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hint-feed:hover {
    background: #eef5ff;
    border-color: #0085ff;
    color: #0085ff;
  }
</style>