import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types";
import type { DisplaySettings } from "../../types/types";
import { SectionLayout } from "./SectionLayout";

interface ProductSectionProps {
  items: Product[];
  displaySettings: DisplaySettings;
}

export function ProductSection({ items, displaySettings }: ProductSectionProps) {
  return (
    <SectionLayout displaySettings={displaySettings}>
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="w-44 shrink-0"
        />
      ))}
    </SectionLayout>
  );
}
