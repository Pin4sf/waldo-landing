import { readFileSync } from "node:fs";
import path from "node:path";

// The published Privacy Policy and Terms of Use. The version is what the Waldo app records when someone accepts them
// (APP_PRIVACY_NOTICE_VERSION_V1 and APP_TERMS_VERSION_V1 in waldo-backend): a new text gets a new version, so an
// acceptance always points at the copy that was published.
export const LEGAL_DOCUMENTS = {
  privacy: { title: "Privacy Policy", file: "privacy.md", version: 1, effective: "27 October 2026" },
  terms: { title: "Terms of Use", file: "terms.md", version: 1, effective: "27 October 2026" },
} as const;

export type LegalDocument = keyof typeof LEGAL_DOCUMENTS;

export function readLegalMarkdown(name: LegalDocument) {
  return readFileSync(path.join(process.cwd(), "content", "legal", LEGAL_DOCUMENTS[name].file), "utf8");
}
