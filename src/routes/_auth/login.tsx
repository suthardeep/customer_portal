import { createFileRoute, useNavigate } from "@tanstack/react-router";
import LoginForm from "@/features/login/components/LoginForm";
import { useSendOtpMutation } from "@/features/login/loginMutations";
import type { LoginFormData } from "@/features/login/types/types";

export const Route = createFileRoute("/_auth/login")({
  component: LoginRouteComponent,
});

function LoginRouteComponent() {
  const navigate = useNavigate();
  const sendOtpMutation = useSendOtpMutation();

  const handleSubmit = (data: LoginFormData) => {
    sendOtpMutation.mutate(
      {
        phone: data.mobileNumber,
        userType: "customer",
      },
      {
        onSuccess: (response) => {
          navigate({
            to: "/verify-otp",
            search: {
              phone: response.phone,
              isNewUser: response.isNewUser,
            },
          });
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={sendOtpMutation.isPending}
        />
        {sendOtpMutation.isError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {sendOtpMutation.error?.message || "Failed to send OTP. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}
