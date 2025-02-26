import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const historicalEvents = pgTable("historical_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // pre-revolution, revolution, post-revolution
  order: integer("order").notNull(),
});

export const insertEventSchema = createInsertSchema(historicalEvents).pick({
  title: true,
  date: true,
  description: true,
  imageUrl: true,
  category: true,
  order: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type HistoricalEvent = typeof historicalEvents.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
