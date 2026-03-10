import QueryStateHandler from "@/components/compound/QueryStateHandler";
import FallbackView from "@/components/empty-states/FallbackView";
import SearchAutocomplete from "@/components/shared/search/SearchAutocomplete";
import SearchInput from "@/components/shared/search/SearchInput";
import SearchSuggestions from "@/components/shared/search/SearchSuggestions";
import SearchTrending from "@/components/shared/search/SearchTrending";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductListSkeleton } from "@/features/products/components/ProductListSkeleton";
import { productQueries } from "@/features/products/productQueries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().catch(""),
});

export const Route = createFileRoute("/_public/search")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      productQueries.list({ search: deps.q, currentPage: 1, pageSize: 20 }),
    );
  },
  pendingComponent: ProductListSkeleton,
  errorComponent: (e) => (
    <FallbackView title={e?.error?.message || "Search failed"} />
  ),
  component: SearchResultsComponent,
});

function SearchResultsComponent() {
  const { q } = Route.useSearch();

  const productQuery = useQuery(
    productQueries.list({ search: q, currentPage: 1, pageSize: 20 }),
  );

  if (!q.trim()) {
    return (
      <div>
        <SearchInput onClose={() => {}} />
        <div className="px-4 flex flex-col lg:flex-row gap-6 mt-3">
          <SearchAutocomplete />
          <SearchSuggestions />
          <SearchTrending />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:py-8">
      {q && (
        <p className="mb-6 text-n-600">
          Results for <span className="font-semibold text-n-900">"{q}"</span>
        </p>
      )}
      <QueryStateHandler
        query={productQuery}
        isEmpty={productQuery?.data?.meta?.totalRows === 0}
        loadingSkeleton={<ProductListSkeleton />}
        emptyTitle="No products found"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productQuery?.data?.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
