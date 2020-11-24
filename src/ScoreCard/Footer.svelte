<script lang="ts">
  // Dependencies
  import { createEventDispatcher } from "svelte";
  // Components
  import ResetModal from "./ResetModal.svelte";
  // Props
  export let screenWidth: number;
  export let onlyReset = false;

  // Toggles
  let toggleModal = false;

  // Component Events
  const dispatch = createEventDispatcher();
  const downloadCSV = () => {
    dispatch("downloadCSV");
  };
  const resetQuiz = (e) => {
    toggleModal = false;
    dispatch("resetQuiz", e.detail);
  };
</script>

<style lang="postcss">
  footer button {
    @apply text-white text-center transition-all duration-200 mb-4 rounded shadow;
  }
  button.reset {
    @apply bg-red-700;
  }
  button.reset:hover {
    @apply bg-red-600;
  }
  button.download {
    @apply bg-green-700;
  }
  button.download:hover {
    @apply bg-green-600;
  }
</style>

{#if toggleModal}
  <ResetModal
    on:resetQuiz={resetQuiz}
    on:close={() => (toggleModal = !toggleModal)} />
{/if}

<footer
  class={onlyReset ? 'grid grid-cols-1' : 'grid grid-cols-2 gap-4'}
  id="scorecard-results-footer">
  <button
    class="reset p-3 text-xl font-semibold lg:px-16 lg:py-4 lg:text-lg lg:font-normal"
    on:click={() => (toggleModal = !toggleModal)}>{screenWidth > 640 ? 'Reset Quiz' : ''}<svg
      viewBox="0 0 32 40"
      aria-labelledby="bafsi-material-replay-title"
      id="si-material-replay"
      fill="#FFFFFF"
      class="h-6 block mx-auto">
      <path
        d="M16 8V0L6 10l10 10v-8c6.63 0 12 5.37 12 12s-5.37 12-12 12S4 30.63 4 24H0c0 8.84 7.16 16 16 16s16-7.16 16-16S24.84 8 16 8z" />
    </svg>
  </button>
  {#if !onlyReset}
    <button
      class="download py-3 text-xl font-semibold lg:px-16 lg:py-3 lg:w-full lg:text-lg lg:font-normal text-center"
      href="#download"
      on:click={downloadCSV}>{screenWidth > 640 ? 'Download Results' : ''}
      <svg viewBox="0 0 28 34" fill="#FFFFFF" class="h-6 block mx-auto">
        <path d="M28 12h-8V0H8v12H0l14 14 14-14zM0 30v4h28v-4H0z" />
      </svg>
    </button>
  {/if}
</footer>
