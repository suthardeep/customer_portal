import { LogoWhite } from "@/components/compound/logo/LogoWhite";
import { Image } from "@/components/base/Image";
import type { SiteConfigSocial } from "../types/types";

interface FooterBrandSectionProps {
  description: string;
  socials: SiteConfigSocial[];
}

export function FooterBrandSection({
  description,
  socials,
}: FooterBrandSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <LogoWhite size="md" />
      <p className="text-n-500 text-sm leading-relaxed max-w-xs">
        {description}
      </p>
      {socials.length > 0 && (
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.redirectUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="w-9 h-9 rounded-full border-n-1000 flex items-center justify-center overflow-hidden"
            >
              <Image
                src={social.logo}
                alt={social.name}
                className="h-full w-full object-contain"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
