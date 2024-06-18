import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import Compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  compressHTML: true,
  prefetch: true,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind(),
    react(),
    auth(),
    svelte(),
    Compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
      options: {
        brotli: true,
        zlib: {
          level: 9,
          memLevel: 8,
          strategy: "Z_DEFAULT_STRATEGY",
        },
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});
