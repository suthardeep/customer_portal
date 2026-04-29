/**
 * Get initials from a full name
 * @param name - Full name string
 * @param maxLength - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials
 * @example
 * getInitials("John Doe") // "JD"
 * getInitials("John Michael Doe", 3) // "JMD"
 * getInitials("User") // "U"
 */
/**
 * Strips the Indian country code (+91 or 91) from a phone number,
 * returning just the 10-digit local number suitable for form inputs.
 * @example
 * stripIndianCountryCode("+919876543210") // "9876543210"
 * stripIndianCountryCode("919876543210")  // "9876543210"
 * stripIndianCountryCode("9876543210")    // "9876543210"
 */
export function stripIndianCountryCode(phone: string): string {
  return phone.replace(/^(\+91|91)/, "");
}

export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, maxLength);
}
