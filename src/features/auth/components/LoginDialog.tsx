import Dialog from "@/components/base/Dialog";
import LoginForm from "@/features/login/components/LoginForm";
import RegisterForm from "@/features/login/components/RegisterForm";
import VerifyOtpForm from "./VerifyOtpForm";
import { useLoginDialogStore } from "../stores/loginDialogStore";
import { useSendOtpMutation } from "@/features/login/loginMutations";
import type { LoginFormData, RegisterFormData } from "@/features/login/types/types";
import { useState } from "react";
import { IconButton } from "@/components/base/icon-button/IconButton";
import ErrorText from "@/components/base/ErrorText";

export const LoginDialog = () => {
  const isOpen = useLoginDialogStore((state) => state.isOpen);
  const currentStep = useLoginDialogStore((state) => state.currentStep);
  const phone = useLoginDialogStore((state) => state.phone);
  const fullName = useLoginDialogStore((state) => state.fullName);
  const close = useLoginDialogStore((state) => state.close);
  const setStep = useLoginDialogStore((state) => state.setStep);
  const setPhone = useLoginDialogStore((state) => state.setPhone);
  const setFullName = useLoginDialogStore((state) => state.setFullName);
  const referralCode = useLoginDialogStore((state) => state.referralCode);
  const setReferralCode = useLoginDialogStore((state) => state.setReferralCode);
  const executeOnSuccess = useLoginDialogStore(
    (state) => state.executeOnSuccess,
  );

  const [isNewUser, setIsNewUser] = useState(false);
  const [sendOtpError, setSendOtpError] = useState<string | null>(null);

  const handleClose = () => {
    setIsNewUser(false);
    setSendOtpError(null);
    close();
  };

  const sendOtpMutation = useSendOtpMutation();

  const handleLoginSubmit = (data: LoginFormData) => {
    setSendOtpError(null);
    sendOtpMutation.mutate(
      { phone: data.mobileNumber, userType: "customer" },
      {
        onSuccess: (response) => {
          setPhone(response.phone.replace(/^\+91/, ""));
          if (response.isNewUser) {
            setIsNewUser(true);
          } else {
            setStep("otp");
          }
        },
        onError: (err) => {
          setSendOtpError(err.message || "Failed to send OTP. Please try again.");
        },
      },
    );
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    setSendOtpError(null);
    sendOtpMutation.mutate(
      { phone: data.mobileNumber, userType: "customer", isNewUser: true },
      {
        onSuccess: () => {
          setPhone(data.mobileNumber);
          setFullName(data.fullName);
          setStep("otp");
        },
        onError: (err) => {
          setSendOtpError(err.message || "Failed to send OTP. Please try again.");
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

  const dialogTitle =
    currentStep === "otp" ? "Verify OTP" : isNewUser ? "Create Account" : "Login";
  const dialogSubTitle =
    currentStep === "otp"
      ? `Enter code sent to +91 ${phone}`
      : isNewUser
        ? "No account found for this number. Please register to continue."
        : "Enter your mobile number to continue";

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={dialogTitle}
      subTitle={dialogSubTitle}
      size="sm"
      customContent
      disableBackdropClose
    >
      <div className="p-8 relative">
        {currentStep === "phone" ? (
          <div className="space-y-4">
            {isNewUser ? (
              <RegisterForm
                onSubmit={handleRegisterSubmit}
                isLoading={sendOtpMutation.isPending}
                defaultMobileNumber={phone}
                onLoginClick={() => setIsNewUser(false)}
                onReferralValidated={(code) => setReferralCode(code ?? '')}
              />
            ) : (
              <LoginForm
                onSubmit={handleLoginSubmit}
                isLoading={sendOtpMutation.isPending}
                onRegisterClick={() => setIsNewUser(true)}
              />
            )}
            {sendOtpError && <ErrorText withBgCard>{sendOtpError}</ErrorText>}
          </div>
        ) : (
          <VerifyOtpForm
            phone={phone}
            fullName={fullName || undefined}
            referralCode={referralCode || undefined}
            onSuccess={handleVerifySuccess}
            onBack={handleBack}
          />
        )}
        <IconButton
          icon="X"
          aria-label="Close dialog"
          onClick={handleClose}
          size="sm"
          variant="ghost"
          color="neutral"
          className="absolute top-3.5 right-4"
        />
      </div>
    </Dialog>
  );
};
