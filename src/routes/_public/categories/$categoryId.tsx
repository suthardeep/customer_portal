import HorizontalScrollSection from "@/components/compound/HorizontalScrollSection";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import FallbackView from "@/components/empty-states/FallbackView";
import { categoryQueries } from "@/features/categories/categoryQueries";
import { CATEGORY_TREE_PARAMS } from "@/features/categories/constants";
import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { CategoryDetailSkeleton } from "@/features/categories/components/skeletons/CategoryDetailSkeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductCardSkeleton } from "@/features/products/components/ProductCardSkeleton";
import { productQueries } from "@/features/products/productQueries";
import { buildMeta, APP_NAME, APP_URL } from "@/utils/seo";
import { useQueries, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const categorySearchSchema = z.object({
  subCategoryId: z.string().optional(),
});

export const Route = createFileRoute("/_public/categories/$categoryId")({
  validateSearch: categorySearchSchema,
  beforeLoad: async ({ search, params, context }) => {
    if (!search.subCategoryId) {
      const tree = await context.queryClient.ensureQueryData(
        categoryQueries.tree(CATEGORY_TREE_PARAMS),
      );
      const mainCategory = tree.data.find((c) => c.id === params.categoryId);
      const firstSub = mainCategory?.children?.[0];
      if (firstSub) {
        throw redirect({
          to: "/categories/$categoryId",
          params: { categoryId: params.categoryId },
          search: { subCategoryId: firstSub.id },
          replace: true,
        });
      }
    }
  },
  loader: async ({ context, params }) => {
    const tree = await context.queryClient.ensureQueryData(
      categoryQueries.tree(CATEGORY_TREE_PARAMS),
    );
    return tree.data.find((c) => c.id === params.categoryId) ?? null;
  },
  head: ({ loaderData, params }) => {
    const category = loaderData;
    const name = category?.name ?? "Category";
    return {
      meta: buildMeta({
        title: `${name} — ${APP_NAME}`,
        description: `Shop ${name} products on ${APP_NAME}. Browse the latest collection.`,
        url: `${APP_URL}/categories/${params.categoryId}`,
        image: category?.image ?? undefined,
      }),
    };
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=1800',
  }),
  pendingComponent: CategoryDetailSkeleton,
  component: CategoryDetailComponent,
  errorComponent: (err) => (
    <FallbackView title={err.error.message ?? "Unable to fetch category"} />
  ),
  staticData: {
    showCategorySubNav: true,
  },
});

function CategoryDetailComponent() {
  const { categoryId } = Route.useParams();
  const { subCategoryId } = Route.useSearch();

  const { data } = useSuspenseQuery(categoryQueries.tree(CATEGORY_TREE_PARAMS));
  const mainCategory = data.data.find((c) => c.id === categoryId);
  const subCategories = mainCategory?.children ?? [];

  const selectedSub =
    subCategories.find((s) => s.id === subCategoryId) ?? subCategories[0];

  const childCategories = selectedSub?.children ?? [];

  const sections = selectedSub
    ? childCategories.length > 0
      ? childCategories.map((c) => ({ id: c.id, name: c.name }))
      : [{ id: selectedSub.id, name: selectedSub.name }]
    : [];

  const productResults = useQueries({
    queries: sections.map((section) =>
      productQueries.list({
        categoryId: section.id,
        pageSize: PRODUCTS_PER_SUBCATEGORY,
        currentPage: 1,
      }),
    ),
  });

  if (subCategories.length === 0) {
    return (
      <FallbackView
        icon="ShoppingCart"
        title="No categories found"
        subtitle="This category has no sub-categories yet."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Subcategory cards */}
      {subCategories.length > 0 && (
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {subCategories.map((category) => (
            <Link
              key={category.id}
              to="/categories/$categoryId"
              params={{ categoryId }}
              search={{ subCategoryId: category.id }}
              replace
            >
              <CategoryCard
                category={{ ...category, image: category.image ?? undefined }}
                isSelected={category.id === selectedSub?.id}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Products grouped by selected sub category and its children */}
      {sections.map((section, index) => {
        const query = productResults[index];
        const hasNoProducts = query?.data?.meta?.totalRows === 0;
        if (hasNoProducts) return null;
        const hasMultiplePages = (query?.data?.meta?.totalPages ?? 0) > 1;

        return (
          <HorizontalScrollSection
            key={section.id}
            title={section.name}
            seeAllLink={`/categories/products/${section.id}`}
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
                {query?.data?.data.map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className="w-48 shrink-0"
                    />
                  );
                })}
              </>
            </QueryStateHandler>
          </HorizontalScrollSection>
        );
      })}
    </div>
  );
}

const PRODUCTS_PER_SUBCATEGORY = 10;
