import type { Request, Response } from "express";
import {
  absoluteUrl,
  buildEventJsonLd,
  buildOrganizationJsonLd,
  getDefaultRouteMetadata,
  normalizePath,
  ogImageUrl,
  resolveRouteMetadata,
  SITE_NAME,
  type RouteMetadata,
} from "@shared/route-metadata";

const NOT_FOUND_TITLE = `Page not found | ${SITE_NAME}`;
const NOINDEX_TAG = `<meta name="robots" content="noindex, nofollow" />`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHeadTags(route: RouteMetadata, path: string, title: string, description: string): string {
  const canonical = escapeHtml(absoluteUrl(route.match ? path : route.path));
  const tags: string[] = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl(route))}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];

  if (route.noindex) {
    tags.push(NOINDEX_TAG);
  }

  const jsonLdBlocks = [
    path === "/" ? buildOrganizationJsonLd() : null,
    buildEventJsonLd(path),
  ].filter((block) => block !== null);

  for (const block of jsonLdBlocks) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(block)}</script>`);
  }

  return tags.join("\n    ");
}

/**
 * Injects per-route title, description, canonical, Open Graph, Twitter, and JSON-LD
 * into whatever index.html exists at runtime (replace title/description; insert before </head>).
 * Unknown paths get a not-found title and noindex, with no canonical or share tags.
 * Replacements use functions so a "$" in the request path is never read as a replace pattern.
 */
export function injectRouteHead(html: string, rawPath: string): string {
  const path = normalizePath(rawPath);
  const route = resolveRouteMetadata(path);
  const title = escapeHtml(route?.title ?? NOT_FOUND_TITLE);
  const description = escapeHtml((route ?? getDefaultRouteMetadata()).description);
  const headExtras = route ? buildHeadTags(route, path, title, description) : NOINDEX_TAG;
  const descriptionTag = `<meta name="description" content="${description}" />`;

  let result = html.replace(/<title>[^<]*<\/title>/i, () => `<title>${title}</title>`);

  const descriptionPattern = /<meta\s+name=["']description["'][^>]*>/i;
  result = descriptionPattern.test(result)
    ? result.replace(descriptionPattern, () => descriptionTag)
    : result.replace(/<\/head>/i, () => `    ${descriptionTag}\n  </head>`);

  return result.replace(/<\/head>/i, () => `    ${headExtras}\n  </head>`);
}

/** Production SPA fallback: serve the index.html template with route head injection. */
export function sendInjectedIndex(template: string, req: Request, res: Response): void {
  const injected = injectRouteHead(template, req.originalUrl || req.url || "/");
  res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).send(injected);
}
