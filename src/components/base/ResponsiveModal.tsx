import { type ReactNode, useEffect, useState } from "react";
import Dialog, { type DialogProps } from "./Dialog";
import Sheet, { type SheetProps } from "./sheet/Sheet";

interface ResponsiveModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
	title?: string;
	customContent?: boolean;
	/** Dialog size on desktop. Defaults to "md". */
	dialogSize?: DialogProps["size"];
	/** Sheet size on mobile. Defaults to "full". */
	sheetSize?: SheetProps["size"];
}

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Renders a centered Dialog on desktop (>=768px) and a bottom Sheet on mobile.
 * Mirrors the inline matchMedia breakpoint used by Sheet so the two stay in
 * sync. Renders nothing until mounted to avoid an SSR/hydration mismatch.
 */
export function ResponsiveModal({
	isOpen,
	onClose,
	children,
	title,
	customContent,
	dialogSize = "md",
	sheetSize = "full",
}: ResponsiveModalProps) {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);

	useEffect(() => {
		const mq = window.matchMedia(MOBILE_QUERY);
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	if (isMobile === null) return null;

	if (isMobile) {
		return (
			<Sheet
				isOpen={isOpen}
				onClose={onClose}
				title={title}
				size={sheetSize}
				direction="bottom"
				customContent={customContent}
			>
				{children}
			</Sheet>
		);
	}

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			title={title}
			size={dialogSize}
			customContent={customContent}
		>
			{children}
		</Dialog>
	);
}
