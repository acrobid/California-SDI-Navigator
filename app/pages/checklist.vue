<script setup lang="ts">
import { formatDuration } from "~/utils/formatters";
import type { ChecklistPhase } from "~/types";

useSeoMeta({
  title: "Claim Checklist - CA SDI Navigator",
  description: "Track your progress through the CA SDI claim process",
});

const {
  toggleItem,
  isComplete,
  progress,
  itemsByPhase,
  phaseProgress,
  resetChecklist,
} = useChecklist();

const phaseLabels: Record<
  ChecklistPhase,
  { title: string; icon: string; description: string }
> = {
  preparation: {
    title: "Preparation",
    icon: "i-lucide-clipboard-list",
    description: "Get organized before you need to file",
  },
  filing: {
    title: "Filing Your Claim",
    icon: "i-lucide-file-text",
    description: "Submit your SDI claim to EDD",
  },
  "post-filing": {
    title: "After Filing",
    icon: "i-lucide-clock",
    description: "Track and follow up on your claim",
  },
  hartford: {
    title: "Hartford LTD",
    icon: "i-lucide-building",
    description: "Coordinate with The Hartford for LTD",
  },
  "in-person": {
    title: "EDD Office Visits",
    icon: "i-lucide-map-pin",
    description: "If you need to visit in person",
  },
};

const phases: ChecklistPhase[] = [
  "preparation",
  "filing",
  "post-filing",
  "hartford",
  "in-person",
];

const expandedItems = ref<Set<string>>(new Set());

const toggleExpanded = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  } else {
    expandedItems.value.add(id);
  }
};

const showResetConfirm = ref(false);

const handleReset = () => {
  resetChecklist();
  showResetConfirm.value = false;
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Your SDI Claim Checklist
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Track your progress through the CA SDI claim process. Your progress is
        saved locally in your browser.
      </p>
    </div>

    <!-- Progress Overview -->
    <UCard class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div class="flex-1">
          <div class="flex items-center gap-4 mb-2">
            <span class="text-2xl font-bold text-gray-900 dark:text-white"
              >{{ progress.percentage }}%</span
            >
            <span class="text-gray-500">Complete</span>
          </div>
          <UProgress :value="progress.percentage" color="primary" size="lg" />
          <p class="text-sm text-gray-500 mt-2">
            {{ progress.completed }} of {{ progress.total }} items completed
          </p>
        </div>
        <UButton variant="ghost" color="red" @click="showResetConfirm = true">
          <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
          Reset Checklist
        </UButton>
      </div>
    </UCard>

    <!-- Reset Confirmation Modal -->
    <UModal v-model:open="showResetConfirm">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center gap-2 text-red-600">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5" />
              <h3 class="font-semibold">Reset Checklist?</h3>
            </div>
          </template>

          <p class="text-gray-600 dark:text-gray-400">
            This will clear all your progress. This action cannot be undone.
          </p>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton variant="ghost" @click="showResetConfirm = false"
                >Cancel</UButton
              >
              <UButton color="red" @click="handleReset">Reset</UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>

    <!-- Checklist Phases -->
    <div class="space-y-6">
      <UCard v-for="phase in phases" :key="phase">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <UIcon
                  :name="phaseLabels[phase].icon"
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <h2 class="font-semibold text-gray-900 dark:text-white">
                  {{ phaseLabels[phase].title }}
                </h2>
                <p class="text-sm text-gray-500">
                  {{ phaseLabels[phase].description }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{ phaseProgress[phase]?.completed }}/{{
                  phaseProgress[phase]?.total
                }}
              </span>
              <UProgress
                :value="phaseProgress[phase]?.percentage || 0"
                color="primary"
                size="xs"
                class="w-20 mt-1"
              />
            </div>
          </div>
        </template>

        <div class="divide-y divide-gray-100 dark:divide-gray-800">
          <div
            v-for="item in itemsByPhase[phase]"
            :key="item.id"
            class="py-3 first:pt-0 last:pb-0"
          >
            <div class="flex items-start gap-3">
              <UCheckbox
                :model-value="isComplete(item.id)"
                class="mt-0.5"
                @update:model-value="toggleItem(item.id)"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <button
                    class="text-left font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    :class="{
                      'line-through text-gray-400 dark:text-gray-500':
                        isComplete(item.id),
                    }"
                    @click="toggleExpanded(item.id)"
                  >
                    {{ item.title }}
                  </button>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <UBadge variant="subtle" color="neutral" size="xs">
                      <UIcon name="i-lucide-clock" class="w-3 h-3 mr-1" />
                      {{ formatDuration(item.estimatedMinutes) }}
                    </UBadge>
                    <UButton
                      variant="ghost"
                      color="neutral"
                      size="xs"
                      :icon="
                        expandedItems.has(item.id)
                          ? 'i-lucide-chevron-up'
                          : 'i-lucide-chevron-down'
                      "
                      @click="toggleExpanded(item.id)"
                    />
                  </div>
                </div>

                <!-- Expanded Details -->
                <div v-if="expandedItems.has(item.id)" class="mt-3 space-y-3">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ item.description }}
                  </p>

                  <!-- Warnings -->
                  <div v-if="item.warnings?.length" class="space-y-2">
                    <div
                      v-for="warning in item.warnings"
                      :key="warning"
                      class="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-sm text-amber-800 dark:text-amber-200"
                    >
                      <UIcon
                        name="i-lucide-alert-triangle"
                        class="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <span>{{ warning }}</span>
                    </div>
                  </div>

                  <!-- Tips -->
                  <div v-if="item.tips?.length" class="space-y-2">
                    <div
                      v-for="tip in item.tips"
                      :key="tip"
                      class="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm text-green-800 dark:text-green-200"
                    >
                      <UIcon
                        name="i-lucide-lightbulb"
                        class="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <span>{{ tip }}</span>
                    </div>
                  </div>

                  <!-- Guide Link -->
                  <div v-if="item.guideLink">
                    <NuxtLink
                      :to="item.guideLink"
                      class="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <UIcon name="i-lucide-book-open" class="w-4 h-4" />
                      Read more in the guide
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Disclaimer -->
    <div class="mt-8">
      <CommonDisclaimer variant="compact" />
    </div>
  </div>
</template>
