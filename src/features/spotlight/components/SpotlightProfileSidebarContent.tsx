import type { SpotlightProfile } from "../types/types";
import { SPOTLIGHT_SIDEBAR_SECTIONS } from "../constants";
import { SpotlightCurrentStatus } from "./SpotlightCurrentStatus";
import { SpotlightProfileHeader } from "./SpotlightProfileHeader";
import { SpotlightProfileStats } from "./SpotlightProfileStats";
import { SpotlightSidebarSection } from "./SpotlightSidebarSection";

interface SpotlightProfileSidebarContentProps {
  profile: SpotlightProfile;
}

export function SpotlightProfileSidebarContent({
  profile,
}: SpotlightProfileSidebarContentProps) {
  return (
    <>
      <SpotlightProfileHeader profile={profile} />
      <SpotlightProfileStats profile={profile} />
      <SpotlightCurrentStatus />
      <div className="space-y-5">
        {SPOTLIGHT_SIDEBAR_SECTIONS.map((section, index) => (
          <SpotlightSidebarSection key={section.title || index} section={section} />
        ))}
      </div>
    </>
  );
}
