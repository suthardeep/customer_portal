import type { Category } from "../types/types";
import { CategoryCard } from "./CategoryCard";
import FallbackView from "@/components/empty-states/FallbackView";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <FallbackView
        title="No categories available"
        icon="FolderOpen"
        version="default"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          className="w-full md:w-full shrink-0"
        />
      ))}
    </div>
  );
}
