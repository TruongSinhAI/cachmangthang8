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
  boicanh: [
    {
      id: "boicanh-1",
      title: "Chiến tranh thế giới thứ hai bùng nổ và diễn biến phức tạp",
      icon: null,
      content: [
        "Tháng 9/1939, Chiến tranh thế giới thứ hai bùng nổ, Pháp bị Đức tấn công và đầu hàng (6/1940).",
        "Pháp thi hành chính sách đàn áp phong trào cách mạng ở thuộc địa, tăng cường vơ vét sức người, sức của ở Đông Dương.",
        "Tháng 9/1940, Nhật Bản xâm nhập Đông Dương, cấu kết với Pháp để thống trị và bóc lột nhân dân.",
        "Đầu năm 1945, Chiến tranh thế giới thứ hai bước vào giai đoạn cuối, phe Đồng minh thắng thế.",
        "Ngày 9/3/1945, Nhật đảo chính Pháp, độc chiếm Đông Dương.",
        "Giữa tháng 8/1945, Nhật Bản đầu hàng Đồng minh, thời cơ cách mạng xuất hiện."
      ],
      details: "Chiến tranh thế giới thứ hai tạo ra tình thế khủng hoảng chính trị sâu sắc ở Đông Dương, với sự cai trị của Pháp - Nhật, mâu thuẫn dân tộc trở nên gay gắt hơn bao giờ hết. Sự suy yếu của Pháp và việc Nhật đầu hàng Đồng minh tạo ra thời cơ có một không hai để nhân dân Việt Nam vùng lên giành độc lập."
    },
  ],
  chuanbi: [
    {
      id: "chuanbi-2",
      title: "Đảng chuyển hướng chiến lược, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu",
      icon: null,
      content: [
        "Đảng rút vào hoạt động bí mật, chuyển trọng tâm về nông thôn.",
        "9/1939, Trung ương Đảng nhận định: 'Hoàn cảnh Đông Dương sẽ tiến bước đến vấn đề dân tộc giải phóng'.",
        "11/1939, Hội nghị Trung ương Đảng xác định mục tiêu đánh đổ đế quốc, giành độc lập dân tộc, gác khẩu hiệu 'cách mạng ruộng đất'.",
        "5/1941, Hội nghị Trung ương Đảng lần thứ 8 do Nguyễn Ái Quốc chủ trì khẳng định cách mạng Việt Nam là cách mạng giải phóng dân tộc, thành lập Mặt trận Việt Minh."
      ],
      details: "Chuẩn bị về đường lối chính trị được thể hiện qua sự thay đổi chiến lược của Đảng, từ cách mạng tư sản dân quyền sang cách mạng giải phóng dân tộc. Việc thành lập Mặt trận Việt Minh thể hiện sự chuẩn bị về tổ chức và tập hợp lực lượng toàn dân tộc."
    },
    {
      id: "chuanbi-3",
      title: "Xây dựng lực lượng vũ trang và căn cứ địa cách mạng",
      icon: null,
      content: [
        "Duy trì và phát triển lực lượng vũ trang Cứu quốc quân từ du kích Bắc Sơn.",
        "Cuối 1941, Nguyễn Ái Quốc thành lập đội vũ trang ở Cao Bằng.",
        "12/1944, thành lập Đội Việt Nam Tuyên truyền Giải phóng quân.",
        "Xây dựng và mở rộng căn cứ địa Cao Bằng - Bắc Kạn - Lạng Sơn, Bắc Sơn - Võ Nhai, hành lang chính trị nối liền các căn cứ."
      ],
      details: "Quá trình chuẩn bị lực lượng vũ trang diễn ra từng bước, từ du kích, Cứu quốc quân đến Việt Nam Tuyên truyền Giải phóng quân, kết hợp với việc xây dựng căn cứ địa vững chắc, tạo nền tảng cho đấu tranh vũ trang."
    },
    {
      id: "chuanbi-4",
      title: "Đẩy mạnh phong trào quần chúng, chuẩn bị khởi nghĩa",
      icon: null,
      content: [
        "Phát triển Mặt trận Việt Minh, xây dựng các đoàn thể cứu quốc.",
        "Xuất bản báo chí cách mạng, tuyên truyền đường lối của Đảng.",
        "Thành lập Hội Văn hóa Cứu quốc, Đảng Dân chủ Việt Nam, mở rộng khối đại đoàn kết dân tộc.",
        "Vận động binh lính người Việt và người Pháp.",
        "Tháng 10/1944, Hồ Chí Minh kêu gọi chuẩn bị Đại hội Quốc dân, gấp rút chuẩn bị khởi nghĩa."
      ],
      details: "Công tác chuẩn bị lực lượng chính trị được đẩy mạnh thông qua việc phát triển Mặt trận Việt Minh, các đoàn thể cứu quốc, và mở rộng khối đại đoàn kết dân tộc. Công tác tuyên truyền, vận động quần chúng đóng vai trò quan trọng trong việc nâng cao ý thức cách mạng và chuẩn bị cho khởi nghĩa."
    },
    {
      id: "chuanbi-5",
      title: "Cao trào kháng Nhật cứu nước (từ tháng 3/1945)",
      icon: null,
      content: [
        "9/3/1945, Nhật đảo chính Pháp, Đảng ra chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta', phát động cao trào kháng Nhật.",
        "Chiến tranh du kích và khởi nghĩa từng phần nổ ra ở nhiều nơi.",
        "Giải phóng quân và Cứu quốc quân mở rộng vùng giải phóng.",
        "Khởi nghĩa Ba Tơ thành lập căn cứ Ba Tơ.",
        "Thành lập Khu giải phóng Việt Bắc (6/1945), Ủy ban lâm thời Khu giải phóng ra đời.",
        "Khẩu hiệu 'phá kho thóc, giải quyết nạn đói' thúc đẩy phong trào quần chúng."
      ],
      details: "Cao trào kháng Nhật cứu nước là giai đoạn tập dượt quan trọng cho tổng khởi nghĩa, thông qua các hình thức đấu tranh vũ trang và chính trị, quần chúng được giác ngộ và lực lượng cách mạng được tôi luyện, chuẩn bị trực tiếp cho tổng khởi nghĩa."
    }
  ],
  dienbien: [
    {
      id: "dienbien-6",
      title: "Ủy ban lâm thời Khu giải phóng hạ lệnh khởi nghĩa (12/8/1945)",
      icon: null,
      content: [
        "12/8/1945, Ủy ban lâm thời Khu giải phóng hạ lệnh khởi nghĩa trong khu."
      ],
      details: null
    },
    {
      id: "dienbien-7",
      title: "Ủy ban Khởi nghĩa toàn quốc ban bố Quân lệnh số 1 (13/8/1945)",
      icon: null,
      content: [
        "13/8/1945, Ủy ban Khởi nghĩa toàn quốc thành lập.",
        "23h ngày 13/8/1945, ban bố Quân lệnh số 1, phát lệnh tổng khởi nghĩa."
      ],
      details: null
    },
    {
      id: "dienbien-8",
      title: "Hội nghị toàn quốc của Đảng quyết định Tổng khởi nghĩa (14-15/8/1945)",
      icon: null,
      content: [
        "14-15/8/1945, Hội nghị toàn quốc của Đảng tại Tân Trào.",
        "Quyết định phát động toàn dân tổng khởi nghĩa giành chính quyền trước khi quân Đồng minh vào."
      ],
      details: "Hội nghị xác định khẩu hiệu đấu tranh 'Phản đối xâm lược! Hoàn toàn độc lập! Chính quyền nhân dân!', và ba nguyên tắc chỉ đạo khởi nghĩa: tập trung, thống nhất, kịp thời."
    },
    {
      id: "dienbien-9",
      title: "Giải phóng quân tiến công, hỗ trợ quần chúng khởi nghĩa (từ 14/8/1945)",
      icon: null,
      content: [
        "Từ 14/8/1945, Giải phóng quân tiến công đồn binh Nhật ở Cao Bằng, Bắc Kạn, Thái Nguyên...",
        "Hỗ trợ quần chúng nổi dậy giành chính quyền ở tỉnh lỵ."
      ],
      details: null
    },
    {
      id: "dienbien-10",
      title: "Đại hội Quốc dân Tân Trào ủng hộ Tổng khởi nghĩa (16/8/1945)",
      icon: null,
      content: [
        "16/8/1945, Đại hội Quốc dân họp tại Tân Trào.",
        "Tán thành quyết định tổng khởi nghĩa, thông qua 10 chính sách lớn của Việt Minh.",
        "Lập Ủy ban Giải phóng dân tộc Việt Nam do Hồ Chí Minh làm Chủ tịch."
      ],
      details: null
    },
    {
      id: "dienbien-11",
      title: "Giải phóng thị xã Thái Nguyên (16/8/1945)",
      icon: null,
      content: [
        "16/8/1945, Giải phóng quân giải phóng thị xã Thái Nguyên."
      ],
      details: "Đơn vị Giải phóng quân do Võ Nguyên Giáp chỉ huy tiến về giải phóng Thái Nguyên."
    },
    {
      id: "dienbien-12",
      title: "Bốn tỉnh giành chính quyền sớm nhất (18/8/1945)",
      icon: null,
      content: [
        "18/8/1945, Hải Dương, Bắc Giang, Hà Tĩnh, Quảng Nam giành chính quyền."
      ],
      details: "Các tỉnh giành chính quyền trước cả khi nhận được lệnh tổng khởi nghĩa chính thức, thể hiện sự chủ động và khí thế cách mạng."
    },
    {
      id: "dienbien-13",
      title: "Khởi nghĩa thắng lợi ở Hà Nội (19/8/1945)",
      icon: null,
      content: [
        "19/8/1945, khởi nghĩa thắng lợi ở Hà Nội.",
        "Quần chúng chiếm Phủ Khâm sai, Tòa Thị chính, Trại Bảo an binh..."
      ],
      details: "Cuộc mít tinh ngày 17/8 biến thành cuộc biểu dương lực lượng của Việt Minh, tạo tiền đề cho khởi nghĩa ngày 19/8."
    },
    {
      id: "dienbien-14",
      title: "Khởi nghĩa thắng lợi ở Huế (23/8/1945)",
      icon: null,
      content: [
        "23/8/1945, khởi nghĩa thắng lợi ở Huế.",
        "Quần chúng chiếm các công sở, chính quyền Nhật tê liệt."
      ],
      details: null
    },
    {
      id: "dienbien-15",
      title: "Khởi nghĩa thắng lợi ở Sài Gòn (25/8/1945)",
      icon: null,
      content: [
        "25/8/1945, khởi nghĩa thắng lợi ở Sài Gòn.",
        "Hơn 1 triệu người biểu tình, chiếm các công sở."
      ],
      details: "Lực lượng khởi nghĩa từ các tỉnh lân cận kéo về Sài Gòn, tạo nên sức mạnh áp đảo."
    },
    {
      id: "dienbien-16",
      title: "Toàn quốc về tay nhân dân (28/8/1945)",
      icon: null,
      content: [
        "28/8/1945, Đồng Nai Thượng và Hà Tiên giành chính quyền.",
        "Tổng khởi nghĩa thắng lợi trên cả nước."
      ],
      details: null
    },
    {
      id: "dienbien-17",
      title: "Thành lập Chính phủ lâm thời (27-28/8/1945)",
      icon: null,
      content: [
        "27-28/8/1945, thành lập Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa.",
        "Hồ Chí Minh làm Chủ tịch."
      ],
      details: "Ủy ban dân tộc giải phóng cải tổ thành Chính phủ lâm thời, công bố danh sách chính phủ ngày 28/8."
    },
    {
      id: "dienbien-18",
      title: "Vua Bảo Đại thoái vị (30/8/1945)",
      icon: null,
      content: [
        "30/8/1945, vua Bảo Đại thoái vị tại Huế."
      ],
      details: "Bảo Đại giao nộp ấn, kiếm cho đại diện Chính phủ lâm thời, chấm dứt chế độ phong kiến."
    },
    {
      id: "dienbien-19",
      title: "Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa (2/9/1945)",
      icon: null,
      content: [
        "2/9/1945, Lễ Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội.",
        "Hồ Chí Minh đọc Tuyên ngôn Độc lập, tuyên bố thành lập nước Việt Nam Dân chủ Cộng hòa."
      ],
      details: "Bản Tuyên ngôn khẳng định quyền độc lập, tự do của dân tộc Việt Nam và ý chí bảo vệ nền độc lập đó."
    }
  ],
  tinhchat: [
    {
      id: "tinhchat-20",
      title: "Cách mạng giải phóng dân tộc điển hình",
      icon: null,
      content: [
        "Mục tiêu hàng đầu: giải phóng dân tộc khỏi ách đế quốc.",
        "Giải quyết mâu thuẫn chủ yếu: dân tộc Việt Nam và đế quốc xâm lược.",
        "Lực lượng cách mạng: toàn dân tộc đoàn kết trong Mặt trận Việt Minh.",
        "Chính quyền nhà nước: của chung toàn dân tộc, hình thức cộng hòa dân chủ."
      ],
      details: "Cách mạng Tháng Tám tập trung cao độ vào nhiệm vụ giải phóng dân tộc, thể hiện tính triệt để và điển hình của một cuộc cách mạng giải phóng dân tộc trong bối cảnh thuộc địa."
    },
    {
      id: "tinhchat-21",
      title: "Mang tính chất dân chủ mới, chưa triệt để",
      icon: null,
      content: [
        "Mang tính chất dân chủ mới, là một bộ phận của cách mạng dân tộc dân chủ nhân dân.",
        "Giải quyết một số quyền lợi dân chủ, xóa bỏ chế độ phong kiến.",
        "Chưa làm cách mạng ruộng đất triệt để, chưa xóa bỏ hoàn toàn tàn tích phong kiến."
      ],
      details: "Tuy mang tính chất dân chủ, nhưng do nhiệm vụ hàng đầu là giải phóng dân tộc, nên Cách mạng Tháng Tám chưa giải quyết triệt để vấn đề ruộng đất và các tàn tích phong kiến, tính chất dân chủ chưa đầy đủ và sâu sắc."
    },
    {
      id: "tinhchat-22",
      title: "Đậm tính nhân văn",
      icon: null,
      content: [
        "Giải phóng con người Việt Nam khỏi áp bức dân tộc, bóc lột giai cấp, nô dịch tinh thần."
      ],
      details: "Cách mạng Tháng Tám không chỉ giành độc lập dân tộc mà còn hướng tới giải phóng con người toàn diện, thể hiện giá trị nhân văn sâu sắc."
    }
  ],
  baihoc: [
    {
      id: "baihoc-23",
      title: "Giương cao ngọn cờ giải phóng dân tộc",
      icon: null,
      content: [
        "Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
        "Giải quyết đúng đắn mối quan hệ giữa độc lập dân tộc và cách mạng ruộng đất."
      ],
      details: "Bài học về chỉ đạo chiến lược, nhấn mạnh vai trò quyết định của nhiệm vụ giải phóng dân tộc trong cách mạng thuộc địa."
    },
    {
      id: "baihoc-24",
      title: "Xây dựng khối đại đoàn kết dân tộc",
      icon: null,
      content: [
        "Dựa trên liên minh công nông, khơi dậy tinh thần dân tộc.",
        "Tập hợp mọi lực lượng yêu nước trong mặt trận dân tộc thống nhất rộng rãi (Việt Minh)."
      ],
      details: "Bài học về xây dựng lực lượng, khẳng định sức mạnh của khối đại đoàn kết toàn dân tộc trong sự nghiệp cách mạng."
    },
    {
      id: "baihoc-25",
      title: "Nắm vững bạo lực cách mạng, kết hợp đấu tranh chính trị và vũ trang",
      icon: null,
      content: [
        "Xây dựng lực lượng chính trị và vũ trang.",
        "Kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
        "Tiến hành chiến tranh du kích cục bộ, khởi nghĩa từng phần tiến tới tổng khởi nghĩa."
      ],
      details: "Bài học về phương pháp cách mạng, nhấn mạnh vai trò của bạo lực cách mạng và sự kết hợp linh hoạt các hình thức đấu tranh."
    },
    {
      id: "baihoc-26",
      title: "Xây dựng Đảng vững mạnh",
      icon: null,
      content: [
        "Xây dựng Đảng tiên phong, trung thành với lợi ích dân tộc.",
        "Đề ra đường lối chính trị đúng đắn.",
        "Xây dựng Đảng vững mạnh về tư tưởng, chính trị, tổ chức.",
        "Liên hệ mật thiết với quần chúng, cán bộ đảng viên kiên cường."
      ],
      details: "Bài học về xây dựng Đảng, khẳng định vai trò lãnh đạo quyết định của Đảng Cộng sản Đông Dương đối với thắng lợi của Cách mạng Tháng Tám."
    }
  ],
  ynghia: [
    {
      id: "ynghia-27",
      title: "Ý nghĩa lịch sử trọng đại đối với dân tộc",
      icon: null,
      content: [
        "Đập tan xiềng xích nô lệ của chủ nghĩa đế quốc gần một thế kỷ.",
        "Chấm dứt chế độ quân chủ chuyên chế hàng nghìn năm.",
        "Lập nên nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.",
        "Nhân dân Việt Nam từ thân phận nô lệ trở thành người chủ đất nước.",
        "Mở ra kỷ nguyên mới: độc lập, tự do và hướng tới chủ nghĩa xã hội."
      ],
      details: "Cách mạng Tháng Tám là một bước ngoặt vĩ đại trong lịch sử dân tộc, đưa Việt Nam bước sang một trang mới, kỷ nguyên của độc lập, tự do và phát triển theo con đường xã hội chủ nghĩa."
    },
    {
      id: "ynghia-28",
      title: "Ý nghĩa quốc tế sâu sắc",
      icon: null,
      content: [
        "Cuộc cách mạng giải phóng dân tộc đầu tiên thành công ở một nước thuộc địa.",
        "Đột phá hệ thống thuộc địa của chủ nghĩa đế quốc, mở đầu thời kỳ tan rã của chủ nghĩa thực dân cũ.",
        "Cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới.",
        "Góp phần làm phong phú thêm lý luận Mác - Lênin về cách mạng giải phóng dân tộc."
      ],
      details: "Thắng lợi của Cách mạng Tháng Tám có ý nghĩa quốc tế to lớn, là nguồn cảm hứng và động lực cho các dân tộc bị áp bức trên thế giới trong cuộc đấu tranh giành độc lập, tự do."
    },
    {
      id: "ynghia-29",
      title: "Khẳng định đường lối lãnh đạo đúng đắn của Đảng và tư tưởng Hồ Chí Minh",
      icon: null,
      content: [
        "Thắng lợi của đường lối giải phóng dân tộc đúng đắn, sáng tạo của Đảng.",
        "Thắng lợi của tư tưởng độc lập, tự do của Hồ Chí Minh.",
        "Chứng minh khả năng lãnh đạo cách mạng thành công của Đảng Cộng sản ở nước thuộc địa."
      ],
      details: "Cách mạng Tháng Tám là minh chứng sinh động cho sự lãnh đạo tài tình và sáng suốt của Đảng Cộng sản Đông Dương và Chủ tịch Hồ Chí Minh, khẳng định đường lối cách mạng đúng đắn và phù hợp với thực tiễn Việt Nam."
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
  
  const [selectedTab, setSelectedTab] = useState("boicanh");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* -------------------- Hero Section -------------------- */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${bg_img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            opacity: 0.15
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl font-bold text-white mb-6 font-serif tracking-tight"
          >
            Tìm hiểu Cách mạng
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-32 h-1 bg-gradient-to-r from-primary/80 to-primary mx-auto my-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Khám phá chi tiết về bối cảnh, diễn biến và ý nghĩa của Cách mạng
            Tháng Tám
          </motion.p>
        </div>
      </section>

      {/* -------------------- Navigation Tab -------------------- */}
      <div className="container mx-auto px-4 -mt-10">
        <Card className="border-2 border-primary/30 backdrop-blur-xl shadow-xl bg-background/95">
          <CardContent className="p-3">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <ScrollArea className="w-full md:w-auto">
                <nav className="flex flex-nowrap md:flex-wrap gap-3 md:gap-5 p-2">
                  <TabButton
                    active={selectedTab === "boicanh"}
                    onClick={() => setSelectedTab("boicanh")}
                    count={sections.boicanh.length}
                  >
                    Bối cảnh thế giới
                  </TabButton>
                  <TabButton
                    active={selectedTab === "chuanbi"}
                    onClick={() => setSelectedTab("chuanbi")}
                    count={sections.chuanbi.length}
                  >
                    Bối cảnh và sự chuẩn bị của ta
                  </TabButton>
                  <TabButton
                    active={selectedTab === "dienbien"}
                    onClick={() => setSelectedTab("dienbien")}
                    count={sections.dienbien.length}
                  >
                    Diễn biến chi tiết
                  </TabButton>
                  <TabButton
                    active={selectedTab === "tinhchat"}
                    onClick={() => setSelectedTab("tinhchat")}
                    count={sections.tinhchat.length}
                  >
                    Tính chất của cuộc cách mạng
                  </TabButton>
                  <TabButton
                    active={selectedTab === "baihoc"}
                    onClick={() => setSelectedTab("baihoc")}
                    count={sections.baihoc.length}
                  >
                    Bài học
                  </TabButton>
                  <TabButton
                    active={selectedTab === "ynghia"}
                    onClick={() => setSelectedTab("ynghia")}
                    count={sections.ynghia.length}
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
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8"
          >
            {sections[selectedTab as keyof typeof sections].map((section) => (
              <Card
                key={section.id}
                className="border-2 border-primary/30 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-background/95"
              >
                <CardHeader
                  className="cursor-pointer relative group"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg" />
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {section.title}
                      </CardTitle>
                    </div>
                    <ChevronDown
                      className={`h-7 w-7 text-primary transition-all duration-500 ${
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
                      transition={{ duration: 0.4 }}
                    >
                      <CardContent className="space-y-8 pt-4">
                        {/* Main points */}
                        <div className="grid gap-5">
                          {section.content.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4 group"
                            >
                              <div className="w-3 h-3 rounded-full bg-primary/80 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                              <p className="text-lg leading-relaxed">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                        {/* Detailed content */}
                        {section.details && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-primary/10 rounded-xl p-8 border-2 border-primary/20"
                          >
                            <ScrollArea className="h-[250px] pr-6">
                              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                                {section.details}
                              </p>
                            </ScrollArea>
                          </motion.div>
                        )}
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
// TabButton Component for Navigation
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
      className={`relative text-base md:text-lg font-medium whitespace-nowrap transition-all duration-300 ${
        active
          ? "hover:text-primary/90 text-white shadow-lg"
          : "hover:text-primary/90 text-white/70 hover:bg-primary/20"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {children}
        {count > 0 && (
          <Badge 
            variant={active ? "outline" : "secondary"} 
            className={`text-xs ml-1 transition-colors duration-300 ${
              active ? "bg-primary/20" : ""
            }`}
          >
            {count}
          </Badge>
        )}
      </span>
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 rounded-md bg-primary/20"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Button>
  );
}
