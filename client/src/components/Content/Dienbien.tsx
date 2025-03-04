import React from "react";
import { motion } from "framer-motion";
import { CalendarClock, Flag, Users, Shield, Archive, Sparkles, MapPin, HomeIcon, ShieldAlert } from "lucide-react";

const DienbienBlog: React.FC = () => {
  return (
    <article className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section - Dien Bien Theme */}
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-2xl mb-16 aspect-[16/7]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="https://tinhuybinhphuoc.vn/uploads/hdnd/2024_08/image-20240825081516-2.jpeg"// Replace with your hero image URL (e.g., scenes of uprising)
          alt="Diễn Biến Tổng Khởi Nghĩa"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Diễn Biến Tổng Khởi Nghĩa:  15 Ngày Làm Nên Lịch Sử
            </h1>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              Từ lệnh khởi nghĩa đến ngày Tuyên ngôn Độc lập, quá trình giành chính quyền trên cả nước.
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
            <Sparkles className="mr-3 text-primary" size={40} />
            <h2 className="text-4xl font-semibold text-primary tracking-tight">Mở Đầu Tổng Khởi Nghĩa: Chớp Thời Cơ "Ngàn Năm Có Một"</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Giữa tháng 8 năm 1945, thời cơ cách mạng “ngàn năm có một” đã đến. Nhật Bản đầu hàng Đồng Minh, chính quyền tay sai hoang mang, rệu rã. Đảng Cộng sản Đông Dương chớp thời cơ lịch sử, phát động toàn dân tổng khởi nghĩa giành chính quyền. Chỉ trong vòng 15 ngày ngắn ngủi, dưới sự lãnh đạo tài tình của Đảng và Chủ tịch Hồ Chí Minh, Cách mạng Tháng Tám đã diễn ra và giành thắng lợi trên phạm vi cả nước, lật đổ chế độ thực dân phong kiến, khai sinh nước Việt Nam Dân chủ Cộng hòa. Diễn biến thần tốc và hào hùng của những ngày tháng Tám năm 1945 mãi mãi là một trang sử chói lọi của dân tộc Việt Nam.
          </p>
        </motion.div>

        {/* Timeline Section - Dien Bien Phase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-semibold mb-8 text-primary tracking-tight flex items-center">
            <CalendarClock className="mr-3 text-primary" size={36} />
            15 Ngày Tổng Khởi Nghĩa: Từ Lệnh Xuất Quân Đến Ngày Độc Lập
          </h3>

          <div className="space-y-16">
            {[
              {
                date: "12/08/1945",
                title: "Khu Giải Phóng Hạ Lệnh Khởi Nghĩa: Tín Hiệu Đầu Tiên",
                icon: <Flag className="text-destructive" size={32} />,
                details: [
                  "Ngày 12/8/1945, Ủy ban lâm thời Khu Giải phóng Việt Bắc, cơ quan chính quyền cách mạng đầu tiên, ban hành lệnh khởi nghĩa trong khu.",
                  "Đây là động thái thăm dò, nắm bắt tình hình và phát đi tín hiệu khởi nghĩa đến các địa phương khác."
                ],
                context: "Lệnh khởi nghĩa từ Khu Giải phóng thể hiện sự chủ động, quyết đoán của chính quyền cách mạng non trẻ, đồng thời là bước đi chiến lược, tạo đà cho lệnh tổng khởi nghĩa trên toàn quốc."
              },
              {
                date: "13/08/1945",
                title: "Quân Lệnh Số 1: Lệnh Tổng Khởi Nghĩa Toàn Quốc",
                icon: <Flag className="text-primary" size={32} />,
                details: [
                  "Ngày 13/8/1945, Trung ương Đảng và Tổng bộ Việt Minh thành lập Ủy ban Khởi nghĩa toàn quốc, cơ quan chỉ đạo cao nhất.",
                  "23 giờ cùng ngày, Ủy ban Khởi nghĩa toàn quốc ban bố “Quân lệnh số 1”, chính thức phát lệnh tổng khởi nghĩa trên cả nước."
                ],
                context: "Quân lệnh số 1 là mệnh lệnh lịch sử, thể hiện quyết tâm sắt đá của Đảng và Tổng bộ Việt Minh, phát động toàn dân tộc vùng lên giành chính quyền, chớp lấy thời cơ ngàn năm có một."
              },
              {
                date: "14-15/08/1945",
                title: "Hội Nghị Toàn Quốc Của Đảng: Quyết Định Lịch Sử Tại Tân Trào",
                icon: <Users className="text-purple-500" size={32} />,
                details: [
                  "Ngày 14 và 15/8/1945, Hội nghị toàn quốc của Đảng họp tại Tân Trào, do Chủ tịch Hồ Chí Minh và Tổng Bí thư Trường Chinh chủ trì.",
                  "Hội nghị phân tích tình hình, nhận định thời cơ và quyết định phát động tổng khởi nghĩa giành chính quyền trước khi quân Đồng Minh vào Đông Dương.",
                  "Hội nghị đề ra khẩu hiệu đấu tranh: “Phản đối xâm lược! Hoàn toàn độc lập! Chính quyền nhân dân!” và xác định các nguyên tắc, phương hướng chỉ đạo khởi nghĩa."
                ],
                context: "Hội nghị toàn quốc của Đảng tại Tân Trào là hội nghị lịch sử, có ý nghĩa quyết định vận mệnh dân tộc. Quyết định tổng khởi nghĩa thể hiện sự lãnh đạo sáng suốt, kịp thời của Đảng, nắm bắt đúng thời cơ và đáp ứng nguyện vọng của toàn dân."
              },
              {
                date: "Từ 14/08/1945",
                title: "Giải Phóng Quân Tiến Công: Hỗ Trợ Khởi Nghĩa Toàn Dân",
                icon: <Shield className="text-blue-500" size={32} />,
                details: [
                  "Từ ngày 14/8/1945, các đơn vị Giải phóng quân đồng loạt tiến công các đồn binh Nhật ở Cao Bằng, Bắc Kạn, Thái Nguyên, Tuyên Quang, Yên Bái…",
                  "Giải phóng quân hỗ trợ quần chúng nổi dậy giành chính quyền ở các tỉnh lỵ, tạo khí thế cách mạng trên khắp các địa phương."
                ],
                context: "Hành động của Giải phóng quân có ý nghĩa chiến lược quan trọng, vừa tiêu hao sinh lực địch, vừa tạo điều kiện thuận lợi cho quần chúng nhân dân nổi dậy giành chính quyền, thể hiện sự phối hợp nhịp nhàng giữa lực lượng vũ trang và lực lượng chính trị."
              },
              {
                date: "16/08/1945",
                title: "Đại Hội Quốc Dân Tân Trào:  Hợp Pháp Hóa Tổng Khởi Nghĩa",
                icon: <Users className="text-green-500" size={32} />,
                details: [
                  "Ngày 16/8/1945, Đại hội Quốc dân họp tại Tân Trào, quy tụ đại biểu từ khắp mọi miền đất nước.",
                  "Đại hội nhất trí tán thành quyết định tổng khởi nghĩa của Đảng, thông qua 10 chính sách lớn của Việt Minh.",
                  "Đại hội thành lập Ủy ban Giải phóng dân tộc Việt Nam (Chính phủ lâm thời) do Hồ Chí Minh làm Chủ tịch."
                ],
                context: "Đại hội Quốc dân Tân Trào có ý nghĩa lịch sử trọng đại, thể hiện ý chí thống nhất của toàn dân tộc, hợp pháp hóa quyết định tổng khởi nghĩa của Đảng, tăng cường sức mạnh và tính chính danh của chính quyền cách mạng."
              },
              {
                date: "16/08/1945",
                title: "Giải Phóng Thái Nguyên:  Thắng Lợi Đầu Tiên Ở Thị Xã",
                icon: <ShieldAlert className="text-orange-500" size={32} />,
                details: [
                  "Ngày 16/8/1945, một đơn vị Giải phóng quân do đồng chí Võ Nguyên Giáp chỉ huy tiến về giải phóng thị xã Thái Nguyên.",
                  "Thái Nguyên trở thành thị xã đầu tiên được giải phóng, cổ vũ mạnh mẽ phong trào khởi nghĩa trong cả nước."
                ],
                context: "Thắng lợi ở Thái Nguyên có ý nghĩa khích lệ tinh thần to lớn, khẳng định khả năng và sức mạnh của lực lượng vũ trang cách mạng, mở đầu cho quá trình giải phóng các đô thị, trung tâm kinh tế, chính trị quan trọng."
              },
              {
                date: "18/08/1945",
                title: "4 Tỉnh Giành Chính Quyền Sớm Nhất: Hải Dương, Bắc Giang, Hà Tĩnh, Quảng Nam",
                icon: <MapPin className="text-teal-500" size={32} />,
                details: [
                  "Ngày 18/8/1945, trước khi có lệnh tổng khởi nghĩa lan rộng, bốn tỉnh Hải Dương, Bắc Giang, Hà Tĩnh, Quảng Nam đã chủ động giành chính quyền.",
                  "Sự chủ động, sáng tạo của các địa phương thể hiện khí thế cách mạng sục sôi và sự lãnh đạo tài tình của các cấp ủy Đảng."
                ],
                context: "Sự kiện 4 tỉnh giành chính quyền sớm nhất là minh chứng sinh động cho sức mạnh của phong trào quần chúng, sự chủ động và sáng tạo của các địa phương, đồng thời cho thấy thời cơ cách mạng đã chín muồi trên khắp cả nước."
              },
              {
                date: "19/08/1945",
                title: "Hà Nội Khởi Nghĩa Thắng Lợi:  Đòn Quyết Định Vào Sào Huyệt Địch",
                icon: <HomeIcon className="text-red-500" size={32} />,
                details: [
                  "Ngày 19/8/1945, cuộc khởi nghĩa giành chính quyền nổ ra và thắng lợi ở Hà Nội.",
                  "Hàng vạn quần chúng Thủ đô xuống đường biểu dương lực lượng, chiếm các công sở, đập tan bộ máy chính quyền địch.",
                  "Thắng lợi ở Hà Nội có ý nghĩa quyết định, báo hiệu sự sụp đổ hoàn toàn của chế độ thực dân phong kiến."
                ],
                context: "Khởi nghĩa thắng lợi ở Hà Nội là đòn quyết định, đánh vào trung tâm đầu não của địch, có ý nghĩa cổ vũ, thúc đẩy mạnh mẽ phong trào khởi nghĩa trên cả nước, tạo điều kiện quyết định cho thắng lợi của Cách mạng Tháng Tám."
              },
              {
                date: "23-25/08/1945",
                title: "Huế, Sài Gòn Vùng Lên:  Giành Chính Quyền Ở Các Đô Thị Lớn",
                icon: <MapPin className="text-orange-500" size={32} />,
                details: [
                  "Ngày 23/8/1945, khởi nghĩa thắng lợi ở Huế, kinh đô cũ của Việt Nam.",
                  "Ngày 25/8/1945, Sài Gòn, trung tâm kinh tế, chính trị của Nam Bộ, cũng giành chính quyền về tay nhân dân.",
                  "Thắng lợi ở Huế và Sài Gòn cùng với Hà Nội đánh dấu sự toàn thắng của cuộc tổng khởi nghĩa ở các đô thị lớn."
                ],
                context: "Việc giành chính quyền ở Hà Nội, Huế, Sài Gòn có ý nghĩa chiến lược, đập tan các cơ quan đầu não của địch, làm tê liệt hoàn toàn bộ máy cai trị và tạo điều kiện cho chính quyền cách mạng được thiết lập trên cả nước."
              },
              {
                date: "28/08/1945",
                title: "Toàn Quốc Về Một Mối:  Cách Mạng Tháng Tám Thành Công",
                icon: <Flag className="text-teal-500" size={32} />,
                details: [
                  "Đến ngày 28/8/1945, Đồng Nai Thượng và Hà Tiên là hai tỉnh cuối cùng giành chính quyền.",
                  "Cách mạng Tháng Tám thành công trên cả nước, chính quyền về tay nhân dân, chế độ thực dân phong kiến sụp đổ hoàn toàn."
                ],
                context: "Thắng lợi trên cả nước khẳng định sức mạnh vĩ đại của khối đại đoàn kết dân tộc, sự lãnh đạo tài tình của Đảng và Chủ tịch Hồ Chí Minh, đánh dấu mốc son chói lọi trong lịch sử dân tộc, mở ra kỷ nguyên độc lập, tự do."
              },
              {
                date: "2/09/1945",
                title: "Tuyên Ngôn Độc Lập: Khai Sinh Nước Việt Nam Dân Chủ Cộng Hòa",
                icon: <Sparkles className="text-green-500" size={32} />,
                details: [
                  "Ngày 2/9/1945, tại Quảng trường Ba Đình, Hà Nội, Chính phủ lâm thời long trọng tổ chức Lễ Tuyên ngôn Độc lập.",
                  "Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, tuyên bố trước quốc dân và thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
                  "Tuyên ngôn Độc lập khẳng định quyền độc lập, tự do của dân tộc Việt Nam, mở ra kỷ nguyên mới trong lịch sử dân tộc."
                ],
                context: "Tuyên ngôn Độc lập là văn kiện lịch sử vô giá, tuyên bố với thế giới về sự ra đời của một nước Việt Nam độc lập, tự do, khẳng định quyền tự quyết của dân tộc và mở ra một kỷ nguyên mới, kỷ nguyên của độc lập, tự do và chủ nghĩa xã hội."
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
                {index === 2 && <img src="https://tuyenquang.dcs.vn/Image/Large/202181581649_48003.jpg" alt="Hội nghị Tân Trào" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                {index === 7 && <img src="https://laodongthudo.vn/stores/news_dataimages/thanhtrung/082019/20/09/5118_BYc_BY_PhY_mYt_trong_nhYng_YYa_YiYm_diYn_ra_tYng_khYi_nghYa_19.8_tYi_Ha_NYi.jpg" alt="Khởi nghĩa Hà Nội 19/8" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                {index === 9 && <img src="https://danviet.mediacdn.vn/2020/11/12/1baodaithoaivi-1605169383138-1605169384382599459458.jpg" alt="Bảo Đại thoái vị" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}
                {index === 10 && <img src="https://baoapbac.vn/dataimages/202208/original/images1755886_11.jpg" alt="Lễ Tuyên ngôn Độc lập tại Ba Đình" className="mt-6 rounded-lg shadow-md w-full aspect-video object-cover"/>}

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
        <p className="mb-4 italic">“Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do và độc lập ấy.” - Tuyên ngôn Độc lập</p>
      </motion.footer>
    </article>
  );
};

export default DienbienBlog;