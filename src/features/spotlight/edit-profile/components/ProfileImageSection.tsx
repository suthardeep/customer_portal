import ErrorText from "@/components/base/ErrorText";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { MediaUploader } from "@/components/base/media-uploader/MediaUploader";
import Dialog from "@/components/base/Dialog";
import { useToggle } from "@/hooks/useToggle";
import { useFormContext, useWatch } from "react-hook-form";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";

interface ProfileImageSectionProps {
  mode: "add" | "edit";
}

export function ProfileImageSection({ mode }: ProfileImageSectionProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<EditProfileFormData>();
  const profileImageUrl = useWatch({ control, name: "profileImageUrl" });
  const name = useWatch({ control, name: "name" });
  const dialog = useToggle();

  const handleUpload = (url: string) => {
    setValue("profileImageUrl", url, {
      shouldDirty: true,
      shouldValidate: true,
    });
    dialog.close();
  };

  return (
    <>
      <p className="text-sm font-medium text-n-800 mb-2">
        Profile Photo
        <sup className="ml-0.5">*</sup>
      </p>
      <div className="relative w-fit mb-6">
        <div className="size-32 rounded-full overflow-hidden">
          <Image
            src={profileImageUrl}
            alt={name}
            className="size-full object-cover"
          />
        </div>
        <IconButton
          icon="Pencil"
          aria-label="edit-spotlight-profile"
          className="absolute bottom-0 right-0"
          color="primary"
          onClick={dialog.open}
        />
      </div>
      {errors.profileImageUrl && (
        <ErrorText>{errors.profileImageUrl.message}</ErrorText>
      )}

      <Dialog
        isOpen={dialog.isOpen}
        onClose={dialog.close}
        title={mode === "add" ? "Add Profile Photo" : "Update Profile Photo"}
        size="sm"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-32 w-auto overflow-hidden mb-4">
            <Image
              src={profileImageUrl}
              alt={name}
              className="size-full object-cover"
            />
          </div>
          <MediaUploader
            onUpload={handleUpload}
            uploadVariant="button"
            buttonText={mode === "add" ? "Upload photo" : "Upload new"}
          />
          <p className="text-center text-n-700">
            {mode === "add"
              ? "Upload a photo for your profile"
              : "Upload a new photo to replace your current profile picture"}
          </p>
        </div>
      </Dialog>
    </>
  );
}
