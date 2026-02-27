import Dialog from "@/components/base/Dialog";
import LoginForm from "@/features/login/components/LoginForm";
import VerifyOtpForm from "./VerifyOtpForm";
import { useLoginDialogStore } from "../stores/loginDialogStore";
import { useSendOtpMutation } from "@/features/login/loginMutations";
import type { LoginFormData } from "@/features/login/types/types";
import { useState } from "react";
import { IconButton } from "@/components/base/icon-button/IconButton";
import ErrorText from "@/components/base/ErrorText";

export const LoginDialog = () => {
  const isOpen = useLoginDialogStore((state) => state.isOpen);
  const currentStep = useLoginDialogStore((state) => state.currentStep);
  const phone = useLoginDialogStore((state) => state.phone);
  const close = useLoginDialogStore((state) => state.close);
  const setStep = useLoginDialogStore((state) => state.setStep);
  const setPhone = useLoginDialogStore((state) => state.setPhone);
  const executeOnSuccess = useLoginDialogStore(
    (state) => state.executeOnSuccess,
  );

  const [sendOtpError, setSendOtpError] = useState<string | null>(null);

  const sendOtpMutation = useSendOtpMutation();

  const handlePhoneSubmit = (data: LoginFormData) => {
    setSendOtpError(null);
    sendOtpMutation.mutate(
      {
        phone: data.mobileNumber,
        userType: "customer",
      },
      {
        onSuccess: () => {
          setPhone(data.mobileNumber);
          setStep("otp");
        },
        onError: (err) => {
          setSendOtpError(
            err.message || "Failed to send OTP. Please try again.",
          );
        },
      },
    );
  };

  const handleVerifySuccess = () => {
    executeOnSuccess();
  };

  const handleBack = () => {
    setStep("phone");
    setSendOtpError(null);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      title={currentStep === "phone" ? "Login" : "Verify OTP"}
      subTitle={
        currentStep === "phone"
          ? "Enter your mobile number to continue"
          : `Enter code sent to +91 ${phone}`
      }
      size="sm"
      customContent
      disableBackdropClose
    >
      <div className="p-8 relative">
        {currentStep === "phone" ? (
          <div className="space-y-4">
            <LoginForm
              onSubmit={handlePhoneSubmit}
              isLoading={sendOtpMutation.isPending}
            />
            {sendOtpError && <ErrorText withBgCard>{sendOtpError}</ErrorText>}
          </div>
        ) : (
          <VerifyOtpForm
            phone={phone}
            onSuccess={handleVerifySuccess}
            onBack={handleBack}
          />
        )}
        <IconButton
          icon="X"
          aria-label="Close dialog"
          onClick={close}
          size="sm"
          variant="ghost"
          color="neutral"
          className="absolute top-3.5 right-4"
        />
      </div>
    </Dialog>
  );
};
