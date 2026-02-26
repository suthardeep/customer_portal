import HorizontalScrollSection from "@/components/compound/HorizontalScrollSection";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { userActivityQueries } from "../userActivitiesQueries";

export function RecentlyViewedSection() {
  const { data: recentViews, isLoading: isLoadingViews } = useQuery(
    userActivityQueries.recentViews(),
  );

  const products = (recentViews?.data ?? []).map((item) => item.product);

  if (isLoadingViews || products.length === 0) return null;

  return (
    <HorizontalScrollSection title="Recently Viewed" hideSeeAll>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="w-44 shrink-0" />
      ))}
    </HorizontalScrollSection>
  );
}
