import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Content() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="pt-6">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-4">
                Tìm hiểu về Cách mạng Tháng Tám
              </h1>
              <p className="text-lg text-muted-foreground">
                Tài liệu chi tiết về các giai đoạn, diễn biến và ý nghĩa lịch sử của Cách mạng Tháng Tám
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="background" className="space-y-6">
          <Card className="border-2 border-primary/20 p-2">
            <TabsList className="w-full justify-start gap-2">
              <TabsTrigger value="background" className="text-lg">
                Bối cảnh lịch sử
              </TabsTrigger>
              <TabsTrigger value="events" className="text-lg">
                Diễn biến
              </TabsTrigger>
              <TabsTrigger value="significance" className="text-lg">
                Ý nghĩa
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="background">
            <ScrollArea className="h-[600px] rounded-md border-2 border-primary/20 p-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="mb-6 border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">1. Bối cảnh thế giới</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        Chiến tranh thế giới thứ hai bùng nổ và diễn biến phức tạp:
                      </p>
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Chủ nghĩa phát xít trỗi dậy và nguy cơ xâm lược thế giới</li>
                        <li>Phong trào giải phóng dân tộc trên thế giới phát triển mạnh mẽ</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">2. Tình hình Việt Nam</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        Ách đô hộ của thực dân Pháp và phát xít Nhật:
                      </p>
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Chính sách cai trị hà khắc, bóc lột tàn bạo</li>
                        <li>Đời sống nhân dân cực khổ</li>
                        <li>Các phong trào yêu nước nổ ra liên tiếp</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="events">
            <ScrollArea className="h-[600px] rounded-md border-2 border-primary/20 p-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="mb-6 border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">1. Giai đoạn chuẩn bị (1930-1945)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Đảng lãnh đạo xây dựng lực lượng cách mạng</li>
                        <li>Xây dựng căn cứ địa cách mạng</li>
                        <li>Phát triển phong trào cách mạng trong cả nước</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">2. Tổng khởi nghĩa Tháng Tám</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Diễn biến tại Hà Nội, Huế, Sài Gòn</li>
                        <li>Sức mạnh của quần chúng nhân dân</li>
                        <li>Thắng lợi của Cách mạng</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="significance">
            <ScrollArea className="h-[600px] rounded-md border-2 border-primary/20 p-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Card className="mb-6 border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">1. Ý nghĩa lịch sử</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Mở ra kỷ nguyên mới cho dân tộc Việt Nam</li>
                        <li>Lật đổ chế độ thực dân phong kiến</li>
                        <li>Xây dựng chính quyền dân chủ nhân dân</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={item}>
                  <Card className="border-2 border-primary/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">2. Bài học kinh nghiệm</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                        <li>Về lãnh đạo, chỉ đạo chiến lược</li>
                        <li>Về phát huy sức mạnh đại đoàn kết dân tộc</li>
                        <li>Về nắm bắt thời cơ và quyết định kịp thời</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}