import { Icon } from "@/components/base/icon";
import { Input } from "@/components/base/input/Input";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

interface SearchInputProps {
  onClose?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClose, value: controlledValue, onChange: controlledOnChange }) => {
  const navigate = useNavigate();
  const [internalQuery, setInternalQuery] = useState("");

  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalQuery;
  const setQuery = isControlled ? controlledOnChange! : setInternalQuery;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/products", search: { search: query, filters: "" } });
    onClose?.();
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
