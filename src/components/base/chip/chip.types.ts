export type ChipVariant = "filled" | "outline";
export type ChipColor = "primary" | "secondary" | "success" | "danger" | "neutral";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  className?: string;
}
