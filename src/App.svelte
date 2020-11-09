<script lang="ts">
  // Imports
  import { randomRange } from "./lib/math.js";
  import type { ScoreCardType } from "./app.type";
  // Components
  import Question from "./Quiz/Question.svelte";
  import QuizResults from "./ScoreCard/Layout.svelte";
  import Landing from "./Landing.svelte";

  import Tailwindcss from "./Tailwindcss.svelte";

  // Counters
  let qPage = 0;
  let q = 8;
  let answers: ScoreCardType[] = Array(q).fill({});

  // Store
  let questions = Array(q)
    .fill(0)
    .map((n) => randomRange());

  // Toggles
  let setup = false;

  // Receive Component Event
  const updateAnswers = (event) => {
    answers[qPage] = { Hz: questions[qPage], ...event.detail };
    qPage++;
  };

  // Local Lambdas
  const resetQuiz = () => {
    questions = Array(q)
      .fill(0)
      .map((n) => randomRange());
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
  footer.socials {
    @apply mt-10 pt-10 border-t-4 border-gray-200;
  }
  footer.socials img {
    @apply object-contain h-24 w-full opacity-50;
    filter: grayscale(80%);
  }
  footer.socials img:hover {
    @apply opacity-100 cursor-pointer;
    filter: grayscale(0%);
  }
</style>

<Tailwindcss />
<main class="sm:max-w-lg">
  {#if setup}
    {#if qPage < questions.length}
      <header><img src="/img/music.svg" alt="logo" /></header>
      <Question
        page={[qPage, questions.length]}
        Hz={questions[qPage]}
        on:saveAnswer={updateAnswers} />
    {:else}
      <QuizResults {answers} />
      <footer class="grid col-gap-1 justify-center">
        <button class="btn red" on:click={resetQuiz}>Reset Quiz</button>
      </footer>
    {/if}
    <footer class="socials">
      <a
        href="https://github.com/ianpatrickbuss/pitchingfork"
        title="View the Github Repository">
        <img src="/img/github.png" alt="Github" />
      </a>
    </footer>
  {/if}
</main>
{#if !setup}
  <div>
    <Landing on:showtime={() => (setup = true)} />
  </div>
{/if}
