/**
 * 📌 Developer Note — Google Sheets Email Subscription Integration
 * 
 * This component connects the website's email subscription form to a Google Sheet
 * via our backend server (to avoid CORS issues).
 * 
 * 🔧 How it works:
 * - Frontend sends POST to /api/newsletter/subscribe with { email }
 * - Backend validates the email and forwards it to Google Apps Script
 * - Apps Script writes the email to a Google Sheet
 * - Backend also stores subscriber locally for backup
 * 
 * 📐 Apps Script should read the email like this:
 *   function doPost(e) {
 *     const data = JSON.parse(e.postData.contents);
 *     const email = data.email;
 *     // ... write to sheet
 *   }
 * 
 * 🛟 Notes for Integration:
 * - To update the Google Script URL, modify GOOGLE_SCRIPT_URL in server/routes.ts
 * - The script prevents double submissions and gives user-friendly messages
 * - If the UI is redesigned, ensure functionality remains intact
 * 
 * 🚀 Purpose:
 * Allows us to collect newsletter subscribers directly into a Google Sheet
 * using our backend server as a proxy to avoid CORS issues.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      console.log("Subscription result:", result);
      
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our monthly newsletter with research updates and community news.",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4" data-testid="text-newsletter-title">
          Stay Informed
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Subscribe to our monthly newsletter for research progress, family stories, and community events
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-primary-foreground text-foreground"
            data-testid="input-newsletter-email"
          />
          <Button 
            type="submit" 
            variant="secondary"
            disabled={isSubmitting}
            data-testid="button-newsletter-submit"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
