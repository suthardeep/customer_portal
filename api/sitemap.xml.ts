import { defineHandler, setResponseHeader } from "h3";

const APP_URL = process.env.APP_URL ?? "https://aavak.in";
const SITEMAP_BASE = `${APP_URL}/api/sitemap`;
const PAGE_SIZE = 100;

interface ProductMetaResponse {
  data: {
    meta: { totalPages: number };
  };
}

async function getProductTotalPages(): Promise<number> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) return 0;

  try {
    const res = await fetch(
      `${apiBase}/v2/products/public/list?currentPage=1&pageSize=${PAGE_SIZE}`,
    );
    if (!res.ok) return 0;
    const json = (await res.json()) as ProductMetaResponse;
    return json.data.meta.totalPages ?? 0;
  } catch {
    return 0;
  }
}

export default defineHandler(async (event) => {
  const totalProductPages = await getProductTotalPages();

  const productSitemaps = Array.from({ length: totalProductPages }, (_, i) => ({
    loc: `${SITEMAP_BASE}/products-${i + 1}.xml`,
  }));

  const sitemaps = [
    { loc: `${SITEMAP_BASE}/static.xml` },
    { loc: `${SITEMAP_BASE}/categories.xml` },
    ...productSitemaps,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>\n    <loc>${s.loc}</loc>\n  </sitemap>`).join("\n")}
</sitemapindex>`;

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setResponseHeader(
    event,
    "Cache-Control",
    "max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  );
  return xml;
});
