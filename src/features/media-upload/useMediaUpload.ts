import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { showErrorToasts } from "@/components/toast";
import { bulkStartUpload, bulkFinishUpload } from "./mediaUploadService";
import { getMediaType, uploadFileToS3 } from "./uploadToS3";
import type {
  BulkFinishFile,
  MediaFileResult,
  UploadProgress,
} from "./types/types";

const INITIAL_PROGRESS: UploadProgress = { phase: "preparing", percent: 0 };

const MAX_CONCURRENT_UPLOADS = 3;

/** Run async tasks with limited concurrency */
async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const i = nextIndex++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
}

export function useMediaUpload() {
  const [progress, setProgress] = useState<UploadProgress>(INITIAL_PROGRESS);

  const mutation = useMutation({
    mutationFn: async (files: File[]): Promise<MediaFileResult[]> => {
      // Phase 1: Prepare metadata
      setProgress({ phase: "preparing", percent: 0 });

      const metadata = files.map((f) => {
        const { type, group } = getMediaType(f);
        return {
          fileName: f.name,
          contentType: f.type,
          fileSize: f.size,
          group,
          type,
        };
      });

      // Phase 2: Get presigned URLs
      const startResponse = await bulkStartUpload({ data: { files: metadata } });
      const { uploads } = startResponse.data;

      // Phase 3: Upload to S3
      setProgress({ phase: "uploading", percent: 5 });

      const perFileProgress = new Array<number>(files.length).fill(0);
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);

      const uploadResults = await runWithConcurrency(
        files,
        MAX_CONCURRENT_UPLOADS,
        async (file, i) => {
          const upload = uploads[i];
          const etags = await uploadFileToS3(
            file,
            upload.parts,
            (uploaded) => {
              perFileProgress[i] = uploaded;
              const totalUploaded = perFileProgress.reduce((a, b) => a + b, 0);
              // Uploading phase spans 5% to 90%
              const uploadPercent = 5 + (totalUploaded / totalSize) * 85;
              setProgress({ phase: "uploading", percent: Math.round(uploadPercent) });
            },
          );
          return { upload, etags, meta: metadata[i] };
        },
      );

      // Phase 4: Finalize uploads
      setProgress({ phase: "finalizing", percent: 90 });

      const finishFiles: BulkFinishFile[] = uploadResults.map((r) => ({
        key: r.upload.key,
        uploadId: r.upload.uploadId,
        parts: r.etags,
        fileName: r.meta.fileName,
        contentType: r.meta.contentType,
        fileSize: r.meta.fileSize,
        type: r.meta.type,
        group: r.meta.group,
        uploaderType: "customer" as const,
        platformType: "customer" as const,
      }));

      const finishResponse = await bulkFinishUpload({
        data: { files: finishFiles },
      });

      setProgress({ phase: "done", percent: 100 });
      return finishResponse.data.results;
    },
    onError: (error) => {
      setProgress({ phase: "error", percent: 0 });
      showErrorToasts(error);
    },
  });

  return {
    uploadAsync: mutation.mutateAsync,
    progress,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: () => {
      mutation.reset();
      setProgress(INITIAL_PROGRESS);
    },
  };
}
