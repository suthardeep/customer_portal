import Sheet from "@/components/base/sheet/Sheet";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { addressQueries } from "../addressQueries";
import type { Address } from "../types/types";
import AddressSelectCard from "./AddressSelectCard";
import AddressSelectListSkeleton from "./skeletons/AddressSelectCardSkeleton";

interface AddressSelectorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddressId: string | null;
  onSelect: (address: Address) => void;
}

const AddressSelectorSheet = ({
  isOpen,
  onClose,
  selectedAddressId,
  onSelect,
}: AddressSelectorSheetProps) => {
  const addressListQuery = useQuery(addressQueries.list());
  const navigate = useNavigate();

  const handleManageAddress = () => {
    onClose();
    navigate({ to: "/account/my-address" });
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Select Address"
      size="lg"
      actions={[
        {
          label: "Manage My Address",
          onClick: handleManageAddress,
          variant: "ghost",
          color: "neutral",
          fullWidth: true,
        },
      ]}
    >
      <div>
        <QueryStateHandler
          query={addressListQuery}
          loadingSkeleton={<AddressSelectListSkeleton />}
          emptyTitle="No saved addresses"
          fallbackIcon="Location"
          isEmpty={
            Array.isArray(addressListQuery.data) &&
            addressListQuery.data.length === 0
          }
        >
          <div className="flex flex-col gap-3">
            {addressListQuery.data?.map((address) => (
              <AddressSelectCard
                key={address.id}
                address={address}
                isSelected={selectedAddressId === address.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </QueryStateHandler>
      </div>
    </Sheet>
  );
};

export default AddressSelectorSheet;
