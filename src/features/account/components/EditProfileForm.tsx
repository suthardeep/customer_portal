import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import {
  profileFormSchema,
  type ProfileFormData,
} from "@/features/auth/schemas/profileFormSchema";
import type { User } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
