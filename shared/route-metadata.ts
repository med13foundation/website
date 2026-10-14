/**
 * Single source of truth for public route SEO metadata.
 * Add every new public page here (title, description, sitemap, og image).
 */

export const SITE_URL = "https://med13.org";
export const SITE_NAME = "MED13 Foundation";

/** Public landscape asset closest to ~1200×630 (1920×790). Replace with a dedicated OG image when available. */
export const DEFAULT_OG_IMAGE_PATH = "/images/combined_brain.png";

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  /** Path under the site origin, e.g. /images/foo.png. Falls back to DEFAULT_OG_IMAGE_PATH. */
  ogImage?: string;
  sitemap: boolean;
  noindex?: boolean;
  /** When set, matches dynamic paths (e.g. /newsletter/:id). */
  match?: RegExp;
};

export const routeMetadata: RouteMetadata[] = [
  {
    path: "/",
    title: "MED13 Foundation | Advancing Research for MED13 Syndrome",
    description:
      "The MED13 Foundation unites families, researchers, and clinicians to accelerate research toward treatments and a cure for MED13 syndrome.",
    sitemap: true,
  },
  {
    path: "/gala",
    title: "An Evening for Answers - First Annual Gala | MED13 Foundation",
    description:
      "Join the MED13 Foundation's First Annual Gala, An Evening for Answers, on Saturday, October 10, 2026 at 7:00 PM at the UU Church of Palo Alto.",
    sitemap: true,
  },
  {
    path: "/symposium",
    title: "MEDopathies Alliance Virtual Scientific Symposium | MED13 Foundation",
    description:
      "Join the MEDopathies Alliance Virtual Scientific Symposium on October 9, 2026, for a free day of research presentations, panels, and family perspectives.",
    sitemap: true,
  },
  {
    path: "/who-we-are",
    title: "Who We Are - Board & Scientific Advisors | MED13 Foundation",
    description:
      "The MED13 Foundation is parent-led and family-driven. We are building the research tools that will enable treatments, and connecting every family who needs us.",
    sitemap: true,
  },
  {
    path: "/what-is-med13-syndrome",
    title: "What is MED13 syndrome? | MED13 Foundation",
    description:
      "MED13 syndrome is a rare genetic neurodevelopmental condition associated with changes in the MED13 gene. Features vary from person to person.",
    sitemap: true,
  },
  {
    path: "/champions",
    title: "Community Champions | MED13 Foundation",
    description:
      "Thank you to the businesses and partners supporting the MED13 community. Recognition is updated quarterly.",
    sitemap: true,
  },
  {
    path: "/news-and-events",
    title: "News and Events | MED13 Foundation",
    description: "Connect with our community and stay informed",
    sitemap: true,
  },
  {
    path: "/news-and-events/hope-is-a-practice",
    title: "Hope Is a Practice | MED13 Foundation",
    description:
      "Join the MED13 community for Hope Is a Practice, a welcoming Sunday service at the Unitarian Universalist Church of Palo Alto on September 27, 2026.",
    sitemap: true,
  },
  {
    path: "/news-and-events/denver-mini-medopathies-meetup",
    title: "Mini MEDopathies Family Meetup, Denver | MED13 Foundation",
    description:
      "Join MED12, MED13, and MED13L families in Denver on December 4, 2026, for an accessible, respite-supported day of connection, resources, and research.",
    sitemap: true,
  },
  {
    path: "/impact",
    title: "Impact and Progress | MED13 Foundation",
    description:
      "A candid, denominator-aware account of MED13 Foundation's first year of research infrastructure, family participation, funding, and milestones.",
    sitemap: true,
  },
  {
    // Legacy URL: client redirects to /impact
    path: "/roadmap",
    title: "Impact and Progress | MED13 Foundation",
    description:
      "A candid, denominator-aware account of MED13 Foundation's first year of research infrastructure, family participation, funding, and milestones.",
    sitemap: false,
    noindex: true,
  },
  {
    path: "/get-involved",
    title: "Get Involved | MED13 Foundation",
    description: "Four ways to make an impact in the MED13 community",
    sitemap: true,
  },
  {
    path: "/ways-to-give",
    title: "Other Ways to Give | MED13 Foundation",
    description:
      "Help MED13 families travel to the 2027 Pan-Mediator Family Convening with airline miles, hotel points, or a coordinated gift.",
    sitemap: true,
  },
  {
    path: "/admin",
    title: "Admin Access | MED13 Foundation",
    description: "Enter your admin password to continue",
    sitemap: false,
    noindex: true,
  },
  {
    path: "/unsubscribe",
    title: "Unsubscribe | MED13 Foundation",
    description: "Enter your email to unsubscribe from the MED13 Foundation newsletter.",
    sitemap: false,
    noindex: true,
  },
  {
    path: "/newsletter/:id",
    title: "Newsletter | MED13 Foundation",
    description: "Read our past newsletters and stay up to date with the MED13 community",
    sitemap: false,
    noindex: true,
    match: /^\/newsletter\/[^/]+$/,
  },
];

