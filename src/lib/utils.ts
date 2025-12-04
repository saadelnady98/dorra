import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const parseCheckInOutDates = (checkIn: string, checkOut: string) => {
  const parseDate = (dateString: string) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-").map(Number);

    if (!year || !month || !day) return null; // Ensure all parts exist
    if (month < 1 || month > 12 || day < 1 || day > 31) return null; // Basic validation

    const date = new Date(year, month - 1, day); // Month is zero-based in JS Date

    return isNaN(date.getTime()) ? null : date;
  };

  const from = parseDate(checkIn);
  const to = parseDate(checkOut);

  if (!from || !to) return { error: "Invalid date format" };
  if (to <= from) return { error: "Check-out must be after check-in" };

  return { from, to };
};

// Function to format date as "15 March" or "15 مارس" based on locale
export const formatDateToMonthDay = (
  dateString: string | undefined,
  locale: string
) => {
  if (!dateString) return "";

  try {
    let day: number;
    let month: number;

    // Check if the date is in ISO format (e.g., "2026-06-09T21:00:00.000Z")
    if (dateString.includes("T")) {
      // Handle ISO format date
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid date
      }
      day = date.getDate();
      month = date.getMonth(); // getMonth() returns 0-11
    } else {
      // Handle the original DD-MM-YYYY format
      const parts = dateString.split("-");

      if (parts.length !== 3) {
        return dateString; // Return original if not in expected format
      }

      // In DD-MM-YYYY format
      // parts[0] = day
      // parts[1] = month
      // parts[2] = year
      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1; // Months start at 0 in JavaScript

      // Validate values
      if (isNaN(day) || isNaN(month)) {
        return dateString;
      }
    }

    const englishMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const arabicMonthNames = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const monthName =
      locale === "ar" ? arabicMonthNames[month] : englishMonthNames[month];

    // Format as day and month only "15 March"
    return `${day} ${monthName}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original text in case of error
  }
};

export const formatDateRange = (
  checkin: string,
  checkout: string,
  locale: "ar" | "en"
) => {
  const parse = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const start = parse(checkin);
  const end = parse(checkout);

  if (!start || !end) return "";

  // Month names
  const monthsEn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const monthStart = start.getMonth();
  const monthEnd = end.getMonth();

  const monthNameStart =
    locale === "ar" ? monthsAr[monthStart] : monthsEn[monthStart];
  const monthNameEnd =
    locale === "ar" ? monthsAr[monthEnd] : monthsEn[monthEnd];

  const dayStart = start.getDate();
  const dayEnd = end.getDate();

  // If same month → show month once
  if (monthStart === monthEnd) {
    return locale === "ar"
      ? `${dayStart}–${dayEnd} ${monthNameStart}`
      : `${monthNameStart} ${dayStart}–${dayEnd}`;
  }

  // Different months
  return locale === "ar"
    ? `${dayStart} ${monthNameStart} – ${dayEnd} ${monthNameEnd}`
    : `${monthNameStart} ${dayStart} – ${monthNameEnd} ${dayEnd}`;
};
