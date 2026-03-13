import { useQuery } from "@tanstack/react-query";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { SourceTypeEnum } from "../types/enums";
import type { Section, Banner } from "../types/types";
import type { Product } from "@/features/products/types";
import type { Category } from "@/features/categories/types/types";
import { homepageQueries } from "../homepageQueries";
import { ProductSection } from "./sections/ProductSection";
import { CategorySection } from "./sections/CategorySection";
import { BannerSection } from "./sections/BannerSection";
import { SectionSkeleton } from "./skeletons/SectionSkeleton";

interface SectionContentProps {
  section: Section;
}

export function SectionContent({ section }: SectionContentProps) {
  const contentQuery = useQuery(
    homepageQueries.sectionContent(section.actionApi),
  );

  return (
    <QueryStateHandler
      query={contentQuery}
      loadingSkeleton={<SectionSkeleton />}
      emptyTitle=""
    >
      <SectionContentInner section={section} />
    </QueryStateHandler>
  );
}

function SectionContentInner({ section }: SectionContentProps) {
  const { data } = useQuery(homepageQueries.sectionContent(section.actionApi));
  const items = data?.data ?? [];
  const { displaySettings, contentConfig } = section;

  switch (contentConfig.sourceType) {
    case SourceTypeEnum.PRODUCT:
      return (
        <ProductSection
          items={items as Product[]}
          displaySettings={displaySettings}
        />
      );
    case SourceTypeEnum.CATEGORY:
      return (
        <CategorySection
          items={items as Category[]}
          displaySettings={displaySettings}
        />
      );
    case SourceTypeEnum.BANNER:
      return (
        <BannerSection
          items={items as Banner[]}
          displaySettings={displaySettings}
        />
      );
    default:
      return null;
  }
}
