import { Link, useMatches } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { Icon } from "@/components/base/icon/Icon";
import { LogoWhite } from "@/components/compound/logo/LogoWhite";
import { Image } from "@/components/base/Image";
import type { IconName } from "@/components/base/icon/iconRegistry";

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

const SOCIAL_ICONS: { name: IconName; label: string }[] = [
  { name: "Facebook", label: "Facebook" },
  { name: "Instagram", label: "Instagram" },
  { name: "Youtube", label: "YouTube" },
  { name: "LinkedIn", label: "LinkedIn" },
];

const ADDRESS =
  "402, Shanti Sadan Apartments, Near Shivranjani Cross Roads, Satellite, Ahmedabad, Gujarat 380015.";

function FooterBrandSection() {
  return (
    <div className="flex flex-col gap-5">
      <LogoWhite size="md" />
      <p className="text-n-500 text-sm leading-relaxed max-w-xs">
        Shop with confidence at Aavak Marketplace. We're committed to quality
        products, secure checkout, and exceptional customer service. Thank you
        for choosing us for your shopping needs.
      </p>
      <div className="flex items-center gap-3">
        {SOCIAL_ICONS.map(({ name, label }) => (
          <a
            key={name}
            href="#"
            aria-label={label}
            className="w-9 h-9 rounded-full bg-white border border-n-1000 flex items-center justify-center hover:bg-n-200 transition-colors duration-150"
          >
            <Icon
              name={name}
              size="lg"
              className="text-n-1000"
              strokeWidth={2}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

interface FooterLinksColumnProps {
  links: NavLink[];
}

function FooterLinksColumn({ links }: FooterLinksColumnProps) {
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

function FooterAddressSection() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-white text-sm font-medium mb-1">Address :</p>
        <p className="text-n-700 text-sm leading-relaxed max-w-55">{ADDRESS}</p>
      </div>
      <div>
        <p className="text-white text-sm font-medium mb-3">Download App</p>
        <div className="flex items-center gap-3">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Download on the App Store"
            className="block h-9 w-28"
          >
            <Image
              src="/download-on-the-app-store.svg"
              alt="Download on the App Store"
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="Get it on Google Play"
            className="block h-9 w-28"
          >
            <Image
              src="/dowload-from-google-play.svg"
              alt="Get it on Google Play"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const hideFooter = useMatches({
    select: (matches) => matches.some((m) => m.staticData?.hideFooter),
  });

  if (hideFooter) return null;

  return (
    <footer className="bg-n-1000">
      <div className="mx-auto max-w-8xl px-4 lg:px-10 pt-14 pb-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="lg:w-[35%]">
            <FooterBrandSection />
          </div>
          <div className="lg:w-[14%]">
            <FooterLinksColumn links={NAV_LINKS} />
          </div>
          <div className="lg:w-[14%]">
            <FooterLinksColumn links={POLICY_LINKS} />
          </div>
          <div className="lg:flex-1">
            <FooterAddressSection />
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700/60 pt-6">
          <p className="text-n-700 text-xs text-center">
            © Aavak Marketplace Commerce Private Limited,2025
          </p>
        </div>
      </div>
    </footer>
  );
}
