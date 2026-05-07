import ErrorText from "@/components/base/ErrorText";
import { Icon } from "@/components/base/icon";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { Input } from "@/components/base/input/Input";
import Sheet from "@/components/base/sheet/Sheet";
import { StarRatingInput } from "@/components/base/StarRatingInput";
import { Textarea } from "@/components/base/textarea/Textarea";
import { showErrorToasts } from "@/components/toast";
import { useMediaUpload } from "@/features/media-upload/useMediaUpload";
import {
  reviewFormSchema,
  type ReviewFormData,
} from "@/features/reviews/schemas/reviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ReviewFormFields = z.infer<typeof reviewFormSchema>;

interface AddEditReviewSheetProps {
  mode: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImageUrl?: string;
  initialRating?: number;
  defaultValues?: Partial<ReviewFormFields> & { mediaUrls?: string[] };
  onSubmit: (data: ReviewFormData) => void;
  isMutating?: boolean;
}

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 5;
const MAX_DESCRIPTION_CHARS = 300;
const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";

type ImageItem = {
  previewUrl: string;
  status: "uploading" | "done" | "error";
  s3Url?: string;
};

export function AddEditReviewSheet({
  mode,
  isOpen,
  onClose,
  productName,
  productImageUrl,
  initialRating,
  defaultValues,
  onSubmit,
  isMutating = false,
}: AddEditReviewSheetProps) {
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const { uploadAsync } = useMediaUpload();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormFields>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: initialRating ?? 0,
      title: "",
      description: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        rating: initialRating ?? 0,
        title: "",
        description: "",
        ...defaultValues,
      });
      setImageItems(
        (defaultValues?.mediaUrls ?? []).map((url) => ({
          previewUrl: url,
          status: "done",
          s3Url: url,
        })),
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    reset();
    setImageItems((prev) => {
      prev.forEach((item) => {
        if (item.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return [];
    });
    onClose();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    e.target.value = "";

    const slots = MAX_IMAGES - imageItems.length;
    const filesToAdd = newFiles.slice(0, slots);

    for (const file of filesToAdd) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        showErrorToasts({
          message: `Image must be smaller than ${MAX_SIZE_MB}MB`,
        });
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      setImageItems((prev) => [...prev, { previewUrl, status: "uploading" }]);

      try {
        const results = await uploadAsync([file]);
        setImageItems((prev) =>
          prev.map((i) =>
            i.previewUrl === previewUrl
              ? { ...i, status: "done", s3Url: results[0].s3Url }
              : i,
          ),
        );
      } catch {
        setImageItems((prev) =>
          prev.map((i) =>
            i.previewUrl === previewUrl ? { ...i, status: "error" } : i,
          ),
        );
      }
    }
  };

  const handleRemove = (index: number) => {
    setImageItems((prev) => {
      const item = prev[index];
      if (item.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const isAnyUploading = imageItems.some((i) => i.status === "uploading");

  const onSubmitHandler = (data: ReviewFormFields) => {
    const mediaUrls = imageItems
      .filter((i) => i.status === "done" && i.s3Url)
      .map((i) => i.s3Url as string);
    onSubmit({ ...data, mediaUrls });
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === "add" ? "Write a Review" : "Edit Review"}
      size="xl"
      disableBackdropClose={isMutating}
      actions={[
        {
          label: "Cancel",
          onClick: handleClose,
          fullWidth: true,
          isLoading: isMutating,
          variant: "outline",
          color: "neutral",
        },
        {
          label: "Submit",
          onClick: handleSubmit(onSubmitHandler),
          fullWidth: true,
          isLoading: isMutating,
          disabled: isAnyUploading,
        },
      ]}
    >
      <div>
        {/* Product header */}

        <div className="flex items-center gap-3 mb-5">
          {productImageUrl && (
            <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-n-300">
              <Image
                src={productImageUrl}
                alt={productName}
                className="size-full object-cover"
              />
            </div>
          )}
          <p className="font-medium line-clamp-2">{productName}</p>
        </div>

        {/* Star rating */}
        <div className="flex flex-col items-center gap-1.5 mb-6">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <StarRatingInput
                value={field.value}
                onChange={field.onChange}
                size="lg"
                disabled={isMutating}
              />
            )}
          />
          {errors.rating && <ErrorText>{errors.rating.message}</ErrorText>}
        </div>

        {/* Title input */}
        <div className="mb-5">
          <Input
            {...register("title")}
            label="Title"
            placeholder="Summarize your review in a few words"
            disabled={isMutating}
            error={errors.title?.message}
            fullWidth
          />
        </div>

        {/* Review textarea */}
        <Textarea
          {...register("description")}
          placeholder="Would you like to write anything about this product?"
          rows={4}
          maxLength={MAX_DESCRIPTION_CHARS}
          disabled={isMutating}
          error={errors.description?.message}
          showCount
          fullWidth
        />

        {/* Photo upload */}
        <div className="mb-5 space-y-2">
          <p className="text-sm font-medium text-n-800">Add Photos</p>

          <div className="flex flex-wrap gap-2">
            {imageItems.map((item, idx) => (
              <div
                key={item.previewUrl}
                className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-n-300"
              >
                <Image
                  src={item.previewUrl}
                  alt={`Upload ${idx + 1}`}
                  className="size-full object-cover"
                />
                {item.status === "uploading" && (
                  <div className="absolute inset-0 bg-n-900/50 animate-pulse" />
                )}
                {item.status === "error" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-danger-500/60">
                    <Icon name="X" size="md" className="text-white" />
                  </div>
                )}
                <IconButton
                  icon="X"
                  size="xs"
                  variant="filled"
                  color="neutral"
                  aria-label="Remove image"
                  onClick={() => handleRemove(idx)}
                  className="absolute right-0.5 top-0.5"
                />
              </div>
            ))}
            {imageItems.length < MAX_IMAGES && (
              <label
                className="h-20 w-full shrink-0 rounded-xl border-2 border-dashed border-n-400 flex flex-col items-center justify-center gap-1 hover:border-p-400 hover:bg-p-50 transition-colors cursor-pointer"
                data-vaul-no-drag
              >
                <input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES}
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Icon name="ImageUpload" size="lg" className="text-n-500" />
                <span className="text-xs text-n-600 text-center leading-tight px-1">
                  Click to upload
                </span>
              </label>
            )}
          </div>
        </div>
      </div>
    </Sheet>
  );
}
