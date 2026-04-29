import type { CampaignProduct } from "../types/types";
import { CampaignProductCard } from "./CampaignProductCard";

interface CampaignProductsProps {
  products: CampaignProduct[];
}

function CampaignProducts({ products }: CampaignProductsProps) {
  if (!products.length) return null;

  return (
    <div className="mt-2">
      <h6 className="font-bold text-n-900">Campaign Products</h6>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <CampaignProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CampaignProducts;
