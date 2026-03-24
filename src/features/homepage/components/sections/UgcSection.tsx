import type { FeedPost } from "@/features/spotlight/types/feed.types";
import SpotlightPostCard from "@/features/spotlight/components/SpotlightPostCard";
import type { DisplaySettings } from "../../types/types";
import { SectionLayout } from "./SectionLayout";

interface UgcSectionProps {
  items: FeedPost[];
  displaySettings: DisplaySettings;
}

export function UgcSection({ items, displaySettings }: UgcSectionProps) {
  return (
    <SectionLayout displaySettings={displaySettings}>
      {items.map((post) => (
        <SpotlightPostCard key={post.id} post={post} />
      ))}
    </SectionLayout>
  );
}
