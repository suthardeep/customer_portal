import { categoryQueries } from "@/features/categories/categoryQueries";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import QueryStateHandler from "./compound/QueryStateHandler";
import CategoriesTabNavSkeleton from "./CategoriesTabNavSkeleton";

const CategoriesTabNav = () => {
  const categoryQuery = useQuery(categoryQueries.tree());
  const categoryResponse = categoryQuery.data;
  const categories = categoryResponse?.data ?? [];

  return (
    <QueryStateHandler
      query={categoryQuery}
      loadingSkeleton={<CategoriesTabNavSkeleton />}
      emptyTitle="No categories available"
    >
      <div className="flex items-center overflow-x-auto px-3 py-2 gap-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            className="text-sm hover:text-primary transition-colors whitespace-nowrap"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </QueryStateHandler>
  );
};

export default CategoriesTabNav;
