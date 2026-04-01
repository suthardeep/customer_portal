import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/cssHelpers";
import { IconButton } from "@/components/base/icon-button/IconButton";
import type { SliderDisplaySettings } from "../../types/types";

interface SliderLayoutProps {
  children: React.ReactNode;
  displaySettings: SliderDisplaySettings;
  slideBasis?: string;
  align?: "start" | "center" | "end";
}

export function SliderLayout({ children, displaySettings, slideBasis, align }: SliderLayoutProps) {
  const {
    autoPlay = false,
    interval = 3000,
    showDots = false,
    showArrows = false,
  } = displaySettings;

  const slides = Array.isArray(children) ? children : [children];

  const plugins = useMemo(
    () => (autoPlay ? [Autoplay({ delay: interval, stopOnInteraction: false })] : []),
    [autoPlay, interval],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: align ?? "center" }, plugins);
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
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {slides.map((child, i) => (
            <div key={i} className={cn("min-w-0 shrink-0 grow-0", slideBasis ?? "basis-full")}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <IconButton
            icon="ChevronLeft"
            aria-label="Previous slide"
            variant="filled"
            color="neutral"
            size="sm"
            className="absolute top-1/2 left-2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => emblaApi?.scrollPrev()}
          />
          <IconButton
            icon="ChevronRight"
            aria-label="Next slide"
            variant="filled"
            color="neutral"
            size="sm"
            className="absolute top-1/2 right-2 -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => emblaApi?.scrollNext()}
          />
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "size-2 rounded-full transition-colors",
                i === activeIndex ? "bg-p-500" : "bg-n-400",
              )}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
