import { HistoricalEvent, InsertEvent, ChatMessage } from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<HistoricalEvent[]>;
  getEventById(id: number): Promise<HistoricalEvent | undefined>;
  getEventsByCategory(category: string): Promise<HistoricalEvent[]>;
  createEvent(event: InsertEvent): Promise<HistoricalEvent>;
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
        title: "Đảng Cộng sản Việt Nam ra đời",
        date: "1930",
        description: "Sự kiện quan trọng đánh dấu bước ngoặt trong lịch sử cách mạng Việt Nam",
        imageUrl: "https://example.com/founding.jpg",
        category: "pre-revolution",
        order: 1
      },
      // Add more default events...
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
    const newEvent: HistoricalEvent = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
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
