import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface ModalData {
  id: number;
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  component?: AstroComponentFactory;
}
