<!-- src/routes/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { goto, afterNavigate } from '$app/navigation';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';

  let query = $state($page.url.searchParams.get('q') ?? '');
  let mainEl = $state(null);

  // persist query value in search bar even after navigation
  $effect(() => {
    query = $page.url.searchParams.get('q') ?? '';
  });


  function handleSearch(e) {
    if (e.key === 'Enter' && query.trim()) {
      goto(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  // reset scroll on every navigation
  afterNavigate(() => {
    mainEl?.scrollTo({ top: 0, behavior: 'instant' });
  });

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
    </header>
    <main bind:this={mainEl}>
      <slot />
    </main>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500&family=Instrument+Sans:wght@400;500&display=swap');

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
    padding: 14px 20px;
    background: #fafaf8;
    border-bottom: 1px solid #e8e8e4;
    flex-shrink: 0;
  }

  .search-wrap {
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
    box-shadow: 0 0 0 3px rgba(0, 133, 255, 0.08);
  }

  .search-icon {
    width: 15px;
    height: 15px;
    color: #bbb;
    flex-shrink: 0;
    transition: color 0.15s;
  }

  .search-wrap:focus-within .search-icon {
    color: #0085ff;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    color: #111;
    letter-spacing: 0.01em;
  }

  input::placeholder {
    color: #ccc;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  main {
    flex: 1;
    overflow-y: auto;
  }
</style>