<script lang="ts">
  // Types
  import type { ScoreCardResults, AnswerType } from "../app.type";

  // Imports
  import { checkAnswers, rangeKeys } from "../lib/ranges";
  import { csvParser } from "../lib/csvParser";

  // Components
  import ScoreCardHeader from "./Header.svelte";
  import ResultsFooter from "./Footer.svelte";
  import ScoreCard from "./ScoreCard.svelte";
  import Graph from "./Graph.svelte";
  import SetOfAnswers from "./SetOfAnswers.svelte";
  // Props
  export let answers: AnswerType[];
  export let ranges: string[];

  // Lists
  let {
    correct,
    incorrect,
    partial,
    subAttempted,
  }: ScoreCardResults = checkAnswers(answers);

  const downloadCSV = () => {
    let data = csvParser(answers);
    let encodedUri = encodeURI(data);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
  };
  let screenWidth: number;
  let cols = 0;
  if (ranges.length < rangeKeys.length) {
    [correct, [...partial, ...incorrect]].forEach((set) => {
      set.length > 0 ? cols++ : cols;
    });
  } else {
    [correct, partial, incorrect].forEach((set) => {
      set.length > 0 ? cols++ : cols;
    });
  }
</script>

<style lang="postcss">
  hr {
    @apply border-indigo-100 border-2;
    @apply my-4;
  }
</style>

<svelte:window bind:innerWidth={screenWidth} />

<!-- Image -->
<ScoreCardHeader answers={answers.length} baseCorrect={correct.length} />

<!-- Radar Graph -->
<Graph {answers} />

<!-- Totals -->
<ScoreCard
  {correct}
  {incorrect}
  {partial}
  {subAttempted}
  isSelectedRanges={rangeKeys.length !== ranges.length} />

{#if screenWidth < 640}
  <ResultsFooter on:resetQuiz on:downloadCSV={downloadCSV} {screenWidth} />
{/if}
<hr />
<!-- Answers/Replay -->
{#if rangeKeys.length === ranges.length}
  <section
    class={`grid sm:grid-cols-1 lg:grid-cols-${cols} gap-4`}
    id="scorecard-results">
    {#if correct.length > 0}
      <SetOfAnswers
        set={correct}
        title="Correct"
        classes={['text-green-700', 'correct']}
        answers={answers.length}
        id="scorecard-correct-answers"
        {screenWidth} />
    {/if}
    {#if partial.length > 0}
      <SetOfAnswers
        set={partial}
        title="Bonus Attempts"
        classes={['text-yellow-700', 'partial']}
        answers={subAttempted}
        id="scorecard-partial-answers"
        {screenWidth} />
    {/if}
    {#if incorrect.length > 0}
      <SetOfAnswers
        set={incorrect}
        title="Incorrect"
        classes={['text-red-700', 'incorrect']}
        answers={answers.length}
        id="scorecard-incorrect-answers"
        {screenWidth} />
    {/if}
  </section>
{:else}
  <section class={`grid sm:grid-cols-1 lg:grid-cols-${cols} gap-4`}>
    {#if correct.length > 0}
      <SetOfAnswers
        set={correct}
        title="Correct"
        classes={['text-green-700', 'correct']}
        answers={answers.length}
        id="scorecard-correct-answers"
        {screenWidth} />
    {/if}
    {#if [...partial, ...incorrect].length > 0}
      <SetOfAnswers
        set={[...partial, ...incorrect]}
        title="Incorrect Attempts"
        classes={['text-red-700', 'incorrect']}
        answers={subAttempted || answers.length}
        id="scorecard-incorrect-answers"
        {screenWidth} />
    {/if}
  </section>
{/if}
{#if screenWidth > 640}
  <ResultsFooter on:resetQuiz on:downloadCSV={downloadCSV} {screenWidth} />
{:else}
  <ResultsFooter on:resetQuiz {screenWidth} onlyReset={true} />
{/if}
