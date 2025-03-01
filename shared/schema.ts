import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const historicalEvents = pgTable("historical_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  context: text("context").notNull(),
  significant: text("significance").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // pre-revolution, revolution, post-revolution
  order: integer("order"), // Making order optional as it's not in the static data
});

export const insertEventSchema = createInsertSchema(historicalEvents).pick({
  title: true,
  date: true,
  description: true,
  context: true,
  significant: true,
  imageUrl: true,
  category: true,
  order: true, // Keeping order in insert schema as it might be used for DB inserts
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type HistoricalEvent = typeof historicalEvents.$inferSelect;

export const historicalContent = pgTable("historical_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // context, process, significance
  imageUrl: text("image_url"),
  order: integer("order").notNull(),
});

export const insertContentSchema = createInsertSchema(historicalContent).pick({
  title: true,
  content: true,
  type: true,
  imageUrl: true,
  order: true,
});

export type InsertContent = z.infer<typeof insertContentSchema>;
export type HistoricalContent = typeof historicalContent.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;