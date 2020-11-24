<script lang="ts">
  // Types
  import type { ScoreCardType } from "../app.type";
  // Dependencies
  import { percentage } from "../lib/math";
  // Props
  export let correct: ScoreCardType[];
  export let incorrect: ScoreCardType[];
  export let partial: ScoreCardType[];
  export let subAttempted: number;
  export let isSelectedRanges: boolean;
  let total = [...correct, ...partial, ...incorrect].length;
</script>

<style lang="postcss">
  header {
    @apply flex justify-around;
  }
  h4 {
    @apply text-4xl text-center;
  }
  h4 span {
    @apply text-sm block;
  }
  article header {
    @apply my-4;
  }
</style>

<article>
  <header id="scorecard-header">
    {#if isSelectedRanges || subAttempted === 0}
      <!-- Selected Ranges -->
      <h4 id="scorecard-header-total">
        <span>Correct</span>
        {percentage(correct.length / total)}
        <span>{correct.length}/{total}</span>
      </h4>
      <div class="border-indigo-200 border-l-2" />
      <h4 id="scorecard-header-incorrect">
        <span>Incorrect</span>
        {percentage([...partial, ...incorrect].length / total)}
        <span>{[...partial, ...incorrect].length}/{total}</span>
      </h4>
    {:else}
      <!-- All Ranges -->
      <h4 id="scorecard-header-total">
        <span>Total</span>
        {percentage(correct.length / total)}
        <span>{correct.length}/{total}</span>
      </h4>
      {#if subAttempted}
        <div class="border-indigo-200 border-l-2" />
        <h4 id="scorecard-header-bonus">
          <span>Bonus</span>
          {percentage(partial.length / subAttempted)}
          <span>{partial.length}/{subAttempted}</span>
        </h4>
      {/if}
    {/if}
  </header>
</article>
