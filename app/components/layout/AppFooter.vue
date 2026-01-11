<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm mt-12"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Disclaimer -->
      <UCard
        class="mb-8 bg-amber-50/50 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/50 shadow-sm"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <div class="flex gap-3">
          <UIcon
            name="i-lucide-alert-triangle"
            class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
          />
          <div
            class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed"
          >
            <strong>Disclaimer:</strong> This website is an unofficial resource
            created by pilots for pilots. It is not affiliated with, endorsed
            by, or sponsored by FedEx, ALPA, The Hartford, or California EDD.
            Information provided is for educational purposes only and should not
            be construed as legal, financial, or medical advice. Always verify
            information with official sources and consult appropriate
            professionals for your specific situation.
          </div>
        </div>
      </UCard>

      <!-- Footer Links -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
      >
        <div
          class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <UIcon name="i-lucide-shield-check" class="h-5 w-5 opacity-75" />
          <span>CA SDI Navigator for FedEx Pilots</span>
        </div>

        <div
          class="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400"
        >
          <UButton
            to="/about"
            variant="ghost"
            color="neutral"
            size="sm"
            class="hover:text-primary-600 dark:hover:text-primary-400"
          >
            About
          </UButton>
          <span class="opacity-75"
            >Last Updated: January {{ currentYear }}</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>
