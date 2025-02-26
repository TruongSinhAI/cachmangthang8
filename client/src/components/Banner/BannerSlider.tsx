import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const bannerImages = [
  {
    url: "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/9/2/photo-1-16620823534021357627720.jpg",
    title: "Cờ đỏ sao vàng tung bay tại Quảng trường Ba Đình",
    description: "Khí thế hào hùng của Cách mạng Tháng Tám thành công"
  },
  {
    url: "https://file3.qdnd.vn/data/images/0/2023/09/01/vuhuyen/tuyen-ngon.jpg?dpi=150&quality=100&w=870", 
    title: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
    description: "Khai sinh nước Việt Nam Dân chủ Cộng hòa"
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

  return (
    <div className="relative h-[500px] overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="bg-background/80 p-6 max-w-lg mx-4">
              <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
              <p className="text-muted-foreground">{image.description}</p>
            </Card>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
