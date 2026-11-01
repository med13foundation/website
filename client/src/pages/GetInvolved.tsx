import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import Footer from "@/components/Footer";
import { CLASSY_DONATION_URL } from "@/lib/links";

export default function GetInvolved() {
  useEffect(() => {
    if (window.location.hash !== "#research-cohort") return;
    const frameId = window.requestAnimationFrame(() => {
      document.getElementById("research-cohort")?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <GetInvolvedSection donationHref={CLASSY_DONATION_URL} />
      </main>
      <Footer />
    </div>
  );
}