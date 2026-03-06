import { useRef, useState } from "react";
import { cn } from "@/utils/cssHelpers";
import { showErrorToasts } from "@/components/toast";
import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon/Icon";
import { useUploadMediaMutation } from "@/mutations/mediaMutations";
import type { MediaUploaderProps } from "./media-uploader.types";

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

export function MediaUploader({
  group,
  onUpload,
  onRemove,
  maxSizeMb = 5,
  wrapperClassName,
  placeholderClassName,
  imageClassName,
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const mutation = useUploadMediaMutation(group, xhrRef, setProgress);

  const isUploading = mutation.isPending;
  const isUploaded = mutation.isSuccess && !!uploadedUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setProgress(0);

    mutation.mutate(file, {
      onSuccess: (data) => {
        setUploadedUrl(data.url);
        onUpload(data.url);
      },
    });
  };

  const handleCancel = () => {
    xhrRef.current?.abort();
    mutation.reset();
    setProgress(0);
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
      <div className={cn("relative", wrapperClassName)}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handlePlaceholderClick}
          className={cn(
            "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-n-300 bg-n-50 transition-colors hover:border-p-400 hover:bg-p-50",
            placeholderClassName,
          )}
        >
          <Icon name="ImageUpload" size="xl" className="text-n-400" />
          <span className="text-sm text-n-500">Upload image</span>
        </button>
      </div>
    );
  }

  // Uploading / uploaded state
  const displaySrc = uploadedUrl ?? previewUrl ?? undefined;

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
