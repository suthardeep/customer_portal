export function ProductContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-end gap-2">
        <div className="shimmer size-10 rounded-lg" />
        <div className="shimmer size-10 rounded-lg" />
      </div>

      {/* Brand */}
      <div className="shimmer h-4 w-32" />

      {/* Product Name */}
      <div className="shimmer h-8 w-3/4" />

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="shimmer h-5 w-32" />
        <div className="shimmer h-4 w-16" />
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <div className="shimmer h-8 w-24" />
        <div className="shimmer h-5 w-20" />
        <div className="shimmer h-6 w-20 rounded-full" />
      </div>

      {/* Delivery Info */}
      <div className="shimmer h-24 rounded-lg" />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <div className="shimmer h-12 flex-1 rounded-lg" />
        <div className="shimmer h-12 flex-1 rounded-lg" />
      </div>

      {/* Badges */}
      <div className="flex gap-3">
        <div className="shimmer h-20 w-20 rounded-lg" />
        <div className="shimmer h-20 w-20 rounded-lg" />
        <div className="shimmer h-20 w-20 rounded-lg" />
      </div>

      {/* Variants */}
      <div className="space-y-3">
        <div className="shimmer h-5 w-32" />
        <div className="flex gap-2">
          <div className="shimmer size-20 rounded-lg" />
          <div className="shimmer size-20 rounded-lg" />
          <div className="shimmer size-20 rounded-lg" />
        </div>
      </div>

      {/* Offers */}
      <div className="space-y-3">
        <div className="shimmer h-6 w-40" />
        <div className="shimmer h-32 rounded-lg" />
        <div className="shimmer h-32 rounded-lg" />
      </div>
    </div>
  );
}
