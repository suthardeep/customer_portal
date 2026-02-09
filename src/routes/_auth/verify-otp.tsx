import { useEffect, useRef, useState } from "react";
import OTPInput, { type OTPInputHandle } from "@/components/base/OTPInput";
import { Button } from "@/components/base/button/Button";
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from "@/features/login/loginMutations";
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { z } from "zod";

const RESEND_COUNTDOWN_SECONDS = 30;

const verifyOtpSearchSchema = z.object({
  phone: z.string(),
  isNewUser: z.boolean().optional().default(false),
});

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: verifyOtpSearchSchema,
  component: VerifyOtpRouteComponent,
});

const routeApi = getRouteApi("/_auth/verify-otp");

function VerifyOtpRouteComponent() {
  const { phone, isNewUser } = routeApi.useSearch();
  const navigate = useNavigate();
  const otpInputRef = useRef<OTPInputHandle>(null);

  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(
    RESEND_COUNTDOWN_SECONDS,
  );

  const verifyOtpMutation = useVerifyOtpMutation();
  const sendOtpMutation = useSendOtpMutation();

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleOtpComplete = (otp: string) => {
    setError(null);
    verifyOtpMutation.mutate(
      { phone, otp },
      {
        onSuccess: () => {
          navigate({ to: "/categories" });
        },
        onError: (err) => {
          setError(err.message || "Invalid OTP. Please try again.");
          otpInputRef.current?.clearFields();
        },
      },
    );
  };

  const handleResendOtp = () => {
    setError(null);
    sendOtpMutation.mutate(
      { phone: `+91${phone}`, userType: "customer" },
      {
        onSuccess: () => {
          setResendCountdown(RESEND_COUNTDOWN_SECONDS);
          otpInputRef.current?.clearFields();
        },
        onError: (err) => {
          setError(err.message || "Failed to resend OTP. Please try again.");
        },
      },
    );
  };

  const isVerifying = verifyOtpMutation.isPending;
  const isResending = sendOtpMutation.isPending;
  const canResend = resendCountdown <= 0 && !isResending;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h4>Verify OTP</h4>
          <p className="text-n-600">Enter the OTP sent to +91 {phone}</p>
        </div>
        <p className="text-sm text-n-500">
          {isNewUser
            ? "Welcome! Complete your registration after verification."
            : "Welcome back!"}
        </p>

        <div className="space-y-4">
          <OTPInput
            ref={otpInputRef}
            onComplete={handleOtpComplete}
            autoFocus={!isVerifying}
          />

          {isVerifying && (
            <p className="text-center text-sm text-n-500">Verifying...</p>
          )}

          {error && (
            <p className="text-center text-sm text-danger-500">{error}</p>
          )}

          <div className="flex flex-col items-center gap-2">
            {canResend ? (
              <Button
                variant="ghost"
                color="primary"
                onClick={handleResendOtp}
                isLoading={isResending}
              >
                Resend OTP
              </Button>
            ) : (
              <p className="text-sm text-n-500">
                Resend OTP in {resendCountdown}s
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
