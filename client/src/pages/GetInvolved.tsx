import Navigation from "@/components/Navigation";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import Footer from "@/components/Footer";

export default function GetInvolved() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <GetInvolvedSection donationHref="/#donate" />
      </main>
      <Footer />
    </div>
  );
}