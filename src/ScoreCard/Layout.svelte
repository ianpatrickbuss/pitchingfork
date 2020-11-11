<script lang="ts">
  // @ts-check
  import type { ScoreCardType } from "../app.type";

  // Imports
  import { baseRange } from "../lib/ranges";
  import { between, percentage } from "../lib/math";

  // Components
  import Answer from "./Answer.svelte";
  import ScoreCard from "./ScoreCard.svelte";
  import Graph from "./Graph.svelte";
  import ScoreCardHeader from "./Header.svelte";
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
    let baseCorrect = between(Hz, baseRange[baseAnswer]);
    if (!subAnswer[0]) {
      if (baseCorrect) {
        correct.push(answer);
      } else {
        incorrect.push(answer);
      }
    } else {
      subAttempted++;
      let subCorrect: boolean = between(Hz, subAnswer);
      if (baseCorrect && subCorrect) {
        correct.push(answer);
      } else if (baseCorrect && !subCorrect) {
        console.log(answer);
        partial.push(answer);
      } else if (!baseCorrect && !subCorrect) {
        incorrect.push(answer);
      }
    }
  }
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

<ScoreCardHeader answers={answers.length} baseCorrect={correct.length} />
<Graph {answers} />
<ScoreCard {answers} />
<hr />
<section class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
  {#if correct.length > 0}
    <div>
      <h3 class="text-green-700">
        Correct<span>{percentage(correct.length / answers.length)}
          -
          {correct.length}/{answers.length}</span>
      </h3>
      {#each correct as answer, key}
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
      {#each partial as answer, key}
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
      {#each incorrect as answer, key}
        <Answer {answer} borderClass="incorrect" />
      {/each}
    </div>
  {/if}
</section>
