import { defineHandler, setResponseHeader, getRouterParam, createError } from "h3";

const APP_URL = process.env.APP_URL ?? "https://aavak.in";
const PAGE_SIZE = 100;

interface Product {
  id: string;
  updatedAt?: string;
}

interface ProductListResponse {
  data: {
    data: Product[];
    meta: { totalPages: number; currentPage: number };
  };
}

export default defineHandler(async (event) => {
  const pageParam = getRouterParam(event, "page");
  const page = Number(pageParam);

  if (!pageParam || Number.isNaN(page) || page < 1) {
    throw createError({ statusCode: 400, statusMessage: "Invalid page number" });
  }

  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "API_BASE_URL not configured" });
  }

  const res = await fetch(
    `${apiBase}/v2/products/public/list?currentPage=${page}&pageSize=${PAGE_SIZE}`,
  );

  if (!res.ok) {
    throw createError({ statusCode: 502, statusMessage: "Failed to fetch products" });
  }

  const json = (await res.json()) as ProductListResponse;
  const products = json.data.data;

  if (products.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "No products on this page" });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
  .map(
    (p) => `  <url>
    <loc>${APP_URL}/products/${p.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${p.updatedAt ? `\n    <lastmod>${p.updatedAt.slice(0, 10)}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setResponseHeader(
    event,
    "Cache-Control",
    "max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  );
  return xml;
});
