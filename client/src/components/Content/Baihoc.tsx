import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Compass, Users, Rocket, ShieldCheck } from "lucide-react";

const BaihocBlog: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Bai Hoc Theme */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://tinhuybinhphuoc.vn/uploads/hdnd/2024_08/image-20240825081516-2.jpeg" // Replace with your hero image URL (e.g., symbolic image of lessons, wisdom)
          alt="Bài Học Kinh Nghiệm Cách Mạng Tháng Tám"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Bài Học Kinh Nghiệm Từ Cách Mạng Tháng Tám:  Kim Chỉ Nam Cho Tương Lai
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Những bài học quý báu về chỉ đạo chiến lược, xây dựng lực lượng và phương pháp cách mạng.
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
            <h2 className="text-4xl font-semibold text-primary tracking-tight">Giá Trị Vượt Thời Gian Của Bài Học Cách Mạng Tháng Tám</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Thắng lợi vĩ đại của Cách mạng Tháng Tám năm 1945 không chỉ là một trang sử hào hùng của dân tộc Việt Nam mà còn để lại những bài học kinh nghiệm vô giá, có ý nghĩa lý luận và thực tiễn sâu sắc. Những bài học này không chỉ soi đường cho sự nghiệp xây dựng và bảo vệ Tổ quốc trong quá khứ mà còn tiếp tục là kim chỉ nam cho hành động của Đảng và nhân dân ta trong hiện tại và tương lai. Nghiên cứu, vận dụng sáng tạo những bài học từ Cách mạng Tháng Tám là trách nhiệm của mỗi chúng ta, để tiếp tục đưa đất nước vững bước trên con đường phát triển và hội nhập quốc tế.
          </p>
        </motion.div>

        {/* Lessons Learned Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <BookOpen className="mr-3 text-primary" size={36} />
            Những Bài Học Kinh Nghiệm Quý Báu Từ Cách Mạng Tháng Tám
          </h3>

          <div className="space-y-16">
            {[
              {
                title: "Bài Học 1:  Chỉ Đạo Chiến Lược Sáng Suốt, Giương Cao Ngọn Cờ Dân Tộc",
                icon: <Compass className="text-destructive" size={32} />,
                details: [
                  "Phải luôn giương cao ngọn cờ giải phóng dân tộc, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
                  "Giải quyết đúng đắn mối quan hệ giữa nhiệm vụ độc lập dân tộc và cách mạng ruộng đất.",
                  "Trong cách mạng thuộc địa, nhiệm vụ ruộng đất cần tạm gác lại, thực hiện từng bước phù hợp để phục vụ nhiệm vụ chống đế quốc."
                ],
                context: "Bài học về chỉ đạo chiến lược là bài học đầu tiên và quan trọng nhất. Cách mạng Tháng Tám thành công trước hết nhờ Đảng ta đã xác định đúng đắn đường lối chiến lược giải phóng dân tộc, tập trung mọi lực lượng và nguồn lực cho mục tiêu cao nhất là độc lập, tự do của Tổ quốc. Bài học này vẫn còn nguyên giá trị trong bối cảnh hiện nay, khi đất nước ta đang đứng trước nhiều cơ hội và thách thức mới."
              },
              {
                title: "Bài Học 2:  Xây Dựng Lực Lượng Toàn Dân, Phát Huy Sức Mạnh Đại Đoàn Kết",
                icon: <Users className="text-primary" size={32} />,
                details: [
                  "Dựa trên nền tảng khối liên minh công nông vững chắc, khơi dậy tinh thần dân tộc trong mọi tầng lớp nhân dân.",
                  "Tập hợp mọi lực lượng yêu nước vào Mặt trận dân tộc thống nhất rộng rãi, điển hình là Mặt trận Việt Minh.",
                  "Động viên, tổ chức và phát huy sức mạnh của toàn dân tộc, tạo thành “lò lửa khởi nghĩa dân tộc”."
                ],
                context: "Sức mạnh của Cách mạng Tháng Tám là sức mạnh của toàn dân tộc. Đảng ta đã thành công trong việc xây dựng khối đại đoàn kết toàn dân, tập hợp mọi người Việt Nam yêu nước, không phân biệt giai cấp, tôn giáo, đảng phái, tạo nên sức mạnh vô địch để đánh bại kẻ thù xâm lược. Bài học về xây dựng lực lượng và phát huy sức mạnh đại đoàn kết dân tộc vẫn luôn là yếu tố then chốt để bảo đảm thắng lợi của sự nghiệp xây dựng và bảo vệ Tổ quốc."
              },
              {
                title: "Bài Học 3:  Nắm Vững Phương Pháp Cách Mạng, Chớp Thời Cơ, Hành Động Quyết Đoán",
                icon: <Rocket className="text-purple-500" size={32} />,
                details: [
                  "Nắm vững quan điểm bạo lực cách mạng của quần chúng, kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
                  "Xây dựng lực lượng chính trị và lực lượng vũ trang, tiến hành chiến tranh du kích cục bộ, khởi nghĩa từng phần.",
                  "Chớp đúng thời cơ cách mạng, phát động tổng khởi nghĩa giành chính quyền trên cả nước một cách nhanh chóng, quyết liệt."
                ],
                context: "Cách mạng Tháng Tám là một mẫu mực về nghệ thuật chỉ đạo, điều hành và chớp thời cơ cách mạng. Đảng ta đã vận dụng sáng tạo phương pháp cách mạng phù hợp với điều kiện cụ thể của Việt Nam, kết hợp sức mạnh của quần chúng với lực lượng vũ trang, tiến hành khởi nghĩa từng phần, tiến lên tổng khởi nghĩa, giành thắng lợi nhanh chóng và ít đổ máu. Bài học về phương pháp cách mạng và chớp thời cơ vẫn còn nguyên giá trị trong sự nghiệp đổi mới và hội nhập hiện nay."
              },
              {
                title: "Bài Học 4:  Xây Dựng Đảng Vững Mạnh, Nâng Cao Năng Lực Lãnh Đạo",
                icon: <ShieldCheck className="text-orange-500" size={32} />,
                details: [
                  "Xây dựng Đảng Cộng sản Việt Nam vững mạnh về tư tưởng, chính trị, tổ chức và đạo đức.",
                  "Tuyệt đối trung thành với lợi ích của giai cấp công nhân, nhân dân lao động và toàn dân tộc.",
                  "Vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh, đề ra đường lối chính trị đúng đắn.",
                  "Xây dựng đội ngũ cán bộ, đảng viên kiên cường, gắn bó mật thiết với quần chúng nhân dân."
                ],
                context: "Sự lãnh đạo đúng đắn và sáng suốt của Đảng Cộng sản Việt Nam là nhân tố quyết định làm nên thắng lợi của Cách mạng Tháng Tám. Đảng ta đã thể hiện bản lĩnh chính trị vững vàng, năng lực lãnh đạo tài tình, luôn đặt lợi ích của dân tộc lên trên hết, gắn bó máu thịt với nhân dân. Bài học về xây dựng Đảng vững mạnh, nâng cao năng lực lãnh đạo là bài học then chốt, có ý nghĩa sống còn đối với sự nghiệp cách mạng của Đảng và dân tộc ta."
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
                 {/* Image insertion point after each lesson - Optional */}
                 {/* {index === 0 && <img src="/images/chi_dao_chien_luoc.jpg" alt="Chỉ đạo chiến lược" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 1 && <img src="/images/dai_doan_ket_dan_toc.jpg" alt="Đại đoàn kết dân tộc" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 2 && <img src="/images/phuong_phap_cach_mang.jpg" alt="Phương pháp cách mạng" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 3 && <img src="/images/xay_dung_dang.jpg" alt="Xây dựng Đảng" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>} */}
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
        <p className="mb-4 italic">“Không có gì quý hơn độc lập, tự do.” - Hồ Chí Minh</p>
      </motion.footer>
    </article>
  );
};

export default BaihocBlog;