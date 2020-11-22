<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .btn {
    @apply rounded p-3 transition-all duration-200 text-white;
  }

  .btn.active,
  .btn.red {
    @apply bg-red-700;
  }

  .btn.active:hover,
  .btn.red:hover {
    @apply bg-red-600;
  }

  .btn.indigo {
    @apply bg-indigo-700;
  }

  .btn.indigo:hover {
    @apply bg-indigo-600;
  }

  .btn.gray {
    @apply bg-gray-600;
  }

  .btn.gray:hover {
    @apply bg-gray-700;
  }

  .btn.light-gray {
    @apply bg-gray-400;
  }

  .btn.light-gray:hover {
    @apply bg-gray-500;
  }

  .btn.green {
    @apply bg-green-700;
  }

  .btn.green:hover {
    @apply bg-green-600;
  }

  .btn.gr-blue {
    @apply bg-gradient-to-tl from-blue-600  to-blue-700;
  }

  .btn.gr-blue:hover {
    @apply bg-gradient-to-br;
  }

  .btn.gr-pink {
    @apply from-pink-600 bg-gradient-to-tl to-pink-700;
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
