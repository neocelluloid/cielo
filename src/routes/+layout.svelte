<script>
  import { page }          from '$app/stores';
  import { goto, afterNavigate } from '$app/navigation';
  import Sidebar           from '$lib/components/layout/Sidebar.svelte';
  import ComposeModal      from '$lib/components/compose/ComposeModal.svelte';

  let { data } = $props();

  let query       = $state($page.url.searchParams.get('q') ?? '');
  let mainEl      = $state(null);
  let showCompose = $state(false);

  $effect(() => {
    query = $page.url.searchParams.get('q') ?? '';
  });

  afterNavigate(({ type }) => {
    if (type !== 'popstate') {
      mainEl?.scrollTo({ top: 0, behavior: 'instant' });
    }
  });

  function handleSearch(e) {
    if (e.key === 'Enter' && query.trim()) {
      goto(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }
</script>

<div class="shell">
  <Sidebar currentUri={$page.params.uri ?? ''} />

  <div class="main">
    <header class="topbar">
      <div class="search-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search Cielo…"
          bind:value={query}
          onkeydown={handleSearch}
        />
      </div>

      <div class="topbar-actions">
        {#if data.user}
          <button class="compose-btn" onclick={() => showCompose = true}>
            + Post
          </button>
          <a href="/logout" class="user-chip">
            {#if data.user.avatar}
              <img src={data.user.avatar} alt={data.user.handle} />
            {:else}
              <span>{data.user.displayName[0]}</span>
            {/if}
          </a>
        {:else}
          <a href="/login" class="login-link">Sign in</a>
        {/if}
      </div>
    </header>

    <main bind:this={mainEl}>
      <slot />
    </main>
  </div>
</div>

{#if showCompose && data.user}
  <ComposeModal
    user={data.user}
    onclose={() => showCompose = false}
    onpost={() => showCompose = false}
  />
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=Instrument+Sans:wght@400;500&display=swap');

  .shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f7f7f5;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: #fafaf8;
    border-bottom: 1px solid #e8e8e4;
    flex-shrink: 0;
  }

  .search-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1px solid #e8e8e4;
    border-radius: 10px;
    padding: 0 14px;
    height: 40px;
    transition: border-color 0.15s;
  }

  .search-wrap:focus-within {
    border-color: #0085ff;
    box-shadow: 0 0 0 3px rgba(0,133,255,0.08);
  }

  .search-icon {
    width: 15px;
    height: 15px;
    color: #bbb;
    flex-shrink: 0;
    transition: color 0.15s;
  }

  .search-wrap:focus-within .search-icon { color: #0085ff; }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    color: #111;
  }

  input::placeholder {
    color: #ccc;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .compose-btn {
    height: 36px;
    padding: 0 16px;
    background: #0085ff;
    color: #ffffff;
    border: none;
    border-radius: 99px;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .compose-btn:hover  { opacity: 0.88; }

  .user-chip {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 1.5px solid #e8e8e4;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eef5ff;
    color: #0085ff;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    transition: border-color 0.12s;
  }

  .user-chip:hover  { border-color: #0085ff; }
  .user-chip img    { width: 100%; height: 100%; object-fit: cover; }

  .login-link {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0085ff;
    text-decoration: none;
    padding: 0 4px;
  }

  .login-link:hover { text-decoration: underline; }

  main {
    flex: 1;
    overflow-y: auto;
  }
</style>