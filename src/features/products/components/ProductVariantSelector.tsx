import { useNavigate, useSearch } from "@tanstack/react-router";
import { cn } from "@/utils/cssHelpers";
import type { ProductVariant } from "../types";
import type { ProductOptionGroup } from "../types/types";
import { findMatchingVariant, isValueUnavailable } from "../utils";
import SizeChartSheet from "./SizeChartSheet";

interface ProductVariantSelectorProps {
	optionGroups: ProductOptionGroup[];
	variants: ProductVariant[];
	sizeChartId?: string | null;
}

interface ChipProps {
	label: string;
	isSelected: boolean;
	isUnavailable: boolean;
	onClick: () => void;
}

export function LabelChip({
	label,
	isSelected,
	isUnavailable,
	onClick,
}: ChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={isSelected}
			aria-label={`Select ${label}`}
			className={cn(
				"relative px-3 py-1.5 rounded-lg border-2 font-medium transition-all capitalize cursor-pointer",
				isSelected && "border-p-500 bg-p-50 text-p-800",
				!isSelected &&
					!isUnavailable &&
					"border-n-400 text-n-900 hover:border-n-600",
				!isSelected && isUnavailable && "opacity-60 border-n-600 text-n-800",
				isSelected && isUnavailable && "opacity-60",
			)}
		>
			{isUnavailable && (
				<span
					className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
					aria-hidden="true"
				>
					<svg
						className="absolute inset-0 w-full h-full"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<line
							x1="0"
							y1="100"
							x2="100"
							y2="0"
							stroke="currentColor"
							strokeWidth="2"
							className="text-n-600"
						/>
					</svg>
				</span>
			)}
			<p>{label}</p>
		</button>
	);
}

export interface OptionGroupSelectorProps {
	group: ProductOptionGroup;
	variants: ProductVariant[];
	selectedValues: Record<string, string>;
	onValueChange: (groupId: string, valueId: string) => void;
	sizeChartId?: string | null;
}

export function OptionGroupSelector({
	group,
	variants,
	selectedValues,
	onValueChange,
	sizeChartId,
}: OptionGroupSelectorProps) {
	const selectedValueId = selectedValues[group.id];
	const selectedLabel = group.values.find(
		(v) => v.id === selectedValueId,
	)?.value;

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-3">
				<p className="font-medium text-n-950">
					{group.name}
					{selectedLabel && (
						<span className="ml-1 text-sm capitalize text-p-800 font-semibold">
							: {selectedLabel}
						</span>
					)}
				</p>
				{sizeChartId && <SizeChartSheet sizeChartId={sizeChartId} />}
			</div>
			<div className="flex flex-wrap gap-3">
				{group.values.map((optValue) => {
					const isSelected = selectedValueId === optValue.id;
					const unavailable = isValueUnavailable(
						group.id,
						optValue.id,
						variants,
						selectedValues,
					);

					return (
						<LabelChip
							key={optValue.id}
							label={optValue.value}
							isSelected={isSelected}
							isUnavailable={unavailable}
							onClick={() => onValueChange(group.id, optValue.id)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export function ProductVariantSelector({
	optionGroups,
	variants,
	sizeChartId,
}: ProductVariantSelectorProps) {
	const { variantId } = useSearch({
		from: "/_public/products/$productId",
	});
	const navigate = useNavigate();

	if (!optionGroups || optionGroups.length === 0) return null;

	const selectedVariant =
		variants.find((v) => v.id === variantId) ?? variants[0];

	const selectedValues: Record<string, string> = Object.fromEntries(
		selectedVariant?.optionValues.map((ov) => [ov.groupId, ov.id]) ?? [],
	);

	const handleValueChange = (groupId: string, valueId: string) => {
		const newSelectedValues = { ...selectedValues, [groupId]: valueId };
		const matched = findMatchingVariant(variants, newSelectedValues);

		navigate({
			to: ".",
			search: (prev) => ({
				...prev,
				variantId: matched?.id,
			}),
			replace: true,
		});
	};

	return (
		<div className="space-y-5">
			{optionGroups.map((group) => (
				<OptionGroupSelector
					key={group.id}
					group={group}
					variants={variants}
					selectedValues={selectedValues}
					onValueChange={handleValueChange}
					sizeChartId={group.name.toLowerCase() === "size" ? sizeChartId : null}
				/>
			))}
		</div>
	);
}
