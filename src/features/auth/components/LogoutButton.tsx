import Dialog from "@/components/base/Dialog";
import { Button } from "@/components/base/button/Button";
import type { ButtonProps } from "@/components/base/button/button.types";
import { useToggle } from "@/hooks/useToggle";
import { useLogoutMutation } from "../authMutations";

export const LogoutButton = ({
  children = "Logout",
  ...props
}: ButtonProps) => {
  const confirmDialog = useToggle();
  const logoutMutation = useLogoutMutation();

  return (
    <>
      <Button onClick={confirmDialog.open} {...props}>
        {children}
      </Button>

      <Dialog
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.close}
        title="Log out"
        subTitle="Are you sure you want to log out of your account?"
        size="sm"
        actions={{
          secondary: {
            label: "Cancel",
            onClick: confirmDialog.close,
          },
          primary: {
            label: "Log out",
            color: "danger",
            loading: logoutMutation.isPending,
            onClick: () => logoutMutation.mutate(),
          },
        }}
      />
    </>
  );
};
