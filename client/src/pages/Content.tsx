import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Scroll, Book, Lightbulb, Globe, MapPin, Clock, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import bg_img from "@/public/assets/images/im_bg.jpg";

const sections = {
  background: [
    {
      id: "world",
      title: "Bối cảnh thế giới",
      icon: <Globe className="w-8 h-8" />,
      content: [
        "Chiến tranh thế giới thứ hai bùng nổ và diễn biến phức tạp",
        "Chủ nghĩa phát xít trỗi dậy và nguy cơ xâm lược thế giới",
        "Phong trào giải phóng dân tộc trên thế giới phát triển mạnh mẽ"
      ],
      details: `Thời điểm đầu năm 1945, Chiến tranh thế giới thứ hai bước vào giai đoạn cuối. Liên Xô và các nước Đồng minh đã đánh bại phát xít Đức tại châu Âu. Tại châu Á - Thái Bình Dương, Nhật Bản đang đứng trước nguy cơ thất bại. Tình hình thế giới có những chuyển biến mau lẹ, tạo điều kiện thuận lợi cho cách mạng Việt Nam.`
    },
    {
      id: "vietnam",
      title: "Tình hình Việt Nam",
      icon: <MapPin className="w-8 h-8" />,
      content: [
        "Ách đô hộ của thực dân Pháp và phát xít Nhật",
        "Chính sách cai trị hà khắc, bóc lột tàn bạo",
        "Đời sống nhân dân cực khổ",
        "Các phong trào yêu nước nổ ra liên tiếp"
      ],
      details: `Dưới ách thống trị của thực dân Pháp và phát xít Nhật, nhân dân ta phải chịu cảnh "một cổ hai tròng". Chính sách vơ vét, bóc lột của chúng đã đẩy đời sống nhân dân ta vào tình cảnh cực kỳ khốn khổ. Nạn đói hoành hành khắp nơi, đặc biệt là nạn đói năm 1945 đã cướp đi sinh mạng của hơn hai triệu đồng bào ta.`
    }
  ],
  events: [
    {
      id: "preparation",
      title: "Giai đoạn chuẩn bị (1930-1945)",
      icon: <Clock className="w-8 h-8" />,
      content: [
        "Đảng lãnh đạo xây dựng lực lượng cách mạng",
        "Xây dựng căn cứ địa cách mạng",
        "Phát triển phong trào cách mạng trong cả nước"
      ],
      details: `Đảng đã tích cực chuẩn bị về mọi mặt cho cuộc khởi nghĩa giành chính quyền. Một mặt, Đảng tập trung xây dựng lực lượng chính trị và vũ trang, mặt khác tích cực tuyên truyền, giác ngộ cách mạng cho quần chúng nhân dân. Đặc biệt, việc thành lập Mặt trận Việt Minh đã tập hợp được đông đảo các tầng lớp nhân dân.`
    },
    {
      id: "uprising",
      title: "Tổng khởi nghĩa Tháng Tám",
      icon: <Flag className="w-8 h-8" />,
      content: [
        "Diễn biến tại Hà Nội, Huế, Sài Gòn",
        "Sức mạnh của quần chúng nhân dân",
        "Thắng lợi của Cách mạng"
      ],
      details: `Ngày 15/8/1945, tin Nhật đầu hàng Đồng minh đã đến Việt Nam. Ngay lập tức, Đảng và Mặt trận Việt Minh đã phát động Tổng khởi nghĩa trong cả nước. Tại Hà Nội, quần chúng đã tiến hành nhiều cuộc biểu tình, tuần hành và ngày 19/8 đã giành được chính quyền. Tiếp đó, phong trào khởi nghĩa đã lan rộng ra khắp cả nước.`
    }
  ],
  significance: [
    {
      id: "historical",
      title: "Ý nghĩa lịch sử",
      icon: <Book className="w-8 h-8" />,
      content: [
        "Mở ra kỷ nguyên mới cho dân tộc Việt Nam",
        "Lật đổ chế độ thực dân phong kiến",
        "Xây dựng chính quyền dân chủ nhân dân"
      ],
      details: `Cách mạng Tháng Tám năm 1945 là một sự kiện vĩ đại trong lịch sử dân tộc. Lần đầu tiên giai cấp công nhân và nhân dân lao động dưới sự lãnh đạo của Đảng đã giành được chính quyền trong cả nước. Thắng lợi của Cách mạng Tháng Tám đã đập tan xiềng xích nô lệ của thực dân, phong kiến, mở ra kỷ nguyên mới trong lịch sử dân tộc: Kỷ nguyên độc lập, tự do.`
    },
    {
      id: "lessons",
      title: "Bài học kinh nghiệm",
      icon: <Lightbulb className="w-8 h-8" />,
      content: [
        "Về lãnh đạo, chỉ đạo chiến lược",
        "Về phát huy sức mạnh đại đoàn kết dân tộc",
        "Về nắm bắt thời cơ và quyết định kịp thời"
      ],
      details: `Thắng lợi của Cách mạng Tháng Tám để lại nhiều bài học quý báu: Một là, sự lãnh đạo đúng đắn của Đảng với đường lối cách mạng khoa học, sáng tạo. Hai là, phát huy sức mạnh đại đoàn kết toàn dân tộc. Ba là, biết nắm bắt thời cơ, dũng cảm quyết định trong thời điểm lịch sử. Bốn là, kết hợp đấu tranh chính trị với đấu tranh vũ trang.`
    }
  ]
};

export default function Content() {
  const [selectedTab, setSelectedTab] = useState("background");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg_img})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.1
        }} />

        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4 font-serif"
          >
            Tìm hiểu Cách mạng
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto my-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Khám phá chi tiết về bối cảnh, diễn biến và ý nghĩa của Cách mạng Tháng Tám
          </motion.p>
        </div>
      </section>

      {/* Content Navigation */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-2">
            <div className="flex gap-2">
              <TabButton
                active={selectedTab === "background"}
                onClick={() => setSelectedTab("background")}
                icon={<Globe className="w-4 h-4" />}
              >
                Bối cảnh lịch sử
              </TabButton>
              <TabButton
                active={selectedTab === "events"}
                onClick={() => setSelectedTab("events")}
                icon={<Clock className="w-4 h-4" />}
              >
                Diễn biến
              </TabButton>
              <TabButton
                active={selectedTab === "significance"}
                onClick={() => setSelectedTab("significance")}
                icon={<Book className="w-4 h-4" />}
              >
                Ý nghĩa
              </TabButton>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {sections[selectedTab as keyof typeof sections].map((section) => (
              <Card
                key={section.id}
                className="border-2 border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-500"
              >
                <CardHeader
                  className="cursor-pointer relative"
                  onClick={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {section.title}
                      </CardTitle>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-primary transition-transform duration-300 ${
                        expandedSection === section.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="space-y-6">
                        {/* Main Points */}
                        <div className="grid gap-4">
                          {section.content.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <p className="text-lg text-muted-foreground">{item}</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Detailed Content */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-primary/5 rounded-lg p-6 border-2 border-primary/10"
                        >
                          <ScrollArea className="h-[200px] pr-4">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {section.details}
                            </p>
                          </ScrollArea>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick, icon }: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`text-lg relative flex items-center gap-2 ${active ? "" : "hover:text-primary"}`}
      onClick={onClick}
    >
      {icon}
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary opacity-20 rounded-md"
        />
      )}
    </Button>
  );
}