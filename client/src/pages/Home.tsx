import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BannerSlider from "@/components/Banner/BannerSlider";
import ChatbotDialog from "@/components/Chatbot/ChatbotDialog";
import { motion } from "framer-motion";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <BannerSlider />

      <main className="container mx-auto px-4 py-16">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={item}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6"
          >
            Hành trình Cách mạng Tháng Tám
          </motion.h1>
          <motion.p 
            variants={item}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Chào mừng bạn đến với website tương tác về Cách mạng Tháng Tám. 
            Cùng khám phá những trang sử hào hùng của dân tộc Việt Nam.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div variants={item}>
            <Link href="/timeline">
              <Button
                className="w-full h-40 text-xl bg-white hover:bg-white/90 text-primary border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
                variant="outline"
              >
                <span className="flex flex-col items-center gap-4">
                  <i className="ri-time-line text-4xl" />
                  <span className="font-semibold">Khám phá Hành trình</span>
                </span>
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/content">
              <Button
                className="w-full h-40 text-xl bg-white hover:bg-white/90 text-primary border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
                variant="outline"
              >
                <span className="flex flex-col items-center gap-4">
                  <i className="ri-book-open-line text-4xl" />
                  <span className="font-semibold">Tìm hiểu về Cách mạng</span>
                </span>
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Button 
              className="w-full h-40 text-xl bg-white hover:bg-white/90 text-primary border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
              variant="outline"
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
            >
              <span className="flex flex-col items-center gap-4">
                <i className="ri-message-3-line text-4xl" />
                <span className="font-semibold">Hỏi đáp cùng Trợ lý AI</span>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <ChatbotDialog />
    </div>
  );
}