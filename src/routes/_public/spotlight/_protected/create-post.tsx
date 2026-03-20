import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/base/button/Button";
import StepIndicator from "@/features/spotlight/create-post/components/StepIndicator";
import ProductSelectionStep from "@/features/spotlight/create-post/components/ProductSelectionStep";
import MediaUploadStep from "@/features/spotlight/create-post/components/MediaUploadStep";
import DetailsStep from "@/features/spotlight/create-post/components/DetailsStep";
import { MAX_TAGS } from "@/features/spotlight/create-post/constants";
import { myOrderQueries } from "@/features/account/my-orders/myOrdersQueries";
import { OrderLifecycleStatus } from "@/features/account/my-orders/types/types";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { useMediaUpload } from "@/features/media-upload/useMediaUpload";
import { useCreatePostMutation } from "@/features/spotlight/spotlightMutations";
import { UgcPostType } from "@/features/spotlight/types/enums";

export const Route = createFileRoute(
  "/_public/spotlight/_protected/create-post",
)({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(myOrderQueries.list());
  },
  component: CreateReelPage,
});

function CreateReelPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { uploadAsync, progress, isPending: isUploading } = useMediaUpload();
  const createPostMutation = useCreatePostMutation();
  const isSubmitting = isUploading || createPostMutation.isPending;

  const { data: ordersData } = useSuspenseQuery(myOrderQueries.list());
  const products = ordersData.data.filter(
    (order) => order.lifecycleStatus === OrderLifecycleStatus.DELIVERED,
  );

  const handleToggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected?.length) return;

    const newFiles = Array.from(selected);
    const firstFile = newFiles[0];

    if (firstFile.type.startsWith("video/")) {
      setFiles([firstFile]);
      setPreviews([]);
    } else {
      const imageFiles = newFiles
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 10);
      setFiles(imageFiles);
      setPreviews(imageFiles.map((f) => URL.createObjectURL(f)));
    }

    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.length >= MAX_TAGS || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (files.length === 0 || selectedProductIds.length === 0) return;

    const results = await uploadAsync(files);
    const type = results[0].type === "video" ? UgcPostType.VIDEO : UgcPostType.IMAGE;

    if (type === UgcPostType.VIDEO) {
      createPostMutation.mutate(
        {
          type: UgcPostType.VIDEO,
          videoFileId: results[0].mediaFileId,
          caption: caption || undefined,
          tags: tags.length > 0 ? tags : undefined,
          productIds: selectedProductIds,
        },
        { onSuccess: () => navigate({ to: "/spotlight/my-posts" }) },
      );
    } else {
      createPostMutation.mutate(
        {
          type: UgcPostType.IMAGE,
          imageFileIds: results.map((r) => r.mediaFileId),
          images: results.map((r) => r.s3Url),
          caption: caption || undefined,
          tags: tags.length > 0 ? tags : undefined,
          productIds: selectedProductIds,
        },
        { onSuccess: () => navigate({ to: "/spotlight/my-posts" }) },
      );
    }
  };

  const canProceed =
    (currentStep === 1 && selectedProductIds.length > 0) ||
    (currentStep === 2 && files.length > 0) ||
    (currentStep === 3 && !isSubmitting);

  return (
    <div>
      <AccountPageHeader
        title="Create Post"
        trailingTitleComponent={<StepIndicator currentStep={currentStep} />}
      />

      {/* Step Content */}
      <div className="my-8">
        {currentStep === 1 && (
          <ProductSelectionStep
            products={products}
            selectedProductIds={selectedProductIds}
            onToggleProduct={handleToggleProduct}
          />
        )}

        {currentStep === 2 && (
          <MediaUploadStep
            files={files}
            previews={previews}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
          />
        )}

        {currentStep === 3 && (
          <DetailsStep
            products={products}
            selectedProductIds={selectedProductIds}
            files={files}
            previews={previews}
            caption={caption}
            onCaptionChange={setCaption}
            tagInput={tagInput}
            onTagInputChange={setTagInput}
            tags={tags}
            onRemoveTag={handleRemoveTag}
            onTagKeyDown={handleTagKeyDown}
          />
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="my-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-n-700 capitalize">{progress.phase}...</span>
            <span className="text-n-700">{progress.percent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-n-200">
            <div
              className="h-full rounded-full bg-p-500 transition-all duration-300"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-n-200 pt-4">
        <Button
          variant="ghost"
          color="neutral"
          startIcon="ChevronLeft"
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
        >
          Back
        </Button>

        {currentStep < 3 ? (
          <Button
            endIcon="ChevronRight"
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next
          </Button>
        ) : (
          <Button
            endIcon="ChevronRight"
            onClick={handleSubmit}
            disabled={!canProceed}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
