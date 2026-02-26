import Dialog from "@/components/base/Dialog";
import type { AddressFormData } from "@/features/account/my-address/types/types";
import AddEditAddressForm from "./AddEditAddressForm";

interface AddAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => void;
  isMutating?: boolean;
}

const AddAddressDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isMutating = false,
}: AddAddressDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Address"
      size="lg"
      disableBackdropClose={isMutating}
    >
      <AddEditAddressForm
        mode="add"
        onSubmit={onSubmit}
        onCancel={onClose}
        onSuccess={onClose}
        isMutating={isMutating}
      />
    </Dialog>
  );
};

export default AddAddressDialog;
