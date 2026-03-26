import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";
import { useEffect, useRef } from "react";
import { useImageGalleryStore } from "../stores/imageGalleryStore";
import { ZoomModal } from "./ZoomModal";

interface ProductImageGalleryProps {
  images: string[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const currentIndex = useImageGalleryStore((state) => state.currentIndex);
  const previousIndex = useImageGalleryStore((state) => state.previousIndex);
  const isZoomed = useImageGalleryStore((state) => state.isZoomed);
  const setImages = useImageGalleryStore((state) => state.setImages);
  const setIsZoomed = useImageGalleryStore((state) => state.setIsZoomed);
  const goTo = useImageGalleryStore((state) => state.goTo);
  const next = useImageGalleryStore((state) => state.next);
  const prev = useImageGalleryStore((state) => state.prev);
  const reset = useImageGalleryStore((state) => state.reset);

  // Guard against undefined or empty images
  if (!images || images.length === 0) {
    return (
      <div className="flex gap-4 w-full">
        {/* Placeholder thumbnails column */}
        <div className="hidden lg:flex flex-col gap-2 items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="size-20 shrink-0 rounded-lg border-2 border-n-200 bg-n-300"
            />
          ))}
          <div className="mt-1">
            <Icon name="ChevronDown" size="md" className="text-n-300" />
          </div>
        </div>

        {/* Main empty state area */}
        <div className="flex-1 aspect-square rounded-lg w-full border-2 border-dashed border-n-400 bg-n-200 h-auto flex flex-col items-center justify-center gap-3">
          <Icon name="ImageNotFound" className="text-n-500 size-16" />
          <p className="text-n-600">No image available</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setImages(images);
    return () => reset();
  }, [images, setImages, reset]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          prev();
        } else {
          next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch swipe support for mobile
  useEffect(() => {
    const mainImage = mainImageRef.current;
    if (!mainImage) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0]?.screenX ?? 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0]?.screenX ?? 0;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next image
          next();
        } else {
          // Swipe right - previous image
          prev();
        }
      }
    };

    mainImage.addEventListener("touchstart", handleTouchStart);
    mainImage.addEventListener("touchend", handleTouchEnd);

    return () => {
      mainImage.removeEventListener("touchstart", handleTouchStart);
      mainImage.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  const handleThumbnailClick = (index: number) => {
    goTo(index);

    // Scroll thumbnail into view
    const thumbnailsContainer = thumbnailsRef.current;
    if (thumbnailsContainer) {
      const thumbnail = thumbnailsContainer.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  const handleMainImageClick = () => {
    setIsZoomed(true);
  };

  const currentImage = images[currentIndex] ?? images[0];

  return (
    <div className="flex gap-4">
      {/* Thumbnails - vertical stack on desktop, horizontal on mobile */}
      <div className="relative hidden lg:flex flex-col gap-2">
        <div
          ref={thumbnailsRef}
          className="flex flex-col gap-2 max-h-125 overflow-y-auto scrollbar-hide"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                currentIndex === index
                  ? "border-p-500"
                  : "border-n-300 hover:border-n-400",
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={currentIndex === index}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="size-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div
        ref={mainImageRef}
        className="flex-1 relative aspect-square overflow-hidden rounded-lg border border-n-400 bg-n-50 p-2 cursor-zoom-in"
        onClick={handleMainImageClick}
      >
        <div
          className={cn(
            "size-full image-gallery-transition",
            previousIndex !== null && "changing",
          )}
        >
          <Image
            key={currentIndex}
            src={currentImage}
            alt="Product main image"
            className="size-full object-contain"
            eager
          />
        </div>

        {/* Mobile navigation dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goTo(index);
              }}
              className={cn(
                "size-2 rounded-full transition-all",
                currentIndex === index ? "bg-p-500 w-6" : "bg-n-300",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      <ZoomModal
        image={currentImage}
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
      />
    </div>
  );
}
