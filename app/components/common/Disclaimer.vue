<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "compact" | "full";
  }>(),
  {
    variant: "full",
  },
);
</script>

<template>
  <div
    v-if="variant === 'full'"
    class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
  >
    <div class="flex items-start gap-3">
      <UIcon
        name="i-lucide-alert-triangle"
        class="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
      />
      <div>
        <p class="font-semibold text-amber-800 dark:text-amber-200 mb-2">
          Important Disclaimer
        </p>
        <p class="text-sm text-amber-800 dark:text-amber-200">
          This website is an unofficial resource created by pilots for pilots.
          It is not affiliated with, endorsed by, or sponsored by FedEx, ALPA,
          The Hartford, or California EDD. Information provided is for
          educational purposes only and should not be construed as legal,
          financial, or medical advice. Always verify information with official
          sources and consult appropriate professionals for your specific
          situation.
        </p>
      </div>
    </div>
  </div>

  <p v-else class="text-xs text-gray-500 dark:text-gray-400 italic">
    <UIcon name="i-lucide-info" class="w-3 h-3 inline-block mr-1" />
    Unofficial resource. Not affiliated with FedEx, ALPA, The Hartford, or CA
    EDD. For educational purposes only.
  </p>
</template>
