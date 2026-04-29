import SearchAutocomplete from "@/components/shared/search/SearchAutocomplete";
import SearchInput from "@/components/shared/search/SearchInput";
import SearchSuggestions from "@/components/shared/search/SearchSuggestions";
import SearchTrending from "@/components/shared/search/SearchTrending";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().catch(""),
});

export const Route = createFileRoute("/_public/search")({
  validateSearch: searchSchema,
  component: SearchPageComponent,
});

function SearchPageComponent() {
  return (
    <div>
      <SearchInput />
      <div className="px-4 flex flex-col lg:flex-row gap-6 mt-3">
        <SearchAutocomplete />
        <SearchSuggestions />
        <SearchTrending />
      </div>
    </div>
  );
}
