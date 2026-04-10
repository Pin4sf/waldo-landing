// RFC 5321 limits: local part ≤ 64, total email ≤ 254, domain label ≤ 63
// Pair with server-side MX + disposable checks for full coverage
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const atIndex = email.lastIndexOf("@");
  if (atIndex < 1) return false;                    // nothing before @

  const local  = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (local.length > 64)  return false;             // RFC 5321 §4.5.3.1
  if (domain.length > 253) return false;            // RFC 5321 §4.5.3.1
  if (domain.split(".").some((l) => l.length > 63)) return false; // label limit

  // Practical regex: no whitespace, valid structure, TLD ≥ 2 chars
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}
