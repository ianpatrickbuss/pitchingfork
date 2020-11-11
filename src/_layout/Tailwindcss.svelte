<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .btn {
    @apply rounded p-3 transition-all duration-200;
  }

  .btn.active,
  .btn.red {
    @apply bg-red-700 text-white;
  }

  .btn.active:hover,
  .btn.red:hover {
    @apply bg-red-600;
  }

  .btn.indigo {
    @apply bg-indigo-700 text-white;
  }

  .btn.indigo:hover {
    @apply bg-indigo-600 text-white;
  }

  .btn.green {
    @apply bg-green-700 text-white;
  }

  .btn.green:hover {
    @apply bg-green-600 text-white;
  }

  .btn.gr-blue {
    @apply bg-gradient-to-tl from-blue-600  to-blue-700 text-white;
  }
  .btn.gr-blue:hover {
    @apply bg-gradient-to-br;
  }
  .btn.gr-pink {
    @apply from-pink-600 bg-gradient-to-tl to-pink-700 text-white;
  }
  .btn.gr-pink:hover {
    @apply bg-gradient-to-br;
  }
  .btn.gr-red {
    @apply from-red-800 to-red-700;
  }
  .btn.gr-indigo {
    @apply from-indigo-600 to-indigo-700 bg-gradient-to-tl;
  }
  .btn.gr-indigo:hover {
    @apply bg-gradient-to-br;
  }
</style>
