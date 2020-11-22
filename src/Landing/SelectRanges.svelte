<script lang="ts">
  import { range } from "cypress/types/lodash";

  import { createEventDispatcher } from "svelte";
  import { baseRange, rangeKeys } from "../lib/ranges";

  // Lists
  let ranges: string[] = rangeKeys;
  let selectedRanges: string[] = [];

  // Toggles
  let selectAll = true;

  // Event Stream
  const handleCheck = ({ target }: { target: HTMLInputElement }): void => {
    let { checked, id } = target;
    if (id === "select-selectAll-range") {
      if (checked) {
        selectedRanges = ranges;
      } else {
        selectedRanges = [];
      }
    } else {
      if (selectAll) {
        selectAll = false;
      }
    }
  };

  // Event Dispatchers
  const dispatch = createEventDispatcher();

  // Reactivity
  $: selectedRanges.length === ranges.length
    ? (selectAll = true)
    : (selectAll = false);
  $: {
    dispatch("updateRanges", selectedRanges);
  }
</script>

<style lang="postcss">
  input[type="checkbox"] {
    @apply hidden;
  }
  label {
    @apply cursor-pointer py-1;
  }
  .all-ranges {
    @apply py-3;
  }
</style>

<label
  for={`select-selectAll-range`}
  class={`btn mt-2 w-3/4 mx-auto all-ranges ${selectAll ? `gr-pink` : `light-gray`}`}>
  <input
    type="checkbox"
    name="select-range"
    id={`select-selectAll-range`}
    value={ranges}
    bind:checked={selectAll}
    on:input={handleCheck} />
  {selectAll ? 'Select Individual Ranges' : 'Select All Ranges'}
</label>
<div class="flex w-full flex-wrap justify-center py-4">
  {#each ranges as range, key}
    <label for={`select-range-${key}`} class={`m-2`}>
      <input
        type="checkbox"
        name="select-range"
        id={`select-range-${key}`}
        bind:group={selectedRanges}
        on:input={handleCheck}
        value={range} />
      {selectedRanges.find((r) => r === range) ? `🔊` : `🔇`}
      <br />
      {range}
      <br />[{baseRange[range][0]}Hz-{baseRange[range][1]}Hz]
    </label>
  {/each}
</div>
