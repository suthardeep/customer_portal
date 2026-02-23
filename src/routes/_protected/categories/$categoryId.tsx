import HorizontalScrollSection from "@/components/compound/HorizontalScrollSection";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { categoryQueries } from "@/features/categories/categoryQueries";
import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { CategoryDetailSkeleton } from "@/features/categories/components/skeletons/CategoryDetailSkeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductCardSkeleton } from "@/features/products/components/ProductCardSkeleton";
import { productQueries } from "@/features/products/productQueries";
import { useQueries, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/categories/$categoryId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      categoryQueries.detail(params.categoryId),
    );
  },
  pendingComponent: CategoryDetailSkeleton,
  component: CategoryDetailComponent,
  errorComponent: (err) => <div>Err - {err.error.message} </div>,
  staticData: {
    showCategorySubNav: true,
  },
});

function CategoryDetailComponent() {
  const { categoryId } = Route.useParams();

  const { data } = useSuspenseQuery(categoryQueries.detail(categoryId));
  const { subCategories } = data;

  const productQueriesResults = useQueries({
    queries: subCategories.map((subcategory) =>
      productQueries.list({
        categoryId: subcategory.id,
        pageSize: PRODUCTS_PER_SUBCATEGORY,
        currentPage: 1,
      }),
    ),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Subcategory cards */}
      {subCategories.length > 0 && (
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {subCategories?.map((category) => (
            <CategoryCard key={category?.id} category={category} />
          ))}
        </div>
      )}

      {subCategories.map((subcategory, index) => {
        const query = productQueriesResults[index];
        const hasNoProducts = query?.data?.meta?.totalRows === 0;
        const hasMultiplePages = (query?.data?.meta?.totalPages ?? 0) > 1;
        if (hasNoProducts) return;
        console.log(query?.data?.data);

        return (
          <HorizontalScrollSection
            key={subcategory.id}
            title={subcategory.name}
            seeAllLink={`/categories/${subcategory.id}/products`}
            className="mb-8"
            hideSeeAll={!hasMultiplePages}
          >
            <QueryStateHandler
              query={query}
              emptyTitle="No products here"
              loadingSkeleton={<ProductCardSkeleton />}
              isEmpty={query?.data?.meta?.totalRows === 0}
              fallbackIcon="PackageRemove"
            >
              <>
                {query?.data?.data.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="w-48 shrink-0"
                  />
                ))}
              </>
            </QueryStateHandler>
          </HorizontalScrollSection>
        );
      })}
    </div>
  );
}

const PRODUCTS_PER_SUBCATEGORY = 10;
