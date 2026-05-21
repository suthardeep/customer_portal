import { Button } from "@/components/base/button/Button";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/features/cart/cartMutations";
import { cartQueries } from "@/features/cart/cartQueries";
import { cn } from "@/utils/cssHelpers";
import { toast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { AddToCartButton } from "./AddToCartButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

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
  const { isAuthenticated } = useAuth();
  const loginDialog = useLoginDialog();

  const navigate = useNavigate();

  const cartItem = cart?.items.find((item) => item.variantId === variantId);

  const navigateToBuyNow = () => {
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

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      return loginDialog.open({ onSuccess: navigateToBuyNow });
    }
    navigateToBuyNow();
  };

  if (isCartLoading) {
    return (
      <div className="flex gap-3">
        <div className="shimmer h-10.5 flex-1 rounded-lg" />
        <div className="shimmer h-10.5 flex-1 rounded-lg" />
      </div>
    );
  }
  const inCart = !disabled && !!cartItem;

  return (
    <div className="flex gap-3 fixed bottom-0 left-0 right-0 p-4 lg:relative bg-white z-10 border-t border-t-n-500 lg:border-transparent lg:p-0">
      {disabled ? (
        <Button disabled fullWidth>
          Out of Stock
        </Button>
      ) : (
        <div className="relative w-full">
          {/* Add to Cart + Buy Now */}
          <div
            className={cn(
              "flex gap-3 transition-all duration-300",
              inCart
                ? "opacity-0 scale-95 pointer-events-none absolute inset-0"
                : "opacity-100 scale-100",
            )}
          >
            <AddToCartButton
              variantId={variantId}
              quantity={quantity}
              disabled={disabled}
              min={min}
            />
            <Button
              color="secondary"
              disabled={disabled}
              fullWidth
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          {/* Quantity Selector + Go to Cart */}
          <div
            className={cn(
              "flex items-center justify-center gap-2 w-full transition-all duration-300",
              inCart
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none absolute inset-0",
            )}
          >
            <QuantitySelector
              value={cartItem?.quantity ?? 1}
              min={min}
              max={max}
              disabled={disabled}
              iconSize="lg"
              quantityActionsWrapperClassName="w-full p-0.75"
              className="w-full"
              onChange={(newQty) =>
                updateCartItemMutation.mutate({
                  variantId: cartItem!.variantId,
                  quantity: newQty,
                })
              }
              onRemove={() =>
                deleteCartItemMutation.mutate({
                  variantId: cartItem!.variantId,
                })
              }
            />
            <Link to="/cart" className="w-full">
              <Button variant="outline" fullWidth>
                Go to cart
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
