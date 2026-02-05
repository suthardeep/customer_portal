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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
