import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle } from "lucide-react";

interface Message {
  question: string;
  answer: string;
}

export default function ChatbotDialog() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await apiRequest("POST", "/api/chat", { question });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { question: data.question, answer: data.answer }]);
      setInput("");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !chatMutation.isPending) {
      chatMutation.mutate(input);
    }
  };

  return (
    <>
      <Button
        id="chatbot-trigger"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Trợ lý Lịch sử</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[400px] pr-4">
            {messages.map((msg, i) => (
              <div key={i} className="mb-4">
                <div className="bg-muted p-3 rounded-lg mb-2">
                  <p className="font-medium">Bạn:</p>
                  <p>{msg.question}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="font-medium">Trợ lý:</p>
                  <p>{msg.answer}</p>
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="bg-muted p-3 rounded-lg animate-pulse">
                Đang suy nghĩ...
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={chatMutation.isPending}
            />
            <Button type="submit" disabled={chatMutation.isPending}>
              Gửi
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
