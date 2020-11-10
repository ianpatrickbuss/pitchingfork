<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .btn {
    @apply rounded p-3;
  }

  .btn.active,
  .btn.red {
    @apply bg-red-700 text-white;
  }

  .btn.indigo {
    @apply bg-indigo-700 text-white;
  }

  .btn.green {
    @apply bg-green-700 text-white;
  }

  .btn.gr-blue {
    @apply from-blue-600 bg-gradient-to-tl to-blue-700 text-white;
  }

  .btn.gr-pink {
    @apply from-pink-600 bg-gradient-to-tl to-pink-700 text-white;
  }
  .btn.gr-red {
    @apply from-red-800 to-red-700;
  }
  .btn.gr-indigo {
    @apply from-indigo-600 to-indigo-700;
  }
</style>
