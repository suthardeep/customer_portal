import { Breadcrumb } from "@/components/base/Breadcrumb";
import type { ProductDetail } from "../types/types";

interface ProductBreadcrumbProps {
  product: ProductDetail;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const items: Array<{ label: string; href?: string }> = [
    { label: "Home", href: "/" },
  ];

  // Add category if available — prefer deepest level (CHILD > SUB > MAIN)
  const LEVEL_ORDER: Record<string, number> = { CHILD: 2, SUB: 1, MAIN: 0 };
  const primaryCategory = product.categories
    ?.slice()
    .sort(
      (a, b) => (LEVEL_ORDER[b.level] ?? 0) - (LEVEL_ORDER[a.level] ?? 0),
    )[0];
  if (primaryCategory) {
    items.push({
      label: primaryCategory.name,
      href: `/categories/${primaryCategory.id}`,
    });
  }

  // Add product name (last item, no link)
  items.push({ label: product.name });

  return <Breadcrumb items={items} />;
}
