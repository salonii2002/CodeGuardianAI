
export function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}

export function formatCurrency(value, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

export function formatPercentage(value) {
  return `${(Number(value) || 0).toFixed(1)}%`;
}

export function capitalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function truncateText(value = "", maxLength = 80) {
  const text = String(value);

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}...`;
}
