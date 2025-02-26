import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import ChatbotDialog from "@/components/Chatbot/ChatbotDialog"; // Add this import

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://source.unsplash.com/random/1920x1080?vietnam,history')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white mb-8"
          >
            Hành trình
            <span className="block text-primary mt-4">Cách mạng Tháng Tám</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Khám phá những trang sử hào hùng của dân tộc Việt Nam qua cuộc Cách mạng 
            vĩ đại đã làm thay đổi vận mệnh của cả dân tộc
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link href="/timeline">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-none"
              >
                Bắt đầu Hành trình
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 text-white border-2 border-white hover:bg-white/10"
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
            >
              Hỏi đáp với Trợ lý AI
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-color)_0%,_transparent_65%)] opacity-10" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon="🗺️"
              title="Timeline Tương tác"
              description="Khám phá diễn biến của Cách mạng Tháng Tám qua timeline tương tác sinh động"
              href="/timeline"
            />
            <FeatureCard
              icon="📚"
              title="Kiến thức Chuyên sâu"
              description="Tìm hiểu chi tiết về bối cảnh, diễn biến và ý nghĩa lịch sử"
              href="/content"
            />
            <FeatureCard
              icon="🤖"
              title="Trợ lý AI Thông minh"
              description="Đặt câu hỏi và nhận câu trả lời từ trợ lý AI am hiểu lịch sử"
              onClick={() => document.getElementById("chatbot-trigger")?.click()}
            />
          </motion.div>
        </div>
      </section>

      <ChatbotDialog />
    </div>
  );
}

function FeatureCard({ icon, title, description, href, onClick }: {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group rounded-xl border-2 border-primary/20 bg-card backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative">
        <span className="text-5xl mb-6 block">{icon}</span>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  if (onClick) {
    return <button onClick={onClick} className="w-full text-left">{content}</button>;
  }

  return content;
}