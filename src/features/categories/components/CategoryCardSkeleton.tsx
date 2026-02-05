import { cn } from '@/utils/cssHelpers';

export function CategoryCardSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm',
        'dark:border-gray-700 dark:bg-gray-800',
      )}
    >
      <div className="relative aspect-[4/3] w-full animate-pulse bg-gray-200 dark:bg-gray-700">
        <div className="absolute top-2 right-2 h-5 w-16 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-auto h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
