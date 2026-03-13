import type { Section } from "../types/types";
import { SectionWrapper } from "./SectionWrapper";
import { SectionContent } from "./SectionContent";

interface SectionRendererProps {
  section: Section;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  return (
    <SectionWrapper section={section}>
      <SectionContent section={section} />
    </SectionWrapper>
  );
}
