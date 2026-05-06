import { IconButton } from "@/components/base/icon-button/IconButton";
import Sheet from "@/components/base/sheet/Sheet";
import SearchAutocomplete from "./SearchAutocomplete";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";
import SearchTrending from "./SearchTrending";

interface SearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSheet: React.FC<SearchSheetProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet
      onClose={onClose}
      isOpen={isOpen}
      direction="top"
      size="xl"
      customContent
    >
      <div className="w-full max-w-8xl mx-auto pb-10 overflow-y-auto h-full">
        <div className="flex items-center gap-6 pr-4 w-full">
          <SearchInput onClose={onClose} />
          <IconButton
            aria-label="close-search"
            icon="X"
            onClick={onClose}
            variant="ghost"
            color="neutral"
          />
        </div>
        <div className="px-4 flex flex-col lg:flex-row gap-6 mt-6">
          <SearchAutocomplete onClose={onClose} />
          <div className="flex flex-col lg:flex-row gap-6 flex-1">
            <div className="flex-1">
              <SearchSuggestions onClose={onClose} />
            </div>
            <div className="flex-1">
              <SearchTrending onSelect={onClose} />
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
};

export default SearchSheet;
