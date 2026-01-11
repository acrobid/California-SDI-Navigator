// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/image", "@nuxt/eslint"],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",

  app: {
    head: {
      title: "CA SDI Navigator - FedEx Pilots",
      meta: [
        {
          name: "description",
          content:
            "Guide for FedEx pilots navigating California State Disability Insurance claims",
        },
        { name: "robots", content: "noindex, nofollow" }, // Keep private initially
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/guide/**": { prerender: true },
    "/calculator": { prerender: true },
    "/checklist": { prerender: true },
    "/contacts": { prerender: true },
    "/timeline": { prerender: true },
    "/templates": { prerender: true },
    "/about": { prerender: true },
  },

  typescript: {
    strict: true,
  },
});
