import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Globe, Lightbulb, Sparkles, Flag } from "lucide-react";

const YnghiaBlog: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Ynghia Theme */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://tinhuybinhphuoc.vn/uploads/hdnd/2024_08/image-20240825081516-2.jpeg"// Replace with your hero image URL (e.g., image representing global impact, Vietnamese flag raising)
          alt="Ý Nghĩa Cách Mạng Tháng Tám"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Ý Nghĩa Lịch Sử To Lớn Của Cách Mạng Tháng Tám:  Vang Vọng Muôn Đời
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Khẳng định tầm vóc vĩ đại và giá trị trường tồn của Cách mạng Tháng Tám đối với dân tộc và thế giới.
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
            <h2 className="text-4xl font-semibold text-primary tracking-tight">Tầm Vóc Vĩ Đại Của Cách Mạng Tháng Tám</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cách mạng Tháng Tám năm 1945 là một sự kiện trọng đại, có ý nghĩa lịch sử to lớn không chỉ đối với dân tộc Việt Nam mà còn đối với phong trào giải phóng dân tộc trên toàn thế giới. Thắng lợi của Cách mạng Tháng Tám đã mở ra một kỷ nguyên mới cho dân tộc Việt Nam, đồng thời góp phần vào sự nghiệp đấu tranh chung của nhân loại tiến bộ vì hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội. Ý nghĩa lịch sử của Cách mạng Tháng Tám vô cùng sâu sắc và toàn diện, cần được nhìn nhận và đánh giá một cách khách quan, khoa học để hiểu rõ hơn giá trị trường tồn của nó.
          </p>
        </motion.div>

        {/* Significance Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <Sparkles className="mr-3 text-primary" size={36} />
            Ý Nghĩa Lịch Sử To Lớn Của Cách Mạng Tháng Tám
          </h3>

          <div className="space-y-16">
            {[
              {
                title: "Đối Với Dân Tộc Việt Nam:  Bước Ngoặt Lịch Sử Vĩ Đại",
                icon: <Flag className="text-destructive" size={32} />,
                details: [
                  "Đập tan xiềng xích nô lệ của chủ nghĩa đế quốc gần một thế kỷ, chấm dứt chế độ quân chủ chuyên chế hàng nghìn năm.",
                  "Lập nên nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.",
                  "Giải quyết thành công vấn đề cơ bản của mọi cuộc cách mạng xã hội: vấn đề chính quyền.",
                  "Nhân dân Việt Nam từ thân phận nô lệ trở thành người chủ đất nước, có quyền quyết định vận mệnh của mình.",
                  "Mở ra kỷ nguyên mới trong lịch sử dân tộc, kỷ nguyên độc lập, tự do và tiến lên chủ nghĩa xã hội."
                ],
                context: "Đối với dân tộc Việt Nam, Cách mạng Tháng Tám là một bước ngoặt lịch sử vĩ đại, có ý nghĩa quyết định vận mệnh đất nước. Thắng lợi của Cách mạng Tháng Tám đã xóa bỏ hoàn toàn chế độ thực dân phong kiến, mở ra một kỷ nguyên mới, kỷ nguyên của độc lập, tự do và tiến bộ xã hội, đưa dân tộc Việt Nam bước vào hàng ngũ các quốc gia độc lập trên thế giới."
              },
              {
                title: "Đối Với Thế Giới:  Cổ Vũ Phong Trào Giải Phóng Dân Tộc",
                icon: <Globe className="text-primary" size={32} />,
                details: [
                  "Là cuộc cách mạng giải phóng dân tộc đầu tiên giành thắng lợi ở một nước thuộc địa sau Chiến tranh thế giới thứ hai.",
                  "Đột phá một khâu quan trọng trong hệ thống thuộc địa của chủ nghĩa đế quốc, mở đầu thời kỳ suy sụp và tan rã của chủ nghĩa thực dân cũ.",
                  "Cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới, đặc biệt là ở các nước thuộc địa và nửa thuộc địa.",
                  "Chiến công chung của các dân tộc thuộc địa đang đấu tranh vì độc lập, tự do."
                ],
                context: "Cách mạng Tháng Tám không chỉ là thắng lợi của riêng dân tộc Việt Nam mà còn có ý nghĩa quốc tế sâu rộng. Thắng lợi này đã cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên toàn thế giới, chứng minh rằng các dân tộc thuộc địa hoàn toàn có khả năng tự giải phóng, đánh bại ách đô hộ của chủ nghĩa đế quốc. Cách mạng Tháng Tám trở thành biểu tượng của tinh thần đấu tranh bất khuất, kiên cường của các dân tộc bị áp bức."
              },
              {
                title: "Về Lý Luận:  Góp Phần Phát Triển Kho Tàng Lý Luận Mác - Lênin",
                icon: <Lightbulb className="text-purple-500" size={32} />,
                details: [
                  "Chứng minh rằng cách mạng giải phóng dân tộc do Đảng Cộng sản lãnh đạo có thể thắng lợi ở một nước thuộc địa trước khi giai cấp công nhân ở “chính quốc” giành chính quyền.",
                  "Khẳng định đường lối giải phóng dân tộc đúng đắn, sáng tạo của Đảng Cộng sản Đông Dương và tư tưởng độc lập, tự do của Hồ Chí Minh.",
                  "Góp phần làm phong phú thêm kho tàng lý luận của chủ nghĩa Mác - Lênin về cách mạng giải phóng dân tộc."
                ],
                context: "Cách mạng Tháng Tám không chỉ có ý nghĩa thực tiễn mà còn có ý nghĩa lý luận sâu sắc. Thắng lợi của Cách mạng Tháng Tám đã góp phần làm phong phú thêm kho tàng lý luận của chủ nghĩa Mác - Lênin về cách mạng giải phóng dân tộc, khẳng định tính đúng đắn và sáng tạo của đường lối cách mạng Việt Nam, mở ra một hướng đi mới cho các dân tộc thuộc địa trong cuộc đấu tranh giành độc lập, tự do."
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
                  <span className="mr-3">{item.icon}</span> {item.title}
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
                 {/* Image insertion point after each significance aspect - Optional */}
                 {/* {index === 0 && <img src="/images/doc_lap_tu_do.jpg" alt="Độc lập tự do cho dân tộc" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 1 && <img src="/images/co_vu_the_gioi.jpg" alt="Cổ vũ phong trào thế giới" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 2 && <img src="/images/ly_luan_mac_lenin.jpg" alt="Lý luận Mác-Lênin" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>} */}
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
        <p className="mb-4 italic">“Cách mạng Tháng Tám là một trong những trang chói lọi nhất của lịch sử dân tộc ta.”</p>
      </motion.footer>
    </article>
  );
};

export default YnghiaBlog;