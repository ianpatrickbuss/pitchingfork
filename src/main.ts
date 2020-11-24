import App from './App.svelte';
import Welcome from './welcome'

Welcome();
const app = new App({
  target: document.body,
});
// 
export default app;