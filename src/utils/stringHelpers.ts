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
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, maxLength);
}
