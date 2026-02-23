import { IconButton } from "@/components/base/icon-button/IconButton";
import { cn } from "@/utils/cssHelpers";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

interface AccountPageHeaderProps {
  title: string;
  className?: string;
  hideBackButton?: boolean;
}

const AccountPageHeader: React.FC<AccountPageHeaderProps> = (props) => {
  const { title, className, hideBackButton } = props;
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className={cn("flex items-center gap-1 mb-4", className)}>
      {!hideBackButton && canGoBack && (
        <IconButton
          icon={"ChevronLeft"}
          variant="ghost"
          color="neutral"
          onClick={() => router.history.back()}
          aria-label="go-back"
          className="mt-0.5"
        />
      )}
      <h5 className="font-semibold"> {title} </h5>
    </div>
  );
};

export default AccountPageHeader;
