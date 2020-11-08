<script lang="ts">
  // Imports
  import { onMount, onDestroy } from "svelte";
  import { between } from "./lib/math";
  import { baseRange } from "./lib/ranges";
  import Chart from "chart.js";

  // Types
  import type { ScoreCardType } from "./app.type";

  // Props
  export let answers: ScoreCardType[];
  const createChart = () => {
    // let data = Object.keys(baseRange).map(k => {
    //   // return k: {}
    // })
    // Prep Data
    ((): void => {
      for (let a = 0; a < answers.length; a++) {
        let { Hz } = answers[a];
        for (let r = 0; r < Object.keys(baseRange).length; r++) {
          let range = Object.keys(baseRange)[r];
          if (between(Hz, baseRange[range])) {
            data.push();
          }
        }
      }
    })();
  };

  onMount(createChart);
</script>
