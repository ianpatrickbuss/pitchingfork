<script lang="ts">
  // @ts-check
  import type { ScoreCardType } from "../app.type";

  // Imports
  import { baseCorrect, subCorrect } from "../lib/ranges";
  import { percentage } from "../lib/math";
  import { csvParser } from "../lib/csvParser";

  // Components
  import ScoreCardHeader from "./Header.svelte";
  import ResultsFooter from "./Footer.svelte";
  import Answer from "./Answer.svelte";
  import ScoreCard from "./ScoreCard.svelte";
  import GraphLayout from "./GraphLayout.svelte";
  // Props
  export let answers: ScoreCardType[];

  // Lists
  let correct: ScoreCardType[] = [];
  let incorrect: ScoreCardType[] = [];
  let partial: ScoreCardType[] = [];

  // Counter
  let subAttempted = 0;

  for (let a = 0; a < answers.length; a++) {
    let answer = answers[a];
    answer.k = a;
    let { Hz, baseAnswer, subAnswer } = answer;
    let isBaseCorrect = baseCorrect(Hz, baseAnswer);
    if (!subAnswer[0]) {
      if (isBaseCorrect) {
        correct.push(answer);
      } else {
        incorrect.push(answer);
      }
    } else {
      subAttempted++;
      let isSubCorrect: boolean = subCorrect(Hz, subAnswer);
      if (isBaseCorrect && isSubCorrect) {
        correct.push(answer);
      } else if (isBaseCorrect && !isSubCorrect) {
        partial.push(answer);
      } else if (!isBaseCorrect && !isSubCorrect) {
        incorrect.push(answer);
      }
    }
  }

  const downloadCSV = () => {
    let data = csvParser(answers);
    let encodedUri = encodeURI(data);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
  };
  let x: number;
</script>

<style lang="postcss">
  hr {
    @apply border-indigo-100 border-2;
    @apply my-4;
  }
  section div h3 {
    @apply text-4xl text-center;
  }
  h3 span {
    @apply text-base text-gray-600 block;
  }
</style>

<svelte:window bind:innerWidth={x} />

<ScoreCardHeader answers={answers.length} baseCorrect={correct.length} />
<GraphLayout {answers} {correct} {incorrect} {partial} />
<ScoreCard {answers} />
{#if x < 640}
  <ResultsFooter on:resetQuiz on:downloadCSV={downloadCSV} {x} />
{/if}
<hr />
<section class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
  {#if correct.length > 0}
    <div>
      <h3 class="text-green-700">
        Correct<span>{percentage(correct.length / answers.length)}
          -
          {correct.length}/{answers.length}</span>
      </h3>
      {#each correct as answer}
        <Answer {answer} borderClass="correct" />
      {/each}
    </div>
  {/if}
  {#if partial.length > 0}
    <div>
      <h3 class="text-yellow-700">
        Bonus Attempts<span>{percentage(partial.length / subAttempted)}
          -
          {partial.length}/{subAttempted}</span>
      </h3>
      {#each partial as answer}
        <Answer {answer} borderClass="partial" />
      {/each}
    </div>
  {/if}
  {#if incorrect.length > 0}
    <div>
      <h3 class="text-red-700">
        Incorrect<span>{percentage(incorrect.length / answers.length)}
          -
          {incorrect.length}/{answers.length}</span>
      </h3>
      {#each incorrect as answer}
        <Answer {answer} borderClass="incorrect" />
      {/each}
    </div>
  {/if}
</section>
{#if x > 640}
  <ResultsFooter on:resetQuiz on:downloadCSV={downloadCSV} {x} />
{:else}
  <ResultsFooter on:resetQuiz {x} onlyReset={true} />
{/if}
