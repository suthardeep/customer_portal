import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import type { IconName } from "@/components/base/icon";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { Link } from "@tanstack/react-router";

interface NotLoggedInEmptyStateProps {
  icon?: IconName;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

export function NotLoggedInEmptyState({
  icon = "User",
  title = "Login to continue",
  subtitle = "Please login to proceed.",
  onSuccess,
}: NotLoggedInEmptyStateProps) {
  const loginDialog = useLoginDialog();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center h-[60dvh]">
      <div className="flex size-16 items-center justify-center rounded-full bg-p-50">
        <Icon name={icon} size="xl" className="text-p-500" strokeWidth={3} />
      </div>
      <div className="space-y-1 my-1">
        <h6 className="font-semibold text-n-900">{title}</h6>
        <p className="text-n-800">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => loginDialog.open({ onSuccess })}>Login</Button>
        <Link to="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
