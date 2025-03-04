import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Shield, Users, Heart, CheckCircle, Flag, HomeIcon } from "lucide-react";

const TinhchatBlog: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Tinh Chat Theme */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://tinhuybinhphuoc.vn/uploads/hdnd/2024_08/image-20240825081516-2.jpeg" // Replace with your hero image URL (e.g., symbolic image of revolution's nature)
          alt="Tính Chất Cách Mạng Tháng Tám"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Bản Chất và Tinh Thần Cách Mạng Tháng Tám:  Giải Phóng và Kiến Tạo
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Phân tích sâu sắc về tính chất, mục tiêu và những giá trị cốt lõi của cuộc cách mạng vĩ đại.
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
            <h2 className="text-4xl font-semibold text-primary tracking-tight"> Định Hình Bản Chất Cách Mạng Tháng Tám</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cách mạng Tháng Tám năm 1945 không chỉ là một sự kiện lịch sử vĩ đại, mà còn là một cuộc cách mạng mang đậm bản sắc và tinh thần Việt Nam. Để hiểu rõ tầm vóc và ý nghĩa sâu xa của nó, chúng ta cần đi sâu vào phân tích tính chất đặc trưng, mục tiêu cốt lõi và những giá trị nhân văn mà cuộc cách mạng này mang lại. Cách mạng Tháng Tám là một cuộc cách mạng giải phóng dân tộc điển hình, mang trong mình tính chất dân chủ mới, và là một bộ phận không thể tách rời của cuộc cách mạng dân tộc dân chủ nhân dân Việt Nam.
          </p>
        </motion.div>

        {/* Key Characteristics Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <CheckCircle className="mr-3 text-primary" size={36} />
            Những Tính Chất Nổi Bật Của Cách Mạng Tháng Tám
          </h3>

          <div className="space-y-16">
            {[
              {
                title: "Cách Mạng Giải Phóng Dân Tộc:  Mục Tiêu Tối Thượng",
                icon: <Flag className="text-destructive" size={32} />,
                details: [
                  "Mục tiêu hàng đầu và xuyên suốt của Cách mạng Tháng Tám là giải phóng dân tộc Việt Nam khỏi ách đô hộ của chủ nghĩa đế quốc.",
                  "Tập trung giải quyết mâu thuẫn chủ yếu giữa dân tộc Việt Nam và đế quốc xâm lược cùng bè lũ tay sai.",
                  "Đáp ứng khát vọng cháy bỏng về độc lập, tự do của toàn thể nhân dân Việt Nam, phù hợp với xu thế thời đại."
                ],
                context: "Cách mạng Tháng Tám là cuộc cách mạng giải phóng dân tộc điển hình, đặt nhiệm vụ dân tộc lên trên hết, giải quyết triệt để vấn đề chủ quyền quốc gia, khẳng định quyền tự quyết thiêng liêng của dân tộc Việt Nam."
              },
              {
                title: "Cách Mạng Toàn Dân:  Sức Mạnh Từ Khối Đại Đoàn Kết",
                icon: <Users className="text-primary" size={32} />,
                details: [
                  "Lực lượng cách mạng bao gồm toàn thể dân tộc Việt Nam, từ công nhân, nông dân, trí thức đến các tầng lớp yêu nước khác.",
                  "Đoàn kết chặt chẽ trong Mặt trận Việt Minh, dưới sự lãnh đạo của Đảng Cộng sản Đông Dương.",
                  "Động viên đến mức cao nhất mọi lực lượng dân tộc, tạo nên sức mạnh tổng hợp để vùng lên khởi nghĩa."
                ],
                context: "Sức mạnh của Cách mạng Tháng Tám bắt nguồn từ khối đại đoàn kết toàn dân tộc. Đảng đã khơi dậy tinh thần yêu nước, tập hợp và phát huy tối đa sức mạnh của mọi người dân Việt Nam, tạo nên một “lò lửa khởi nghĩa dân tộc” theo cách nói của V.I. Lênin."
              },
              {
                title: "Nhà Nước Của Toàn Dân:  Dân Chủ Cộng Hòa",
                icon: <HomeIcon className="text-purple-500" size={32} />,
                details: [
                  "Thành lập chính quyền nhà nước Việt Nam Dân chủ Cộng hòa, nhà nước của nhân dân, do nhân dân và vì nhân dân.",
                  "Xây dựng nhà nước theo hình thức cộng hòa dân chủ, đảm bảo quyền làm chủ của nhân dân.",
                  "Chính quyền nhà nước là “của chung toàn dân tộc”, trừ những kẻ phản quốc và tay sai đế quốc."
                ],
                context: "Cách mạng Tháng Tám đã thiết lập một chế độ nhà nước hoàn toàn mới, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á. Chính quyền này không phục vụ lợi ích của một giai cấp hay tầng lớp nào, mà là của toàn thể dân tộc, thực sự là “nhà nước của dân, do dân, vì dân”."
              },
              {
                title: "Tính Dân Chủ Mới:  Bước Đầu Của Dân Chủ Nhân Dân",
                icon: <Shield className="text-blue-500" size={32} />,
                details: [
                  "Mang tính chất dân chủ, thể hiện ở việc giải phóng dân tộc, xóa bỏ chế độ phong kiến, mang lại quyền tự do, dân chủ cho nhân dân.",
                  "Tuy nhiên, tính chất dân chủ chưa hoàn toàn đầy đủ và sâu sắc, vì chưa giải quyết triệt để vấn đề ruộng đất, chưa xóa bỏ hoàn toàn tàn tích phong kiến.",
                  "Là bước khởi đầu, bộ phận khăng khít của cách mạng dân tộc dân chủ nhân dân, tiếp tục phát triển và hoàn thiện trong giai đoạn sau."
                ],
                context: "Cách mạng Tháng Tám mang tính chất dân chủ mới, là bước tiến quan trọng trên con đường dân chủ hóa xã hội Việt Nam. Tuy chưa phải là một cuộc cách mạng xã hội chủ nghĩa hoàn chỉnh, nhưng nó đã tạo tiền đề và mở đường cho sự phát triển của một xã hội dân chủ, công bằng và tiến bộ hơn."
              },
              {
                title: "Tính Nhân Văn Sâu Sắc:  Giải Phóng Con Người Toàn Diện",
                icon: <Heart className="text-orange-500" size={32} />,
                details: [
                  "Cách mạng Tháng Tám không chỉ giải phóng dân tộc mà còn giải phóng con người Việt Nam khỏi mọi áp bức, bất công.",
                  "Giải phóng khỏi ách áp bức về dân tộc, bóc lột về giai cấp và nô dịch về tinh thần.",
                  "Hướng tới mục tiêu cao đẹp là xây dựng một xã hội tốt đẹp hơn, nơi con người được tự do, hạnh phúc và phát triển toàn diện."
                ],
                context: "Cách mạng Tháng Tám thấm đượm tinh thần nhân văn sâu sắc. Mục tiêu cao nhất của cuộc cách mạng không chỉ là độc lập dân tộc mà còn là giải phóng con người, mang lại tự do, hạnh phúc và phẩm giá cho mỗi người dân Việt Nam. Đây là giá trị cốt lõi, là động lực tinh thần to lớn của Cách mạng Tháng Tám và của cả dân tộc Việt Nam."
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
                 {/* Image insertion point after each characteristic - Optional */}
                 {/* {index === 0 && <img src="/images/giai_phong_dan_toc.jpg" alt="Giải phóng dân tộc" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 1 && <img src="/images/toan_dan_doan_ket.jpg" alt="Toàn dân đoàn kết" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 2 && <img src="/images/nha_nuoc_dan_chu.jpg" alt="Nhà nước dân chủ cộng hòa" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                 {index === 4 && <img src="/images/nhan_van_cach_mang.jpg" alt="Tính nhân văn cách mạng" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>} */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.footer
        className="text-center mt-24 text-muted-foreground border-t pt-12 border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <p className="mb-4 italic">“Chẳng những giai cấp lao động và nhân dân Việt Nam ta có thể tự hào, mà giai cấp lao động và những dân tộc bị áp bức nơi khác cũng có thể tự hào rằng: Lần này là lần đầu tiên trong lịch sử cách mạng của các dân tộc thuộc địa và nửa thuộc địa, một Đảng mới 15 tuổi đã lãnh đạo cách mạng thành công, đã nắm chính quyền toàn quốc.” - Hồ Chí Minh</p>
      </motion.footer>
    </article>
  );
};

export default TinhchatBlog;