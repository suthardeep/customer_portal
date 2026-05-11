import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import { Logo } from "@/components/compound/logo/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { registerFormSchema, type RegisterFormData } from "../types/types";
import ReferralCodeInput from "./ReferralCodeInput";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
  defaultMobileNumber?: string;
  defaultReferralCode?: string;
  autoVerifyReferCode?: boolean;
  onReferralValidated?: (code: string | null) => void;
  loginHref?: string;
  onLoginClick?: () => void;
}

const RegisterForm = ({
  onSubmit,
  isLoading = false,
  defaultMobileNumber,
  defaultReferralCode,
  autoVerifyReferCode,
  onReferralValidated,
  loginHref,
  onLoginClick,
}: RegisterFormProps) => {
  const [referralCode, setReferralCode] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: defaultMobileNumber ?? "",
      acceptedTerms: undefined,
    },
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit({ ...data, referralCode: referralCode || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full space-y-6 mx-auto"
    >
      <div className="fall flex-col gap-4 mb-8">
        <Logo />
        <h6 className="font-semibold">Create Account</h6>
      </div>

      <Input
        {...register("fullName")}
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName?.message}
        disabled={isLoading}
        fullWidth
      />

      <Input
        {...register("mobileNumber")}
        label="Mobile Number"
        placeholder="Enter 10-digit mobile number"
        leftElement={<span className="text-n-700">+91</span>}
        error={errors.mobileNumber?.message}
        type="tel"
        inputMode="numeric"
        maxLength={10}
        disabled={isLoading}
        fullWidth
      />

      <ReferralCodeInput
        defaultCode={defaultReferralCode}
        code={referralCode}
        onCodeChange={setReferralCode}
        onValidated={onReferralValidated}
        autoVerify={autoVerifyReferCode}
      />

      <Controller
        control={control}
        name="acceptedTerms"
        render={({ field }) => (
          <div className="space-y-1">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 accent-p-500"
                checked={field.value === true}
                onChange={(e) =>
                  field.onChange(e.target.checked ? true : undefined)
                }
                disabled={isLoading}
              />
              <span className="text-sm text-n-800">
                I have read and agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-n-900 underline"
                >
                  Terms &amp; Conditions
                </a>
              </span>
            </label>
            {errors.acceptedTerms && (
              <p className="text-danger-500 text-xs ml-6">
                {errors.acceptedTerms.message}
              </p>
            )}
          </div>
        )}
      />

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        isLoading={isLoading}
      >
        Continue
      </Button>

      <p className="text-center text-sm text-n-800">
        Already have an account?{" "}
        {onLoginClick ? (
          <button
            type="button"
            onClick={onLoginClick}
            className="text-n-900 font-medium hover:underline"
          >
            Login
          </button>
        ) : (
          <Link
            to={loginHref ?? "/login"}
            className="text-n-900 font-medium hover:underline"
          >
            Login
          </Link>
        )}
      </p>
    </form>
  );
};

export default RegisterForm;
