import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon";
import Spinner from "@/components/compound/spinner/Spinner";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import type { OrderItem } from "@/features/account/my-orders/types/types";
import FallbackView from "@/components/empty-states/FallbackView";

interface ProductSelectionStepProps {
  products: OrderItem[];
  selectedProductIds: string[];
  onToggleProduct: (productId: string) => void;
  loadMoreRef: (node: Element | null) => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

const ProductSelectionStep = ({
  products = [],
  selectedProductIds,
  onToggleProduct,
  loadMoreRef,
  isFetchingNextPage,
  hasNextPage,
}: ProductSelectionStepProps) => {
  if (products?.length === 0) {
    return (
      <FallbackView
        icon="Cart"
        title="No products purchased yet"
        subtitle="You must purchase a product before you can create a post."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-semibold">Choose your products</h5>
        <p className="text-n-800 mt-1">
          Pick the products you want to feature in your reel
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-h-110 overflow-y-auto p-1">
        {products.map((product) => {
          const isSelected = selectedProductIds.includes(product.orderItemId);

          return (
            <button
              key={product.orderItemId}
              type="button"
              onClick={() => onToggleProduct(product.orderItemId)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all",
                isSelected
                  ? "border-p-500 ring-1 ring-p-500"
                  : "border-n-400 hover:border-n-400",
              )}
            >
              <div
                className={cn("transition-transform", isSelected && "scale-90")}
              >
                <div className="relative aspect-square overflow-hidden bg-n-100">
                  <Image
                    src={product.productImage || product.mediaUrls?.[0]}
                    alt={product.productName}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-p-500">
                      <Icon name="Check" size="xs" className="text-white" />
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-1">
                  <p className="truncate text-sm font-medium">
                    {product.productName}
                  </p>
                  <span className="text-sm text-n-800">
                    {formatCurrency(product.amount)}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "absolute bg-p-500/20 top-0 left-0 w-full h-full",
                  isSelected ? "block" : "hidden",
                )}
              />
            </button>
          );
        })}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="col-span-full flex justify-center py-4"
          >
            {isFetchingNextPage && <Spinner />}
          </div>
        )}
      </div>

      {selectedProductIds.length > 0 && (
        <p className="text-sm font-medium text-p-600">
          {selectedProductIds.length} product
          {selectedProductIds.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};

export default ProductSelectionStep;
