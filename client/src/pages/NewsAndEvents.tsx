import Navigation from "@/components/Navigation";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export default function NewsAndEvents() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}