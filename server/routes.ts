import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./chatbot";
import { insertEventSchema } from "@shared/schema";
import { z } from "zod";

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

  // Admin Routes
  app.post("/api/events", async (req, res) => {
    try {
      const event = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(event);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
        return;
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    try {
      const event = insertEventSchema.parse(req.body);
      const updatedEvent = await storage.updateEvent(parseInt(req.params.id), event);
      if (!updatedEvent) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
        return;
      }
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    const deleted = await storage.deleteEvent(parseInt(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(204).send();
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