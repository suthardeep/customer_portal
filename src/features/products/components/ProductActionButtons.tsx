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
  currentPrice?: number;
  originalPrice?: number;
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

  return (
    <div className="flex gap-3 fixed bottom-0 left-0 right-0 p-4 lg:relative bg-white z-10 border-t border-t-n-500 lg:border-transparent lg:p-0">
      {disabled ? (
        <Button disabled fullWidth>
          Out of Stock
        </Button>
      ) : cartItem ? (
        <QuantitySelector
          value={cartItem.quantity}
          max={max}
          disabled={disabled}
          onChange={(newQty) =>
            updateCartItemMutation.mutate({ id: cartItem.id, quantity: newQty })
          }
        />
      ) : (
        <>
          <AddToCartButton
            variantId={variantId}
            quantity={quantity}
            disabled={disabled}
          />
          <Button color="secondary" size="lg" disabled={disabled} fullWidth>
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
}
