import ErrorText from "@/components/base/ErrorText";
import { Icon } from "@/components/base/icon";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import Sheet from "@/components/base/sheet/Sheet";
import { Input } from "@/components/base/input/Input";
import { Textarea } from "@/components/base/textarea/Textarea";
import { StarRatingInput } from "@/components/base/StarRatingInput";
import {
  reviewFormSchema,
  type ReviewFormData,
} from "@/features/reviews/schemas/reviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface AddEditReviewSheetProps {
  mode: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImageUrl?: string;
  initialRating?: number;
  defaultValues?: Partial<ReviewFormData>;
  onSubmit: (data: ReviewFormData & { images: File[] }) => void;
  isMutating?: boolean;
}

const MAX_IMAGES = 5;
const MAX_DESCRIPTION_CHARS = 300;
const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";

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
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: initialRating ?? 0,
      title: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleClose = () => {
    reset();
    setImages([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...newFiles].slice(0, MAX_IMAGES));
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitHandler = (data: ReviewFormData) => {
    onSubmit({ ...data, images });
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
        },
      ]}
    >
      <div>
        <form id="review-form">
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

          {/* Photo / Video upload */}

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
          <div className="mb-5 space-y-2">
            <p className="text-sm font-medium text-n-800">Add Photo or Video</p>
            <div className="flex flex-wrap gap-2">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-n-300"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${idx + 1}`}
                    className="size-full object-cover"
                  />
                  <IconButton
                    icon="X"
                    size="xs"
                    variant="filled"
                    color="neutral"
                    aria-label="Remove image"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute right-0.5 top-0.5"
                  />
                </div>
              ))}
              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-32 w-full shrink-0 rounded-xl border-2 border-dashed border-n-400 flex flex-col items-center justify-center gap-1 hover:border-p-400 hover:bg-p-50 transition-colors"
                >
                  <Icon name="ImageUpload" size="lg" className="text-n-500" />
                  <span className="text-xs text-n-600 text-center leading-tight px-1">
                    Click here to upload
                  </span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              multiple
              className="sr-only"
              onChange={handleFileChange}
              aria-label="Upload images"
            />
          </div>
        </form>
      </div>
    </Sheet>
  );
}
