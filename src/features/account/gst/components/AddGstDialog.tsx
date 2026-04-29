import Dialog from "@/components/base/Dialog";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { useCreateGstMutation } from "../gstMutations";
import type { GstFormData } from "../schemas/gstFormSchema";
import AddEditGstForm from "./AddEditGstForm";

interface AddGstDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGstDialog = ({ isOpen, onClose }: AddGstDialogProps) => {
  const createMutation = useCreateGstMutation();

  const handleSubmit = (data: GstFormData) => {
    createMutation.mutate(data, {
      onSuccess: (profile) => {
        useCheckoutStore.getState().setGstDetailsId(profile.id, profile);
        onClose();
      },
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add GST Details">
      <AddEditGstForm
        mode="add"
        onSubmit={handleSubmit}
        onCancel={onClose}
        isMutating={createMutation.isPending}
      />
    </Dialog>
  );
};

export default AddGstDialog;
