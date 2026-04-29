import { Button } from "@/components/base/button/Button";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { Input } from "@/components/base/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSaveGstMutation } from "../gstMutations";
import { gstFormSchema, type GstFormData } from "../schemas/gstFormSchema";

interface AddGstFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const AddGstForm = ({ onCancel, onSuccess }: AddGstFormProps) => {
  const saveGst = useSaveGstMutation();

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
    },
  });

  const handleFormSubmit = (data: GstFormData) => {
    saveGst.mutate(data, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4 mb-4">
        <Input
          {...register("businessName")}
          label="Business Name"
          placeholder="Enter business name"
          error={errors.businessName?.message}
          disabled={saveGst.isPending}
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
          disabled={saveGst.isPending}
          fullWidth
        />

        <Input
          {...register("billingAddress")}
          label="Billing Address"
          placeholder="Enter billing address"
          error={errors.billingAddress?.message}
          disabled={saveGst.isPending}
          fullWidth
        />

        <Checkbox
          {...register("isDefault")}
          label="Set as default GST"
          disabled={saveGst.isPending}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          color="neutral"
          fullWidth
          disabled={saveGst.isPending}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" fullWidth isLoading={saveGst.isPending}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddGstForm;
