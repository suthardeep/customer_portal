import type { CSSProperties } from "react";
import {
  AppRedirectTargetEnum,
  FontStyleEnum,
  GradientDirectionEnum,
  TextAlignEnum,
} from "./types/enums";
import type { CtaConfig, SectionStyling, TextDecoration } from "./types/types";

const FONT_WEIGHT_MAP: Record<FontStyleEnum, CSSProperties["fontWeight"]> = {
  [FontStyleEnum.NORMAL]: 400,
  [FontStyleEnum.MEDIUM]: 500,
  [FontStyleEnum.SEMI_BOLD]: 600,
  [FontStyleEnum.BOLD]: 700,
};

const TEXT_ALIGN_MAP: Record<TextAlignEnum, CSSProperties["textAlign"]> = {
  [TextAlignEnum.LEFT]: "left",
  [TextAlignEnum.CENTER]: "center",
  [TextAlignEnum.RIGHT]: "right",
};

const GRADIENT_DIRECTION_MAP: Record<GradientDirectionEnum, string> = {
  [GradientDirectionEnum.TO_BOTTOM]: "to bottom",
  [GradientDirectionEnum.TO_TOP]: "to top",
  [GradientDirectionEnum.TO_RIGHT]: "to right",
  [GradientDirectionEnum.TO_LEFT]: "to left",
};

export function getTextStyle(
  decoration: TextDecoration | null | undefined,
): CSSProperties | undefined {
  if (!decoration) return undefined;
  return {
    color: decoration.color,
    fontSize: `${decoration.size}px`,
    fontWeight: FONT_WEIGHT_MAP[decoration.fontStyle],
    textAlign: TEXT_ALIGN_MAP[decoration.align],
  };
}

export function getSectionBackgroundStyle(
  styling: SectionStyling,
): CSSProperties {
  if (styling.hasTransparentBackground) {
    return { borderRadius: `${styling.roundness}px` };
  }

  const style: CSSProperties = {
    borderRadius: `${styling.roundness}px`,
  };

  if (styling.hasGradient && styling.gradientColors?.length >= 2) {
    const direction = styling.gradientConfig?.direction
      ? GRADIENT_DIRECTION_MAP[styling.gradientConfig.direction]
      : "to bottom";
    const colorStops = styling.gradientColors
      .map((gc) => {
        const alpha = Math.round((gc.opacity / 100) * 255)
          .toString(16)
          .padStart(2, "0");
        return `${gc.color}${alpha}`;
      })
      .join(", ");
    style.background = `linear-gradient(${direction}, ${colorStops})`;
  } else if (styling.backgroundColor) {
    style.backgroundColor = styling.backgroundColor;
  }

  if (styling.backgroundImageUrl) {
    style.backgroundImage = `url(${styling.backgroundImageUrl})`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }

  return style;
}

export function getBannerHref(
  ctaConfig: CtaConfig | null | undefined,
): string | undefined {
  if (!ctaConfig?.redirect) return undefined;

  const { target, params } = ctaConfig.redirect;

  switch (target) {
    case AppRedirectTargetEnum.CATEGORY:
      return params.categoryId
        ? `/categories/${params.categoryId}`
        : "/categories";
    case AppRedirectTargetEnum.BRAND:
      return params.brandId ? `/categories/${params.brandId}` : undefined;
    case AppRedirectTargetEnum.PRODUCT:
      return params.productId ? `/products/${params.productId}` : undefined;
    case AppRedirectTargetEnum.SEARCH:
      return params.query ? `/search?q=${encodeURIComponent(params.query)}` : "/search";
    case AppRedirectTargetEnum.EXTERNAL_URL:
      return params.url;
    case AppRedirectTargetEnum.APP_HOME:
      return "/";
    default:
      return undefined;
  }
}

export const BANNER_RATIO_MAP: Record<string, string> = {
  "16:9": "16/9",
  "4:3": "4/3",
  "3:2": "3/2",
  "2:1": "2/1",
  "1:1": "1/1",
  "32:9": "32/9",
};
