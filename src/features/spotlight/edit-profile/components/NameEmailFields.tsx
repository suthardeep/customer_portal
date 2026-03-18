import { Input } from "@/components/base/input/Input";
import { useFormContext } from "react-hook-form";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface NameEmailFieldsProps {
  isPending: boolean;
}

export function NameEmailFields({ isPending }: NameEmailFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditProfileFormData>();
  const { user } = useAuth();
  const { phone } = user ?? {};

  return (
    <>
      <Input
        {...register("name")}
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        disabled={isPending}
        fullWidth
      />
      <Input
        label="Mobile Number"
        placeholder="Mobile Number"
        disabled
        fullWidth
        value={phone}
      />

      <Input
        {...register("email")}
        label="Email"
        placeholder="john@example.com"
        type="email"
        error={errors.email?.message}
        disabled={isPending}
        fullWidth
      />
    </>
  );
}
