import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerImages = [
  {
    url: "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/2/photo-1-16620823534021357627720.jpg",
    title: "Cờ đỏ sao vàng tung bay tại Quảng trường Ba Đình",
    description: "Khí thế hào hùng của Cách mạng Tháng Tám thành công",
    date: "19/08/1945"
  },
  {
    url: "https://file3.qdnd.vn/data/images/0/2023/09/01/vuhuyen/tuyen-ngon.jpg?dpi=150&quality=100&w=870", 
    title: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
    description: "Khai sinh nước Việt Nam Dân chủ Cộng hòa",
    date: "02/09/1945"
  },
  {
    url: "https://file.qdnd.vn/data/images/0/2016/12/11/thuha/111216ha26.jpg?w=578",
    title: "Đoàn người dân Hà Nội xuống đường khởi nghĩa",
    description: "Sức mạnh của quần chúng nhân dân"
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden group">
      {bannerImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.1
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: index === currentSlide ? 0 : 20,
                opacity: index === currentSlide ? 1 : 0
              }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-4xl mx-4"
            >
              <Card className="bg-background/90 backdrop-blur-sm p-8 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/80 to-primary/60" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-primary text-sm font-medium mb-2"
                  >
                    {image.date}
                  </motion.div>
                  <motion.h2 
                    className="text-4xl font-bold mb-4 font-serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {image.title}
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    {image.description}
                  </motion.p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={nextSlide}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {bannerImages.map((_, index) => (
          <motion.button
            key={index}
            className={cn(
              "h-1 rounded-full transition-all duration-500 relative overflow-hidden",
              index === currentSlide ? "w-20 bg-primary" : "w-12 bg-primary/30"
            )}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.1 }}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-primary/50"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
