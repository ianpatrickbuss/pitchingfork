<script lang="ts">
  import type { ScoreCardType } from "../app.type";
  import { between } from "../lib/math";
  import { baseRange } from "../lib/ranges";
  export let answers: ScoreCardType[];
  let baseCorrect = 0;
  let subCorrect = 0;
  let subAttempted = 0;
  for (let i = 0; i < answers.length; i++) {
    let { baseAnswer, subAnswer, Hz } = answers[i];
    baseCorrect += between(Hz, [...baseRange[baseAnswer]]) ? 1 : 0;
    if (subAnswer[0]) {
      subAttempted += 1;
      subCorrect += between(Hz, [...subAnswer]) ? 1 : 0;
    }
  }
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
  <header>
    {#if subAttempted}
      <h4>
        <span>Total</span>
        {Math.round((baseCorrect / answers.length) * 100)}%
        <span>{baseCorrect}/{answers.length}</span>
      </h4>
      <div class="border-indigo-200 border-l-2" />
      <h4>
        <span>Bonus</span>
        {Math.round((subCorrect / subAttempted) * 100)}%
        <span>{subCorrect}/{subAttempted}</span>
      </h4>
    {:else}
      <h4>
        {Math.round((baseCorrect / answers.length) * 100)}%
        <span>{baseCorrect}/{answers.length}</span>
      </h4>
    {/if}
  </header>
</article>
