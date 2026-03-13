export const homepageKeys = {
  all: ["homepage"] as const,
  config: () => [...homepageKeys.all, "config"] as const,
  section: (id: string) => [...homepageKeys.all, "section", id] as const,
  sectionContent: (actionApi: string) =>
    [...homepageKeys.all, "content", actionApi] as const,
};
