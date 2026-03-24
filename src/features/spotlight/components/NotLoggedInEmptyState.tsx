import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";

export function NotLoggedInEmptyState() {
  const loginDialog = useLoginDialog();

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center h-[60dvh]">
      <div className="flex size-16 items-center justify-center rounded-full bg-p-50">
        <Icon name="User" size="xl" className="text-p-500" strokeWidth={3} />
      </div>
      <div className="space-y-1 my-1">
        <h6 className="font-semibold text-n-900">Login to continue</h6>
        <p className="text-n-800">
          Please login to access your spotlight profile.
        </p>
      </div>
      <Button onClick={() => loginDialog.open()}>Login</Button>
    </div>
  );
}
