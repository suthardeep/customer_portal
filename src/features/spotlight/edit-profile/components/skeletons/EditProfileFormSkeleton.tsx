export function EditProfileFormSkeleton() {
  return (
    <div className="p-6">
      {/* Title */}
      <div className="shimmer h-6 w-40 rounded mb-6" />

      {/* Avatar */}
      <div className="shimmer size-20 rounded-full mb-6" />

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <div className="shimmer h-4 w-20 rounded" />
          <div className="shimmer h-11 w-full rounded-xl" />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <div className="shimmer h-4 w-12 rounded" />
          <div className="shimmer h-11 w-full rounded-xl" />
        </div>

        {/* Content Niche chips */}
        <div className="space-y-2">
          <div className="shimmer h-4 w-28 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="shimmer h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-1.5">
          <div className="shimmer h-4 w-16 rounded" />
          <div className="shimmer h-[130px] w-full rounded-xl" />
        </div>
      </div>

      {/* Social + Tier card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-4">
          <div className="shimmer h-5 w-32 rounded" />
          <div className="space-y-1.5">
            <div className="shimmer h-4 w-40 rounded" />
            <div className="shimmer h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <div className="shimmer h-4 w-36 rounded" />
            <div className="shimmer h-11 w-full rounded-xl" />
          </div>
        </div>

        <div className="shimmer h-36 w-full rounded-2xl" />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <div className="shimmer h-10 w-32 rounded-xl" />
      </div>
    </div>
  );
}
