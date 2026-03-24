import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateSpotlightProfileMutation } from "../../spotlightMutations";
import { spotlightQueries } from "../../spotlightQueries";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { AddEditSpotlightProfile } from "./AddEditSpotlightProfile";
import { CreatorTierCard } from "./CreatorTierCard";

export function EditProfileForm() {
  const { data } = useSuspenseQuery(spotlightQueries.profile());
  const { profile, tierProgress } = data;

  const updateMutation = useUpdateSpotlightProfileMutation();

  const handleSubmit = (data: EditProfileFormData) => {
    updateMutation.mutate({
      name: data.name,
      email: data.email,
      profileImageUrl: data.profileImageUrl ?? "",
      bio: data.bio ?? "",
      niches: data.niches,
      instagramUrl: data.instagramUrl,
      youtubeUrl: data.youtubeUrl,
    });
  };

  return (
    <>
      <AccountPageHeader title="Profile" />
      <AddEditSpotlightProfile
        mode="edit"
        defaultValues={{
          name: profile.name ?? "",
          email: profile.email ?? "",
          profileImageUrl: profile.profileImageUrl ?? "",
          bio: profile.bio ?? "",
          niches: profile.niches ?? [],
          instagramUrl: profile.instagramUrl ?? "",
          youtubeUrl: profile.youtubeUrl ?? "",
        }}
        onSubmit={handleSubmit}
        isPending={updateMutation.isPending}
      >
        <CreatorTierCard currentTier={tierProgress.currentTier} />
      </AddEditSpotlightProfile>
    </>
  );
}
