import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import DonationSection from "@/components/DonationSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import RoadmapSection from "@/components/RoadmapSection";
import EventsSection from "@/components/EventsSection";
import QuickFacts from "@/components/QuickFacts";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DonationSection />
      <AboutSection />
      <GetInvolvedSection />
      <RoadmapSection />
      <EventsSection />
      <QuickFacts />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
