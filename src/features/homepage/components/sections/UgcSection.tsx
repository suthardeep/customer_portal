import type { FeedPost } from "@/features/spotlight/types/feed.types";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import type { DisplaySettings } from "../../types/types";
import { SectionLayout } from "./SectionLayout";

interface UgcSectionProps {
  items: FeedPost[];
  displaySettings: DisplaySettings;
}

const UGC_SLIDER_BASIS = "basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6";
const UGC_GRID_COLS = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

export function UgcSection({ items, displaySettings }: UgcSectionProps) {
  return (
    <SectionLayout
      displaySettings={displaySettings}
      slideBasis={UGC_SLIDER_BASIS}
      colsOverride={UGC_GRID_COLS}
      align="start"
    >
      {items.map((post) => (
        <SpotlightPostCard key={post.id} post={post} />
      ))}
    </SectionLayout>
  );
}
