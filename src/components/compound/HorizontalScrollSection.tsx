import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/cssHelpers";

interface HorizontalScrollSectionProps {
  title: string;
  seeAllLink?: string;
  children: React.ReactNode;
  className?: string;
  hideSeeAll?: boolean;
}

const HorizontalScrollSection = ({
  title,
  seeAllLink,
  children,
  className,
  hideSeeAll = false,
}: HorizontalScrollSectionProps) => {
  return (
    <section className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-medium text-n-900">{title}</h5>
        {!hideSeeAll && seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-n-800 hover:text-n-900 transition-colors hover:underline font-medium text-sm"
          >
            See All
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto no-scrollbar gap-4">{children}</div>
    </section>
  );
};

export default HorizontalScrollSection;
