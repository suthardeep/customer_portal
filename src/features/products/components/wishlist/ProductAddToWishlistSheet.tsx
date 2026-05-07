import { IconButton } from "@/components/base/icon-button/IconButton";
import Sheet from "@/components/base/sheet/Sheet";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { RemoveFromAllWishlistDialog } from "@/features/wishlist/components/RemoveFromAllWishlistDialog";
import {
  useAddItemToCollectionMutation,
  useRemoveItemFromWishlistMutation,
} from "@/features/wishlist/wishlistMutations";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import WishlistCollectionTile from "./WishlistCollectionTile";
import ProductAddToWishlistSheetSkeleton from "./skeletons/ProductAddToWishlistSheetSkeleton";
import { cn } from "@/utils/cssHelpers";
import { Button } from "@/components/base/button/Button";
import { CreateCollectionDialog } from "@/features/wishlist/components/CreateCollectionDialog";

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
  const { isAuthenticated } = useAuth();
  const createDialog = useToggle();

  const wishlistCollectionQuery = useQuery({
    ...wishlistQueries.collections(),
    enabled: isAuthenticated,
  });
  const addToWishlistMutation = useAddItemToCollectionMutation();
  const wishlistItems = useQuery({
    ...wishlistQueries.collectionsProducts("ALL", { pageSize: 100 }),
    enabled: isAuthenticated,
  });
  const isWishlisted = wishlistItems?.data?.data?.some(
    (item) => item?.productId === productId,
  );
  const removeItemFromCollectionMutation = useRemoveItemFromWishlistMutation();
  const { data: wishlistCollectionIds, isLoading } = useQuery({
    ...wishlistQueries.collectionsByProduct(productId, variantId),
    enabled: isAuthenticated,
  });

  const removeDialog = useToggle();

  const handleRemoveFromAll = () => {
    removeDialog.open();
  };
  const handleAddToCollection = (collectionId: string) => {
    addToWishlistMutation.mutate({
      collectionIds: [collectionId],
      productId,
      variantId: variantId,
    });
  };

  const handleRemoveFromCollection = (collectionId: string) => {
    removeItemFromCollectionMutation.mutate({
      collectionId,
      productId,
      variantId: variantId,
    });
  };

  return (
    <>
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
            iconClassName={cn(
              isWishlisted && "fill-danger-500 text-danger-500",
            )}
          />
        }
      >
        <div className="flex items-center justify-between pb-2! px-3! pt-2!">
          <p className="font-semibold">Collections</p>
          <Button variant="ghost" size="sm" onClick={createDialog.open}>
            New Collection
          </Button>
        </div>
        <QueryStateHandler
          query={wishlistCollectionQuery}
          isEmpty={wishlistCollectionQuery?.data?.meta?.totalRows === 0}
          loadingSkeleton={<ProductAddToWishlistSheetSkeleton />}
          emptyTitle="No collections"
          isLoading={isLoading}
        >
          <div className="flex flex-col gap-1 px-3!">
            {wishlistCollectionQuery?.data?.data
              ?.filter((e) => e?.id !== "ALL")
              ?.map((collection) => {
                return (
                  <WishlistCollectionTile
                    collection={collection}
                    key={collection.id}
                    // isLoading={
                    //   (addToWishlistMutation.isPending &&
                    //     addToWishlistMutation.variables?.collectionIds?.includes(
                    //       collection.id,
                    //     )) ||
                    //   (removeItemFromCollectionMutation.isPending &&
                    //     removeItemFromCollectionMutation.variables
                    //       ?.collectionId === collection.id)
                    // }
                    onAdd={() => handleAddToCollection(collection.id)}
                    onRemove={() => handleRemoveFromCollection(collection.id)}
                    alreadyHasThisProduct={wishlistCollectionIds?.includes(
                      collection.id,
                    )}
                  />
                );
              })}
          </div>
        </QueryStateHandler>
      </Sheet>

      <RemoveFromAllWishlistDialog
        productId={productId}
        variantId={variantId}
        productName={productName}
        isOpen={removeDialog.isOpen}
        onClose={removeDialog.close}
        onSuccess={onClose}
      />
      <CreateCollectionDialog
        isOpen={createDialog.isOpen}
        onClose={createDialog.close}
      />
    </>
  );
};

export default ProductAddToWishlistSheet;
