import { ProductCardSkeleton } from "@/features/products/components/ProductCardSkeleton";

const CollectionDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="shimmer h-8 w-64 rounded" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetailSkeleton;
