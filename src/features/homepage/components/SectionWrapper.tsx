import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { Link } from "@tanstack/react-router";
import type { Section } from "../types/types";
import { ActionTypeEnum } from "../types/enums";
import { getSectionBackgroundStyle, getTextStyle } from "../utils";

interface SectionWrapperProps {
  section: Section;
  children: React.ReactNode;
}

const ACTION_TYPE_ROUTE_MAP: Record<string, string> = {
  [ActionTypeEnum.CATEGORY]: "/categories",
  [ActionTypeEnum.BRAND]: "/categories",
  [ActionTypeEnum.SEARCH]: "/search",
};

function getCtaHref(section: Section): string | undefined {
  const { ctaConfig } = section;
  if (!section.hasCta || !ctaConfig) return undefined;

  if (ctaConfig.actionType === ActionTypeEnum.EXTERNAL_URL) {
    return ctaConfig.targets?.[0]?.id;
  }

  if (ctaConfig.actionType === ActionTypeEnum.IN_APP_PAGE) {
    const target = ctaConfig.targets?.[0];
    if (target?.id === "CATEGORY") return "/categories";
    return undefined;
  }

  const baseRoute = ACTION_TYPE_ROUTE_MAP[ctaConfig.actionType ?? ""];
  const targetId = ctaConfig.targets?.[0]?.id;
  if (baseRoute && targetId) return `${baseRoute}/${targetId}`;
  return baseRoute;
}

export function SectionWrapper({ section, children }: SectionWrapperProps) {
  const backgroundStyle = getSectionBackgroundStyle(section.sectionStyling);
  const titleStyle = getTextStyle(section.titleDecoration);
  const subtitleStyle = getTextStyle(section.subtitleDecoration);
  const ctaHref = getCtaHref(section);
  const hasBackground = !section.sectionStyling.hasTransparentBackground;

  const header = (
    <div className="flex items-center justify-between mb-3">
      {!section.hideTitle && (
        <div>
          <div className="flex items-center gap-2">
            {section.logoUrl && (
              <div className="size-8 shrink-0">
                <Image
                  src={section.logoUrl}
                  alt=""
                  className="object-contain"
                />
              </div>
            )}
            <h5 style={titleStyle}>{section.title}</h5>
          </div>
          {section.subtitle && (
            <p style={subtitleStyle} className="mt-0.5">
              {section.subtitle}
            </p>
          )}
        </div>
      )}

      {section.hasCta &&
        section.ctaConfig?.label &&
        ctaHref &&
        (ctaHref.startsWith("http") ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-black">
              {section.ctaConfig.label}
            </Button>
          </a>
        ) : (
          <Link to={ctaHref}>
            <Button variant="ghost" size="sm" className="text-black">
              {section.ctaConfig.label}
            </Button>
          </Link>
        ))}
    </div>
  );

  if (hasBackground) {
    const { borderRadius: _, ...fullBleedStyle } = backgroundStyle;
    return (
      <section className="w-full" style={fullBleedStyle}>
        <div className="max-w-8xl mx-auto px-4 py-12">
          {header}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 py-12" style={backgroundStyle}>
        {header}
        {children}
      </div>
    </section>
  );
}
