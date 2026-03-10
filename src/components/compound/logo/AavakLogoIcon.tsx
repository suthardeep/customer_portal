import { forwardRef, useId } from "react";
import { cn } from "@/utils/cssHelpers";
import type { LogoProps } from "./logo.types";

export const AavakLogoIcon = forwardRef<HTMLDivElement, LogoProps>(
  ({ className }, ref) => {
    const id = useId();
    const gradientId = `ugc-gradient-${id}`;
    const logoClasses = cn("h-auto", className);

    return (
      <div ref={ref} className={logoClasses}>
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.95913 10.1413L7.72701 4.19583C9.27939 6.09244 10.9141 10.0586 9.44504 12.3766L5.5042 18.5948C7.12469 15.0285 6.16053 12.3679 3.95913 10.1413ZM5.8759 14.7835C5.8759 14.7835 5.01714 15.7725 3.48018 15.6181L0 21.1021C3.85204 21.1517 6.00186 18.5845 5.8759 14.7835ZM18.9299 8.21051L22.7033 14.1524C20.3502 14.7867 16.1019 14.6332 14.6308 12.3165L10.6843 6.10194C13.2146 9.07854 16.0091 9.30327 18.9299 8.21051ZM13.9561 8.03384C13.9561 8.03384 13.4252 6.83231 14.2053 5.48506L10.7269 0C9.07475 3.5175 10.4858 6.56337 13.9561 8.03384ZM12.7327 22H5.74692C6.48987 19.6558 8.91242 16.1253 11.6361 16.1253H18.9423C15.0971 16.6697 13.4004 18.9254 12.7327 22ZM15.5665 17.8647C15.5665 17.8647 16.8537 18.0621 17.5541 19.4535L24 19.4575C21.9636 16.1523 18.6653 15.7072 15.5665 17.8647Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient
              id={gradientId}
              x1="19.1383"
              y1="9.30863"
              x2="1.77074"
              y2="18.0156"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00AFEF" />
              <stop offset="1" stopColor="#9427E8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

AavakLogoIcon.displayName = "AavakLogoIcon";
