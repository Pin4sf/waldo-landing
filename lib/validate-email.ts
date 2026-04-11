// RFC 5321 limits: local part ≤ 64, total email ≤ 254, domain label ≤ 63
// Pair with server-side MX + disposable checks for full coverage
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const atIndex = email.lastIndexOf("@");
  if (atIndex < 1) return false;                     // nothing before @

  const local  = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (local.length > 64)   return false;             // RFC 5321 §4.5.3.1
  if (domain.length > 253) return false;             // RFC 5321 §4.5.3.1
  if (domain.split(".").some((l) => l.length > 63)) return false; // label limit

  // Strict allowlist for local part — only characters that real email providers
  // actually support. Rejects apostrophes, backticks, quotes, brackets etc.
  // that are technically RFC-valid but never used in practice.
  // Examples blocked: shivansh'fulper@atlan.com, user"name@domain.com
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}
