import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface ShortImageSliderProps {
  images: string[];
  title: string;
  onFirstImageLoad?: () => void;
}

export function ShortImageSlider({ images, title, onFirstImageLoad }: ShortImageSliderProps) {
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
      <div ref={emblaRef} className="overflow-hidden size-full rounded-xl">
        <div className="flex size-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-full size-full"
            >
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                className="size-full object-cover"
                onLoad={i === 0 ? onFirstImageLoad : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="size-8  hidden lg:flex items-center justify-center rounded-full cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 fall bg-black/20 backdrop-blur-lg"
          >
            <Icon name="ChevronLeft" className="text-n-50" strokeWidth={2} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="size-8 items-center justify-center hidden lg:flex cursor-pointer rounded-full absolute top-1/2 right-2 -translate-y-1/2 fall bg-black/20 backdrop-blur-lg"
          >
            <Icon name="ChevronRight" className="text-n-50" strokeWidth={2} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
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
