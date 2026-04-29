import { authQueries } from "@/features/auth/authQueries";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { AddEditSpotlightProfile } from "@/features/spotlight/edit-profile/components/AddEditSpotlightProfile";
import type { EditProfileFormData } from "@/features/spotlight/edit-profile/schemas/editProfileFormSchema";
import { useOnboardCreatorMutation } from "@/features/spotlight/spotlightMutations";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import {
  createFileRoute,
  isRedirect,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/create-profile")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    try {
      const user = await context.queryClient.ensureQueryData(
        authQueries.profile(),
      );
      if (!user) {
        throw redirect({
          to: "/login",
          search: { redirectTo: location.pathname },
        });
      }
    } catch (e) {
      if (isRedirect(e)) throw e;
      throw redirect({
        to: "/login",
        search: { redirectTo: location.pathname },
      });
    }

    const data = context.queryClient.getQueryData(
      spotlightQueries.profile().queryKey,
    );
    if (data?.profile?.id) {
      throw redirect({ to: "/spotlight" });
    }
  },
});

function RouteComponent() {
  const router = useRouter();
  const onboardMutation = useOnboardCreatorMutation();

  const handleSubmit = (data: EditProfileFormData) => {
    onboardMutation.mutate({
      name: data.name,
      email: data.email,
      profileImageUrl: data.profileImageUrl ?? "",
      bio: data.bio ?? "",
      niches: data.niches,
      instagramUrl: data.instagramUrl,
      youtubeUrl: data.youtubeUrl,
    });
  };

  const handleCancel = () => {
    router.history.back();
  };

  return (
    <div className="p-6">
      <AccountPageHeader title="Create Spotlight Profile" />
      <AddEditSpotlightProfile
        mode="add"
        defaultValues={{
          name: "",
          email: "",
          profileImageUrl: "",
          bio: "",
          niches: [],
          instagramUrl: "",
          youtubeUrl: "",
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isPending={onboardMutation.isPending}
      />
    </div>
  );
}
