<script setup lang="ts">
const route = useRoute();

// Get current path
const currentPath = computed(() => {
  const slug = route.params.slug;
  if (Array.isArray(slug)) {
    return `/guide/${slug.join("/")}`;
  }
  return "/guide";
});

// Fetch the current page content
const { data: page } = await useAsyncData(`guide-${currentPath.value}`, () => {
  return queryCollection("guide").path(currentPath.value).first();
});

// Fetch all guide pages for navigation
const { data: allPages } = await useAsyncData("guide-pages", () => {
  return queryCollection("guide").order("order", "ASC").all();
});

// Organize pages by section
const sections = computed(() => {
  if (!allPages.value) return [];

  const sectionMap: Record<
    string,
    { title: string; pages: typeof allPages.value }
  > = {
    "/guide/overview": { title: "Overview", pages: [] },
    "/guide/preparation": { title: "Preparation", pages: [] },
    "/guide/filing": { title: "Filing", pages: [] },
    "/guide/post-filing": { title: "After Filing", pages: [] },
    "/guide/hartford": { title: "Hartford LTD", pages: [] },
    "/guide/in-person": { title: "In-Person Visits", pages: [] },
    "/guide/special": { title: "Special Situations", pages: [] },
  };

  allPages.value.forEach((p) => {
    if (p.path === "/guide") return; // Skip index page

    const section = Object.keys(sectionMap).find((s) => p.path.startsWith(s));
    if (section) {
      sectionMap[section].pages.push(p);
    }
  });

  return Object.entries(sectionMap)
    .filter(([_, data]) => data.pages.length > 0)
    .map(([path, data]) => ({ path, ...data }));
});

const isGuideMenuOpen = ref(false);

const accordionItems = computed(() => {
  return sections.value.map((section) => {
    const isCurrentSection = section.pages.some(
      (p) => p.path === currentPath.value,
    );
    return {
      label: section.title,
      defaultOpen: isCurrentSection,
      slot: "links",
      pages: section.pages,
    };
  });
});

// Find previous and next pages
const navigation = computed(() => {
  if (!allPages.value || !page.value) return { prev: null, next: null };

  const pages = allPages.value.filter((p) => p.path !== "/guide");
  const currentIndex = pages.findIndex((p) => p.path === page.value?.path);

  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : null,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
  };
});

