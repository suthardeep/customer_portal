import SearchAutocomplete from "@/components/shared/search/SearchAutocomplete";
import SearchInput from "@/components/shared/search/SearchInput";
import SearchSuggestions from "@/components/shared/search/SearchSuggestions";
import SearchTrending from "@/components/shared/search/SearchTrending";
import { APP_NAME, APP_URL, buildMeta } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().catch(""),
});

export const Route = createFileRoute("/_public/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: buildMeta({
      title: `Search — ${APP_NAME}`,
      description: `Search for products on ${APP_NAME}.`,
      url: `${APP_URL}/search`,
      noIndex: true,
    }),
  }),
  component: SearchPageComponent,
});

function SearchPageComponent() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q);

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <div className="px-4 pb-4 flex flex-col lg:flex-row gap-6 mt-3">
        <SearchAutocomplete query={query} />
        <SearchSuggestions />
        <SearchTrending />
      </div>
    </div>
  );
}
