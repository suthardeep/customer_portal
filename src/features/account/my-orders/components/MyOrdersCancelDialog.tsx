import { useState } from "react";
import Dialog from "@/components/base/Dialog";
import { Select } from "@/components/base/select/Select";
import { useCancelMyOrderItemMutation } from "../myOrdersMutations";
import { CANCEL_REASONS } from "../constants";

const CANCEL_REASON_OPTIONS = CANCEL_REASONS.map((reason) => ({
  value: reason,
  label: reason,
}));

interface MyOrdersCancelDialogProps {
  orderItemId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MyOrdersCancelDialog({
  orderItemId,
  isOpen,
  onClose,
}: MyOrdersCancelDialogProps) {
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  const mutation = useCancelMyOrderItemMutation();

  const handleCancel = () => {
    mutation.mutate(
      { itemId: orderItemId, reason },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Order"
      size="sm"
      disableBackdropClose={mutation.isPending}
      actions={{
        primary: {
          label: "Confirm Cancellation",
          onClick: handleCancel,
          color: "danger",
          loading: mutation.isPending,
        },
        secondary: {
          label: "Keep Order",
          onClick: onClose,
        },
      }}
    >
      <div className="space-y-2">
        <p className="text-sm text-n-600">
          Please tell us why you want to cancel this order.
        </p>
        <Select
          label="Reason"
          options={CANCEL_REASON_OPTIONS}
          value={reason}
          onValueChange={setReason}
          fullWidth
        />
      </div>
    </Dialog>
  );
}
