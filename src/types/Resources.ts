import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Resources {
  id: number;
  title: string;
  intro: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  videoImage: string;
  description?: string;
  image: string;
  imageFull: string;
  background: string;
  resource: string;
  component: AstroComponentFactory;
  span?: string;
}
