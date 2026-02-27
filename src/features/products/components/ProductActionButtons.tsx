import { Button } from "@/components/base/button/Button";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import { cartQueries } from "@/features/cart/cartQueries";
import { useUpdateCartItemMutation } from "@/features/cart/cartMutations";
import { AddToCartButton } from "./AddToCartButton";
import { useQuery } from "@tanstack/react-query";

interface ProductActionButtonsProps {
  variantId: string | undefined;
  quantity: number;
  disabled?: boolean;
  max?: number;
}

export function ProductActionButtons({
  variantId,
  quantity,
  disabled,
  max,
}: ProductActionButtonsProps) {
  const { data: cart } = useQuery(cartQueries.detail());
  const updateCartItemMutation = useUpdateCartItemMutation();

  const cartItem = cart?.items.find((item) => item.variantId === variantId);

  if (cartItem) {
    return (
      <QuantitySelector
        value={cartItem.quantity}
        max={max}
        disabled={disabled}
        onChange={(newQty) =>
          updateCartItemMutation.mutate({ id: cartItem.id, quantity: newQty })
        }
      />
    );
  }

  return (
    <div className="flex gap-3">
      <AddToCartButton
        variantId={variantId}
        quantity={quantity}
        disabled={disabled}
      />
      <Button
        color="secondary"
        size="lg"
        disabled={disabled}
        fullWidth
      >
        Buy Now
      </Button>
    </div>
  );
}
