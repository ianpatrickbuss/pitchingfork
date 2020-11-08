<script lang="ts">
  import { onDestroy } from "svelte";
  export let Hz: number;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(Hz, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  // create web audio api context
  oscillator.start();
  onDestroy(() => {
    oscillator.stop();
  });
</script>
