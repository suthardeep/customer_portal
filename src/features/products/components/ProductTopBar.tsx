import { IconButton } from "@/components/base/icon-button/IconButton";
import { useWishlistSheetStore } from "@/features/wishlist/stores/wishlistSheetStore";
import { Link, useParams, useSearch } from "@tanstack/react-router";

interface ProductTopBarProps {
  brandName?: string;
  productName: string;
}

export function ProductTopBar({ brandName, productName }: ProductTopBarProps) {
  const { productId } = useParams({
    from: "/_protected/product/product/$productId",
  });
  const { variantId } = useSearch({
    from: "/_protected/product/product/$productId",
  });
  const openWishlistSheet = useWishlistSheetStore((state) => state.open);

  const handleAddToWishlist = () => {
    openWishlistSheet({ productId, productName, variantId: variantId ?? "" });
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      {brandName && (
        <Link
          to="."
          className="text-sm text-n-800 hover:text-p-700 group"
          onClick={(e) => e.preventDefault()}
        >
          View all products of{" "}
          <span className="text-sm font-semibold text-n-800 group-hover:text-p-700">
            {" "}
            {brandName}
          </span>
        </Link>
      )}
      <div className="flex justify-end gap-1">
        <IconButton
          icon="Heart"
          size="lg"
          variant="ghost"
          color="neutral"
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        />
        <IconButton
          icon="Share"
          size="lg"
          variant="ghost"
          color="neutral"
          onClick={() => console.log("Share clicked")}
          aria-label="Share product"
        />
      </div>
    </div>
  );
}
