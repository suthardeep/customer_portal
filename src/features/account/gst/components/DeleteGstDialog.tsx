import Dialog from "@/components/base/Dialog";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { useDeleteGstMutation } from "../gstMutations";
import type { GstProfile } from "../types/types";

interface DeleteGstDialogProps {
  gstProfile: GstProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteGstDialog = ({ gstProfile, isOpen, onClose }: DeleteGstDialogProps) => {
  const deleteMutation = useDeleteGstMutation();
  const { savedGstDetails, clearGst } = useCheckoutStore();

  const handleDelete = () => {
    if (!gstProfile) return;
    deleteMutation.mutate(gstProfile.id, {
      onSuccess: () => {
        if (savedGstDetails?.id === gstProfile.id) {
          clearGst();
        }
        onClose();
      },
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete GST Profile"
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
          Are you sure you want to delete this GST profile?
        </p>
        {gstProfile && (
          <div className="rounded-lg bg-n-200 px-3 py-2 space-y-0.5">
            <p className="text-sm font-semibold text-n-900">
              {gstProfile.businessName}
            </p>
            <p className="text-xs font-mono text-n-700">{gstProfile.gstin}</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteGstDialog;
