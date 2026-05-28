import type { Banner, DisplaySettings } from "../../types/types";
import { BannerRatioEnum } from "../../types/enums";
import { BannerCard } from "../BannerCard";
import { SectionLayout } from "./SectionLayout";

interface BannerSectionProps {
  items: Banner[];
  displaySettings: DisplaySettings;
}

const BANNER_WIDE_RATIO = BannerRatioEnum["16:9"];
const BANNER_SLIDER_BASIS_WIDE = "md:basis-1/2 basis-full";
const BANNER_SLIDER_BASIS_NARROW = "md:basis-1/2 basis-full";
const BANNER_GRID_COLS_WIDE = "grid-cols-1";
const BANNER_GRID_COLS_NARROW = "grid-cols-1 md:grid-cols-2";

export function BannerSection({ items, displaySettings }: BannerSectionProps) {
  const ratio = items[0]?.ratio;
  const isWide = !ratio || ratio === BANNER_WIDE_RATIO || ratio === BannerRatioEnum["32:9"];

  return (
    <SectionLayout
      displaySettings={displaySettings}
      slideBasis={isWide ? BANNER_SLIDER_BASIS_WIDE : BANNER_SLIDER_BASIS_NARROW}
      colsOverride={isWide ? BANNER_GRID_COLS_WIDE : BANNER_GRID_COLS_NARROW}
      align="start"
    >
      {items.map((banner) => (
        <BannerCard key={banner.id} banner={banner} />
      ))}
    </SectionLayout>
  );
}
