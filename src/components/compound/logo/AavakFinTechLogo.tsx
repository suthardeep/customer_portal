import { forwardRef } from "react";
import { cn } from "@/utils/cssHelpers";
import type { LogoProps } from "./logo.types";

export const AavakFinTechLogo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className }, ref) => {
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
          <g clip-path="url(#clip0_4477_7604)">
            <path
              d="M3.79417 11.1551L7.40505 5.30508C8.89275 7.17126 10.4594 11.0738 9.05149 13.3546L5.27485 19.4731C6.82783 15.964 5.90384 13.3461 3.79417 11.1551ZM5.63107 15.7228C5.63107 15.7228 4.80809 16.696 3.33518 16.5441L0 21.9401C3.69154 21.9889 5.75178 19.4629 5.63107 15.7228ZM18.1411 9.25535L21.7573 15.1019C19.5023 15.7261 15.431 15.575 14.0211 13.2955L10.2391 7.18061C12.664 10.1095 15.3421 10.3306 18.1411 9.25535ZM13.3745 9.08151C13.3745 9.08151 12.8658 7.89926 13.6134 6.57362L10.2799 1.17656C8.69663 4.63763 10.0489 7.63464 13.3745 9.08151ZM12.2022 22.8236H5.50747C6.21946 20.517 8.54107 17.0431 11.1512 17.0431H18.153C14.468 17.5788 12.8421 19.7983 12.2022 22.8236ZM14.9179 18.7546C14.9179 18.7546 16.1515 18.9489 16.8226 20.318L23 20.3219C21.0485 17.0697 17.8876 16.6318 14.9179 18.7546Z"
              fill="url(#paint0_linear_4477_7604)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_4477_7604"
              x1="18.559"
              y1="10.5827"
              x2="1.53741"
              y2="18.5531"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#11D691" />
              <stop offset="1" stop-color="#12C0FF" />
            </linearGradient>
            <clipPath id="clip0_4477_7604">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  },
);

AavakFinTechLogo.displayName = "AavakFinTechLogo";
