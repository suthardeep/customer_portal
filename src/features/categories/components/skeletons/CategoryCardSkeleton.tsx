import { cn } from '@/utils/cssHelpers';

export function CategoryCardSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm',
        'dark:border-gray-700 dark:bg-gray-800',
      )}
    >
      <div className="shimmer relative aspect-[4/3] w-full">
        <div className="absolute top-2 right-2 h-5 w-16 rounded-full bg-n-300" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="shimmer mb-2 h-6 w-3/4" />
        <div className="shimmer mt-auto h-4 w-full" />
      </div>
    </div>
  );
}
