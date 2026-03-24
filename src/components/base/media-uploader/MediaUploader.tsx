import { useRef, useState } from "react";
import { cn } from "@/utils/cssHelpers";
import { showErrorToasts } from "@/components/toast";
import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon/Icon";
import { Button } from "@/components/base/button/Button";
import { useMediaUpload } from "@/features/media-upload/useMediaUpload";
import type { MediaUploaderProps } from "./media-uploader.types";

export function MediaUploader({
  onUpload,
  onRemove,
  maxSizeMb = 5,
  wrapperClassName,
  placeholderClassName,
  imageClassName,
  uploadVariant,
  defaultImage,
  ...rest
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isButton = uploadVariant === "button";

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(defaultImage ?? null);

  const { uploadAsync, progress: uploadProgress, isPending, reset } = useMediaUpload();

  const isUploading = isPending;
  const isUploaded = (uploadProgress.phase === "done" || !!defaultImage) && !!uploadedUrl;
  const progress = uploadProgress.percent;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so same file can be re-selected after cancel
    e.target.value = "";

    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      showErrorToasts({ message: `Image must be smaller than ${maxSizeMb}MB` });
      return;
    }

    // Show local preview immediately
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const results = await uploadAsync([file]);
      const s3Url = results[0].s3Url;
      setUploadedUrl(s3Url);
      onUpload(s3Url);
    } catch {
      // errors are handled inside useMediaUpload
    }
  };

  const handleCancel = () => {
    reset();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setUploadedUrl(null);
    if (isUploaded) {
      onRemove?.();
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  // Placeholder state
  if (!isUploading && !isUploaded) {
    return (
      <div className={cn("relative group", wrapperClassName)}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {isButton ? (
          <Button
            type="button"
            onClick={handlePlaceholderClick}
            className={placeholderClassName}
            variant={rest.variant}
            size={rest.size}
            disabled={rest.disabled}
            isLoading={rest.isLoading}
          >
            {rest.buttonText || "Upload"}
          </Button>
        ) : (
          <button
            type="button"
            onClick={handlePlaceholderClick}
            className={cn(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-n-500 bg-n-50 transition-colors hover:border-p-400 hover:bg-p-50",
              placeholderClassName,
            )}
          >
            <Icon
              name="ImageUpload"
              size="xl"
              className="text-n-800 group-hover:text-p-500"
            />
            <span className="text-sm text-n-800 group-hover:text-p-500">
              Upload image
            </span>
          </button>
        )}
      </div>
    );
  }

  // Uploading / uploaded state
  const displaySrc = uploadedUrl ?? previewUrl ?? undefined;

  if (isButton) {
    return (
      <div className={cn("relative inline-flex items-center gap-2", wrapperClassName)}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          onClick={handlePlaceholderClick}
          className={placeholderClassName}
          variant={rest.variant}
          size={rest.size}
          disabled={rest.disabled || isUploading}
          isLoading={rest.isLoading}
        >
          {isUploading ? `Uploading ${progress}%` : "Uploaded"}
        </Button>
        <button
          type="button"
          onClick={handleCancel}
          aria-label={isUploading ? "Cancel upload" : "Remove file"}
          className="flex size-5 items-center justify-center rounded-full bg-n-900 shadow-md transition-colors hover:bg-danger-600"
        >
          <Icon name="X" size="xs" className="text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative", wrapperClassName)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image */}
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-xl",
          imageClassName,
        )}
      >
        <Image src={displaySrc} alt="Uploaded media" eager />

        {/* Upload progress overlay */}
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-n-900/50">
            <CircularProgress progress={progress} />
            <span className="text-xs font-medium text-white">{progress}%</span>
          </div>
        )}
      </div>

      {/* Cancel / remove button */}
      <button
        type="button"
        onClick={handleCancel}
        aria-label={isUploading ? "Cancel upload" : "Remove image"}
        className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-n-900 shadow-md transition-colors hover:bg-danger-600"
      >
        <Icon name="X" size="xs" className="text-white" />
      </button>
    </div>
  );
}

const STROKE_RADIUS = 20;
const SVG_SIZE = 48;
const STROKE_DASH_ARRAY = 2 * Math.PI * STROKE_RADIUS;

function CircularProgress({ progress }: { progress: number }) {
  const strokeDashoffset = STROKE_DASH_ARRAY * (1 - progress / 100);

  return (
    <svg
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="-rotate-90"
    >
      {/* Background track */}
      <circle
        cx={SVG_SIZE / 2}
        cy={SVG_SIZE / 2}
        r={STROKE_RADIUS}
        fill="none"
        strokeWidth={4}
        className="stroke-n-300/60"
      />
      {/* Progress arc */}
      <circle
        cx={SVG_SIZE / 2}
        cy={SVG_SIZE / 2}
        r={STROKE_RADIUS}
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={STROKE_DASH_ARRAY}
        strokeDashoffset={strokeDashoffset}
        className="stroke-white transition-[stroke-dashoffset] duration-200"
      />
    </svg>
  );
}
