<script>
  import PostCard from '$lib/components/feed/PostCard.svelte';

  let { data } = $props();

  const { profile, posts } = $derived(data);
</script>

<div class="profile-page">
  <div class="profile-header">
    {#if profile.banner}
      <div class="banner">
        <img src={profile.banner} alt="" />
      </div>
    {/if}

    <div class="profile-body">
      <div class="avatar-wrap">
        {#if profile.avatar}
          <img class="avatar" src={profile.avatar} alt={profile.handle} />
        {:else}
          <div class="avatar-placeholder">
            {(profile.displayName ?? profile.handle)[0].toUpperCase()}
          </div>
        {/if}
      </div>

      <div class="profile-info">
        <h1 class="display-name">{profile.displayName ?? profile.handle}</h1>
        <p class="handle">@{profile.handle}</p>
        {#if profile.description}
          <p class="bio">{profile.description}</p>
        {/if}
        <div class="stats">
          <span><strong>{profile.followersCount ?? 0}</strong> followers</span>
          <span><strong>{profile.followsCount ?? 0}</strong> following</span>
          <span><strong>{profile.postsCount ?? 0}</strong> posts</span>
        </div>
      </div>
    </div>
  </div>

  <div class="posts">
    {#if !posts.length}
      <p class="empty">No posts yet.</p>
    {:else}
      {#each posts as item (item.post.cid)}
        <PostCard post={item.post} />
      {/each}
    {/if}
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Instrument+Sans:wght@400;500&display=swap');

  .profile-page {
    display: flex;
    flex-direction: column;
  }

  .profile-header {
    background: #ffffff;
    border-bottom: 1px solid #e8e8e4;
    margin-bottom: 16px;
  }

  .banner {
    width: 100%;
    height: 160px;
    overflow: hidden;
    background: #f0f0ec;
  }

  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-body {
    padding: 0 24px 20px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .avatar-wrap {
    margin-top: -28px;
    flex-shrink: 0;
  }

  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    object-fit: cover;
    display: block;
  }

  .avatar-placeholder {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    background: #eef5ff;
    color: #0085ff;
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-info {
    padding-top: 10px;
    min-width: 0;
    flex: 1;
  }

  .display-name {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: #111;
    margin: 0 0 2px;
  }

  .handle {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    color: #aaa;
    margin: 0 0 10px;
  }

  .bio {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    line-height: 1.65;
    color: #444;
    margin: 0 0 12px;
    white-space: pre-wrap;
  }

  .stats {
    display: flex;
    gap: 16px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 12.5px;
    color: #888;
  }

  .stats strong {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: #111;
    font-size: 13px;
  }

  .posts {
    padding: 0 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .empty {
    font-family: 'Instrument Sans', sans-serif;
    font-size: 14px;
    color: #aaa;
    text-align: center;
    padding: 2rem;
  }
</style>