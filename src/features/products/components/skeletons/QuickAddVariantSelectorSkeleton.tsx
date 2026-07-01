export function QuickAddVariantSelectorSkeleton() {
	return (
		<div className="space-y-5">
			{/* Product header */}
			<div className="flex gap-3">
				<div className="shimmer size-20 shrink-0 rounded-lg" />
				<div className="flex-1 space-y-2 py-1">
					<div className="shimmer h-4 w-3/4 rounded" />
					<div className="shimmer h-4 w-1/3 rounded" />
					<div className="shimmer h-5 w-1/4 rounded" />
				</div>
			</div>

			{/* Option groups */}
			{["group-a", "group-b"].map((groupKey) => (
				<div key={groupKey} className="space-y-2">
					<div className="shimmer h-4 w-20 rounded" />
					<div className="flex flex-wrap gap-3">
						{["c1", "c2", "c3", "c4"].map((chipKey) => (
							<div
								key={`${groupKey}-${chipKey}`}
								className="shimmer h-9 w-16 rounded-lg"
							/>
						))}
					</div>
				</div>
			))}

			{/* Add button */}
			<div className="shimmer h-10 w-full rounded-md" />
		</div>
	);
}
