import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppSettings } from '../types';

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_SYSTEM_INSTRUCTION = `
You are a knowledgeable Islamic Finance Advisor (Mufti of Economics) designed for a web application styled after the Ottoman Empire. 
Your tone should be respectful, wise, and slightly archaic/formal (using terms like "Honored user", "Insha'Allah", "Barakallahu Feek"), but your financial advice must be modern, accurate, and based on standard Islamic finance principles (Fiqh al-Muamalat).

Rules:
1. Provide concise answers regarding Zakat, Inheritance, Halal Investments, and Trade.
2. If a topic is controversial, mention that there are difference of opinions (Ikhtilaf) among scholars.
3. Keep responses structured and easy to read.
4. Do not provide binding legal fatwas; advise the user to consult a local scholar for specific personal rulings.
`;

export const getFinancialAdvice = async (userPrompt: string, settings?: AppSettings): Promise<string> => {
  try {
    // Inject user context into the system instruction for this specific request
    let contextInstruction = BASE_SYSTEM_INSTRUCTION;
    
    if (settings) {
      contextInstruction += `\n
      User Context:
      - Language: ${settings.language} (If the user asks in this language, reply in it. If they ask in English, reply in English but acknowledge their region).
      - Country: ${settings.country} (Consider local madhabs or customs prevalent here if relevant).
      - Currency: ${settings.currency} (Use this currency for examples).
      `;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: contextInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, but I could not ponder an answer at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Forgive me, there seems to be a disturbance in the connection to the archives.";
  }
};

export const getMetalRatesFromAI = async (currency: string, country: string): Promise<{ gold: number; silver: number } | null> => {
  try {
    const prompt = `Act as a financial market oracle for Zakat calculations.
    Retrieve the current ESTIMATED RETAIL MARKET PRICE per GRAM.
    
    Target:
    1. 24k Gold per gram
    2. Silver per gram
    
    Context:
    - Currency: ${currency}
    - Country: ${country}
    
    CRITICAL SOURCE INSTRUCTIONS:
    - If Country is "India": You MUST simulate looking up "MMTC-PAMP" or "IBJA" (Indian Bullion and Jewellers Association) rates. Note that Indian retail gold prices include Customs Duty + GST, so they are higher than international spot rates. (e.g., if spot is 7300, retail might be 8200+).
    - If Country is "USA": Check "Kitco" or "APMEX".
    - If Country is "UK": Check "The Royal Mint" or "BullionByPost".
    - If Country is "UAE" or "Saudi Arabia": Check local Gold Souq rates (Dubai Gold & Jewellery Group).
    
    Output Rules:
    - Return ONLY a JSON object.
    - Format: { "gold": number, "silver": number }
    - Do not include markdown formatting like \`\`\`json.
    - values should be simple numbers (e.g. 8450.50).
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json"
      },
    });

    const text = response.text?.trim();
    if (!text) return null;
    
    const data = JSON.parse(text);
    
    return {
      gold: parseFloat(data.gold) || 0,
      silver: parseFloat(data.silver) || 0
    };
  } catch (error) {
    console.error("Metal Rate Fetch Error:", error);
    return null;
  }
};