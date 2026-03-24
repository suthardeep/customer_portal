import { useRef } from "react";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";

const ACCEPTED_FILE_TYPES = "image/jpeg,image/png,image/webp,video/mp4";

interface SubmissionMediaUploadProps {
  files: File[];
  previews: string[];
  disabled?: boolean;
  onFilesChange: (files: File[], previews: string[]) => void;
  onRemove: (index: number) => void;
}

const SubmissionMediaUpload = ({
  files,
  previews,
  disabled,
  onFilesChange,
  onRemove,
}: SubmissionMediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isVideo = files.length > 0 && files[0].type.startsWith("video/");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected?.length) return;

    const newFiles = Array.from(selected);
    const firstFile = newFiles[0];

    if (firstFile.type.startsWith("video/")) {
      onFilesChange([firstFile], []);
    } else {
      const imageFiles = newFiles
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 10);
      onFilesChange(imageFiles, imageFiles.map((f) => URL.createObjectURL(f)));
    }

    e.target.value = "";
  };

  if (files.length === 0) {
    return (
      <>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex h-full w-full cursor-pointer flex-col items-center justify-center py-8 rounded-xl",
            "border-2 border-dashed border-n-500 bg-n-50",
            "transition-colors hover:border-p-400 hover:bg-p-50",
            "group",
          )}
        >
          <Icon name="PlayList" size="xl" className="text-n-800 group-hover:text-p-500" />
          <p className="text-n-800 group-hover:text-p-500 mt-4 mb-1 font-medium">
            Click here to upload a video or image
          </p>
          <span className="text-n-700 group-hover:text-p-400">
            Supports MP4 · JPG, PNG, WEBP
          </span>
        </button>
      </>
    );
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {isVideo ? (
        <div className="flex items-center gap-3 rounded-xl border border-n-300 bg-n-50 p-3">
          <Icon name="PlayList" size="lg" className="text-p-500" />
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{files[0].name}</p>
            <span className="text-n-600">
              {(files[0].size / (1024 * 1024)).toFixed(1)} MB
            </span>
          </div>
          <button type="button" onClick={() => onRemove(0)}>
            <Icon name="X" size="md" className="text-n-600 hover:text-danger-500" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={src} className="relative aspect-square rounded-lg overflow-hidden">
              <Image src={src} alt={files[i].name} className="size-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove(i)}
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
  );
};

export default SubmissionMediaUpload;
