import { forwardRef, useId } from "react";
import { cn } from "@/utils/cssHelpers";
import type { LogoProps } from "./logo.types";

export const AavakProtectLogo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className }, ref) => {
    const id = useId();
    const gradientId = `protect-gradient-${id}`;
    const logoClasses = cn("h-auto", className);

    return (
      <div ref={ref} className={logoClasses}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.93735 11.1551L7.68449 5.30508C9.22833 7.17126 10.8541 11.0738 9.39306 13.3546L5.47391 19.4731C7.08549 15.964 6.12663 13.3461 3.93735 11.1551ZM5.84357 15.7228C5.84357 15.7228 4.98953 16.696 3.46104 16.5441L0 21.9401C3.83085 21.9889 5.96883 19.4629 5.84357 15.7228ZM18.8257 9.25535L22.5783 15.1019C20.2382 15.7261 16.0133 15.575 14.5503 13.2955L10.6255 7.18061C13.1419 10.1095 15.9211 10.3306 18.8257 9.25535ZM13.8793 9.08151C13.8793 9.08151 13.3513 7.89926 14.1272 6.57362L10.6678 1.17656C9.02481 4.63763 10.4281 7.63464 13.8793 9.08151ZM12.6626 22.8236H5.7153C6.45416 20.517 8.86339 17.0431 11.572 17.0431H18.838C15.014 17.5788 13.3267 19.7983 12.6626 22.8236ZM15.4808 18.7546C15.4808 18.7546 16.761 18.9489 17.4575 20.318L23.8679 20.3219C21.8428 17.0697 18.5626 16.6318 15.4808 18.7546Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient
              id={gradientId}
              x1="16.6715"
              y1="21.2653"
              x2="6.64868"
              y2="3.88835"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF756B" />
              <stop offset="1" stopColor="#FFA826" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

AavakProtectLogo.displayName = "AavakProtectLogo";
