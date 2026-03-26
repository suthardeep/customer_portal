import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import type { Product } from "@/features/products/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { OrderLifecycleStatus } from "@/features/account/my-orders/types/types";
import FallbackView from "@/components/empty-states/FallbackView";

interface SubmissionProductSelectorProps {
  products: Product[];
  selectedIds: string[];
  disabled?: boolean;
  onToggle: (productId: string) => void;
}

const SubmissionProductSelector = ({
  products,
  selectedIds,
  disabled,
  onToggle,
}: SubmissionProductSelectorProps) => {
  const myOrdersQuery = useQuery(
    myOrderQueries.list({
      lifecycleStatus: OrderLifecycleStatus.DELIVERED,
      pageSize: 100,
    }),
  );

  const orderedProductIds = new Set(
    myOrdersQuery.data?.data?.map((e) => e.orderItemId) ?? [],
  );

  const eligibleProducts = products.filter((p) => orderedProductIds.has(p.id));
  const hasAnyEligibleProduct = eligibleProducts.length > 0;

  return (
    <div>
      <p className="mb-2 font-medium">
        Select Products <span className="text-danger-500">*</span>
      </p>
      {hasAnyEligibleProduct ? (
        <div className="max-h-48 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-2">
          {eligibleProducts.map((product) => (
            <label
              key={product.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                selectedIds.includes(product.id)
                  ? "border-p-600 bg-p-50"
                  : "border-n-400 hover:border-n-400",
              )}
            >
              <Checkbox
                checked={selectedIds.includes(product.id)}
                onChange={() => onToggle(product.id)}
                disabled={disabled}
              />
              {product.mediaUrls?.[0] && (
                <div className="size-10 shrink-0">
                  <Image
                    src={product.mediaUrls[0]}
                    alt={product.name}
                    className="size-10 rounded object-cover"
                  />
                </div>
              )}
              <p className="flex-1 min-w-0 font-medium truncate text-n-900">
                {product.name}
              </p>
            </label>
          ))}
        </div>
      ) : (
        <FallbackView
          title="No eligible products"
          color="danger"
          subtitle="You have not ordered any item from this campaign"
        />
      )}
      {hasAnyEligibleProduct && selectedIds.length === 0 && (
        <span className="mt-1 text-danger-500">
          Select at least one product
        </span>
      )}
    </div>
  );
};

export default SubmissionProductSelector;
