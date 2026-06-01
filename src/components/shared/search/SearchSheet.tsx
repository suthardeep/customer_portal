import { IconButton } from "@/components/base/icon-button/IconButton";
import Sheet from "@/components/base/sheet/Sheet";
import { useState } from "react";
import SearchAutocomplete from "./SearchAutocomplete";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";
import SearchTrending from "./SearchTrending";

interface SearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSheet: React.FC<SearchSheetProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <Sheet
      onClose={handleClose}
      isOpen={isOpen}
      direction="top"
      size="xl"
      customContent
    >
      <div className="w-full max-w-8xl mx-auto pb-10 overflow-y-auto h-full">
        <div className="flex items-center gap-6 pr-4 w-full">
          <SearchInput value={query} onChange={setQuery} onClose={handleClose} />
          <IconButton
            aria-label="close-search"
            icon="X"
            onClick={handleClose}
            variant="ghost"
            color="neutral"
          />
        </div>
        <div className="px-4 flex flex-col lg:flex-row gap-6 mt-6">
          <SearchAutocomplete query={query} onClose={handleClose} />
          <div className="flex flex-col lg:flex-row gap-6 flex-1">
            <div className="flex-1">
              <SearchSuggestions onClose={handleClose} />
            </div>
            <div className="flex-1">
              <SearchTrending onSelect={handleClose} />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
};

export default SearchSheet;
