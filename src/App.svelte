<script lang="ts">
  // Imports
  import { randomRange } from "./lib/math.js";
  import type { ScoreCardType } from "./app.type";
  // Components
  import Question from "./Question.svelte";
  import ScoreCard from "./Results.svelte";
  import Landing from "./Landing.svelte";

  let q = 8;

  // Store
  let questions = Array(q)
    .fill(0)
    .map((n) => randomRange());
  let answers: ScoreCardType[] = Array(q).fill({});

  // // TODO: Build Unit Testing / Update to HMR
  // let answers: ScoreCardType[] = [
  //   {
  //     Hz: 440,
  //     baseAnswer: "Low Midrange",
  //     subAnswer: [350, 399],
  //   },
  //   {
  //     Hz: 500,
  //     baseAnswer: "Upper Midrange",
  //     subAnswer: [2000, 2399],
  //   },
  // ];

  // Toggles
  let setup = false;

  // Counters
  let qPage = 0;

  // Receive Component Event
  const updateAnswers = (event) => {
    answers[qPage] = { Hz: questions[qPage], ...event.detail };
    qPage++;
  };

  const resetQuiz = () => {
    questions = Array(q)
      .fill(0)
      .map((n) => randomRange());
    answers = Array(q).fill({});
    qPage = 0;
  };
</script>

<style lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
  @import "./lib/stylesheet.css";
  main {
    @apply mx-auto px-10 py-4;
  }
  main header img {
    @apply object-contain h-32 w-full;
  }
</style>

<main class="sm:max-w-lg">
  {#if setup}
    {#if qPage < questions.length}
      <header><img src="/img/music.svg" alt="logo" /></header>
      <Question
        page={[qPage, questions.length]}
        Hz={questions[qPage]}
        on:saveAnswer={updateAnswers} />
    {:else}
      <ScoreCard {answers} />
      <footer class="grid col-gap-1 justify-center">
        <button class="btn red" on:click={resetQuiz}>Reset Quiz</button>
      </footer>
    {/if}
  {/if}
</main>
{#if !setup}
  <div>
    <Landing on:showtime={() => (setup = true)} />
  </div>
{/if}
