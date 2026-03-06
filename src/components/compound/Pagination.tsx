import type { PaginationMeta } from "@/types/baseApi.types";
import { useRouter } from "@tanstack/react-router";
import { IconButton } from "../base/icon-button/IconButton";
import { cn } from "@/utils/cssHelpers";

export interface PaginationProps extends PaginationMeta {
  onPageChange?: (currentPage: number) => void;
  className?: string;
  scrollToTopOnPageChange?: boolean;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    currentPage,
    totalPages,
    totalRows,
    pageSize,
    className,
    hasNextPage,
    hasPrevPage,
    scrollToTopOnPageChange = false,
  } = props;

  const router = useRouter();

  if (totalPages < 2) return;

  const goToPage = (currentPage: number) => {
    if (scrollToTopOnPageChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    router.navigate({
      search: {
        ...router.state.location.search,
        currentPage,
        pageSize,
      } as any,
    });
  };

  const handleNextPage = () => {
    if (hasNextPage) goToPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (hasPrevPage) goToPage(currentPage - 1);
  };

  const pageList = getPageNumbers(currentPage, totalPages);
  const resultStart = (currentPage - 1) * pageSize + 1;
  const resultEnd = Math.min(currentPage * pageSize, totalRows);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 sm:flex-row",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <p className="text-n-700">
          Showing {resultStart}-{resultEnd} of {totalRows} results
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <IconButton
          icon={"ChevronLeft"}
          aria-label="chevron-left"
          onClick={handlePreviousPage}
          color="neutral"
          variant="ghost"
          className={cn(basClasses, buttonColorClasses)}
          disabled={!hasPrevPage || currentPage < 2}
        />
        <div className="flex gap-x-1">
          {pageList.map((page, index) =>
            page === "..." ? (
              <span key={index} className="fall text-n-600 size-7 select-none">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(Number(page))}
                className={cn(
                  basClasses,
                  currentPage === page
                    ? activeButtonColorClasses
                    : buttonColorClasses,
                )}
              >
                {page}
              </button>
            ),
          )}
        </div>
        <IconButton
          icon={"ChevronRight"}
          aria-label={"chevron-right"}
          onClick={handleNextPage}
          color="neutral"
          variant="ghost"
          className={cn(basClasses, buttonColorClasses)}
          disabled={!hasNextPage || currentPage >= totalPages}
        />
      </div>
    </div>
  );
};

const basClasses = `fall h-7 min-w-7 cursor-pointer rounded-lg px-1 text-sm font-semibold transition-all`;
const buttonColorClasses = `text-n-700 hover:text-n-900 hover:bg-n-200`;
const activeButtonColorClasses = "text-p-600 bg-p-100";

export default Pagination;

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
    return pages;
  }

  if (currentPage >= totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
    return pages;
  }

  pages.push(
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  );
  return pages;
}
