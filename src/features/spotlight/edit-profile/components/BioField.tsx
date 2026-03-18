import { Textarea } from "@/components/base/textarea/Textarea";
import { Controller, useFormContext } from "react-hook-form";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";

interface BioFieldProps {
  isPending: boolean;
}

export function BioField({ isPending }: BioFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditProfileFormData>();

  return (
    <Controller
      name="bio"
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label="Short Bio"
          placeholder="Tell us about yourself..."
          error={errors.bio?.message}
          disabled={isPending}
          fullWidth
          className="h-40"
        />
      )}
    />
  );
}
