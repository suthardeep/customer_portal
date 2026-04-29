import { Icon } from "@/components/base/icon";
import { productQueries } from "@/features/products/productQueries";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";

interface SearchAutocompleteProps {
  onClose?: () => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });
  const currentQ = (location.search as Record<string, string>)?.q ?? "";
  const debouncedQuery = useDebounce(currentQ, 400);

  const { data } = useQuery({
    ...productQueries.autocomplete({ q: debouncedQuery }),
    enabled: debouncedQuery.trim().length > 0,
  });

  const suggestions = data?.data?.suggestions ?? [];

  if (!suggestions.length) return null;

  const handleSelect = (q: string) => {
    navigate({ to: "/products", search: { search: q } });
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-1">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.productId}
          type="button"
          onClick={() => handleSelect(suggestion.keyword)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-n-100 text-left transition-colors"
        >
          <Icon name="Search" size="sm" className="text-n-500 shrink-0" />
          <span className="text-n-900">{suggestion.keyword}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchAutocomplete;
