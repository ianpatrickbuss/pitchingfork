<script lang="ts">
  // Types
  import type { AnswerType } from "../app.type";
  // Dependencies
  import { percentage } from "../lib/math";
  // Components
  import Answer from "./Answer.svelte";

  // Props
  export let set: AnswerType[];
  export let classes: string[];
  export let answers: number;
  export let title: string;
  export let screenWidth: number;
  export let id: string;

  // Toggles
  let showResults = true;

  const handleClick = () => {
    if (screenWidth < 640) {
      showResults = !showResults;
    }
  };

  $: if (screenWidth > 640) {
    showResults = true;
  }
</script>

<style lang="postcss">
  section div h3 {
    @apply text-4xl text-center;
  }
  h3 span {
    @apply text-base text-gray-600 block;
  }
</style>

<div {id}>
  <h3 class={classes[0]} on:click={handleClick}>
    {title}
    {screenWidth < 640 ? (showResults ? '' : ' + ') : ''}
    <span>{percentage(set.length / answers)} - {set.length}/{answers}</span>
  </h3>
  {#if showResults}
    {#each set as answer}
      <Answer {answer} borderClass={classes[1]} />
    {/each}
  {/if}
</div>
