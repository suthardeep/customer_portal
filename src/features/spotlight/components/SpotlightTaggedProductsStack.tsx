import type { TaggedProduct } from "../types/types";
import { SpotlightTaggedProductCard } from "./SpotlightTaggedProductCard";

interface SpotlightTaggedProductsStackProps {
  products: TaggedProduct[];
}

export function SpotlightTaggedProductsStack({
  products,
}: SpotlightTaggedProductsStackProps) {
  if (products.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-n-900">Tagged Products</p>
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <SpotlightTaggedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
