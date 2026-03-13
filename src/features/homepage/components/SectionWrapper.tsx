import { Button } from "@/components/base/button/Button";
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

  return (
    <section className="py-4 px-4 md:px-0" style={backgroundStyle}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h5 style={titleStyle}>{section.title}</h5>
          {section.subtitle && (
            <p style={subtitleStyle} className="mt-0.5">
              {section.subtitle}
            </p>
          )}
        </div>

        {section.hasCta && section.ctaConfig?.label && ctaHref && (
          <Link to={ctaHref}>
            <Button variant="ghost" size="sm">
              {section.ctaConfig.label}
            </Button>
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
