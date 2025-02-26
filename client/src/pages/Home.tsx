import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BannerSlider from "@/components/Banner/BannerSlider";
import ChatbotDialog from "@/components/Chatbot/ChatbotDialog";

export default function Home() {
  return (
    <div className="min-h-screen">
      <BannerSlider />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Hành trình Cách mạng Tháng Tám
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chào mừng bạn đến với website tương tác về Cách mạng Tháng Tám. Cùng khám phá những trang sử hào hùng của dân tộc Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/timeline">
            <Button className="w-full h-32 text-xl" variant="outline">
              <span className="flex flex-col items-center">
                <i className="ri-time-line text-2xl mb-2" />
                Khám phá Hành trình
              </span>
            </Button>
          </Link>
          
          <Link href="/content">
            <Button className="w-full h-32 text-xl" variant="outline">
              <span className="flex flex-col items-center">
                <i className="ri-book-open-line text-2xl mb-2" />
                Tìm hiểu về Cách mạng
              </span>
            </Button>
          </Link>

          <Button 
            className="w-full h-32 text-xl" 
            variant="outline"
            onClick={() => document.getElementById("chatbot-trigger")?.click()}
          >
            <span className="flex flex-col items-center">
              <i className="ri-message-3-line text-2xl mb-2" />
              Hỏi đáp cùng Trợ lý AI
            </span>
          </Button>
        </div>
      </main>

      <ChatbotDialog />
    </div>
  );
}
