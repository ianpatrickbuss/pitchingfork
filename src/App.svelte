<script lang="ts">
  // Imports
  import { rand, randomRange } from "./lib/math.js";
  import { baseRange, subRange } from "./lib/ranges.js";
  import type { ScoreCardType } from "./app.type";

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
  const resetQuiz = () => {
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
  footer.resetButton button {
    @apply bg-red-700 rounded text-white block mb-4 text-center;
  }
  footer.resetButton button:hover {
    @apply bg-red-600;
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
      <QuizResults {answers} />
      <footer class="resetButton grid grid-cols-1 lg:flex lg:justify-center">
        <button
          class="p-3 text-xl font-semibold lg:px-16 lg:py-4  lg:text-lg lg:font-normal transition-all duration-200"
          on:click={resetQuiz}>Reset Quiz</button>

        <!-- <a
          class="bg-green-700 p-3 text-xl font-semibold lg:px-16 lg:py-4 lg:w-full lg:text-lg lg:font-normal text-center"
          href="#">
          <svg viewBox="0 0 28 34" fill="#FFFFFF" class="h-8 block mx-auto">
            <path d="M28 12h-8V0H8v12H0l14 14 14-14zM0 30v4h28v-4H0z" />
          </svg>
        </a> -->
      </footer>
    {/if}
    <SiteFooter />
  {/if}
</main>
{#if !setup}
  <div>
    <Landing on:showtime={() => (setup = true)} />
  </div>
{/if}
