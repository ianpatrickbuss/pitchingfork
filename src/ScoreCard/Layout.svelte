<script lang="ts">
  import type { ScoreCardType } from "../app.type.ts";
  import Answer from "./Answer.svelte";
  import ScoreCard from "./ScoreCard.svelte";
  import Graph from "./Graph.svelte";
  export let answers: ScoreCardType[];
</script>

<ScoreCard {answers} />
<Graph {answers} />
{#each answers as answer, key}
  <Answer {answer} {key} />
{/each}
