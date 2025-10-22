// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://lakzian.com",
  integrations: [mdx(), sitemap()],
  output: "server",

  vite: {
    plugins: [tailwind()],
  },

  experimental: {
  },

  adapter: node({
    mode: "standalone",
  }),
});
