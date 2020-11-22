<script lang="ts">
  // Dependencies
  import { rand } from "../lib/math";
  import { phrases } from "../lib/phrases";
  import { createEventDispatcher } from "svelte";

  // Components
  import Sound from "../Sound.svelte";
  import SelectRanges from "./SelectRanges.svelte";
  import ModalBox from "../_layout/ModalBox.svelte";

  // Lists
  let ranges: string[] = [];

  // Event Dispatchers
  const dispatch = createEventDispatcher();
  const showtime = () => {
    dispatch("showtime", ranges);
  };

  // Toggles
  let checked = false;
  let soundToggle = false;

  // Local State
  let testing = phrases[rand(0, phrases.length - 1)];
  let interval: number;

  const soundCheck = () => {
    if (!soundToggle) {
      interval = setInterval(() => {
        testing = phrases[rand(0, phrases.length - 2)];
      }, 1000);
      soundToggle = true;
    } else {
      checked = true;
      clearInterval(interval);
      soundToggle = false;
    }
  };

  const updateSelectedRanges = (e) => {
    ranges = e.detail;
  };
</script>

<style lang="postcss">
  h3 {
    @apply text-3xl text-center;
  }
  ol {
    @apply px-4;
    list-style-type: decimal;
  }
  main div header img {
    @apply object-contain h-32 w-full;
  }
  p {
    @apply text-gray-700 my-2;
  }
</style>

<ModalBox>
  <header><img src="/img/soundcheck.svg" alt="logo" /></header>
  {#if checked}
    <h3>Now Select A Range</h3>
    <p>Now select one or multiple frequency range(s) to be quizzed on!</p>
    <div class="grid grid-cols-1 justify-center text-center">
      <SelectRanges on:updateRanges={updateSelectedRanges} />
    </div>
  {:else}
    <h3>Hey There!</h3>
    <p>Before we begin, let's make sure we don't blow out your ears.</p>
    <ol>
      <li>Turn down the volume all the way</li>
      <li>Press Start Sound Check</li>
      <li>
        Adjust your volume accordingly because this page randomly generates a
        frequency between 60Hz-20,000Hz.
        <u>Loud noises will damage your hearing.</u>
      </li>
    </ol>
  {/if}
  <footer
    class={`grid mt-4 justify-center text-center ${ranges[0] && !soundToggle ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
    <button
      class={'btn ' + (soundToggle ? 'active' : 'indigo')}
      on:click={soundCheck}>
      {soundToggle ? `"${testing}"` : checked ? 'Check Again' : 'Start Sound Check'}
    </button>
    {#if checked && !soundToggle}
      {#if ranges[0]}
        <button class="btn green" on:click={showtime}>I'm Ready!</button>
      {/if}
    {/if}
  </footer>
</ModalBox>

{#if soundToggle}
  <Sound Hz={440} />
{/if}
