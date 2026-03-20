import { Image } from "@/components/base/Image";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { cn } from "@/utils/cssHelpers";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface ShortImageSliderProps {
  images: string[];
  title: string;
}

export function ShortImageSlider({ images, title }: ShortImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative size-full">
      <div ref={emblaRef} className="overflow-hidden size-full">
        <div className="flex size-full">
          {images.map((src, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full size-full">
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                className="size-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <IconButton
            icon="ChevronLeft"
            aria-label="Previous image"
            variant="filled"
            color="neutral"
            size="sm"
            className="absolute top-1/2 left-2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => emblaApi?.scrollPrev()}
          />
          <IconButton
            icon="ChevronRight"
            aria-label="Next image"
            variant="filled"
            color="neutral"
            size="sm"
            className="absolute top-1/2 right-2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => emblaApi?.scrollNext()}
          />

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === activeIndex ? "bg-white" : "bg-white/40",
                )}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
