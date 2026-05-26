export interface SiteConfigSocial {
  id: string;
  logo: string;
  name: string;
  redirectUrl: string;
}

export interface SiteConfigApp {
  id: string;
  logo: string;
  name: string;
  redirectUrl: string;
}

export interface SiteConfig {
  id: string;
  description: string;
  socials: SiteConfigSocial[];
  apps: SiteConfigApp[];
  address: string;
  copyrightText: string;
  updatedAt: string;
}
