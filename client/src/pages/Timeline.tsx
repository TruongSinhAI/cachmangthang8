import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform
} from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { HistoricalEvent } from "@shared/schema";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import bg_img from "@/public/assets/images/im_bg.jpg";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut
} from "lucide-react";

import TimelineEvent from "@/components/Timeline/TimelineEvent";



// -----------------------------------------------------------------------------
// Dummy Data for Historical Events
// -----------------------------------------------------------------------------
const historicalEventsData: HistoricalEvent[] = [
  {
    "id": 2,
    "category": "revolution",
    "date": "1945-08-12",
    "title": "Ủy ban lâm thời Khu giải phóng hạ lệnh khởi nghĩa",
    "description": "Ngày 12/8/1945, Ủy ban lâm thời Khu giải phóng, cơ quan chính quyền cách mạng được thành lập tại khu căn cứ Việt Bắc, đã chính thức hạ lệnh khởi nghĩa trong khu giải phóng. Đây là động thái đầu tiên, mang tính thử nghiệm và thăm dòng tình hình trước khi phát động tổng khởi nghĩa trên cả nước.",
    "imageUrl": "/images/revolution.jpg",
    "order": 2,
    "context": "Thời cơ cách mạng xuất hiện khi Nhật Bản đầu hàng Đồng minh, chính quyền tay sai hoang mang tột độ. Khu giải phóng Việt Bắc đã được xây dựng vững chắc, lực lượng cách mạng sẵn sàng cho hành động.",
    "significant": "Thể hiện sự chủ động nắm bắt thời cơ, phát động khởi nghĩa từ căn cứ địa cách mạng, tạo tiền đề cho lệnh tổng khởi nghĩa trên toàn quốc."
  },
  {
    "id": 3,
    "category": "revolution",
    "date": "1945-08-13",
    "title": "Thành lập Ủy ban Khởi nghĩa toàn quốc và ban bố Quân lệnh số 1",
    "description": "Ngày 13/8/1945, Trung ương Đảng và Tổng bộ Việt Minh quyết định thành lập Ủy ban Khởi nghĩa toàn quốc, cơ quan chỉ đạo cao nhất cho cuộc tổng khởi nghĩa. Vào 23 giờ cùng ngày, Ủy ban Khởi nghĩa toàn quốc ban bố “Quân lệnh số 1”, chính thức phát lệnh tổng khởi nghĩa trên phạm vi cả nước. Lệnh khởi nghĩa được phát đi trong đêm, thể hiện sự khẩn trương, quyết liệt của Đảng để giành chính quyền trước khi quân Đồng minh vào Đông Dương.",
    "imageUrl": "/images/revolution.jpg",
    "order": 3,
    "context": "Nhật Bản đầu hàng Đồng minh, thời cơ cách mạng chín muồi. Đảng nhận định rõ tình hình và nguy cơ quân Đồng minh và Pháp có thể can thiệp, quyết định chớp thời cơ để giành chính quyền.",
    "significant": "Đánh dấu thời điểm chính thức phát động Tổng khởi nghĩa Tháng Tám trên toàn quốc, thể hiện quyết tâm và sự lãnh đạo tập trung, thống nhất của Đảng."
  },
  {
    "id": 4,
    "category": "revolution",
    "date": "1945-08-14/15",
    "title": "Hội nghị toàn quốc của Đảng tại Tân Trào",
    "description": "Trong hai ngày 14 và 15/8/1945, Hội nghị toàn quốc của Đảng đã diễn ra tại Tân Trào, dưới sự chủ trì của lãnh tụ Hồ Chí Minh và Tổng Bí thư Trường Chinh. Hội nghị tập trung phân tích sâu sắc tình hình và dự đoán các diễn biến sắp tới. Đặc biệt, Hội nghị đã đi đến quyết định lịch sử: phát động toàn dân nổi dậy tổng khởi nghĩa giành chính quyền từ tay phát xít Nhật trước khi quân Đồng minh tiến vào Đông Dương.",
    "imageUrl": "/images/revolution.jpg",
    "order": 4,
    "context": "“Quân lệnh số 1” đã được ban bố, lệnh tổng khởi nghĩa đã được phát đi. Hội nghị toàn quốc được triệu tập để thống nhất ý chí và hành động của toàn Đảng, chuẩn bị mọi mặt cho cuộc tổng khởi nghĩa quyết định vận mệnh dân tộc.",
    "significant": "Hội nghị có ý nghĩa quyết định trong việc hoàn chỉnh kế hoạch tổng khởi nghĩa, xác định đường lối, phương pháp và nguyên tắc chỉ đạo, đảm bảo sự lãnh đạo thống nhất và kịp thời của Đảng."
  },
  {
    "id": 5,
    "category": "revolution",
    "date": "1945-08-14",
    "title": "Giải phóng quân tiến công đồn binh Nhật, hỗ trợ khởi nghĩa",
    "description": "Từ ngày 14/8/1945, các đơn vị Giải phóng quân bắt đầu đồng loạt tiến công vào các đồn binh Nhật ở các tỉnh Cao Bằng, Bắc Kạn, Thái Nguyên, Tuyên Quang, Yên Bái và nhiều địa phương khác. Hành động này nhằm hỗ trợ quần chúng nhân dân nổi dậy giành chính quyền tại các tỉnh lỵ, tạo khí thế cách mạng sôi sục và làm suy yếu sức kháng cự của địch.",
    "imageUrl": "/images/revolution.jpg",
    "order": 5,
    "context": "Sau khi có lệnh tổng khởi nghĩa, lực lượng vũ trang chủ lực là Giải phóng quân nhanh chóng triển khai các hoạt động quân sự, phối hợp chặt chẽ với lực lượng chính trị của quần chúng.",
    "significant": "Sự phối hợp nhịp nhàng giữa lực lượng vũ trang và lực lượng chính trị, thể hiện phương pháp đấu tranh kết hợp, tạo sức mạnh tổng hợp cho cuộc tổng khởi nghĩa."
  },
  {
    "id": 6,
    "category": "revolution",
    "date": "1945-08-16",
    "title": "Đại hội Quốc dân Tân Trào tán thành Tổng khởi nghĩa",
    "description": "Ngày 16/8/1945, Đại hội Quốc dân đã long trọng khai mạc tại Tân Trào. Đại hội quy tụ đại biểu từ khắp mọi miền đất nước, đại diện cho các giới, các đảng phái, đoàn thể, dân tộc và tôn giáo. Tại Đại hội, các đại biểu đã nhất trí tán thành quyết định tổng khởi nghĩa của Đảng, thể hiện ý chí và nguyện vọng của toàn dân tộc. Đại hội cũng thông qua 10 chính sách lớn của Việt Minh và quyết định thành lập Ủy ban Giải phóng dân tộc Việt Nam, do Hồ Chí Minh làm Chủ tịch.",
    "imageUrl": "/images/revolution.jpg",
    "order": 6,
    "context": "Hội nghị toàn quốc của Đảng đã quyết định tổng khởi nghĩa. Đại hội Quốc dân được triệu tập để hợp thức hóa quyết định mang tính toàn dân tộc, tạo nên sức mạnh đoàn kết và sự ủng hộ rộng rãi.",
    "significant": "Thể hiện tính chất dân tộc sâu rộng của Cách mạng Tháng Tám, sự đoàn kết nhất trí của toàn dân tộc dưới ngọn cờ Việt Minh, và khẳng định vai trò lãnh đạo của Hồ Chí Minh."
  },
  {
    "id": 7,
    "category": "revolution",
    "date": "1945-08-16",
    "title": "Giải phóng quân giải phóng thị xã Thái Nguyên",
    "description": "Ngày 16/8/1945, một đơn vị Giải phóng quân, dưới sự chỉ huy trực tiếp của đồng chí Võ Nguyên Giáp, xuất phát từ Tân Trào tiến về giải phóng thị xã Thái Nguyên. Đây là một trong những thị xã đầu tiên được giải phóng trong cao trào tổng khởi nghĩa, có ý nghĩa quan trọng về mặt quân sự và chính trị.",
    "imageUrl": "/images/revolution.jpg",
    "order": 7,
    "context": "Sau Đại hội Quốc dân, khí thế cách mạng lên cao. Giải phóng quân chủ động tiến công, mở đầu cho việc giải phóng các đô thị, trung tâm hành chính quan trọng.",
    "significant": "Thái Nguyên trở thành một trong những tỉnh lỵ đầu tiên được giải phóng, cổ vũ mạnh mẽ phong trào khởi nghĩa trên cả nước."
  },
  {
    "id": 8,
    "category": "revolution",
    "date": "1945-08-18",
    "title": "Bốn tỉnh giành chính quyền sớm nhất",
    "description": "Đến ngày 18/8/1945, trước cả khi nhận được lệnh tổng khởi nghĩa chính thức, bốn tỉnh Hải Dương, Bắc Giang, Hà Tĩnh và Quảng Nam đã chủ động giành được chính quyền về tay nhân dân. Sự chủ động, sáng tạo và quyết đoán của đảng bộ và nhân dân các địa phương này đã thể hiện tinh thần cách mạng cao độ và góp phần tạo đà thắng lợi cho cuộc tổng khởi nghĩa.",
    "imageUrl": "/images/revolution.jpg",
    "order": 8,
    "context": "Tinh thần chỉ đạo từ Trung ương Đảng và Tổng bộ Việt Minh đã lan tỏa mạnh mẽ. Các địa phương nắm vững chủ trương, linh hoạt vận dụng vào tình hình thực tế, chủ động khởi nghĩa khi thời cơ đến.",
    "significant": "Minh chứng cho sức mạnh của phong trào quần chúng, sự chủ động và sáng tạo của các địa phương, và khí thế cách mạng sôi sục trên cả nước."
  },
  {
    "id": 9,
    "category": "revolution",
    "date": "1945-08-19",
    "title": "Khởi nghĩa thắng lợi ở Hà Nội",
    "description": "Sáng ngày 19/8/1945, Thủ đô Hà Nội rực rỡ cờ đỏ sao vàng. Hàng vạn quần chúng cách mạng xuống đường biểu dương lực lượng, tham gia mít tinh lớn tại quảng trường Nhà hát thành phố. Cuộc mít tinh nhanh chóng chuyển thành biểu tình vũ trang, quần chúng chiếm các công sở quan trọng. Đến chiều ngày 19/8, cuộc khởi nghĩa ở Hà Nội đã toàn thắng, chính quyền về tay nhân dân.",
    "imageUrl": "/images/revolution.jpg",
    "order": 9,
    "context": "Khí thế cách mạng dâng cao sau lệnh tổng khởi nghĩa và thắng lợi ở nhiều địa phương. Hà Nội, trung tâm chính trị của cả nước, là mục tiêu trọng điểm của cuộc tổng khởi nghĩa.",
    "significant": "Thắng lợi ở Hà Nội có ý nghĩa quyết định đối với toàn bộ cuộc tổng khởi nghĩa, cổ vũ mạnh mẽ phong trào trên cả nước và đánh dấu sự sụp đổ của chính quyền tay sai ở trung tâm đầu não."
  },
  {
    "id": 10,
    "category": "revolution",
    "date": "1945-08-23",
    "title": "Khởi nghĩa thắng lợi ở Huế",
    "description": "Ngày 23/8/1945, tại Huế, Ủy ban khởi nghĩa Thừa Thiên Huế đã huy động lực lượng quần chúng từ ngoại thành và nội thành xuống đường biểu dương lực lượng. Trước sức mạnh áp đảo của quần chúng, bộ máy chính quyền và quân đội Nhật ở Huế hoàn toàn tê liệt. Cuộc khởi nghĩa ở Huế nhanh chóng giành thắng lợi, chính quyền về tay nhân dân.",
    "imageUrl": "/images/revolution.jpg",
    "order": 10,
    "context": "Thắng lợi ở Hà Nội tạo đà và kinh nghiệm cho các địa phương khác. Huế, kinh đô cũ của Việt Nam, là mục tiêu quan trọng tiếp theo.",
    "significant": "Thắng lợi ở Huế tiếp tục khẳng định sức mạnh của quần chúng và sự sụp đổ không thể tránh khỏi của chính quyền tay sai, đồng thời giải phóng một trung tâm văn hóa, chính trị lớn của đất nước."
  },
  {
    "id": 11,
    "category": "revolution",
    "date": "1945-08-24/25",
    "title": "Khởi nghĩa thắng lợi ở Sài Gòn",
    "description": "Đêm 24 và sáng 25/8/1945, cuộc khởi nghĩa giành chính quyền đã diễn ra mạnh mẽ tại Sài Gòn. Đêm 24/8, các lực lượng khởi nghĩa từ các tỉnh lân cận kéo về Sài Gòn. Sáng 25/8, hơn 1 triệu người dân Sài Gòn xuống đường biểu tình tuần hành thị uy, chiếm các công sở. Cuộc khởi nghĩa ở Sài Gòn thành công nhanh chóng, chính quyền về tay nhân dân.",
    "imageUrl": "/images/revolution.jpg",
    "order": 11,
    "context": "Sau thắng lợi ở Hà Nội và Huế, khí thế cách mạng lan rộng khắp cả nước. Sài Gòn, trung tâm kinh tế, chính trị của Nam Kỳ, là một mục tiêu then chốt.",
    "significant": "Thắng lợi ở Sài Gòn đánh dấu sự toàn thắng của cuộc Tổng khởi nghĩa Tháng Tám trên cả nước, giải phóng hoàn toàn miền Nam và khẳng định sức mạnh của toàn dân tộc."
  },
  {
    "id": 12,
    "category": "revolution",
    "date": "1945-08-28",
    "title": "Toàn quốc giành chính quyền",
    "description": "Đến ngày 28/8/1945, hai tỉnh cuối cùng là Đồng Nai Thượng và Hà Tiên cũng đã giành được chính quyền về tay nhân dân. Như vậy, chỉ trong vòng 15 ngày kể từ khi có lệnh tổng khởi nghĩa, cuộc Cách mạng Tháng Tám đã thành công trên cả nước, chính quyền hoàn toàn thuộc về nhân dân Việt Nam.",
    "imageUrl": "/images/revolution.jpg",
    "order": 12,
    "context": "Thắng lợi của các cuộc khởi nghĩa ở Hà Nội, Huế, Sài Gòn và các địa phương khác đã tạo điều kiện thuận lợi cho việc giành chính quyền trên phạm vi toàn quốc.",
    "significant": "Đánh dấu mốc hoàn thành cuộc Tổng khởi nghĩa Tháng Tám trên cả nước, khẳng định thắng lợi vĩ đại của cách mạng và sự ra đời của chính quyền dân chủ nhân dân."
  },
  {
    "id": 13,
    "category": "revolution",
    "date": "1945-08-27/28",
    "title": "Thành lập Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa",
    "description": "Trong cuộc họp ngày 27/8/1945, Ủy ban dân tộc giải phóng được cải tổ thành Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa, do Hồ Chí Minh làm Chủ tịch. Danh sách Chính phủ lâm thời chính thức được công bố vào ngày 28/8/1945 tại Hà Nội. Chính phủ lâm thời ra đời là bước đi quan trọng để củng cố chính quyền cách mạng và chuẩn bị cho việc tuyên bố độc lập.",
    "imageUrl": "/images/revolution.jpg",
    "order": 13,
    "context": "Sau khi giành được chính quyền trên cả nước, việc thành lập một chính phủ lâm thời là yêu cầu cấp thiết để quản lý đất nước và đại diện cho Việt Nam trên trường quốc tế.",
    "significant": "Đánh dấu sự ra đời của nhà nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á, và khẳng định vai trò lãnh đạo của Hồ Chí Minh."
  },
  {
    "id": 14,
    "category": "revolution",
    "date": "1945-08-30",
    "title": "Vua Bảo Đại thoái vị",
    "description": "Ngày 30/8/1945, tại cuộc mít tinh lớn ở Ngọ Môn, Huế, vua Bảo Đại, vị vua cuối cùng của triều Nguyễn, đã chính thức thoái vị và giao nộp ấn, kiếm tượng trưng cho chế độ quân chủ cho đại diện Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa. Sự kiện này đánh dấu sự chấm dứt hoàn toàn của chế độ phong kiến hàng nghìn năm ở Việt Nam.",
    "imageUrl": "/images/revolution.jpg",
    "order": 14,
    "context": "Chính quyền cách mạng đã được thiết lập trên cả nước, chế độ quân chủ phong kiến không còn chỗ đứng. Việc Bảo Đại thoái vị là một tất yếu lịch sử.",
    "significant": "Chấm dứt chế độ quân chủ chuyên chế hàng nghìn năm, mở ra kỷ nguyên mới của chế độ dân chủ cộng hòa ở Việt Nam."
  },
  {
    "id": 15,
    "category": "revolution",
    "date": "1945-09-02",
    "title": "Lễ Tuyên ngôn Độc lập và khai sinh nước Việt Nam Dân chủ Cộng hòa",
    "description": "Ngày 2/9/1945, tại Quảng trường Ba Đình, Hà Nội, Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa đã long trọng tổ chức Lễ Tuyên ngôn Độc lập. Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc bản Tuyên ngôn Độc lập, trịnh trọng tuyên bố trước quốc dân và thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa. Sự kiện lịch sử này khai sinh ra nước Việt Nam độc lập, tự do, mở ra một kỷ nguyên mới cho dân tộc.",
    "imageUrl": "/images/independence_declaration.jpg",
    "order": 15,
    "context": "Sau khi Cách mạng Tháng Tám thành công, việc tuyên bố độc lập là bước đi tất yếu để khẳng định chủ quyền quốc gia và ra mắt chính phủ mới với quốc dân và thế giới.",
    "significant": "Ngày Quốc khánh của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, đánh dấu sự kết thúc của ách đô hộ thực dân và mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam."
  }
];
// -----------------------------------------------------------------------------
// Main Timeline Component
// -----------------------------------------------------------------------------
export default function Timeline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("revolution");
  const [zoom, setZoom] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(true);

  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ---------------------------------------------------------------------------
  // Scroll Animation Setup
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.6, 1, 1, 0.6]
  );
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // ---------------------------------------------------------------------------
  // Simulated API Query (using static data)
  // ---------------------------------------------------------------------------
  const eventsQuery = {
    isLoading: false,
    data: historicalEventsData
  };

  // ---------------------------------------------------------------------------
  // Handlers & Effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    scrollToTop();
  }
  , []);


  useEffect(() => {
    
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (eventsQuery.isLoading) {
    return <LoadingSkeleton />;
  }
  if (!eventsQuery.data) return null;

  // Filter events by the selected category
  const events = eventsQuery.data.filter(
    (e) => e.category === selectedCategory
  );

  // Count events per category for badges
  const categoryCounts = {
    "pre-revolution": eventsQuery.data.filter(
      (e) => e.category === "pre-revolution"
    ).length,
    revolution: eventsQuery.data.filter((e) => e.category === "revolution")
      .length,
    "post-revolution": eventsQuery.data.filter(
      (e) => e.category === "post-revolution"
    ).length
  };

  // Add new animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0e17] to-[#1a1f2c]"
          : "bg-gradient-to-b from-[#f5f8ff] to-[#e8eeff]"
      }`}
    >
      {/* Progress Bar with Glow Effect */}
      <motion.div
        className={`fixed top-0 left-0 w-1 h-full ${
          theme === "dark" ? "bg-primary/20" : "bg-primary/10"
        } z-50 backdrop-blur-sm`}
        style={{ opacity: progressOpacity }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-primary via-primary to-primary/50"
          style={{
            height: progressHeight,
            boxShadow: "0 0 20px rgba(var(--primary), 0.3)",
          }}
        />
      </motion.div>
  
      {/* Hero Section with Enhanced Parallax */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center bg-fixed transform"
          style={{
            backgroundImage: `url(${bg_img})`,
            filter: "brightness(0.7) contrast(1.1)",
          }}
        />
  
        {/* Enhanced Hero Content */}
        <motion.div
          className="relative container mx-auto px-4 text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <Badge
              className="text-lg px-6 py-2 mb-6 bg-primary/20 text-primary-foreground border border-primary/30 backdrop-blur-md"
              style={{ boxShadow: "0 0 30px rgba(var(--primary), 0.2)" }}
            >
              <CalendarDays className="w-5 h-5 mr-2" /> 1945
            </Badge>
  
            <h1
              className={`text-5xl md:text-7xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } mb-6 font-serif tracking-tight`}
            >
              Dòng thời gian
              <motion.span
                className="block text-primary mt-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  textShadow: "0 0 30px rgba(var(--primary), 0.3)",
                  WebkitTextStroke: "1px rgba(var(--primary), 0.3)",
                }}
              >
                Cách mạng Tháng Tám
              </motion.span>
            </h1>
  
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1.5 }}
              className="w-30 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
            />
  
            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl ${
                theme === "dark" ? "text-white/90" : "text-gray-700"
              } max-w-3xl mx-auto leading-relaxed`}
            >
              Khám phá các sự kiện quan trọng trong tiến trình Cách mạng Tháng Tám
              năm 1945 - bước ngoặt lịch sử quan trọng trên con đường đấu tranh
              giành độc lập dân tộc.
            </motion.p>
          </motion.div>
        </motion.div>
  
        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
            theme === "dark" ? "text-white/60" : "text-gray-600"
          }`}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2">Cuộn xuống</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>
  
      {/* Enhanced Category Navigation */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Navigation content can be added here */}
      </div>
  
      {/* Timeline Section with Enhanced Styling */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="relative"
          style={{
            scale: isMobile ? 1 : zoom,
            transformOrigin: "center top",
          }}
        >
          {/* Enhanced Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5 }}
              className={`h-full ${
                theme === "dark"
                  ? "bg-gradient-to-b from-primary via-primary/20 to-transparent"
                  : "bg-gradient-to-b from-primary/80 via-primary/40 to-transparent"
              }`}
              style={{ boxShadow: "0 0 20px rgba(var(--primary), 0.2)" }}
            />
          </div>
  
          {/* Timeline Events */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
              className="space-y-12"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`relative flex flex-col ${
                    isMobile ? "" : "md:flex-row"
                  } items-start gap-8 ${
                    !isMobile && index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Date Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className={`${
                      event.order !== null && event.order % 2 === 0
                        ? "absolute left-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full"
                        : "absolute right-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full"
                    } ${
                      theme === "dark"
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : "bg-primary shadow-lg shadow-primary/30"
                    }`}
                  >
                    <span className="text-xs font-bold text-white">
                      {event.order ? event.order : index + 1}
                    </span>
                  </motion.div>
  
                  {/* Date Indicator Line */}
                  <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 h-0.5 ${
                      !isMobile && index % 2 === 0
                        ? "w-[calc(50%-2rem)]"
                        : "w-[calc(50%-2rem)] translate-x-[calc(-100%+2rem)]"
                    } ${
                      theme === "dark" ? "bg-primary/20" : "bg-primary/40"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ top: "1rem" }}
                  />
  
                  {/* Timeline Event Card */}
                  <div
                    className={`w-full ${
                      isMobile ? "pl-8" : "md:w-1/2"
                    } ${!isMobile && index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                  >
                    <TimelineEvent event={event} theme={theme} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
  
}

// -----------------------------------------------------------------------------
// Category Button Component
// -----------------------------------------------------------------------------
function CategoryButton({
  children,
  active,
  onClick,
  theme,
  count
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  theme: "light" | "dark";
  count: number;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`relative text-sm md:text-lg font-medium whitespace-nowrap ${
        active
          ? "bg-primary text-primary-foreground"
          : theme === "dark"
          ? "hover:text-primary text-white/80"
          : "hover:text-primary text-gray-700"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {children}
        {count > 0 && (
          <Badge
            variant={active ? "outline" : "secondary"}
            className="text-xs ml-1"
          >
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

// -----------------------------------------------------------------------------
// Loading Skeleton Component
// -----------------------------------------------------------------------------
function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-[40vh] w-full mb-8 rounded-xl" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
