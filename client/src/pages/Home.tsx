import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MissionSummary from "@/components/MissionSummary";
import SyndromeVideo from "@/components/SyndromeVideo";
import FeaturedEventsPreview from "@/components/FeaturedEventsPreview";
import StarOfMonthCarousel from "@/components/StarOfMonthCarousel";
import GetInvolvedPreview from "@/components/GetInvolvedPreview";
import NewsletterSection from "@/components/NewsletterSection";
import ClassyDonation from "@/components/ClassyDonation";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) return;

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      const target = document.getElementById(window.location.hash.slice(1));

      if (target) {
        const targetTop = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo(0, Math.max(0, targetTop));
        window.clearInterval(intervalId);
      } else if (attempts >= 20) {
        window.clearInterval(intervalId);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <MissionSummary />
        <SyndromeVideo />
        <StarOfMonthCarousel />
        <FeaturedEventsPreview />
        <GetInvolvedPreview />
        <ClassyDonation />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
