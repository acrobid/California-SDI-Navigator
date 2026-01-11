<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 mt-auto"
  >
    <div class="container mx-auto px-4 py-8">
      <!-- Disclaimer -->
      <div
        class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
      >
        <p class="text-sm text-amber-800 dark:text-amber-200">
          <strong>Disclaimer:</strong> This website is an unofficial resource
          created by pilots for pilots. It is not affiliated with, endorsed by,
          or sponsored by FedEx, ALPA, The Hartford, or California EDD.
          Information provided is for educational purposes only and should not
          be construed as legal, financial, or medical advice. Always verify
          information with official sources and consult appropriate
          professionals for your specific situation.
        </p>
      </div>

      <!-- Footer Links -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
        >
          <UIcon name="i-lucide-shield-check" class="h-5 w-5" />
          <span>CA SDI Navigator for FedEx Pilots</span>
        </div>

        <div
          class="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400"
        >
          <NuxtLink
            to="/about"
            class="hover:text-primary-600 dark:hover:text-primary-400"
          >
            About
          </NuxtLink>
          <span>Last Updated: January {{ currentYear }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
