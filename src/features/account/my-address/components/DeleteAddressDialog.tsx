import Dialog from "@/components/base/Dialog";
import type { Address } from "../types/types";
import { useDeleteAddressMutation } from "../addressMutations";
import { formatAddress } from "../utils";

interface DeleteAddressDialogProps {
  address: Address | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAddressDialog = ({
  address,
  isOpen,
  onClose,
}: DeleteAddressDialogProps) => {
  const deleteMutation = useDeleteAddressMutation();

  const handleDelete = () => {
    if (!address) return;
    deleteMutation.mutate(address.id, { onSuccess: onClose });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Address"
      size="sm"
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
      <div className="space-y-3">
        <p className="text-n-800">
          Are you sure you want to delete this address?
        </p>
        {address && (
          <p className="rounded-lg bg-n-200 px-3 py-2 text-sm text-n-900">
            {formatAddress(address)}
          </p>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteAddressDialog;
