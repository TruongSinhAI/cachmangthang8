import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./chatbot";
import { insertEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEventById(parseInt(req.params.id));
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  });

  app.get("/api/events/category/:category", async (req, res) => {
    const events = await storage.getEventsByCategory(req.params.category);
    res.json(events);
  });

  app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    if (!question) {
      res.status(400).json({ message: "Question is required" });
      return;
    }

    const answer = await generateChatResponse(question);
    const message = await storage.saveChatMessage(question, answer);
    res.json(message);
  });

  const httpServer = createServer(app);
  return httpServer;
}
