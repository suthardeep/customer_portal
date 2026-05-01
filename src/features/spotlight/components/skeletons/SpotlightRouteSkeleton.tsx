import { SpotlightProfileSidebarSkeleton } from "./SpotlightProfileSidebarSkeleton";

export function SpotlightRouteSkeleton() {
  return (
    <div className="flex gap-x-7 md:p-6 lg:py-8 items-stretch">
      <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400 hidden lg:block">
        <SpotlightProfileSidebarSkeleton />
      </aside>
      <div className="rounded-xl bg-white lg:[&>div]:p-6 lg:border border-n-400 w-full">
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shimmer h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
