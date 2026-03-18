export function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-4">
      {/* Page title */}
      <div className="shimmer h-7 w-52 rounded-lg" />

      {/* Current Status card */}
      <div className="shimmer h-[168px] w-full rounded-xl" />

      {/* Total Views card */}
      <div className="shimmer h-20 w-full rounded-xl" />

      {/* Posts Created + Conversation Rate (2-col grid) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="shimmer h-28 w-full rounded-xl" />
        <div className="shimmer h-28 w-full rounded-xl" />
      </div>

      {/* Aavak Coins card */}
      <div className="shimmer h-20 w-full rounded-xl" />
    </div>
  );
}
