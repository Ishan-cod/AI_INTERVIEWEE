import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const Groq_LLM = new ChatOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-70b-8192",
  maxTokens: 500,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
});

const Google_LLM = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-1.5-flash",
  maxOutputTokens: 500,
  temperature: 0.7,
});

export { Groq_LLM, Google_LLM };
