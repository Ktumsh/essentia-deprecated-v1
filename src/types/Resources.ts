import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Resources {
  id: number;
  title: string;
  resource: string;
  component: AstroComponentFactory;
  background?: string;
}
