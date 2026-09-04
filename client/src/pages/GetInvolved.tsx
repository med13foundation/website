import Navigation from "@/components/Navigation";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import Footer from "@/components/Footer";
import { CLASSY_DONATION_URL } from "@/lib/links";

export default function GetInvolved() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <GetInvolvedSection donationHref={CLASSY_DONATION_URL} />
      </main>
      <Footer />
    </div>
  );
}