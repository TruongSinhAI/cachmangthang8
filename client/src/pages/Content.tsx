import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Clock,
  Book,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bg_img from "@/public/assets/images/im_bg.jpg";
import { Badge } from "@/components/ui/badge";

// -----------------------------------------------------------------------------
// Nội dung các section
// -----------------------------------------------------------------------------
const sections = {
  background: [
    {
      id: "world",
      title: "Bối cảnh thế giới: Thời cơ vàng từ Chiến tranh Thế giới II",
      icon: null,
      content: [
        "Chiến tranh thế giới thứ hai bước vào hồi kết, phe Đồng minh nắm thế thượng phong.",
        "Phát xít Đức đầu hàng vô điều kiện, chấm dứt chiến tranh ở châu Âu.",
        "Nhật Bản kiệt quệ sau hàng loạt thất bại nặng nề, bị bom nguyên tử tàn phá.",
        "Liên Xô hùng mạnh tuyên chiến, tấn công quân Nhật ở Mãn Châu, tạo đòn quyết định."
      ],
      details: `Đầu năm 1945, cục diện Chiến tranh thế giới thứ hai chuyển biến mau chóng, báo hiệu ngày tàn của phe phát xít. Hồng quân Liên Xô dũng mãnh truy kích quân Đức đến tận hang ổ Berlin, giải phóng hàng loạt quốc gia Đông Âu. Tại Tây Âu, quân Đồng minh mở Mặt trận thứ hai, đổ bộ vào Pháp, siết chặt gọng kìm, đẩy lùi phát xít Đức về phía tây. Nước Pháp được giải phóng, chính phủ De Gaulle trở về Paris. Trên chiến trường Thái Bình Dương, quân Đồng minh kiểm soát các tuyến đường biển huyết mạch, cô lập Nhật Bản khỏi nguồn tiếp tế từ Đông Nam Á.  Nhật Bản rơi vào thế cùng quẫn, liên tiếp hứng chịu những đòn giáng sấm sét, đặc biệt là hai quả bom nguyên tử kinh hoàng của Mỹ.  Sự kiện Liên Xô tuyên chiến và tấn công đạo quân Quan Đông tinh nhuệ của Nhật Bản ở Mãn Châu càng đẩy nhanh quá trình đầu hàng của phát xít Nhật, tạo ra một khoảng trống quyền lực chưa từng có, một thời cơ cách mạng chín muồi cho các dân tộc bị áp bức, trong đó có Việt Nam.`
    },
    {
      id: "vietnam",
      title: "Tình hình Việt Nam: 'Ngàn cân treo sợi tóc'",
      icon: null,
      content: [
        "Nhật đảo chính Pháp ngày 9/3/1945, thiết lập ách thống trị phát xít tàn bạo.",
        "Chính phủ Trần Trọng Kim thân Nhật ra đời, chỉ là ширмa che mắt, tay sai bù nhìn.",
        "Nhân dân Việt Nam 'một cổ hai tròng', gánh chịu áp bức, bóc lột dã man từ phát xít Nhật.",
        "Mâu thuẫn xã hội lên đến đỉnh điểm, nạn đói khủng khiếp 1945 đẩy dân tộc đến bờ vực."
      ],
      details: `Ngày 9/3/1945, phát xít Nhật bất ngờ đảo chính Pháp, hất cẳng chính quyền thực dân, độc chiếm Đông Dương.  Chính phủ Pháp đầu hàng bạc nhược, cấu kết với Nhật để tiếp tục duy trì quyền lợi. Sau đảo chính, Nhật Bản dựng lên chính phủ Trần Trọng Kim, một chính phủ傀儡, hoàn toàn phục vụ cho mưu đồ thống trị của Nhật.  Nhân dân Việt Nam rơi vào cảnh 'một cổ hai tròng',  chịu sự áp bức, bóc lột thậm tệ hơn bao giờ hết.  Chính sách vơ vét, bóc lột của phát xít Nhật đẩy nền kinh tế Việt Nam đến bờ vực suy sụp, gây ra nạn đói khủng khiếp năm 1945, làm hơn 2 triệu đồng bào chết đói.  Mâu thuẫn xã hội trở nên gay gắt chưa từng có,  đất nước đứng trước nguy cơ diệt vong, đòi hỏi một cuộc cách mạng giải phóng dân tộc cấp bách.`
    }
  ],
  events: [
    {
      id: "preparation",
      title: "Chủ trương 'đón thời cơ' của Đảng và Mặt trận Việt Minh",
      icon: null,
      content: [
        "Hội nghị Ban Thường vụ Trung ương Đảng mở rộng tại Đình Bảng, chớp thời cơ sau đảo chính.",
        "Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta' ra đời, định hướng chiến lược.",
        "Xác định rõ kẻ thù chính là phát xít Nhật, phát động cao trào kháng Nhật cứu nước sôi sục.",
        "Chủ trương thành lập Ủy ban Giải phóng Dân tộc Việt Nam, xây dựng Khu giải phóng vững chắc."
      ],
      details: `Ngay sau khi Nhật đảo chính Pháp, nhận định thời cơ cách mạng đã đến gần, Hội nghị Ban Thường vụ Trung ương Đảng mở rộng được triệu tập khẩn cấp tại Đình Bảng (Bắc Ninh). Hội nghị phân tích sâu sắc tình hình và đề ra chủ trương chiến lược mới. Ngày 12/3/1945, Chỉ thị lịch sử 'Nhật - Pháp bắn nhau và hành động của chúng ta' được ban hành,  xác định rõ phát xít Nhật là kẻ thù chính, trực tiếp và duy nhất của nhân dân Đông Dương.  Đảng quyết định phát động cao trào kháng Nhật cứu nước mạnh mẽ,  thay đổi khẩu hiệu đấu tranh,  tập trung mọi lực lượng vào nhiệm vụ giải phóng dân tộc. Hội nghị chủ trương thành lập Ủy ban Giải phóng Dân tộc Việt Nam (sau đổi tên thành Ủy ban Dân tộc Giải phóng Việt Nam) và khẩn trương xây dựng Khu giải phóng Việt Bắc,  biến nơi đây thành căn cứ địa vững chắc,  đầu não chỉ đạo cách mạng cả nước,  chuẩn bị mọi mặt cho tổng khởi nghĩa giành chính quyền.`
    },
    {
      id: "uprising",
      title: "Tổng khởi nghĩa 'chớp nhoáng': 'Long trời lở đất'",
      icon: null,
      content: [
        "Cao trào kháng Nhật cứu nước như 'bão táp', cuốn phăng mọi trở ngại, lan rộng khắp nước.",
        "Ủy ban Khởi nghĩa toàn quốc thành lập, 'Quân lệnh số 1' phát ra, hiệu triệu tổng khởi nghĩa.",
        "Tổng khởi nghĩa thắng lợi 'sét đánh không kịp bịt tai' ở Hà Nội (19/8), Huế (23/8), Sài Gòn (25/8)...",
        "Đại hội Quốc dân Tân Trào quyết định lịch sử, thông qua tổng khởi nghĩa, bầu Ủy ban Dân tộc Giải phóng.",
        "Ngày 2/9/1945, tại Ba Đình, Tuyên ngôn Độc lập vang vọng, khai sinh nước Việt Nam Dân chủ Cộng hòa."
      ],
      details: `Từ giữa tháng 3/1945, cao trào kháng Nhật cứu nước bùng nổ như vũ bão,  tạo khí thế cách mạng sôi sục,  tiền đề cho tổng khởi nghĩa.  Ngày 13/8/1945,  khi Nhật Bản đầu hàng Đồng minh,  Trung ương Đảng và Tổng bộ Việt Minh lập tức thành lập Ủy ban Khởi nghĩa toàn quốc,  ban bố 'Quân lệnh số 1',  phát lệnh tổng khởi nghĩa trên phạm vi cả nước.  Tổng khởi nghĩa diễn ra vô cùng nhanh chóng,  mạnh mẽ và quyết liệt,  giành thắng lợi gần như đồng loạt ở Hà Nội (19/8),  Huế (23/8),  Sài Gòn (25/8) và hầu hết các địa phương khác trên cả nước.  Đại hội Quốc dân được triệu tập tại Tân Trào (16/8/1945)  mang tính quyết định lịch sử,  thông qua quyết định tổng khởi nghĩa,  10 chính sách lớn của Việt Minh và bầu Ủy ban Dân tộc Giải phóng Việt Nam do Hồ Chí Minh làm Chủ tịch.  Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử,  Hà Nội,  Chủ tịch Hồ Chí Minh long trọng đọc bản Tuyên ngôn Độc lập bất hủ,  tuyên bố với quốc dân đồng bào và toàn thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa,  khép lại trang sử nô lệ,  mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam.`
    }
  ],
  significance: [
    {
      id: "historical",
      title: "Ý nghĩa 'vang dội năm châu' của Cách mạng Tháng Tám",
      icon: null,
      content: [
        "Chấm dứt gần một thế kỷ đêm dài nô lệ dưới gót giày thực dân, đế quốc.",
        "Xóa bỏ chế độ quân chủ chuyên chế ngàn năm, lỗi thời, lạc hậu.",
        "Khai sinh nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.",
        "Mở ra kỷ nguyên mới - kỷ nguyên độc lập, tự do, dân chủ và chủ nghĩa xã hội cho dân tộc.",
        "Cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên toàn thế giới, báo hiệu 'bão táp cách mạng'."
      ],
      details: `Cách mạng Tháng Tám năm 1945 mang trong mình ý nghĩa lịch sử vô cùng to lớn, không chỉ đối với dân tộc Việt Nam mà còn có tầm vóc quốc tế sâu rộng.  Thắng lợi vĩ đại này đã chấm dứt chế độ thực dân, phong kiến kéo dài gần một thế kỷ,  lật đổ chế độ quân chủ chuyên chế đã tồn tại hàng nghìn năm,  mở ra một trang sử mới cho dân tộc.  Sự ra đời của nước Việt Nam Dân chủ Cộng hòa,  nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á,  là một mốc son chói lọi,  khẳng định quyền làm chủ đất nước của nhân dân Việt Nam.  Cách mạng Tháng Tám mở ra kỷ nguyên độc lập, tự do, dân chủ và tiến lên chủ nghĩa xã hội cho dân tộc Việt Nam.  Đồng thời,  thắng lợi này còn có ý nghĩa quốc tế vô cùng to lớn,  cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên toàn thế giới,  đánh dấu bước khởi đầu của thời kỳ sụp đổ không thể đảo ngược của chủ nghĩa thực dân cũ,  góp phần làm thay đổi cục diện thế giới sau Chiến tranh Thế giới thứ hai.`
    },
    {
      id: "lessons",
      title: "Bài học kinh nghiệm 'vô giá' từ Cách mạng Tháng Tám",
      icon: null,
      content: [
        "Giương cao ngọn cờ giải phóng dân tộc, đặt lợi ích quốc gia lên trên hết.",
        "Xây dựng khối đại đoàn kết dân tộc 'vững như bàn thạch', dựa vào sức mạnh toàn dân.",
        "Nắm vững bạo lực cách mạng, kết hợp 'nhuần nhuyễn' đấu tranh chính trị và vũ trang.",
        "Chớp thời cơ 'ngàn năm có một',  hành động kiên quyết,  tổng khởi nghĩa 'đúng thời điểm'.",
        "Xây dựng Đảng Cộng sản 'trong sạch, vững mạnh',  đường lối đúng đắn,  gắn bó máu thịt với dân."
      ],
      details: `Cách mạng Tháng Tám năm 1945 không chỉ là một chiến thắng vĩ đại mà còn để lại những bài học kinh nghiệm vô giá cho sự nghiệp cách mạng Việt Nam và phong trào giải phóng dân tộc trên thế giới.  Đó là bài học về: (1)  Luôn giương cao ngọn cờ giải phóng dân tộc,  xác định đúng đắn mối quan hệ giữa nhiệm vụ dân tộc và dân chủ,  đặt lợi ích quốc gia, dân tộc lên trên hết.  (2)  Xây dựng và phát huy sức mạnh vĩ đại của khối đại đoàn kết toàn dân tộc,  dựa trên nền tảng liên minh công - nông vững chắc.  (3)  Nắm vững quan điểm bạo lực cách mạng của quần chúng,  kết hợp nhuần nhuyễn đấu tranh chính trị với đấu tranh vũ trang,  sử dụng sức mạnh tổng hợp để giành thắng lợi.  (4)  Chớp thời cơ cách mạng 'ngàn năm có một',  kiên quyết,  dứt khoát phát động tổng khởi nghĩa giành chính quyền khi thời cơ chín muồi.  (5)  Xây dựng một Đảng Cộng sản vững mạnh về mọi mặt,  có đường lối chính trị đúng đắn,  sáng tạo,  linh hoạt,  và có mối liên hệ máu thịt,  gắn bó mật thiết với quần chúng nhân dân,  được nhân dân tin yêu,  ủng hộ và bảo vệ.  Những bài học kinh nghiệm này vẫn còn nguyên giá trị thời sự,  tiếp tục soi đường,  chỉ lối cho sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa ngày nay.`
    }
  ]
};
// -----------------------------------------------------------------------------
// Component chính Content
// -----------------------------------------------------------------------------
export default function Content() {
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [selectedTab, setSelectedTab] = useState("background");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* -------------------- Hero Section -------------------- */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg_img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            opacity: 0.1
          }}
        />
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
            Khám phá chi tiết về bối cảnh, diễn biến và ý nghĩa của Cách mạng
            Tháng Tám
          </motion.p>
        </div>
      </section>

      {/* -------------------- Navigation Tab -------------------- */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="border-2 border-primary/20 backdrop-blur-md shadow-lg">
          <CardContent className="p-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <ScrollArea className="w-full md:w-auto">
                <nav className="flex flex-nowrap md:flex-wrap gap-2 md:gap-4 p-1">
                  <TabButton
                    active={selectedTab === "background"}
                    onClick={() => setSelectedTab("background")}
                    count={sections.background.length}
                  >
                    Bối cảnh lịch sử
                  </TabButton>
                  <TabButton
                    active={selectedTab === "events"}
                    onClick={() => setSelectedTab("events")}
                    count={sections.events.length}
                  >
                    Diễn biến
                  </TabButton>
                  <TabButton
                    active={selectedTab === "significance"}
                    onClick={() => setSelectedTab("significance")}
                    count={sections.significance.length}
                  >
                    Ý nghĩa
                  </TabButton>
                </nav>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* -------------------- Content Sections -------------------- */}
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
                className="border-2 border-primary/20 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader
                  className="cursor-pointer relative"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
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
                        {/* Các điểm chính */}
                        <div className="grid gap-4">
                          {section.content.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <p className="text-lg ">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                        {/* Nội dung chi tiết */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-primary/5 rounded-lg p-6 border-2 border-primary/10"
                        >
                          <ScrollArea className="h-[200px] pr-4">
                            <p className=" leading-relaxed whitespace-pre-wrap">
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

// -----------------------------------------------------------------------------
// Component TabButton cho Navigation
// -----------------------------------------------------------------------------
function TabButton({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`relative text-sm md:text-lg font-medium whitespace-nowrap ${
        active
          ? "hover:text-primary text-white/80"
          : "hover:text-primary text-white/80"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {children}
        {count > 0 && (
          <Badge variant={active ? "outline" : "secondary"} className="text-xs ml-1">
            {count}
          </Badge>
        )}
      </span>
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 rounded-md"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Button>
  );
}
