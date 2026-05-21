import Dialog from "@/components/base/Dialog";
import type { Address, AddressFormData } from "../types/types";
import { useUpdateAddressMutation } from "../addressMutations";
import AddEditAddressForm from "./AddEditAddressForm";

interface EditAddressDialogProps {
  address: Address | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditAddressDialog = ({
  address,
  isOpen,
  onClose,
}: EditAddressDialogProps) => {
  const updateMutation = useUpdateAddressMutation();

  const handleSubmit = (data: AddressFormData) => {
    if (!address) return;
    updateMutation.mutate({ id: address.id, ...data }, { onSuccess: onClose });
  };

  const defaultValues: Partial<AddressFormData> = address
    ? {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
        addressType: address.addressType,
        otherAddressLabel: address.otherAddressLabel ?? "",
        isDefault: address.isDefault,
        latitude: address.latitude,
        longitude: address.longitude,
      }
    : {};

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Address"
      size="lg"
      disableBackdropClose={updateMutation.isPending}
    >
      <AddEditAddressForm
        key={address?.id}
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isMutating={updateMutation.isPending}
      />
    </Dialog>
  );
};

export default EditAddressDialog;
