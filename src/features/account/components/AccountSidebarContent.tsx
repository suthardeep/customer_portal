import { ProfileHeader } from "./ProfileHeader";
import { QuickActionCards } from "./QuickActionCards";
import { SidebarSection } from "./SidebarSection";
import { SIDEBAR_SECTIONS } from "../constants";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { FeedbackButton } from "../feedback/components/FeedbackButton";

export function AccountSidebarContent() {
  return (
    <>
      <ProfileHeader />
      <QuickActionCards />
      <div className="space-y-5">
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.title}>
            <SidebarSection section={section} />
            {section.title === "Help Center" && (
              <div className="space-y-0.5 mt-0.5">
                <FeedbackButton />
              </div>
            )}
          </div>
        ))}
        <LogoutButton size="sm" fullWidth variant="ghost" color="danger" />
      </div>
    </>
  );
}
