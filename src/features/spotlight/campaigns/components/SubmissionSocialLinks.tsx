import { type UseFormReturn } from "react-hook-form";
import { Icon } from "@/components/base/icon/Icon";
import { Input } from "@/components/base/input/Input";
import { Button } from "@/components/base/button/Button";
import type { SocialLinksFormValues } from "../submit/submissionSchema";
import type { CampaignSubmission } from "../types/submission.types";

interface SubmissionSocialLinksViewProps {
  submission: Pick<CampaignSubmission, "instagramUrl" | "youtubeUrl" | "facebookUrl">;
}

interface SubmissionSocialLinksFormProps {
  form: UseFormReturn<SocialLinksFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function SubmissionSocialLinksView({ submission }: SubmissionSocialLinksViewProps) {
  return (
    <div className="space-y-2">
      {submission.instagramUrl && (
        <div className="flex items-center gap-2">
          <Icon name="Instagram" size="sm" className="text-n-600 shrink-0" />
          <span className="text-n-900 truncate">{submission.instagramUrl}</span>
        </div>
      )}
      {submission.youtubeUrl && (
        <div className="flex items-center gap-2">
          <Icon name="Youtube" size="sm" className="text-n-600 shrink-0" />
          <span className="text-n-900 truncate">{submission.youtubeUrl}</span>
        </div>
      )}
      {submission.facebookUrl && (
        <div className="flex items-center gap-2">
          <Icon name="Link" size="sm" className="text-n-600 shrink-0" />
          <span className="text-n-900 truncate">{submission.facebookUrl}</span>
        </div>
      )}
    </div>
  );
}

export function SubmissionSocialLinksForm({
  form,
  onSubmit,
  isLoading,
}: SubmissionSocialLinksFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        label="Instagram"
        placeholder="https://instagram.com/p/..."
        fullWidth
        disabled={isLoading}
        error={form.formState.errors.instagramShareUrl?.message}
        {...form.register("instagramShareUrl")}
      />
      <Input
        label="YouTube"
        placeholder="https://youtube.com/..."
        fullWidth
        disabled={isLoading}
        error={form.formState.errors.youtubeShareUrl?.message}
        {...form.register("youtubeShareUrl")}
      />
      <Input
        label="Facebook"
        placeholder="https://facebook.com/..."
        fullWidth
        disabled={isLoading}
        error={form.formState.errors.facebookShareUrl?.message}
        {...form.register("facebookShareUrl")}
      />
      <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
        Submit Links
      </Button>
    </form>
  );
}

export function SubmissionSocialLinksPending() {
  return (
    <p className="text-n-500 text-center py-6">
      Social links can be submitted once your content is approved.
    </p>
  );
}
