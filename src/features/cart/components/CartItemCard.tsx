import { Link } from "@tanstack/react-router";
import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { Chip } from "@/components/base/chip/Chip";
import Dialog from "@/components/base/Dialog";
import { Image } from "@/components/base/Image";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { OptionValuesRenderer } from "@/components/base/OptionValuesRenderer";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import type { CartItem } from "../types/types";
import { isBelowMoq } from "../utils";

interface CartItemCardProps {
	item: CartItem;
	isSelected?: boolean;
	onSelectChange?: (id: string) => void;
	onQuantityChange: (id: string, quantity: number) => void;
	onDelete: (id: string) => void;
	isUpdating: boolean;
	hideSelect?: boolean;
	hideMoqBanner?: boolean;
}

export function CartItemCard({
	item,
	isSelected = false,
	onSelectChange,
	onQuantityChange,
	onDelete,
	isUpdating,
	hideSelect = false,
	hideMoqBanner = false,
}: CartItemCardProps) {
	const image = item.mediaUrls[0];

	const moqRemoveDialog = useToggle();

	const moq = item.minOrderQuantity ?? 1;
	const belowMoq = isBelowMoq(item);

	const lineSellingPrice = item.sellingPrice * item.quantity;
	const lineMrp = item.mrp * item.quantity;

	const handleRemove = () => {
		if (moq > 1) {
			moqRemoveDialog.open();
		} else {
			onDelete(item.variantId);
		}
	};

	return (
		<>
			<Dialog
				isOpen={moqRemoveDialog.isOpen}
				onClose={moqRemoveDialog.close}
				size="sm"
				title="Remove from cart?"
				subTitle={`This product has a minimum order quantity of ${moq}. Removing it will delete it from your cart entirely.`}
				actions={{
					secondary: {
						label: "Cancel",
						onClick: moqRemoveDialog.close,
					},
					primary: {
						label: "Remove",
						color: "danger",
						onClick: () => {
							moqRemoveDialog.close();
							onDelete(item.variantId);
						},
					},
				}}
			/>
			<div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
				{!hideSelect && (
					<Checkbox
						checked={isSelected}
						onChange={() => onSelectChange?.(item.id)}
						disabled={isUpdating}
						className="mt-1"
					/>
				)}

				<Link
					to="/products/$productId"
					params={{ productId: item.productId }}
					search={{ variantId: item.variantId }}
					className="size-20 shrink-0 overflow-hidden rounded-xl"
				>
					<Image src={image ?? ""} alt={item.name} />
				</Link>

				<div className="flex min-w-0 flex-1 flex-col">
					<div className="flex items-center justify-between gap-2">
						<Link
							to="/products/$productId"
							params={{ productId: item.productId }}
							search={{ variantId: item.variantId }}
							className="line-clamp-2 font-semibold text-n-900"
						>
							{item.name}
						</Link>
						<IconButton
							icon="X"
							variant="ghost"
							color="neutral"
							onClick={handleRemove}
							disabled={isUpdating}
							aria-label="Remove item"
							className="shrink-0"
						/>
					</div>

					<div className="flex md:items-center flex-col md:flex-row gap-2">
						<OptionValuesRenderer optionValues={item.optionValues} />
					</div>

					<div className="flex items-baseline py-2 gap-2">
						<h6 className="font-bold text-n-900">
							{formatCurrency(lineSellingPrice)}
						</h6>
						{lineMrp !== lineSellingPrice && (
							<>
								<p className="text-sm text-n-800 line-through">
									{formatCurrency(lineMrp)}
								</p>
								{item.discounts?.label ? (
									<Chip variant="outline" color="success" size="xs">
										{item.discounts.label}
									</Chip>
								) : item.discountPercent > 0 ? (
									<p className="text-sm font-semibold text-success-600">
										{item.discountPercent}% off
									</p>
								) : item.discount ? (
									<p className="text-sm font-semibold text-success-600">
										{item.discount} off
									</p>
								) : null}
							</>
						)}
					</div>

					<div className="flex justify-between items-center w-full">
						{(item.totalAavakCoinForUser ?? 0) > 0 && (
							<AavakCoinsChip coins={item.totalAavakCoinForUser} />
						)}
						<div className="ml-auto">
							<QuantitySelector
								value={item.quantity}
								onChange={(q) => onQuantityChange(item.variantId, q)}
								onRemove={handleRemove}
								disabled={isUpdating}
								min={item.minOrderQuantity ?? 1}
							/>
						</div>
					</div>
					{belowMoq && !hideMoqBanner && (
						<p className="mt-2 rounded-lg border border-danger-200 bg-danger-50 px-3 py-1.5 text-sm font-medium text-danger-600">
							Minimum order quantity is {moq}. Add {moq - item.quantity} more to
							include this item in your order.
						</p>
					)}
				</div>
			</div>
		</>
	);
}
