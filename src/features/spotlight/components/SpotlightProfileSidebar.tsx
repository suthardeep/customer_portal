import { useQuery } from "@tanstack/react-query";
import { spotlightQueries } from "../spotlightQueries";
import { SpotlightProfileSidebarContent } from "./SpotlightProfileSidebarContent";

export function SpotlightProfileSidebar() {
  const { data } = useQuery(spotlightQueries.profile());

  return (
    <aside className="w-96 space-y-5 rounded-xl bg-white p-6 border border-n-400 hidden lg:block">
      {data ? (
        <SpotlightProfileSidebarContent profile={data.profile} />
      ) : (
        "No user"
      )}
    </aside>
  );
}
