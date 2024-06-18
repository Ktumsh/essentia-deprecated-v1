import type { ManifestOptions } from "vite-plugin-pwa";

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
  baseURL: "https://essentia-cl.vercel.app/", // URL de producción.
  description:
    "Essentia es una plataforma de información sobre salud que proporciona recursos y herramientas para mejorar tu bienestar.",
  type: "website",
  image: {
    url: "https://essentia-cl.vercel.app/essentia-1200x630.jpg",
    alt: "Essentia",
    width: 1200,
    height: 630,
  },
  siteName: "Essentia",
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
  name: "Essentia",
  short_name: "Essentia",
  description:
    "Essentia es una plataforma de información sobre salud que proporciona recursos y herramientas para mejorar tu bienestar.",
  theme_color: "#000",
  background_color: "#030e1e",
  display: "standalone",
  icons: [
    {
      src: "/essentia-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/essentia-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/essentia-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};
