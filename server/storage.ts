import { type NewsletterSubscriber, type InsertNewsletterSubscriber, type Newsletter, type InsertNewsletter, type InsertSymposiumRegistration, type SymposiumRegistration, newsletterSubscribers, newsletters, symposiumRegistrations } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Subscribers
  addNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  removeSubscriberByEmail(email: string): Promise<void>;
  
  // Newsletters
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  getNewsletter(id: string): Promise<Newsletter | undefined>;
  updateNewsletter(id: string, update: Partial<Newsletter>): Promise<Newsletter>;
  deleteNewsletter(id: string): Promise<void>;
  deleteSubscriber(id: string): Promise<void>;
  addSymposiumRegistration(registration: InsertSymposiumRegistration): Promise<SymposiumRegistration>;
}

export class DatabaseStorage implements IStorage {
  async addSymposiumRegistration(registration: InsertSymposiumRegistration): Promise<SymposiumRegistration> {
    const normalizedEmail = registration.email.toLowerCase();
    const [saved] = await db
      .insert(symposiumRegistrations)
      .values({ ...registration, email: normalizedEmail })
      .onConflictDoUpdate({
        target: symposiumRegistrations.email,
        set: { name: registration.name },
      })
      .returning();
    return saved;
  }

  async addNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const normalizedEmail = insertSubscriber.email.toLowerCase();
    const [existing] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, normalizedEmail));

    if (existing) {
      return existing;
    }

    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({ ...insertSubscriber, email: normalizedEmail })
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
  async deleteNewsletter(id: string): Promise<void> {
    await db.delete(newsletters).where(eq(newsletters.id, id));
  }

  async deleteSubscriber(id: string): Promise<void> {
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
  }

  async removeSubscriberByEmail(email: string): Promise<void> {
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, email.toLowerCase()));
  }
}

export const storage = new DatabaseStorage();
