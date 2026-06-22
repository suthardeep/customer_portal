import { Link } from "@tanstack/react-router";
import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { useAddCartItemMutation } from "@/features/cart/cartMutations";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "@/utils/toast";
import type { TaggedProduct } from "../types/types";

interface SpotlightTaggedProductCardProps {
	product: TaggedProduct;
}

export function SpotlightTaggedProductCard({
	product,
}: SpotlightTaggedProductCardProps) {
	const addCartItemMutation = useAddCartItemMutation();

	const moq = product.minOrderQuantity ?? 1;

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		addCartItemMutation.mutate({ variantId: product.variantId, quantity: moq });
		if (moq > 1) {
			toast.info(`Added ${moq} — minimum order for this item`);
		}
	};

	const imageUrl = product.mediaUrls?.[0];

	return (
		<Link
			to="/products/$productId"
			params={{ productId: product.id }}
			search={{ affiliateCode: product.affiliateCode }}
		>
			<div className="flex overflow-hidden rounded-lg border border-n-400 bg-white">
				{/* Image */}
				<div className="relative aspect-square size-22 shrink-0 overflow-hidden">
					<Image src={imageUrl ?? ""} alt={product.name} className="size-24" />
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col gap-1.5 py-1 px-2">
					<p className="line-clamp-1 font-medium text-n-900">{product.name}</p>
					<div className="flex items-center justify-between gap-1">
						<span className="text-n-800">{product.brandName}</span>
						<div className="flex items-center gap-1">
							<p className="font-semibold text-n-900">
								{formatCurrency(Number(product.sellingPrice))}
							</p>
							<p className="text-n-600 line-through">
								{formatCurrency(Number(product.mrp))}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between gap-2">
						<AavakCoinsChip coins={product.aavakCoinsEarned} />
						<Button
							onClick={handleAddToCart}
							aria-label="Add to cart"
							size="xs"
							variant="outline"
							isLoading={addCartItemMutation.isPending}
						>
							Add
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
}
