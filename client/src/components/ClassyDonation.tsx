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

    // Apply strong hiding styles to prevent Classy from showing the form
    const applyHiddenStyles = () => {
      const donationDiv = document.getElementById("GawfU8SxTQR56_jOBk7A9");
      if (donationDiv) {
        donationDiv.style.display = "none";
        donationDiv.style.visibility = "hidden";
        donationDiv.style.opacity = "0";
        donationDiv.style.position = "absolute";
        donationDiv.style.pointerEvents = "none";
        donationDiv.style.width = "0";
        donationDiv.style.height = "0";
        donationDiv.style.overflow = "hidden";
      }
    };

    // Apply styles immediately
    applyHiddenStyles();

    // Also apply after a short delay in case Classy SDK modifies it
    const timer = setTimeout(applyHiddenStyles, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="GawfU8SxTQR56_jOBk7A9"
      {...({ classy: "743443" } as any)}
      style={{
        display: "none",
        visibility: "hidden",
        opacity: 0,
        position: "absolute",
        pointerEvents: "none",
        width: 0,
        height: 0,
        overflow: "hidden"
      }}
    />
  );
}
