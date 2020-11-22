<script lang="ts">
  // Dependencies
  import { createEventDispatcher } from "svelte";

  // Props
  export let hasClose: boolean = false;
  // Component Events
  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("close");
  };
</script>

<style lang="postcss">
  .overlay {
    @apply fixed bg-gray-500 opacity-50 h-screen w-screen inset-0 z-10;
  }
  main {
    @apply absolute z-20 inset-0;
    @apply flex justify-center align-middle items-center;
  }
  main div {
    @apply mx-auto max-w-md;
  }
  main div article {
    @apply bg-white opacity-100 mx-auto p-4 rounded-md inline-block;
  }
</style>

<div
  class="overlay md:fixed md:bg-gray-500 md:opacity-50 md:h-screen md:w-screen md:inset-0 md:z-10"
  on:click={closeModal} />
<main class="md:h-screen md:bg-transparent md:absolute md:z-20 md:inset-0">
  <div class="fixed ">
    {#if hasClose}
      <button
        class="right-0 md:-mr-4 md:-mt-4 rounded-sm absolute border-gray-600 bg-red-700 text-white px-3 py-1"
        on:click={closeModal}>x</button>
    {/if}
    <article>
      <slot />
    </article>
  </div>
</main>
