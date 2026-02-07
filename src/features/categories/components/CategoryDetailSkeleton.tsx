import { CategoryCardSkeleton } from './CategoryCardSkeleton';

export function CategoryDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      <div className="mb-8 h-12 w-96 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      <div className="mb-8">
        <div className="relative aspect-[21/9] w-full max-w-4xl animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="mb-6 h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
