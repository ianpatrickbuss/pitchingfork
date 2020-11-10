<script lang="ts">
  import Sound from "./Sound.svelte";
  import { rand } from "./lib/math.ts";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const showtime = () => {
    dispatch("showtime");
  };
  let soundToggle = false;
  let phrases = [
    "Check one, two",
    "Check three, four",
    "Sound-checking the microphone",
    "Ahghhhhh",
    "Do ya'll wanna hear a joke?",
    "Mic check one, mic check two",
    "That's the elevator?",
    "... uhhhhh yeah um... uh...",
    "Can I get more talent in the monitors?",
    "When does catering get here?",
    "Do you really need all those lights?",
    "Man this is taking a while",
    "Where is the stage?",
    "Goodness that is a lot of stairs to get to the stage",
    "SNAKE PARTY!",
    "Where is that cable trunk?",
    "The more you point it at the loud thingy, the worse it gets okay?",
    "Production to Hospitality, where are the tissues?",
    "You patched it wrong!!!  It goes into 14 on the subsnake and 12 on the splitter!",
    "*Rachet straps* That thing ain't going no where",
    "Who is playing tonight?",
    "Mic check 1, mic check 2, mic check 3, mic check 4, mic check 1, mic check 2",
    "Mic check 9, mic check 5, Mic check pah, bah, pah, bah",
    "BINGO!  I got a piece of confetti!",
    "No you can't have a setlist",
  ];
  let testing = phrases[rand(0, phrases.length - 1)];
  let interval;
  let checked = false;
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
</script>

<style lang="postcss">
  .overlay {
    @apply fixed bg-gray-500 opacity-50 h-screen w-screen inset-0 z-10;
  }
  main {
    @apply absolute z-20 inset-0;
    @apply flex justify-center align-middle;
  }
  main div {
    @apply mx-auto max-w-md;
  }
  main div article {
    @apply bg-white opacity-100 mx-auto my-20 p-4 rounded-md inline-block;
  }
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
</style>

<div class="overlay" />
<main>
  <div>
    <article>
      <header><img src="/img/soundcheck.svg" alt="logo" /></header>
      <h3>Hey There!</h3>
      <p class="text-gray-700">
        Before we begin, let's make sure we don't blow out your ears.
      </p>
      <ol>
        <li>Turn down the volume all the way</li>
        <li>Press Start Sound Check</li>
        <li>
          Adjust your volume accordingly because this page randomly generates a
          frequency between 60Hz-20,000Hz.
          <u>Loud noises will damage your hearing.</u>
        </li>
      </ol>
      <footer class="grid grid-cols-1 mt-4 justify-center text-center">
        <button
          class={'btn ' + (soundToggle ? 'active' : 'indigo')}
          on:click={soundCheck}>
          {soundToggle ? `"${testing}"` : checked ? 'Check Again' : 'Start Sound Check'}
        </button>
        {#if soundToggle}
          <Sound Hz={440} />
        {/if}
        {#if checked && !soundToggle}
          <hr class="border-gray-300 my-3 border-2" />
          <button class="btn green" on:click={showtime}>I'm Ready!</button>
        {/if}
      </footer>
    </article>
  </div>
</main>
