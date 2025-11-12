import { useEffect } from "react";

export default function ClassyDonation() {
  useEffect(() => {
    // Load Classy script if not already loaded
    const scriptId = "classy-donation-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://giving.classy.org/embedded/api/sdk/js/70982";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="donate" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-donate-title">
            Support Our Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            Your contribution helps accelerate research and support families affected by MED13 syndrome
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div
            id="GawfU8SxTQR56_jOBk7A9"
            {...({ classy: "743443" } as any)}
            data-testid="donation-form"
          />
        </div>
      </div>
    </section>
  );
}
