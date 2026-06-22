import type { ReactNode } from "react";
import { cn } from "@/utils/cssHelpers";
import { Icon } from "./icon/Icon";
import type { IconName } from "./icon/iconRegistry";

type AlertVariant = "danger" | "info";

interface AlertProps {
	children: ReactNode;
	variant?: AlertVariant;
	title?: ReactNode;
	icon?: IconName;
	action?: ReactNode;
	className?: string;
}

const VARIANT_STYLES: Record<
	AlertVariant,
	{ container: string; icon: string; defaultIcon: IconName }
> = {
	danger: {
		container: "bg-danger-50 border-danger-200 text-danger-700",
		icon: "text-danger-500",
		defaultIcon: "AlertCircle",
	},
	info: {
		container: "bg-s-50 border-s-200 text-s-700",
		icon: "text-s-500",
		defaultIcon: "Info",
	},
};

export function Alert({
	children,
	variant = "danger",
	title,
	icon,
	action,
	className,
}: AlertProps) {
	const styles = VARIANT_STYLES[variant];

	return (
		<div
			role="alert"
			className={cn(
				"flex items-start gap-3 rounded-lg border p-3",
				styles.container,
				className,
			)}
		>
			<Icon
				name={icon ?? styles.defaultIcon}
				size="md"
				className={cn("mt-0.5 shrink-0", styles.icon)}
			/>
			<div className="flex flex-1 flex-col gap-0.5">
				{title && <p className="font-semibold">{title}</p>}
				<p className="text-sm">{children}</p>
			</div>
			{action && <div className="shrink-0">{action}</div>}
		</div>
	);
}
