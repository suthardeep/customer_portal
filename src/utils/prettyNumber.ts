const formatter = new Intl.NumberFormat("en-IN");

/**
 * Formats a number with Indian locale (e.g., 16000 → "16,000")
 */
export function prettyNumber(value: number | string): string {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "-";
  return formatter.format(num);
}

/**
 * Formats a decimal number, stripping unnecessary trailing zeros.
 * Whole numbers are shown as-is; decimals are shown up to 2 places.
 * e.g., 100.00 → "100", 99.50 → "99.5", 99.56 → "99.56"
 */
export function formatDecimal(value: number): string {
  const num = Number(value);
  if (isNaN(num)) return "-";
  return Number.isInteger(num) ? String(num) : parseFloat(num.toFixed(2)).toString();
}
