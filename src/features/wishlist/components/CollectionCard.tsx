import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import { Link } from "@tanstack/react-router";
import type { WishlistCollection } from "../types/types";

interface CollectionCardProps {
  collection: WishlistCollection;
  className?: string;
}

export function CollectionCard({ collection, className }: CollectionCardProps) {
  const hasImages = (collection?.itemImages?.length ?? 0) > 0;
  return (
    <Link
      to="/account/wishlist/$collectionId"
      params={{ collectionId: collection.id }}
      className={cn(
        "group relative overflow-hidden bg-white cursor-pointer",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-3xl border border-n-500 bg-white aspect-square overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => {
            const image = collection.itemImages[index];
            const borderClass = cn(
              hasImages && index % 2 === 0 && "border-r border-n-500",
              hasImages && index >= 2 && "border-t border-n-500",
            );
            return image ? (
              <Image
                key={index}
                alt={`${collection.name} item ${index + 1}`}
                src={image}
                className={cn("aspect-square object-cover", borderClass)}
              />
            ) : (
              <div
                key={index}
                className={cn("aspect-square bg-n-200", borderClass)}
              />
            );
          })}
        </div>
        <p className="line-clamp-2 p-3 font-medium text-gray-900 group-hover:text-p-500">
          {collection.name}
        </p>
      </div>
    </Link>
  );
}
