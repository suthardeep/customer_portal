export const objectToSearchParams = (obj?: Record<string, any>): string => {
  if (!obj || typeof obj !== "object") return "";

  return new URLSearchParams(
    Object.entries(obj)
      .filter(
        ([_, v]) =>
          v !== undefined &&
          v !== null &&
          v !== "" &&
          !(typeof v === "number" && isNaN(v)),
      )
      .map(([k, v]) => [k, String(v)]),
  ).toString();
};