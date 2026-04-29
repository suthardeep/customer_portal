import { Image } from "@/components/base/Image";
import type { Product } from "@/features/products/types/product.types";

interface SubmissionTaggedProductsProps {
  products: Product[];
}

export default function SubmissionTaggedProducts({ products }: SubmissionTaggedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <p className="font-medium text-n-700 mb-2">Tagged Products</p>
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 rounded-lg border border-n-300 p-3"
          >
            <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-n-200">
              {product.mediaUrls?.[0] && (
                <Image
                  src={product.mediaUrls[0]}
                  alt={product.name}
                  className="size-full object-cover"
                />
              )}
            </div>
            <p className="flex-1 min-w-0 font-medium text-n-900 truncate">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
