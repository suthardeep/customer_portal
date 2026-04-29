import ErrorText from "@/components/base/ErrorText";
import { Image } from "@/components/base/Image";
import { MediaUploader } from "@/components/base/media-uploader/MediaUploader";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProfileFormData } from "@/features/auth/schemas/profileFormSchema";

export function ProfileImageSection() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileFormData>();
  const profileImageUrl = useWatch({ control, name: "profileImageUrl" });
  const fullName = useWatch({ control, name: "fullName" });

  const handleUpload = (url: string) => {
    setValue("profileImageUrl", url, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="size-32 rounded-full overflow-hidden mb-3">
        <Image
          src={profileImageUrl}
          alt={fullName}
          className="size-full object-cover"
        />
      </div>
      <MediaUploader
        onUpload={handleUpload}
        uploadVariant="button"
        variant="outline"
        buttonText="Upload new"
      />
      {errors.profileImageUrl && (
        <ErrorText>{errors.profileImageUrl.message}</ErrorText>
      )}
    </div>
  );
}
