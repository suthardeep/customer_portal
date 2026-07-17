import { Icon } from "@/components/base/icon";
import { productQueries } from "@/features/products/productQueries";
import useDebounce from "@/hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

interface SearchAutocompleteProps {
  onClose?: () => void;
  query: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  onClose,
  query,
}) => {
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 100);

  const { data, isPlaceholderData } = useQuery({
    ...productQueries.autocomplete({ q: debouncedQuery }),
    enabled: debouncedQuery.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const suggestions = data?.data?.suggestions ?? [];

  if (!suggestions.length) return null;

  const handleSelect = (q: string) => {
    navigate({ to: "/products", search: { search: q } });
    onClose?.();
  };

  return (
    <div
      className={`flex flex-col gap-1 transition-opacity ${
        isPlaceholderData ? "opacity-50" : ""
      }`}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => handleSelect(suggestion)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-n-100 text-left transition-colors"
        >
          <Icon name="Search" size="sm" className="text-n-500 shrink-0" />
          <span className="text-n-900">{suggestion}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchAutocomplete;
