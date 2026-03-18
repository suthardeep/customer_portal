import { createFileRoute } from "@tanstack/react-router";
import { EditProfileForm } from "@/features/spotlight/edit-profile/components/EditProfileForm";
import { EditProfileFormSkeleton } from "@/features/spotlight/edit-profile/components/skeletons/EditProfileFormSkeleton";

export const Route = createFileRoute(
  "/_public/spotlight/_protected/edit-profile",
)({
  pendingComponent: EditProfileFormSkeleton,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <EditProfileForm />
    </div>
  );
}
