<script setup lang="ts">
import { formatCurrency } from "~/utils/formatters";
import { CA_SDI_RATES, LTD_LIMITS } from "~/utils/constants";

useSeoMeta({
  title: "Benefit Calculator - CA SDI Navigator",
  description: "Estimate your CA SDI and FedEx LTD benefits",
});

const { inputs, outputs, resetInputs } = useCalculator();

const currentYear = new Date().getFullYear();
const currentRate = CA_SDI_RATES[currentYear] || CA_SDI_RATES[2026];

const showDetails = ref(false);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Benefit Calculator
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Estimate your CA SDI and FedEx LTD benefits to understand your potential
        income during disability.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Input Form -->
      <div class="space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-edit" class="w-5 h-5" />
              <h2 class="font-semibold">Your Information</h2>
            </div>
          </template>

          <div class="space-y-6">
            <!-- Income Section -->
            <div>
              <h3
                class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
              >
                Income Information
              </h3>

              <div class="space-y-4">
                <UFormField label="Annual Base Salary">
                  <UInput
                    v-model.number="inputs.annualBaseSalary"
                    type="number"
                    placeholder="350000"
                    :min="0"
                    :step="1000"
                  >
                    <template #leading>
                      <span class="text-gray-500">$</span>
                    </template>
                  </UInput>
                  <template #hint> Your approximate annual income </template>
                </UFormField>

                <UFormField label="Average Monthly Income (Last 12 Months)">
                  <UInput
                    v-model.number="inputs.averageMonthlyIncome"
                    type="number"
                    placeholder="30000"
                    :min="0"
                    :step="500"
                  >
                    <template #leading>
                      <span class="text-gray-500">$</span>
                    </template>
                  </UInput>
                </UFormField>

                <UFormField label="Highest Quarterly Income (Base Period)">
                  <UInput
                    v-model.number="inputs.highestQuarterlyIncome"
                    type="number"
                    placeholder="90000"
                    :min="0"
                    :step="1000"
                  >
                    <template #leading>
                      <span class="text-gray-500">$</span>
                    </template>
                  </UInput>
                  <template #hint>
                    This determines your CA SDI benefit amount
                  </template>
                </UFormField>
              </div>
            </div>

            <!-- Employment Section -->
            <USeparator />
            <div>
              <h3
                class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
              >
                Employment Details
              </h3>

              <div class="space-y-4">
                <UFormField label="Rank">
                  <URadioGroup
                    v-model="inputs.rank"
                    :items="[
                      { label: 'Captain', value: 'captain' },
                      { label: 'First Officer', value: 'first-officer' },
                    ]"
                  />
                </UFormField>

                <UFormField label="Years of Service">
                  <UInput
                    v-model.number="inputs.yearsOfService"
                    type="number"
                    placeholder="10"
                    :min="0"
                    :max="50"
                  />
                </UFormField>
              </div>
            </div>

            <!-- LTD Section -->
            <USeparator />
            <div>
              <h3
                class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
              >
                LTD Plan Details
              </h3>

              <div class="space-y-4">
                <UFormField label="LTD Percentage">
                  <URadioGroup
                    v-model="inputs.ltdPercentage"
                    :items="[
                      { label: '60% (Years 1-2)', value: 60 },
                      { label: '50% (Year 3+)', value: 50 },
                    ]"
                  />
                </UFormField>

                <UFormField label="Expected Disability Duration (Weeks)">
                  <UInput
                    v-model.number="inputs.expectedDisabilityWeeks"
                    type="number"
                    placeholder="26"
                    :min="1"
                    :max="52"
                  />
                </UFormField>

                <UFormField>
                  <UCheckbox
                    v-model="inputs.hasExhaustedSickBank"
                    label="Sick bank will be/is exhausted"
                  />
                  <template #hint>
                    Hartford offset only applies after sick bank is exhausted
                  </template>
                </UFormField>
              </div>
            </div>
          </div>

          <template #footer>
            <UButton variant="ghost" color="neutral" @click="resetInputs">
              <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
              Reset to Defaults
            </UButton>
          </template>
        </UCard>
      </div>

      <!-- Results -->
      <div class="space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-bar-chart-2" class="w-5 h-5" />
              <h2 class="font-semibold">Estimated Benefits</h2>
            </div>
          </template>

          <div class="space-y-6">
            <!-- CA SDI Benefits -->
            <div>
              <h3
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2"
              >
                <span class="w-3 h-3 rounded-full bg-blue-500" />
                CA SDI Benefits
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Weekly Benefit
                  </p>
                  <p
                    class="text-2xl font-bold text-blue-700 dark:text-blue-300"
                  >
                    {{ formatCurrency(outputs.caSDIWeeklyBenefit) }}
                  </p>
                </div>
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Total Benefit
                  </p>
                  <p
                    class="text-2xl font-bold text-blue-700 dark:text-blue-300"
                  >
                    {{ formatCurrency(outputs.caSDITotalBenefit) }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ inputs.expectedDisabilityWeeks }} weeks
                  </p>
                </div>
              </div>
            </div>

            <!-- FedEx LTD Benefits -->
            <div>
              <h3
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2"
              >
                <span class="w-3 h-3 rounded-full bg-purple-500" />
                FedEx LTD Benefits
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Monthly (Before Offset)
                  </p>
                  <p
                    class="text-2xl font-bold text-purple-700 dark:text-purple-300"
                  >
                    {{ formatCurrency(outputs.ltdMonthlyBeforeOffset) }}
                  </p>
                </div>
                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Expected Offset
                  </p>
                  <p class="text-2xl font-bold text-red-600 dark:text-red-400">
                    -{{ formatCurrency(outputs.expectedMonthlyOffset) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Net Income -->
            <USeparator />
            <div>
              <h3
                class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2"
              >
                <span class="w-3 h-3 rounded-full bg-green-500" />
                Net Monthly Income
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    During SDI Period
                  </p>
                  <p
                    class="text-2xl font-bold text-green-700 dark:text-green-300"
                  >
                    {{ formatCurrency(outputs.netMonthlyDuringSDI) }}
                  </p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    After SDI Exhausted
                  </p>
                  <p
                    class="text-2xl font-bold text-gray-700 dark:text-gray-300"
                  >
                    {{ formatCurrency(outputs.netMonthlyAfterSDI) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- SDI Tax -->
            <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Annual CA SDI Tax Paid
                  </p>
                  <p class="text-xs text-gray-500">
                    at {{ (currentRate.rate * 100).toFixed(1) }}% rate
                  </p>
                </div>
                <p class="text-xl font-bold text-amber-700 dark:text-amber-300">
                  {{ formatCurrency(outputs.annualSDITaxPaid) }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Details Toggle -->
        <UButton
          variant="ghost"
          class="w-full"
          @click="showDetails = !showDetails"
        >
          <UIcon
            :name="
              showDetails ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
            "
            class="w-4 h-4 mr-2"
          />
          {{ showDetails ? "Hide" : "Show" }} Calculation Details
        </UButton>

        <!-- Calculation Details -->
        <UCard v-if="showDetails">
          <template #header>
            <h3 class="font-semibold">How These Are Calculated</h3>
          </template>

          <div class="prose dark:prose-invert prose-sm max-w-none">
            <h4>CA SDI Benefit</h4>
            <p>
              Weekly Benefit = (Highest Quarter ÷ 13) × 70%<br />
              = ({{ formatCurrency(inputs.highestQuarterlyIncome) }} ÷ 13) ×
              0.70<br />
              = {{ formatCurrency(outputs.caSDIWeeklyBenefit) }}/week
            </p>
            <p class="text-sm text-gray-500">
              Maximum weekly benefit for {{ currentYear }}:
              {{ formatCurrency(currentRate.maxWeeklyBenefit) }}
            </p>

            <h4>FedEx LTD Benefit</h4>
            <p>
              Monthly Benefit = (Average Monthly Income ×
              {{ inputs.ltdPercentage }}%)<br />
              = {{ formatCurrency(inputs.averageMonthlyIncome) }} ×
              {{ inputs.ltdPercentage / 100 }}<br />
              = {{ formatCurrency(outputs.ltdMonthlyBeforeOffset) }}/month
            </p>
            <p class="text-sm text-gray-500">
              Subject to IRS 401(a)(17) cap of
              {{ formatCurrency(LTD_LIMITS.irs401a17) }} annual compensation
            </p>

            <h4>The Offset</h4>
            <p v-if="inputs.hasExhaustedSickBank">
              Hartford reduces your LTD by the CA SDI amount you're expected to
              receive, regardless of whether you've actually received it. This
              is the "offset problem" that creates cash flow issues.
            </p>
            <p v-else>
              Offset only applies after your sick bank is exhausted. Currently
              showing no offset since you indicated sick bank is not exhausted.
            </p>
          </div>
        </UCard>

        <!-- Disclaimer -->
        <CommonCallout variant="warning" title="Estimate Only">
          These calculations are estimates based on publicly available formulas.
          Actual benefits may vary. CA SDI benefits are determined by EDD based
          on your specific earnings record. LTD benefits are determined by The
          Hartford based on your plan documents.
        </CommonCallout>
      </div>
    </div>
  </div>
</template>
