import HorizontalScrollSection from "@/components/compound/HorizontalScrollSection";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "../productQueries";
import { ProductCard } from "./ProductCard";
import { SimilarProductsSkeleton } from "./skeletons/SimilarProductsSkeleton";

interface SimilarProductsProps {
  productId: string;
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  const query = useQuery(productQueries.complementary(productId));
  const products = query.data?.data ?? [];

  if (query?.data?.meta?.totalRows === 0) return;

  return (
    <QueryStateHandler
      query={query}
      loadingSkeleton={<SimilarProductsSkeleton />}
      emptyTitle="No similar products"
      emptyFallback={null}
      errorFallback={() => null}
    >
      <HorizontalScrollSection
        title="You May Also Like"
        hideSeeAll
        className="mt-8"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-44 shrink-0"
          />
        ))}
      </HorizontalScrollSection>
    </QueryStateHandler>
  );
}
