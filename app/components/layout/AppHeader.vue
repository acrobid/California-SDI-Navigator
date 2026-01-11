<script setup lang="ts">
const navigation = [
  { label: "Home", to: "/", icon: "i-lucide-home" },
  { label: "Guide", to: "/guide", icon: "i-lucide-book-open" },
  { label: "Calculator", to: "/calculator", icon: "i-lucide-calculator" },
  { label: "Checklist", to: "/checklist", icon: "i-lucide-check-square" },
  { label: "Timeline", to: "/timeline", icon: "i-lucide-calendar" },
  { label: "Contacts", to: "/contacts", icon: "i-lucide-contact" },
  { label: "Templates", to: "/templates", icon: "i-lucide-file-text" },
];

const mobileMenuOpen = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl supports-backdrop-filter:bg-white/60"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 group"
          prefetch-on="interaction"
        >
          <div class="relative flex items-center justify-center">
            <div
              class="absolute inset-0 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <UIcon
              name="i-lucide-shield-check"
              class="relative h-8 w-8 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span
            class="font-bold text-lg hidden sm:inline bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:to-primary-500 transition-all duration-300"
            >CA SDI Navigator</span
          >
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <UButton
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :icon="item.icon"
            variant="ghost"
            color="neutral"
            class="text-sm font-medium transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
            active-class="!text-primary-600 dark:!text-primary-400 bg-primary-50 dark:bg-primary-950/40 ring-1 ring-primary-500/20"
            prefetch-on="interaction"
          >
            {{ item.label }}
          </UButton>
        </nav>

        <!-- Mobile Menu -->
        <USlideover v-model:open="mobileMenuOpen" title="Menu">
          <UButton
            class="lg:hidden"
            variant="ghost"
            color="neutral"
            icon="i-lucide-menu"
          />

          <template #body>
            <div class="flex flex-col gap-2">
              <UButton
                v-for="item in navigation"
                :key="item.to"
                :to="item.to"
                :icon="item.icon"
                variant="ghost"
                color="neutral"
                class="justify-start text-base"
                active-class="!text-primary-600 dark:!text-primary-400 bg-primary-50 dark:bg-primary-950/40"
                @click="mobileMenuOpen = false"
              >
                {{ item.label }}
              </UButton>
            </div>
          </template>
        </USlideover>
      </div>
    </div>
  </header>
</template>
