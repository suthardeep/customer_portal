import { useEffect, useRef, useState } from "react";
import OTPInput, { type OTPInputHandle } from "@/components/base/OTPInput";
import { Button } from "@/components/base/button/Button";
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from "@/features/login/loginMutations";
import ErrorText from "@/components/base/ErrorText";
import Spinner from "@/components/compound/spinner/Spinner";
import { Icon } from "@/components/base/icon/Icon";

const RESEND_COUNTDOWN_SECONDS = 30;

interface VerifyOtpFormProps {
  phone: string;
  fullName?: string;
  referralCode?: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

const VerifyOtpForm = ({
  phone,
  fullName,
  referralCode,
  onSuccess,
  onBack,
}: VerifyOtpFormProps) => {
  const otpInputRef = useRef<OTPInputHandle>(null);
  const [isVerified, setIsVerified] = useState(false);

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
    verifyOtpMutation.mutate(
      { phone, otp, fullName, referredByCode: referralCode },
      {
        onSuccess: () => {
          setIsVerified(true);
          setTimeout(() => {
            onSuccess?.();
          }, 2000);
        },
        onError: () => {
          otpInputRef.current?.clearFields();
        },
      },
    );
  };

  const handleResendOtp = () => {
    sendOtpMutation.mutate(
      { phone, userType: "customer" },
      {
        onSuccess: () => {
          setResendCountdown(RESEND_COUNTDOWN_SECONDS);
          otpInputRef.current?.clearFields();
        },
      },
    );
  };

  const isVerifying = verifyOtpMutation.isPending;
  const isResending = sendOtpMutation.isPending;
  const canResend = resendCountdown <= 0 && !isResending;
  const errorMessage =
    verifyOtpMutation.error?.message || sendOtpMutation.error?.message;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1">
        <h5 className="text-center font-bold">Verify your number</h5>
        <p className="text-n-800 text-center">
          Enter the 6-digit code sent to{" "}
          <span className="text-n-1000 font-medium text-sm mt-1">{phone}</span>
        </p>
      </div>

      {isVerified ? (
        <div className="flex flex-col items-center gap-3 py-6 animate-slide-up">
          <div className="size-14 rounded-full bg-success-100 flex items-center justify-center">
            <Icon
              name="CheckCircle"
              size="lg"
              className="text-success-500 size-7"
              strokeWidth={3}
            />
          </div>
          <p className="text-success-600 font-semibold">Verified</p>
        </div>
      ) : isVerifying ? (
        <div className="flex justify-center py-8 animate-slide-up">
          <Spinner size={32} className="stroke-success-500" />
        </div>
      ) : (
        <div className="space-y-4">
          <OTPInput
            ref={otpInputRef}
            onComplete={handleOtpComplete}
            autoFocus
          />

          {errorMessage && <ErrorText withBgCard>{errorMessage}</ErrorText>}

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
              <p className="text-sm text-n-800">
                Resend OTP in {resendCountdown}s
              </p>
            )}
          </div>

          {onBack && (
            <Button variant="ghost" color="neutral" onClick={onBack} fullWidth>
              Back
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyOtpForm;
