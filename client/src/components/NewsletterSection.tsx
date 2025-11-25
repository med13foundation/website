/**
 * 📌 Developer Note — Email Subscription Integration
 * 
 * This component connects the website's email subscription form to the backend API
 * which handles subscriber management and storage.
 * 
 * 🔧 How it works:
 * - When a user enters their email and submits the form,
 *   a POST request is sent to `/api/newsletter/subscribe`
 * - The backend validates the email and stores it in the database
 * - Users receive toast notifications for success or error feedback
 * - The form resets after successful subscription
 * 
 * 🛟 Notes for Integration:
 * - Uses React Query mutations for API communication
 * - Email validation happens both client-side (HTML5) and server-side
 * - Toast notifications provide user-friendly feedback
 * - Loading state prevents double submissions (button shows "Subscribing...")
 * - Component styling uses Tailwind CSS with primary color theme
 * 
 * 📐 Component API:
 * - No props required
 * - Manages its own state (email input, loading state)
 * - Displays within a primary-colored section with white text
 * - Responsive layout: single column on mobile, flex row on desktop
 * 
 * 🚀 Purpose:
 * Allows users to subscribe to the MED13 Foundation newsletter for research updates,
 * family stories, and community events.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/newsletter/subscribe', { email });
    },
    onSuccess: () => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our monthly newsletter with research updates and community news.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate(email);
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
            disabled={subscribeMutation.isPending}
            data-testid="button-newsletter-submit"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
