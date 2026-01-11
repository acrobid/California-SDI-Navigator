<script setup lang="ts">
import { formatCurrency } from "~/utils/formatters";
import { CA_SDI_RATES, LTD_LIMITS } from "~/utils/constants";

useSeoMeta({
  title: "Benefit Calculator - CA SDI Navigator",
  description: "Estimate your CA SDI and FedEx LTD benefits",
});

const { inputs, outputs, resetInputs } = useCalculator();

const currentYear = new Date().getFullYear();
const currentRate = CA_SDI_RATES[currentYear] || CA_SDI_RATES[2026]; // Fallback to avoid error if 2026 keys specific

const showDetails = ref(false);
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:text-5xl"
      >
        Benefit Calculator
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Estimate your CA SDI and FedEx LTD benefits to understand your potential
        income stream during disability.
      </p>
    </div>

    <div class="grid xl:grid-cols-12 gap-8 items-start">
      <!-- Input Form -->
      <div class="xl:col-span-7 space-y-6">
        <UCard
          class="ring-1 ring-gray-200 dark:ring-gray-800 shadow-lg shadow-gray-100/50 dark:shadow-gray-900/50"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400"
              >
                <UIcon name="i-lucide-edit-3" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="font-semibold text-lg text-gray-900 dark:text-white">
                  Your Information
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter your details significantly affects the estimates.
                </p>
              </div>
            </div>
          </template>

          <div class="space-y-8 p-1">
            <!-- Income Section -->
            <div class="space-y-6">
              <h3
                class="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
              >
                <UIcon name="i-lucide-dollar-sign" class="w-4 h-4" />
                Income Information
              </h3>

              <div class="grid sm:grid-cols-2 gap-6">
                <UFormField label="Annual Base Salary" class="sm:col-span-2">
                  <UInput
                    v-model.number="inputs.annualBaseSalary"
                    type="number"
                    placeholder="350000"
                    :min="0"
                    :step="1000"
                    icon="i-lucide-banknote"
                    size="lg"
                  />
                  <template #hint> Your approximate annual income </template>
                </UFormField>

                <UFormField label="Avg Monthly Income (Last 12mo)">
                  <UInput
                    v-model.number="inputs.averageMonthlyIncome"
                    type="number"
                    placeholder="30000"
                    :min="0"
                    :step="500"
                    icon="i-lucide-calendar-days"
                  />
                </UFormField>

                <UFormField label="Highest Quarterly Income">
                  <UInput
                    v-model.number="inputs.highestQuarterlyIncome"
                    type="number"
                    placeholder="90000"
                    :min="0"
                    :step="1000"
                    icon="i-lucide-trending-up"
                  />
                  <template #hint> Base Period Quarter </template>
                </UFormField>
              </div>
            </div>

            <USeparator />

            <!-- Employment Section -->
            <div class="space-y-6">
              <h3
                class="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
              >
                <UIcon name="i-lucide-briefcase" class="w-4 h-4" />
                Employment Details
              </h3>

              <div class="grid sm:grid-cols-2 gap-6">
                <UFormField label="Rank">
                  <div class="flex gap-4">
                    <URadioGroup
                      v-model="inputs.rank"
                      :items="[
                        { label: 'Captain', value: 'captain' },
                        { label: 'First Officer', value: 'first-officer' },
                      ]"
                    />
                  </div>
                </UFormField>

                <UFormField label="Years of Service">
                  <UInput
                    v-model.number="inputs.yearsOfService"
                    type="number"
                    placeholder="10"
                    :min="0"
                    :max="50"
                    icon="i-lucide-award"
                  />
                </UFormField>
              </div>
            </div>

            <USeparator />

            <!-- LTD Section -->
            <div class="space-y-6">
              <h3
                class="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
              >
                <UIcon name="i-lucide-shield" class="w-4 h-4" />
                LTD Plan Details
              </h3>

              <div class="space-y-6">
                <UFormField label="LTD Percentage Tier">
                  <URadioGroup
                    v-model="inputs.ltdPercentage"
                    :items="[
                      { label: '60% (Years 1-2)', value: 60 },
                      { label: '50% (Year 3+)', value: 50 },
                    ]"
                    :ui="{ legend: 'mb-2' }"
                  />
                </UFormField>

                <div class="grid sm:grid-cols-2 gap-6">
                  <UFormField
                    label="Expected Disability Duration"
                    hint="In weeks"
                  >
                    <UInput
                      v-model.number="inputs.expectedDisabilityWeeks"
                      type="number"
                      placeholder="26"
                      :min="1"
                      :max="52"
                      icon="i-lucide-clock"
                    />
                  </UFormField>

                  <UFormField class="flex items-end pb-2">
                    <UCheckbox
                      v-model="inputs.hasExhaustedSickBank"
                      label="Sick bank is exhausted"
                      :ui="{ label: 'cursor-pointer' }"
                    />
                  </UFormField>
                </div>
                <p
                  class="text-xs text-amber-600 dark:text-amber-500 flex gap-1.5 items-center bg-amber-50 dark:bg-amber-950/30 p-2 rounded"
                >
                  <UIcon name="i-lucide-info" class="w-4 h-4 shrink-0" />
                  Hartford offset applies after sick bank is exhausted
                </p>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end p-2">
              <UButton
                variant="soft"
                color="neutral"
                size="sm"
                @click="resetInputs"
                icon="i-lucide-refresh-cw"
              >
                Reset to Defaults
              </UButton>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Results -->
      <div class="xl:col-span-5 space-y-6 sticky top-24">
        <UCard
          class="overflow-hidden border-0 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl shadow-primary-500/5 dark:shadow-primary-900/20"
          :ui="{ header: { padding: 'p-0' } }"
        >
          <template #header>
            <div
              class="p-6 bg-linear-to-br from-primary-600 to-indigo-700 text-white"
            >
              <div class="flex items-center gap-2 mb-2 opacity-90">
                <UIcon name="i-lucide-calculator" class="w-5 h-5" />
                <span class="font-medium text-sm text-primary-100"
                  >Estimated Total</span
                >
              </div>
              <div class="text-4xl font-bold tracking-tight">
                {{ formatCurrency(outputs.netMonthlyDuringSDI) }}
                <span class="text-lg font-normal text-primary-200">/mo</span>
              </div>
              <p class="text-sm text-primary-100 mt-1">During SDI Period</p>
            </div>
          </template>

          <div class="space-y-6 p-1">
            <!-- CA SDI Benefits -->
            <div class="relative pl-4 border-l-2 border-primary-500">
              <h3
                class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center justify-between"
              >
                <span>CA SDI Benefits</span>
                <UBadge color="primary" variant="subtle" size="xs"
                  >Weekly</UBadge
                >
              </h3>
              <div class="flex justify-between items-baseline mb-1">
                <span class="text-sm text-gray-500">Weekly Benefit</span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">{{
                  formatCurrency(outputs.caSDIWeeklyBenefit)
                }}</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="text-sm text-gray-500"
                  >Total ({{ inputs.expectedDisabilityWeeks }} wks)</span
                >
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >{{ formatCurrency(outputs.caSDITotalBenefit) }}</span
                >
              </div>
            </div>

            <USeparator />

            <!-- FedEx LTD Benefits -->
            <div class="relative pl-4 border-l-2 border-indigo-500">
              <h3
                class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center justify-between"
              >
                <span>FedEx LTD Benefits</span>
                <UBadge color="indigo" variant="subtle" size="xs"
                  >Monthly</UBadge
                >
              </h3>
              <div class="flex justify-between items-baseline mb-1">
                <span class="text-sm text-gray-500">Gross Amount</span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">{{
                  formatCurrency(outputs.ltdMonthlyBeforeOffset)
                }}</span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="text-sm text-gray-500">Offset Amount</span>
                <span class="text-sm font-medium text-red-600 dark:text-red-400"
                  >-{{ formatCurrency(outputs.expectedMonthlyOffset) }}</span
                >
              </div>
            </div>

            <USeparator />

            <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div class="flex justify-between items-baseline mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >After SDI Exhausted</span
                >
                <span class="text-xl font-bold text-gray-900 dark:text-white">{{
                  formatCurrency(outputs.netMonthlyAfterSDI)
                }}</span>
              </div>
              <p class="text-xs text-gray-500">
                Estimated monthly income once SDI runs out
              </p>
            </div>
          </div>
        </UCard>

        <!-- Tax Info -->
        <UCard
          :ui="{ body: { padding: 'p-4' } }"
          class="bg-amber-50/40 dark:bg-amber-950/10 border-amber-200/50 dark:border-amber-800/30"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <h4
                class="text-xs font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wide mb-0.5"
              >
                Annual SDI Tax Cost
              </h4>
              <p class="text-xs text-amber-600/80">
                {{ (currentRate.rate * 100).toFixed(1) }}% of wages
              </p>
            </div>
            <div class="text-lg font-bold text-amber-700 dark:text-amber-400">
              {{ formatCurrency(outputs.annualSDITaxPaid) }}
            </div>
          </div>
        </UCard>

        <!-- Details Toggle -->
        <UButton
          variant="ghost"
          block
          color="gray"
          class="justify-between group"
          @click="showDetails = !showDetails"
        >
          <span
            class="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
            >Show Calculation Details</span
          >
          <UIcon
            :name="
              showDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
            "
            class="w-4 h-4 text-gray-400 group-hover:text-gray-600"
          />
        </UButton>

        <!-- Calculation Details -->
        <div
          v-if="showDetails"
          class="animate-in slide-in-from-top-4 duration-300"
        >
          <UCard class="bg-gray-50 dark:bg-gray-900/50 text-sm">
            <div
              class="prose dark:prose-invert prose-sm max-w-none prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0"
            >
              <h4 class="text-gray-900 dark:text-gray-100">CA SDI Benefit</h4>
              <p class="text-gray-600 dark:text-gray-300">
                (Highest Quarter ÷ 13) × 70%<br />
                ({{ formatCurrency(inputs.highestQuarterlyIncome) }} ÷ 13) ×
                0.70<br />
                =
                <strong
                  >{{ formatCurrency(outputs.caSDIWeeklyBenefit) }}/week</strong
                >
              </p>

              <h4 class="text-gray-900 dark:text-gray-100">
                FedEx LTD Benefit
              </h4>
              <p class="text-gray-600 dark:text-gray-300">
                (Avg Monthly Income × {{ inputs.ltdPercentage }}%)<br />
                {{ formatCurrency(inputs.averageMonthlyIncome) }} ×
                {{ inputs.ltdPercentage / 100 }}<br />
                =
                <strong
                  >{{
                    formatCurrency(outputs.ltdMonthlyBeforeOffset)
                  }}/month</strong
                >
              </p>

              <h4 class="text-gray-900 dark:text-gray-100">The Offset</h4>
              <p
                class="text-gray-600 dark:text-gray-300"
                v-if="inputs.hasExhaustedSickBank"
              >
                <span class="text-amber-600 dark:text-amber-400 font-medium"
                  >Warning:</span
                >
                Hartford reduces LTD by the expected SDI amount.
              </p>
              <p class="text-gray-600 dark:text-gray-300" v-else>
                No offset applied currently (sick bank active).
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
