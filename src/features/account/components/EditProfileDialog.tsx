import Dialog from "@/components/base/Dialog";
import { useUpdateProfileMutation } from "@/features/auth/authMutations";
import { authQueries } from "@/features/auth/authQueries";
import type { ProfileFormData } from "@/features/auth/schemas/profileFormSchema";
import { useSuspenseQuery } from "@tanstack/react-query";
import EditProfileForm from "./EditProfileForm";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileDialog = ({ isOpen, onClose }: EditProfileDialogProps) => {
  const { data: user } = useSuspenseQuery(authQueries.profile());
  const updateMutation = useUpdateProfileMutation();

  const handleSubmit = (data: ProfileFormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      ...(data.dateOfBirth ? { dateOfBirth: data.dateOfBirth } : {}),
      ...(data.profileImageUrl
        ? { profileImageUrl: data.profileImageUrl }
        : {}),
    };
    updateMutation.mutate(payload, { onSuccess: onClose });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      size="sm"
      disableBackdropClose={updateMutation.isPending}
    >
      {user && (
        <EditProfileForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isMutating={updateMutation.isPending}
        />
      )}
    </Dialog>
  );
};

export default EditProfileDialog;
