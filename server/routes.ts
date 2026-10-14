import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertNewsletterSchema, insertSymposiumRegistrationSchema } from "@shared/schema";
import { sendNewsletterEmail, sendNewsletterBatch, sendTestEmail } from "./email";
import { syncSubscribersFromSheet } from "./googleSheets";
import { buildLlmsTxt, buildSitemapXml, SITE_URL } from "@shared/route-metadata";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzI-YqFimBUMSKaSerTOYlhabtzygy7P2ZvtICm9elO221HFAR-dM8B7Bn9sVCDbW81/exec";

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
    res.header("Content-Type", "application/xml");
    res.send(buildSitemapXml());
  });

  app.get("/llms.txt", (_req, res) => {
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(buildLlmsTxt());
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

  app.post("/api/symposium/register", async (req, res) => {
    try {
      const registration = insertSymposiumRegistrationSchema.parse(req.body);
      await storage.addSymposiumRegistration(registration);
      res.json({ success: true });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Symposium registration failed", error);
        res.status(500).json({ error: "Failed to register" });
      }
    }
  });

  // Public: Unsubscribe
  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required" });
      }
      await storage.removeSubscriberByEmail(email);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to unsubscribe" });
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

  app.post("/api/admin/subscribers/sync", requireAdminAuth, async (_req, res) => {
    try {
      const result = await syncSubscribersFromSheet();
      res.json({ success: true, ...result });
    } catch (error: any) {
      console.error("Google Sheets sync error:", error);
      res.status(500).json({ error: "Failed to sync from Google Sheets" });
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

  // Admin: Duplicate newsletter
  app.post("/api/admin/newsletters/:id/duplicate", requireAdminAuth, async (req, res) => {
    try {
      const original = await storage.getNewsletter(req.params.id);
      if (!original) {
        return res.status(404).json({ error: "Newsletter not found" });
      }
      const duplicate = await storage.createNewsletter({
        title: `${original.title} (Copy)`,
        content: original.content,
      });
      res.json({ success: true, newsletter: duplicate });
    } catch (error) {
      res.status(500).json({ error: "Failed to duplicate newsletter" });
    }
  });

  // Admin: Send test email
  app.post("/api/admin/newsletters/:id/test-email", requireAdminAuth, async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email address is required" });
      }
      const newsletter = await storage.getNewsletter(req.params.id);
      if (!newsletter) {
        return res.status(404).json({ error: "Newsletter not found" });
      }
      const result = await sendTestEmail({
        to: email,
        subject: newsletter.title,
        html: newsletter.content,
        newsletterId: newsletter.id,
      });
      if (!result.success) {
        return res.status(500).json({ error: "Email delivery failed" });
      }
      res.json({ success: true, id: result.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to send test email" });
    }
  });

  app.patch("/api/admin/newsletters/:id", requireAdminAuth, async (req, res) => {
    try {
      const existing = await storage.getNewsletter(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "Newsletter not found" });
      }

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
      
      const isNewSend = sanitized.status === "sent" && existing.status === "draft";
      if (isNewSend) {
        const subscribers = await storage.getNewsletterSubscribers();
        sendNewsletterBatch({
          subscribers,
          subject: newsletter.title,
          html: newsletter.content,
          newsletterId: newsletter.id,
        }).then(result => {
          console.log(`Newsletter "${newsletter.title}" sent: ${result.sent} delivered, ${result.failed} failed`);
          if (result.errors.length > 0) {
            console.log("Send errors:", result.errors.slice(0, 10));
          }
        }).catch(err => console.error("Batch email sending failed:", err));
      }

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

  app.get("/api/public/newsletters", async (_req, res) => {
    try {
      const allNewsletters = await storage.getNewsletters();
      const published = allNewsletters
        .filter((nl) => nl.status === "sent")
        .map((nl) => ({ id: nl.id, title: nl.title, sentAt: nl.sentAt }));
      res.json({ newsletters: published });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch newsletters" });
    }
  });

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
