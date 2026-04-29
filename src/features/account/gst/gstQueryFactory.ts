export const gstKeys = {
  all: ["gst"] as const,
  list: () => [...gstKeys.all, "list"] as const,
  detail: (id: string) => [...gstKeys.all, "detail", id] as const,
};
