import { useToggle } from "@/hooks/useToggle";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import type { Address } from "@/features/account/my-address/types/types";
import { Button } from "@/components/base/button/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatAddress } from "@/utils/formatAddress";

export function DeliveryInfo() {
  const sheet = useToggle();
  const { isAuthenticated, isLoading } = useAuth();
  const { activeAddress, selectSavedAddress } = useSelectedAddressStore();

  const handleSelect = (address: Address) => {
    selectSavedAddress(address);
    sheet.close();
  };

  if (isLoading) {
    return <div className="shimmer rounded-xl w-full h-20.5" />;
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <div className="rounded-xl border border-(--s-200) bg-s-50 p-3">
        <div className="flex items-center justify-between font-medium">
          <p className="text-n-850">
            {activeAddress
              ? `Deliver to ${formatAddress(activeAddress)}`
              : "Select a delivery address"}
          </p>
          <Button
            variant="ghost"
            color="secondary"
            className="font-semibold text-s-700 hover:text-s-800 transition-colors text-sm"
            onClick={sheet.open}
          >
            {activeAddress ? "Change" : "Select"}
          </Button>
        </div>
      </div>

      <AddressSelectorSheet
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        selectedAddressId={activeAddress?.id ?? null}
        onSelect={handleSelect}
      />
    </>
  );
}
