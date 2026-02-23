import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/components/base/Dialog";
import { Input } from "@/components/base/input/Input";
import { collectionFormSchema, type CollectionFormData } from "../types/types";
import { useCreateCollectionMutation } from "../wishlistMutations";

interface CreateCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCollectionDialog({
  isOpen,
  onClose,
}: CreateCollectionDialogProps) {
  const createMutation = useCreateCollectionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: CollectionFormData) => {
    createMutation.mutate(
      { name: data.name },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Collection"
      size="md"
      actions={{
        primary: {
          label: "Create Collection",
          onClick: handleSubmit(onSubmit),
          loading: createMutation.isPending,
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
