import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Resources {
  id: number;
  title: string;
  quote: string;
  intro: string;
  description?: string;
  image: string;
  imageFull: string;
  background: string;
  resource: string;
  component: AstroComponentFactory;
  span?: string;
}
