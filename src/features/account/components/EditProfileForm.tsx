import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import {
  profileFormSchema,
  type ProfileFormData,
} from "@/features/auth/schemas/profileFormSchema";
import ProfileEmailVerify from "./ProfileEmailVerify";
import { ProfileImageSection } from "./ProfileImageSection";
import type { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

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
  isMutating,
}: EditProfileFormProps) => {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      profileImageUrl: user.profileImageUrl ?? "",
      fullName: user.fullName ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
      email: user.email ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageSection />

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
            {...register("dateOfBirth")}
            label="Date of Birth"
            type="date"
            error={errors.dateOfBirth?.message}
            disabled={isMutating}
            fullWidth
          />
          <ProfileEmailVerify />
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
    </FormProvider>
  );
};

export default EditProfileForm;
