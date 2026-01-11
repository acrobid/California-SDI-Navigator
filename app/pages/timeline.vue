<script setup lang="ts">
import { formatDateShort } from "~/utils/formatters";

useSeoMeta({
  title: "Claim Timeline - CA SDI Navigator",
  description: "Visualize your CA SDI claim timeline and important deadlines",
});

const { inputs, output, updateInput } = useTimeline();

const _eventTypeColors: Record<string, string> = {
  edd: "blue",
  hartford: "purple",
  personal: "green",
  deadline: "red",
};

const eventTypeLabels: Record<string, string> = {
  edd: "EDD Process",
  hartford: "Hartford LTD",
  personal: "Personal",
  deadline: "Deadline",
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Claim Timeline
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Visualize your expected timeline based on your disability start date and
        filing method.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Inputs -->
      <div>
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-settings" class="w-5 h-5" />
              <h2 class="font-semibold">Your Situation</h2>
            </div>
          </template>

          <div class="space-y-4">
            <UFormField label="Disability Start Date">
              <UInput
                :model-value="inputs.claimStartDate"
                type="date"
                @update:model-value="
                  updateInput('claimStartDate', $event as string)
                "
              />
              <template #hint> Usually your last day worked </template>
            </UFormField>

            <UFormField label="Filing Method">
              <URadioGroup
                :model-value="inputs.filingMethod"
                :items="[
                  { label: 'Online', value: 'online' },
                  { label: 'Mail', value: 'mail' },
                  { label: 'In-Person', value: 'in-person' },
                ]"
                @update:model-value="
                  updateInput(
                    'filingMethod',
                    $event as 'online' | 'mail' | 'in-person',
                  )
                "
              />
              <template #hint>
                Mail adds ~2 weeks; In-person may be faster
              </template>
            </UFormField>

            <UFormField>
              <UCheckbox
                :model-value="inputs.livesInCalifornia"
                label="I live in California"
                @update:model-value="
                  updateInput('livesInCalifornia', $event as boolean)
                "
              />
            </UFormField>
          </div>
        </UCard>

        <!-- Legend -->
        <UCard class="mt-6">
          <template #header>
            <h3 class="font-semibold text-sm">Legend</h3>
          </template>

          <div class="space-y-2">
            <div
              v-for="(label, type) in eventTypeLabels"
              :key="type"
              class="flex items-center gap-2"
            >
              <span
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-blue-500': type === 'edd',
                  'bg-purple-500': type === 'hartford',
                  'bg-green-500': type === 'personal',
                  'bg-red-500': type === 'deadline',
                }"
              />
              <span class="text-sm text-gray-600 dark:text-gray-400">{{
                label
              }}</span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Timeline -->
      <div class="lg:col-span-2">
        <!-- Critical Deadlines Alert -->
        <CommonCallout
          v-if="
            output.criticalDeadlines.some(
              (d) => d.daysFromNow <= 30 && d.daysFromNow >= 0,
            )
          "
          variant="danger"
          title="Upcoming Deadlines"
        >
          <ul class="list-disc list-inside space-y-1">
            <li
              v-for="deadline in output.criticalDeadlines.filter(
                (d) => d.daysFromNow <= 30 && d.daysFromNow >= 0,
              )"
              :key="deadline.name"
            >
              <strong>{{ deadline.name }}:</strong>
              {{ formatDateShort(deadline.date) }} ({{ deadline.daysFromNow }}
              days)
            </li>
          </ul>
        </CommonCallout>

        <!-- Timeline Events -->
        <UCard class="mt-6">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="w-5 h-5" />
              <h2 class="font-semibold">Expected Timeline</h2>
            </div>
          </template>

          <div class="relative">
            <!-- Timeline line -->
            <div
              class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
            />

            <!-- Events -->
            <div class="space-y-6">
              <div
                v-for="event in output.events"
                :key="event.id"
                class="relative pl-10"
              >
                <!-- Timeline dot -->
                <div
                  class="absolute left-2.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900"
                  :class="{
                    'bg-blue-500': event.type === 'edd',
                    'bg-purple-500': event.type === 'hartford',
                    'bg-green-500': event.type === 'personal',
                    'bg-red-500': event.type === 'deadline',
                  }"
                />

                <div
                  class="p-4 rounded-lg border"
                  :class="{
                    'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20':
                      event.isCritical || event.type === 'deadline',
                    'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800':
                      !event.isCritical && event.type !== 'deadline',
                  }"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white">
                          {{ event.name }}
                        </h3>
                        <UBadge
                          v-if="event.isCritical"
                          color="red"
                          variant="subtle"
                          size="xs"
                        >
                          Critical
                        </UBadge>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {{ event.description }}
                      </p>
                    </div>
                    <div class="text-right shrink-0">
                      <p class="font-medium text-gray-900 dark:text-white">
                        {{ formatDateShort(event.expectedDate) }}
                      </p>
                      <p
                        v-if="event.varianceDays > 0"
                        class="text-xs text-gray-500"
                      >
                        ± {{ event.varianceDays }} days
                      </p>
                    </div>
                  </div>

                  <!-- Duration bar for events with duration -->
                  <div v-if="event.durationDays > 0" class="mt-3">
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                      <span>{{ formatDateShort(event.expectedDate) }}</span>
                      <div
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                      >
                        <div
                          class="h-full rounded-full"
                          :class="{
                            'bg-blue-400': event.type === 'edd',
                            'bg-purple-400': event.type === 'hartford',
                            'bg-green-400': event.type === 'personal',
                          }"
                          style="width: 100%"
                        />
                      </div>
                      <span>{{ event.durationDays }} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Critical Deadlines Summary -->
        <UCard class="mt-6">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-alert-circle"
                class="w-5 h-5 text-red-500"
              />
              <h2 class="font-semibold">Critical Deadlines</h2>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="deadline in output.criticalDeadlines"
              :key="deadline.name"
              class="flex items-center justify-between p-3 rounded-lg"
              :class="{
                'bg-red-50 dark:bg-red-900/20':
                  deadline.daysFromNow <= 30 && deadline.daysFromNow >= 0,
                'bg-amber-50 dark:bg-amber-900/20':
                  deadline.daysFromNow > 30 && deadline.daysFromNow <= 60,
                'bg-gray-50 dark:bg-gray-800':
                  deadline.daysFromNow > 60 || deadline.daysFromNow < 0,
              }"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ deadline.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ formatDateShort(deadline.date) }}
                </p>
              </div>
              <UBadge
                :color="
                  deadline.daysFromNow < 0
                    ? 'neutral'
                    : deadline.daysFromNow <= 30
                      ? 'red'
                      : deadline.daysFromNow <= 60
                        ? 'orange'
                        : 'green'
                "
                variant="subtle"
              >
                {{
                  deadline.daysFromNow < 0
                    ? "Passed"
                    : `${deadline.daysFromNow} days`
                }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="mt-8">
      <CommonCallout variant="info" title="Timeline Estimates">
        These timelines are estimates based on typical processing times. Actual
        timelines can vary significantly based on EDD workload, completeness of
        your application, and other factors.
      </CommonCallout>
    </div>
  </div>
</template>
