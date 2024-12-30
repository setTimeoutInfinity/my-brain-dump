// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://lakzian.com",
  integrations: [tailwind(), react(), mdx(), sitemap()],
  output: "server",

  experimental: {
    svg: {
      mode: "inline",
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});