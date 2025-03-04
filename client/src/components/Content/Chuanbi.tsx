import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Flag, Archive, CalendarClock, MessageSquare, Users, Shield, ShieldAlert } from "lucide-react";

const ChuanbiBlog: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Preparation Theme */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQK8RtUhKxjIfzPgoSp3H_LUGOJTeWpbKVA&s" // Replace with your hero image URL (e.g., Viet Minh preparing)
          alt="Chuẩn Bị Lực Lượng"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Giai Đoạn Chuẩn Bị:  Thế và Lực Cho Tổng Khởi Nghĩa
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Từ bối cảnh ngặt nghèo đến sự trỗi dậy mạnh mẽ của phong trào giải phóng dân tộc.
            </p>
          </div>
        </div>
      </motion.div>

      <section className="mb-20">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center mb-6">
            <BookOpen className="mr-3 text-primary" size={40} />
            <h2 className="text-4xl font-semibold text-primary tracking-tight">Bối Cảnh Dẫn Đến Chuẩn Bị</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chiến tranh thế giới thứ hai bùng nổ đã đẩy Đông Dương vào một tình thế vô cùng phức tạp. Thực dân Pháp, dù suy yếu nhưng vẫn cố gắng duy trì ách thống trị, thẳng tay đàn áp phong trào cách mạng. Cùng lúc đó, sự hiện diện của quân phiệt Nhật Bản tạo thêm gánh nặng “một cổ hai tròng” lên vai nhân dân ta. Trong bối cảnh ngặt nghèo đó, Đảng Cộng sản Đông Dương đã nhận thức sâu sắc thời cơ và thách thức, chủ động chuyển hướng chiến lược, tích cực chuẩn bị lực lượng mọi mặt để tiến tới cuộc khởi nghĩa giành chính quyền. Giai đoạn chuẩn bị này là quá trình Đảng ta từng bước xây dựng, củng cố thế và lực, tạo tiền đề vững chắc cho thắng lợi của Cách mạng Tháng Tám.
          </p>
        </motion.div>

        {/* Timeline Section - Preparation Phase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <CalendarClock className="mr-3 text-primary" size={36} />
            Quá Trình Chuẩn Bị: Từ Chiến Lược Đến Hành Động
          </h3>

          <div className="space-y-16">
            {[
              {
                date: "09/1939",
                title: "Đảng Chuyển Vào Bí Mật, Xác Định Nhiệm Vụ Dân Tộc",
                icon: <Flag className="text-destructive" size={32} />,
                details: [
                  "Ngay khi Chiến tranh thế giới thứ hai bùng nổ, Đảng Cộng sản Đông Dương kịp thời rút vào hoạt động bí mật để bảo toàn lực lượng.",
                  "Trọng tâm công tác được chuyển về nông thôn, nơi có cơ sở quần chúng vững chắc, đồng thời vẫn duy trì hoạt động ở các đô thị.",
                  "Ngày 29/9/1939, Trung ương Đảng ra thông báo quan trọng, chỉ rõ: “Hoàn cảnh Đông Dương sẽ tiến bước đến vấn đề dân tộc giải phóng”, định hướng chiến lược cho giai đoạn mới."
                ],
                context: "Trong bối cảnh bị đàn áp gắt gao, việc chuyển vào hoạt động bí mật là một quyết định sáng suốt, giúp Đảng bảo toàn lực lượng và tiếp tục lãnh đạo phong trào cách mạng. Việc xác định nhiệm vụ giải phóng dân tộc là trung tâm thể hiện sự nhạy bén chính trị và tầm nhìn chiến lược của Đảng."
              },
              {
                date: "11/1939",
                title: "Hội nghị Trung ương Bà Điểm:  Chiến Lược Giải Phóng Dân Tộc",
                icon: <Users className="text-primary" size={32} />,
                details: [
                  "Hội nghị Ban Chấp hành Trung ương Đảng (11/1939) họp tại Bà Điểm, Hóc Môn, Gia Định, phân tích sâu sắc tình hình mới.",
                  "Hội nghị khẳng định: “Bước đường sinh tồn của các dân tộc Đông Dương không còn có con đường nào khác hơn là con đường đánh đổ đế quốc Pháp… để giành lấy giải phóng độc lập”.",
                  "Chủ trương thành lập Mặt trận dân tộc thống nhất phản đế Đông Dương, đoàn kết mọi lực lượng dân tộc để đánh đổ đế quốc Pháp và tay sai.",
                  "Tạm gác khẩu hiệu “cách mạng ruộng đất”, thay bằng khẩu hiệu chống địa tô cao, lãi nặng… phục vụ mục tiêu giải phóng dân tộc."
                ],
                context: "Hội nghị Trung ương Bà Điểm có ý nghĩa bước ngoặt, đánh dấu sự chuyển hướng chiến lược quan trọng của Đảng. Việc đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, thành lập mặt trận dân tộc thống nhất là những quyết sách đúng đắn, đáp ứng yêu cầu khách quan của lịch sử và nguyện vọng của nhân dân."
              },
              {
                date: "1940-1941",
                title: "Những Tiếng Súng Đầu Tiên: Khởi Nghĩa Bắc Sơn, Nam Kỳ, Binh Biến Đô Lương",
                icon: <Shield className="text-purple-500" size={32} />,
                details: [
                  "Khởi nghĩa Bắc Sơn (27/9/1940) do đảng bộ địa phương lãnh đạo, thành lập Đội du kích Bắc Sơn.",
                  "Khởi nghĩa Nam Kỳ (23/11/1940) nổ ra mạnh mẽ, chính quyền cách mạng được thành lập ở một số địa phương.",
                  "Binh biến Đô Lương (13/1/1941) do Đội Cung chỉ huy.",
                  "Dù thất bại, các cuộc khởi nghĩa và binh biến này là “những tiếng súng báo hiệu cho cuộc khởi nghĩa toàn quốc, là bước đầu đấu tranh bằng vũ lực”."
                ],
                context: "Các cuộc khởi nghĩa Bắc Sơn, Nam Kỳ và binh biến Đô Lương tuy thất bại nhưng có ý nghĩa lịch sử to lớn. Chúng khẳng định con đường đấu tranh vũ trang giành độc lập, cổ vũ tinh thần yêu nước và ý chí cách mạng của quần chúng, đồng thời để lại những bài học kinh nghiệm quý báu cho Đảng."
              },
              {
                date: "01/1941",
                title: "Lãnh Tụ Nguyễn Ái Quốc Về Nước, Soi Đường Cách Mạng",
                icon: <MessageSquare className="text-blue-500" size={32} />,
                details: [
                  "Ngày 28/1/1941, lãnh tụ Nguyễn Ái Quốc trở về Tổ quốc sau 30 năm hoạt động ở nước ngoài, trực tiếp lãnh đạo cách mạng Việt Nam.",
                  "Người chọn Cao Bằng làm điểm dừng chân, xây dựng căn cứ địa cách mạng.",
                  "Sự trở về của lãnh tụ Nguyễn Ái Quốc là nguồn cổ vũ to lớn cho toàn Đảng, toàn dân, đánh dấu bước ngoặt quan trọng trong tiến trình cách mạng."
                ],
                context: "Sự trở về của lãnh tụ Nguyễn Ái Quốc là một sự kiện lịch sử trọng đại. Người không chỉ mang đến đường lối cách mạng đúng đắn mà còn thổi bùng ngọn lửa yêu nước, ý chí độc lập, tự cường trong toàn dân tộc, tạo nên sức mạnh to lớn để vượt qua mọi khó khăn, thử thách."
              },
              {
                date: "05/1941",
                title: "Hội nghị Trung ương VIII: Hoàn Chỉnh Đường Lối Giải Phóng Dân Tộc",
                icon: <Users className="text-green-500" size={32} />,
                details: [
                  "Tháng 5/1941, Hội nghị lần thứ tám Ban Chấp hành Trung ương Đảng do Nguyễn Ái Quốc chủ trì, diễn ra tại Pác Bó, Cao Bằng.",
                  "Hội nghị xác định nhiệm vụ trước mắt của cách mạng Việt Nam là giải phóng dân tộc, thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh).",
                  "Chủ trương “Đoàn kết toàn dân, chống Nhật, chống Pháp, tranh lại độc lập”, tạm gác khẩu hiệu “cách mạng ruộng đất”.",
                  "Bầu đồng chí Trường Chinh làm Tổng Bí thư, kiện toàn bộ máy lãnh đạo.",
                  "Quyết định thành lập ở mỗi nước Đông Dương một mặt trận riêng, thực hiện đoàn kết từng dân tộc, đồng thời đoàn kết ba dân tộc chống kẻ thù chung."
                ],
                context: "Hội nghị Trung ương VIII có ý nghĩa quyết định đối với thắng lợi của Cách mạng Tháng Tám. Hội nghị đã hoàn chỉnh đường lối chiến lược, sách lược cách mạng giải phóng dân tộc, khắc phục những hạn chế của các giai đoạn trước, mở đường cho toàn dân tộc tiến lên giành độc lập, tự do. Nghị quyết của Hội nghị trở thành ngọn cờ dẫn dắt toàn Đảng, toàn dân vượt qua mọi khó khăn, thử thách, đi đến thắng lợi cuối cùng."
              },
              {
                date: "1941-1944",
                title: "Xây Dựng Lực Lượng, Phát Triển Phong Trào Việt Minh",
                icon: <Archive className="text-orange-500" size={32} />,
                details: [
                  "Đảng tích cực xây dựng và phát triển lực lượng chính trị quần chúng thông qua Mặt trận Việt Minh.",
                  "Tuyên ngôn Việt Minh (25/10/1941) được công bố, kêu gọi đồng bào đoàn kết cứu quốc.",
                  "Các tổ chức quần chúng mang tên “cứu quốc” được thành lập và phát triển rộng khắp.",
                  "Đảng chú trọng xây dựng lực lượng vũ trang, phát triển Cứu quốc quân, thành lập Việt Nam Tuyên truyền Giải phóng quân (22/12/1944).",
                  "Mở rộng và củng cố căn cứ địa cách mạng Cao Bằng - Bắc Sơn - Võ Nhai."
                ],
                context: "Giai đoạn 1941-1944 là quá trình Đảng ta kiên trì, bền bỉ xây dựng lực lượng cách mạng, cả về chính trị và vũ trang. Sự phát triển mạnh mẽ của Mặt trận Việt Minh, sự ra đời và lớn mạnh của các lực lượng vũ trang cách mạng đã tạo nên sức mạnh to lớn, chuẩn bị đầy đủ các điều kiện cho cuộc tổng khởi nghĩa."
              },
              {
                date: "1945",
                title: "Cao Trào Kháng Nhật Cứu Nước: Tiền Đề Tổng Khởi Nghĩa",
                icon: <ShieldAlert className="text-teal-500" size={32} />,
                details: [
                  "Ngày 9/3/1945, Nhật đảo chính Pháp, tạo ra thời cơ mới cho cách mạng.",
                  "Trung ương Đảng ra chỉ thị “Nhật - Pháp bắn nhau và hành động của chúng ta” (12/3/1945), phát động cao trào kháng Nhật cứu nước.",
                  "Cao trào kháng Nhật cứu nước diễn ra sôi nổi, mạnh mẽ trên cả nước, với nhiều hình thức đấu tranh phong phú.",
                  "Khu giải phóng Việt Bắc được thành lập (4/6/1945), trở thành căn cứ địa vững chắc của cách mạng.",
                  "Cao trào kháng Nhật cứu nước là cuộc tổng diễn tập, tạo đà cho Tổng khởi nghĩa Tháng Tám."
                ],
                context: "Cao trào kháng Nhật cứu nước năm 1945 có ý nghĩa quyết định, là bước nhảy vọt trong quá trình chuẩn bị cho tổng khởi nghĩa. Cao trào này không chỉ làm suy yếu kẻ thù, tạo thêm thời cơ cách mạng mà còn là cuộc diễn tập quy mô lớn, giúp Đảng và nhân dân ta tích lũy kinh nghiệm, rèn luyện bản lĩnh, sẵn sàng cho trận quyết chiến chiến lược cuối cùng."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-semibold text-primary mb-3 flex items-center tracking-tight">
                  <span className="mr-3">{item.icon}</span> {item.date} – {item.title}
                </h4>
                <ul className="list-disc ml-6 text-muted-foreground leading-relaxed mb-3">
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="mb-2">{detail}</li>
                  ))}
                </ul>
                {item.context && (
                  <blockquote className="mt-4 border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                    <p>{item.context}</p>
                  </blockquote>
                )}
                {/* Image insertion point after each timeline item - Optional */}
                {index === 3 && <img src="https://tayninh.dcs.vn/uploads/news/2024_07/105_2024-12031720487807_tranh-bac-ho-ve-nuoc.jpg" alt="Bác Hồ về nước" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                {index === 4 && <img src="https://thegioidisan.vn/assets/media/2016/Thang%204/1142016/dai-hoi1.jpg" alt="Hội nghị Trung ương 8" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}

              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.footer
        className="text-center mt-24 text-muted-foreground border-t pt-6 border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <p className="mb-4 italic text-xml">"Mỗi một người dân phải hiểu: Có tự lập mới độc lập, có tự cường mới tự do." - Hồ Chí Minh</p>
      </motion.footer>
    </article>
  );
};

export default ChuanbiBlog;