// SEO
useSeoMeta({
  title: () =>
    page.value?.title ? `${page.value.title} | SDI Guide` : "SDI Guide",
  description: () =>
    page.value?.description || "California SDI guide for FedEx pilots",
});
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <!-- Sidebar Navigation -->
        <aside class="hidden lg:block lg:col-span-3">
          <nav class="sticky top-8 space-y-6">
            <!-- Back to Guide Index -->
            <NuxtLink
              to="/guide"
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              All Topics
            </NuxtLink>

            <!-- Section Navigation -->
            <UAccordion :items="accordionItems" multiple>
              <template #links="{ item }">
                <ul class="space-y-1 pb-2">
                  <li v-for="navPage in item.pages" :key="navPage.path">
                    <NuxtLink
                      :to="navPage.path"
                      class="block px-3 py-2 text-sm rounded-lg transition-colors"
                      :class="[
                        navPage.path === currentPath
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                      ]"
                    >
                      {{ navPage.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </template>
            </UAccordion>
          </nav>
        </aside>

        <!-- Mobile Navigation Sticky Bar -->
        <div
          class="lg:hidden sticky top-[65px] z-40 -mx-4 px-4 py-3 mb-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between"
        >
          <div class="flex items-center gap-2 overflow-hidden">
            <NuxtLink
              to="/guide"
              class="flex-shrink-0 text-gray-500 hover:text-primary-600 dark:text-gray-400"
            >
              <UIcon name="i-lucide-book-open" class="w-5 h-5" />
            </NuxtLink>
            <UIcon
              name="i-lucide-chevron-right"
              class="w-4 h-4 text-gray-400 flex-shrink-0"
            />
            <span
              class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate"
            >
              {{ page?.title }}
            </span>
          </div>

          <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-list-tree"
            label="In this Guide"
            size="sm"
            @click="isGuideMenuOpen = true"
          />
        </div>

        <!-- Mobile Navigation Slideover -->
        <USlideover v-model:open="isGuideMenuOpen" title="Guide Navigation">
          <template #body>
            <div class="flex flex-col gap-8">
              <!-- Page TOC for Mobile -->
              <div
                v-if="page?.body?.toc?.links?.length"
                class="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800"
              >
                <h4
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1"
                >
                  On This Page
                </h4>
                <ul class="space-y-3 px-1">
                  <li v-for="link in page.body.toc.links" :key="link.id">
                    <a
                      :href="`#${link.id}`"
                      class="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                      @click="isGuideMenuOpen = false"
                    >
                      {{ link.text }}
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Site Navigation -->
              <div class="space-y-4">
                <NuxtLink
                  to="/guide"
                  class="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 px-1 mb-4"
                  @click="isGuideMenuOpen = false"
                >
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                  All Guide Topics
                </NuxtLink>

                <UAccordion :items="accordionItems" multiple>
                  <template #links="{ item }">
                    <ul class="space-y-1 pb-2">
                      <li v-for="navPage in item.pages" :key="navPage.path">
                        <NuxtLink
                          :to="navPage.path"
                          class="block px-3 py-2 text-sm rounded-lg transition-colors"
                          :class="[
                            navPage.path === currentPath
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900',
                          ]"
                          @click="isGuideMenuOpen = false"
                        >
                          {{ navPage.title }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </template>
                </UAccordion>
              </div>
            </div>
          </template>
        </USlideover>

        <!-- Main Content -->
        <main class="lg:col-span-9">
          <div class="xl:grid xl:grid-cols-12 xl:gap-8">
            <article
              v-if="page"
              class="xl:col-span-9 prose prose-gray dark:prose-invert max-w-none"
            >
              <!-- Page Header -->
              <header class="not-prose mb-8">
                <div v-if="page.icon" class="mb-4">
                  <UIcon :name="page.icon" class="w-10 h-10 text-primary-500" />
                </div>
                <h1
                  class="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {{ page.title }}
                </h1>
                <p
                  v-if="page.description"
                  class="text-lg text-gray-600 dark:text-gray-400"
                >
                  {{ page.description }}
                </p>
                <div
                  v-if="page.lastUpdated"
                  class="mt-4 text-sm text-gray-500 dark:text-gray-500"
                >
                  Last updated: {{ page.lastUpdated }}
                </div>
              </header>

              <!-- Content -->
              <ContentRenderer :value="page" />
            </article>

            <!-- Table of Contents (On this page) -->
            <aside class="hidden xl:block xl:col-span-3">
              <div v-if="page?.body?.toc?.links?.length" class="sticky top-8">
                <h3
                  class="font-semibold text-gray-900 dark:text-white text-sm mb-4"
                >
                  On This Page
                </h3>
                <ul class="space-y-2 text-sm">
                  <li v-for="link in page.body.toc.links" :key="link.id">
                    <a
                      :href="`#${link.id}`"
                      class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {{ link.text }}
                    </a>
                    <ul v-if="link.children" class="ml-3 mt-1 space-y-2">
                      <li v-for="child in link.children" :key="child.id">
                        <a
                          :href="`#${child.id}`"
                          class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {{ child.text }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <!-- Page Navigation (Moved below grid) -->
          <nav
            v-if="navigation.prev || navigation.next"
            class="not-prose mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <div class="flex justify-between gap-4">
              <NuxtLink
                v-if="navigation.prev"
                :to="navigation.prev.path"
                class="flex-1 group"
              >
                <div
                  class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1"
                >
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
                  Previous
                </div>
                <div
                  class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  {{ navigation.prev.title }}
                </div>
              </NuxtLink>
              <div v-else class="flex-1" />

              <NuxtLink
                v-if="navigation.next"
                :to="navigation.next.path"
                class="flex-1 text-right group"
              >
                <div
                  class="flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1"
                >
                  Next
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                </div>
                <div
                  class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  {{ navigation.next.title }}
                </div>
              </NuxtLink>
            </div>
          </nav>
        </main>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <Callout variant="compact" />
    </div>
  </div>
</template>

<style scoped>
/* Hide the first H1 in markdown since we render it in the template header */
.prose :deep(h1:first-child) {
  display: none;
}

/* Custom prose styles for callouts */
.prose :deep(.callout) {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border-width: 1px;
}

.prose :deep(.callout-info) {
  background-color: rgb(239 246 255);
  border-color: rgb(191 219 254);
}

.dark .prose :deep(.callout-info) {
  background-color: rgb(30 58 138 / 0.2);
  border-color: rgb(30 64 175);
}

.prose :deep(.callout-warning) {
  background-color: rgb(254 252 232);
  border-color: rgb(254 240 138);
}

.dark .prose :deep(.callout-warning) {
  background-color: rgb(113 63 18 / 0.2);
  border-color: rgb(133 77 14);
}

.prose :deep(.callout-danger) {
  background-color: rgb(254 242 242);
  border-color: rgb(254 202 202);
}

.dark .prose :deep(.callout-danger) {
  background-color: rgb(127 29 29 / 0.2);
  border-color: rgb(153 27 27);
}

.prose :deep(.callout-tip) {
  background-color: rgb(240 253 244);
  border-color: rgb(187 247 208);
}

.dark .prose :deep(.callout-tip) {
  background-color: rgb(20 83 45 / 0.2);
  border-color: rgb(22 101 52);
}
</style>
