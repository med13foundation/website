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

    // Cleanup function
    return () => {
      // Note: We don't remove the script on unmount because it might be needed again
      // and Classy's SDK handles its own state
    };
  }, []);

  return (
    <div
      id="GawfU8SxTQR56_jOBk7A9"
      {...({ classy: "743443" } as any)}
      style={{ display: "none" }}
    />
  );
}
