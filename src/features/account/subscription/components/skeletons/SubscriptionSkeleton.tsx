export default function SubscriptionSkeleton() {
  return (
    <div className="relative min-h-screen bg-s-1000 overflow-hidden">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <div className="shimmer size-9 rounded-xl opacity-20" />
      </div>

      <div className="relative z-1 flex flex-col items-center px-5 pb-10 pt-18 mx-auto md:max-w-xl lg:max-w-2xl">
        {/* Badge placeholder */}
        <div className="shimmer w-52 h-56 rounded-full opacity-20" />

        {/* Title + subtitle */}
        <div className="text-center mt-8 mb-8 space-y-3 w-full flex flex-col items-center">
          <div className="shimmer h-7 w-48 rounded opacity-20" />
          <div className="shimmer h-4 w-64 rounded opacity-20" />
          <div className="shimmer h-4 w-40 rounded opacity-20" />
        </div>

        {/* Feature grid — 2 columns, 3 rows */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="shimmer h-20 rounded-xl opacity-20"
            />
          ))}
        </div>

        {/* Plan selector */}
        <div className="w-full mt-8 flex flex-col gap-3">
          <div className="shimmer h-24 w-full rounded-2xl opacity-20" />
          <div className="shimmer h-24 w-full rounded-2xl opacity-20" />
          <div className="shimmer h-12 w-full rounded-xl opacity-20 mt-2" />
        </div>

        {/* Footer links */}
        <div className="mt-8 flex gap-4">
          <div className="shimmer h-4 w-24 rounded opacity-20" />
          <div className="shimmer h-4 w-24 rounded opacity-20" />
        </div>
      </div>
    </div>
  );
}
