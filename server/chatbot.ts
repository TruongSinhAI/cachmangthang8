import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "";
console.log("API Key status:", API_KEY ? "Found" : "Not found");

if (!API_KEY) {
  console.error("LỖI: GEMINI_API_KEY chưa được thiết lập!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const file = readFileSync('./shared/giaotrinh.txt', 'utf-8');

// System instruction
const systemInstruction = `Bạn tên là Thầy Bình. Bạn là một chuyên gia lịch sử Đảng cộng sản Việt Nam. Bạn sẽ hỗ trợ học sinh tìm hiểu về cách mạng tháng 8. Chỉ cung cấp các thông tin liên quan về cách mạng tháng 8, không nằm ngoài. Và các thông tin cần phải chính xác, sử dụng đúng thông tin từ giáo trình tôi cung cấp. Trong câu trả lời đừng trả lời theo kiểu 'Theo giáo trình mà em cung cấp' mà hãy trả lời theo kiểu dễ hiểu và phản hồi theo dạng "Thầy Bình sẽ giải đáp ...". Giáo trình: ${file}`;

export async function* generateChatResponse(
  question: string,
  history: { id: string; role: "user" | "assistant"; content: string }[] = [],
  mode: string = "Nhanh"  // mặc định là "Nhanh"
): AsyncGenerator<string> {
  try {
    if (!question.trim()) {
      yield "Câu hỏi không được để trống.";
      return;
    }

    // Xác định model dựa trên chế độ người dùng chọn
    let modelName = "";
    if (mode === "Nhanh") {
      modelName = "gemini-2.0-flash";
    } else if (mode === "Sâu sắc") {
      modelName = "gemini-2.0-flash-thinking-exp-01-21";
    } else {
      modelName = "gemini-2.0-flash"; // fallback
    }

    // Ví dụ: sử dụng cách xây dựng prompt từ lịch sử để hỗ trợ streaming
    let prompt = systemInstruction + "\n";
    for (const msg of history) {
      if (msg.role === "user") {
        prompt += "Bạn: " + msg.content + "\n";
      } else {
        prompt += "Thầy Bình: " + msg.content + "\n";
      }
    }
    prompt += "Bạn: " + question + "\nThầy Bình:";

    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  } catch (error: any) {
    console.error("Gemini AI API error:", error);
    yield `Xin lỗi, có lỗi xảy ra: ${error.message || "Không xác định"}`;
  }
}
