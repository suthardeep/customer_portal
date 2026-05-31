import { defineHandler, setResponseHeader } from "h3";

const APP_URL = process.env.APP_URL ?? "https://aavak.in";

interface Category {
  id: string;
  updatedAt?: string;
}

interface CategoryListResponse {
  data: {
    data: Category[];
    meta: { totalPages: number; currentPage: number; hasNextPage: boolean };
  };
}

async function fetchAllCategories(): Promise<Category[]> {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) return [];

  const all: Category[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `${apiBase}/v2/categories/public/tree?currentPage=${page}&pageSize=100`,
    );
    if (!res.ok) break;

    const json = (await res.json()) as CategoryListResponse;
    all.push(...json.data.data);

    if (!json.data.meta.hasNextPage) break;
    page++;
  }

  return all;
}

export default defineHandler(async (event) => {
  const categories = await fetchAllCategories();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories
  .map(
    (c) => `  <url>
    <loc>${APP_URL}/categories/${c.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${c.updatedAt ? `\n    <lastmod>${c.updatedAt.slice(0, 10)}</lastmod>` : ""}
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
