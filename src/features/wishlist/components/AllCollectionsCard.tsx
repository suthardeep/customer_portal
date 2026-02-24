import { cn } from "@/utils/cssHelpers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { wishlistQueries } from "../wishlistQueries";
import { Image } from "@/components/base/Image";

const AllCollectionsCard = () => {
  const query = useQuery(wishlistQueries.collectionsProducts("ALL"));
  const products = query?.data?.data ?? [];
  return (
    <Link
      to="/account/wishlist/$collectionId"
      params={{ collectionId: "ALL" }}
      className={cn("group relative overflow-hidden bg-white cursor-pointer")}
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-2 rounded-3xl border border-n-500 bg-white aspect-square overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => {
            const image = products?.[index];
            const hasImages = Boolean(image);
            const borderClass = cn(
              hasImages && index % 2 === 0 && "border-r border-n-500",
              hasImages && index >= 2 && "border-t border-n-500",
            );
            return image ? (
              <Image
                key={index}
                alt={`${image.name} item ${index + 1}`}
                src={image.mediaUrls?.[0] ?? ""}
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
          All
        </p>
      </div>
    </Link>
  );
};

export default AllCollectionsCard;
