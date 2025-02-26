import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Content() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Tìm hiểu về Cách mạng Tháng Tám
          </h1>
          <p className="text-muted-foreground">
            Tài liệu chi tiết về các giai đoạn, diễn biến và ý nghĩa lịch sử của Cách mạng Tháng Tám
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="background" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="background">Bối cảnh lịch sử</TabsTrigger>
          <TabsTrigger value="events">Diễn biến</TabsTrigger>
          <TabsTrigger value="significance">Ý nghĩa</TabsTrigger>
        </TabsList>

        <TabsContent value="background">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <Card>
              <CardHeader>
                <CardTitle>1. Bối cảnh thế giới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Chiến tranh thế giới thứ hai bùng nổ và diễn biến phức tạp:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chủ nghĩa phát xít trỗi dậy và nguy cơ xâm lược thế giới</li>
                  <li>Phong trào giải phóng dân tộc trên thế giới phát triển mạnh mẽ</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>2. Tình hình Việt Nam</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ách đô hộ của thực dân Pháp và phát xít Nhật:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chính sách cai trị hà khắc, bóc lột tàn bạo</li>
                  <li>Đời sống nhân dân cực khổ</li>
                  <li>Các phong trào yêu nước nổ ra liên tiếp</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="events">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <Card>
              <CardHeader>
                <CardTitle>1. Giai đoạn chuẩn bị (1930-1945)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Đảng lãnh đạo xây dựng lực lượng cách mạng</li>
                  <li>Xây dựng căn cứ địa cách mạng</li>
                  <li>Phát triển phong trào cách mạng trong cả nước</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>2. Tổng khởi nghĩa Tháng Tám</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Diễn biến tại Hà Nội, Huế, Sài Gòn</li>
                  <li>Sức mạnh của quần chúng nhân dân</li>
                  <li>Thắng lợi của Cách mạng</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="significance">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <Card>
              <CardHeader>
                <CardTitle>1. Ý nghĩa lịch sử</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mở ra kỷ nguyên mới cho dân tộc Việt Nam</li>
                  <li>Lật đổ chế độ thực dân phong kiến</li>
                  <li>Xây dựng chính quyền dân chủ nhân dân</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>2. Bài học kinh nghiệm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Về lãnh đạo, chỉ đạo chiến lược</li>
                  <li>Về phát huy sức mạnh đại đoàn kết dân tộc</li>
                  <li>Về nắm bắt thời cơ và quyết định kịp thời</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
