import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const verifyOtpSearchSchema = z.object({
  phone: z.string(),
  redirectTo: z.string().optional(),
  isNewUser: z.boolean().optional().default(false),
});

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: verifyOtpSearchSchema,
  component: VerifyOtpRouteComponent,
});

function VerifyOtpRouteComponent() {
  const { phone, isNewUser, redirectTo } = Route.useSearch();
  const navigate = useNavigate();
  const routeToNavigate = redirectTo || "/categories";

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

        <VerifyOtpForm
          phone={phone}
          onSuccess={() => navigate({ to: routeToNavigate })}
        />
      </div>
    </div>
  );
}
