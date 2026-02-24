import { useEffect, useRef, useState } from "react";
import OTPInput, { type OTPInputHandle } from "@/components/base/OTPInput";
import { Button } from "@/components/base/button/Button";
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from "@/features/login/loginMutations";

const RESEND_COUNTDOWN_SECONDS = 30;

interface VerifyOtpFormProps {
  phone: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

const VerifyOtpForm = ({ phone, onSuccess, onBack }: VerifyOtpFormProps) => {
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
          if (onSuccess) {
            onSuccess();
          }
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
    <div className="w-full max-w-sm space-y-6">
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

        {onBack && (
          <Button
            variant="ghost"
            color="neutral"
            onClick={onBack}
            fullWidth
            disabled={isVerifying}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpForm;
