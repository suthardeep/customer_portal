import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { Input } from "@/components/base/input/Input";
import { MediaUploader } from "@/components/base/media-uploader/MediaUploader";
import {
  profileFormSchema,
  type ProfileFormData,
} from "@/features/auth/schemas/profileFormSchema";
import type { User } from "@/types/user.types";
import { getInitials } from "@/utils/stringHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

interface EditProfileFormProps {
  user: User;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  isMutating?: boolean;
}

const EditProfileForm = ({
  user,
  onSubmit,
  onCancel,
  isMutating = false,
}: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      profileImageUrl: user.profileImageUrl ?? "",
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
    },
  });

  const profileImageUrl = useWatch({ control, name: "profileImageUrl" });
  const fullName = useWatch({ control, name: "fullName" });
  const displayName = fullName || user.fullName || "User";

  const handlePhotoUpload = (url: string) => {
    setValue("profileImageUrl", url, { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Profile image row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="rounded-full overflow-hidden shrink-0 border border-n-500">
          {profileImageUrl ? (
            <MediaUploader
              group="profile-image"
              onUpload={handlePhotoUpload}
              buttonText="Upload new"
              variant="outline"
              disabled={isMutating}
              defaultImage={profileImageUrl}
            />
          ) : (
            <div className="flex size-full items-center justify-center rounded-full bg-p-100 text-lg font-semibold text-p-700">
              {getInitials(displayName)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <Input
          {...register("fullName")}
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullName?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("email")}
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("dateOfBirth")}
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message}
          disabled={isMutating}
          fullWidth
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          color="neutral"
          fullWidth
          disabled={isMutating}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" fullWidth isLoading={isMutating}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
