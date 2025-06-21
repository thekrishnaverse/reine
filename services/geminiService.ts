
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Car } from "../types";

// Ensure API_KEY is available from environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set in environment variables. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "FALLBACK_KEY_IF_YOU_WANT_TO_HANDLE_THIS_CASE" }); // Fallback to avoid crash if API_KEY is undefined, though calls will fail.

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const generateCarDescription = async (carName: string, basePrompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key for Gemini not configured. Cannot fetch AI description.");
  }
  
  try {
    const systemInstruction = `You are a highly skilled automotive copywriter specializing in Honda vehicles for the Indonesian market. 
    Your task is to generate enthusiastic, persuasive, and informative promotional descriptions. 
    Ensure the language is engaging, highlights unique selling points, and appeals to the likely target audience for each specific model. 
    Focus on benefits rather than just listing features. Maintain a professional yet exciting tone.
    The response should be in Bahasa Indonesia. 
    Format the output as a few paragraphs of text. Do not use markdown like headings or bullet points in your main description text, just flowing paragraphs.`;

    const fullPrompt = `Model: ${carName}\n\nInstruction: ${basePrompt}\n\nGenerate the description now:`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // For creative, yet grounded descriptions
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("Received an empty response from Gemini API.");
    }
    return text;

  } catch (error) {
    console.error(`Error generating description for ${carName}:`, error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             throw new Error("Kunci API Gemini tidak valid. Harap periksa konfigurasi Anda.");
        }
         throw new Error(`Gagal memuat deskripsi dari AI untuk ${carName}: ${error.message}`);
    }
    throw new Error(`Terjadi kesalahan tidak diketahui saat memuat deskripsi untuk ${carName}.`);
  }
};
