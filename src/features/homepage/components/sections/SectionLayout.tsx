import { DisplayTypeEnum } from "../../types/enums";
import type {
  DisplaySettings,
  GridDisplaySettings,
  HorizontalListDisplaySettings,
  SliderDisplaySettings,
} from "../../types/types";
import { GridLayout } from "../layouts/GridLayout";
import { HorizontalListLayout } from "../layouts/HorizontalListLayout";
import { SingleSlideLayout } from "../layouts/SingleSlideLayout";
import { SliderLayout } from "../layouts/SliderLayout";

interface SectionLayoutProps {
  displaySettings: DisplaySettings;
  children: React.ReactNode;
}

export function SectionLayout({
  displaySettings,
  children,
}: SectionLayoutProps) {
  switch (displaySettings.displayType) {
    case DisplayTypeEnum.SLIDER:
      return (
        <SliderLayout
          displaySettings={displaySettings as SliderDisplaySettings}
        >
          {children}
        </SliderLayout>
      );
    case DisplayTypeEnum.HORIZONTAL_LIST:
      return (
        <HorizontalListLayout
          displaySettings={displaySettings as HorizontalListDisplaySettings}
        >
          {children}
        </HorizontalListLayout>
      );
    case DisplayTypeEnum.GRID:
      return (
        <GridLayout displaySettings={displaySettings as GridDisplaySettings}>
          {children}
        </GridLayout>
      );
    case DisplayTypeEnum.SINGLE_SLIDE:
      return <SingleSlideLayout>{children}</SingleSlideLayout>;
    default:
      return (
        <HorizontalListLayout
          displaySettings={displaySettings as HorizontalListDisplaySettings}
        >
          {children}
        </HorizontalListLayout>
      );
  }
}
