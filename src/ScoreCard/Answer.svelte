<script lang="ts">
  import type { ScoreCardType } from "../app.type";
  import { between } from "../lib/math";
  import { baseRange } from "../lib/ranges";
  import Sound from "../Sound.svelte";
  export let answer: ScoreCardType;
  export let borderClass: string;
  let { Hz, baseAnswer, subAnswer } = answer;
  let baseCorrect = between(Hz, baseRange[baseAnswer]);
  let subCorrect = subAnswer[0] ? between(Hz, subAnswer) : null;
  let toggleSound = false;
</script>

<style lang="postcss">
  fieldset {
    @apply border rounded p-4 mt-3 mb-6;
  }
  fieldset legend {
    @apply px-2;
  }
  fieldset.correct {
    @apply border-green-600 text-green-700;
  }
  span.correct {
    @apply text-green-700;
  }
  fieldset.incorrect {
    @apply border-red-600 text-red-700;
  }
  span.incorrect {
    @apply text-red-700;
  }
  fieldset.partial {
    @apply border-yellow-700;
  }
</style>

<fieldset class={borderClass}>
  <legend>Frequency #{answer.k + 1} - {Hz}</legend>
  <span class={baseCorrect ? 'correct' : 'incorrect'}>
    {baseCorrect ? '😀' : `😟`}
    Base Frequency Guess:
    {baseAnswer}
  </span>
  <br />
  {#if subCorrect !== null}
    <span class={subCorrect ? 'correct' : 'incorrect'}>
      {subCorrect ? '😀' : `😟`}
      Sub Range
      {`${subAnswer[0]}Hz-${subAnswer[1]}Hz`}
    </span>
  {/if}
  <br />
  <div class="grid grid-cols-1">
    {#if !baseCorrect || subCorrect === false}
      <button
        class={'btn ' + (toggleSound ? 'active' : 'indigo')}
        on:click={() => (toggleSound = !toggleSound)}>
        {toggleSound ? 'Stop Sound' : 'Play Sound'}
      </button>
      {#if toggleSound}
        <Sound {Hz} />
      {/if}
    {/if}
  </div>
</fieldset>
