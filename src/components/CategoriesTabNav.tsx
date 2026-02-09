import { categoryQueries } from "@/features/categories/categoryQueries";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import QueryStateHandler from "./compound/QueryStateHandler";
import CategoriesTabNavSkeleton from "./CategoriesTabNavSkeleton";

const CategoriesTabNav = () => {
  const categoryQuery = useQuery(
    categoryQueries.tree({
      currentPage: 1,
      pageSize: 10,
    }),
  );
  const categoryResponse = categoryQuery.data;
  const categories = categoryResponse?.data ?? [];

  const { categoryId } = useParams({ strict: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeLinkRef.current && containerRef.current) {
      activeLinkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [categories?.length]);

  return (
    <QueryStateHandler
      query={categoryQuery}
      loadingSkeleton={<CategoriesTabNavSkeleton />}
      emptyTitle="No categories available"
    >
      <div
        ref={containerRef}
        className="flex items-center overflow-x-auto no-scrollbar gap-4 max-w-7xl mx-auto border-b border-n-500"
      >
        {categories.map((category) => {
          const isActive = category.id === categoryId;
          return (
            <Link
              key={category.id}
              ref={isActive ? activeLinkRef : undefined}
              to="/categories/$categoryId"
              params={{ categoryId: category.id }}
              activeProps={{
                className: "text-p-800 !border-b-p-800",
              }}
              className="text-sm border-b border-b-transparent transition-colors whitespace-nowrap flex-1 px-2 py-3 hover:text-p-700 text-n-800 font-medium min-w-56 text-center"
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </QueryStateHandler>
  );
};

export default CategoriesTabNav;
