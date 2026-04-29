import { Image } from "@/components/base/Image";
import { productQueries } from "@/features/products/productQueries";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

interface SearchSuggestionsProps {
  onClose?: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { data } = useQuery(productQueries.searchSuggestions());
  const suggestions = data?.data?.suggestions ?? [];

  if (!suggestions.length) return null;

  const handleSelect = (q: string) => {
    navigate({ to: "/products", search: { search: q } });
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-n-900">Popular Searches</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item.productId}
            type="button"
            onClick={() => handleSelect(item.keyword)}
            className="flex items-center gap-2 p-1 rounded-full border border-n-400 hover:border-n-500 cursor-pointer max-w-1/2"
          >
            <div className="size-7 rounded-full overflow-hidden shrink-0">
              <Image src={item.productImage} alt={item.keyword} />
            </div>
            <span className="text-n-800 truncate pr-2">{item.keyword}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
