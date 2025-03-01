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
    id: 1,
    category: "pre-revolution",
    date: "1939-09",
    title: "Chiến tranh thế giới thứ hai bùng nổ",
    description:
      "Tháng 9/1939, Chiến tranh thế giới thứ hai chính thức bắt đầu, xuất phát từ những mâu thuẫn sâu sắc giữa các cường quốc đế quốc về vấn đề thị trường và thuộc địa.  Sự kiện chấn động này nhanh chóng lan rộng, cuốn cả thế giới vào vòng xoáy chiến tranh tàn khốc, tạo nên một cục diện quốc tế đầy biến động và mở ra một chương mới cho lịch sử nhân loại. Đông Dương, với vị trí chiến lược quan trọng, không thể tránh khỏi sự ảnh hưởng sâu sắc từ cuộc chiến này.",
    imageUrl: "/images/ww2.jpg",
    order: 1,
    context:
      "Bối cảnh thế giới đầy căng thẳng với sự trỗi dậy mạnh mẽ của chủ nghĩa phát xít ở châu Âu, đặc biệt là Đức và Ý, cùng với những mâu thuẫn gay gắt giữa các cường quốc đế quốc về quyền lợi kinh tế và thuộc địa.  Hệ thống Versailles-Washington sau Chiến tranh thế giới thứ nhất bộc lộ sự bất ổn, không thể duy trì hòa bình và trật tự thế giới.",
    significant:
      "Chiến tranh thế giới thứ hai tạo ra một bước ngoặt lịch sử, làm suy yếu các nước đế quốc chủ nghĩa, trong đó có Pháp, và tạo điều kiện khách quan thuận lợi cho phong trào giải phóng dân tộc trên toàn thế giới, đặc biệt là ở các nước thuộc địa như Việt Nam. Nó gián tiếp thúc đẩy quá trình đấu tranh giành độc lập của dân tộc Việt Nam khi Pháp phải tập trung nguồn lực cho chiến tranh ở châu Âu và suy yếu tại thuộc địa."
  },
  {
    id: 2,
    category: "pre-revolution",
    date: "1939-09-28",
    title: "Pháp cấm tuyên truyền cộng sản",
    description:
      "Ngày 28/9/1939, chính quyền thực dân Pháp ở Đông Dương ban hành nghị định hà khắc, đặt Đảng Cộng sản Đông Dương ra ngoài vòng pháp luật, cấm mọi hoạt động tuyên truyền cộng sản.  Đây là đòn đàn áp dã man của thực dân Pháp nhằm bóp nghẹt phong trào cách mạng Việt Nam, dập tắt ngọn lửa đấu tranh đang âm ỉ cháy trong lòng dân tộc.  Tuy nhiên, chính hành động này lại càng cho thấy sự hoảng sợ của thực dân Pháp trước sức mạnh và ảnh hưởng ngày càng lan rộng của Đảng Cộng sản.",
    imageUrl: "/images/french-colonialism.jpg",
    order: 2,
    context:
      "Trong bối cảnh Chiến tranh thế giới thứ hai nổ ra, Pháp lo sợ phong trào cách mạng ở thuộc địa sẽ lợi dụng tình hình để nổi dậy.  Chính phủ Đalađiê (Daladier) ở Pháp thi hành chính sách đàn áp tàn bạo các lực lượng dân chủ trong nước và phong trào cách mạng ở các thuộc địa, nhằm duy trì ách thống trị và vơ vét tài nguyên cho chiến tranh.",
    significant:
      "Mặc dù bị đàn áp, Đảng Cộng sản Đông Dương vẫn kiên cường chuyển vào hoạt động bí mật, thể hiện bản lĩnh và sự trưởng thành về chính trị.  Chính sách đàn áp của Pháp không những không dập tắt được phong trào cách mạng mà ngược lại, càng làm tăng thêm mâu thuẫn giữa dân tộc Việt Nam và thực dân Pháp, thúc đẩy quyết tâm giành độc lập của nhân dân ta."
  },
  {
    id: 3,
    category: "pre-revolution",
    date: "1939-11",
    title: "Hội nghị Trung ương Đảng tại Bà Điểm",
    description:
      "Tháng 11/1939, Hội nghị Ban Chấp hành Trung ương Đảng diễn ra tại Bà Điểm, Hóc Môn, Gia Định, đánh dấu một bước ngoặt quan trọng trong chỉ đạo cách mạng.  Hội nghị đã đi sâu phân tích tình hình mới, khẳng định con đường sống duy nhất của dân tộc là đánh đổ đế quốc Pháp, giành độc lập hoàn toàn.  Chủ trương thành lập Mặt trận dân tộc thống nhất phản đế Đông Dương được đề ra, thể hiện sự nhạy bén và tầm nhìn chiến lược của Đảng trong việc nắm bắt thời cơ và định hướng phong trào.",
    imageUrl: "/src/public/assets/images/party-meeting.jpg",
    order: 3,
    context:
      "Chính sách đàn áp của Pháp ngày càng gia tăng, Đảng Cộng sản Đông Dương phải hoạt động bí mật.  Hội nghị Bà Điểm diễn ra trong hoàn cảnh đó, thể hiện sự chủ động và sáng suốt của Đảng trong việc đánh giá tình hình và đề ra đường lối phù hợp.",
    significant:
      "Hội nghị Bà Điểm xác định đúng đắn nhiệm vụ chiến lược của cách mạng Việt Nam trong giai đoạn mới là giải phóng dân tộc, đặt nhiệm vụ dân tộc lên trên hết.  Chủ trương thành lập Mặt trận thống nhất phản đế là bước chuẩn bị quan trọng về lực lượng chính trị cho cuộc đấu tranh giải phóng dân tộc, mở đường cho sự ra đời của Mặt trận Việt Minh sau này."
  },
  {
    id: 4,
    category: "pre-revolution",
    date: "1940-09",
    title: "Nhật Bản xâm nhập Đông Dương",
    description:
      "Tháng 9/1940, lợi dụng thời cơ Pháp đang bị sa lầy ở châu Âu, quân phiệt Nhật Bản ngang nhiên tiến quân vào Đông Dương.  Thực dân Pháp, yếu thế và bạc nhược, đã nhanh chóng đầu hàng, chấp nhận cấu kết với Nhật để duy trì quyền lợi ít ỏi còn lại.  Từ đây, nhân dân Đông Dương phải gánh chịu ách thống trị “một cổ hai tròng” Pháp - Nhật, cuộc sống càng thêm lầm than, mâu thuẫn dân tộc trở nên vô cùng gay gắt, đẩy đất nước đến bờ vực của sự thay đổi.",
    imageUrl: "/images/japanese-invasion.jpg",
    order: 4,
    context:
      "Pháp bị Đức chiếm đóng, suy yếu nghiêm trọng.  Nhật Bản thực hiện chính sách bành trướng ở châu Á, coi Đông Dương là bàn đạp để tiến xuống Đông Nam Á và Thái Bình Dương.  Sự cấu kết giữa Pháp và Nhật là một thỏa hiệp ô nhục, đặt lợi ích của chính quyền thực dân lên trên vận mệnh dân tộc.",
    significant:
      "Sự xâm nhập của Nhật Bản làm thay đổi sâu sắc tình hình Đông Dương, tạo ra một kẻ thù mới, nguy hiểm hơn.  Tình cảnh “một cổ hai tròng” càng làm tăng thêm lòng căm phẫn của nhân dân ta đối với cả Pháp và Nhật, thúc đẩy mạnh mẽ phong trào giải phóng dân tộc.  Nhận định về tình hình mới này là cơ sở để Đảng ta có những chủ trương, quyết sách phù hợp trong giai đoạn tiếp theo."
  },
  {
    id: 5,
    category: "pre-revolution",
    date: "1941-01-28",
    title: "Nguyễn Ái Quốc về nước",
    description:
      "Ngày 28/1/1941, sau 30 năm bôn ba hải ngoại tìm đường cứu nước, lãnh tụ Nguyễn Ái Quốc trở về Tổ quốc, đặt chân lên mảnh đất Pác Bó, Cao Bằng.  Sự kiện lịch sử này có ý nghĩa vô cùng to lớn, đánh dấu bước ngoặt quyết định cho cách mạng Việt Nam.  Lãnh tụ Nguyễn Ái Quốc trực tiếp lãnh đạo phong trào, mang đến luồng gió mới, định hướng chiến lược đúng đắn, sáng tạo, đưa con thuyền cách mạng vượt qua sóng gió, tiến tới bến bờ thắng lợi.",
    imageUrl: "/images/ho-chi-minh-return.jpg",
    order: 5,
    context:
      "Tình hình thế giới và trong nước có nhiều chuyển biến quan trọng, thời cơ cách mạng đang đến gần.  Đảng Cộng sản Đông Dương cần sự lãnh đạo trực tiếp của lãnh tụ Nguyễn Ái Quốc để đưa ra những quyết sách chiến lược, nắm bắt thời cơ, lãnh đạo toàn dân tộc đứng lên giải phóng đất nước.",
    significant:
      "Sự trở về của lãnh tụ Nguyễn Ái Quốc là nguồn cổ vũ tinh thần to lớn cho toàn Đảng, toàn dân.  Người trực tiếp chỉ đạo việc hoàn chỉnh đường lối cách mạng giải phóng dân tộc, thành lập Mặt trận Việt Minh, chuẩn bị mọi mặt cho Tổng khởi nghĩa Tháng Tám sau này.  Đây là yếu tố quyết định làm nên thắng lợi của Cách mạng Tháng Tám."
  },
  {
    id: 6,
    category: "pre-revolution",
    date: "1941-05",
    title: "Hội nghị Trung ương Đảng lần thứ Tám",
    description:
      "Tháng 5/1941, Hội nghị Trung ương Đảng lần thứ tám do Nguyễn Ái Quốc chủ trì tại Pác Bó đã diễn ra thành công, thông qua những quyết sách mang tính lịch sử.  Hội nghị khẳng định nhiệm vụ hàng đầu của cách mạng Việt Nam là giải phóng dân tộc, quyết định thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh), chủ trương tạm gác khẩu hiệu cách mạng ruộng đất, tập trung lực lượng cho nhiệm vụ chống đế quốc và phát xít.  Đây là sự hoàn chỉnh về đường lối chiến lược, thể hiện sự sáng tạo và linh hoạt của Đảng ta trong việc vận dụng chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam.",
    imageUrl: "/images/8th-meeting.jpg",
    order: 6,
    context:
      "Nguyễn Ái Quốc trực tiếp lãnh đạo cách mạng trong nước, cần có một hội nghị Trung ương để đánh giá tình hình, hoàn chỉnh đường lối chiến lược và đề ra những nhiệm vụ cụ thể cho giai đoạn mới.",
    significant:
      "Hội nghị Trung ương 8 có ý nghĩa quyết định đối với thắng lợi của Cách mạng Tháng Tám.  Đường lối giải phóng dân tộc được hoàn chỉnh, Mặt trận Việt Minh được thành lập, tạo cơ sở vững chắc về chính trị và lực lượng cho cuộc tổng khởi nghĩa.  Hội nghị thể hiện sự trưởng thành vượt bậc về đường lối lãnh đạo của Đảng, đánh dấu bước chuẩn bị toàn diện cho cách mạng."
  },
  {
    id: 7,
    category: "revolution",
    date: "1941-10-25",
    title: "Việt Minh công bố Tuyên ngôn",
    description:
      "Ngày 25/10/1941, Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh) chính thức ra mắt quốc dân đồng bào, công bố Tuyên ngôn, Chương trình và Điều lệ.  Tuyên ngôn Việt Minh như một lời hiệu triệu non sông, kêu gọi toàn thể dân tộc Việt Nam không phân biệt già trẻ, gái trai, tôn giáo, đảng phái, hãy đoàn kết một lòng, dưới ngọn cờ Việt Minh, đứng lên đánh đuổi Pháp - Nhật, giành lại độc lập tự do cho Tổ quốc.  Sự ra đời của Việt Minh đã thổi một luồng sinh khí mới vào phong trào giải phóng dân tộc, thu hút đông đảo quần chúng nhân dân tham gia.",
    imageUrl: "/images/vietminh-declaration.jpg",
    order: 1,
    context:
      "Đường lối giải phóng dân tộc đã được xác định, Mặt trận dân tộc thống nhất phản đế cần được cụ thể hóa bằng một tổ chức chính trị rộng lớn, có cương lĩnh, chương trình hành động rõ ràng để tập hợp và lãnh đạo quần chúng.",
    significant:
      "Sự ra đời của Mặt trận Việt Minh đánh dấu bước phát triển mới của khối đại đoàn kết dân tộc.  Việt Minh trở thành ngọn cờ tập hợp, giác ngộ và rèn luyện lực lượng chính trị hùng hậu cho cách mạng, là cơ sở vững chắc để tiến tới Tổng khởi nghĩa Tháng Tám."
  },
  {
    id: 8,
    category: "revolution",
    date: "1944-12-22",
    title: "Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
    description:
      "Ngày 22/12/1944, tại Cao Bằng, Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập theo chỉ thị của Chủ tịch Hồ Chí Minh.  Đây là đội quân chủ lực đầu tiên của Đảng, mang trong mình sứ mệnh vừa vũ trang tuyên truyền, vừa chiến đấu bảo vệ cách mạng, xây dựng cơ sở chính trị trong quần chúng.  Sự ra đời của Đội Việt Nam Tuyên truyền Giải phóng quân là bước khởi đầu quan trọng cho việc xây dựng lực lượng vũ trang cách mạng, chuẩn bị cho cuộc đấu tranh bằng vũ lực giành chính quyền.",
    imageUrl: "/images/liberation-army.jpg",
    order: 2,
    context:
      "Chủ trương khởi nghĩa vũ trang đã được xác định, cần có một lực lượng vũ trang nòng cốt, vừa có khả năng chiến đấu, vừa có khả năng tuyên truyền, vận động quần chúng, xây dựng cơ sở cách mạng.",
    significant:
      "Sự ra đời của Đội Việt Nam Tuyên truyền Giải phóng quân đánh dấu bước chuyển quan trọng trong phương thức đấu tranh của cách mạng Việt Nam, từ đấu tranh chính trị là chủ yếu sang kết hợp đấu tranh chính trị với đấu tranh vũ trang.  Đội là tiền thân của Quân đội Nhân dân Việt Nam, lực lượng nòng cốt trong cuộc kháng chiến chống Pháp và chống Mỹ sau này."
  },
  {
    id: 9,
    category: "revolution",
    date: "1945-03-09",
    title: "Nhật đảo chính Pháp",
    description:
      "Ngày 9/3/1945, phát xít Nhật bất ngờ tiến hành cuộc đảo chính lật đổ chính quyền thực dân Pháp trên toàn cõi Đông Dương.  Hành động táo tợn này đã làm tan rã bộ máy cai trị của Pháp, tạo ra một khoảng trống quyền lực lớn, đồng thời đẩy mâu thuẫn giữa Nhật và Pháp lên đến đỉnh điểm.  Ngay lập tức, Ban Thường vụ Trung ương Đảng đã triệu tập hội nghị mở rộng, phân tích tình hình và đề ra chỉ thị “Nhật - Pháp bắn nhau và hành động của chúng ta”, kịp thời chớp lấy thời cơ cách mạng.",
    imageUrl: "/images/japanese-coup.jpg",
    order: 3,
    context:
      "Chiến tranh thế giới thứ hai bước vào giai đoạn cuối, Nhật Bản lo sợ Pháp theo phe Đồng minh sẽ chống lại Nhật, nên quyết định đảo chính để độc chiếm Đông Dương.",
    significant:
      "Cuộc đảo chính Nhật - Pháp tạo ra một thời cơ cách mạng trực tiếp.  Kẻ thù chính của nhân dân ta lúc này là phát xít Nhật.  Đảng ta đã kịp thời chuyển hướng chỉ đạo, phát động cao trào kháng Nhật cứu nước, tạo tiền đề cho Tổng khởi nghĩa Tháng Tám."
  },
  {
    id: 10,
    category: "revolution",
    date: "1945-03",
    title: "Cao trào kháng Nhật cứu nước",
    description:
      "Sau cuộc đảo chính 9/3, dưới sự lãnh đạo tài tình của Đảng và Mặt trận Việt Minh, cao trào kháng Nhật cứu nước đã bùng nổ và lan rộng khắp cả nước.  Quần chúng nhân dân từ nông thôn đến thành thị, từ miền núi đến đồng bằng, nhất tề đứng lên đấu tranh bằng nhiều hình thức phong phú, từ biểu tình, bãi công đến khởi nghĩa vũ trang cục bộ.  Cao trào kháng Nhật cứu nước như một cơn bão táp cách mạng, làm rung chuyển tận gốc ách thống trị của phát xít Nhật và chính quyền tay sai, tạo khí thế sôi sục, mạnh mẽ cho Tổng khởi nghĩa Tháng Tám.",
    imageUrl: "/images/anti-japanese-movement.jpg",
    order: 4,
    context:
      "Chỉ thị “Nhật - Pháp bắn nhau và hành động của chúng ta” của Trung ương Đảng đã thổi bùng ngọn lửa cách mạng trong quần chúng nhân dân.  Thời cơ cách mạng đang đến gần, cần phát động một cao trào mạnh mẽ để chuẩn bị lực lượng cho tổng khởi nghĩa.",
    significant:
      "Cao trào kháng Nhật cứu nước là cuộc tổng diễn tập cho Tổng khởi nghĩa Tháng Tám.  Nó đã huy động và rèn luyện lực lượng cách mạng, xây dựng và mở rộng căn cứ địa, tạo ra khí thế cách mạng sôi sục trong cả nước, đẩy nhanh quá trình chín muồi của thời cơ cách mạng."
  },
  {
    id: 11,
    category: "revolution",
    date: "1945-06-04",
    title: "Thành lập Khu giải phóng",
    description:
      "Ngày 4/6/1945, Khu giải phóng Việt Bắc chính thức được thành lập, bao gồm sáu tỉnh Cao Bằng, Bắc Kạn, Lạng Sơn, Tuyên Quang, Thái Nguyên, Hà Giang và một số vùng lân cận.  Khu giải phóng Việt Bắc trở thành thủ đô lâm thời của nước Việt Nam mới, là căn cứ địa vững chắc nhất của cách mạng, nơi tập trung các cơ quan lãnh đạo cao nhất của Đảng và Mặt trận Việt Minh.  Đây là hình ảnh thu nhỏ của nước Việt Nam độc lập, tự do, là biểu tượng cho sức mạnh và niềm tin của nhân dân ta vào thắng lợi cuối cùng.",
    imageUrl: "/images/liberated-zone.jpg",
    order: 5,
    context:
      "Cao trào kháng Nhật cứu nước phát triển mạnh mẽ, vùng giải phóng được mở rộng, cần có một căn cứ địa tập trung, thống nhất để chỉ đạo cách mạng trên cả nước.",
    significant:
      "Khu giải phóng Việt Bắc là một hình thức chính quyền nhân dân sơ khai, thể hiện vai trò lãnh đạo của Đảng và sức mạnh của quần chúng.  Nó là căn cứ địa vững chắc cho Tổng khởi nghĩa Tháng Tám, là nơi tập trung lực lượng và chuẩn bị mọi mặt cho cuộc đấu tranh giành chính quyền."
  },
  {
    id: 12,
    category: "revolution",
    date: "1945-08-13",
    title: "Ủy ban Khởi nghĩa toàn quốc thành lập",
    description:
      "Ngày 13/8/1945, Trung ương Đảng và Tổng bộ Việt Minh quyết định thành lập Ủy ban Khởi nghĩa toàn quốc, do đồng chí Trường Chinh làm Chủ tịch.  Ủy ban Khởi nghĩa toàn quốc được giao trọng trách lãnh đạo, chỉ đạo cuộc Tổng khởi nghĩa giành chính quyền trên phạm vi cả nước.  Cùng ngày, Ủy ban ban bố “Quân lệnh số 1”, chính thức phát động Tổng khởi nghĩa, hiệu triệu toàn dân tộc vùng lên đập tan xiềng xích nô lệ, giành lại độc lập tự do.",
    imageUrl: "/images/uprising-committee.jpg",
    order: 6,
    context:
      "Nhật Bản đầu hàng Đồng minh, thời cơ tổng khởi nghĩa đã chín muồi.  Cần có một cơ quan lãnh đạo cao nhất, thống nhất để chỉ đạo cuộc tổng khởi nghĩa trên cả nước.",
    significant:
      "Ủy ban Khởi nghĩa toàn quốc là cơ quan chỉ đạo cao nhất, có vai trò quyết định trong việc phát động và lãnh đạo Tổng khởi nghĩa Tháng Tám.  “Quân lệnh số 1” là tiếng kèn xung trận, hiệu triệu toàn dân tộc vùng lên giành chính quyền, đánh dấu thời điểm lịch sử của Cách mạng Tháng Tám."
  },
  {
    id: 13,
    category: "revolution",
    date: "1945-08-14/15",
    title: "Hội nghị toàn quốc của Đảng tại Tân Trào",
    description:
      "Ngày 14 và 15/8/1945, Hội nghị toàn quốc của Đảng họp tại Tân Trào, một sự kiện có ý nghĩa lịch sử trọng đại.  Hội nghị đã khẳng định quyết tâm phát động Tổng khởi nghĩa giành chính quyền trước khi quân Đồng minh vào Đông Dương, thông qua nhiều quyết sách quan trọng về đường lối, phương pháp và nguyên tắc chỉ đạo khởi nghĩa.  Hội nghị Tân Trào là đỉnh cao của sự chuẩn bị về chính trị và tư tưởng cho Tổng khởi nghĩa, thể hiện sự lãnh đạo sáng suốt và kiên quyết của Đảng.",
    imageUrl: "/images/tan-trao-conference.jpg",
    order: 7,
    context:
      "Thời cơ tổng khởi nghĩa đã đến, cần có sự thống nhất ý chí và hành động của toàn Đảng để lãnh đạo cuộc đấu tranh quyết định vận mệnh dân tộc.",
    significant:
      "Hội nghị toàn quốc của Đảng tại Tân Trào là hội nghị Diên Hồng của thời đại mới, thể hiện ý chí quyết tâm của toàn Đảng, toàn dân tộc trong việc giành độc lập, tự do.  Các quyết sách của Hội nghị là kim chỉ nam cho hành động, đảm bảo thắng lợi của Tổng khởi nghĩa."
  },
  {
    id: 14,
    category: "revolution",
    date: "1945-08-16",
    title: "Đại hội Quốc dân tại Tân Trào",
    description:
      "Ngày 16/8/1945, Đại hội Quốc dân được triệu tập tại Tân Trào, quy tụ đại biểu ưu tú từ khắp mọi miền Tổ quốc và kiều bào ở nước ngoài.  Đại hội nhất trí thông qua quyết định Tổng khởi nghĩa của Đảng, tán thành 10 chính sách lớn của Việt Minh và bầu ra Ủy ban Giải phóng dân tộc Việt Nam, do Hồ Chí Minh làm Chủ tịch.  Đại hội Quốc dân là biểu tượng của khối đại đoàn kết toàn dân tộc, khẳng định ý chí và sức mạnh của toàn dân trong cuộc đấu tranh giành độc lập.",
    imageUrl: "/images/national-congress.jpg",
    order: 8,
    context:
      "Sau Hội nghị toàn quốc của Đảng, cần có sự ủng hộ và quyết tâm của toàn dân tộc để thực hiện cuộc Tổng khởi nghĩa.  Đại hội Quốc dân thể hiện tính dân chủ và sức mạnh đoàn kết của toàn dân tộc.",
    significant:
      "Đại hội Quốc dân là sự kiện lịch sử trọng đại, khẳng định tính chính danh và sức mạnh của cách mạng Việt Nam.  Sự nhất trí của Đại hội về Tổng khởi nghĩa và 10 chính sách lớn của Việt Minh tạo cơ sở chính trị vững chắc cho chính quyền cách mạng sau này."
  },
  {
    id: 15,
    category: "revolution",
    date: "1945-08-19",
    title: "Khởi nghĩa giành chính quyền ở Hà Nội",
    description:
      "Ngày 19/8/1945, cuộc khởi nghĩa giành chính quyền tại Hà Nội đã diễn ra vô cùng mạnh mẽ và nhanh chóng giành thắng lợi.  Hàng chục vạn quần chúng nhân dân Thủ đô, dưới sự lãnh đạo của Đảng bộ Hà Nội, đã vùng lên như vũ bão, đập tan bộ máy chính quyền địch, làm chủ thành phố.  Thắng lợi của cuộc khởi nghĩa ở Hà Nội có ý nghĩa vô cùng to lớn, là đòn quyết định vào trung tâm đầu não của địch, cổ vũ mạnh mẽ phong trào Tổng khởi nghĩa trên cả nước.",
    imageUrl: "/images/hanoi-uprising.jpg",
    order: 9,
    context:
      "Thực hiện “Quân lệnh số 1” và Nghị quyết Hội nghị toàn quốc của Đảng, Hà Nội là Thủ đô, trung tâm chính trị, văn hóa của cả nước, có vị trí chiến lược quan trọng, cần giành chính quyền ở Hà Nội đầu tiên để tạo hiệu ứng lan tỏa.",
    significant:
      "Thắng lợi của cuộc khởi nghĩa ở Hà Nội có ý nghĩa quyết định đến thắng lợi của Tổng khởi nghĩa.  Nó báo hiệu sự sụp đổ hoàn toàn của chính quyền địch, cổ vũ tinh thần cách mạng của quần chúng trên cả nước, tạo điều kiện thuận lợi cho việc giành chính quyền ở các địa phương khác."
  },
  {
    id: 16,
    category: "revolution",
    date: "1945-08-23",
    title: "Khởi nghĩa giành chính quyền ở Huế",
    description:
      "Ngày 23/8/1945, cuộc khởi nghĩa giành chính quyền ở Huế cũng đã diễn ra thành công rực rỡ.  Quần chúng nhân dân Thừa Thiên Huế, với khí thế cách mạng sục sôi, đã nhất tề nổi dậy, lật đổ chính quyền phong kiến bù nhìn, làm chủ Cố đô.  Ngày 30/8/1945, tại Ngọ Môn, vua Bảo Đại - vị vua cuối cùng của triều Nguyễn - đã chính thức thoái vị, trao nộp ấn kiếm cho đại diện chính quyền cách mạng, đánh dấu sự cáo chung của chế độ phong kiến hàng ngàn năm ở Việt Nam.",
    imageUrl: "/images/hue-uprising.jpg",
    order: 10,
    context:
      "Tiếp sau thắng lợi ở Hà Nội, Huế là Cố đô, trung tâm văn hóa, chính trị của miền Trung, nơi đặt kinh đô của chế độ phong kiến, việc giành chính quyền ở Huế có ý nghĩa biểu tượng và chính trị to lớn.",
    significant:
      "Thắng lợi của cuộc khởi nghĩa ở Huế đánh dấu sự sụp đổ hoàn toàn của chế độ phong kiến Việt Nam, chấm dứt hàng ngàn năm lịch sử quân chủ.  Nó củng cố thêm thắng lợi của Tổng khởi nghĩa, thể hiện sự thay đổi triệt để về chế độ chính trị ở Việt Nam."
  },
  {
    id: 17,
    category: "revolution",
    date: "1945-08-25",
    title: "Khởi nghĩa giành chính quyền ở Sài Gòn",
    description:
      "Ngày 25/8/1945, Sài Gòn - trung tâm kinh tế, chính trị của Nam Bộ - cũng rực lửa khởi nghĩa.  Hàng triệu người dân Sài Gòn và các tỉnh lân cận đã xuống đường biểu tình, tuần hành thị uy, phối hợp với lực lượng vũ trang cách mạng, đánh chiếm các cơ quan đầu não của địch.  Cuộc khởi nghĩa ở Sài Gòn thắng lợi nhanh chóng, đánh dấu Tổng khởi nghĩa Tháng Tám đã thành công trên phạm vi cả nước, khẳng định sức mạnh vĩ đại của toàn dân tộc Việt Nam.",
    imageUrl: "/images/saigon-uprising.jpg",
    order: 11,
    context:
      "Tiếp sau thắng lợi ở Hà Nội và Huế, Sài Gòn là trung tâm kinh tế, chính trị của miền Nam, có vị trí quan trọng trong cả nước, việc giành chính quyền ở Sài Gòn hoàn tất quá trình Tổng khởi nghĩa.",
    significant:
      "Thắng lợi của cuộc khởi nghĩa ở Sài Gòn đánh dấu sự thành công trọn vẹn của Tổng khởi nghĩa Tháng Tám trên cả nước.  Chính quyền về tay nhân dân, nước Việt Nam Dân chủ Cộng hòa ra đời, mở ra kỷ nguyên mới độc lập, tự do cho dân tộc Việt Nam."
  },
  {
    id: 18,
    category: "post-revolution",
    date: "1945-09-02",
    title: "Tuyên ngôn Độc lập và thành lập nước Việt Nam Dân chủ Cộng hòa",
    description:
      "Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời trịnh trọng đọc bản Tuyên ngôn Độc lập, tuyên bố với toàn thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.  Bản Tuyên ngôn Độc lập là một văn kiện lịch sử vô giá, khẳng định quyền độc lập, tự do của dân tộc Việt Nam, đồng thời tuyên bố xóa bỏ chế độ thực dân phong kiến, mở ra một kỷ nguyên mới - kỷ nguyên độc lập, tự do và tiến lên chủ nghĩa xã hội.",
    imageUrl: "/images/independence-declaration.jpg",
    order: 1,
    context:
      "Tổng khởi nghĩa Tháng Tám thắng lợi, chính quyền cách mạng được thành lập, cần tuyên bố với quốc dân và thế giới về sự ra đời của một nước Việt Nam độc lập, tự do, khẳng định chủ quyền quốc gia.",
    significant:
      "Tuyên ngôn Độc lập là sự kiện lịch sử vĩ đại, khai sinh nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.  Nó chấm dứt chế độ thuộc địa kéo dài gần một thế kỷ và chế độ phong kiến hàng ngàn năm, mở ra kỷ nguyên mới độc lập, tự do cho dân tộc Việt Nam, có ý nghĩa lịch sử và thời đại sâu sắc."
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
    useState<string>("pre-revolution");
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

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-[#0a0e17]" : "bg-[#f5f8ff]"
      }`}
      ref={containerRef}
    >
      {/* -------------------- Progress Bar -------------------- */}
      <motion.div
        className={`fixed top-0 left-0 w-1 h-full ${
          theme === "dark" ? "bg-primary/20" : "bg-primary/10"
        } z-50`}
        style={{ opacity: progressOpacity }}
      >
        <motion.div
          className="w-full bg-primary"
          style={{ height: progressHeight }}
        />
      </motion.div>

      {/* -------------------- Scroll to Top Button -------------------- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 p-3 rounded-full ${
              theme === "dark"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-primary/80 text-white shadow-lg"
            } z-50`}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* -------------------- Hero Section -------------------- */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bg_img})` }}
        />

        {/* Decorative Overlay */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-b from-black/80 via-black/70 to-background"
              : "bg-gradient-to-b from-black/40 via-black/30 to-white"
          }`}
        />

        {/* SVG Pattern Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            opacity: theme === "dark" ? 0.1 : 0.05
          }}
        />

        {/* Star Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-white" : "bg-primary"
              }`}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.2
              }}
              animate={{
                opacity: [
                  Math.random() * 0.3 + 0.2,
                  Math.random() * 0.6 + 0.4,
                  Math.random() * 0.3 + 0.2
                ],
                scale: [1, Math.random() * 0.3 + 1.2, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 3 + 2
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative container mx-auto px-4 text-center"
          style={
            isParallaxEnabled ? { y: heroTextY, opacity: heroOpacity } : {}
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={controls}
            className="space-y-6"
          >
            <Badge className="text-md px-4 py-1 mb-4 bg-primary/20 text-primary-foreground border border-primary/30">
              <CalendarDays className="w-4 h-4 mr-2" /> 1945
            </Badge>

            <h1
              className={`text-4xl md:text-7xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } mb-4 font-serif`}
            >
              Dòng thời gian
              <motion.span
                className="block text-primary mt-4"
                style={{ textShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Cách mạng Tháng Tám
              </motion.span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-24 h-1 bg-primary mx-auto"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, staggerChildren: 0.1 }}
              className={`text-lg md:text-xl ${
                theme === "dark" ? "text-white/90" : "text-gray-700"
              } max-w-2xl mx-auto`}
            >
              <p className="leading-relaxed">
                Khám phá các sự kiện quan trọng trong tiến trình Cách mạng Tháng
                Tám năm 1945 - bước ngoặt lịch sử quan trọng trên con đường đấu
                tranh giành độc lập dân tộc.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
            theme === "dark" ? "text-white/60" : "text-gray-600"
          }`}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* -------------------- Category Navigation -------------------- */}
      <div className="container mx-auto px-4 -mt-8">
        <Card
          className={`border-2 ${
            theme === "dark"
              ? "border-primary/20 bg-black/40 backdrop-blur-md shadow-lg shadow-primary/5"
              : "border-primary/10 bg-white/80 backdrop-blur-md shadow-lg"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <ScrollArea className="w-full md:w-auto">
                <nav className="flex flex-nowrap md:flex-wrap gap-2 md:gap-4 p-1">
                  <CategoryButton
                    active={selectedCategory === "pre-revolution"}
                    onClick={() => setSelectedCategory("pre-revolution")}
                    theme={theme}
                    count={categoryCounts["pre-revolution"]}
                  >
                    Bối cảnh trước Cách mạng
                  </CategoryButton>
                  <CategoryButton
                    active={selectedCategory === "revolution"}
                    onClick={() => setSelectedCategory("revolution")}
                    theme={theme}
                    count={categoryCounts["revolution"]}
                  >
                    Diễn biến Cách mạng
                  </CategoryButton>
                  <CategoryButton
                    active={selectedCategory === "post-revolution"}
                    onClick={() => setSelectedCategory("post-revolution")}
                    theme={theme}
                    count={categoryCounts["post-revolution"]}
                  >
                    Sau Cách mạng
                  </CategoryButton>
                </nav>
              </ScrollArea>

              {!isMobile && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                    disabled={zoom <= 0.5}
                    className={
                      theme === "dark" ? "border-white/10" : "border-black/10"
                    }
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div
                    className={`w-20 text-center text-sm ${
                      theme === "dark" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    {Math.round(zoom * 100)}%
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
                    disabled={zoom >= 1.5}
                    className={
                      theme === "dark" ? "border-white/10" : "border-black/10"
                    }
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* -------------------- Timeline Section -------------------- */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="relative"
          style={{
            scale: isMobile ? 1 : zoom,
            transformOrigin: "center top"
          }}
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1 }}
              className={`h-full ${
                theme === "dark"
                  ? "bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
                  : "bg-gradient-to-b from-primary/80 via-primary/40 to-transparent"
              }`}
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
                show: { opacity: 1, transition: { staggerChildren: 0.2 } }
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
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Date Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className={`absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                      theme === "dark"
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : "bg-primary shadow-lg shadow-primary/30"
                    }`}
                  >
                    {/* <span className="text-xs font-bold text-white">
                      {event.date ? new Date(event.date).getDate() : event.order? event.order : index + 1}
                    </span> */}
                  </motion.div>

                  {/* Date Indicator Line */}
                  <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 h-0.5 ${
                      !isMobile && index % 2 === 0
                        ? "w-[calc(50%-2rem)]"
                        : "w-[calc(50%-2rem)] translate-x-[calc(-100%+2rem)]"
                    } ${theme === "dark" ? "bg-primary/20" : "bg-primary/40"}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ top: "1rem" }}
                  />

                  {/* Timeline Event Card */}
                  <div
                    className={`w-full ${isMobile ? "pl-8" : "md:w-1/2"} ${
                      !isMobile && index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
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
