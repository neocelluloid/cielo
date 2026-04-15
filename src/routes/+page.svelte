<!-- <script>
  import PostCard from '$lib/components/feed/PostCard.svelte';

  let { data } = $props();
</script>

{#if !data.posts?.length}
  <div class="state">No posts found.</div>
{:else}
  <div class="feed">
    {#each data.posts as item (item.post.cid)}
      <PostCard post={item.post} />
    {/each}
  </div>
{/if}

<style>
  .feed {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }

  .state {
    padding: 2rem;
    text-align: center;
    color: #888;
    font-size: 14px;
  }
</style> -->