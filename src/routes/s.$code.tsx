import { resolveShareCode } from "@/features/affiliate/affiliateService";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/s/$code")({
  loader: async ({ params }) => {
    const response = await resolveShareCode({ data: { code: params.code, platform: "web" } });
    const resolved = new URL(response.data.url);
    // Use pathname+search so it works across environments (dev → prod base URL difference)
    throw redirect({
      href: `${resolved.pathname}${resolved.search}`,
      replace: true,
    });
  },
  component: () => null,
});
