import Spinner from "@/components/compound/spinner/Spinner";
import FallbackView from "@/components/empty-states/FallbackView";
import { FiltersSheet } from "@/components/shared/filters/FiltersSheet";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductListSkeleton } from "@/features/products/components/skeletons/ProductListSkeleton";
import { productQueries } from "@/features/products/productQueries";
import { productsListPageSearch } from "@/features/products/productsSearchSchema";
import { getProductsPageLabel } from "@/features/products/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/products/")({
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    const { brandName, categoryName, ...apiParams } = deps;
    await context.queryClient.ensureInfiniteQueryData(
      productQueries.listInfinite(apiParams),
    );
  },
  validateSearch: productsListPageSearch,
  pendingComponent: ProductListSkeleton,
  component: ProductsPage,
});

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { brandName, categoryName, ...apiParams } = search;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(productQueries.listInfinite(apiParams));

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.data) ?? [];
  const availableFilters = data?.pages[0]?.filters;

  const selectedFilters = search.filters ? search.filters.split(",") : [];

  const handleApplyFilters = (selected: string[]) => {
    navigate({
      to: "/products",
      search: { search: search.search, filters: selected.join(",") },
      replace: true,
    });
  };

  if (!isLoading && products.length === 0) {
    const label = getProductsPageLabel(search);
    const fallbackTitle =
      label === "All Products"
        ? "No products found"
        : `No products found for ${label}`;
    return <FallbackView title={fallbackTitle} icon="Cart" version="default" />;
  }

  return (
    <div className="container mx-auto p-4 pt-6 pb-28 lg:pb-6">
      <div className="flex gap-2 justify-between items-center">
        <p className="mb-4 text-n-800">
          Showing all products from{" "}
          <span className="text-n-900 font-semibold text-sm">
            {getProductsPageLabel(search)}
          </span>
        </p>
        {availableFilters && (
          <FiltersSheet
            filters={availableFilters}
            selectedOptionValues={selectedFilters}
            onApply={handleApplyFilters}
            isFetching={isLoading}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}
