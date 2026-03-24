export function ShortFeedSkeleton() {
  return (
    <div className="h-dvh lg:h-[calc(100dvh-180px)] w-full bg-black lg:bg-transparent lg:grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-4 lg:items-start lg:p-6 relative">
      {/* Desktop: left column (back button + tagged products) */}
      <div className="hidden xl:flex flex-col h-full justify-between">
        <div className="shimmer h-9 w-9 rounded-lg" />
        <div className="flex flex-col gap-3">
          <div className="shimmer h-5 w-36 rounded" />
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="shimmer h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Player area */}
      <div className="absolute inset-0 lg:relative lg:aspect-9/16 lg:max-h-[80vh] lg:w-full lg:rounded-md lg:overflow-hidden">
        <div className="shimmer size-full lg:rounded-xl" />

        {/* Tablet tagged products */}
        <div className="absolute bottom-10 left-4 z-10 hidden lg:flex xl:hidden items-center gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="shimmer size-10 rounded-xl"
              style={{ marginLeft: i > 0 ? "-18px" : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Mobile overlay chrome */}
      <div className="lg:hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black/80 to-transparent z-5 pointer-events-none" />
        <div className="absolute bottom-10 left-4 right-4 z-10">
          <div className="flex items-center justify-between gap-4 mb-14">
            {/* Mobile tagged products stack */}
            <div className="flex items-center">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="shimmer size-10 rounded-xl border-2 border-white"
                  style={{
                    marginLeft: i > 0 ? "-18px" : 0,
                    zIndex: i,
                    position: "relative",
                  }}
                />
              ))}
            </div>

            {/* Mobile action buttons */}
            <div className="flex flex-col gap-4 z-10 mb-16 mr-0">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex flex-col gap-0.5 items-center">
                  <div className="shimmer size-10 rounded-full" />
                  <div className="shimmer h-3 w-6 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile creator info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="shimmer size-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <div className="shimmer h-4 w-24 rounded" />
              <div className="shimmer h-3.5 w-40 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: right column (creator info + actions) */}
      <div className="hidden lg:flex flex-col justify-between w-full h-full items-start">
        {/* Creator info */}
        <div className="flex items-center gap-3 mb-4 w-full">
          <div className="shimmer size-10 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <div className="shimmer h-4 w-24 rounded" />
            <div className="shimmer h-3.5 w-40 rounded" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 ml-8 my-auto">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col gap-0.5 items-center">
              <div className="shimmer size-10 rounded-full" />
              <div className="shimmer h-3 w-6 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
