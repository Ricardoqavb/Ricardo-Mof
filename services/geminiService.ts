import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Requires process.env.API_KEY to be set in the build/runtime environment
const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const suggestImprovement = async (
  currentText: string,
  context: string,
  mode: 'refine' | 'creative'
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "API Key Missing";

  const modelName = mode === 'creative' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Context: ${context}. 
                 Task: Improve the following text for a luxury wine database. 
                 Mode: ${mode}.
                 Text: "${currentText}"`,
      config: {
        systemInstruction: "You are a world-class copywriter for luxury wine brands. Keep it concise, evocative, and consistent with the brand voice.",
      }
    });
    return response.text || currentText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating suggestion.";
  }
};

export const analyzeBrand = async (brandData: any): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "API Key Missing";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this brand data and suggest 3 missing product opportunities or gaps in the narrative.
                 Brand Data: ${JSON.stringify(brandData)}`,
      config: {
        thinkingConfig: { thinkingBudget: 4096 }, // Enable thinking for deeper analysis
      }
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error performing analysis.";
  }
};
