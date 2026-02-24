import Dialog from "@/components/base/Dialog";
import { useRemoveItemFromAllWishlistMutation } from "../wishlistMutations";

interface RemoveFromAllWishlistDialogProps {
  productId: string;
  variantId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RemoveFromAllWishlistDialog({
  productId,
  variantId,
  productName,
  isOpen,
  onClose,
  onSuccess,
}: RemoveFromAllWishlistDialogProps) {
  const removeMutation = useRemoveItemFromAllWishlistMutation();

  const handleRemove = () => {
    removeMutation.mutate(
      { productId, variantId },
      {
        onSuccess: () => {
          onClose();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Remove from Wishlist"
      size="md"
      actions={{
        primary: {
          label: "Remove",
          onClick: handleRemove,
          loading: removeMutation.isPending,
          color: "danger",
        },
        secondary: {
          label: "Cancel",
          onClick: onClose,
        },
      }}
    >
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{productName}</span> from your
          wishlist?
        </p>
        <p className="text-sm text-gray-600">
          This will remove the product from all your collections.
        </p>
      </div>
    </Dialog>
  );
}
