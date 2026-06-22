import { Link } from "@tanstack/react-router";
import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Image } from "@/components/base/Image";
import { ProductCardAddToCart } from "@/features/products/components/ProductCardAddToCart";
import { formatCurrency } from "@/utils/formatCurrency";
import type { CreatorStoreProduct } from "../types/profile.types";

interface CreatorStoreProductCardProps {
	product: CreatorStoreProduct;
}

export function CreatorStoreProductCard({
	product,
}: CreatorStoreProductCardProps) {
	const imageUrl = product.mediaUrls?.[0];

	return (
		<Link
			to="/products/$productId"
			params={{ productId: product.productId }}
			search={{
				variantId: product.variantId,
				affiliateCode: product.affiliateCode,
			}}
		>
			<div className="flex flex-col overflow-hidden rounded-lg border border-n-300 bg-white">
				{/* Image */}
				<div className="relative aspect-square overflow-hidden">
					<Image
						src={imageUrl ?? ""}
						alt={product.name}
						className="size-full object-cover"
					/>
					{product.discountPercent > 0 && (
						<span className="absolute top-2 left-2 rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600">
							{product.discountPercent}% off
						</span>
					)}
					<div
						className="absolute bottom-0 right-0"
						onClick={(e) => e.preventDefault()}
					>
						<ProductCardAddToCart
							variantId={product.variantId}
							outOfStock={!product.inStock}
							minOrderQuantity={product.minOrderQuantity}
						/>
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-col gap-1 px-3 pt-1.5 pb-2">
					<AavakCoinsChip coins={product.totalAavakCoinForUser} />

					<span className="text-n-900">{product.brand.name}</span>

					<p className="line-clamp-2 font-medium text-n-900">{product.name}</p>

					<div className="flex flex-wrap items-center gap-2">
						<p className="font-semibold text-n-900">
							{formatCurrency(product.price)}
						</p>
						{product.mrp > product.price && (
							<p className="text-n-600 line-through">
								{formatCurrency(product.mrp)}
							</p>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
