import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { siteConfigQueries } from "../siteConfigQueries";
import { FooterBrandSection } from "./FooterBrandSection";
import { FooterAddressSection } from "./FooterAddressSection";

type NavLink = { label: string; to: LinkProps["to"] };

const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Spotlight", to: "/spotlight/buy-clips" },
  { label: "Subscription", to: "/subscription" },
];

const POLICY_LINKS: NavLink[] = [
  { label: "Terms of Service", to: "/terms-and-conditions" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

function FooterLinksColumn({ links }: { links: NavLink[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map(({ label, to }) => (
        <li key={to}>
          <Link
            to={to}
            className="text-n-800 text-sm hover:text-white transition-colors duration-150"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterContent() {
  const { data } = useSuspenseQuery(siteConfigQueries.detail());

  return (
    <div className="mx-auto max-w-8xl px-4 lg:px-10 pt-14 pb-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="lg:w-[35%]">
          <FooterBrandSection
            description={data.description}
            socials={data.socials}
          />
        </div>
        <div className="lg:w-[14%]">
          <FooterLinksColumn links={NAV_LINKS} />
        </div>
        <div className="lg:w-[14%]">
          <FooterLinksColumn links={POLICY_LINKS} />
        </div>
        <div className="lg:flex-1">
          <FooterAddressSection address={data.address} apps={data.apps} />
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700/60 pt-6">
        <p className="text-n-700 text-xs text-center">{data.copyrightText}</p>
      </div>
    </div>
  );
}
