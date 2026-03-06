import type { SVGProps } from "react";
import type { IconName } from "./iconRegistry";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends Pick<SVGProps<SVGSVGElement>, "onClick" | "aria-label" | "role"> {
  name: IconName;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
}

export type { IconName };
