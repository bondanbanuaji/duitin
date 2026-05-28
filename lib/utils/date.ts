import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(date: Date | string | number): string {
  return format(new Date(date), "dd MMM yyyy", { locale: id });
}

export function formatDateTime(date: Date | string | number): string {
  return format(new Date(date), "dd MMM yyyy HH:mm", { locale: id });
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  if (isToday(d)) {
    return "Hari ini";
  }
  if (isYesterday(d)) {
    return "Kemarin";
  }
  return formatDistanceToNow(d, { addSuffix: true, locale: id });
}
