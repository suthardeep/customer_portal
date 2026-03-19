const formatter = new Intl.NumberFormat("en-IN");

/**
 * Formats a number with Indian locale (e.g., 16000 → "16,000")
 */
export function prettyNumber(value: number | string): string {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "-";
  return formatter.format(num);
}
