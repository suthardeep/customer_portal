import { Button } from "@/components/base/button/Button";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import { cartQueries } from "@/features/cart/cartQueries";
import {
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/features/cart/cartMutations";
import { useQuery } from "@tanstack/react-query";

interface ProductCardAddToCartProps {
  variantId: string | undefined;
  outOfStock?: boolean;
}

export function ProductCardAddToCart({
  variantId,
  outOfStock,
}: ProductCardAddToCartProps) {
  const { data: cart } = useQuery(cartQueries.detail());
  const addCartItemMutation = useAddCartItemMutation();
  const updateCartItemMutation = useUpdateCartItemMutation();
  const deleteCartItemMutation = useDeleteCartItemMutation();

  const cartItem = cart?.items.find((item) => item.variantId === variantId);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variantId) return;
    addCartItemMutation.mutate({ variantId, quantity: 1 });
  };

  if (outOfStock) {
    return (
      <Button
        className="rounded-md"
        aria-label="Out of stock"
        size="xs"
        disabled
      >
        Out of Stock
      </Button>
    );
  }

  if (cartItem) {
    return (
      <QuantitySelector
        value={cartItem.quantity}
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
    );
  }

  return (
    <Button
      onClick={handleAdd}
      className="rounded-md bg-white! hover:text-p-600"
      aria-label="Add to cart"
      size="xs"
      variant="outline"
      disabled={!variantId}
      isLoading={addCartItemMutation.isPending}
    >
      Add
    </Button>
  );
}
