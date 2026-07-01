import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { useAddressSelector } from "@/features/account/my-address/hooks/useAddressSelector";
import { Button } from "@/components/base/button/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatAddress } from "@/utils/formatAddress";

export function DeliveryInfo() {
  const { isAuthenticated, isLoading } = useAuth();
  const { activeAddress, openSheet, sheetProps, addDialog } =
    useAddressSelector();

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
            onClick={openSheet}
          >
            {activeAddress ? "Change" : "Select"}
          </Button>
        </div>
      </div>

      <AddressSelectorSheet {...sheetProps} />
      {addDialog}
    </>
  );
}
