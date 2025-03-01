import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, Sparkles, Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Thêm state cho chế độ chat: "Nhanh" hoặc "Sâu sắc"
  const [chatMode, setChatMode] = useState<"Nhanh" | "Sâu sắc">("Nhanh");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Generate a unique ID for this message pair
    const messageId = Date.now().toString();
    
    // Add user message
    setMessages((prev) => [
      ...prev, 
      { id: messageId, role: "user", content: trimmedInput }
    ]);
    setInput("");
    setIsLoading(true);

    try {
      // Add empty assistant message that will be populated with streaming response
      setMessages((prev) => [
        ...prev,
        { id: messageId, role: "assistant", content: "" }
      ]);

      // Gửi kèm lịch sử trò chuyện và chế độ chat
      const history = messages.filter(msg => msg.content.trim() !== "");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: trimmedInput, 
          history,
          mode: chatMode // truyền chế độ chat đã chọn
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        partialResponse += decoder.decode(value, { stream: true });

        // Update only the assistant message
        setMessages((prev) => {
          const updated = [...prev];
          const assistantMessageIndex = updated.findIndex(
            msg => msg.id === messageId && msg.role === "assistant"
          );
          
          if (assistantMessageIndex !== -1) {
            updated[assistantMessageIndex].content = partialResponse;
          }
          
          return updated;
        });
      }
    } catch (error) {
      console.error("Error during streaming response:", error);
      
      // Show error in the chat
      setMessages((prev) => {
        const updated = [...prev];
        const assistantMessageIndex = updated.findIndex(
          msg => msg.id === messageId && msg.role === "assistant"
        );
        
        if (assistantMessageIndex !== -1) {
          updated[assistantMessageIndex].content = "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.";
        }
        
        return updated;
      });
    } finally {
      setIsLoading(false);
      // Focus input after response
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <div className=" flex flex-col bg-zinc-900">
      {/* Header */}
      <header className="absolute  bg-gradient-to-r p-2 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src="https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/a3cbbc44-5467-40ce-a303-2bf6fb5ad734-thay_binh.jpg" 
              alt="Thầy Bình đẹp trai" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-medium text-white">Thầy Bình</h1>
            {/* <p className="text-sm text-red-100">Hỏi đáp về Cách mạng Tháng Tám</p> */}
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="flex-1 md:p-5  flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-2">
            <div className=" flex items-center gap-2">
              {/* Lựa chọn chế độ chat */}
              <h1 className=" text-xl font-medium text-white inline-block">Chế độ chat:</h1>

              <select 
                value={chatMode} 
                onChange={(e) => setChatMode(e.target.value as "Nhanh" | "Sâu sắc")}
                className="bg-zinc-800 border-zinc-700 text-white rounded p-1"
              >
                <option value="Nhanh">Nhanh</option>
                <option value="Sâu sắc">Sâu sắc</option>
              </select>
            </div>
            {messages.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-950">
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa lịch sử
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-800 text-white border-zinc-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xóa lịch sử</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      Bạn có chắc chắn muốn xóa toàn bộ lịch sử cuộc trò chuyện?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-700 text-white hover:bg-zinc-600">Hủy</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={clearHistory} 
                      className="bg-red-700 text-white hover:bg-red-600"
                    >
                      Xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          <ScrollArea 
            ref={scrollAreaRef}
            className="h-[calc(100vh-200px)] p-4 rounded-lg bg-zinc-800 shadow-sm border border-zinc-700"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full p-6">
                <div className="bg-red-900/30 p-1 rounded-full mb-4">
                  {/* <Sparkles className="h-8 w-8 text-red-500" /> */}
                  <img src="https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/a3cbbc44-5467-40ce-a303-2bf6fb5ad734-thay_binh.jpg" alt="Thầy Bình đẹp trai" 
                  className="w-16 h-16 rounded-full object-cover " />                
                  </div>
                <h3 className="text-xl font-medium mb-2 text-white">Chào mừng bạn!</h3>
                <p className="text-zinc-300 max-w-md">
                  Hãy đặt câu hỏi về Cách mạng Tháng Tám, Thầy sẽ giúp em tìm hiểu 
                  về sự kiện lịch sử quan trọng này.
                </p>
                <div className="mt-6 space-y-2 text-sm text-zinc-400">
                  <p className="font-medium">Ví dụ một số câu hỏi bạn có thể hỏi:</p>
      
                  <p>• Cách mạng Tháng Tám diễn ra vào thời gian nào?</p>
                  <p>• Ai là người lãnh đạo Cách mạng Tháng Tám?</p>
                  <p>• Nguyên nhân dẫn đến Cách mạng Tháng Tám là gì?</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-2">
                {messages.map((msg, i) => (
                  <div key={`${msg.id}-${msg.role}-${i}`} className="animate-fade-in">
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}>
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src="https://psszjkdspnyifyjbmyau.supabase.co/storage/v1/object/public/Topics/a3cbbc44-5467-40ce-a303-2bf6fb5ad734-thay_binh.jpg" 
                            alt="Thầy Bình đẹp trai" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div 
                        className={`p-4 rounded-2xl max-w-[85%] 
                          ${msg.role === "user" ? "bg-red-800 text-white" : "bg-zinc-700 text-gray-100"}`}
                      >
                        <p className={`text-xs mb-1 ${msg.role === "user" ? "text-red-200" : "text-zinc-400"}`}>
                          {msg.role === "user" ? "Bạn" : "Thầy Bình đẹp trai"}
                        </p>
                        <div className="prose prose-sm prose-invert">
                          {msg.role === "assistant" && msg.content === "" ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Đang trả lời...</span>
                            </div>
                          ) : (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </main>

      {/* Input form */}
      <footer className="border-t bg-zinc-900 border-zinc-800 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn về Cách mạng Tháng Tám..."
              className="rounded-full flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-red-700 focus:border-red-700"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="rounded-full w-12 h-12 p-0 bg-red-800 hover:bg-red-700"
              disabled={isLoading || !input.trim()}
              aria-label="Gửi"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </footer>
    </div>
  );
}
