<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-950 font-sans selection:bg-primary-500/30"
  >
    <!-- Subtle background pattern -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent opacity-50 dark:opacity-20"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 dark:opacity-20"
      />
    </div>

    <LayoutAppHeader class="relative z-50" />

    <main
      class="flex-1 relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <slot />
    </main>

    <LayoutAppFooter class="relative z-10" />
  </div>
</template>
