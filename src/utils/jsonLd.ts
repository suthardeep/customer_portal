import type { ProductDetail } from "@/features/products/types/types";
import type { SiteConfig } from "@/features/site-config/types/types";
import { APP_NAME, APP_URL } from "./seo";

export function buildOrganizationJsonLd(siteConfig?: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: APP_URL,
    description: siteConfig?.description,
    address: siteConfig?.address
      ? { "@type": "PostalAddress", streetAddress: siteConfig.address }
      : undefined,
    sameAs: siteConfig?.socials?.map((s) => s.redirectUrl) ?? [],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: APP_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${APP_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProductJsonLd(product: ProductDetail, pageUrl: string) {
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.sellingPrice ?? firstVariant?.price ?? product.minPrice;
  const availability = product.totalStock > 0
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: firstVariant?.description,
    image: firstVariant?.mediaUrls,
    url: pageUrl,
    sku: firstVariant?.aavakSku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "INR",
      price: price,
      availability,
      seller: product.seller
        ? { "@type": "Organization", name: product.seller.businessName ?? product.seller.name }
        : undefined,
    },
    aggregateRating:
      product.avgRating && product.totalReviews
        ? {
            "@type": "AggregateRating",
            ratingValue: product.avgRating.toFixed(1),
            reviewCount: product.totalReviews,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdScript(data: object): string {
  return JSON.stringify(data);
}
