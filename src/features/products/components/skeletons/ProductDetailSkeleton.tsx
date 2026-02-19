import { ProductImageGallerySkeleton } from "./ProductImageGallerySkeleton";
import { ProductContentSkeleton } from "./ProductContentSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="shimmer h-5 w-64 mb-6" />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ProductImageGallerySkeleton />

        {/* Product Details */}
        <ProductContentSkeleton />
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        {/* Tab Headers */}
        <div className="flex gap-6 border-b border-n-200 mb-6">
          <div className="shimmer h-10 w-24" />
          <div className="shimmer h-10 w-32" />
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="shimmer h-6 w-1/3" />
              <div className="shimmer h-6 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
