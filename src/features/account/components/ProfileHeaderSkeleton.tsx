export function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-start gap-3 border-b border-n-200 pb-6">
      {/* Avatar skeleton */}
      <div className="relative">
        <div className="size-20 rounded-full bg-n-200 shimmer" />
        {/* Badge skeleton */}
        <div className="absolute -right-1 -top-1 size-5 rounded-full bg-n-200 shimmer" />
      </div>

      {/* User info skeleton */}
      <div className="flex-1 space-y-2">
        {/* Name skeleton */}
        <div className="h-5 w-32 rounded bg-n-200 shimmer" />
        {/* Phone skeleton */}
        <div className="h-4 w-40 rounded bg-n-200 shimmer" />
      </div>

      {/* Edit button skeleton */}
      <div className="size-8 rounded-lg bg-n-200 shimmer" />
    </div>
  );
}
