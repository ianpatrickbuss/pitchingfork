<script lang="ts">
  // Imports
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  // Components
  import BaseRange from "./BaseRange.svelte";
  import SubRange from "./SubRange.svelte";
  import Sound from "./Sound.svelte";

  // "Exports"
  export let page: number[];
  export let Hz: number;

  // Store
  let baseAnswer = writable("Midrange");
  let subAnswer = writable([]);

  // Event Dispatcher
  const dispatch = createEventDispatcher();

  const handleSubmit = () => {
    dispatch("saveAnswer", {
      baseAnswer: $baseAnswer,
      subAnswer: $subAnswer,
    });
    $baseAnswer = "";
    $subAnswer = [];
  };

  // Toggles
  let bonusActive = false;
  let subDisabled = true;
  let bonusDisabled = true;
  let soundToggle = false;

  // Reactivity
  $: if ($baseAnswer) {
    bonusDisabled = false;
  } else {
    bonusDisabled = true;
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
    @apply grid grid-cols-2 p-4;
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
  <fieldset>
    <legend>
      Question
      {page[0] + 1}
      /
      {page[1]}
      ({$baseAnswer ? $baseAnswer : 'Pick an Answer!'})
    </legend>
    <BaseRange {baseAnswer} />
    {#if bonusActive && $baseAnswer}
      <hr />
      <b>Guess which band of {$baseAnswer}</b>
      <SubRange {baseAnswer} {subAnswer} />
    {/if}
  </fieldset>
  <footer>
    <div class="place-self-start">
      {#if !bonusDisabled}
        <button
          class="btn gr-pink"
          on:click={() => (bonusActive = !bonusActive)}
          disabled={bonusDisabled}>
          {bonusActive ? 'Withdrawl Bonus' : 'Bonus Points!'}
        </button>
      {/if}
    </div>
    <div class="place-self-end">
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
