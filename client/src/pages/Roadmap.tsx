import Navigation from "@/components/Navigation";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}