import ErrorText from "@/components/base/ErrorText";
import { Button } from "@/components/base/button/Button";
import { MediaUploader } from "@/components/base/media-uploader/MediaUploader";
import { Select } from "@/components/base/select/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { RETURN_REASONS } from "../constants";
import { useReturnMyOrderItemMutation } from "../myOrdersMutations";
import {
  returnFormSchema,
  type ReturnFormData,
} from "../schemas/returnFormSchema";
import { Input } from "@/components/base/input/Input";
import { Textarea } from "@/components/base/textarea/Textarea";

interface ReturnProductFormProps {
  orderItemId: string;
  onSuccess?: () => void;
}

const MAX_IMAGES = 5;
const MAX_MESSAGE_CHARS = 500;

const REASON_OPTIONS = RETURN_REASONS.map((r) => ({ value: r, label: r }));

export function ReturnProductForm({
  orderItemId,
  onSuccess,
}: ReturnProductFormProps) {
  const returnMutation = useReturnMyOrderItemMutation();
  const isMutating = returnMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ReturnFormData>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      reason: undefined,
      otherReason: "",
      message: "",
      images: [],
    },
  });

  const watchedReason = useWatch({ control, name: "reason" });
  const watchedMessage = useWatch({ control, name: "message" });
  const watchedImages = useWatch({ control, name: "images" });

  const isOtherReason = watchedReason === "Other";
  const images = watchedImages ?? [];

  const handleUpload = (index: number, url: string) => {
    const current = getValues("images");
    const updated = [...current];
    updated[index] = url;
    setValue("images", updated, { shouldValidate: true });
  };

  const handleRemove = (index: number) => {
    const current = getValues("images");
    setValue(
      "images",
      current.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const onSubmit = (data: ReturnFormData) => {
    const finalReason =
      data.reason === "Other" ? (data.otherReason ?? "Other") : data.reason;

    returnMutation.mutate(
      {
        itemId: orderItemId,
        reason: finalReason,
        description: data.message,
        images: data.images,
      },
      { onSuccess },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-4"
    >
      {/* Reason */}
      <Controller
        name="reason"
        control={control}
        render={({ field }) => (
          <Select
            label="Reason for return"
            options={REASON_OPTIONS}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Select a reason"
            error={errors.reason?.message}
            disabled={isMutating}
            required
            fullWidth
          />
        )}
      />

      {/* Other reason input */}
      {isOtherReason && (
        <Input
          label="Other Reason"
          {...register("otherReason")}
          placeholder="Tell us more about your reason..."
          disabled={isMutating}
          error={errors.otherReason?.message}
          fullWidth
          required
        />
      )}

      {/* Message */}
      <Textarea
        {...register("message")}
        placeholder="Describe the issue in detail..."
        rows={4}
        maxLength={MAX_MESSAGE_CHARS}
        disabled={isMutating}
        error={errors.message?.message}
        customCount={`${watchedMessage?.length ?? 0}/${MAX_MESSAGE_CHARS}`}
        fullWidth
      />

      {/* Image upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-n-800">
          Images <span className="text-danger-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {images.map((_, idx) => (
            <MediaUploader
              key={idx}
              onUpload={(url) => handleUpload(idx, url)}
              onRemove={() => handleRemove(idx)}
              wrapperClassName="size-20 shrink-0"
              imageClassName="rounded-xl border border-n-300"
              placeholderClassName="rounded-xl"
            />
          ))}
          {images.length < MAX_IMAGES && (
            <MediaUploader
              key={`new-${images.length}`}
              onUpload={(url) => handleUpload(images.length, url)}
              wrapperClassName="size-20 shrink-0"
              imageClassName="rounded-xl border border-n-300"
              placeholderClassName="rounded-xl"
            />
          )}
        </div>
        {errors.images && (
          <ErrorText>{errors.images.message as string}</ErrorText>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={isMutating}>
        Submit Return Request
      </Button>
    </form>
  );
}
