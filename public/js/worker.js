import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

console.log("Worker loaded.");
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg) => {
  handler.onmessage(msg);
};
