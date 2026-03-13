import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/features/categories/categoryQueries";
import { CategoryGrid } from "@/features/categories/components/CategoryGrid";
import { CategoryListSkeleton } from "@/features/categories/components/skeletons/CategoryListSkeleton";
import FallbackView from "@/components/empty-states/FallbackView";

export const Route = createFileRoute("/_public/categories/")({
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
      <h5 className="mb-6">Browse Categories</h5>
      <CategoryGrid categories={categories} />
    </div>
  );
}
