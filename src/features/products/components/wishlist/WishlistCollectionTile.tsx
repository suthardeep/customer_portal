import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import Spinner from "@/components/compound/spinner/Spinner";
import { WishlistCollection } from "@/features/wishlist/types/types";

interface WishlistCollectionTile {
  collection: WishlistCollection;
  alreadyHasThisProduct?: boolean;
  onAdd: () => void;
  onRemove: () => void;
  isLoading?: boolean;
}

const WishlistCollectionTile: React.FC<WishlistCollectionTile> = (props) => {
  const { collection, alreadyHasThisProduct, onAdd, onRemove, isLoading } =
    props;
  const imageCount = collection?.itemImages?.length ?? 0;
  const hasImages = imageCount > 0;
  const displayImages =
    imageCount > 2
      ? collection.itemImages.slice(0, 4)
      : collection.itemImages?.slice(0, imageCount);
  const gridCols = imageCount === 1 ? "grid-cols-1" : "grid-cols-2";

  const handleClick = () => {
    if (alreadyHasThisProduct) {
      onRemove();
    } else {
      onAdd();
    }
  };

  return (
    <div
      className="flex items-center gap-4 cursor-pointer p-1 rounded-lg hover:bg-n-300/70 transition-colors"
      onClick={handleClick}
    >
      <div className="size-10 rounded-lg overflow-hidden">
        {hasImages ? (
          <div className={`grid ${gridCols} h-full gap-px bg-white`}>
            {displayImages.map((image, index) => (
              <Image
                key={index}
                alt={`${collection.name} item ${index + 1}`}
                src={image}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        ) : (
          <Image
            key={collection?.id}
            alt={`${collection.name}`}
            src={undefined}
            className="aspect-square object-cover"
          />
        )}
      </div>

      <p className="line-clamp-2 font-medium text-gray-900">
        {collection.name}
      </p>

      <div className="fall ml-auto">
        {isLoading ? (
          <Spinner className="mr-2 stroke-n-700" />
        ) : (
          <IconButton
            aria-label="Add product to this collection"
            icon={alreadyHasThisProduct ? "Check" : "AddCircle"}
            variant={"ghost"}
            size="xl"
            strokeWidth={alreadyHasThisProduct ? 3 : 1.5}
            color="neutral"
            iconClassName={
              alreadyHasThisProduct
                ? "bg-p-500 rounded-full text-white p-1"
                : ""
            }
          />
        )}
      </div>
    </div>
  );
};

export default WishlistCollectionTile;
