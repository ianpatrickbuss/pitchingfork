<script lang="ts">
  // Types
  import type { ScoreCardType } from "./app.type";
  // Imports
  import { rand } from "./lib/math";
  import { baseRange } from "./lib/ranges";

  // Components
  import Tailwindcss from "./_layout/Tailwindcss.svelte";
  import Landing from "./Landing/Layout.svelte";
  import SiteFooter from "./_layout/Footer.svelte";
  import Question from "./Quiz/Question.svelte";
  import QuizResults from "./ScoreCard/Layout.svelte";

  // Counters
  export let qPage = 0;
  export let q = 12; // Number of questions

  // Lists
  export let answers: ScoreCardType[] = Array(q).fill({});
  export let ranges: string[] = [];
  export let questions: number[] = Array(q).fill(0);

  // Toggles
  export let setup = false;

  // Receive Component Event
  const updateAnswers = (event: { detail: any }) => {
    answers[qPage] = { Hz: questions[qPage], ...event.detail };
    qPage++;
  };

  const makeQuestions = ({ detail }: { detail: string[] }): void => {
    ranges = detail;
    questions = questions.map((n): number => {
      let key = rand(0, ranges.length - 1);
      let [min, max]: number[] = baseRange[ranges[key]];
      return rand(min, max);
    });
    answers = Array(q).fill({});
    qPage = 0;
  };
</script>

<style lang="postcss">
  main {
    @apply mx-auto px-10 py-4;
  }
  main header img {
    @apply object-contain h-32 w-full;
  }
</style>

<Tailwindcss />
{#if !setup}
  <Landing
    on:showtime={(e) => {
      makeQuestions(e);
      setup = true;
    }} />
{:else}
  <main
    class={qPage < questions.length ? 'sm:max-w-screen-sm' : 'sm:max-w-lg lg:max-w-screen-xl'}
    id="app-body">
    {#if qPage < questions.length}
      <header><img src="/img/music.svg" alt="logo" /></header>
      <Question
        page={[qPage, q]}
        Hz={questions[qPage]}
        {ranges}
        on:saveAnswer={updateAnswers} />
    {:else}
      <QuizResults {answers} on:resetQuiz={makeQuestions} {ranges} />
    {/if}
    <SiteFooter />
  </main>
{/if}
