<script lang="ts">
  import { baseRange } from "./lib/ranges.ts";
  import type { ScoreCardType } from "./app.type.ts";
  import Answer from "./Answer.svelte";
  import ScoreCard from "./ScoreCard.svelte";
  export let answers: ScoreCardType[];
</script>

<ScoreCard {answers} />
{#each answers as answer, key}
  <Answer {answer} {key} />
{/each}
