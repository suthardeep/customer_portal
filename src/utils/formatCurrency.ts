/**
 * Formats a number as currency using Intl.NumberFormat
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'INR')
 * @param locale - Locale for formatting (default: 'en-IN')
 * @returns Formatted currency string (e.g., "₹1,299")
 */
export function formatCurrency(
  amount: number,
  currency: string = "INR",
  locale: string = "en-IN",
): string {
  if (isNaN(amount)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
