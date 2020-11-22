<script lang="ts">
  // Imports
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  // Components
  import BaseRange from "./BaseRange.svelte";
  import SubRange from "./SubRange.svelte";
  import Sound from "../Sound.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  // Props
  export let page: number[];
  export let Hz: number;
  export let ranges: string[];
  let specificRange: string | false = ranges.length === 1 ? ranges[0] : false;

  // Store
  let baseAnswer: SvelteStore<string> = writable(specificRange || "");
  let subAnswer: SvelteStore<number[]> = writable([]);

  // Toggles
  let bonusActive: boolean = specificRange ? true : false;
  let subDisabled = true;
  let hideBonus = true;
  let soundToggle = false;

  // Event Dispatcher
  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    dispatch("saveAnswer", {
      baseAnswer: $baseAnswer,
      subAnswer: $subAnswer,
    });
    bonusActive = specificRange ? true : false;
    soundToggle = false;
    baseAnswer.set(specificRange || "");
    subAnswer.set([]);
  };

  // Reactivity
  $: if ($baseAnswer && !specificRange) {
    hideBonus = false;
  } else {
    hideBonus = true;
  }

  $: if ($baseAnswer && !bonusActive) {
    subDisabled = false;
  } else if ($baseAnswer && bonusActive && $subAnswer[0]) {
    subDisabled = false;
  } else {
    subDisabled = true;
  }
</script>

<style lang="postcss">
  .question {
    @apply grid grid-cols-1;
  }

  .question header {
    @apply p-4;
    @apply place-self-center;
  }
  .question header button {
    @apply py-2 px-3 rounded;
    @apply bg-gradient-to-tl  text-white;
  }

  fieldset {
    @apply w-full p-4 border border-solid border-gray-400;
    @apply rounded-sm;
  }
  fieldset legend {
    @apply px-2;
  }

  .question footer {
    @apply grid px-4 pt-4;
  }

  hr {
    @apply border-indigo-200 border-2;
    @apply my-4;
  }
</style>

{#if soundToggle}
  <Sound {Hz} />
{/if}
<article class="question">
  <header>
    <button
      on:click={() => (soundToggle = !soundToggle)}
      class={'btn ' + (soundToggle ? 'gr-red' : 'gr-indigo')}>
      {soundToggle ? 'Stop Sound' : 'Play Frequency'}
    </button>
  </header>
  <ProgressBar len={page[1]} pos={page[0]} />
  <fieldset>
    <legend>
      Question
      {page[0] + 1}
      /
      {page[1]}
      ({$baseAnswer ? $baseAnswer : 'Pick an Answer!'})
    </legend>
    {#if !specificRange}
      <BaseRange {baseAnswer} {ranges} />
    {/if}
    {#if bonusActive && $baseAnswer}
      {#if !specificRange}
        <hr />
      {/if}
      <b>Guess which band of {$baseAnswer}</b>
      <SubRange {baseAnswer} {subAnswer} />
    {/if}
  </fieldset>
  <footer class={`${specificRange ? 'grid-cols-1' : 'grid-cols-2'}`}>
    <div class="place-self-start">
      {#if !hideBonus}
        <button
          class="btn gr-pink"
          on:click={() => (bonusActive = !bonusActive)}
          disabled={hideBonus}>
          {bonusActive ? 'Withdrawl Bonus' : 'Bonus Points!'}
        </button>
      {/if}
    </div>
    <div class={`${specificRange ? 'place-self-center' : 'place-self-end'}`}>
      {#if !subDisabled}
        <button
          class="btn gr-blue"
          on:click={handleSubmit}
          disabled={subDisabled}>
          Submit Answer
        </button>
      {/if}
    </div>
  </footer>
</article>
