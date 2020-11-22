<script lang="ts">
  import { baseRange } from "../lib/ranges";
  export let ranges: string[];
  export let baseAnswer: SvelteStore<string>;
</script>

<style lang="postcss">
  label {
    @apply cursor-pointer;
  }
  label:hover {
    @apply text-indigo-700;
  }
</style>

{#each ranges as option, key}
  <div style="display: block">
    <label for={`answer-${key}`}>
      <input
        type="radio"
        name="question"
        bind:group={$baseAnswer}
        id={`answer-${key}`}
        value={option} />
      {option}
      {baseRange[option][0]}-{baseRange[option][1]}</label>
  </div>
{/each}
