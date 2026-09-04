// Regenerates public/sitemap.xml from the live project list and the
// configured siteUrl. Run this after adding/removing projects and before
// deploying:
//
//   npm run generate:sitemap
//
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { portfolioConfig } from "../src/data/portfolio.js";
import { projects } from "../src/data/projects.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = portfolioConfig.siteUrl.replace(/\/$/, "");

const staticRoutes = ["/", "/projects"];
const projectRoutes = projects.map((p) => `/projects/${p.id}`);
const routes = [...staticRoutes, ...projectRoutes];

const urlEntries = routes
  .map(
    (route) => `  <url>
    <loc>${base}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outPath = path.join(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml);
console.log(`Sitemap written to ${outPath} with ${routes.length} URLs.`);
