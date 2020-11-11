<script lang="ts">
  // Types
  import type { ScoreCardType } from "./app.type";
  // Imports
  import { randomRange } from "./lib/math";
  // Components
  import Tailwindcss from "./_layout/Tailwindcss.svelte";
  import Landing from "./_layout/Landing.svelte";
  import SiteFooter from "./_layout/Footer.svelte";
  import Question from "./Quiz/Question.svelte";
  import QuizResults from "./ScoreCard/Layout.svelte";
  // Counters
  let qPage = 0;
  let q = 12;
  let answers: ScoreCardType[] = Array(q).fill({});

  // Store
  let questions = Array(q).fill(0).map(randomRange);

  // Toggles
  let setup = false;

  // Receive Component Event
  const updateAnswers = (event: { detail: any }) => {
    answers[qPage] = { Hz: questions[qPage], ...event.detail };
    qPage++;
  };

  // Local Lambdas
  const resetQuiz = (): void => {
    questions = Array(q).fill(0).map(randomRange);
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
<main
  class={qPage < questions.length ? 'sm:max-w-screen-sm' : 'sm:max-w-lg lg:max-w-screen-xl'}>
  {#if setup}
    {#if qPage < questions.length}
      <header><img src="/img/music.svg" alt="logo" /></header>
      <Question
        page={[qPage, q]}
        Hz={questions[qPage]}
        on:saveAnswer={updateAnswers} />
    {:else}
      <QuizResults {answers} on:resetQuiz={resetQuiz} />
    {/if}
    <SiteFooter />
  {/if}
</main>
{#if !setup}
  <div>
    <Landing on:showtime={() => (setup = true)} />
  </div>
{/if}
