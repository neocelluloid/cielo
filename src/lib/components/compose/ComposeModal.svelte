<script>
  let { user, onclose, onpost } = $props();

  let text      = $state('');
  let loading   = $state(false);
  let error     = $state('');
  let remaining = $derived(300 - text.length);

  async function submit() {
    if (!text.trim() || loading) return;
    loading = true;
    error   = '';
    try {
      const res = await fetch('/api/post', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? 'Failed to post');
      }
      text = '';
      onpost?.();
      onclose?.();
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') onclose?.();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="overlay"
  onclick={onclose}
  role="dialog"
  aria-modal="true"
>
  <div class="modal" onclick={e => e.stopPropagation()}>

    <div class="modal-header">
      <div class="user-info">
        {#if user.avatar}
          <img class="avatar" src={user.avatar} alt={user.handle} />
        {:else}
          <div class="avatar-placeholder">
            {user.displayName[0].toUpperCase()}
          </div>
        {/if}
        <div class="user-meta">
          <span class="display">{user.displayName}</span>
          <span class="handle">@{user.handle}</span>
        </div>
      </div>
      <button class="close-btn" onclick={onclose}>✕</button>
    </div>

    <textarea
      bind:value={text}
      placeholder="What's on your mind?"
      maxlength="300"
      autofocus
      rows="5"
    ></textarea>

    {#if error}
      <p class="error-msg">{error}</p>
    {/if}

    <div class="modal-footer">
      <span
        class="counter"
        class:warn={remaining < 50}
        class:danger={remaining < 0}
      >
        {remaining}
      </span>
      <button
        class="post-btn"
        onclick={submit}
        disabled={!text.trim() || remaining < 0 || loading}
      >
        {loading ? 'Posting…' : 'Post'}
      </button>
    </div>

  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=Instrument+Sans:wght@400;500&display=swap');

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
    backdrop-filter: blur(2px);
  }

  .modal {
    background: #ffffff;
    border-radius: 16px;
    width: 100%;
    max-width: 520px;
    border: 1px solid #e8e8e4;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0ec;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e8e8e4;
  }

  .avatar-placeholder {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #eef5ff;
    color: #0085ff;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-meta {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .display {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #111;
  }

  .handle {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    color: #aaa;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 14px;
    color: #bbb;
    cursor: pointer;
    padding: 6px;
    line-height: 1;
    border-radius: 50%;
    transition: background 0.12s, color 0.12s;
  }

  .close-btn:hover {
    background: #f5f5f5;
    color: #111;
  }

  textarea {
    width: 100%;
    padding: 16px 20px;
    border: none;
    outline: none;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    line-height: 1.65;
    color: #111;
    resize: none;
    background: #ffffff;
    min-height: 140px;
  }

  textarea::placeholder {
    color: #ccc;
    font-style: italic;
  }

  .error-msg {
    margin: 0 20px;
    padding: 10px 12px;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #e53e3e;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-top: 1px solid #f0f0ec;
  }

  .counter {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #ccc;
    letter-spacing: 0.04em;
    transition: color 0.12s;
    min-width: 28px;
  }

  .counter.warn   { color: #f6ad55; }
  .counter.danger { color: #e53e3e; }

  .post-btn {
    height: 36px;
    padding: 0 20px;
    background: #0085ff;
    color: #ffffff;
    border: none;
    border-radius: 99px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .post-btn:hover    { opacity: 0.88; }
  .post-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>