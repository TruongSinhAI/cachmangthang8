import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateChatResponse(question: string): Promise<string> {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{
            text: "You are a knowledgeable historian specializing in Vietnam's August Revolution. Provide accurate, concise answers about historical events, figures, and significance. Use Vietnamese terms where appropriate. Keep responses under 150 words."
          }],
        },
        {
          role: "model",
          parts: [{
            text: "I understand. I will act as a historical expert specializing in Vietnam's August Revolution, providing accurate and concise information while incorporating appropriate Vietnamese terms."
          }],
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
    return response.text() || "Xin lỗi, tôi không thể trả lời câu hỏi này.";

  } catch (error) {
    console.error("Gemini AI API error:", error);
    return "Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn.";
  }
}