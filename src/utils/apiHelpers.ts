export const objectToSearchParams = (obj?: Record<string, any>): string => {
  if (!obj || typeof obj !== "object") return "";

  const isEmpty = (v: unknown) =>
    v === undefined ||
    v === null ||
    v === "" ||
    (typeof v === "number" && Number.isNaN(v));

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      // Serialize arrays as repeated keys: key=a&key=b
      for (const item of value) {
        if (!isEmpty(item)) searchParams.append(key, String(item));
      }
    } else if (!isEmpty(value)) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};