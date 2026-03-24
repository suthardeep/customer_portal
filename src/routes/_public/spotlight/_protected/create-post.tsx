import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/base/button/Button";
import StepIndicator from "@/features/spotlight/create-post/components/StepIndicator";
import ProductSelectionStep from "@/features/spotlight/create-post/components/ProductSelectionStep";
import MediaUploadStep from "@/features/spotlight/create-post/components/MediaUploadStep";
import DetailsStep from "@/features/spotlight/create-post/components/DetailsStep";
import {
  detailsSchema,
  type DetailsFormValues,
} from "@/features/spotlight/create-post/detailsSchema";
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
    await context.queryClient.ensureInfiniteQueryData(
      myOrderQueries.listInfinite({
        lifecycleStatus: OrderLifecycleStatus.DELIVERED,
      }),
    );
  },
  component: CreateReelPage,
});

function CreateReelPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { caption: "", tagInput: "", tags: [] },
  });

  const { uploadAsync, progress, isPending: isUploading } = useMediaUpload();
  const createPostMutation = useCreatePostMutation();
  const isSubmitting = isUploading || createPostMutation.isPending;

  const {
    data: ordersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    myOrderQueries.listInfinite({
      lifecycleStatus: OrderLifecycleStatus.DELIVERED,
    }),
  );
  const products = ordersData.pages.flatMap((page) => page.data);

  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = form.handleSubmit(async ({ caption, tags }) => {
    if (files.length === 0 || selectedProductIds.length === 0) return;

    const results = await uploadAsync(files);
    const type =
      results[0].type === "video" ? UgcPostType.VIDEO : UgcPostType.IMAGE;

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
  });

  const canProceed =
    (currentStep === 1 && selectedProductIds.length > 0) ||
    (currentStep === 2 && files.length > 0) ||
    (currentStep === 3 && !isSubmitting);

  return (
    <FormProvider {...form}>
      <div>
        <AccountPageHeader
          title="Create Post"
          trailingTitleComponent={<StepIndicator currentStep={currentStep} />}
        />

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <ProductSelectionStep
              products={products}
              selectedProductIds={selectedProductIds}
              onToggleProduct={handleToggleProduct}
              loadMoreRef={loadMoreRef}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
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
            />
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="my-4 bg-success-50 border rounded-xl p-4 border-success-300">
            <div className="flex items-center justify-between">
              <p className="text-success-900 font-medium capitalize">
                {progress.phase}...
              </p>
              <p className="text-success-900 font-medium">
                {progress.percent}%
              </p>
            </div>
            <div className="h-2 w-full rounded-full bg-n-200 mt-4">
              <div
                className="h-full rounded-full bg-success-500 transition-all duration-300"
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
    </FormProvider>
  );
}
