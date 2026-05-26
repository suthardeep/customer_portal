export function FooterSkeleton() {
  return (
    <div className="mx-auto max-w-8xl px-4 lg:px-10 pt-14 pb-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Brand column */}
        <div className="lg:w-[35%] flex flex-col gap-5">
          <div className="h-8 w-28 rounded bg-n-800 shimmer" />
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="h-3 w-full rounded bg-n-800 shimmer" />
            <div className="h-3 w-4/5 rounded bg-n-800 shimmer" />
            <div className="h-3 w-3/5 rounded bg-n-800 shimmer" />
          </div>
          <div className="flex items-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-9 rounded-full bg-n-800 shimmer"
              />
            ))}
          </div>
        </div>

        {/* Nav links column */}
        <div className="lg:w-[14%] flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-20 rounded bg-n-800 shimmer" />
          ))}
        </div>

        {/* Policy links column */}
        <div className="lg:w-[14%] flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-3 w-24 rounded bg-n-800 shimmer" />
          ))}
        </div>

        {/* Address column */}
        <div className="lg:flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 rounded bg-n-800 shimmer" />
            <div className="h-3 w-full rounded bg-n-800 shimmer" />
            <div className="h-3 w-4/5 rounded bg-n-800 shimmer" />
            <div className="h-3 w-3/5 rounded bg-n-800 shimmer" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-3 w-20 rounded bg-n-800 shimmer" />
            <div className="flex items-center gap-3">
              <div className="h-9 w-28 rounded bg-n-800 shimmer" />
              <div className="h-9 w-28 rounded bg-n-800 shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-700/60 pt-6 flex justify-center">
        <div className="h-3 w-64 rounded bg-n-800 shimmer" />
      </div>
    </div>
  );
}
