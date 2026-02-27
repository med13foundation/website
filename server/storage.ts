import { type NewsletterSubscriber, type InsertNewsletterSubscriber, type Newsletter, type InsertNewsletter, newsletterSubscribers, newsletters } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Subscribers
  addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Newsletters
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  getNewsletter(id: string): Promise<Newsletter | undefined>;
  updateNewsletter(id: string, update: Partial<Newsletter>): Promise<Newsletter>;
}

export class DatabaseStorage implements IStorage {
  async addNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [existing] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, insertSubscriber.email));

    if (existing) {
      return existing;
    }

    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db.select().from(newsletterSubscribers);
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return await db.select().from(newsletters);
  }

  async getNewsletter(id: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.id, id));
    return newsletter;
  }

  async updateNewsletter(id: string, update: Partial<Newsletter>): Promise<Newsletter> {
    const [newsletter] = await db
      .update(newsletters)
      .set(update)
      .where(eq(newsletters.id, id))
      .returning();
    
    if (!newsletter) {
      throw new Error("Newsletter not found");
    }
    return newsletter;
  }
}

export const storage = new DatabaseStorage();
