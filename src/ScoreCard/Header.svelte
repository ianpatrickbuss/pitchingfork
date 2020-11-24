<script lang="ts">
  export let answers: number;
  export let baseCorrect: number;
</script>

<style lang="postcss">
  header {
    @apply flex justify-around;
  }
  header img {
    @apply object-contain  w-full;
  }
</style>

<header>
  <img
    src={Math.round((baseCorrect / answers) * 100) === 100 ? '/img/success.svg' : Math.round((baseCorrect / answers) * 100) > 70 ? '/img/good.svg' : '/img/needs_improvement.svg'}
    class="h-32 lg:h-64"
    alt="logo" />
</header>
