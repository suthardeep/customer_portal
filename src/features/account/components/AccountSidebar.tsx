import { AccountSidebarContent } from "./AccountSidebarContent";

export function AccountSidebar() {
  return (
    <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400 hidden lg:block">
      <AccountSidebarContent />
    </aside>
  );
}

export default AccountSidebar;
