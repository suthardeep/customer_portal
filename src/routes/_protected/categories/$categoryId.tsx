import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { categoryQueries } from '@/features/categories/categoryQueries';
import { CategoryDetailSkeleton } from '@/features/categories/components/CategoryDetailSkeleton';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { DEFAULT_CATEGORY_IMAGE } from '@/features/categories/constants';

export const Route = createFileRoute('/_protected/categories/$categoryId')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      categoryQueries.detail(params.categoryId),
    );
  },
  pendingComponent: CategoryDetailSkeleton,
  component: CategoryDetailComponent,
});

function CategoryDetailComponent() {
  const { categoryId } = Route.useParams();

  const { data: category } = useSuspenseQuery(
    categoryQueries.detail(categoryId),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{category.fullPath.split('/').join(' / ')}</span>
      </nav>

      <h1 className="mb-8">{category.name}</h1>

      {category.image && (
        <div className="mb-8">
          <img
            src={category.image || DEFAULT_CATEGORY_IMAGE}
            alt={category.name}
            className="w-full max-w-4xl rounded-lg object-cover"
            style={{ aspectRatio: '21/9' }}
          />
        </div>
      )}

      {category.children.length > 0 && (
        <div>
          <h2 className="mb-6">Subcategories</h2>
          <CategoryGrid categories={category.children} />
        </div>
      )}
    </div>
  );
}
