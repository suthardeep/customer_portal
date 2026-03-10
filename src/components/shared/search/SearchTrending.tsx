import { Image } from "@/components/base/Image";
import { productQueries } from "@/features/products/productQueries";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const TRENDING_PARAMS = {
  sortBy: "popularity" as const,
  pageSize: 6,
  currentPage: 1,
};

interface SearchTrendingProps {
  onSelect?: () => void;
}

const SearchTrending: React.FC<SearchTrendingProps> = ({ onSelect }) => {
  const { data } = useQuery(productQueries.list(TRENDING_PARAMS));
  const products = data?.data ?? [];

  if (!products.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-n-900">Trending</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            to="/product/$productId"
            params={{ productId: product.id }}
            onClick={onSelect ?? undefined}
            className="flex flex-col gap-1.5 group"
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-n-200">
              <Image src={product.mediaUrls?.[0] ?? ""} alt={product.name} />
            </div>
            <span className="text-n-800 line-clamp-2 group-hover:text-p-600 transition-colors truncate">
              {product.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchTrending;
