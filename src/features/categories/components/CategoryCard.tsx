import type { Category } from "../types/types";
import { DEFAULT_CATEGORY_IMAGE } from "../constants";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";

interface CategoryCardProps {
  category: Category;
  imgClassName?: string;
}

export function CategoryCard({ category, imgClassName }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shrink-0 w-32 md:w-40",
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={category.image || DEFAULT_CATEGORY_IMAGE}
          alt={category.name}
          className={imgClassName}
        />
      </div>

      <div className="flex flex-1 flex-col p-1 py-3 md:px-2 md:py-4 text-center">
        <p className="font-medium text-gray-900">{category.name}</p>
      </div>
    </div>
  );
}
