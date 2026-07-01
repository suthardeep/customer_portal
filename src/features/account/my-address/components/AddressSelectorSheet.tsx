import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import Sheet from "@/components/base/sheet/Sheet";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { NotLoggedInEmptyState } from "@/features/spotlight/components/NotLoggedInEmptyState";
import { formatAddress } from "@/utils/formatAddress";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { addressQueries } from "../addressQueries";
import type { ActiveAddress } from "../stores/selectedAddressStore";
import type { Address } from "../types/types";
import AddressSelectCard from "./AddressSelectCard";
import AddressSelectListSkeleton from "./skeletons/AddressSelectCardSkeleton";

interface AddressSelectorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddressId: string | null;
  onSelect: (address: Address) => void;
  onDetectLocation?: () => void;
  isDetecting?: boolean;
  detectError?: string | null;
  detectedAddress?: ActiveAddress | null;
  onSaveDetected?: () => void;
}

const AddressSelectorSheet = ({
  isOpen,
  onClose,
  selectedAddressId,
  onSelect,
  onDetectLocation,
  isDetecting = false,
  detectError,
  detectedAddress,
  onSaveDetected,
}: AddressSelectorSheetProps) => {
  const { isAuthenticated } = useAuth();
  const addressListQuery = useQuery({
    ...addressQueries.list(),
    enabled: isOpen && isAuthenticated,
  });
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
      footer={
        <>
          {detectedAddress && (
            <div className="mb-3 rounded-xl border border-p-200 bg-p-50 p-3">
              <div className="flex items-start gap-2">
                <Icon
                  name="Location"
                  size="md"
                  className="mt-0.5 shrink-0 text-p-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-n-900">Detected location</p>
                  <p className="mt-0.5 text-[13px] text-n-800">
                    {formatAddress(detectedAddress)}
                  </p>
                </div>
              </div>
              {onSaveDetected && (
                <Button
                  onClick={onSaveDetected}
                  startIcon="Add"
                  size="sm"
                  fullWidth
                  className="mt-3"
                >
                  Save this address
                </Button>
              )}
            </div>
          )}
          {onDetectLocation && detectError && (
            <p className="mb-2 text-[13px] text-danger-500">{detectError}</p>
          )}
        </>
      }
      actions={[
        ...(onDetectLocation
          ? [
              {
                label: isDetecting ? "Detecting..." : "Detect my location",
                onClick: onDetectLocation,
                startIcon: "Location" as const,
                variant: "outline" as const,
                color: "primary" as const,
                fullWidth: true,
                isLoading: isDetecting,
                disabled: isDetecting,
              },
            ]
          : []),
        ...(isAuthenticated
          ? [
              {
                label: "Manage My Address",
                onClick: handleManageAddress,
                variant: "ghost" as const,
                color: "neutral" as const,
                fullWidth: true,
              },
            ]
          : []),
      ]}
    >
      {!isAuthenticated ? (
        <NotLoggedInEmptyState
          icon="Location"
          title="Login to view addresses"
          subtitle="Please login to view and select your saved addresses."
          onSuccess={onClose}
        />
      ) : (
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
      )}
    </Sheet>
  );
};

export default AddressSelectorSheet;
