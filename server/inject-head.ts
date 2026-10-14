import fs from "fs";
import path from "path";
import type { Request, Response } from "express";
import {
  absoluteUrl,
  buildEventJsonLd,
  buildOrganizationJsonLd,
  ogImageUrl,
  resolveRouteMetadata,
  SITE_NAME,
  type RouteMetadata,
} from "@shared/route-metadata";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHeadTags(route: RouteMetadata, requestPath: string): string {
  const canonicalPath = route.match ? requestPath.split("?")[0].split("#")[0] : route.path;
  const canonical = absoluteUrl(canonicalPath.length > 1 && canonicalPath.endsWith("/")
    ? canonicalPath.slice(0, -1)
    : canonicalPath || "/");
  const image = ogImageUrl(route);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const tags: string[] = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];

  if (route.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  }

  const jsonLdBlocks: Record<string, unknown>[] = [];
  if (route.path === "/") {
    jsonLdBlocks.push(buildOrganizationJsonLd());
  }
  const eventLd = buildEventJsonLd(canonicalPath);
  if (eventLd) {
    jsonLdBlocks.push(eventLd);
  }

  for (const block of jsonLdBlocks) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(block)}</script>`,
    );
  }

  return tags.join("\n    ");
}

/**
 * Injects per-route title, description, canonical, Open Graph, Twitter, and JSON-LD
 * into whatever index.html exists at runtime (replace title/description; insert before </head>).
 */
export function injectRouteHead(html: string, rawPath: string): string {
  const pathOnly = rawPath.split("?")[0].split("#")[0] || "/";
  const route = resolveRouteMetadata(pathOnly);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const headExtras = buildHeadTags(route, pathOnly);

  let result = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${title}</title>`,
  );

  if (/<meta\s+name=["']description["'][^>]*>/i.test(result)) {
    result = result.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${description}" />`,
    );
  } else {
    result = result.replace(
      /<\/head>/i,
      `    <meta name="description" content="${description}" />\n  </head>`,
    );
  }

  result = result.replace(/<\/head>/i, `    ${headExtras}\n  </head>`);
  return result;
}

function requestPath(req: Request): string {
  const raw = req.originalUrl || req.url || req.path || "/";
  return raw.split("?")[0].split("#")[0] || "/";
}

/** Production SPA fallback: serve index.html with route head injection. */
export function sendInjectedIndex(distPath: string, req: Request, res: Response): void {
  const indexPath = path.resolve(distPath, "index.html");
  const html = fs.readFileSync(indexPath, "utf-8");
  const injected = injectRouteHead(html, requestPath(req));
  res.status(200).set({ "Content-Type": "text/html; charset=utf-8" }).send(injected);
}
