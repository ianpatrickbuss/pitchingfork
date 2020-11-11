<script lang="ts">
  import { onDestroy } from "svelte";
  import { baseRange, subRange } from "../lib/ranges";
  export let baseAnswer;
  let subRanges;
  $: if (baseAnswer) {
    subRanges = subRange(baseRange[$baseAnswer]);
    $subAnswer = [];
  }
  export let subAnswer;
  onDestroy(() => {
    $subAnswer = [];
  });
</script>

{#if baseAnswer}
  {#each subRanges as option, key}
    <div style="display: block">
      <label for={`sub-answer-${key}`}>
        <input
          type="radio"
          name="sub-question"
          bind:group={$subAnswer}
          id={`sub-answer-${key}`}
          value={option} />
        {option[0]}Hz-{option[1]}Hz
      </label>
    </div>
  {/each}
{/if}