function normalizePath(rawPath: string): string {
  const pathOnly = rawPath.split("?")[0].split("#")[0] || "/";
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly || "/";
}

export function getDefaultRouteMetadata(): RouteMetadata {
  return routeMetadata[0];
}

export function resolveRouteMetadata(rawPath: string): RouteMetadata {
  const path = normalizePath(rawPath);
  const exact = routeMetadata.find((route) => !route.match && route.path === path);
  if (exact) return exact;
  const patterned = routeMetadata.find((route) => route.match?.test(path));
  if (patterned) return patterned;
  return getDefaultRouteMetadata();
}

export function getSitemapRoutes(): RouteMetadata[] {
  return routeMetadata.filter((route) => route.sitemap);
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export function ogImageUrl(route: RouteMetadata): string {
  return absoluteUrl(route.ogImage ?? DEFAULT_OG_IMAGE_PATH);
}

export function buildSitemapXml(lastmod = new Date().toISOString().split("T")[0]): string {
  const urls = getSitemapRoutes()
    .map((route) => {
      const loc = absoluteUrl(route.path);
      const priority = route.path === "/" ? "1.0" : "0.8";
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/** Organization JSON-LD for "/". Facts only from the repo; MED13 is not described as a 501(c)(3). */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    email: "research@med13.org",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61584064750085",
      "https://www.linkedin.com/company/med13-foundation/",
    ],
  };
}

/**
 * Event JSON-LD for still-upcoming events with explicit date and place in page source.
 * As of 2026-10-14: symposium (Oct 9) and gala (Oct 10) are over; Hope Is a Practice (Sep 27) is over.
 * Only the Denver Mini MEDopathies Meetup (Dec 4, 2026, Grand Hyatt Denver) qualifies.
 */
export function buildEventJsonLd(rawPath: string): Record<string, unknown> | null {
  const path = normalizePath(rawPath);
  if (path !== "/news-and-events/denver-mini-medopathies-meetup") {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Mini MEDopathies Family Meetup",
    description:
      "Join MED12, MED13, and MED13L families in Denver on December 4, 2026, for an accessible, respite-supported day of connection, resources, and research.",
    startDate: "2026-12-04",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Grand Hyatt Denver",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1750 Welton St",
        addressLocality: "Denver",
        addressRegion: "CO",
        postalCode: "80202",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: absoluteUrl(path),
  };
}

export function buildLlmsTxt(): string {
  const home = resolveRouteMetadata("/");
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${home.description}`,
    "",
    "## Key pages",
    "",
  ];

  for (const route of getSitemapRoutes()) {
    const label = route.title.replace(/\s*\|\s*MED13 Foundation$/, "").trim();
    lines.push(`- [${label}](${absoluteUrl(route.path)}): ${route.description}`);
  }

  lines.push("");
  return lines.join("\n");
}
