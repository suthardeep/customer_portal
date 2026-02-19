export function ProductImageGallerySkeleton() {
  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden lg:flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="shimmer size-20 rounded-lg" />
        ))}
      </div>

      {/* Main Image */}
      <div className="shimmer flex-1 aspect-square rounded-lg" />
    </div>
  );
}
