import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormData } from "@/features/auth/schemas/profileFormSchema";
import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import { Icon } from "@/components/base/icon/Icon";
import OTPInput, { type OTPInputHandle } from "@/components/base/OTPInput";
import Collapsible from "@/components/compound/Collapsible";
import { useToggle } from "@/hooks/useToggle";
import {
  useRequestEmailOtpMutation,
  useVerifyEmailOtpMutation,
} from "@/features/auth/authMutations";

const RESEND_COUNTDOWN_SECONDS = 30;

const ProfileEmailVerify = () => {
  const {
    register,
    getValues,
    setFocus,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const [step, setStep] = useState<"default" | "verify" | "changing">("default");
  const [resendCountdown, setResendCountdown] = useState(0);
  const otpRef = useRef<OTPInputHandle>(null);
  const collapsible = useToggle(false);

  const requestOtpMutation = useRequestEmailOtpMutation();
  const verifyOtpMutation = useVerifyEmailOtpMutation();

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleVerify = () => {
    const email = getValues("email");
    requestOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep("verify");
          if (!collapsible.isOpen) collapsible.toggle();
          setResendCountdown(RESEND_COUNTDOWN_SECONDS);
        },
      },
    );
  };

  const handleOtpComplete = (otp: string) => {
    const email = getValues("email");
    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          setStep("default");
          if (collapsible.isOpen) collapsible.toggle();
          otpRef.current?.clearFields();
        },
        onError: () => {
          otpRef.current?.clearFields();
        },
      },
    );
  };

  const handleChange = () => {
    setStep("changing");
    if (collapsible.isOpen) collapsible.close();
    setTimeout(() => setFocus("email"), 0);
  };

  const handleResend = () => {
    const email = getValues("email");
    requestOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setResendCountdown(RESEND_COUNTDOWN_SECONDS);
          otpRef.current?.clearFields();
        },
      },
    );
  };

  const email = getValues("email");
  const isVerifying = verifyOtpMutation.isPending;
  const canResend = resendCountdown <= 0 && !requestOtpMutation.isPending;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <Input
          {...register("email")}
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          readOnly={step !== "changing"}
          disabled={step !== "changing"}
          fullWidth
        />
        <div className="mt-8">
          {step === "default" && (
            <Button
              type="button"
              variant="outline"
              color="primary"
              onClick={handleChange}
              className="shrink-0 mb-px"
            >
              Change
            </Button>
          )}
          {step === "changing" && (
            <Button
              type="button"
              variant="outline"
              color="primary"
              onClick={handleVerify}
              isLoading={requestOtpMutation.isPending}
              className="shrink-0 mb-px"
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      <Collapsible
        isOpen={collapsible.isOpen}
        toggle={collapsible.toggle}
        hideIcon
        trigger={<></>}
        dynamicHeight
      >
        <div className="flex flex-col gap-4 rounded-xl border border-n-400 bg-n-100 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-n-200">
              <Icon name="Mail" size="md" className="text-n-700" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Check your inbox</p>
              <p className="text-n-700">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-n-1000">{email}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleChange}
              className="flex shrink-0 items-center gap-1 text-sm text-n-700 hover:text-n-1000 transition-colors cursor-pointer"
            >
              <Icon name="ChevronLeft" size="sm" />
              Change
            </button>
          </div>

          <OTPInput
            ref={otpRef}
            onComplete={handleOtpComplete}
            autoFocus={step === "verify"}
          />

          {isVerifying && (
            <p className="text-center text-sm text-n-700">Verifying…</p>
          )}

          <div className="flex justify-center">
            {canResend ? (
              <Button
                type="button"
                variant="ghost"
                color="primary"
                onClick={handleResend}
                isLoading={requestOtpMutation.isPending}
              >
                Resend code
              </Button>
            ) : (
              <p className="text-sm text-n-700">
                Didn't receive the code?{" "}
                <span className="font-medium text-n-1000">
                  Resend in {resendCountdown}s
                </span>
              </p>
            )}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default ProfileEmailVerify;
