import { openai } from "../../config/aiClient.js";

const baseSystemPrompt =
  "You are an expert DSA mentor. Be concise, accurate, and practical. Never give full solutions.";

export const generateHint = async ({ problemTitle, pattern }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    messages: [
      { role: "system", content: baseSystemPrompt },
      {
        role: "user",
        content: `Give a short hint for the problem "${problemTitle}" using the ${pattern} pattern.`,
      },
    ],
  });

  return response.choices[0].message.content;
};

export const explainPattern = async ({ pattern }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [
      { role: "system", content: baseSystemPrompt },
      {
        role: "user",
        content: `Explain the ${pattern} pattern in simple terms. Include when to use it and common mistakes.`,
      },
    ],
  });

  return response.choices[0].message.content;
};

export const generateRevision = async ({ pattern }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [
      { role: "system", content: baseSystemPrompt },
      {
        role: "user",
        content: `Give quick revision notes for the ${pattern} pattern suitable before interviews.`,
      },
    ],
  });

  return response.choices[0].message.content;
};
