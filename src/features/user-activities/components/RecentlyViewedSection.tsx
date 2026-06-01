import HorizontalScrollSection from "@/components/compound/HorizontalScrollSection";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductCardSkeleton } from "@/features/products/components/skeletons/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { userActivityQueries } from "../userActivitiesQueries";

export function RecentlyViewedSection() {
  const { data: recentViews, isLoading: isLoadingViews } = useQuery(
    userActivityQueries.recentViews(),
  );

  const products = recentViews?.data?.data ?? [];
  if (!isLoadingViews && products.length === 0) return null;

  return (
    <HorizontalScrollSection
      title="Recently Viewed"
      hideSeeAll
      className="mt-8"
    >
      {isLoadingViews
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-44 shrink-0"
              preload={false}
            />
          ))}
    </HorizontalScrollSection>
  );
}
