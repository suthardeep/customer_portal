import dayjs from "dayjs";

type FormatOptions = {
  showDate?: boolean;
  showDay?: boolean;
  showTime?: boolean;
  showYear?: boolean;
  fallback?: string;
  disableRelativeDates?: boolean;
};

/**
 * Formats a date into a human-readable string
 * @param date - Date string, Date object, or null/undefined
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function prettyDate(
  date: string | Date | null | undefined,
  options: FormatOptions = {},
): string {
  const {
    showDate = true,
    showDay = false,
    showTime = false,
    showYear = false,
    fallback = "",
    disableRelativeDates = false,
  } = options;

  if (!date) {
    return fallback;
  }

  const d = dayjs(date);

  if (!d.isValid()) {
    return fallback;
  }

  // Build format string based on options
  const formatParts: string[] = [];

  if (showDay) {
    formatParts.push("ddd");
  }

  if (showDate) {
    formatParts.push("D MMM");
  }

  if (showYear) {
    formatParts.push("YYYY");
  }

  if (showTime) {
    formatParts.push("h:mm A");
  }

  // Handle relative dates (today, yesterday, tomorrow)
  if (!disableRelativeDates) {
    const today = dayjs();
    const diffDays = d.diff(today, "day");

    if (diffDays === 0 && d.isSame(today, "day")) {
      if (showTime) {
        return `Today, ${d.format("h:mm A")}`;
      }
      return "Today";
    }

    if (diffDays === -1 || d.isSame(today.subtract(1, "day"), "day")) {
      if (showTime) {
        return `Yesterday, ${d.format("h:mm A")}`;
      }
      return "Yesterday";
    }

    if (diffDays === 1 || d.isSame(today.add(1, "day"), "day")) {
      if (showTime) {
        return `Tomorrow, ${d.format("h:mm A")}`;
      }
      return "Tomorrow";
    }
  }

  return d.format(formatParts.join(", "));
}
