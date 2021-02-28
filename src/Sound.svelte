<script lang="ts">
  // Life Cycle Hooks
  import { onDestroy, createEventDispatcher } from "svelte";
  
  // Store
  import {sound} from './sound';

  // Props
  export let Hz: number;
  
  // Event Dispatcher
  const dispatch = createEventDispatcher();

  // Local State
  const id = Date.now()
  var audioCtx: AudioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(Hz, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  sound.set(id);
  $: if($sound !== id){
    oscillator.stop();
    dispatch("stop")
  }
    
  oscillator.start()
  // Life Cycle Methods
  onDestroy(() => {
    oscillator.stop();
  });
</script>
