<script setup lang="ts">
import {
  CA_SDI_RATES,
  HARTFORD_APPEAL_DAYS,
  EDD_FILING_DEADLINE_DAYS,
} from "~/utils/constants";

useSeoMeta({
  title: "CA SDI Navigator - FedEx Pilots",
  description:
    "Guide for FedEx pilots navigating California State Disability Insurance claims",
});

const currentYear = new Date().getFullYear();
const currentRate = CA_SDI_RATES[currentYear] || CA_SDI_RATES[2026];

const quickLinks = [
  {
    title: "Process Guide",
    description: "Step-by-step documentation of the CA SDI claim process",
    icon: "i-lucide-book-open",
    to: "/guide",
    color: "primary",
  },
  {
    title: "Benefit Calculator",
    description: "Estimate your CA SDI and LTD benefits",
    icon: "i-lucide-calculator",
    to: "/calculator",
    color: "green",
  },
  {
    title: "Claim Checklist",
    description: "Track your progress through the process",
    icon: "i-lucide-check-square",
    to: "/checklist",
    color: "blue",
  },
  {
    title: "Timeline",
    description: "Visualize your claim timeline and deadlines",
    icon: "i-lucide-calendar",
    to: "/timeline",
    color: "orange",
  },
];

const keyInfo = [
  {
    title: "Current SDI Rate",
    value: `${(currentRate.rate * 100).toFixed(1)}%`,
    subtitle: `${currentYear} - No income cap`,
    icon: "i-lucide-percent",
  },
  {
    title: "Max Weekly Benefit",
    value: `$${currentRate.maxWeeklyBenefit.toLocaleString()}`,
    subtitle: `${currentYear} maximum`,
    icon: "i-lucide-dollar-sign",
  },
  {
    title: "Filing Deadline",
    value: `${EDD_FILING_DEADLINE_DAYS} Days`,
    subtitle: "From disability start",
    icon: "i-lucide-clock",
  },
  {
    title: "Hartford Appeal",
    value: `${HARTFORD_APPEAL_DAYS} Days`,
    subtitle: "6-month deadline",
    icon: "i-lucide-alert-triangle",
  },
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="max-w-3xl">
          <h1
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Navigate CA SDI as a FedEx Pilot
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            A comprehensive guide to claiming California State Disability
            Insurance while coordinating with FedEx Long-Term Disability
            benefits. Created by pilots, for pilots.
          </p>
          <div class="flex flex-wrap gap-4">
            <UButton to="/guide" size="lg" color="primary">
              <UIcon name="i-lucide-book-open" class="w-5 h-5 mr-2" />
              Read the Guide
            </UButton>
            <UButton
              to="/checklist"
              size="lg"
              variant="outline"
              color="neutral"
            >
              <UIcon name="i-lucide-check-square" class="w-5 h-5 mr-2" />
              Start Checklist
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Quick Access
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
            >
              <UIcon :name="link.icon" class="w-6 h-6" />
            </div>
          </div>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400"
          >
            {{ link.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ link.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <!-- Key Information -->
    <section class="bg-gray-50 dark:bg-gray-800/50 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Key Information ({{ currentYear }})
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div
            v-for="info in keyInfo"
            :key="info.title"
            class="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3 mb-3">
              <UIcon :name="info.icon" class="w-5 h-5 text-gray-500" />
              <span
                class="text-sm font-medium text-gray-600 dark:text-gray-400"
                >{{ info.title }}</span
              >
            </div>
            <p
              class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            >
              {{ info.value }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ info.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Problem Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Why This Guide Exists
        </h2>

        <CommonCallout variant="warning" title="The Offset Problem">
          When you become disabled, The Hartford (FedEx's LTD provider) reduces
          your LTD payments by the amount they expect you to receive from CA
          SDI—<strong>even if you haven't received that payment yet</strong>.
          This can leave you with significantly reduced income during an already
          stressful time.
        </CommonCallout>

        <div class="prose dark:prose-invert max-w-none mt-6">
          <p>
            California-based FedEx pilots face a unique challenge: they pay into
            CA SDI through mandatory payroll deductions, but navigating the
            actual claims process is complex and poorly documented. The EDD
            system was not designed for airline pilot pay structures, and
            bureaucratic delays can create serious financial hardship.
          </p>

          <p>
            This guide consolidates the hard-won knowledge of pilots who have
            successfully navigated this process, so you don't have to figure it
            out from scratch.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-4">
          <UButton to="/guide/overview/offset-problem" variant="outline">
            Learn About the Offset Problem
          </UButton>
          <UButton to="/contacts" variant="ghost">
            View Contact Directory
          </UButton>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="container mx-auto px-4 pb-12">
      <CommonDisclaimer variant="full" />
    </section>
  </div>
</template>
