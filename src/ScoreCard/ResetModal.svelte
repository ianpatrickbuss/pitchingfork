<script lang="ts">
  // Dependencies
  import { createEventDispatcher } from "svelte";

  // Components
  import ModalBox from "../_layout/ModalBox.svelte";
  import SelectRanges from "../Landing/SelectRanges.svelte";

  // Toggles
  let checked = true;
  let soundToggle = false;

  // Lists
  let ranges: string[] = [];

  // Component Events
  const dispatch = createEventDispatcher();
  const showtime = () => {
    dispatch("resetQuiz", ranges);
  };

  const updateSelectedRanges = (e) => {
    ranges = e.detail;
  };
</script>

<style lang="postcss">
  h3 {
    @apply text-3xl text-center;
  }
  p {
    @apply text-gray-700 my-2;
  }
</style>

<ModalBox on:close hasClose={true}>
  <h3>Select A Range</h3>
  <p>
    Let's try that again but this time you can select a couple of ranges to
    focus on.
  </p>
  <div class="grid grid-cols-1 justify-center text-center">
    <SelectRanges on:updateRanges={updateSelectedRanges} />
  </div>
  <footer class="grid mt-4 justify-center text-center grid-cols-1">
    {#if checked && !soundToggle}
      {#if ranges[0]}
        <button id="reset-modal-start" class="btn green" on:click={showtime}>I'm
          Ready!</button>
      {/if}
    {/if}
  </footer>
</ModalBox>
