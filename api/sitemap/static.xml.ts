import { defineHandler, setResponseHeader } from "h3";

const APP_URL = process.env.APP_URL ?? "https://aavak.in";

const STATIC_URLS = [
  { loc: APP_URL, changefreq: "daily", priority: "1.0" },
  { loc: `${APP_URL}/products`, changefreq: "daily", priority: "0.9" },
  { loc: `${APP_URL}/categories`, changefreq: "weekly", priority: "0.8" },
  { loc: `${APP_URL}/search`, changefreq: "weekly", priority: "0.5" },
  { loc: `${APP_URL}/subscription`, changefreq: "monthly", priority: "0.6" },
  { loc: `${APP_URL}/privacy-policy`, changefreq: "monthly", priority: "0.3" },
  {
    loc: `${APP_URL}/terms-and-conditions`,
    changefreq: "monthly",
    priority: "0.3",
  },
];

export default defineHandler((event) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_URLS.map(
  (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
).join("\n")}
</urlset>`;

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setResponseHeader(
    event,
    "Cache-Control",
    "max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  );
  return xml;
});
