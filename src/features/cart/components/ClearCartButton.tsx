import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { useToggle } from "@/hooks/useToggle";
import { useClearCartMutation } from "../cartMutations";

export function ClearCartButton() {
  const confirmDialog = useToggle();
  const clearMutation = useClearCartMutation();

  const handleConfirm = () => {
    clearMutation.mutate(undefined, { onSuccess: () => confirmDialog.close() });
  };

  return (
    <>
      <Button
        variant="ghost"
        color="danger"
        size="sm"
        onClick={confirmDialog.open}
        disabled={clearMutation.isPending}
      >
        Clear Cart
      </Button>

      <Dialog
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.close}
        title="Clear Cart"
        subTitle="Are you sure you want to remove all items from your cart? This cannot be undone."
        size="sm"
        actions={{
          secondary: {
            label: "Cancel",
            onClick: confirmDialog.close,
            disabled: clearMutation.isPending,
          },
          primary: {
            label: "Clear Cart",
            onClick: handleConfirm,
            loading: clearMutation.isPending,
            color: "danger",
          },
        }}
      />
    </>
  );
}
