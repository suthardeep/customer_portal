import type { Category } from "../types/types";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";

interface CategoryCardProps {
  category: Pick<Category, "name" | "image">;
  imgClassName?: string;
  isSelected?: boolean;
  className?: string;
}

export function CategoryCard({
  category,
  imgClassName,
  isSelected,
  className,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden h-full rounded-lg border-2 bg-white shrink-0 w-32 md:w-40 group",
        isSelected ? "border-p-400 shadow-md" : "border-gray-100",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          className={cn("object-contain", imgClassName)}
        />
      </div>

      <div className="flex flex-1 flex-col p-1 py-3 md:px-2 md:py-4 text-center">
        <p className="font-medium text-gray-900 group-hover:text-p-600 transition-colors">
          {category.name}
        </p>
      </div>
    </div>
  );
}
