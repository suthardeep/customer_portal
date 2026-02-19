import { Breadcrumb } from "@/components/base/Breadcrumb";
import type { ProductDetail } from "../types/types";

interface ProductBreadcrumbProps {
  product: ProductDetail;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const items: Array<{ label: string; href?: string }> = [
    { label: "Home", href: "/" },
  ];

  // Add category if available
  const primaryCategory = product.categories?.[product.categories.length - 1];
  if (primaryCategory) {
    items.push({
      label: primaryCategory.name,
      href: `/categories/${product.categoryId}`,
    });
  }

  // Add product name (last item, no link)
  items.push({ label: product.name });

  return <Breadcrumb items={items} />;
}
