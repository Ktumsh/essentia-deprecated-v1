import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

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
  integrations: [tailwind(), react(), auth(), svelte()],
  output: "server",
  adapter: vercel(),
});
