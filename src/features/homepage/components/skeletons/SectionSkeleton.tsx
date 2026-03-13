export function SectionSkeleton() {
  return (
    <div className="py-4">
      <div className="shimmer mb-1 h-5 w-36 rounded" />
      <div className="shimmer mb-4 h-3.5 w-48 rounded" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="shimmer h-48 w-44 shrink-0 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
