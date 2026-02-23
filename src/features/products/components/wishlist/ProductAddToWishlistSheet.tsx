import { IconButton } from "@/components/base/icon-button/IconButton";
import Sheet from "@/components/base/sheet/Sheet";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useAddItemToCollectionMutation } from "@/features/wishlist/wishlistMutations";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { useQuery } from "@tanstack/react-query";
import WishlistCollectionTile from "./WishlistCollectionTile";

interface ProductAddToWishlistSheet {
  productId: string;
  variantId: string;
  isOpen: boolean;
  productName: string;
  onClose: () => void;
}

const ProductAddToWishlistSheet: React.FC<ProductAddToWishlistSheet> = (
  props,
) => {
  const { isOpen, onClose, productId, variantId, productName } = props;
  const wishlistCollectionQuery = useQuery(wishlistQueries.collections());
  const addToWishlistMutation = useAddItemToCollectionMutation();

  const handleRemoveFromAll = () => {};
  const handleAddToCollection = (collectionId: string) => {
    addToWishlistMutation.mutate({
      collectionIds: [collectionId],
      productId,
      variantId: variantId,
    });
  };

  const handleRemoveFromCollection = (collectionId: string) => {};

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={productName}
      hideCloseIcon
      trailingTitleComponent={
        <IconButton
          icon="Heart"
          size="lg"
          variant="ghost"
          color="neutral"
          onClick={handleRemoveFromAll}
          aria-label="Remove product from all wishlist collections"
        />
      }
    >
      <QueryStateHandler
        query={wishlistCollectionQuery}
        isEmpty={wishlistCollectionQuery?.data?.meta?.totalRows === 0}
        loadingSkeleton={<></>}
        emptyTitle="No collections"
      >
        <div className="flex flex-col gap-2 px-3!">
          {wishlistCollectionQuery?.data?.data?.map((collection) => (
            <WishlistCollectionTile
              collection={collection}
              key={collection.id}
              onAdd={() => handleAddToCollection(collection.id)}
              onRemove={() => handleRemoveFromCollection(collection.id)}
            />
          ))}
        </div>
      </QueryStateHandler>
    </Sheet>
  );
};

export default ProductAddToWishlistSheet;
