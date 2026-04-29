import { FormProvider, type UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/base/textarea/Textarea";
import SubmissionTagsInput from "../submit/components/SubmissionTagsInput";
import { MAX_CAPTION_LENGTH, type SubmissionFormValues } from "../submit/submissionSchema";
import type { SubmissionPost } from "../types/submission.types";

interface SubmissionCaptionTagsViewProps {
  post: SubmissionPost;
}

interface SubmissionCaptionTagsEditProps {
  form: UseFormReturn<SubmissionFormValues>;
  disabled?: boolean;
}

export function SubmissionCaptionTagsView({ post }: SubmissionCaptionTagsViewProps) {
  return (
    <div className="space-y-3">
      {post.caption && (
        <div>
          <p className="font-medium text-n-700 mb-1">Caption</p>
          <p className="text-n-900">{post.caption}</p>
        </div>
      )}
      {post.tags.length > 0 && (
        <div>
          <p className="font-medium text-n-700 mb-1.5">Tags</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-p-50 px-3 py-1 text-sm text-p-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SubmissionCaptionTagsEdit({ form, disabled }: SubmissionCaptionTagsEditProps) {
  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <Textarea
          label="Caption"
          placeholder="Describe your content..."
          maxLength={MAX_CAPTION_LENGTH}
          showCount
          fullWidth
          disabled={disabled}
          {...form.register("caption")}
        />
        <SubmissionTagsInput disabled={disabled} />
      </div>
    </FormProvider>
  );
}
