import Image from "next/image";

// The picture for "Every new tool wants your life story." (see docs/website/pages/home.md): every
// connector Waldo has a mark for, in four rows of tiles that drift past. The first row moves left to
// right, the second right to left, the third left to right, the fourth right to left. The rows are
// the same length (so none is ever empty) and each is laid out twice end to end, so the loop has no
// seam. The marks are the files in public/assets/connectors, one per tool.
//
// The animation is CSS only (site.css, "Connector rows"), and with less motion the rows stand still.

// Every connector with a mark, dealt into four rows so that neighbours are never the same colour
// family for long. Add a mark to public/assets/connectors and to a row here, and it joins the drift.
const ROWS: string[][] = [
  ["apple-health", "asana", "atlassian", "calendly", "airtable", "claude", "dropbox", "discord", "intercom", "jira", "linkedin"],
  ["figma", "granola", "github", "gmail", "google-fit", "google-calendar", "hubspot", "linear", "microsoft-outlook", "oura", "quickbooks"],
  ["google-drive", "notion", "whoop", "garmin", "google-health-connect", "salesforce", "shopify", "slack", "supabase", "telegram", "zendesk"],
  ["openai", "spotify", "strava", "stripe", "trello", "vercel", "whatsapp", "youtube", "zoom", "clickup", "fitbit", "apple"],
];

export function ConnectorRows() {
  return (
    <div className="site-tiles" aria-hidden="true">
      {ROWS.map((row, r) => (
        <div key={r} className="site-tiles-row" data-dir={r % 2 === 0 ? "right" : "left"} style={{ "--row": r } as React.CSSProperties}>
          <div className="site-tiles-track">
            {[0, 1].map((copy) =>
              row.map((tool) => (
                <span key={`${copy}-${tool}`} className="site-tile">
                  <Image src={`/assets/connectors/${tool}.svg`} alt="" width={40} height={40} unoptimized />
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
