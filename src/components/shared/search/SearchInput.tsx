import { Icon } from "@/components/base/icon";
import { Input } from "@/components/base/input/Input";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

interface SearchInputProps {
  onClose: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/search", search: { q: query } });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="px-4 py-4 w-full">
        <Input
          placeholder="Search for products..."
          fullWidth
          leftElement={<Icon name="Search" size="sm" />}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchInput;
