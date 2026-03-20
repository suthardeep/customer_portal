import { useRef } from "react";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import { ACCEPTED_FILE_TYPES } from "../constants";

interface MediaUploadStepProps {
  files: File[];
  previews: string[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const MediaUploadStep = ({
  files,
  previews,
  onFileSelect,
  onRemoveFile,
}: MediaUploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isVideo = files.length > 0 && files[0].type.startsWith("video/");

  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-semibold">Upload your media</h5>
        <p className="text-n-600 mt-1">
          Upload a photo or video for your reel
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        multiple
        className="hidden"
        onChange={onFileSelect}
      />

      {files.length === 0 ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-16",
            "border-2 border-dashed border-n-400 bg-n-50",
            "transition-colors hover:border-p-400 hover:bg-p-50",
            "group",
          )}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-n-100 group-hover:bg-p-100">
            <Icon
              name="ImageUpload"
              size="xl"
              className="text-n-600 group-hover:text-p-500"
            />
          </div>
          <p className="mt-4 font-medium text-n-800 group-hover:text-p-600">
            Click here to upload
          </p>
          <span className="mt-1 text-n-600 group-hover:text-p-400">
            Supports MP4, JPG, PNG, WEBP
          </span>
        </button>
      ) : (
        <div className="space-y-3">
          {isVideo ? (
            <div className="flex items-center gap-3 rounded-xl border border-n-300 bg-n-50 p-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-p-50">
                <Icon name="PlayList" size="lg" className="text-p-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{files[0].name}</p>
                <span className="text-n-600">
                  {(files[0].size / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>
              <button type="button" onClick={() => onRemoveFile(0)}>
                <Icon
                  name="X"
                  size="md"
                  className="text-n-500 hover:text-danger-500"
                />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {previews.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={files[i].name}
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveFile(i)}
                    className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-n-950/50"
                  >
                    <Icon name="X" size="xs" className="text-white" />
                  </button>
                </div>
              ))}
              {previews.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-n-400 transition-colors hover:border-p-400 hover:bg-p-50"
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
      )}
    </div>
  );
};

export default MediaUploadStep;
