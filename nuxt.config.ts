// https://nuxt.com/docs/api/configuration/nuxt-config
import { execSync } from "node:child_process";
import { statSync } from "node:fs";

export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/image", "@nuxt/eslint", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",

  app: {
    viewTransition: true,
    head: {
      title: "CA SDI Navigator - FedEx Pilots",
      meta: [
        {
          name: "description",
          content:
            "Guide for FedEx pilots navigating California State Disability Insurance claims",
        },
        { name: "robots", content: "noindex, nofollow" }, // Keep private initially
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "CA SDI Navigator - FedEx Pilots",
        },
        {
          property: "og:description",
          content:
            "Guide for FedEx pilots navigating California State Disability Insurance claims",
        },
        { property: "og:image", content: "/og-image.svg" },
        { property: "og:image:type", content: "image/svg+xml" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "CA SDI Navigator" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "CA SDI Navigator - FedEx Pilots",
        },
        {
          name: "twitter:description",
          content:
            "Guide for FedEx pilots navigating California State Disability Insurance claims",
        },
        { name: "twitter:image", content: "/og-image.svg" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  experimental: {
    typedPages: true,
    defaults: {
      nuxtLink: {
        prefetchOn: { visibility: true },
      },
    },
  },

  routeRules: {
    "/**": {
      headers: { "cache-control": "s-maxage=86400, stale-while-revalidate" },
    },
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
  hooks: {
    'content:file:afterParse'(ctx: any) {
      if (ctx && ctx.file && ctx.file.path && ctx.file.path.endsWith('.md')) {
        const filePath = ctx.file.path;
        let lastUpdated: string | undefined;
        let updatedAt: number | undefined;

        try {
          const gitTime = execSync(`git log -1 --format=%ct "${filePath}"`, { encoding: 'utf8' }).trim();
          if (gitTime) {
            const timestamp = parseInt(gitTime, 10) * 1000;
            const date = new Date(timestamp);
            lastUpdated = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            updatedAt = timestamp;
          }
        } catch (e) {
          try {
            const stats = statSync(filePath);
            lastUpdated = stats.mtime.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            updatedAt = stats.mtime.getTime();
          } catch (fsErr) {
            const now = new Date();
            lastUpdated = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            updatedAt = now.getTime();
          }
        }

        if (ctx.content) {
          if (lastUpdated) ctx.content.lastUpdated = lastUpdated;
          if (updatedAt) ctx.content.updatedAt = updatedAt;
        }
      }
    }
  }
});

