<script setup lang="ts">
const navigation = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'Guide', to: '/guide', icon: 'i-lucide-book-open' },
  { label: 'Calculator', to: '/calculator', icon: 'i-lucide-calculator' },
  { label: 'Checklist', to: '/checklist', icon: 'i-lucide-check-square' },
  { label: 'Timeline', to: '/timeline', icon: 'i-lucide-calendar' },
  { label: 'Contacts', to: '/contacts', icon: 'i-lucide-contact' },
  { label: 'Templates', to: '/templates', icon: 'i-lucide-file-text' },
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-lucide-shield-check" class="h-8 w-8 text-primary-500" />
          <span class="font-bold text-lg hidden sm:inline">CA SDI Navigator</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            active-class="!text-primary-600 dark:!text-primary-400 bg-primary-50 dark:bg-primary-900/20"
          >
            <UIcon :name="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <UButton
          class="lg:hidden"
          variant="ghost"
          color="neutral"
          :icon="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>

      <!-- Mobile Navigation -->
      <nav v-if="mobileMenuOpen" class="lg:hidden pb-4">
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            active-class="!text-primary-600 dark:!text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            @click="mobileMenuOpen = false"
          >
            <UIcon :name="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
