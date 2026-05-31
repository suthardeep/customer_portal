import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/features/categories/categoryQueries";
import { CategoryGrid } from "@/features/categories/components/CategoryGrid";
import { CategoryListSkeleton } from "@/features/categories/components/skeletons/CategoryListSkeleton";
import FallbackView from "@/components/empty-states/FallbackView";
import { buildMeta, APP_NAME, APP_URL } from "@/utils/seo";

export const Route = createFileRoute("/_public/categories/")({
  head: () => ({
    meta: buildMeta({
      title: `Browse Categories — ${APP_NAME}`,
      description: `Explore all product categories on ${APP_NAME}. Find fashion, electronics, home goods and more.`,
      url: `${APP_URL}/categories`,
    }),
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      categoryQueries.tree({
        currentPage: 1,
        pageSize: 10,
      }),
    );
  },
  pendingComponent: CategoryListSkeleton,
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-8">
      <FallbackView
        title={error.message || "Failed to load categories"}
        icon="AlertCircle"
        version="default"
      />
    </div>
  ),
  component: CategoriesIndexComponent,
});

function CategoriesIndexComponent() {
  const { data: categoryResponse } = useSuspenseQuery(
    categoryQueries.tree({
      currentPage: 1,
      pageSize: 10,
    }),
  );
  const categories = categoryResponse?.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h5 className="mb-6 font-semibold text-n-1000">Browse Categories</h5>
      <CategoryGrid categories={categories} />
    </div>
  );
}
