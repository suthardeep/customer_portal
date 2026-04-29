import Dialog from "@/components/base/Dialog";
import { useUpdateGstMutation } from "../gstMutations";
import type { GstFormData } from "../schemas/gstFormSchema";
import type { GstProfile } from "../types/types";
import AddEditGstForm from "./AddEditGstForm";

interface EditGstDialogProps {
  gstProfile: GstProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditGstDialog = ({ gstProfile, isOpen, onClose }: EditGstDialogProps) => {
  const updateMutation = useUpdateGstMutation();

  const handleSubmit = (data: GstFormData) => {
    if (!gstProfile) return;
    updateMutation.mutate({ id: gstProfile.id, ...data }, { onSuccess: onClose });
  };

  const defaultValues: Partial<GstFormData> = gstProfile
    ? {
        businessName: gstProfile.businessName,
        gstin: gstProfile.gstin,
        billingAddress: gstProfile.billingAddress,
        isDefault: gstProfile.isDefault,
      }
    : {};

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit GST Details"
      disableBackdropClose={updateMutation.isPending}
    >
      <AddEditGstForm
        key={gstProfile?.id}
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isMutating={updateMutation.isPending}
      />
    </Dialog>
  );
};

export default EditGstDialog;
