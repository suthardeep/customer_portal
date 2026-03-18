import { Icon } from "@/components/base/icon/Icon";
import { Input } from "@/components/base/input/Input";
import { useFormContext } from "react-hook-form";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";

interface BioSocialFieldsProps {
  isPending: boolean;
}

export function BioSocialFields({ isPending }: BioSocialFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditProfileFormData>();

  return (
    <div>
      <p className="font-semibold">Social Presence</p>
      <div className="grid grid-cols-1 gap-2 mt-4">
        <Input
          {...register("instagramUrl")}
          label="Instagram Profile URL"
          placeholder="https://url-123.xyz"
          leftElement={<Icon name="Instagram" size="sm" />}
          error={errors.instagramUrl?.message}
          disabled={isPending}
          fullWidth
        />

        <Input
          {...register("youtubeUrl")}
          label="Youtube Channel URL"
          placeholder="https://url-123.xyz"
          leftElement={<Icon name="Youtube" size="sm" />}
          error={errors.youtubeUrl?.message}
          disabled={isPending}
          fullWidth
        />
      </div>
    </div>
  );
}
