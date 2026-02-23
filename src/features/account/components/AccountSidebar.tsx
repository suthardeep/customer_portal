import { ProfileHeader } from "./ProfileHeader";
import { QuickActionCards } from "./QuickActionCards";
import { SidebarSection } from "./SidebarSection";
import { SIDEBAR_SECTIONS } from "../constants";

export function AccountSidebar() {
  return (
    <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400">
      <ProfileHeader />
      <QuickActionCards />
      <div className="space-y-5">
        {SIDEBAR_SECTIONS.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}
      </div>
    </aside>
  );
}

export default AccountSidebar;
