import { Button } from "@/components/base/button/Button";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { Input } from "@/components/base/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { gstFormSchema, type GstFormData } from "../schemas/gstFormSchema";

interface AddEditGstFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<GstFormData>;
  onSubmit: (data: GstFormData) => void;
  onCancel: () => void;
  isMutating: boolean;
}

const AddEditGstForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isMutating,
}: AddEditGstFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GstFormData>({
    resolver: zodResolver(gstFormSchema),
    defaultValues: {
      businessName: "",
      gstin: "",
      billingAddress: "",
      isDefault: false,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-4">
        <Input
          {...register("businessName")}
          label="Business Name"
          placeholder="Enter business name"
          error={errors.businessName?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("gstin", {
            onChange: (e) => {
              e.target.value = e.target.value.toUpperCase();
            },
          })}
          label="GSTIN"
          placeholder="e.g. 29ABCDE1234F1Z5"
          maxLength={15}
          error={errors.gstin?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("billingAddress")}
          label="Billing Address"
          placeholder="Enter billing address"
          error={errors.billingAddress?.message}
          disabled={isMutating}
          fullWidth
        />

        <Checkbox
          {...register("isDefault")}
          label="Set as default GST"
          disabled={isMutating}
        />
      </div>

      <div className="flex gap-3 pt-2">
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
          {mode === "edit" ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddEditGstForm;
