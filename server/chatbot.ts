import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY || '';
console.log('API Key status:', API_KEY ? 'Found' : 'Not found');

if (!API_KEY) {
  console.error("LỖI: GEMINI_API_KEY chưa được thiết lập!");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateChatResponse(question: string): Promise<string> {
  try {
    if (!question.trim()) {
      return "Câu hỏi không được để trống.";
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a knowledgeable historian specializing in Vietnam's August Revolution. Provide accurate, concise answers about historical events, figures, and significance. Use Vietnamese terms where appropriate. Keep responses under 150 words." }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I will act as a historical expert specializing in Vietnam's August Revolution, providing accurate and concise information while incorporating appropriate Vietnamese terms." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    // Send the user's question and get a response
    const result = await chat.sendMessage(question);
    const response = await result.response;

    if (!response || !response.text()) {
      throw new Error("Response không hợp lệ hoặc trống.");
    }

    return response.text();

  } catch (error: any) {
    console.error("Gemini AI API error:", error.message || error);
    return `Xin lỗi, có lỗi xảy ra: ${error.message || "Không xác định"}`;
  }
}
