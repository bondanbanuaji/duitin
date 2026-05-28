import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  // Can be overriden by client-side settings, default to env var
  return process.env.GEMINI_API_KEY || "";
}

export const genAI = new GoogleGenerativeAI(getApiKey());

export const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  systemInstruction: "You are Duitin AI, an intelligent personal finance assistant embedded in the Duitin app. Your job is to help users track expenses, analyze their budget, and navigate the app.",
});
