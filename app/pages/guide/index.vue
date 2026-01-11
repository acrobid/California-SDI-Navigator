<script setup lang="ts">
// Fetch all guide pages for navigation
const { data: allPages } = await useAsyncData("guide-index-pages", () => {
  return queryCollection("guide").order("order", "ASC").all();
});

// Organize pages by section
const sections = computed(() => {
  if (!allPages.value) return [];

  const sectionConfig: {
    key: string;
    title: string;
    description: string;
    icon: string;
  }[] = [
    {
      key: "/guide/overview",
      title: "Overview",
      description: "Understand how SDI and LTD work together",
      icon: "i-lucide-book-open",
    },
    {
      key: "/guide/preparation",
      title: "Preparation",
      description: "Get ready before filing your claim",
      icon: "i-lucide-clipboard-check",
    },
    {
      key: "/guide/filing",
      title: "Filing Your Claim",
      description: "Step-by-step filing instructions",
      icon: "i-lucide-file-text",
    },
    {
      key: "/guide/post-filing",
      title: "After Filing",
      description: "What to expect and how to track progress",
      icon: "i-lucide-clock",
    },
    {
      key: "/guide/hartford",
      title: "Hartford LTD",
      description: "Long-term disability and offset issues",
      icon: "i-lucide-shield",
    },
    {
      key: "/guide/in-person",
      title: "In-Person Visits",
      description: "When and how to visit EDD offices",
      icon: "i-lucide-building",
    },
    {
      key: "/guide/special",
      title: "Special Situations",
      description: "Out-of-state, VA disability, returning to work",
      icon: "i-lucide-star",
    },
  ];

  return sectionConfig
    .map((section) => ({
      ...section,
      pages:
        allPages.value?.filter(
          (p) => p.path !== "/guide" && p.path.startsWith(section.key),
        ) || [],
    }))
    .filter((section) => section.pages.length > 0);
});

// SEO
useSeoMeta({
  title: "SDI Guide | CA SDI Navigator",
  description:
    "Comprehensive guide to California State Disability Insurance for FedEx pilots",
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="bg-linear-to-br from-primary-600 to-primary-800 text-white py-16"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold mb-4">SDI Process Guide</h1>
          <p class="text-xl text-primary-100">
            A comprehensive guide to navigating California State Disability
            Insurance and Hartford Long-Term Disability as a FedEx pilot.
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="py-8 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
          <div class="flex items-start gap-4">
            <UIcon
              name="i-lucide-lightbulb"
              class="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 shrink-0"
            />
            <div>
              <h2 class="font-semibold text-gray-900 dark:text-white mb-2">
                New to SDI?
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Start with the overview section to understand how California SDI
                and Hartford LTD interact, and why this guide exists.
              </p>
              <NuxtLink to="/guide/overview/how-sdi-works">
                <UButton variant="soft" color="primary">
                  Start with the Basics
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                </UButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Guide Sections -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-12">
          <div v-for="section in sections" :key="section.key" class="space-y-4">
            <!-- Section Header -->
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <UIcon
                  :name="section.icon"
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ section.title }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ section.description }}
                </p>
              </div>
            </div>

            <!-- Section Pages -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-12">
              <NuxtLink
                v-for="page in section.pages"
                :key="page.path"
                :to="page.path"
                class="group block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div class="flex items-start gap-3">
                  <UIcon
                    :name="page.icon || 'i-lucide-file-text'"
                    class="w-5 h-5 text-gray-400 group-hover:text-primary-500 shrink-0 mt-0.5"
                  />
                  <div>
                    <h3
                      class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                    >
                      {{ page.title }}
                    </h3>
                    <p
                      v-if="page.description"
                      class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2"
                    >
                      {{ page.description }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="py-12 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Tools
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink
            to="/calculator"
            class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
          >
            <UIcon
              name="i-lucide-calculator"
              class="w-8 h-8 text-primary-500"
            />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                Calculator
              </div>
              <div class="text-sm text-gray-500">Estimate benefits</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/checklist"
            class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
          >
            <UIcon name="i-lucide-list-todo" class="w-8 h-8 text-green-500" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                Checklist
              </div>
              <div class="text-sm text-gray-500">Track your progress</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/timeline"
            class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
          >
            <UIcon name="i-lucide-calendar" class="w-8 h-8 text-blue-500" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                Timeline
              </div>
              <div class="text-sm text-gray-500">Key dates</div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/contacts"
            class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors"
          >
            <UIcon name="i-lucide-phone" class="w-8 h-8 text-orange-500" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                Contacts
              </div>
              <div class="text-sm text-gray-500">Important numbers</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Disclaimer variant="compact" />
      </div>
    </section>
  </div>
</template>
