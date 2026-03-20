import { useRef, useState } from "react";
import { Button } from "@/components/base/button/Button";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { Textarea } from "@/components/base/textarea/Textarea";
import { Input } from "@/components/base/input/Input";
import { useMediaUpload } from "@/features/media-upload/useMediaUpload";
import { useSubmitCampaignMutation } from "../campaignsMutations";
import { UgcPostType } from "@/features/spotlight/types/enums";
import { cn } from "@/utils/cssHelpers";
import type { Product } from "@/features/products/types/product.types";

const ACCEPTED_FILE_TYPES =
  "image/jpeg,image/png,image/webp,video/mp4";
const MAX_CAPTION_LENGTH = 1000;
const MAX_TAGS = 20;

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const { uploadAsync, progress, isPending: isUploading } = useMediaUpload();
  const submitMutation = useSubmitCampaignMutation(campaignId);

  const isVideo = files.length > 0 && files[0].type.startsWith("video/");
  const isSubmitting = isUploading || submitMutation.isPending;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected?.length) return;

    const newFiles = Array.from(selected);
    const firstFile = newFiles[0];

    // If video selected, only allow one file
    if (firstFile.type.startsWith("video/")) {
      setFiles([firstFile]);
      setPreviews([]);
    } else {
      // Images — allow multiple (up to 10)
      const imageFiles = newFiles
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 10);
      setFiles(imageFiles);
      setPreviews(imageFiles.map((f) => URL.createObjectURL(f)));
    }

    // Reset input so the same file can be re-selected
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

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmit = async () => {
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
  };

  const canSubmit =
    files.length > 0 && selectedProductIds.length > 0 && !isSubmitting;

  return (
    <div className="space-y-5">
      {/* File Upload Area */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {files.length === 0 ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex h-full w-full cursor-pointer flex-col items-center justify-center py-8 rounded-xl",
            "border-2 border-dashed border-n-500 bg-n-50",
            "transition-colors hover:border-p-400 hover:bg-p-50",
            "group",
          )}
        >
          <Icon
            name="PlayList"
            size="xl"
            className="text-n-800 group-hover:text-p-500"
          />
          <p className="text-n-800 group-hover:text-p-500 mt-4 mb-1 font-medium">
            Click here to upload a video or image
          </p>
          <span className="text-n-700 group-hover:text-p-400">
            Supports MP4 · JPG, PNG, WEBP
          </span>
        </button>
      ) : (
        <div className="space-y-3">
          {/* File Previews */}
          {isVideo ? (
            <div className="flex items-center gap-3 rounded-xl border border-n-300 bg-n-50 p-3">
              <Icon name="PlayList" size="lg" className="text-p-500" />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{files[0].name}</p>
                <span className="text-n-600">
                  {(files[0].size / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>
              <button type="button" onClick={() => handleRemoveFile(0)}>
                <Icon name="X" size="md" className="text-n-600 hover:text-danger-500" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((src, i) => (
                <div key={src} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt={files[i].name}
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(i)}
                    className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5"
                  >
                    <Icon name="X" size="sm" className="text-white" />
                  </button>
                </div>
              ))}
              {previews.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-n-400 hover:border-p-400"
                >
                  <Icon name="Add" size="lg" className="text-n-500" />
                </button>
              )}
            </div>
          )}

          {/* Change file button for video */}
          {isVideo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Change file
            </Button>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-1">
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

      {/* Caption */}
      <Textarea
        label="Caption"
        placeholder="Describe your content..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        maxLength={MAX_CAPTION_LENGTH}
        showCount
        fullWidth
        disabled={isSubmitting}
      />

      {/* Tags */}
      <div>
        <Input
          label="Tags"
          placeholder="Type a tag and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          fullWidth
          disabled={isSubmitting || tags.length >= MAX_TAGS}
        />
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-p-50 px-3 py-1 text-p-700"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <Icon name="X" size="xs" className="text-p-500 hover:text-p-700" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Selection */}
      <div>
        <p className="mb-2 font-medium">
          Select Products <span className="text-danger-500">*</span>
        </p>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {products.map((product) => (
            <label
              key={product.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                selectedProductIds.includes(product.id)
                  ? "border-p-400 bg-p-50"
                  : "border-n-200 hover:border-n-400",
              )}
            >
              <Checkbox
                checked={selectedProductIds.includes(product.id)}
                onChange={() => toggleProduct(product.id)}
                disabled={isSubmitting}
              />
              {product.mediaUrls?.[0] && (
                <Image
                  src={product.mediaUrls[0]}
                  alt={product.name}
                  className="size-10 rounded object-cover"
                />
              )}
              <span className="flex-1 min-w-0 truncate">{product.name}</span>
            </label>
          ))}
        </div>
        {selectedProductIds.length === 0 && (
          <span className="mt-1 text-danger-500">
            Select at least one product
          </span>
        )}
      </div>

      {/* Submit */}
      <Button
        fullWidth
        size="lg"
        onClick={handleSubmit}
        disabled={!canSubmit}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </div>
  );
};

export default CampaignSubmissionForm;
