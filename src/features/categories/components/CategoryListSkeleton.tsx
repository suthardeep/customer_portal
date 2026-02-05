import { CategoryCardSkeleton } from './CategoryCardSkeleton';

export function CategoryListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
