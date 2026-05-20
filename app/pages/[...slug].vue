<script setup lang="ts">
const route = useRoute()

// Check if route looks like a static asset/file request (has an extension)
const hasExtension = /\.[a-z0-9]+$/i.test(route.path)

const { data: page } = await useAsyncData('page-' + route.path, () => {
  if (hasExtension) return Promise.resolve(null)
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: !hasExtension
  })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
