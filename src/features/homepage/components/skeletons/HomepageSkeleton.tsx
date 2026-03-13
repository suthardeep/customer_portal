import { SectionSkeleton } from "./SectionSkeleton";
import { BannerCardSkeleton } from "./BannerCardSkeleton";

export function HomepageSkeleton() {
  return (
    <div className="flex flex-col gap-2 px-4 md:px-0">
      <div className="py-4">
        <BannerCardSkeleton />
      </div>
      <SectionSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}
