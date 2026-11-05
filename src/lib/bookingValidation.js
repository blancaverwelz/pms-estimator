export const EMPTY_DRAFT = { name: "", mobile: "", date: "" };

const pad = (n) => String(n).padStart(2, "0");

export function toLocalISODate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function formatRequestedDate(value) {
  const date = parseISODate(value);
  return date
    ? date.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";
}

export function validateBooking(draft, today = toLocalISODate()) {
  const errors = {};

  const name = draft.name.trim();
  if (!name) errors.name = "Enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  const mobile = draft.mobile.trim();
  if (!mobile) {
    errors.mobile = "Enter your mobile number.";
  } else if (!/^\+?[\d\s().-]+$/.test(mobile) || !/^\+?\d{7,15}$/.test(mobile.replace(/[\s().-]/g, ""))) {
    errors.mobile = "Enter a valid mobile number, e.g. 0917 123 4567.";
  }

  if (!draft.date) errors.date = "Choose a preferred date.";
  else if (!parseISODate(draft.date)) errors.date = "Enter a valid date.";
  else if (draft.date < today) errors.date = "Preferred date can’t be in the past.";

  return errors;
}
