<script lang="ts">
  // Life Cycle Hooks
  import { onDestroy } from "svelte";
  // Props
  export let Hz: number;
  // Local State
  var audioCtx: AudioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(Hz, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  // Life Cycle Methods
  onDestroy(() => {
    oscillator.stop();
  });
</script>
