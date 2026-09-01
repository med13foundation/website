import Navigation from "@/components/Navigation";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function NewsAndEvents() {
  useEffect(() => {
    let intervalId: number | undefined;

    const alignHashTarget = () => {
      if (intervalId) window.clearInterval(intervalId);
      if (!window.location.hash) return;

      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }

      let attempts = 0;
      let stablePasses = 0;
      intervalId = window.setInterval(() => {
        attempts += 1;
        const target = document.getElementById(id);

        if (target) {
          const headerOffset = 72;
          const currentTop = target.getBoundingClientRect().top;

          if (Math.abs(currentTop - headerOffset) > 2) {
            const targetTop = currentTop + window.scrollY - headerOffset;
            window.scrollTo(0, Math.max(0, targetTop));
            stablePasses = 0;
          } else {
            stablePasses += 1;
          }
        }

        if (stablePasses >= 5 || attempts >= 50) {
          if (intervalId) window.clearInterval(intervalId);
        }
      }, 100);
    };

    alignHashTarget();
    window.addEventListener("hashchange", alignHashTarget);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      window.removeEventListener("hashchange", alignHashTarget);
    };
  }, []);

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