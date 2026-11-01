/**
 * Single source of truth for public route SEO metadata.
 * Add every new public page here (title, description, sitemap, og image).
 * Entries point at the page's own translation keys in the English locale file, so the
 * server and the page show the same words; an entry with no key keeps its literal string.
 */

import en from "../client/src/i18n/locales/en.json";

export const SITE_URL = "https://med13.org";
export const SITE_NAME = "MED13 Foundation";

/** 1200×630 share image: full foundation logo on white, rendered from the foundation's logo SVG. */
export const DEFAULT_OG_IMAGE_PATH = "/images/og-med13.png";

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

type RouteMetadataDefinition = Omit<RouteMetadata, "title" | "description"> & {
  title?: string;
  description?: string;
  /** Dotted path into en.json, e.g. "sciencePage.metaTitle". Wins over the literal title. */
  titleKey?: string;
  /** Dotted path into en.json. Wins over the literal description. */
  descriptionKey?: string;
  /** Append " | MED13 Foundation" to the translated title, as the page's own code does. */
  appendSiteName?: boolean;
};

const HOME_DESCRIPTION =
  "The MED13 Foundation unites families, researchers, and clinicians to accelerate research toward treatments and a cure for MED13 syndrome.";

function lookupTranslation(key: string): string | undefined {
  let node: unknown = en;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" && node.trim() ? node : undefined;
}

function resolveText(
  routePath: string,
  key: string | undefined,
  literal: string | undefined,
  fallback: string,
  suffix = "",
): string {
  if (key === undefined) return literal ?? fallback;
  const translated = lookupTranslation(key);
  if (translated !== undefined) return `${translated}${suffix}`;
  console.warn(`[route-metadata] ${routePath}: "${key}" is not a non-empty string in en.json`);
  return literal ?? fallback;
}

function resolveDefinition(definition: RouteMetadataDefinition): RouteMetadata {
  const { titleKey, descriptionKey, appendSiteName, ...rest } = definition;
  return {
    ...rest,
    title: resolveText(
      definition.path,
      titleKey,
      definition.title,
      SITE_NAME,
      appendSiteName ? ` | ${SITE_NAME}` : "",
    ),
    description: resolveText(definition.path, descriptionKey, definition.description, HOME_DESCRIPTION),
  };
}

const routeDefinitions: RouteMetadataDefinition[] = [
  {
    path: "/",
    title: "MED13 Foundation | Advancing Research for MED13 Syndrome",
    description: HOME_DESCRIPTION,
    sitemap: true,
  },
  {
    path: "/gala",
    titleKey: "galaRecap.metaTitle",
    appendSiteName: true,
    descriptionKey: "galaRecap.metaDescription",
    sitemap: true,
  },
  {
    path: "/symposium",
    titleKey: "symposium.metaTitle",
    descriptionKey: "symposium.metaDescription",
    sitemap: true,
  },
  {
    path: "/who-we-are",
    title: "Who We Are - Board & Scientific Advisors | MED13 Foundation",
    description:
      "Meet the MED13 Foundation team: our parent-led Board of Directors and world-class Scientific Advisory Board working to accelerate research for MED13 syndrome.",
    sitemap: true,
  },
  {
    path: "/science",
    titleKey: "sciencePage.metaTitle",
    descriptionKey: "sciencePage.metaDescription",
    sitemap: true,
  },
  {
    // Legacy URL: client redirects to /science
    path: "/what-is-med13-syndrome",
    titleKey: "sciencePage.metaTitle",
    descriptionKey: "sciencePage.metaDescription",
    sitemap: false,
    noindex: true,
  },
  {
    path: "/champions",
    titleKey: "recognition.championsTitle",
    appendSiteName: true,
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
    titleKey: "hopePractice.metaTitle",
    descriptionKey: "hopePractice.metaDescription",
    sitemap: true,
  },
  {
    path: "/news-and-events/denver-mini-medopathies-meetup",
    titleKey: "denverMeetup.metaTitle",
    descriptionKey: "denverMeetup.metaDescription",
    sitemap: true,
  },
  {
    path: "/impact",
    titleKey: "impact.metaTitle",
    descriptionKey: "impact.metaDescription",
    sitemap: true,
  },
  {
    // Legacy URL: client redirects to /impact
    path: "/roadmap",
    titleKey: "impact.metaTitle",
    descriptionKey: "impact.metaDescription",
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
    path: "/for-families",
    titleKey: "forFamilies.metaTitle",
    descriptionKey: "forFamilies.metaDescription",
    sitemap: true,
  },
  {
    path: "/ways-to-give",
    titleKey: "waysToGive.title",
    appendSiteName: true,
    descriptionKey: "waysToGive.metaDescription",
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

export const routeMetadata: RouteMetadata[] = routeDefinitions.map(resolveDefinition);

/** Strips query and hash, and a trailing slash on anything but "/". */
export function normalizePath(rawPath: string): string {
  const pathOnly = rawPath.split("?")[0].split("#")[0] || "/";
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
}

export function getDefaultRouteMetadata(): RouteMetadata {
  return routeMetadata[0];
}

/** Returns undefined for paths that aren't a known page, so callers can treat them as not found. */
export function resolveRouteMetadata(rawPath: string): RouteMetadata | undefined {
  const path = normalizePath(rawPath);
  const exact = routeMetadata.find((route) => !route.match && route.path === path);
  return exact ?? routeMetadata.find((route) => route.match?.test(path));
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
    description: resolveRouteMetadata(path)?.description,
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
  const home = getDefaultRouteMetadata();
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
