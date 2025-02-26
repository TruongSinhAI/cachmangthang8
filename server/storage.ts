import { HistoricalEvent, InsertEvent, ChatMessage } from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<HistoricalEvent[]>;
  getEventById(id: number): Promise<HistoricalEvent | undefined>;
  getEventsByCategory(category: string): Promise<HistoricalEvent[]>;
  createEvent(event: InsertEvent): Promise<HistoricalEvent>;
  updateEvent(id: number, event: InsertEvent): Promise<HistoricalEvent | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  saveChatMessage(question: string, answer: string): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private events: Map<number, HistoricalEvent>;
  private chatMessages: ChatMessage[];
  private currentEventId: number;
  private currentChatId: number;

  constructor() {
    this.events = new Map();
    this.chatMessages = [];
    this.currentEventId = 1;
    this.currentChatId = 1;
    this.initializeDefaultEvents();
  }

  private initializeDefaultEvents() {
    const defaultEvents: InsertEvent[] = [
      {
        title: "Thành lập Đảng Cộng sản Việt Nam",
        date: "3/2/1930",
        description: "Hội nghị hợp nhất các tổ chức cộng sản ở Việt Nam do đồng chí Nguyễn Ái Quốc chủ trì tại Cửu Long, Hương Cảng. Hội nghị đã thông qua Chánh cương vắn tắt, Sách lược vắn tắt, Điều lệ vắn tắt của Đảng, quyết định hợp nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.",
        imageUrl: null,
        category: "pre-revolution",
        order: 1
      },
      {
        title: "Cương lĩnh chính trị đầu tiên của Đảng",
        date: "2/1930",
        description: "Hội nghị thành lập Đảng Cộng sản Việt Nam đã thông qua Cương lĩnh chính trị đầu tiên của Đảng do Nguyễn Ái Quốc soạn thảo. Cương lĩnh bao gồm Chánh cương vắn tắt, Sách lược vắn tắt và Điều lệ vắn tắt.",
        imageUrl: null,
        category: "revolution",
        order: 2
      },
      {
        title: "Phong trào cách mạng 1930 - 1931 và Xô Viết Nghệ Tĩnh",
        date: "1930-1931",
        description: "Phong trào cách mạng 1930 - 1931 bùng nổ mạnh mẽ trên cả nước, đỉnh cao là Xô Viết Nghệ Tĩnh ở Nghệ An và Hà Tĩnh. Phong trào thể hiện tinh thần đấu tranh anh dũng của quần chúng nhân dân, dưới sự lãnh đạo của Đảng.",
        imageUrl: null,
        category: "revolution",
        order: 3
      },
      {
        title: "Luận cương chính trị tháng 10 năm 1930",
        date: "10/1930",
        description: "Hội nghị lần thứ nhất Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam đã thông qua Luận cương chính trị do đồng chí Trần Phú soạn thảo.",
        imageUrl: null,
        category: "revolution",
        order: 4
      },
      {
        title: "Đại hội lần thứ I của Đảng",
        date: "3/1935",
        description: "Đại hội lần thứ I của Đảng Cộng sản Đông Dương được tổ chức tại Ma Cao (Trung Quốc). Đại hội đã kiểm điểm tình hình và đề ra nhiệm vụ cụ thể cho cách mạng Đông Dương.",
        imageUrl: null,
        category: "revolution",
        order: 5
      },
      {
        title: "Phong trào dân chủ 1936 - 1939",
        date: "1936-1939",
        description: "Phong trào dân chủ 1936 - 1939 là một cao trào cách mạng rộng lớn, dưới sự lãnh đạo của Đảng Cộng sản Đông Dương, đấu tranh đòi các quyền tự do, dân sinh, dân chủ.",
        imageUrl: null,
        category: "revolution",
        order: 6
      },
      {
        title: "Hội nghị Trung ương 8",
        date: "5/1941",
        description: "Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng họp tại Pác Bó (Cao Bằng) dưới sự chủ trì của Nguyễn Ái Quốc. Hội nghị đã quyết định chuyển hướng chỉ đạo chiến lược, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
        imageUrl: null,
        category: "revolution",
        order: 7
      },
      {
        title: "Cao trào kháng Nhật cứu nước",
        date: "1943-1945",
        description: "Cao trào kháng Nhật cứu nước là giai đoạn cách mạng phát triển mạnh mẽ, trực tiếp chuẩn bị cho Tổng khởi nghĩa Tháng Tám năm 1945.",
        imageUrl: null,
        category: "revolution",
        order: 8
      },
      {
        title: "Tổng khởi nghĩa Tháng Tám năm 1945",
        date: "8/1945",
        description: "Tổng khởi nghĩa Tháng Tám năm 1945 là cuộc cách mạng vĩ đại do Đảng Cộng sản Việt Nam lãnh đạo, nhân dân ta đã vùng lên giành chính quyền trong cả nước, thành lập nước Việt Nam Dân chủ Cộng hòa.",
        imageUrl: null,
        category: "revolution",
        order: 9
      },
      {
        title: "Tuyên ngôn Độc lập",
        date: "2/9/1945",
        description: "Tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời đọc Tuyên ngôn Độc lập, trịnh trọng tuyên bố trước quốc dân và thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
        imageUrl: null,
        category: "post-revolution",
        order: 10
      }
    ];

    defaultEvents.forEach(event => this.createEvent(event));
  }

  async getEvents(): Promise<HistoricalEvent[]> {
    return Array.from(this.events.values()).sort((a, b) => a.order - b.order);
  }

  async getEventById(id: number): Promise<HistoricalEvent | undefined> {
    return this.events.get(id);
  }

  async getEventsByCategory(category: string): Promise<HistoricalEvent[]> {
    return Array.from(this.events.values())
      .filter(event => event.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createEvent(event: InsertEvent): Promise<HistoricalEvent> {
    const id = this.currentEventId++;
    const newEvent: HistoricalEvent = { ...event, id, imageUrl: event.imageUrl || null };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: number, event: InsertEvent): Promise<HistoricalEvent | undefined> {
    if (!this.events.has(id)) {
      return undefined;
    }
    const updatedEvent: HistoricalEvent = { ...event, id, imageUrl: event.imageUrl || null };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  async saveChatMessage(question: string, answer: string): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: this.currentChatId++,
      question,
      answer,
      timestamp: new Date()
    };
    this.chatMessages.push(message);
    return message;
  }
}

export const storage = new MemStorage();