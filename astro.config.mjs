import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";

import Compress from "astro-compress";

import { VitePWA } from "vite-plugin-pwa";
import { manifest, seoConfig } from "./src/seoConfig";

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
  site: seoConfig.baseURL,
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    ssr: {
      noExternal: ["path-to-regexp"],
    },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        manifest,
        workbox: {
          globDirectory: ".vercel/output/static",
          globPatterns: ["**/*.{html,js,css,woff,woff2,ttf,eot,ico}"],
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "fonts",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
          ],
          navigateFallback: null,
        },
      }),
    ],
  },
});
