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
  const { phone, redirectTo } = Route.useSearch();
  const navigate = useNavigate();
  const routeToNavigate = redirectTo || "/categories";

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <VerifyOtpForm
        phone={phone}
        onSuccess={() => navigate({ to: routeToNavigate })}
      />
    </div>
  );
}
