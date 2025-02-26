import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sections = {
  background: [
    {
      id: "world",
      title: "Bối cảnh thế giới",
      content: [
        "Chiến tranh thế giới thứ hai bùng nổ và diễn biến phức tạp",
        "Chủ nghĩa phát xít trỗi dậy và nguy cơ xâm lược thế giới",
        "Phong trào giải phóng dân tộc trên thế giới phát triển mạnh mẽ"
      ]
    },
    {
      id: "vietnam",
      title: "Tình hình Việt Nam",
      content: [
        "Ách đô hộ của thực dân Pháp và phát xít Nhật",
        "Chính sách cai trị hà khắc, bóc lột tàn bạo",
        "Đời sống nhân dân cực khổ",
        "Các phong trào yêu nước nổ ra liên tiếp"
      ]
    }
  ],
  events: [
    {
      id: "preparation",
      title: "Giai đoạn chuẩn bị (1930-1945)",
      content: [
        "Đảng lãnh đạo xây dựng lực lượng cách mạng",
        "Xây dựng căn cứ địa cách mạng",
        "Phát triển phong trào cách mạng trong cả nước"
      ]
    },
    {
      id: "uprising",
      title: "Tổng khởi nghĩa Tháng Tám",
      content: [
        "Diễn biến tại Hà Nội, Huế, Sài Gòn",
        "Sức mạnh của quần chúng nhân dân",
        "Thắng lợi của Cách mạng"
      ]
    }
  ],
  significance: [
    {
      id: "historical",
      title: "Ý nghĩa lịch sử",
      content: [
        "Mở ra kỷ nguyên mới cho dân tộc Việt Nam",
        "Lật đổ chế độ thực dân phong kiến",
        "Xây dựng chính quyền dân chủ nhân dân"
      ]
    },
    {
      id: "lessons",
      title: "Bài học kinh nghiệm",
      content: [
        "Về lãnh đạo, chỉ đạo chiến lược",
        "Về phát huy sức mạnh đại đoàn kết dân tộc",
        "Về nắm bắt thời cơ và quyết định kịp thời"
      ]
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
            backgroundImage: "url('https://source.unsplash.com/random/1920x1080?vietnam,history,documents')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Tìm hiểu Cách mạng
          </motion.h1>
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
              >
                Bối cảnh lịch sử
              </TabButton>
              <TabButton
                active={selectedTab === "events"}
                onClick={() => setSelectedTab("events")}
              >
                Diễn biến
              </TabButton>
              <TabButton
                active={selectedTab === "significance"}
                onClick={() => setSelectedTab("significance")}
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
                className="border-2 border-primary/20 overflow-hidden"
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                      {section.title}
                    </CardTitle>
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${
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
                    >
                      <CardContent>
                        <div className="prose prose-lg max-w-none">
                          <ul className="space-y-4">
                            {section.content.map((item, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-lg text-muted-foreground"
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
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

function TabButton({ children, active, onClick }: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`text-lg relative ${active ? "" : "hover:text-primary"}`}
      onClick={onClick}
    >
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