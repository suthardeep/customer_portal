import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { WishlistCollection } from "@/features/wishlist/types/types";

interface WishlistCollectionTile {
  collection: WishlistCollection;
  alreadyHasThisProduct?: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const WishlistCollectionTile: React.FC<WishlistCollectionTile> = (props) => {
  const { collection, alreadyHasThisProduct, onAdd, onRemove } = props;
  const hasImages = collection?.itemImages?.length > 0;

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
          <div className="grid grid-cols-2">
            {collection.itemImages.slice(0, 4).map((image, index) => (
              <Image
                key={index}
                alt={`${collection.name} item ${index + 1}`}
                src={image}
                className="aspect-square object-cover"
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
      <IconButton
        aria-label="Add product to this collection"
        icon={alreadyHasThisProduct ? "Check" : "AddCircle"}
        className="ml-auto"
        variant={"ghost"}
        size="xl"
        strokeWidth={alreadyHasThisProduct ? 3 : 1.5}
        color="neutral"
        iconClassName={
          alreadyHasThisProduct ? "bg-p-100 rounded-full text-p-500 p-1" : ""
        }
      />
    </div>
  );
};

export default WishlistCollectionTile;
