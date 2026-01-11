<script setup lang="ts">
type Variant = "info" | "warning" | "danger" | "tip" | "important";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    title?: string;
  }>(),
  {
    variant: "info",
  },
);

const variantClasses: Record<Variant, string> = {
  info: "bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  warning:
    "bg-amber-50 border-amber-500 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger:
    "bg-red-50 border-red-500 text-red-900 dark:bg-red-950 dark:text-red-100",
  tip: "bg-green-50 border-green-500 text-green-900 dark:bg-green-950 dark:text-green-100",
  important:
    "bg-purple-50 border-purple-500 text-purple-900 dark:bg-purple-950 dark:text-purple-100",
};

const iconMap: Record<Variant, string> = {
  info: "i-lucide-info",
  warning: "i-lucide-alert-triangle",
  danger: "i-lucide-alert-octagon",
  tip: "i-lucide-lightbulb",
  important: "i-lucide-star",
};
</script>

<template>
  <div
    :class="['my-4 p-4 rounded-lg border-l-4', variantClasses[props.variant]]"
  >
    <div class="flex items-start gap-3">
      <UIcon
        :name="iconMap[props.variant]"
        class="w-5 h-5 mt-0.5 flex-shrink-0"
      />
      <div class="flex-1">
        <p v-if="props.title" class="font-semibold mb-1">{{ props.title }}</p>
        <div class="text-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
