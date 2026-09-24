import baylorLogo from "@assets/0_full-logo-primary-stacked@3x_1790123959815.png";
import neucyteLogo from "@assets/0_neucyte_1790123888395.png";
import editcoLogo from "@assets/0_EditCo_LogoFull_Blue_1790123869341.png";
import monarchLogo from "@assets/image_1790279001271.png";
import pequenosLogo from "@assets/0_123_1_1790123936779.jpeg";

// Recognition is content-managed here: add a dated entry to either list to update both pages.
// Use YYYY-MM for recognized, YYYY-MM-DD for expires. For new gifts, calculate
// expires with quarterEndFromGiftDate("YYYY-MM-DD"). Do not add unapproved names.
// The seed cohort is explicitly approved through December 31, 2026 in the design brief.
export const sponsors = [
  { name: "Baylor Genetics", tier: "Catalyst Sponsor", url: "https://baylorgenetics.com/", logo: baylorLogo, width: 220, recognized: "2026-09", expires: "2026-12-31" },
  { name: "NeuCyte", tier: "Gala Film Sponsor", url: "https://neucyte.com/", logo: neucyteLogo, width: 220, recognized: "2026-09", expires: "2026-12-31" },
  { name: "EditCo", tier: "Gala Supporter", url: "https://editco.bio/", logo: editcoLogo, width: 165, recognized: "2026-09", expires: "2026-12-31" },
  { name: "Monarch Initiative", tier: "Partner Sponsor", url: "https://monarchinitiative.org/", logo: monarchLogo, width: 165, recognized: "2026-09", expires: "2026-12-31" },
  // Website pending confirmation; never infer a sponsor's official link.
  { name: "Pequeños Talkers", tier: "Community Sponsor", url: "", logo: pequenosLogo, width: 120, recognized: "2026-09", expires: "2026-12-31" },
] as const;

export const auctionDonors = [
  { name: "Broadway San Jose", url: "https://broadwaysanjose.com/" },
  { name: "California Academy of Sciences (with Shannon Bennett)", url: "https://www.calacademy.org/" },
  { name: "Delicato Family Wines", url: "https://www.delicato.com/" },
  { name: "House Family Vineyards", url: "https://www.housefamilyvineyards.com/" },
  { name: "J. Lohr Vineyards & Wines", url: "https://www.jlohr.com/" },
  { name: "Novak & Mason Cellars", url: "https://www.novakmasoncellars.com/" },
  { name: "Parable Wines", url: "https://www.parablewines.com/" },
  { name: "Portola Vineyards (Len Lehmann)", url: "https://www.portolavineyards.com/" },
  { name: "Sekoya Lounge & Kitchen", url: "https://sekoyapaloalto.com/" },
  { name: "TheatreWorks Silicon Valley", url: "https://theatreworks.org/" },
  { name: "Thomas Fogarty Winery", url: "https://www.fogartywinery.com/" },
  { name: "The Walt Disney Family Museum, San Francisco", url: "https://www.waltdisney.org/" },
].map((donor) => ({ ...donor, tier: "In-Kind Donor", recognized: "2026-09", expires: "2026-12-31" }));

// Use local calendar dates so entries move to Past Champions after their expiry date.
export function recognitionToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function quarterEndFromGiftDate(giftDate: string) {
  const [year, month, day] = giftDate.split("-").map(Number);
  if (!year || !month || !day || month > 12 || day > new Date(year, month, 0).getDate()) throw new Error("Invalid gift date");
  const targetFirst = new Date(year, month - 1 + 3, 1);
  const lastDay = new Date(targetFirst.getFullYear(), targetFirst.getMonth() + 1, 0).getDate();
  const threeMonthsLater = new Date(targetFirst.getFullYear(), targetFirst.getMonth(), Math.min(day, lastDay));
  const endMonth = Math.ceil((threeMonthsLater.getMonth() + 1) / 3) * 3;
  return `${threeMonthsLater.getFullYear()}-${String(endMonth).padStart(2, "0")}-${new Date(threeMonthsLater.getFullYear(), endMonth, 0).getDate()}`;
}