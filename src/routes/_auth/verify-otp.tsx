import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

const verifyOtpSearchSchema = z.object({
  phone: z.string(),
  fullName: z.string().optional(),
  referralCode: z.string().optional(),
  redirectTo: z.string().optional(),
});

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: verifyOtpSearchSchema,
  component: VerifyOtpRouteComponent,
});

function VerifyOtpRouteComponent() {
  const { phone, fullName, referralCode, redirectTo } = Route.useSearch();
  const navigate = useNavigate();
  const routeToNavigate = redirectTo || "/";

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 max-w-lg mx-auto">
      <VerifyOtpForm
        phone={phone}
        fullName={fullName}
        referralCode={referralCode}
        onSuccess={() => navigate({ to: routeToNavigate })}
      />
    </div>
  );
}
