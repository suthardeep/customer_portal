import { Button } from "@/components/base/button/Button";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/features/cart/cartMutations";
import { cartQueries } from "@/features/cart/cartQueries";
import { toast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { AddToCartButton } from "./AddToCartButton";

interface ProductActionButtonsProps {
  productId: string;
  variantId: string | undefined;
  quantity: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  currentPrice?: number;
  originalPrice?: number;
  affiliateCode?: string;
}

export function ProductActionButtons({
  productId,
  variantId,
  quantity,
  disabled,
  min,
  max,
  affiliateCode,
}: ProductActionButtonsProps) {
  const { data: cart, isLoading: isCartLoading } = useQuery(
    cartQueries.detail(),
  );
  const updateCartItemMutation = useUpdateCartItemMutation();
  const deleteCartItemMutation = useDeleteCartItemMutation();
  const navigate = useNavigate();

  const cartItem = cart?.items.find((item) => item.variantId === variantId);

  const handleBuyNow = () => {
    if (!variantId) {
      return toast.error("No variant selected");
    }
    navigate({
      to: "/buy-now",
      search: {
        productId,
        variantId,
        quantity,
        ...(affiliateCode && { affiliateCode }),
      },
    });
  };

  if (isCartLoading) {
    return (
      <div className="flex gap-3">
        <div className="shimmer h-9 flex-1 rounded-lg" />
        <div className="shimmer h-9 flex-1 rounded-lg" />
      </div>
    );
  }
  return (
    <div className="flex gap-3 fixed bottom-0 left-0 right-0 p-4 lg:relative bg-white z-10 border-t border-t-n-500 lg:border-transparent lg:p-0">
      {disabled ? (
        <Button disabled fullWidth>
          Out of Stock
        </Button>
      ) : cartItem ? (
        <div className="flex items-center justify-center gap-2 w-full">
          <QuantitySelector
            value={cartItem.quantity}
            min={min}
            max={max}
            disabled={disabled}
            iconSize="lg"
            quantityActionsWrapperClassName="w-full p-0.75"
            className="w-full"
            onChange={(newQty) =>
              updateCartItemMutation.mutate({
                variantId: cartItem.variantId,
                quantity: newQty,
              })
            }
            onRemove={() =>
              deleteCartItemMutation.mutate({ variantId: cartItem.variantId })
            }
          />
          <Link to="/cart" className="w-full">
            <Button variant="outline" fullWidth>
              Go to cart
            </Button>
          </Link>
        </div>
      ) : (
        <>
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
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
}
