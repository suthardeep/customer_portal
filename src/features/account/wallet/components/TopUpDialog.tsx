import Dialog from "@/components/base/Dialog";
import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import Spinner from "@/components/compound/spinner/Spinner";
import { authQueries } from "@/features/auth/authQueries";
import { usePayment } from "@/hooks/usePayment";
import { toast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useTopUpWalletMutation,
  useVerifyTopUpMutation,
} from "../walletMutations";
import type { RazorpayPaymentResult } from "@/lib/razorpay";
import { formatCurrency } from "@/utils/formatCurrency";
import FallbackView from "@/components/empty-states/FallbackView";

const topUpSchema = z.object({
  amount: z
    .number({ error: "Enter a valid amount" })
    .min(1, "Minimum top-up is ₹1")
    .int("Amount must be a whole number"),
});

type TopUpFormData = z.infer<typeof topUpSchema>;

interface TopUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopUpDialog({ isOpen, onClose }: TopUpDialogProps) {
  const { data: profile } = useSuspenseQuery(authQueries.profile());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TopUpFormData>({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const PRESET_AMOUNTS = [100, 200, 500, 1500, 2000];

  const topUpMutation = useTopUpWalletMutation();
  const verifyMutation = useVerifyTopUpMutation();

  const handleVerify = async (result: RazorpayPaymentResult) => {
    await verifyMutation.mutateAsync({
      razorpayPaymentId: result.razorpay_payment_id,
      razorpayOrderId: result.razorpay_order_id,
      razorpaySignature: result.razorpay_signature,
    });
  };

  const {
    status,
    initiatePayment,
    reset: resetPayment,
  } = usePayment({
    onVerify: handleVerify,
    description: "Wallet Top-Up",
    prefill: {
      name: profile?.fullName,
      email: profile?.email,
      contact: profile?.phone,
    },
  });

  useEffect(() => {
    if (status === "success") {
      toast.success("Wallet topped up successfully!");
      reset();
      resetPayment();
      onClose();
    }
  }, [status, reset, resetPayment, onClose]);

  const onSubmit = async (data: TopUpFormData) => {
    const orderData = await topUpMutation.mutateAsync({
      amount: data.amount,
      description: "Wallet Top-Up",
    });
    if (topUpMutation.isSuccess) {
      reset();
    }
    initiatePayment(orderData);
  };

  const isLoading =
    topUpMutation.isPending ||
    status === "checkout_open" ||
    status === "verifying";

  const getButtonLabel = () => {
    if (topUpMutation.isPending) return "Creating order…";
    if (status === "checkout_open") return "Complete in Razorpay…";
    if (status === "verifying") return "Verifying…";
    return "Add Money";
  };

  const isRazorpayOpen = status === "checkout_open";
  const isVerifying = status === "verifying" || verifyMutation.isPending;
  const isDismissed = status === "dismissed";

  const handleTryAgain = () => {
    resetPayment();
    reset();
  };

  const handClose = () => {
    resetPayment();
    reset();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen && !isRazorpayOpen}
      onClose={handClose}
      title="Top up Wallet"
      subTitle="Top up your Aavak wallet balance"
      size="sm"
    >
      {isVerifying ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <Spinner size={32} className="stroke-p-500" />
          <p className="text-neutral-500">Verifying your payment…</p>
        </div>
      ) : isDismissed ? (
        <FallbackView
          icon="AlertCircle"
          color="danger"
          title="Payment failed"
          footer={
            <div className="flex flex-col items-center gap-4">
              <p className="text-n-800 text-center">
                Payment was cancelled. Would you like to try again?
              </p>
              <Button variant="filled" color="primary" onClick={handleTryAgain}>
                Try Again
              </Button>
            </div>
          }
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            label="Enter Amount (₹)"
            type="number"
            placeholder="Enter amount"
            fullWidth
            autoFocus
            error={errors.amount?.message}
            {...register("amount", { valueAsNumber: true })}
          />
          <div className="flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() =>
                  setValue("amount", amount, { shouldValidate: true })
                }
                className="rounded-full border cursor-pointer border-n-400 px-3 py-1 text-sm text-neutral-500 hover:border-n-600 hover:text-n-900 transition-colors"
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              variant="filled"
              color="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {getButtonLabel()}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
