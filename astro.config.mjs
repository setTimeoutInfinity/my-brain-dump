// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://lakzian.com",
  integrations: [tailwind(), mdx(), sitemap()],
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
