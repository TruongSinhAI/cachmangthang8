import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Globe, Flag, Clock, Archive, ShieldAlert, CalendarClock } from "lucide-react";

const BoicanhBlogEnhanced: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Visually Striking */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]" // Adjusted aspect ratio for wider hero
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://tinhuybinhphuoc.vn/uploads/hdnd/2024_08/image-20240825081516-2.jpeg" // Replace with your hero image URL (e.g., historical photo montage)
          alt="Bối Cảnh Lịch Sử 1939-1945"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Thời Đại Bão Táp: Bối Cảnh Lịch Sử 1939-1945
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Những biến động toàn cầu và Đông Dương trước thềm Cách mạng Tháng Tám.
            </p>
          </div>
        </div>
      </motion.div>

      <section className="mb-20"> {/* Increased section margin for better separation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center mb-6">
            <BookOpen className="mr-3 text-primary" size={40} /> {/* Slightly larger icon */}
            <h2 className="text-4xl font-semibold text-primary tracking-tight">Bối cảnh - Tình hình thế giới</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Từ những năm cuối thập niên 30 của thế kỷ XX, thế giới đã đứng trước bờ vực của một cuộc chiến tranh tàn khốc. Mâu thuẫn giữa các cường quốc đế quốc ngày càng sâu sắc, chủ nghĩa phát xít trỗi dậy mạnh mẽ, và hệ thống hòa bình mong manh sau Chiến tranh Thế giới thứ nhất dần sụp đổ. Bối cảnh quốc tế đầy căng thẳng này đã tạo nên những làn sóng địa chính trị mạnh mẽ, tác động trực tiếp đến vận mệnh của các dân tộc thuộc địa, trong đó có Việt Nam. Giai đoạn 1939-1945 không chỉ là thời kỳ Chiến tranh Thế giới thứ hai bùng nổ và lan rộng, mà còn là giai đoạn then chốt định hình nên cục diện Đông Dương, tạo tiền đề cho cuộc đấu tranh giải phóng dân tộc Việt Nam bước sang một trang mới.
          </p>
        </motion.div>

        {/* Timeline Section - Blog Style with Richer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <Clock className="mr-3 text-primary" size={36} /> {/* Icon for timeline heading */}
            Dòng Chảy Lịch Sử: Các Mốc Sự Kiện Chính
          </h3>

          <div className="space-y-16"> {/* Increased spacing between timeline items */}
            {[
              {
                date: "Tháng 9/1939",
                title: "Thế Chiến II Khai Màn: Biến Động Toàn Cầu",
                icon: <Flag className="text-destructive" size={32} />,
                details: [
                  "Ngày 1 tháng 9 năm 1939, Đức Quốc xã tấn công Ba Lan, chính thức khơi mào Chiến tranh Thế giới thứ hai.",
                  "Chính phủ Đalađiê tại Pháp lập tức thi hành các biện pháp đàn áp lực lượng dân chủ trong nước và phong trào cách mạng ở các thuộc địa.",
                  "Tại Đông Dương, Toàn quyền ra nghị định cấm tuyên truyền cộng sản (28/9/1939), đặt Đảng Cộng sản Đông Dương ra ngoài vòng pháp luật, mở đầu giai đoạn đàn áp khốc liệt."
                ],
                context: "Sự kiện này không chỉ đánh dấu sự khởi đầu của cuộc chiến tranh tàn khốc nhất lịch sử nhân loại mà còn tạo ra một bước ngoặt chính trị quan trọng. Các cường quốc đế quốc, trong đó có Pháp, bắt đầu suy yếu và phải tập trung nguồn lực cho chiến tranh, tạo ra những lỗ hổng quyền lực tại các thuộc địa."
              },
              {
                date: "Tháng 6/1940",
                title: "Pháp Thất Thủ: Ảnh Hưởng Đến Đông Dương",
                icon: <Globe className="text-primary" size={32} />,
                details: [
                  "Tháng 6 năm 1940, Đức tấn công và nhanh chóng đánh bại Pháp. Chính phủ Pêtanh đầu hàng, ký hiệp định đình chiến với Đức.",
                  "Chính phủ Pháp suy yếu nghiêm trọng, mất uy tín và khả năng kiểm soát thuộc địa.",
                  "Tại Đông Dương, bộ máy cai trị của Pháp trở nên lúng túng, hoang mang, tạo điều kiện cho các thế lực khác nhòm ngó."
                ],
                context: "Việc Pháp đầu hàng Đức có ý nghĩa vô cùng lớn đối với Đông Dương. Nó cho thấy sự bất lực của chính quyền thực dân, làm lung lay niềm tin của người dân vào sự bảo hộ của Pháp và mở đường cho sự can thiệp của Nhật Bản."
              },
              {
                date: "Tháng 9/1940",
                title: "Nhật Bản Xâm Lược Đông Dương: 'Một Cổ Hai Tròng'",
                icon: <Archive className="text-purple-500" size={32} />,
                details: [
                  "Tháng 9 năm 1940, lợi dụng tình thế Pháp suy yếu, quân phiệt Nhật Bản tiến hành xâm lược Đông Dương.",
                  "Thực dân Pháp nhanh chóng đầu hàng và cấu kết với Nhật để cùng nhau cai trị và bóc lột nhân dân Đông Dương.",
                  "Nhân dân Việt Nam và Đông Dương phải chịu cảnh 'một cổ hai tròng' áp bức, dưới ách thống trị của cả Pháp và Nhật, đẩy mâu thuẫn dân tộc lên cao trào."
                ],
                context: "Sự xuất hiện của Nhật Bản tại Đông Dương đã làm thay đổi hoàn toàn cục diện. Nhân dân Việt Nam không chỉ phải đối mặt với ách áp bức của thực dân Pháp mà còn phải gánh chịu thêm ách thống trị của phát xít Nhật. Tình cảnh 'một cổ hai tròng' này đã làm gia tăng lòng căm phẫn và ý chí đấu tranh giải phóng dân tộc."
              },
              {
                date: "Giữa Năm 1941",
                title: "Biến Chuyển Thế Giới: Chiến Tranh Thái Bình Dương Bùng Nổ",
                icon: <CalendarClock className="text-blue-500" size={32} />,
                details: [
                  "Từ giữa năm 1941, tình hình thế giới tiếp tục có những biến chuyển lớn.",
                  "Tháng 12 năm 1941, Chiến tranh Thái Bình Dương bùng nổ khi Nhật Bản tấn công Trân Châu Cảng, kéo Hoa Kỳ vào vòng chiến.",
                  "Chiến tranh lan rộng ra khắp châu Á - Thái Bình Dương, làm thay đổi cán cân lực lượng và tạo thêm nhiều cơ hội cho các phong trào giải phóng dân tộc."
                ],
                context: "Chiến tranh Thái Bình Dương đánh dấu sự mở rộng quy mô của Chiến tranh Thế giới thứ hai, tạo ra một mặt trận mới ở châu Á và làm suy yếu thêm các cường quốc đế quốc. Điều này mang đến những cơ hội khách quan cho các dân tộc thuộc địa, trong đó có Việt Nam, để đẩy mạnh cuộc đấu tranh giành độc lập."
              },
              {
                date: "Đầu Năm 1945",
                title: "Giai Đoạn Cuối Thế Chiến: Phe Đồng Minh Phản Công",
                icon: <ShieldAlert className="text-green-500" size={32} />,
                details: [
                  "Đầu năm 1945, Chiến tranh Thế giới thứ hai bước vào giai đoạn cuối. Phe Đồng Minh, với sự lớn mạnh của Liên Xô, Anh, Mỹ, bắt đầu phản công mạnh mẽ trên các mặt trận.",
                  "Hồng quân Liên Xô truy kích phát xít Đức ở châu Âu, giải phóng hàng loạt quốc gia.",
                  "Ở Tây Âu, quân Anh - Mỹ mở mặt trận thứ hai, tiến công vào lãnh thổ Đức.",
                  "Nước Pháp được giải phóng, chính phủ Đờ Gôn trở về Paris, nhưng vị thế và sức mạnh đã suy giảm đáng kể."
                ],
                context: "Thắng lợi của phe Đồng Minh và sự suy yếu của phe Phát xít đã tạo ra một bối cảnh quốc tế vô cùng thuận lợi cho các phong trào giải phóng dân tộc. Nhật Bản, một trong hai kẻ thù chính của nhân dân Việt Nam, cũng bắt đầu bộc lộ dấu hiệu thất bại."
              },
              {
                date: "Ngày 9/3/1945",
                title: "Nhật Đảo Chính Pháp: Thời Cơ Cách Mạng",
                icon: <ShieldAlert className="text-orange-500" size={32} />,
                details: [
                  "Ngày 9 tháng 3 năm 1945, Nhật Bản bất ngờ đảo chính Pháp, lật đổ hoàn toàn chính quyền thực dân.",
                  "Pháp chống cự yếu ớt rồi nhanh chóng đầu hàng, Nhật Bản độc chiếm Đông Dương.",
                  "Chính phủ bù nhìn Bảo Đại - Trần Trọng Kim được Nhật dựng lên, nhưng không có thực quyền.",
                  "Sự kiện này tạo ra một khoảng trống quyền lực lớn, chính quyền thực dân Pháp hoàn toàn sụp đổ, mở ra thời cơ trực tiếp cho cuộc tổng khởi nghĩa."
                ],
                context: "Cuộc đảo chính ngày 9/3/1945 là một bước ngoặt quyết định. Nó loại bỏ hoàn toàn sự thống trị của Pháp, làm tan rã bộ máy cai trị cũ và tạo ra một tình thế chưa từng có. Kẻ thù trực tiếp của nhân dân Việt Nam lúc này chỉ còn lại phát xít Nhật, và thời cơ cách mạng đã đến rất gần."
              },
              {
                date: "Giữa Tháng 8/1945",
                title: "Thế Chiến II Kết Thúc: Thời Cơ 'Ngàn Năm Có Một'",
                icon: <Flag className="text-teal-500" size={32} />,
                details: [
                  "Giữa tháng 8 năm 1945, Chiến tranh Thế giới thứ hai chính thức kết thúc. Phát xít Đức đã đầu hàng từ tháng 5, và đến ngày 15 tháng 8, Nhật Bản cũng tuyên bố đầu hàng Đồng Minh vô điều kiện sau khi bị Liên Xô tấn công và hứng chịu hai quả bom nguyên tử.",
                  "Quân Nhật tại Đông Dương mất hết tinh thần chiến đấu, chính quyền bù nhìn hoang mang cực độ.",
                  "Thời cơ 'ngàn năm có một' để nhân dân Việt Nam vùng lên giành chính quyền đã chín muồi."
                ],
                context: "Sự kiện Nhật Bản đầu hàng Đồng Minh đã tạo ra một thời cơ cách mạng vô cùng thuận lợi. Kẻ thù chính đã gục ngã, bộ máy cai trị của chúng hoàn toàn tê liệt. Đây chính là thời điểm quyết định để Đảng Cộng sản Đông Dương lãnh đạo nhân dân ta tiến hành tổng khởi nghĩa, giành độc lập tự do cho dân tộc."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="mb-12 last:mb-0" // Reduced bottom margin for last item
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-semibold text-primary mb-3 flex items-center tracking-tight">
                  <span className="mr-3">{item.icon}</span> {item.date} – {item.title}
                </h4>
                <ul className="list-disc ml-6 text-muted-foreground leading-relaxed mb-3"> {/* Added bottom margin to bullet list */}
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="mb-2">{detail}</li> 
                  ))}
                </ul>
                {item.context && (
                  <blockquote className="mt-4 border-l-4 border-primary pl-6 italic text-lg text-muted-foreground"> {/* Adjusted blockquote styling */}
                    <p>{item.context}</p>
                  </blockquote>
                )}
                 {/* Image insertion point after each timeline item - Optional */}
                 {index === 0 && <img src="https://vietales.vn/wp-content/uploads/2024/10/nhatquanhtac-sao-chep-scaled.webp" alt="Bản đồ Thế Chiến II" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 5 && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/French_retreat_to_China.jpg/1280px-French_retreat_to_China.jpg" alt="Nhật đảo chính Pháp" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 6 && <img src="https://hoc365.edu.vn/wp-content/uploads/2023/02/viec-nhat-ban-dau-hang-khong-dieu-kien-co-y-nghia-nhu-the-nao-01.jpg" alt="Nhật đầu hàng Đồng Minh" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
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
        <p className="mb-4 italic">"Trong giờ phút lịch sử trọng đại này, toàn thể dân tộc Việt Nam hãy đoàn kết một lòng, đem hết sức mình để giành lấy nền độc lập hoàn toàn cho Tổ quốc."</p>
      </motion.footer>
    </article>
  );
};

export default BoicanhBlogEnhanced;