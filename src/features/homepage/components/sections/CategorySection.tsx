import { CategoryCard } from "@/features/categories/components/CategoryCard";
import type { Category } from "@/features/categories/types/types";
import { Link } from "@tanstack/react-router";
import type { DisplaySettings } from "../../types/types";
import { SectionLayout } from "./SectionLayout";

interface CategorySectionProps {
  items: Category[];
  displaySettings: DisplaySettings;
}

export function CategorySection({
  items,
  displaySettings,
}: CategorySectionProps) {
  return (
    <SectionLayout displaySettings={displaySettings}>
      {items.map((category) => (
        <Link
          key={category.id}
          to="/categories/$categoryId"
          params={{ categoryId: category.id }}
        >
          <CategoryCard category={category} />
        </Link>
      ))}
    </SectionLayout>
  );
}
