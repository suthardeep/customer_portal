import { createFileRoute, useNavigate } from "@tanstack/react-router";
import RegisterForm from "@/features/login/components/RegisterForm";
import { useSendOtpMutation } from "@/features/login/loginMutations";
import type { RegisterFormData } from "@/features/login/types/types";
import ErrorText from "@/components/base/ErrorText";
import { z } from "zod";

const registerSearchSchema = z.object({
  phone: z.string().optional(),
  redirectTo: z.string().optional(),
  referralCode: z.string().optional(),
  validatedReferralCode: z.string().optional(),
  autoVerifyReferCode: z.boolean().optional(),
});

export const Route = createFileRoute("/_auth/register")({
  component: RegisterRouteComponent,
  validateSearch: registerSearchSchema,
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  }),
});

function RegisterRouteComponent() {
  const navigate = useNavigate();
  const sendOtpMutation = useSendOtpMutation();
  const {
    phone: rawPhone,
    redirectTo,
    referralCode: defaultReferralCode,
    validatedReferralCode,
    autoVerifyReferCode,
  } = Route.useSearch();
  const phone = rawPhone?.replace(/^\+91/, "");

  const handleSubmit = (data: RegisterFormData) => {
    sendOtpMutation.mutate(
      { phone: data.mobileNumber, userType: "customer", isNewUser: true },
      {
        onSuccess: (response) => {
          navigate({
            to: "/verify-otp",
            search: {
              phone: response.phone,
              fullName: data.fullName,
              referralCode: validatedReferralCode ?? undefined,
              redirectTo,
            },
          });
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-n-200">
      <div className="w-full max-w-md shadow-md rounded-2xl p-8 bg-white border border-n-300">
        {phone && (
          <div className="mb-4">
            <ErrorText withBgCard>
              No account found for this number. Please register to continue.
            </ErrorText>
          </div>
        )}
        <RegisterForm
          onSubmit={handleSubmit}
          isLoading={sendOtpMutation.isPending}
          defaultMobileNumber={phone}
          defaultReferralCode={validatedReferralCode ?? defaultReferralCode}
          autoVerifyReferCode={autoVerifyReferCode}
          onReferralValidated={(code) =>
            navigate({
              to: "/register",
              search: {
                phone: rawPhone,
                redirectTo,
                referralCode: defaultReferralCode,
                validatedReferralCode: code ?? undefined,
              },
            })
          }
        />
        {sendOtpMutation.isError && (
          <p className="text-danger-500 text-sm mt-2 text-center">
            {sendOtpMutation.error?.message ||
              "Failed to send OTP. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}
