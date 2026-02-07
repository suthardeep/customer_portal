import type { ReactNode } from "react";

export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";

export interface PopoverProps {
	trigger: ReactNode;
	children: ReactNode;
	side?: Side;
	align?: Align;
	sideOffset?: number;
	alignOffset?: number;
	className?: string;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}
