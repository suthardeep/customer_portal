import type { ReactNode } from "react";
import { Icon } from "@/components/base/icon/Icon";

interface SkippedItemsCardProps {
	children: ReactNode;
	/** Optional action rendered on the right of the header row (e.g. "Edit cart"). */
	action?: ReactNode;
}

/**
 * Shared shell for the "Not included in your order" section — the titled
 * danger card. Consumers render their own rows inside (editable cart rows on
 * the cart page, read-only rows on checkout).
 */
export function SkippedItemsCard({ children, action }: SkippedItemsCardProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-danger-200 bg-n-50">
			<div className="flex items-center gap-2 border-b border-danger-200 px-4 py-2.5">
				<Icon
					name="AlertCircle"
					size="md"
					className="shrink-0 text-danger-600"
				/>
				<p className="text-sm font-semibold text-danger-700">
					Not included in your order
				</p>
				{action && <div className="ml-auto shrink-0">{action}</div>}
			</div>
			<div className="flex flex-col gap-3 px-4 py-3">{children}</div>
		</div>
	);
}
