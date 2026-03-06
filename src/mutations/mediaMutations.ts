import { showErrorToasts } from "@/components/toast";
import { getApiBaseUrl } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import type { MutableRefObject } from "react";
import type { MediaUploadResponse } from "@/components/base/media-uploader/media-uploader.types";

export const useUploadMediaMutation = (
  group: string,
  xhrRef: MutableRefObject<XMLHttpRequest | null>,
  onProgress: (progress: number) => void,
) => {
  return useMutation({
    mutationFn: (file: File): Promise<MediaUploadResponse> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.withCredentials = true;

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            const errorData = (() => {
              try {
                return JSON.parse(xhr.responseText);
              } catch {
                return {};
              }
            })();
            reject(new Error(errorData.message || `Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.onabort = () => reject(new Error("Upload cancelled"));

        xhr.open("POST", `${getApiBaseUrl()}/v1/media/upload`);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("uploader", "customer");
        formData.append("platformType", "customer");
        formData.append("group", group);

        xhr.send(formData);
      });
    },
    onError: (error) => {
      // Don't show toast for user-initiated cancellations
      if (error.message === "Upload cancelled") return;
      showErrorToasts(error);
    },
  });
};
