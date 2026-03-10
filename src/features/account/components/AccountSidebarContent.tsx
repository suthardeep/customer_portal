import { ProfileHeader } from "./ProfileHeader";
import { QuickActionCards } from "./QuickActionCards";
import { SidebarSection } from "./SidebarSection";
import { SIDEBAR_SECTIONS } from "../constants";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export function AccountSidebarContent() {
  return (
    <>
      <ProfileHeader />
      <QuickActionCards />
      <div className="space-y-5">
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
        <LogoutButton size="sm" fullWidth variant="ghost" color="danger" />
      </div>
    </>
  );
}
