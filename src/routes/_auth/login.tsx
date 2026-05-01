import { createFileRoute, useNavigate } from "@tanstack/react-router";
import LoginForm from "@/features/login/components/LoginForm";
import { useSendOtpMutation } from "@/features/login/loginMutations";
import type { LoginFormData } from "@/features/login/types/types";
import z from "zod";

const loginSearchSchema = z.object({
  redirectTo: z.string().optional(),
  referralCode: z.string().optional(),
});

export const Route = createFileRoute("/_auth/login")({
  component: LoginRouteComponent,
  validateSearch: loginSearchSchema,
});

function LoginRouteComponent() {
  const navigate = useNavigate();
  const sendOtpMutation = useSendOtpMutation();
  const { redirectTo, referralCode } = Route.useSearch();

  const handleSubmit = (data: LoginFormData) => {
    sendOtpMutation.mutate(
      {
        phone: data.mobileNumber,
        userType: "customer",
      },
      {
        onSuccess: (response) => {
          if (response.isNewUser) {
            navigate({
              to: "/register",
              search: { phone: response.phone, redirectTo, referralCode },
            });
          } else {
            navigate({
              to: "/verify-otp",
              search: { phone: response.phone, redirectTo, referralCode },
            });
          }
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-n-200">
      <div className="w-full max-w-md shadow-md rounded-2xl p-8 bg-white border border-n-300">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={sendOtpMutation.isPending}
        />
        {sendOtpMutation.isError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {sendOtpMutation.error?.message ||
              "Failed to send OTP. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}
