import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MissionSummary from "@/components/MissionSummary";
import QuickFacts from "@/components/QuickFacts";
import FeaturedEventsPreview from "@/components/FeaturedEventsPreview";
import GetInvolvedPreview from "@/components/GetInvolvedPreview";
import NewsletterSection from "@/components/NewsletterSection";
import ClassyDonation from "@/components/ClassyDonation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <MissionSummary />
      <QuickFacts />
      <FeaturedEventsPreview />
      <GetInvolvedPreview />
      <ClassyDonation />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
