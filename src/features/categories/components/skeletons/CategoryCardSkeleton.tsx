export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white shrink-0 w-32 md:w-40">
      <div className="shimmer aspect-square w-full" />
      <div className="flex flex-col items-center p-1 py-3 md:px-2 md:py-4">
        <div className="shimmer h-4 w-20 rounded" />
      </div>
    </div>
  );
}
