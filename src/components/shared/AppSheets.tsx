import ProductAddToWishlistSheet from "@/features/products/components/wishlist/ProductAddToWishlistSheet";
import { useWishlistSheetStore } from "@/features/wishlist/stores/wishlistSheetStore";
import { ClientOnly } from "@tanstack/react-router";

export function AppSheets() {
  const isOpen = useWishlistSheetStore((state) => state.isOpen);
  const payload = useWishlistSheetStore((state) => state.payload);
  const close = useWishlistSheetStore((state) => state.close);

  return (
    <ClientOnly>
      <ProductAddToWishlistSheet
        isOpen={isOpen}
        onClose={close}
        productId={payload?.productId ?? ""}
        variantId={payload?.variantId ?? ""}
        productName={payload?.productName ?? ""}
      />
      {/* Future sheets: each pulls from its own feature store */}
    </ClientOnly>
  );
}
