import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzn5L0TA2SgCbk674ZGVIqIRum--prhR499phsVf4DtVUTinkLmcrxlIDyCxSBRJD7r/exec";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ email: validatedData.email }),
        redirect: "follow",
      });
      
      const result = await response.text();
      console.log("Google Sheets response:", result);
      
      const subscriber = await storage.addNewsletterSubscriber(validatedData);
      res.json({ success: true, subscriber, googleSheetsResponse: result });
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }
    }
  });

  app.get("/api/newsletter/subscribers", async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json({ subscribers });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve subscribers" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
