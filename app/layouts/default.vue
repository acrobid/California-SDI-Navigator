<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <LayoutAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
