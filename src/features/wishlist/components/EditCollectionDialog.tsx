import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/components/base/Dialog";
import { Input } from "@/components/base/input/Input";
import {
  collectionFormSchema,
  type CollectionFormData,
  type WishlistCollection,
} from "../types/types";
import { useUpdateCollectionMutation } from "../wishlistMutations";

interface EditCollectionDialogProps {
  collection: WishlistCollection;
  isOpen: boolean;
  onClose: () => void;
}

export function EditCollectionDialog({
  collection,
  isOpen,
  onClose,
}: EditCollectionDialogProps) {
  const updateMutation = useUpdateCollectionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: collection?.name,
    },
  });

  const onSubmit = (data: CollectionFormData) => {
    updateMutation.mutate(
      {
        id: collection.id,
        name: data?.name,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    reset({ name: collection.name });
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Collection"
      size="md"
      actions={{
        primary: {
          label: "Save Changes",
          onClick: handleSubmit(onSubmit),
          loading: updateMutation.isPending,
        },
        secondary: {
          label: "Cancel",
          onClick: handleClose,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Collection Name"
          placeholder="Enter collection name"
          {...register("name")}
          error={errors.name?.message}
          autoFocus
          fullWidth
        />
      </form>
    </Dialog>
  );
}
