import { forwardRef, useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cssHelpers";

interface ImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "onLoad" | "onError"
> {
  src: string | undefined;
  alt: string;
  fallbackSrc?: string;
  eager?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc = "/img-fallback.jpg",
      eager = false,
      onLoad,
      onError,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
    const imgRef = useRef<HTMLImageElement>(null);

    // Reset state when src changes
    useEffect(() => {
      setCurrentSrc(src || fallbackSrc);
      setIsLoading(true);
    }, [src, fallbackSrc]);

    // If the browser already has the image cached, onLoad won't fire.
    // Check img.complete after each render to catch this case.
    useEffect(() => {
      if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
        setIsLoading(false);
      }
    });

    const handleLoad = useCallback(() => {
      setIsLoading(false);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setIsLoading(false);
      }
      onError?.();
    }, [fallbackSrc, currentSrc, onError]);

    return (
      <div className="relative h-full w-full">
        {isLoading && (
          <div
            className="absolute inset-0 animate-pulse bg-n-200"
            aria-hidden="true"
          />
        )}
        <img
          ref={(node) => {
            imgRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          src={currentSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "h-full w-full object-cover object-center transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);

Image.displayName = "Image";
