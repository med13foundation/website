/**
 * 📌 Developer Note — Google Sheets Email Subscription Integration
 * 
 * This component connects the website's email subscription form to a Google Sheet
 * using a Google Apps Script Webhook.
 * 
 * 🔧 How it works:
 * - When a user enters their email and submits the form,
 *   JavaScript sends a POST request to the Google Apps Script endpoint:
 *   https://script.google.com/macros/s/AKfycbzn5L0TA2SgCbk674ZGVIqIRum--prhR499phsVf4DtVUTinkLmcrxlIDyCxSBRJD7r/exec
 * - The Apps Script receives the email and writes it to a Google Sheet
 *   (1 row per subscriber, including timestamp)
 * - We use `mode: "no-cors"` because Apps Script's public endpoints
 *   do not return standard CORS headers
 * 
 * 🛟 Notes for Integration:
 * - Do NOT change the endpoint unless a new Apps Script deployment is made
 * - The script prevents double submissions and gives user-friendly messages
 * - Since no-cors mode doesn't return readable response, we assume success if no error
 * - If the UI is redesigned, ensure functionality remains intact
 * 
 * 🚀 Purpose:
 * Allows us to collect newsletter subscribers directly into a Google Sheet
 * without needing a backend server, database, or API key management.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzn5L0TA2SgCbk674ZGVIqIRum--prhR499phsVf4DtVUTinkLmcrxlIDyCxSBRJD7r/exec";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our monthly newsletter with research updates and community news.",
      });
      setEmail("");
    } catch (error) {
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
