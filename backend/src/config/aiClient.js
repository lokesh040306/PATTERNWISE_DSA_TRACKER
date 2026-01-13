import OpenAI from "openai";
import { env } from "./env.js";

if (!env.AI_API_KEY) {
  throw new Error("AI_API_KEY is missing in environment variables");
}

export const openai = new OpenAI({
  apiKey: env.AI_API_KEY,
});
