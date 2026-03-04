import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);
const DEFAULT_MODEL = import.meta.env.VITE_GOOGLE_AI_MODEL || "gemini-3-flash-preview";


export class Assistant {
    #chat;

    constructor(model = DEFAULT_MODEL){ 
        const gemini = googleAI.getGenerativeModel({ model });
        this.#chat = gemini.startChat({ history: [] });

    }

        async  chat(content){
            const result = await this.#chat.sendMessage(content);
            return result.response.text();
        }

        async chatStream(content, onChunk) {
            try {
                const result = await this.#chat.sendMessageStream(content);
                let fullText = "";

                for await (const chunk of result.stream) {
                    fullText += chunk.text();
                    onChunk(fullText);
                }

                if (!fullText) {
                    const finalResponse = await result.response;
                    fullText = finalResponse.text();
                    onChunk(fullText);
                }

                return fullText;
            } catch (streamError) {
                try {
                    const fallbackResult = await this.#chat.sendMessage(content);
                    const fallbackText = fallbackResult.response.text();
                    onChunk(fallbackText);
                    return fallbackText;
                } catch (fallbackError) {
                    throw new Error(fallbackError?.message || streamError?.message || "Gemini request failed");
                }
            }
        }
}
