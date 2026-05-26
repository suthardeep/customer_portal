import { Suspense } from "react";
import { useMatches } from "@tanstack/react-router";
import { FooterContent } from "@/features/site-config/components/FooterContent";
import { FooterSkeleton } from "@/features/site-config/components/skeletons/FooterSkeleton";

export default function Footer() {
  const hideFooter = useMatches({
    select: (matches) => matches.some((m) => m.staticData?.hideFooter),
  });

  if (hideFooter) return null;

  return (
    <footer className="bg-n-1000">
      <Suspense fallback={<FooterSkeleton />}>
        <FooterContent />
      </Suspense>
    </footer>
  );
}
