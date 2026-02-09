import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { categoryQueries } from "@/features/categories/categoryQueries";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductListSkeleton } from "@/features/products/components/ProductListSkeleton";
import { productQueries } from "@/features/products/productQueries";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/categories/$categoryId/products",
)({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      categoryQueries.detail(params.categoryId),
    );
  },
  pendingComponent: ProductListSkeleton,
  component: ProductListComponent,
});

function ProductListComponent() {
  const { categoryId } = Route.useParams();

  const { data: categoryData } = useSuspenseQuery(
    categoryQueries.detail(categoryId),
  );
  const productQuery = useQuery(
    productQueries.list({
      categoryId,
      currentPage: 1,
      pageSize: 10,
    }),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6">{categoryData.category.name}</h1>

      <QueryStateHandler
        query={productQuery}
        isEmpty={productQuery?.data?.meta?.totalRows === 0}
        loadingSkeleton={<ProductListSkeleton />}
        emptyTitle="No products here"
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
