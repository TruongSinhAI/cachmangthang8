import React, { useState, useEffect } from 'react';

interface Player {
  name: string;
  score: number;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Game() {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  // Game states
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [timeLeft, setTimeLeft] = useState(30); // seconds for the game
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Sample questions - add at least one sample question
  const questions = [
    {
    question: "Chiến tranh thế giới thứ hai bùng nổ vào thời gian nào?",
    options: ["Tháng 9/1939", "Tháng 6/1940", "Tháng 12/1941", "Tháng 8/1945"],
    correctAnswer: 0
    },
    {
    question: "Tháng 6/1940, quốc gia nào đã tấn công Pháp?",
    options: ["Đức", "Nhật Bản", "Ý", "Liên Xô"],
    correctAnswer: 0
    },
    {
    question: "Quân phiệt Nhật vào Đông Dương vào thời gian nào?",
    options: ["Tháng 9/1940", "Tháng 6/1941", "Tháng 12/1941", "Tháng 8/1945"],
    correctAnswer: 0
    },
    {
    question: "Nhân dân Đông Dương phải chịu cảnh 'một cổ hai tròng' của những thế lực nào?",
    options: ["Pháp - Nhật", "Pháp - Mỹ", "Nhật - Mỹ", "Đức - Nhật"],
    correctAnswer: 0
    },
    {
    question: "Hội nghị Ban Chấp hành Trung ương Đảng tháng 11/1939 diễn ra ở đâu?",
    options: ["Hà Nội", "Bà Điểm", "Cao Bằng", "Tân Trào"],
    correctAnswer: 1
    },
    {
    question: "Hội nghị Trung ương Đảng tháng 11/1939 xác định nhiệm vụ trước mắt của cách mạng Đông Dương là gì?",
    options: ["Cách mạng ruộng đất", "Cách mạng tư sản dân quyền", "Giải phóng dân tộc", "Xây dựng chủ nghĩa xã hội"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Trung ương Đảng tháng 11/1939 tạm gác khẩu hiệu nào?",
    options: ["Đánh đổ đế quốc Pháp", "Đánh đổ phong kiến", "Cách mạng ruộng đất", "Giải phóng dân tộc"],
    correctAnswer: 2
    },
    {
    question: "Mặt trận dân tộc thống nhất phản đế Đông Dương được thành lập theo chủ trương của hội nghị nào?",
    options: ["Hội nghị tháng 11/1939", "Hội nghị tháng 11/1940", "Hội nghị tháng 5/1941", "Hội nghị tháng 8/1945"],
    correctAnswer: 0
    },
    {
    question: "Tổng Bí thư Nguyễn Văn Cừ bị địch bắt vào thời gian nào?",
    options: ["1939", "1940", "1941", "1942"],
    correctAnswer: 1
    },
    {
    question: "Hội nghị Trung ương Đảng tháng 11/1940 họp ở đâu?",
    options: ["Pác Bó", "Bà Điểm", "Đình Bảng", "Tân Trào"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Trung ương Đảng tháng 11/1940 nhận định về mối quan hệ giữa cách mạng phản đế và cách mạng thổ địa như thế nào?",
    options: ["Cách mạng phản đế làm trước", "Cách mạng thổ địa làm trước", "Đồng thời tiến hành", "Cách mạng thổ địa là chính"],
    correctAnswer: 2
    },
    {
    question: "Lãnh tụ Nguyễn Ái Quốc về nước hoạt động vào thời gian nào?",
    options: ["1939", "1940", "1941", "1942"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị lần thứ tám Ban Chấp hành Trung ương Đảng diễn ra vào thời gian nào?",
    options: ["Tháng 11/1939", "Tháng 11/1940", "Tháng 5/1941", "Tháng 8/1945"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Trung ương 8 (5/1941) xác định mâu thuẫn chủ yếu của xã hội Việt Nam là gì?",
    options: ["Giai cấp công nhân và tư sản", "Nông dân và địa chủ", "Dân tộc Việt Nam và đế quốc Pháp - Nhật", "Chế độ phong kiến và nhân dân"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Trung ương 8 (5/1941) quyết định thành lập mặt trận nào?",
    options: ["Mặt trận Việt Minh", "Mặt trận Liên Việt", "Mặt trận Tổ quốc", "Mặt trận Dân chủ"],
    correctAnswer: 0
    },
    {
    question: "Tổng Bí thư của Đảng được bầu tại Hội nghị Trung ương 8 (5/1941) là ai?",
    options: ["Hồ Chí Minh", "Trường Chinh", "Lê Duẩn", "Phạm Văn Đồng"],
    correctAnswer: 1
    },
    {
    question: "Hội nghị Trung ương 8 (5/1941) chủ trương thành lập nước Việt Nam Dân chủ Cộng hòa theo tinh thần nào?",
    options: ["Xã hội chủ nghĩa", "Tân dân chủ", "Cộng hòa Xô viết", "Dân chủ tư sản"],
    correctAnswer: 1
    },
    {
    question: "Khởi nghĩa Bắc Sơn nổ ra vào thời gian nào?",
    options: ["Tháng 9/1940", "Tháng 11/1940", "Tháng 1/1941", "Tháng 8/1945"],
    correctAnswer: 0
    },
    {
    question: "Khởi nghĩa Nam Kỳ nổ ra vào thời gian nào?",
    options: ["Tháng 9/1940", "Tháng 11/1940", "Tháng 1/1941", "Tháng 8/1945"],
    correctAnswer: 1
    },
    {
    question: "Binh biến Đô Lương nổ ra vào thời gian nào?",
    options: ["Tháng 9/1940", "Tháng 11/1940", "Tháng 1/1941", "Tháng 8/1945"],
    correctAnswer: 2
    },
    {
    question: "Ai là người chỉ huy binh biến Đô Lương?",
    options: ["Nguyễn Văn Cừ", "Phan Đăng Lưu", "Đội Cung", "Hà Huy Tập"],
    correctAnswer: 2
    },
    {
    question: "Việt Minh công bố Tuyên ngôn vào thời gian nào?",
    options: ["Tháng 10/1940", "Tháng 10/1941", "Tháng 10/1942", "Tháng 10/1943"],
    correctAnswer: 1
    },
    {
    question: "Đảng Dân chủ Việt Nam được thành lập vào thời gian nào?",
    options: ["Tháng 6/1943", "Tháng 6/1944", "Tháng 6/1945", "Tháng 6/1946"],
    correctAnswer: 1
    },
    {
    question: "Đội du kích Bắc Sơn phát triển thành lực lượng nào?",
    options: ["Việt Nam Giải phóng quân", "Cứu quốc quân", "Tự vệ đỏ", "Du kích Ba Tơ"],
    correctAnswer: 1
    },
    {
    question: "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập vào thời gian nào?",
    options: ["12/1941", "12/1942", "12/1943", "12/1944"],
    correctAnswer: 3
    },
    {
    question: "Ai là người chỉ huy đơn vị Giải phóng quân từ Tân Trào về giải phóng Thái Nguyên?",
    options: ["Hồ Chí Minh", "Võ Nguyên Giáp", "Trường Chinh", "Hoàng Văn Thụ"],
    correctAnswer: 1
    },
    {
    question: "Nhật đảo chính Pháp lật đổ Pháp độc chiếm Đông Dương vào thời gian nào?",
    options: ["9/3/1944", "9/3/1945", "9/3/1946", "9/3/1947"],
    correctAnswer: 1
    },
    {
    question: "Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta' ra đời vào thời gian nào?",
    options: ["12/3/1944", "12/3/1945", "12/3/1946", "12/3/1947"],
    correctAnswer: 1
    },
    {
    question: "Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta' do cơ quan nào ban hành?",
    options: ["Tổng bộ Việt Minh", "Ủy ban Khởi nghĩa toàn quốc", "Ban Thường vụ Trung ương Đảng", "Hội nghị toàn quốc của Đảng"],
    correctAnswer: 2
    },
    {
    question: "Khẩu hiệu 'Đánh đuổi phát xít Nhật - Pháp' được thay bằng khẩu hiệu nào sau đảo chính 9/3/1945?",
    options: ["Đánh đuổi đế quốc Pháp", "Đánh đuổi phát xít Nhật", "Đánh đổ phong kiến", "Giải phóng dân tộc"],
    correctAnswer: 1
    },
    {
    question: "Khởi nghĩa Ba Tơ nổ ra ở tỉnh nào?",
    options: ["Quảng Ngãi", "Quảng Nam", "Quảng Trị", "Thừa Thiên Huế"],
    correctAnswer: 0
    },
    {
    question: "Ủy ban giải phóng Việt Nam được thành lập theo chỉ thị của cơ quan nào?",
    options: ["Tổng bộ Việt Minh", "Ủy ban Khởi nghĩa toàn quốc", "Ban Thường vụ Trung ương Đảng", "Hội nghị toàn quốc của Đảng"],
    correctAnswer: 0
    },
    {
    question: "Việt Nam Giải phóng quân được thành lập trên cơ sở thống nhất các lực lượng vũ trang nào?",
    options: ["Cứu quốc quân và du kích Ba Tơ", "Cứu quốc quân và Việt Nam Tuyên truyền Giải phóng quân", "Tự vệ đỏ và du kích Bắc Sơn", "Du kích Ba Tơ và Việt Nam Tuyên truyền Giải phóng quân"],
    correctAnswer: 1
    },
    {
    question: "Khu giải phóng Việt Bắc được thành lập vào thời gian nào?",
    options: ["Tháng 4/1945", "Tháng 5/1945", "Tháng 6/1945", "Tháng 7/1945"],
    correctAnswer: 2
    },
    {
    question: "Khu giải phóng Việt Bắc bao gồm hầu hết các tỉnh nào?",
    options: ["Trung du và miền núi Bắc Bộ", "Đồng bằng Bắc Bộ", "Bắc Trung Bộ", "Tây Nguyên"],
    correctAnswer: 0
    },
    {
    question: "Hội nghị quân sự cách mạng Bắc Kỳ diễn ra ở đâu?",
    options: ["Cao Bằng", "Tân Trào", "Hiệp Hòa", "Đình Bảng"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị quân sự cách mạng Bắc Kỳ diễn ra vào thời gian nào?",
    options: ["Tháng 4/1945", "Tháng 5/1945", "Tháng 6/1945", "Tháng 7/1945"],
    correctAnswer: 1
    },
    {
    question: "Khẩu hiệu 'phá kho thóc, giải quyết nạn đói' được phát động mạnh mẽ ở vùng nào?",
    options: ["Nam Bộ", "Trung Bộ", "Bắc Trung Bộ và Bắc Bộ", "Tây Nguyên"],
    correctAnswer: 2
    },
    {
    question: "Nhật Bản đầu hàng Đồng minh không điều kiện vào thời gian nào?",
    options: ["6/8/1945", "9/8/1945", "15/8/1945", "2/9/1945"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Pốtxđam diễn ra vào thời gian nào?",
    options: ["Tháng 5/1945", "Tháng 6/1945", "Tháng 7/1945", "Tháng 8/1945"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Pốtxđam quyết định về việc giải giáp quân đội Nhật ở Đông Dương như thế nào?",
    options: ["Quân đội Mỹ giải giáp", "Quân đội Anh giải giáp", "Quân đội Trung Hoa Dân Quốc và Anh giải giáp", "Quân đội Liên Xô giải giáp"],
    correctAnswer: 2
    },
    {
    question: "Ủy ban Khởi nghĩa toàn quốc được thành lập vào thời gian nào?",
    options: ["12/8/1945", "13/8/1945", "14/8/1945", "15/8/1945"],
    correctAnswer: 1
    },
    {
    question: "'Quân lệnh số 1' được ban bố bởi cơ quan nào?",
    options: ["Tổng bộ Việt Minh", "Ủy ban Khởi nghĩa toàn quốc", "Ban Thường vụ Trung ương Đảng", "Hội nghị toàn quốc của Đảng"],
    correctAnswer: 1
    },
    {
    question: "Hội nghị toàn quốc của Đảng họp ở Tân Trào vào thời gian nào?",
    options: ["14 và 15/8/1945", "16 và 17/8/1945", "18 và 19/8/1945", "20 và 21/8/1945"],
    correctAnswer: 0
    },
    {
    question: "Đại hội quốc dân họp ở Tân Trào vào thời gian nào?",
    options: ["14/8/1945", "15/8/1945", "16/8/1945", "17/8/1945"],
    correctAnswer: 2
    },
    {
    question: "Bốn tỉnh giành chính quyền sớm nhất trong Tổng khởi nghĩa tháng Tám là những tỉnh nào?",
    options: ["Hà Nội, Hải Dương, Bắc Giang, Hà Tĩnh", "Hải Dương, Bắc Giang, Hà Tĩnh, Quảng Nam", "Bắc Giang, Hà Tĩnh, Quảng Nam, Thừa Thiên Huế", "Hà Tĩnh, Quảng Nam, Thừa Thiên Huế, Sài Gòn"],
    correctAnswer: 1
    },
    {
    question: "Khởi nghĩa giành chính quyền ở Hà Nội diễn ra vào ngày nào?",
    options: ["17/8/1945", "18/8/1945", "19/8/1945", "20/8/1945"],
    correctAnswer: 2
    },
    {
    question: "Khởi nghĩa giành chính quyền ở Huế diễn ra vào ngày nào?",
    options: ["21/8/1945", "22/8/1945", "23/8/1945", "24/8/1945"],
    correctAnswer: 2
    },
    {
    question: "Khởi nghĩa giành chính quyền ở Sài Gòn diễn ra vào ngày nào?",
    options: ["23/8/1945", "24/8/1945", "25/8/1945", "26/8/1945"],
    correctAnswer: 2
    },
    {
    question: "Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa ra mắt quốc dân vào ngày nào?",
    options: ["28/8/1945", "30/8/1945", "1/9/1945", "2/9/1945"],
    correctAnswer: 3
    },
    {
    question: "Bảo Đại thoái vị vào ngày nào?",
    options: ["28/8/1945", "30/8/1945", "1/9/1945", "2/9/1945"],
    correctAnswer: 1
    },
    {
    question: "Lễ Tuyên bố độc lập diễn ra tại địa điểm nào ở Hà Nội?",
    options: ["Nhà hát Lớn", "Phủ Chủ tịch", "Quảng trường Ba Đình", "Hồ Gươm"],
    correctAnswer: 2
    },
    {
    question: "Ngày Tuyên bố độc lập của nước Việt Nam Dân chủ Cộng hòa là ngày nào?",
    options: ["28/8/1945", "30/8/1945", "1/9/1945", "2/9/1945"],
    correctAnswer: 3
    },
    {
    question: "Bản Tuyên ngôn độc lập do ai soạn thảo?",
    options: ["Trường Chinh", "Phạm Văn Đồng", "Hồ Chí Minh", "Võ Nguyên Giáp"],
    correctAnswer: 2
    },
    {
    question: "Cách mạng tháng Tám năm 1945 có tính chất là cuộc cách mạng gì?",
    options: ["Cách mạng tư sản", "Cách mạng vô sản", "Cách mạng giải phóng dân tộc", "Cách mạng xã hội chủ nghĩa"],
    correctAnswer: 2
    },
    {
    question: "Tính chất dân chủ của Cách mạng tháng Tám được đánh giá như thế nào?",
    options: ["Đầy đủ và sâu sắc", "Chưa đầy đủ và sâu sắc", "Không có tính dân chủ", "Chỉ mang tính hình thức"],
    correctAnswer: 1
    },
    {
    question: "Cách mạng tháng Tám đã giải quyết thành công vấn đề cơ bản của một cuộc cách mạng xã hội, đó là vấn đề gì?",
    options: ["Ruộng đất", "Chính quyền", "Giai cấp", "Dân tộc"],
    correctAnswer: 1
    },
    {
    question: "Cách mạng tháng Tám mở ra kỷ nguyên mới trong lịch sử dân tộc, kỷ nguyên nào?",
    options: ["Độc lập dân tộc và chủ nghĩa xã hội", "Độc lập dân tộc và dân chủ", "Dân chủ và chủ nghĩa xã hội", "Hòa bình và phát triển"],
    correctAnswer: 0
    },
    {
    question: "Bài học kinh nghiệm đầu tiên về chỉ đạo chiến lược của Cách mạng tháng Tám là gì?",
    options: ["Xây dựng lực lượng vũ trang", "Giương cao ngọn cờ giải phóng dân tộc", "Đoàn kết toàn dân", "Nắm vững thời cơ"],
    correctAnswer: 1
    },
    {
    question: "Mặt trận nào là điển hình thành công về huy động lực lượng toàn dân tộc trong Cách mạng tháng Tám?",
    options: ["Mặt trận Liên Việt", "Mặt trận Tổ quốc", "Mặt trận Việt Minh", "Mặt trận Dân chủ"],
    correctAnswer: 2
    },
    {
    question: "Phương pháp cách mạng chủ yếu được sử dụng trong Cách mạng tháng Tám là gì?",
    options: ["Đấu tranh nghị trường", "Bạo lực cách mạng của quần chúng", "Đấu tranh ngoại giao", "Kinh tế"],
    correctAnswer: 1
    },
    {
    question: "Yếu tố nào được coi là quyết định đến thắng lợi của Cách mạng tháng Tám?",
    options: ["Thời cơ quốc tế", "Sự giúp đỡ của nước ngoài", "Đảng Cộng sản Đông Dương lãnh đạo", "Tinh thần yêu nước của nhân dân"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị nào của Đảng đã hoàn chỉnh chủ trương chiến lược được đề ra từ Hội nghị tháng 11/1939?",
    options: ["Hội nghị Trung ương 6", "Hội nghị Trung ương 7", "Hội nghị Trung ương 8", "Hội nghị Trung ương 9"],
    correctAnswer: 2
    },
    {
    question: "Luận cương chính trị tháng 10/1930 của Đảng có hạn chế gì đã được khắc phục trong giai đoạn 1939-1945?",
    options: ["Không chú trọng vấn đề dân tộc", "Nhấn mạnh đấu tranh giai cấp hơn dân tộc", "Không đoàn kết được toàn dân", "Chưa có đường lối đúng đắn"],
    correctAnswer: 1
    },
    {
    question: "Nguyên tắc chỉ đạo khởi nghĩa được Hội nghị toàn quốc của Đảng xác định là gì?",
    options: ["Tập trung, thống nhất, bí mật", "Tập trung, thống nhất, kịp thời", "Thống nhất, kịp thời, bí mật", "Kịp thời, bí mật, rộng khắp"],
    correctAnswer: 1
    },
    {
    question: "Đâu không phải là một trong 10 chính sách lớn của Việt Minh được thông qua tại Đại hội quốc dân?",
    options: ["Xây dựng nền kinh tế tự chủ", "Thực hiện quyền bình đẳng nam nữ", "Tịch thu ruộng đất của địa chủ chia cho dân cày", "Mở rộng quan hệ ngoại giao"],
    correctAnswer: 2
    },
    {
    question: "Trong Tuyên ngôn độc lập, Hồ Chí Minh đã trích dẫn câu nói bất hủ trong bản tuyên ngôn nào của thế giới?",
    options: ["Tuyên ngôn Đảng Cộng sản", "Tuyên ngôn Nhân quyền và Dân quyền của Pháp", "Tuyên ngôn độc lập của Mỹ", "Tuyên ngôn Liên Hợp Quốc"],
    correctAnswer: 2
    },
    {
    question: "Cách mạng tháng Tám đã góp phần làm phong phú thêm kho tàng lý luận của chủ nghĩa Mác - Lênin về vấn đề gì?",
    options: ["Cách mạng vô sản", "Cách mạng tư sản dân quyền", "Cách mạng giải phóng dân tộc", "Xây dựng chủ nghĩa xã hội"],
    correctAnswer: 2
    },
    {
    question: "Trong giai đoạn 1939-1945, khẩu hiệu 'cách mạng ruộng đất' được Đảng chủ trương như thế nào?",
    options: ["Tiến hành triệt để", "Tạm gác lại", "Thực hiện từng bước", "Ưu tiên hàng đầu"],
    correctAnswer: 1
    },
    {
    question: "Lực lượng vũ trang nào được thành lập đầu tiên của Đảng trong giai đoạn 1939-1945?",
    options: ["Việt Nam Giải phóng quân", "Cứu quốc quân", "Đội du kích Bắc Sơn", "Việt Nam Tuyên truyền Giải phóng quân"],
    correctAnswer: 2
    },
    {
    question: "Trong chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta', kẻ thù cụ thể, trước mắt của nhân dân Đông Dương được xác định là ai?",
    options: ["Đế quốc Pháp", "Phát xít Nhật", "Cả Pháp và Nhật", "Phong kiến"],
    correctAnswer: 1
    },
    {
    question: "Cao trào kháng Nhật cứu nước diễn ra mạnh mẽ nhất vào thời gian nào?",
    options: ["Đầu năm 1945", "Giữa năm 1945", "Cuối năm 1945", "Đầu năm 1944"],
    correctAnswer: 1
    },
    {
    question: "Khu giải phóng Việt Bắc có vai trò như thế nào đối với Cách mạng tháng Tám?",
    options: ["Trung tâm kinh tế", "Trung tâm văn hóa", "Căn cứ địa chính của cách mạng cả nước", "Hậu phương vững chắc"],
    correctAnswer: 2
    },
    {
    question: "Thời cơ cách mạng giành chính quyền năm 1945 xuất hiện khi nào?",
    options: ["Pháp đầu hàng Nhật", "Nhật đảo chính Pháp", "Nhật Bản đầu hàng Đồng minh", "Quân Đồng minh vào Đông Dương"],
    correctAnswer: 2
    },
    {
    question: "Trong Tổng khởi nghĩa tháng Tám, khởi nghĩa ở các đô thị lớn có ý nghĩa như thế nào?",
    options: ["Quyết định thắng lợi ở nông thôn", "Đập tan cơ quan đầu não của địch", "Giành chính quyền ở các vùng kinh tế trọng điểm", "Thúc đẩy phong trào đấu tranh ở quốc tế"],
    correctAnswer: 1
    },
    {
    question: "Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa được thành lập trên cơ sở tổ chức nào?",
    options: ["Ủy ban Khởi nghĩa toàn quốc", "Ủy ban giải phóng Việt Nam", "Đại hội quốc dân", "Hội nghị toàn quốc của Đảng"],
    correctAnswer: 1
    },
    {
    question: "Sự kiện nào đánh dấu chế độ quân chủ chuyên chế ở Việt Nam hoàn toàn sụp đổ?",
    options: ["Khởi nghĩa tháng Tám thành công", "Tuyên ngôn độc lập", "Bảo Đại thoái vị", "Thành lập nước Việt Nam Dân chủ Cộng hòa"],
    correctAnswer: 2
    },
    {
    question: "Ý nghĩa quốc tế lớn nhất của Cách mạng tháng Tám là gì?",
    options: ["Mở đầu thời kỳ suy sụp của chủ nghĩa thực dân cũ", "Giải phóng hoàn toàn dân tộc Việt Nam", "Thành lập nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á", "Góp phần vào thắng lợi của phe Đồng minh"],
    correctAnswer: 0
    },
    {
    question: "Trong giai đoạn 1939-1945, Đảng chủ trương giải quyết vấn đề dân tộc trong khuôn khổ nào?",
    options: ["Toàn Đông Dương", "Từng nước ở Đông Dương", "Toàn thế giới", "Khu vực Đông Nam Á"],
    correctAnswer: 1
    },
    {
    question: "Chính sách 'dân tộc tự quyết' được Đảng đề ra trong giai đoạn 1939-1945 có nghĩa là gì?",
    options: ["Mỗi dân tộc tự quyết về vận mệnh của mình", "Dân tộc Việt Nam tự quyết vận mệnh", "Đảng tự quyết về vấn đề dân tộc", "Chính phủ tự quyết về vấn đề dân tộc"],
    correctAnswer: 0
    },
    {
    question: "Trong xây dựng Mặt trận Việt Minh, yếu tố nào được coi là 'cốt yếu hơn hết'?",
    options: ["Hiểu chủ nghĩa cộng sản", "Có tinh thần cứu quốc", "Có trình độ học vấn cao", "Xuất thân từ giai cấp công nông"],
    correctAnswer: 1
    },
    {
    question: "Hình thức nhà nước 'của chung cả toàn thể dân tộc' được Hội nghị Trung ương 8 (5/1941) xác định là gì?",
    options: ["Nhà nước chuyên chính vô sản", "Nhà nước dân chủ nhân dân", "Nhà nước Xô Viết", "Nhà nước quân chủ lập hiến"],
    correctAnswer: 1
    },
    {
    question: "Nhiệm vụ trung tâm của Đảng và nhân dân được xác định tại Hội nghị Trung ương 8 (5/1941) là gì?",
    options: ["Xây dựng lực lượng chính trị", "Phát triển kinh tế", "Chuẩn bị khởi nghĩa vũ trang toàn dân", "Đấu tranh ngoại giao"],
    correctAnswer: 2
    },
    {
    question: "Cuộc khởi nghĩa nào được xem là 'tiếng súng báo hiệu cho cuộc khởi nghĩa toàn quốc'?",
    options: ["Khởi nghĩa Yên Bái", "Khởi nghĩa Bắc Sơn", "Khởi nghĩa Nam Kỳ", "Khởi nghĩa Ba Tơ"],
    correctAnswer: 1
    },
    {
    question: "Trong lời kêu gọi đồng bào cả nước (6/6/1941), lãnh tụ Nguyễn Ái Quốc nhấn mạnh điều gì?",
    options: ["Quyền lợi giai cấp", "Quyền lợi dân tộc giải phóng", "Quyền lợi cá nhân", "Quyền lợi quốc tế"],
    correctAnswer: 1
    },
    {
    question: "Tuyên ngôn của Việt Minh (25/10/1941) đã đáp ứng nguyện vọng gì của đồng bào?",
    options: ["Độc lập dân tộc", "Dân chủ tự do", "Cải cách ruộng đất", "Hòa bình thế giới"],
    correctAnswer: 0
    },
    {
    question: "Trong các nhà tù đế quốc, chiến sĩ cách mạng đã sử dụng hình thức đấu tranh nào?",
    options: ["Bạo động vũ trang", "Biểu tình tuyệt thực", "Báo chí cách mạng", "Đấu tranh nghị trường"],
    correctAnswer: 2
    },
    {
    question: "Đề cương về văn hóa Việt Nam năm 1943 xác định văn hóa là một lĩnh vực nào?",
    options: ["Kinh tế", "Chính trị", "Trận địa cách mạng", "Xã hội"],
    correctAnswer: 2
    },
    {
    question: "Đảng Dân chủ Việt Nam (6/1944) tham gia vào mặt trận nào?",
    options: ["Mặt trận Liên Việt", "Mặt trận Tổ quốc", "Mặt trận Việt Minh", "Mặt trận Dân chủ"],
    correctAnswer: 2
    },
    {
    question: "Nguyên tắc tổ chức và hoạt động của Đội Việt Nam Tuyên truyền Giải phóng quân được xác định trong văn kiện nào?",
    options: ["Luận cương chính trị", "Chỉ thị thành lập Đội Việt Nam Tuyên truyền Giải phóng quân", "Tuyên ngôn của Việt Minh", "Quân lệnh số 1"],
    correctAnswer: 1
    },
    {
    question: "Chiến thắng Phai Khắt và Nà Ngân (12/1944) là của lực lượng nào?",
    options: ["Cứu quốc quân", "Du kích Bắc Sơn", "Việt Nam Giải phóng quân", "Việt Nam Tuyên truyền Giải phóng quân"],
    correctAnswer: 3
    },
    {
    question: "Đoàn của Tổng bộ Việt Minh liên lạc với Đồng minh ở Trung Quốc nhằm mục đích gì?",
    options: ["Xin viện trợ kinh tế", "Học tập kinh nghiệm", "Phối hợp chống Nhật", "Tìm kiếm vũ khí"],
    correctAnswer: 2
    },
    {
    question: "Hội nghị Đình Bảng (3/1945) được triệu tập ngay trước sự kiện nào?",
    options: ["Nhật đảo chính Pháp", "Cao trào kháng Nhật cứu nước", "Tổng khởi nghĩa tháng Tám", "Thành lập Khu giải phóng Việt Bắc"],
    correctAnswer: 0
    },
    {
    question: "Chính phủ Bảo Đại - Trần Trọng Kim được dựng lên bởi thế lực nào?",
    options: ["Pháp", "Nhật", "Mỹ", "Anh"],
    correctAnswer: 1
    },
    {
    question: "Trong chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta', khẩu hiệu 'Thành lập chính quyền cách mạng của nhân dân Đông Dương' nhằm chống lại chính phủ nào?",
    options: ["Chính phủ Pháp", "Chính phủ Nhật", "Chính phủ Bảo Đại - Trần Trọng Kim", "Cả Pháp và Nhật"],
    correctAnswer: 2
    },
    {
    question: "Cao trào kháng Nhật cứu nước được phát động bởi cơ quan nào?",
    options: ["Tổng bộ Việt Minh", "Ủy ban Khởi nghĩa toàn quốc", "Ban Thường vụ Trung ương Đảng", "Hội nghị toàn quốc của Đảng"],
    correctAnswer: 2
    },
    {
    question: "Chiến tranh du kích cục bộ và khởi nghĩa từng phần nổ ra mạnh mẽ nhất ở vùng nào trong cao trào kháng Nhật?",
    options: ["Nam Bộ", "Trung Bộ", "Thượng du và trung du Bắc Kỳ", "Tây Nguyên"],
    correctAnswer: 2
    },
    {
    question: "Đội du kích Ba Tơ được thành lập sau thắng lợi của cuộc khởi nghĩa nào?",
    options: ["Khởi nghĩa Bắc Sơn", "Khởi nghĩa Nam Kỳ", "Khởi nghĩa Ba Tơ", "Binh biến Đô Lương"],
    correctAnswer: 2
    },
    {
    question: "Ủy ban lâm thời Khu giải phóng hạ lệnh khởi nghĩa trong khu vào thời gian nào?",
    options: ["12/8/1945", "13/8/1945", "14/8/1945", "15/8/1945"],
    correctAnswer: 0
    },
    {
    question: "Hội nghị toàn quốc của Đảng (8/1945) họp ở địa điểm nào?",
    options: ["Cao Bằng", "Hà Nội", "Tân Trào", "Huế"],
    correctAnswer: 2
    },
    {
    question: "Khẩu hiệu đấu tranh được Hội nghị toàn quốc của Đảng (8/1945) xác định là gì?",
    options: ["Độc lập dân tộc", "Dân chủ tự do", "Ruộng đất cho dân cày", "Phản đối xâm lược! Hoàn toàn độc lập! Chính quyền nhân dân!"],
    correctAnswer: 3
    },
    {
    question: "Trong Tổng khởi nghĩa tháng Tám, địa phương nào giành chính quyền muộn nhất?",
    options: ["Hà Nội", "Huế", "Sài Gòn", "Quảng Nam"],
    correctAnswer: 2
    },
    {
    question: "Cuộc mít tinh ngày 17/8/1945 tại Hà Nội ban đầu được tổ chức bởi lực lượng nào?",
    options: ["Việt Minh", "Tổng hội viên chức", "Đảng Cộng sản", "Chính phủ Trần Trọng Kim"],
    correctAnswer: 1
    },
    {
    question: "Trong khởi nghĩa giành chính quyền ở Hà Nội, lực lượng nào đã ngả theo Việt Minh?",
    options: ["Quân Nhật", "Lính bảo an và cảnh sát", "Tri phủ, tri huyện", "Lý trưởng, chánh tổng"],
    correctAnswer: 1
    },
    {
    question: "Địa điểm nào được chọn làm lễ Tuyên bố độc lập của nước Việt Nam Dân chủ Cộng hòa?",
    options: ["Nhà hát thành phố Hà Nội", "Khu di tích Tân Trào", "Quảng trường Ba Đình", "Hoàng thành Huế"],
    correctAnswer: 2
    },
    {
    question: "Bản Tuyên ngôn độc lập khẳng định quyền của dân tộc Việt Nam là gì?",
    options: ["Quyền sống, quyền tự do, quyền mưu cầu hạnh phúc", "Quyền thống nhất đất nước", "Quyền xây dựng chủ nghĩa xã hội", "Quyền lãnh đạo của Đảng Cộng sản"],
    correctAnswer: 0
    },
    {
    question: "Cách mạng tháng Tám năm 1945 được đánh giá là một cuộc cách mạng như thế nào?",
    options: ["Cách mạng tư sản triệt để", "Cách mạng vô sản điển hình", "Cách mạng giải phóng dân tộc điển hình", "Cách mạng dân chủ tư sản kiểu mới"],
    correctAnswer: 2
    },
    {
    question: "Nhiệm vụ hàng đầu của Cách mạng tháng Tám là gì?",
    options: ["Xây dựng chính quyền dân chủ nhân dân", "Phát triển kinh tế", "Giải phóng dân tộc", "Cải cách ruộng đất"],
    correctAnswer: 2
    },
    {
    question: "Lực lượng cách mạng trong Cách mạng tháng Tám bao gồm những thành phần nào?",
    options: ["Công nhân, nông dân", "Công nhân, nông dân, trí thức", "Toàn dân tộc", "Giai cấp công nhân và nông dân"],
    correctAnswer: 2
    },
    {
    question: "Chính quyền nhà nước được thành lập sau Cách mạng tháng Tám mang tính chất gì?",
    options: ["Chuyên chính vô sản", "Dân chủ nhân dân", "Cộng hòa Xô Viết", "Quân chủ lập hiến"],
    correctAnswer: 1
    },
    {
    question: "Bài học kinh nghiệm quan trọng nhất về xây dựng lực lượng trong Cách mạng tháng Tám là gì?",
    options: ["Xây dựng quân đội chính quy", "Đoàn kết quốc tế", "Khơi dậy tinh thần dân tộc và đoàn kết toàn dân", "Phát triển kinh tế hậu phương"],
    correctAnswer: 2
    },
    {
    question: "Bài học kinh nghiệm về phương pháp cách mạng trong Cách mạng tháng Tám nhấn mạnh yếu tố nào?",
    options: ["Đấu tranh chính trị là chủ yếu", "Đấu tranh vũ trang là chủ yếu", "Kết hợp đấu tranh chính trị và vũ trang", "Đấu tranh ngoại giao là chủ yếu"],
    correctAnswer: 2
    },
    {
    question: "Vai trò lãnh đạo của Đảng Cộng sản Đông Dương trong Cách mạng tháng Tám được đánh giá như thế nào?",
    options: ["Không đáng kể", "Quan trọng nhưng không quyết định", "Quyết định thắng lợi của cách mạng", "Chỉ đóng vai trò hỗ trợ"],
    correctAnswer: 2
    },
    {
    question: "Cách mạng tháng Tám đã đánh dấu bước nhảy vọt vĩ đại trong quá trình tiến hóa của dân tộc, đó là bước nhảy vọt từ chế độ nào sang chế độ nào?",
    options: ["Từ phong kiến sang tư bản", "Từ thuộc địa sang độc lập, tự do", "Từ nô lệ sang tự do", "Từ phong kiến sang xã hội chủ nghĩa"],
    correctAnswer: 1
    },
    {
    question: "Trong Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa, Tổng Bí thư Trường Chinh đã có hành động gì thể hiện tinh thần vô tư?",
    options: ["Nhường chức Chủ tịch cho Hồ Chí Minh", "Tự nguyện rút khỏi Chính phủ", "Quyên góp tài sản cho cách mạng", "Đi đầu trong công tác tuyên truyền"],
    correctAnswer: 1
    },
    {
    question: "Trước khi quân Trung Hoa Dân Quốc vào Đông Dương, Trung ương Đảng và Chính phủ lâm thời đã ý thức được điều gì?",
    options: ["Cần hòa hoãn với Pháp", "Phải tranh thủ sự ủng hộ của Mỹ", "Phải xác lập vị thế người chủ đất nước", "Cần dựa vào Liên Xô"],
    correctAnswer: 2
    },
    {
    question: "Bản Tuyên ngôn độc lập được Hồ Chí Minh soạn thảo ở địa điểm nào tại Hà Nội?",
    options: ["Phủ Chủ tịch", "Nhà số 48 Hàng Ngang", "Văn phòng Trung ương Đảng", "Nhà khách Chính phủ"],
    correctAnswer: 1
    },
    {
    question: "Câu nói 'Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập' thể hiện điều gì?",
    options: ["Sự tàn khốc của chiến tranh", "Quyết tâm giành độc lập của dân tộc", "Sức mạnh của quân đội cách mạng", "Khó khăn của cuộc kháng chiến"],
    correctAnswer: 1
    }
    ];

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Could not load leaderboard:", error);
      setLeaderboard([]);
    }
  };

  // Load leaderboard on component mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, timeLeft]);

  // Start game function
  const startGame = () => {
    setGameState('playing');
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    const shuffled = shuffleArray([...questions]);
    setShuffledQuestions(shuffled);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
    
    // Check if the answer is correct
    if (answerIndex === shuffledQuestions[currentQuestion].correctAnswer) {
      // Award points based on remaining time
      const pointsEarned: number = Math.ceil(timeLeft * 10);
      setScore(prevScore => prevScore + pointsEarned);
    }

    // Move to next question or finish the game
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameState('finished');
      }
    }, 1000);
  };

  // Submit score to leaderboard
  const submitScore = async () => {
    if (playerName.trim() === '') {
      alert('Vui lòng nhập tên của bạn!');
      return;
    }
  
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName, score }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedLeaderboard = await response.json();
      if (!Array.isArray(updatedLeaderboard)) {
        throw new Error('Invalid leaderboard data received');
      }
      
      setLeaderboard(updatedLeaderboard);
      alert('Đã lưu điểm thành công!');
      setPlayerName('');
      setGameState('start');
      
    } catch (error) {
      console.error("Error submitting score:", error);
      alert('Có lỗi xảy ra khi lưu điểm: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-black text-white">
      {/* Main content area */}
      <div className="w-full md:w-2/3 flex flex-col p-2">
        {/* Header */}
        {/* <div className="mb-2 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Trò chơi Lịch sử Việt Nam</h1>
          <div className="h-1 w-32 bg-red-600 mx-auto"></div>
        </div> */}

        {/* Game container */}
        <div className="bg-gray-900 rounded-lg shadow-2xl flex-grow">
          {gameState === 'start' && (
            <div className="text-center flex flex-col h-full justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">Kiểm tra kiến thức</h2>
              <p className="mb-6 text-lg text-gray-300">Trả lời càng nhanh càng được nhiều điểm!</p>
              <button
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300"
                onClick={startGame}
              >
                Bắt đầu chơi
              </button>
            </div>
          )}

          {gameState === 'playing' && shuffledQuestions.length > 0 && (
            <div>
              <div className="flex justify-between mb-6 text-lg">
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  Câu hỏi: <span className="font-bold">{currentQuestion + 1}/{shuffledQuestions.length}</span>
                </div>
                <div className="bg-red-700 px-4 py-2 rounded-lg font-bold">
                  Thời gian: {timeLeft}s
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  Điểm: <span className="font-bold">{score}</span>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">{shuffledQuestions[currentQuestion].question}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {shuffledQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 rounded-lg text-left transition duration-300 ${
                        selectedAnswer === null 
                          ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                          : selectedAnswer === index
                            ? index === shuffledQuestions[currentQuestion].correctAnswer
                              ? 'bg-green-700 border border-green-500'
                              : 'bg-red-700 border border-red-500'
                            : index === shuffledQuestions[currentQuestion].correctAnswer
                              ? 'bg-green-700 border border-green-500'
                              : 'bg-gray-700 border border-gray-600'
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="text-center flex flex-col items-center h-full justify-center">
              <h1 className="text-3xl font-bold mb-2">Kết thúc!</h1>
              <p className="text-2xl mb-6">Điểm của bạn: <span className="text-red-500 font-bold">{score}</span></p>
              <div className="mb-6 w-full max-w-md">
                <label className="block text-lg mb-2 text-left">Nhập tên của bạn:</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 w-full text-white"
                  placeholder="Tên của bạn"
                />
              </div>
              <button
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                onClick={submitScore}
              >
                Lưu điểm
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full md:w-1/3 bg-gray-900 rounded-lg shadow-xl p-6 md:ml-4 mt-4 md:mt-0">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-500">Bảng xếp hạng</h2>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
        {leaderboard.length > 0 ? (
          <div className="overflow-y-auto max-h-96">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-red-800">
                  <th className="py-3">Hạng</th>
                  <th className="py-3 text-left">Tên</th>
                  <th className="py-3 text-right">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 10).map((player, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition duration-200">
                    <td className="py-3 text-center font-bold">
                      {index < 3 ? (
                        <span className={
                          index === 0 ? "text-yellow-500" : 
                          index === 1 ? "text-gray-400" : 
                          "text-amber-600"
                        }>
                          {index + 1}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="py-3">{player.name}</td>
                    <td className="py-3 text-right font-mono">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Chưa có người chơi nào</p>
        )}
      </div>
    </div>
  );
}
