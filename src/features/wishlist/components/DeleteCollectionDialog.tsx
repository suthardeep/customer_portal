import Dialog from "@/components/base/Dialog";
import type { WishlistCollection } from "../types/types";
import { useDeleteCollectionMutation } from "../wishlistMutations";

interface DeleteCollectionDialogProps {
  collection: WishlistCollection;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteCollectionDialog({
  collection,
  isOpen,
  onClose,
  onSuccess,
}: DeleteCollectionDialogProps) {
  const deleteMutation = useDeleteCollectionMutation();

  const handleDelete = () => {
    deleteMutation.mutate(collection.id, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Collection"
      size="md"
      actions={{
        primary: {
          label: "Delete",
          onClick: handleDelete,
          loading: deleteMutation.isPending,
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
          Are you sure you want to delete the collection{" "}
          <span className="font-semibold">{collection.name}</span>?
        </p>

        {collection.isDefault && (
          <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              This is your default collection. Deleting it may affect your saved
              items.
            </p>
          </div>
        )}

        <p className="text-sm text-gray-600">
          This action cannot be undone. All items in this collection will be
          removed from the collection.
        </p>
      </div>
    </Dialog>
  );
}
