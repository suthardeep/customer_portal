export const APP_NAME = "Aavak";
export const APP_DESCRIPTION =
  "Shop the latest products on Aavak — your one-stop destination for fashion, electronics, home essentials and more.";
export const APP_URL =
  typeof process !== "undefined"
    ? (process.env.APP_URL ?? "https://aavak.in")
    : "https://aavak.in";

type MetaDescriptor =
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { title: string };

export interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  type?: "website" | "product";
}

export function buildMeta(props: SeoProps): MetaDescriptor[] {
  const {
    title,
    description = APP_DESCRIPTION,
    image,
    url,
    noIndex = false,
    type = "website",
  } = props;

  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: APP_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" },
  ];

  const absoluteImage = ensureAbsoluteUrl(image);
  if (absoluteImage) {
    meta.push({ property: "og:image", content: absoluteImage });
    meta.push({ name: "twitter:image", content: absoluteImage });
  }

  if (url) {
    meta.push({ property: "og:url", content: url });
    meta.push({ name: "twitter:url", content: url });
  }

  return meta;
}

export function ensureAbsoluteUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${APP_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function truncateDescription(text: string | undefined, max = 160): string {
  if (!text) return APP_DESCRIPTION;
  const stripped = text.replace(/<[^>]*>/g, "").trim();
  if (stripped.length <= max) return stripped;
  return `${stripped.slice(0, max - 1)}…`;
}
