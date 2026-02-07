/**
 * Size variants for the Select component
 */
export type SelectSize = "xs" | "sm" | "md" | "lg";

/**
 * Option structure for Select dropdown items
 */
export interface SelectOption {
	/** Unique value for the option */
	value: string;
	/** Display text for the option */
	label: string;
	/** Whether this option is disabled */
	disabled?: boolean;
}

/**
 * Props for the Select component
 */
export interface SelectProps {
	// Core functionality
	/** Array of options to display in the dropdown */
	options: SelectOption[];
	/** Currently selected value (controlled) */
	value?: string;
	/** Callback when selection changes */
	onValueChange?: (value: string) => void;
	/** Placeholder text when no value is selected */
	placeholder?: string;

	// Form integration (matching Input component)
	/** Label text displayed above the select */
	label?: string;
	/** Helper text displayed below the select (overridden by error) */
	helperText?: string;
	/** Error message (takes precedence over helperText) */
	error?: string;
	/** Whether the select is disabled */
	disabled?: boolean;
	/** Whether the select is required */
	required?: boolean;

	// Styling
	/** Size variant of the select */
	size?: SelectSize;
	/** Makes the select full width of its container */
	fullWidth?: boolean;
	/** Additional classes for the trigger element */
	className?: string;
	/** Additional classes for the wrapper div */
	wrapperClassName?: string;
	/** Additional classes for the label */
	labelClassName?: string;

	// Radix props passthrough
	/** Name attribute for form submission */
	name?: string;
	/** Default value for uncontrolled usage */
	defaultValue?: string;
}
