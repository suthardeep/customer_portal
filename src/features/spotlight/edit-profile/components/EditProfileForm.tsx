import { Button } from "@/components/base/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateSpotlightProfileMutation } from "../../spotlightMutations";
import { spotlightQueries } from "../../spotlightQueries";
import {
  editProfileFormSchema,
  type EditProfileFormData,
} from "../schemas/editProfileFormSchema";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { BioField } from "./BioField";
import { BioSocialFields } from "./BioSocialFields";
import { ContentNicheSelector } from "./ContentNicheSelector";
import { CreatorTierCard } from "./CreatorTierCard";
import { NameEmailFields } from "./NameEmailFields";
import { ProfileImageSection } from "./ProfileImageSection";

export function EditProfileForm() {
  const { data } = useSuspenseQuery(spotlightQueries.profile());
  const { profile, tierProgress } = data;

  const methods = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: profile.name ?? "",
      email: profile.email ?? "",
      profileImageUrl: profile.profileImageUrl ?? "",
      bio: profile.bio ?? "",
      niches: profile.niches ?? [],
      instagramUrl: profile.instagramUrl ?? "",
      youtubeUrl: profile.youtubeUrl ?? "",
    },
  });

  const updateMutation = useUpdateSpotlightProfileMutation();

  const onSubmit = (data: EditProfileFormData) => {
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AccountPageHeader title="Profile" />
        <ProfileImageSection name={profile.name} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <NameEmailFields isPending={updateMutation.isPending} />
          <div className="md:row-span-2">
            <BioField isPending={updateMutation.isPending} />
          </div>
          <ContentNicheSelector isPending={updateMutation.isPending} />
          <BioSocialFields isPending={updateMutation.isPending} />
          <CreatorTierCard currentTier={tierProgress.currentTier} />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={
              updateMutation.isPending || methods.formState.isSubmitting
            }
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
