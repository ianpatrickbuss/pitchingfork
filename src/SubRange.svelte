<script lang="ts">
  import { onDestroy } from "svelte";
  import { baseRange } from "./lib/ranges.ts";
  export let baseAnswer;
  let diff;
  let subRanges;
  let range;
  $: if (baseAnswer) {
    range = baseRange[$baseAnswer];
    diff = Math.round((range[1] - range[0]) / 5);
    subRanges = Array(5)
      .fill(0)
      .map((n, i) => [range[0] + diff * i, range[0] + diff * (i + 1) - 1]);
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
