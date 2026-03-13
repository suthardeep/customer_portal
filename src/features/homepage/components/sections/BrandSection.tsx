import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { Link } from "@tanstack/react-router";
import type { DisplaySettings } from "../../types/types";
import { SectionLayout } from "./SectionLayout";

interface BrandItem {
  id: string;
  name: string;
  image: string;
}

interface BrandSectionProps {
  items: BrandItem[];
  displaySettings: DisplaySettings;
}

export function BrandSection({ items, displaySettings }: BrandSectionProps) {
  return (
    <SectionLayout displaySettings={displaySettings}>
      {items.map((brand) => (
        <Link
          key={brand.id}
          to="/categories/$categoryId"
          params={{ categoryId: brand.id }}
        >
          <CategoryCard category={{ name: brand.name, image: brand.image }} />
        </Link>
      ))}
    </SectionLayout>
  );
}
