import { Button } from "@/components/base/button/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import type { PaymentMethod } from "../types/types";

interface PlaceOrderButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  isFullyCoveredByCoins: boolean;
  paymentMethod: PaymentMethod;
  amountToPay: number | undefined;
  onClick: () => void;
}

export function PlaceOrderButton({
  isDisabled,
  isLoading,
  isFullyCoveredByCoins,
  paymentMethod,
  amountToPay,
  onClick,
}: PlaceOrderButtonProps) {
  return (
    <Button
      variant="filled"
      color="primary"
      size="lg"
      fullWidth
      disabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}
    >
      {isFullyCoveredByCoins || paymentMethod === "COD"
        ? "Place Order"
        : `Pay ${amountToPay !== undefined ? formatCurrency(amountToPay) : ""}`}
    </Button>
  );
}
