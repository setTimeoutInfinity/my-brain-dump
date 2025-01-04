// @ts-check
import { defineConfig, envField } from "astro/config";

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

  env: {
    schema: {
      RECAPTCHA_SITE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      RECAPTCHA_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      TELEGRAM_BOT_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      TELEGRAM_ADMIN_CHAT_ID: envField.number({
        context: "server",
        access: "secret",
        default: 96529466,
      }),
    },
  },
});
