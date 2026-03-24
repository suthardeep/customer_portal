import { Button } from "@/components/base/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  editProfileFormSchema,
  type EditProfileFormData,
} from "../schemas/editProfileFormSchema";
import { BioField } from "./BioField";
import { BioSocialFields } from "./BioSocialFields";
import { ContentNicheSelector } from "./ContentNicheSelector";
import { NameEmailFields } from "./NameEmailFields";
import { ProfileImageSection } from "./ProfileImageSection";

interface AddEditSpotlightProfileProps {
  mode: "add" | "edit";
  defaultValues: EditProfileFormData;
  onSubmit: (data: EditProfileFormData) => void;
  onCancel?: () => void;
  isPending?: boolean;
  children?: React.ReactNode;
}

export function AddEditSpotlightProfile({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isPending = false,
  children,
}: AddEditSpotlightProfileProps) {
  const methods = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues,
  });

  const isSubmitting = isPending || methods.formState.isSubmitting;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ProfileImageSection mode={mode} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <NameEmailFields isPending={isSubmitting} />
          <div className="md:row-span-2">
            <BioField isPending={isSubmitting} />
          </div>
          <ContentNicheSelector isPending={isSubmitting} />
          <BioSocialFields isPending={isSubmitting} />
          {children}
        </div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={isSubmitting}>
            {mode === "add" ? "Create Profile" : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
