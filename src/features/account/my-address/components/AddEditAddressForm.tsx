import { Button } from "@/components/base/button/Button";
import ErrorText from "@/components/base/ErrorText";
import { Input } from "@/components/base/input/Input";
import { TabSelector } from "@/components/base/TabSelector";
import { ADDRESS_TYPE_ITEMS } from "@/features/account/my-address/constants";
import { AddressTypeEnum } from "@/features/account/my-address/enums";
import { addressFormSchema } from "@/features/account/my-address/schemas/addressFormSchema";
import type { AddressFormData } from "@/features/account/my-address/types/types";
import { usePincodeAutofill } from "@/features/account/my-address/hooks/usePincodeAutofill";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";

interface AddEditAddressFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<AddressFormData>;
  onSubmit: (formData: AddressFormData) => void;
  isMutating?: boolean;
  className?: string;
  onCancel?: () => void;
}

const AddEditAddressForm = ({
  mode,
  defaultValues,
  onSubmit,
  isMutating = false,
  className,
  onCancel,
}: AddEditAddressFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      addressType: AddressTypeEnum.HOME,
      otherAddressLabel: "",
      isDefault: false,
      ...defaultValues,
    },
  });

  const addressType = useWatch({ control, name: "addressType" });

  const { isLoading: isResolvingPincode } = usePincodeAutofill({
    watch,
    setValue,
  });

  const handleFormSubmit = (data: AddressFormData) => {
    // Closing is owned by the caller's mutation `onSuccess` so the dialog
    // stays open (and form values are preserved) if the save fails.
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${className ?? ""}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-h-[50dvh] md:max-h-fit overflow-y-auto no-scrollbar">
        <Input
          {...register("fullName")}
          label="Full Name"
          placeholder="Enter Full name"
          error={errors.fullName?.message}
          disabled={isMutating}
          required
          fullWidth
        />

        <Input
          {...register("phone", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            },
          })}
          label="Mobile Number"
          placeholder="Enter Mobile number"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={10}
          error={errors.phone?.message}
          disabled={isMutating}
          required
          fullWidth
        />

        <Input
          {...register("addressLine1")}
          label="Address Line 1"
          placeholder="Enter Address Line 1"
          error={errors.addressLine1?.message}
          disabled={isMutating}
          required
          fullWidth
        />

        <Input
          {...register("addressLine2")}
          label="Address Line 2"
          placeholder="Enter Address Line 2"
          error={errors.addressLine2?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("landmark")}
          label="Landmark"
          placeholder="Enter Landmark"
          error={errors.landmark?.message}
          disabled={isMutating}
          fullWidth
        />

        <Input
          {...register("pincode", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            },
          })}
          label="Pincode"
          placeholder="123456"
          type="text"
          inputMode="numeric"
          maxLength={6}
          error={errors.pincode?.message}
          disabled={isMutating}
          required
          fullWidth
        />

        <Input
          {...register("city")}
          label="City"
          placeholder={isResolvingPincode ? "Detecting…" : "Enter City name"}
          error={errors.city?.message}
          disabled={isMutating || isResolvingPincode}
          required
          fullWidth
        />

        <Input
          {...register("state")}
          label="State"
          placeholder={isResolvingPincode ? "Detecting…" : "Enter State name"}
          error={errors.state?.message}
          disabled={isMutating || isResolvingPincode}
          required
          fullWidth
        />

        <div className="space-y-2">
          <p className="text-sm font-medium text-n-800">Address Type</p>
          <Controller
            name="addressType"
            control={control}
            render={({ field }) => (
              <TabSelector
                items={ADDRESS_TYPE_ITEMS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.addressType && (
            <ErrorText>{errors.addressType.message}</ErrorText>
          )}
        </div>

        {addressType === AddressTypeEnum.OTHER && (
          <Input
            {...register("otherAddressLabel")}
            label="Address Label"
            placeholder="e.g. Parents, Gym, Studio"
            error={errors.otherAddressLabel?.message}
            disabled={isMutating}
            fullWidth
          />
        )}
      </div>
      <div className="flex gap-3 pt-2">
        {onCancel && (
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
        )}
        <Button type="submit" fullWidth isLoading={isMutating}>
          {mode === "add" ? "Add" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddEditAddressForm;
