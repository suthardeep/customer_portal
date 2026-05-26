import { Image } from "@/components/base/Image";
import type { SiteConfigApp } from "../types/types";

interface FooterAddressSectionProps {
  address: string;
  apps: SiteConfigApp[];
}

export function FooterAddressSection({
  address,
  apps,
}: FooterAddressSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-white text-sm font-medium mb-1">Address :</p>
        <p className="text-n-700 text-sm leading-relaxed max-w-55">{address}</p>
      </div>
      {apps.length > 0 && (
        <div>
          <p className="text-white text-sm font-medium mb-3">Download App</p>
          <div className="flex items-center gap-3">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.redirectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={app.name}
                className="block h-9 w-28"
              >
                <Image
                  src={app.logo}
                  alt={app.name}
                  className="h-full w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
