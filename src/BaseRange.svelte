<script lang="ts">
  import { baseRange } from "./lib/ranges.ts";
  let options = Object.keys(baseRange);
  export let baseAnswer;
</script>

{#each options as option, key}
  <div style="display: block">
    <label for={`answer-${key}`}>
      <input
        type="radio"
        name="question"
        bind:group={$baseAnswer}
        id={`answer-${key}`}
        value={option} />
      {option}
      {baseRange[option][0]}-{baseRange[option][1]}</label>
  </div>
{/each}
