import type { Product } from "@/features/products/types/product.types";
import { CampaignProductCard } from "./CampaignProductCard";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { OrderLifecycleStatus } from "@/features/account/my-orders/types/types";
import { useQuery } from "@tanstack/react-query";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import CampaignProductsSkeleton from "./skeletons/CampaignProductsSkeleton";

interface CampaignProductsProps {
  products: Product[];
}

function CampaignProducts({ products }: CampaignProductsProps) {
  if (!products.length) return null;

  const myOrdersQuery = useQuery(
    myOrderQueries.list({
      lifecycleStatus: OrderLifecycleStatus.DELIVERED,
      pageSize: 100,
    }),
  );

  return (
    <div className="mt-2">
      <h6 className="font-bold text-n-900">Campaign Products</h6>
      <QueryStateHandler
        query={myOrdersQuery}
        loadingSkeleton={<CampaignProductsSkeleton />}
        emptyTitle="No campaign products found"
        isEmpty={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {products.map((product) => {
            const notEligibleForShort = !myOrdersQuery.data?.data.find(
              (e) => e.orderItemId === product.id,
            );

            return (
              <CampaignProductCard
                key={product.id}
                product={product}
                notEligibleForShort={notEligibleForShort}
              />
            );
          })}
        </div>
      </QueryStateHandler>
    </div>
  );
}

export default CampaignProducts;
