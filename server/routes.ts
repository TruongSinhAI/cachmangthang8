import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./chatbot";
import { insertEventSchema, insertContentSchema } from "@shared/schema";
import { z } from "zod";
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  const leaderboardPath ='./server/leaderboard.json';

  // GET leaderboard endpoint
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const data = await readFile(leaderboardPath, 'utf-8');
      const leaderboard = JSON.parse(data);
      res.json(leaderboard.players);
    } catch (error) {
      console.error("Error reading leaderboard:", error);
      res.status(500).json([]); // Return an empty array on error
    }
  });

  // POST leaderboard endpoint (submit score)
  app.post("/api/leaderboard", async (req, res) => {
    try {
      const { name, score } = req.body;
      console.log(name, score);
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      if (!name || typeof score !== 'number') {
        return res.status(400).json({ message: "Invalid data" });
      }
  
      const data = await readFile(leaderboardPath, 'utf-8');
      const leaderboard = JSON.parse(data);
      
      leaderboard.players.push({ name, score });
      interface Player {
        name: string;
        score: number;
      }
      leaderboard.players = leaderboard.players.slice(0, 10);
  
      await writeFile(leaderboardPath, JSON.stringify(leaderboard, null, 2));
      res.json(leaderboard.players);
    } catch (error) {
      console.error("Error saving score:", error);
      res.status(500).json({ message: "Failed to save score" });
    }
  });
  

  // // Other endpoints remain unchanged...

  // app.get("/api/events", async (_req, res) => {
  //   const events = await storage.getEvents();
  //   res.json(events);
  // });

  // app.get("/api/events/:id", async (req, res) => {
  //   const event = await storage.getEventById(parseInt(req.params.id));
  //   if (!event) {
  //     res.status(404).json({ message: "Event not found" });
  //     return;
  //   }
  //   res.json(event);
  // });

  // app.get("/api/events/category/:category", async (req, res) => {
  //   const events = await storage.getEventsByCategory(req.params.category);
  //   res.json(events);
  // });

  // // Admin Routes
  // app.post("/api/events", async (req, res) => {
  //   try {
  //     const event = insertEventSchema.parse(req.body);
  //     const newEvent = await storage.createEvent(event);
  //     res.status(201).json(newEvent);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       res.status(400).json({ message: "Invalid event data", errors: error.errors });
  //       return;
  //     }
  //     res.status(500).json({ message: "Failed to create event" });
  //   }
  // });

  // app.put("/api/events/:id", async (req, res) => {
  //   try {
  //     const event = insertEventSchema.parse(req.body);
  //     const updatedEvent = await storage.updateEvent(parseInt(req.params.id), event);
  //     if (!updatedEvent) {
  //       res.status(404).json({ message: "Event not found" });
  //       return;
  //     }
  //     res.json(updatedEvent);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       res.status(400).json({ message: "Invalid event data", errors: error.errors });
  //       return;
  //     }
  //     res.status(500).json({ message: "Failed to update event" });
  //   }
  // });

  // app.delete("/api/events/:id", async (req, res) => {
  //   const deleted = await storage.deleteEvent(parseInt(req.params.id));
  //   if (!deleted) {
  //     res.status(404).json({ message: "Event not found" });
  //     return;
  //   }
  //   res.status(204).send();
  // });

  // // Content Routes
  // app.get("/api/contents", async (_req, res) => {
  //   const contents = await storage.getContents();
  //   res.json(contents);
  // });

  // app.get("/api/contents/:id", async (req, res) => {
  //   const content = await storage.getContentById(parseInt(req.params.id));
  //   if (!content) {
  //     res.status(404).json({ message: "Content not found" });
  //     return;
  //   }
  //   res.json(content);
  // });

  // app.get("/api/contents/type/:type", async (req, res) => {
  //   const contents = await storage.getContentsByType(req.params.type);
  //   res.json(contents);
  // });

  // app.post("/api/contents", async (req, res) => {
  //   try {
  //     const content = insertContentSchema.parse(req.body);
  //     const newContent = await storage.createContent(content);
  //     res.status(201).json(newContent);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       res.status(400).json({ message: "Invalid content data", errors: error.errors });
  //       return;
  //     }
  //     res.status(500).json({ message: "Failed to create content" });
  //   }
  // });

  // app.put("/api/contents/:id", async (req, res) => {
  //   try {
  //     const content = insertContentSchema.parse(req.body);
  //     const updatedContent = await storage.updateContent(parseInt(req.params.id), content);
  //     if (!updatedContent) {
  //       res.status(404).json({ message: "Content not found" });
  //       return;
  //     }
  //     res.json(updatedContent);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       res.status(400).json({ message: "Invalid content data", errors: error.errors });
  //       return;
  //     }
  //     res.status(500).json({ message: "Failed to update content" });
  //   }
  // });

  // app.delete("/api/contents/:id", async (req, res) => {
  //   const deleted = await storage.deleteContent(parseInt(req.params.id));
  //   if (!deleted) {
  //     res.status(404).json({ message: "Content not found" });
  //     return;
  //   }
  //   res.status(204).send();
  // });

  app.post("/api/chat", async (req, res) => {
    const { question, history, mode } = req.body;
    if (!question) {
      res.status(400).json({ message: "Question is required" });
      return;
    }
  
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  
    try {
      for await (const chunk of generateChatResponse(question, history || [], mode)) {
        res.write(chunk);
      }
    } catch (error) {
      console.error("Streaming error:", error);
      res.write("Lỗi khi lấy dữ liệu.");
    } finally {
      res.end();
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
