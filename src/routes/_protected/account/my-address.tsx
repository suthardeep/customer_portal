import { useState } from "react";
import { Button } from "@/components/base/button/Button";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AddAddressDialog from "@/features/account/my-address/components/AddAddressDialog";
import AddressListItem from "@/features/account/my-address/components/AddressListItem";
import DeleteAddressDialog from "@/features/account/my-address/components/DeleteAddressDialog";
import EditAddressDialog from "@/features/account/my-address/components/EditAddressDialog";
import { useCreateAddressMutation } from "@/features/account/my-address/addressMutations";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import type {
  Address,
  AddressFormData,
} from "@/features/account/my-address/types/types";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { useToggle } from "@/hooks/useToggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import FallbackView from "@/components/empty-states/FallbackView";
import AddressListSkeleton from "@/features/account/my-address/components/skeletons/AddressListSkeleton";

export const Route = createFileRoute("/_protected/account/my-address")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(addressQueries.list());
  },
  component: RouteComponent,
  pendingComponent: AddressListSkeleton,
  errorComponent: () => (
    <FallbackView
      title="We are unable to fetch you address"
      icon="Location"
      color="danger"
    />
  ),
});

function RouteComponent() {
  const { data: addresses } = useSuspenseQuery(addressQueries.list());
  const createMutation = useCreateAddressMutation();
  const addDialog = useToggle();
  const editDialog = useToggle();
  const deleteDialog = useToggle();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    editDialog.open();
  };

  const handleDelete = (address: Address) => {
    setSelectedAddress(address);
    deleteDialog.open();
  };

  const handleAddAddress = (data: AddressFormData) => {
    delete data.otherAddressLabel;
    createMutation.mutate(data, { onSuccess: addDialog.close });
  };

  return (
    <AccountPageWrapper>
      <AccountPageHeader
        title="My Address"
        trailingTitleComponent={
          <Button
            size="sm"
            variant="ghost"
            color="neutral"
            startIcon="Add"
            onClick={addDialog.open}
          >
            Add New Address
          </Button>
        }
      />

      {addresses?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressListItem
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <FallbackView title="No address saved yet" icon="Location" />
      )}

      <AddAddressDialog
        isOpen={addDialog.isOpen}
        onClose={addDialog.close}
        onSubmit={handleAddAddress}
        isMutating={createMutation.isPending}
      />
      <EditAddressDialog
        address={selectedAddress}
        isOpen={editDialog.isOpen}
        onClose={editDialog.close}
      />
      <DeleteAddressDialog
        address={selectedAddress}
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
      />
    </AccountPageWrapper>
  );
}
