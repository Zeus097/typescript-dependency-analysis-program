import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// To add instructions for the model to show visualisation
const message = `
You are a senior software architect.
Analyze the dependency relationships and provide insights about potential circular dependencies.
Return 
  a structured analysis about dependency complexity, 
  tightly coupled modules, 
  visual representation of the dependencies 
  and refactoring recommendations.
Here are the file names and their dependencies:
`;


export async function invokeGemini(imports: string): Promise<string> {
  
  const full_message = message + imports;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: full_message,
  });

  return response.text || "";
}


