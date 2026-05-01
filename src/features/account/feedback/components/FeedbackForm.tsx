import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { StarRatingInput } from "@/components/base/StarRatingInput";
import { Textarea } from "@/components/base/textarea/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useCreateFeedbackMutation } from "../feedbackMutations";
import {
  feedbackFormSchema,
  type FeedbackFormData,
} from "../schemas/feedbackFormSchema";

interface FeedbackFormProps {
  onClose: () => void;
}

const MAX_MESSAGE_CHARS = 1000;

export function FeedbackForm({ onClose }: FeedbackFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createMutation = useCreateFeedbackMutation();
  const isMutating = createMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const watchedMessage = useWatch({ control, name: "message" });

  const onSubmit = (data: FeedbackFormData) => {
    createMutation.mutate(
      { rating: data.rating, message: data.message },
      { onSuccess: () => setIsSubmitted(true) },
    );
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center animate-slide-up">
        <div className="flex size-20 items-center justify-center rounded-full bg-success-100">
          <Icon
            name="CheckCircle"
            size="xl"
            className="text-success-500"
            strokeWidth={3}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h5 className="font-bold text-n-900">Thank you for your feedback!</h5>
          <p className="text-n-700">
            Your response helps us improve our services.
          </p>
        </div>
        <Button onClick={onClose} variant="outline" color="neutral">
          Close
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-2 px-5 py-4"
    >
      <div className="flex flex-col items-center gap-1">
        <h5 className="font-bold text-n-900">Give us Feedback</h5>
        <p className="text-n-600">
          Your feedback helps us improve our services.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
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
        {errors.rating && (
          <p className="text-danger-600 text-sm">{errors.rating.message}</p>
        )}
      </div>

      <Textarea
        {...register("message")}
        placeholder="Tell us about your experience..."
        rows={4}
        maxLength={MAX_MESSAGE_CHARS}
        disabled={isMutating}
        error={errors.message?.message}
        customCount={`${watchedMessage?.length ?? 0}/${MAX_MESSAGE_CHARS}`}
        fullWidth
      />

      <Button type="submit" fullWidth isLoading={isMutating}>
        Submit Feedback
      </Button>
    </form>
  );
}
