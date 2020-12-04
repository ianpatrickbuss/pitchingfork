<script lang="ts">
  // Types
  import type { AnswerType } from "../app.type";
  // Imports
  import { onMount } from "svelte";
  import { baseRange, rangeKeys } from "../lib/ranges";
  import Chart from "chart.js";
  import { baseRangeData, subRangeData } from "../lib/chart";

  // Props
  export let answers: AnswerType[];

  function createChart() {
    let labels: string[] = rangeKeys;

    let bR_data = baseRangeData(answers);
    let sR_data = subRangeData(answers);

    // Prep Data
    var canvas = document.getElementById("radarGraph");
    var ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            label: "Base Ranges",
            data: bR_data[0],
            backgroundColor: "rgba(108,99,255,.4)",
            borderColor: "rgba(108,99,255,.6)",
          },
          {
            label: "Bonus/Sub Ranges",
            data: sR_data[0],
            backgroundColor: "rgba(212,54,128,.4)",
            borderColor: "rgba(212,54,128,.6)",
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (data) {
              let idx = data[0].index;
              let ratio =
                data[0].datasetIndex === 0 ? bR_data[1][idx] : sR_data[1][idx];
              return `${labels[idx]} - ${ratio}`;
            },
            label: function (data) {
              return labels[data.index] + ": " + data.value + "%";
            },
          },
        },
        scale: {
          ticks: {
            suggestedMax: 100,
            callback: function (data) {
              return data + "%";
            },
          },
        },
      },
    });
  }

  onMount(createChart);
</script>

<style lang="postcss">
  canvas {
    @apply w-full;
    height: auto;
  }
</style>

<canvas id="radarGraph" />
