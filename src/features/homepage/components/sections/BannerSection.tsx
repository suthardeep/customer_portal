import type { Banner, DisplaySettings } from "../../types/types";
import { BannerCard } from "../BannerCard";
import { SectionLayout } from "./SectionLayout";

interface BannerSectionProps {
  items: Banner[];
  displaySettings: DisplaySettings;
}

export function BannerSection({ items, displaySettings }: BannerSectionProps) {
  return (
    <SectionLayout displaySettings={displaySettings}>
      {items.map((banner) => (
        <BannerCard key={banner.id} banner={banner} />
      ))}
    </SectionLayout>
  );
}
