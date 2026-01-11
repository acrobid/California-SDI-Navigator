<script setup lang="ts">
import {
  CA_SDI_RATES,
  EDD_FILING_DEADLINE_DAYS,
  HARTFORD_APPEAL_DAYS,
} from "~/utils/constants";

useSeoMeta({
  title: "CA SDI Navigator - FedEx Pilots",
  description:
    "Guide for FedEx pilots navigating California State Disability Insurance claims",
});

const currentYear = new Date().getFullYear();
const currentRate = CA_SDI_RATES[currentYear] || CA_SDI_RATES[2026];

const quickLinks = [
  // why this guide exists
  {
    title: "Why this guide exists",
    description:
      "Understand the unique challenges FedEx pilots face with CA SDI",
    icon: "lucide-info",
    to: "/guide/overview/why-this-guide",
  },
  {
    title: "Process Guide",
    description: "Step-by-step documentation of the CA SDI claim process",
    icon: "i-lucide-book-open",
    to: "/guide",
  },
  {
    title: "Claim Checklist",
    description: "Track your progress through the process",
    icon: "lucide-check",
    to: "/checklist",
    color: "indigo", // Task
  },
  {
    title: "Timeline",
    description: "Visualize your claim timeline and deadlines",
    icon: "i-lucide-calendar",
    to: "/timeline",
  },
  {
    title: "Benefit Calculator",
    description: "Estimate your CA SDI and LTD benefits",
    icon: "i-lucide-calculator",
    to: "/calculator",
  },
];

const keyInfo = [
  {
    title: "Current SDI Rate",
    value: `${(currentRate.rate * 100).toFixed(1)}%`,
    description: "of gross wages",
    icon: "i-lucide-percent",
  },
  {
    title: "Max Weekly Benefit",
    value: `$${currentRate.maxWeeklyBenefit}`,
    description: `for ${currentYear}`,
    icon: "i-lucide-trending-up",
  },
  {
    title: "Filing Deadline",
    value: `${EDD_FILING_DEADLINE_DAYS} Days`,
    description: "from start of disability",
    icon: "i-lucide-clock",
  },
  {
    title: "Appeal Window",
    value: `${HARTFORD_APPEAL_DAYS} Days`,
    description: "to appeal Hartford denial",
    icon: "i-lucide-alert-circle",
  },
];
</script>

<template>
  <div class="space-y-16 animate-in fade-in duration-700">
    <!-- Hero Section -->
    <section class="relative py-12 sm:py-20 lg:py-24 text-center">
      <div class="mx-auto max-w-4xl space-y-6">
        <UBadge variant="subtle" size="md" class="rounded-full px-3 py-1 mb-4">
          Updated for {{ currentYear }}
        </UBadge>
        <h1
          class="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          Navigator for
          <span
            class="bg-linear-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent"
            >CA SDI</span
          >
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          A specialized resource for FedEx pilots navigating California State
          Disability Insurance and The Hartford LTD integration.
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <UButton size="xl" to="/guide" icon="i-lucide-arrow-right" trailing
            >Start the Guide</UButton
          >
          <UButton
            size="xl"
            variant="soft"
            color="neutral"
            to="/calculator"
            icon="i-lucide-calculator"
            >Estimate Benefits</UButton
          >
        </div>
      </div>
    </section>

    <!-- Quick Links Grid -->
    <section>
      <div class="grid md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="group relative"
          prefetch-on="interaction"
        >
          <UCard
            class="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-gray-200/50 dark:group-hover:shadow-black/50 overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800"
          >
            <template #header>
              <div class="flex items-center gap-4">
                <div
                  :class="`p-3 rounded-xl bg-${link.color}-50 dark:bg-${link.color}-950/30 text-${link.color}-600 dark:text-${link.color}-400 group-hover:scale-110 transition-transform duration-300`"
                >
                  <UIcon :name="link.icon" class="w-6 h-6" />
                </div>
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  {{ link.title }}
                </h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-400 text-base">
              {{ link.description }}
            </p>
            <div
              class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0"
            >
              <UIcon
                name="i-lucide-arrow-right"
                class="w-5 h-5 text-gray-400 group-hover:text-primary-500"
              />
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </section>

    <!-- Key Stats -->
    <section>
      <UCard class="bg-gray-50 dark:bg-gray-900/50">
        <div
          class="grid md:grid-cols-3 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800"
        >
          <div
            v-for="stat in keyInfo"
            :key="stat.title"
            class="py-4 md:pt-0 px-4"
          >
            <div
              class="mb-2 text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <UIcon :name="stat.icon" class="w-4 h-4" />
              {{ stat.title }}
            </div>
            <div class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-500">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </UCard>
    </section>

    <!-- Important Notice -->
    <section class="max-w-3xl mx-auto">
      <UAlert
        icon="i-lucide-info"
        color="neutral"
        variant="subtle"
        title="Unofficial Resource"
        description="This guide is maintained by pilots for pilots. Please verify all information with ALPA, FedEx, and California EDD official documentation."
      />
    </section>
  </div>
</template>
