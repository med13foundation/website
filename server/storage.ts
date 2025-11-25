import { type NewsletterSubscriber, type InsertNewsletterSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";
import * as fs from "fs";
import * as path from "path";

export interface IStorage {
  addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
}

export class MemStorage implements IStorage {
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;

  constructor() {
    this.newsletterSubscribers = new Map();
  }

  async addNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      (sub) => sub.email === insertSubscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }

    const id = randomUUID();
    const subscriber: NewsletterSubscriber = {
      id,
      email: insertSubscriber.email,
      subscribedAt: new Date(),
    };
    this.newsletterSubscribers.set(id, subscriber);
    
    // Log new subscriber
    this.logNewSubscriber(subscriber);
    
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  private logNewSubscriber(subscriber: NewsletterSubscriber): void {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] New newsletter subscriber: ${subscriber.email}`;
    
    // Log to console
    console.log("📧 " + message);
    
    // Log to file
    try {
      const logFile = path.join(process.cwd(), "newsletter-subscribers.log");
      fs.appendFileSync(logFile, message + "\n", "utf-8");
    } catch (error) {
      console.error("Failed to write to log file:", error);
    }
  }
}

export const storage = new MemStorage();
