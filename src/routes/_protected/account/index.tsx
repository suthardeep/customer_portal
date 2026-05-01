import { Button } from "@/components/base/button/Button";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { AccountSidebarContent } from "@/features/account/components/AccountSidebarContent";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/")({
  component: () => (
    <AccountPageWrapper>
      <div className="space-y-5 block lg:hidden">
        <AccountSidebarContent />
      </div>
      <div className="hidden h-full lg:flex items-center justify-center">
        <Link to="/account/my-orders" search={{ currentPage: 1 }}>
          <Button>Go to my orders</Button>
        </Link>
      </div>
    </AccountPageWrapper>
  ),
});
