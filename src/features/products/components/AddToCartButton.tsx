import { Button } from "@/components/base/button/Button";
import { useAddCartItemMutation } from "@/features/cart/cartMutations";
import { toast } from "@/utils/toast";

interface AddToCartButtonProps {
  variantId: string | undefined;
  quantity: number;
  disabled?: boolean;
  min?: number;
}

export function AddToCartButton({
  variantId,
  quantity,
  disabled,
  min,
}: AddToCartButtonProps) {
  const addCartItemMutation = useAddCartItemMutation();

  const handleAddToCart = () => {
    if (!variantId) return;
    if (min && quantity < min) {
      toast.error(`Minimum order quantity is ${min} units`);
      return;
    }
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
