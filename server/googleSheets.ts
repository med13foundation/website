import { ReplitConnectors } from "@replit/connectors-sdk";
import { storage } from "./storage";

const SPREADSHEET_ID = "1lSQgdu8YmOeY9LSxWyhvawStBwWusOsZDOjzBcfFADM";

export async function syncSubscribersFromSheet(): Promise<{
  imported: number;
  skipped: number;
  errors: string[];
}> {
  const connectors = new ReplitConnectors();

  const response = await connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1`,
    { method: "GET" }
  );
  const data = await response.json();

  if (!data.values || data.values.length < 2) {
    return { imported: 0, skipped: 0, errors: ["No data found in spreadsheet"] };
  }

  const headers = data.values[0] as string[];
  const emailColIndex = headers.findIndex(
    (h: string) => h.toLowerCase().trim() === "email"
  );
  if (emailColIndex === -1) {
    return { imported: 0, skipped: 0, errors: ["No 'email' column found in spreadsheet"] };
  }

  const rows = data.values.slice(1) as string[][];
  const seenEmails = new Set<string>();
  const uniqueEmails: string[] = [];

  for (const row of rows) {
    const email = row[emailColIndex]?.trim().toLowerCase();
    if (email && !seenEmails.has(email)) {
      seenEmails.add(email);
      uniqueEmails.push(email);
    }
  }

  const existingSubscribers = await storage.getNewsletterSubscribers();
  const existingEmails = new Set(
    existingSubscribers.map((s) => s.email.toLowerCase())
  );

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const email of uniqueEmails) {
    if (existingEmails.has(email)) {
      skipped++;
      continue;
    }
    try {
      await storage.addNewsletterSubscriber({ email });
      imported++;
    } catch (err: any) {
      errors.push(`Failed to import ${email}: ${err.message}`);
    }
  }

  return { imported, skipped, errors };
}
