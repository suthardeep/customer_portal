import { Icon } from "@/components/base/icon";
import { Input } from "@/components/base/input/Input";
import { useNavigate, useRouterState } from "@tanstack/react-router";

interface SearchInputProps {
  onClose: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });
  const currentQ = (location.search as Record<string, string>)?.q ?? "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({
      search: ((prev: any) => ({
        ...prev,
        q: e.target.value || undefined,
      })) as any,
      replace: true,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!currentQ.trim()) return;
    navigate({ to: "/search", search: { q: currentQ } });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="px-4 py-4 w-full">
        <Input
          placeholder="Search for products..."
          fullWidth
          variant="underline"
          leftElement={<Icon name="Search" size="sm" />}
          autoFocus
          value={currentQ}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default SearchInput;
