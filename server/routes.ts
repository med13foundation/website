import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertNewsletterSchema } from "@shared/schema";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI-YqFimBUMSKaSerTOYlhabtzygy7P2ZvtICm9elO221HFAR-dM8B7Bn9sVCDbW81/exec";

const SITE_URL = "https://med13.org";

const ADMIN_PASSWORD = "admins";

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = authHeader.slice(7);
  if (token !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Invalid credentials" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.get("/robots.txt", (_req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // Public: Newsletter Subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ email: validatedData.email }),
          redirect: "follow",
        });
      } catch (e) {
        console.error("Google Sheets sync failed", e);
      }
      const subscriber = await storage.addNewsletterSubscriber(validatedData);
      res.json({ success: true, subscriber });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  // Admin: Auth check
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: ADMIN_PASSWORD });
    } else {
      res.status(403).json({ error: "Invalid password" });
    }
  });

  // Admin: Subscribers
  app.get("/api/admin/subscribers", requireAdminAuth, async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json({ subscribers });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve subscribers" });
    }
  });

  app.delete("/api/admin/subscribers/:id", requireAdminAuth, async (req, res) => {
    try {
      await storage.deleteSubscriber(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subscriber" });
    }
  });

  // Admin: Newsletters
  app.get("/api/admin/newsletters", requireAdminAuth, async (_req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json({ newsletters });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newsletters" });
    }
  });

  app.post("/api/admin/newsletters", requireAdminAuth, async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      res.json({ success: true, newsletter });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create newsletter" });
      }
    }
  });

  app.patch("/api/admin/newsletters/:id", requireAdminAuth, async (req, res) => {
    try {
      const allowedFields: Record<string, boolean> = { title: true, content: true, status: true, sentAt: true };
      const sanitized: Record<string, any> = {};
      for (const key of Object.keys(req.body)) {
        if (allowedFields[key]) {
          sanitized[key] = req.body[key];
        }
      }
      if (sanitized.status && !["draft", "sent"].includes(sanitized.status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
      if (sanitized.sentAt && typeof sanitized.sentAt === "string") {
        sanitized.sentAt = new Date(sanitized.sentAt);
      }
      const newsletter = await storage.updateNewsletter(req.params.id, sanitized);
      res.json({ success: true, newsletter });
    } catch (error) {
      res.status(500).json({ error: "Failed to update newsletter" });
    }
  });

  app.delete("/api/admin/newsletters/:id", requireAdminAuth, async (req, res) => {
    try {
      await storage.deleteNewsletter(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete newsletter" });
    }
  });

  // Public: View a single published newsletter
  app.get("/api/public/newsletters/:id", async (req, res) => {
    try {
      const newsletter = await storage.getNewsletter(req.params.id);
      if (!newsletter || newsletter.status !== "sent") {
        return res.status(404).json({ error: "Newsletter not found" });
      }
      res.json({ newsletter });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
