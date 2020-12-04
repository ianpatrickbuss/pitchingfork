<script lang="ts">
  // Life Cycle Hooks
  import { onDestroy, onMount, tick } from "svelte";
  // Props
  export let Hz: number;
  // Local State
  var audioCtx: AudioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
  let gainNode = audioCtx.createGain();
  var oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(Hz, audioCtx.currentTime); // value in hertz'
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  oscillator.connect(gainNode).connect(audioCtx.destination);

  const fade = (start: number, end: number, time: number) => {
    let iteration = 0;
    let distance = (end - start) / time;
    let volume = start;
    function clearTimer() {
      clearTimeout(cycle);
    }
    let cycle = setInterval(() => {
      volume += distance;
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
      iteration++;
      if (iteration === time) {
        gainNode.gain.setValueAtTime(end, audioCtx.currentTime);
        clearTimer();
      }
    }, 1);
  };

  onMount(() => {
    oscillator.start();
    fade(0, 1, 120);
  });
  // Life Cycle Methods
  onDestroy(() => {
    fade(1, 0, 120);
    setTimeout(() => {
      oscillator.stop();
    }, 450);
  });
</script>
