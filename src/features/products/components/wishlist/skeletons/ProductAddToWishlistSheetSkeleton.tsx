const CollectionTileSkeleton = () => (
  <div className="flex items-center gap-4 p-1">
    <div className="size-10 rounded-lg shimmer shrink-0" />
    <div className="h-4 w-32 rounded shimmer" />
    <div className="size-8 rounded-full shimmer ml-auto shrink-0" />
  </div>
);

const ProductAddToWishlistSheetSkeleton = () => (
  <div className="flex flex-col gap-2 px-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <CollectionTileSkeleton key={i} />
    ))}
  </div>
);

export default ProductAddToWishlistSheetSkeleton;
