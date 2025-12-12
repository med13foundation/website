import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI-YqFimBUMSKaSerTOYlhabtzygy7P2ZvtICm9elO221HFAR-dM8B7Bn9sVCDbW81/exec";

const SITE_URL = "https://med13.org";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sitemap.xml for SEO
  app.get("/sitemap.xml", (_req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Robots.txt for search engine crawling
  app.get("/robots.txt", (_req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

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
      if (error.name === "ZodError") {
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
