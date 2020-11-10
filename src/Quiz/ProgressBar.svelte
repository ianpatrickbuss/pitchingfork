<script lang="ts">
  import { tweened } from "svelte/motion";
  export let len: number;
  export let pos: number;
  const progress = tweened(0);

  $: $progress = pos;
</script>

<style lang="postcss">
  .prgbr-wrapper {
    @apply h-4 border border-gray-400 mt-3 mb-6 rounded static;
  }
  .prgbr-bar {
    @apply h-full bg-indigo-300;
  }
  .prgbr-per {
    @apply absolute text-xs z-20 text-indigo-800;
    left: 50%;
  }
</style>

<div class="prgbr-wrapper">
  <span class="prgbr-per">{Math.round(($progress / len) * 100)}%</span>
  <div
    class="prgbr-bar"
    style={`width: ${Math.round(($progress / len) * 100)}%`} />
</div>
