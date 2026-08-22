const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function createReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `FDC-${Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("")}`;
}

export function normalisePhone(phone: string) {
  return phone.replace(/[^+\d]/g, "");
}
export function displayDate(date: Date) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
export function displayTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  const date = new Date(Date.UTC(2020, 0, 1, hour, minute));
  return new Intl.DateTimeFormat("en-PK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}
