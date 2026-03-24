import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/base/button/Button";
import { Textarea } from "@/components/base/textarea/Textarea";
import { useMediaUpload } from "@/features/media-upload/useMediaUpload";
import { useSubmitCampaignMutation } from "../campaignsMutations";
import { UgcPostType } from "@/features/spotlight/types/enums";
import type { Product } from "@/features/products/types/product.types";
import { submissionSchema, type SubmissionFormValues } from "./submissionSchema";
import { MAX_CAPTION_LENGTH } from "./submissionSchema";
import SubmissionMediaUpload from "./components/SubmissionMediaUpload";
import SubmissionUploadProgress from "./components/SubmissionUploadProgress";
import SubmissionTagsInput from "./components/SubmissionTagsInput";
import SubmissionProductSelector from "./components/SubmissionProductSelector";

interface CampaignSubmissionFormProps {
  campaignId: string;
  products: Product[];
  onSuccess: () => void;
}

const CampaignSubmissionForm = ({
  campaignId,
  products,
  onSuccess,
}: CampaignSubmissionFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const { uploadAsync, progress, isPending: isUploading } = useMediaUpload();
  const submitMutation = useSubmitCampaignMutation(campaignId);

  const isSubmitting = isUploading || submitMutation.isPending;

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { caption: "", tagInput: "", tags: [] },
  });

  const handleFilesChange = (newFiles: File[], newPreviews: string[]) => {
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmit = form.handleSubmit(async ({ caption, tags }) => {
    if (files.length === 0 || selectedProductIds.length === 0) return;

    const results = await uploadAsync(files);
    const type = results[0].type === "video" ? UgcPostType.VIDEO : UgcPostType.IMAGE;

    if (type === UgcPostType.VIDEO) {
      submitMutation.mutate(
        {
          type: UgcPostType.VIDEO,
          videoFileId: results[0].mediaFileId,
          caption: caption || undefined,
          tags: tags.length > 0 ? tags : undefined,
          productIds: selectedProductIds,
        },
        { onSuccess },
      );
    } else {
      submitMutation.mutate(
        {
          type: UgcPostType.IMAGE,
          imageFileIds: results.map((r) => r.mediaFileId),
          images: results.map((r) => r.s3Url),
          caption: caption || undefined,
          tags: tags.length > 0 ? tags : undefined,
          productIds: selectedProductIds,
        },
        { onSuccess },
      );
    }
  });

  const canSubmit = files.length > 0 && selectedProductIds.length > 0 && !isSubmitting;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <SubmissionMediaUpload
          files={files}
          previews={previews}
          disabled={isSubmitting}
          onFilesChange={handleFilesChange}
          onRemove={handleRemoveFile}
        />

        {isUploading && <SubmissionUploadProgress progress={progress} />}

        <Textarea
          label="Caption"
          placeholder="Describe your content..."
          maxLength={MAX_CAPTION_LENGTH}
          showCount
          fullWidth
          disabled={isSubmitting}
          {...form.register("caption")}
        />

        <SubmissionTagsInput disabled={isSubmitting} />

        <SubmissionProductSelector
          products={products}
          selectedIds={selectedProductIds}
          disabled={isSubmitting}
          onToggle={toggleProduct}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={!canSubmit}
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default CampaignSubmissionForm;
