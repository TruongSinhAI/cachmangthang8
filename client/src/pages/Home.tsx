import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotDialog from "@/components/Chatbot/ChatbotDialog";
import bg_img from "@/public/assets/images/im_bg.jpg";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen dark:bg-gray-950">
      {/* Hero Section with Enhanced Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ 
            y, opacity, scale,
            backgroundImage: `url(${bg_img})`
            
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background dark:to-gray-950" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.1
        }} />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-6"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight leading-none"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hành trình
              <motion.span 
                className="block text-primary mt-6 relative"
                style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                whileHover={{ scale: 1.05 }}
              >
                Cách mạng Tháng Tám
                <motion.div
                  className="absolute -inset-x-8 -inset-y-4 bg-primary/10 rounded-xl -z-10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </motion.span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-32 h-1 bg-primary mx-auto my-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-serif text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Khám phá những trang sử hào hùng của dân tộc Việt Nam qua cuộc Cách mạng 
              vĩ đại đã làm thay đổi vận mệnh của cả dân tộc
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto mt-12"
          >
            <Link href="/timeline" className="flex-1">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="h-full"
              >
                <Button 
                  size="lg" 
                  className="w-full h-full text-lg px-8 py-8 bg-primary hover:bg-primary/90 border-2 border-primary/20 shadow-lg shadow-primary/20 relative overflow-hidden group"
                >
                  <span className="relative z-10 text-xl font-serif">Bắt đầu Hành trình</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                    style={{ skewX: "-20deg" }}
                  />
                </Button>
              </motion.div>
            </Link>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full h-full text-lg px-8 py-8 text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm relative overflow-hidden group"
                onClick={() => document.getElementById("chatbot-trigger")?.click()}
              >
                <span className="relative z-10 text-xl font-serif">Hỏi đáp với Trợ lý AI</span>
                <motion.div
                  className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  style={{ skewX: "-20deg" }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60"
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
      <section className="py-24 bg-gradient-to-b from-background to-background/95 dark:from-gray-950 dark:to-gray-950/95 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-color)_0%,_transparent_65%)] opacity-5" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.1
        }} />

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
      className="group rounded-xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 dark:bg-gray-900/80"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative">
        <motion.span 
          className="text-5xl mb-6 block"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.span>
        <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-lg font-serif text-muted-foreground leading-relaxed">{description}</p>
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