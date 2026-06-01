/**
 * Strip HTML/control chars to mitigate stored/reflected XSS before persistence.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function sanitizeEmail(email: string): string {
  return sanitizeText(email).toLowerCase();
}
