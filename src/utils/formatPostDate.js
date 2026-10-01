import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Astro parses the blog's calendar dates as midnight UTC. Keep those dates
 * intact; only convert timestamps with a time of day to the reader's zone.
 * @param {string | Date} value
 * @param {string} zone
 */
export function formatPostDate(value, zone) {
  const parsed = dayjs.utc(value);
  const isCalendarDate = parsed.format("HH:mm:ss.SSS") === "00:00:00.000";
  const datetime = isCalendarDate ? parsed : parsed.tz(zone);
  return {
    label: datetime.format("D MMM, YYYY"),
    datetime: isCalendarDate
      ? datetime.format("YYYY-MM-DD")
      : datetime.toISOString(),
  };
}
