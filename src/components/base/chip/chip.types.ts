export type ChipVariant = "filled" | "outline";
export type ChipColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "neutral"
  | "blue"
  | "skyblue"
  | "purple"
  | "orange";
export type ChipSize = "xs" | "sm" | "md" | "lg";

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  className?: string;
}
