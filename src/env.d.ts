/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  getThemePreference(): "dark" | "light";
}
