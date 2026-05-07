import { Button } from "@/components/base/button/Button";
import { useAddCartItemMutation } from "@/features/cart/cartMutations";

interface AddToCartButtonProps {
  variantId: string | undefined;
  quantity: number;
  disabled?: boolean;
}

export function AddToCartButton({
  variantId,
  quantity,
  disabled,
}: AddToCartButtonProps) {
  const addCartItemMutation = useAddCartItemMutation();

  const handleAddToCart = () => {
    if (!variantId) return;
    addCartItemMutation.mutate({ variantId, quantity });
  };

  return (
    <Button
      variant="filled"
      color="primary"
      onClick={handleAddToCart}
      disabled={disabled || !variantId}
      // isLoading={addCartItemMutation.isPending}
      fullWidth
    >
      Add to Cart
    </Button>
  );
}
