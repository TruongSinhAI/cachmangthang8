import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ChatbotPage from "@/components/Chatbot/ChatbotDialog";
import bg_img from "@/public/assets/images/im_bg.jpg";
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0); 
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-950 overflow-hidden">
      {/* Loading Effect */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="text-primary text-5xl font-bold"
            >
              Cách mạng Tháng Tám
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Enhanced Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        <motion.div
          style={{
            y, opacity, scale,
            backgroundImage: `url(${bg_img})`
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
        />
        
        {/* Enhanced Gradient Overlay with smoother transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-background dark:to-gray-950/95" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.2
        }} />

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="mb-10 space-y-8"
          >
            <motion.div className="relative" user-select="none">
              <motion.h1
                className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight leading-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ userSelect: "none" }}
              >
                Hành trình
                <motion.div className="relative inline-block w-full">
                  <motion.span
                    className="block text-primary mt-6 relative"
                    style={{ 
                      textShadow: "0 0 40px rgba(255,255,255,0.4)",
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 60px rgba(255,255,255,0.6)", 
                      color: "#ffffff"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }}
                  >
                    Cách mạng Tháng Tám
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/30 to-primary blur-sm opacity-50 mt-6"
                    style={{ 
                      filter: "brightness(1.5)",
                      userSelect: "none"
                    }}
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      filter: "brightness(2)",
                      opacity: 0.7,
                    }}
                  >
                    Cách mạng Tháng Tám
                  </motion.span>
                </motion.div>
              </motion.h1>
              
              {/* Enhanced Animated Stars with smoother animation */}
              <motion.div 
                className="absolute -top-10 -left-10 text-white/30 text-2xl"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                ✧
              </motion.div>
              <motion.div 
                className="absolute -bottom-10 -right-10 text-white/30 text-3xl"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                ✦
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
              className="w-48 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 mx-auto my-8 rounded-full shadow-lg shadow-primary/20"
              style={{"userSelect": "none"}}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{"userSelect": "none"}}
            >
              Khám phá những trang sử hào hùng của dân tộc Việt Nam qua cuộc Cách mạng
              vĩ đại đã làm thay đổi vận mệnh của cả dân tộc
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto mt-12"
          >
            {/* Button 1 with enhanced hover effect */}
            <Link href="/timeline" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="h-full"
              >
                <Button
                  size="lg"
                  className="relative w-full h-full text-lg px-8 py-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/70 border-2 border-primary/20 shadow-xl shadow-primary/30 transition-all duration-300 ease-in-out overflow-hidden group"
                >
                  <motion.span 
                    className="relative z-10 text-xl font-semibold"
                    whileHover={{ letterSpacing: "0.05em" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Bắt đầu Hành trình
                  </motion.span>
                  {/* Enhanced light effect with smoother animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                    }}
                    animate={{ 
                      x: ["105%", "-105%"]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                  {/* Button glow with enhanced effect */}
                  <div className="absolute -inset-1 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg z-0" />
                </Button>
              </motion.div>
            </Link>

            {/* Button 2 with enhanced hover effect */}
            <Link href="/chatbot" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="h-full"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="relative w-full h-full text-lg px-8 py-8 text-white border-2 border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-md shadow-white/10 transition-all duration-300 ease-in-out overflow-hidden group"
                >
                  <motion.span 
                    className="relative z-10 text-xl font-semibold"
                    whileHover={{ letterSpacing: "0.05em" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Hỏi đáp với Trợ lý AI
                  </motion.span>
                  {/* Enhanced light effect with smoother animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                    }}
                    animate={{ 
                      x: ["105%", "-105%"]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                  {/* Button glow with enhanced effect */}
                  <div className="absolute -inset-1 bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg z-0" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center"
          >
            <motion.span 
              className="text-sm font-medium mb-2 opacity-70"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            >
              Khám phá thêm
            </motion.span>
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
              className="animate-pulse"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with enhanced animations */}
      <section className="py-32 bg-gradient-to-b from-background to-background/95 dark:from-gray-950 dark:to-gray-950/95 relative overflow-hidden">
        {/* Enhanced Radial Gradient with better animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-color)_0%,_transparent_70%)] opacity-10" />
        
        {/* Animated Circles with smoother motion */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute inset-0" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.1
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Khám phá hành trình
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              className="w-32 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 mx-auto my-6 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl mx-auto text-lg text-muted-foreground"
            >
              Trải nghiệm đa dạng qua các tính năng tương tác, nội dung chuyên sâu và công nghệ hiện đại
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
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
              href="/chatbot"
            />
          </motion.div>
          
          {/* Enhanced Call to Action with smoother animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            className="mt-20 text-center"
          >
            <Link href="/timeline">
              <Button className="px-8 py-6 bg-primary/90 hover:bg-primary text-lg font-medium rounded-full group relative overflow-hidden">
                <span className="relative z-10">Bắt đầu hành trình ngay</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -inset-1 bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full z-0"
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Enhanced background particles component
function ParticleBackground() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

function FeatureCard({ icon, title, description, href, onClick }: FeatureCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-500 dark:bg-gray-900/80 relative overflow-hidden"
    >
      {/* Card Background Effect with enhanced transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />
      
      {/* Enhanced Hover Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 group-hover:duration-500" />
      
      {/* Content */}
      <div className="relative">
        <motion.div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6"
          whileHover={{ 
            scale: 1.2, 
            rotate: 10,
            backgroundColor: "rgba(var(--primary-color), 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-3xl">{icon}</span>
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-white/80 dark:group-hover:text-white/90 transition-colors duration-300">{description}</p>
        
        {/* Enhanced Animated Underline */}
        <div className="mt-6 overflow-hidden h-0.5 w-full">
          <motion.div 
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary/70 to-primary w-full"
          />
        </div>
        
        {/* Enhanced Arrow Indicator */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 500 }}
          className="absolute bottom-0 right-0 p-4 text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}> {content}</Link>;
  }

  if (onClick) {
    return <button onClick={() => {
      onClick(); 
      window.scrollTo(0, 0);}} className="w-full text-left">{content}</button>;
  }

  return content;
}