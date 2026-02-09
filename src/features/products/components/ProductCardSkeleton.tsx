export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-n-300 bg-white">
      {/* Image Section */}
      <div className="shimmer relative aspect-square">
        {/* Wishlist button placeholder */}
        <div className="absolute right-2 top-2 size-8 rounded-full bg-n-300" />
        {/* Add button placeholder */}
        <div className="absolute bottom-2 right-2 size-7 rounded-[10px] bg-n-300" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 p-3">
        {/* Earn chip placeholder */}
        <div className="shimmer h-5 w-16 rounded-full" />

        {/* Brand name placeholder */}
        <div className="shimmer h-3 w-20" />

        {/* Product name placeholder */}
        <div className="shimmer h-4 w-full" />
        <div className="shimmer h-4 w-3/4" />

        {/* Price row placeholder */}
        <div className="flex gap-2">
          <div className="shimmer h-4 w-16" />
          <div className="shimmer h-4 w-12" />
          <div className="shimmer h-4 w-14" />
        </div>

        {/* Delivery date placeholder */}
        <div className="shimmer h-3 w-28" />
      </div>
    </div>
  );
}
