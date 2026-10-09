import { STATUS_LABEL, TOOLS, type ToolStatus } from "./connector-tools";

// Connectors, "Don't see yours? Tell us." (docs/website/pages/connectors.md): every tool and its honest status, as
// three plain lines folded away under one link, so it's there for anyone checking without filling the page with logos.

const ORDER: ToolStatus[] = ["today", "next", "planned"];

export function ConnectorStatusList() {
  return (
    <details className="sl">
      <summary>
        <span>See every tool, and where it is</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <dl>
        {ORDER.map((status) => {
          const names = TOOLS.filter((tool) => tool.status === status).map((tool) => tool.name);
          return (
            <div key={status}>
              <dt className="cn-status" data-status={status}>
                {STATUS_LABEL[status]} ({names.length})
              </dt>
              <dd>{names.join(", ")}</dd>
            </div>
          );
        })}
      </dl>
    </details>
  );
}
