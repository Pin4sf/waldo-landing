import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { LEGAL_DOCUMENTS, readLegalMarkdown, type LegalDocument } from "@/lib/legal";

import { Header, Section } from "./blocks";
import { SiteShell } from "./site-shell";

function LegalLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noopener noreferrer" {...props} /> : <a href={href} {...props} />;
}

function LegalTable(props: ComponentPropsWithoutRef<"table">) {
  return <table className="site-table" {...props} />;
}

// One legal document, rendered from its markdown in content/legal. Section headings are the document's own ## lines.
export function LegalPage({ name }: { name: LegalDocument }) {
  const { title, version, effective } = LEGAL_DOCUMENTS[name];
  return (
    <SiteShell>
      <Section size="open">
        <Header as="h1" lines={[title]} body={`Version ${version} · Effective ${effective}`} />
        <article className="site-legal">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: LegalLink, table: LegalTable }}>
            {readLegalMarkdown(name)}
          </ReactMarkdown>
        </article>
      </Section>
    </SiteShell>
  );
}
