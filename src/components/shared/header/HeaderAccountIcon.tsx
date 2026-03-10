import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { cn } from "@/utils/cssHelpers";
import { useNavigate, useRouterState } from "@tanstack/react-router";

type Props = {
  className?: string;
  isMobile?: boolean;
};

export function HeaderAccountIcon({ className, isMobile = false }: Props) {
  const loginDialog = useLoginDialog();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname.startsWith("/account");

  const handleClick = () => {
    if (isAuthenticated) {
      if (isMobile) {
        navigate({ to: "/account" });
      } else {
        navigate({ to: "/account/my-orders", search: { currentPage: 1 } });
      }
    } else {
      loginDialog.open({
        onSuccess: () =>
          navigate({ to: "/account/my-orders", search: { currentPage: 1 } }),
      });
    }
  };

  const label = isLoading
    ? "..."
    : isAuthenticated
      ? user?.fullName?.split(" ")[0] || user?.phone || "Account"
      : "Login";

  return (
    <button onClick={handleClick} className={className}>
      <div
        className={cn(
          "fall flex-col justify-between group cursor-pointer min-w-10",
          isMobile ? "gap-0.5" : "gap-2",
        )}
      >
        {isAuthenticated && user?.profileImageUrl ? (
          <div className="size-5">
            <Image
              src={user.profileImageUrl}
              alt={"my-profile-image"}
              className="rounded-full object-cover shrink-0 border border-n-500"
            />
          </div>
        ) : (
          <Icon
            name="User"
            size="lg"
            className={cn(iconClassName, isActive && "text-p-600")}
          />
        )}

        <p
          className={cn(
            "text-[13px] font-medium",
            isActive ? "text-p-600" : "text-n-900",
          )}
        >
          {label}
        </p>
      </div>
    </button>
  );
}

const iconClassName = "text-n-900 group-hover:text-n-950";
