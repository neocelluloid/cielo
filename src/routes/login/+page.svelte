<script>
  import { enhance } from '$app/forms';

  let { form } = $props();
  let loading  = $state(false);
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="login-page">
  <div class="login-card">
    <h1 class="title">Cielo</h1>
    <p class="subtitle">Sign in to post</p>

    <form method="POST" use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        await update();
        loading = false;
      };
    }}>
      <div class="field">
        <label for="handle">Handle</label>
        <input
          id="handle"
          name="handle"
          type="text"
          placeholder="you.bsky.social"
          autocomplete="username"
        />
      </div>

      <div class="field">
        <label for="password">App password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="xxxx-xxxx-xxxx-xxxx"
          autocomplete="current-password"
        />
        <span class="hint">Generate at Settings → App Passwords</span>
      </div>

      {#if form?.error}
        <p class="error">{form.error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f5;
    padding: 2rem;
  }

  .login-card {
    background: #ffffff;
    border: 1px solid #e8e8e4;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
  }

  .title {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #111;
    margin: 0 0 4px;
  }

  .subtitle {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #aaa;
    margin: 0 0 2rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 1rem;
  }

  label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #888;
  }

  input {
    height: 40px;
    padding: 0 12px;
    border: 1px solid #e8e8e4;
    border-radius: 8px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 14px;
    color: #111;
    background: #fafaf8;
    transition: border-color 0.15s;
    outline: none;
  }

  input:focus {
    border-color: #0085ff;
    box-shadow: 0 0 0 3px rgba(0,133,255,0.08);
  }

  .hint {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #ccc;
  }

  .error {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #e53e3e;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    height: 40px;
    background: #0085ff;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.15s;
    margin-top: 0.5rem;
  }

  button:hover    { opacity: 0.88; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>