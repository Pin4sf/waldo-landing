export type ConnectorCategory =
  | "communication"
  | "calendar"
  | "design"
  | "engineering"
  | "knowledge"
  | "mail"
  | "music"
  | "agent"
  | "sales"
  | "project"
  | "social"
  | "video"
  | "health"
  | "fitness"
  | "wearable"
  | "commerce"
  | "finance";

export type ConnectorProfile =
  | "consultants"
  | "athletes"
  | "founders"
  | "engineers"
  | "investors"
  | "designers";

export type Connector = {
  id: string;
  name: string;
  src: string;
  categories: ConnectorCategory[];
  profiles: ConnectorProfile[];
};

export const connectors: Connector[] = [
  {
    id: "slack",
    name: "Slack",
    src: "/assets/connectors/slack.svg",
    categories: ["communication"],
    profiles: ["founders", "engineers", "consultants", "investors"],
  },
  {
    id: "figma",
    name: "Figma",
    src: "/assets/connectors/figma.svg",
    categories: ["design"],
    profiles: ["designers", "engineers"],
  },
  {
    id: "linear",
    name: "Linear",
    src: "/assets/connectors/linear.svg",
    categories: ["engineering"],
    profiles: ["founders", "engineers"],
  },
  {
    id: "github",
    name: "GitHub",
    src: "/assets/connectors/github.svg",
    categories: ["engineering"],
    profiles: ["engineers", "founders"],
  },
  {
    id: "gmail",
    name: "Gmail",
    src: "/assets/connectors/gmail.svg",
    categories: ["mail"],
    profiles: ["consultants", "founders", "investors", "athletes"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    src: "/assets/connectors/google-calendar.svg",
    categories: ["calendar"],
    profiles: ["consultants", "founders", "engineers", "investors", "athletes"],
  },
  {
    id: "notion",
    name: "Notion",
    src: "/assets/connectors/notion.svg",
    categories: ["knowledge"],
    profiles: ["founders", "designers", "consultants"],
  },
  {
    id: "google-drive",
    name: "Google Drive",
    src: "/assets/connectors/google-drive.svg",
    categories: ["knowledge"],
    profiles: ["consultants", "founders", "investors"],
  },
  {
    id: "spotify",
    name: "Spotify",
    src: "/assets/connectors/spotify.svg",
    categories: ["music"],
    profiles: ["athletes", "founders"],
  },
  {
    id: "openai",
    name: "OpenAI",
    src: "/assets/connectors/openai.svg",
    categories: ["agent"],
    profiles: ["founders", "engineers"],
  },
  {
    id: "granola",
    name: "Granola",
    src: "/assets/connectors/granola.svg",
    categories: ["agent"],
    profiles: ["founders", "consultants"],
  },
  {
    id: "microsoft-outlook",
    name: "Outlook",
    src: "/assets/connectors/microsoft-outlook.svg",
    categories: ["mail", "calendar"],
    profiles: ["consultants", "investors"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    src: "/assets/connectors/whatsapp.svg",
    categories: ["communication"],
    profiles: ["athletes", "consultants"],
  },
  {
    id: "telegram",
    name: "Telegram",
    src: "/assets/connectors/telegram.svg",
    categories: ["communication"],
    profiles: ["athletes", "founders"],
  },
  {
    id: "asana",
    name: "Asana",
    src: "/assets/connectors/asana.svg",
    categories: ["project"],
    profiles: ["founders", "consultants"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    src: "/assets/connectors/zendesk.svg",
    categories: ["communication", "sales"],
    profiles: ["consultants", "founders"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    src: "/assets/connectors/salesforce.svg",
    categories: ["sales"],
    profiles: ["founders", "investors", "consultants"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    src: "/assets/connectors/hubspot.svg",
    categories: ["sales"],
    profiles: ["founders", "investors", "consultants"],
  },
  {
    id: "jira",
    name: "Jira",
    src: "/assets/connectors/jira.svg",
    categories: ["engineering", "project"],
    profiles: ["engineers"],
  },
  {
    id: "vercel",
    name: "Vercel",
    src: "/assets/connectors/vercel.svg",
    categories: ["engineering"],
    profiles: ["engineers", "founders"],
  },
  {
    id: "supabase",
    name: "Supabase",
    src: "/assets/connectors/supabase.svg",
    categories: ["engineering"],
    profiles: ["engineers"],
  },
  {
    id: "youtube",
    name: "YouTube",
    src: "/assets/connectors/youtube.svg",
    categories: ["social", "video"],
    profiles: ["athletes"],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    src: "/assets/connectors/linkedin.svg",
    categories: ["social"],
    profiles: ["investors", "founders", "consultants"],
  },
  {
    id: "zoom",
    name: "Zoom",
    src: "/assets/connectors/zoom.svg",
    categories: ["communication", "video"],
    profiles: ["consultants", "investors"],
  },
  {
    id: "trello",
    name: "Trello",
    src: "/assets/connectors/trello.svg",
    categories: ["project"],
    profiles: ["consultants", "founders"],
  },
  {
    id: "clickup",
    name: "ClickUp",
    src: "/assets/connectors/clickup.svg",
    categories: ["project"],
    profiles: ["consultants", "founders"],
  },
  {
    id: "airtable",
    name: "Airtable",
    src: "/assets/connectors/airtable.svg",
    categories: ["knowledge", "project"],
    profiles: ["consultants", "founders", "investors"],
  },
  {
    id: "strava",
    name: "Strava",
    src: "/assets/connectors/strava.svg",
    categories: ["fitness"],
    profiles: ["athletes"],
  },
  {
    id: "apple-health",
    name: "Apple Health",
    src: "/assets/connectors/apple-health.svg",
    categories: ["health"],
    profiles: ["athletes", "founders", "consultants"],
  },
  {
    id: "google-health-connect",
    name: "Health Connect",
    src: "/assets/connectors/google-health-connect.svg",
    categories: ["health"],
    profiles: ["athletes", "founders", "consultants"],
  },
  {
    id: "google-fit",
    name: "Google Fit",
    src: "/assets/connectors/google-fit.svg",
    categories: ["health", "fitness"],
    profiles: ["athletes"],
  },
  {
    id: "fitbit",
    name: "Fitbit",
    src: "/assets/connectors/fitbit.svg",
    categories: ["wearable", "fitness"],
    profiles: ["athletes"],
  },
  {
    id: "whoop",
    name: "WHOOP",
    src: "/assets/connectors/whoop.svg",
    categories: ["wearable", "fitness"],
    profiles: ["athletes"],
  },
  {
    id: "oura",
    name: "Oura",
    src: "/assets/connectors/oura.svg",
    categories: ["wearable"],
    profiles: ["athletes"],
  },
  {
    id: "garmin",
    name: "Garmin",
    src: "/assets/connectors/garmin.svg",
    categories: ["wearable"],
    profiles: ["athletes"],
  },
  {
    id: "apple",
    name: "Apple",
    src: "/assets/connectors/apple.svg",
    categories: ["wearable"],
    profiles: ["athletes"],
  },
  {
    id: "atlassian",
    name: "Atlassian",
    src: "/assets/connectors/atlassian.svg",
    categories: ["engineering", "project"],
    profiles: ["engineers"],
  },
  {
    id: "stripe",
    name: "Stripe",
    src: "/assets/connectors/stripe.svg",
    categories: ["finance"],
    profiles: ["founders", "investors"],
  },
  {
    id: "shopify",
    name: "Shopify",
    src: "/assets/connectors/shopify.svg",
    categories: ["commerce"],
    profiles: ["founders", "consultants"],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    src: "/assets/connectors/dropbox.svg",
    categories: ["knowledge"],
    profiles: ["consultants", "investors"],
  },
  {
    id: "intercom",
    name: "Intercom",
    src: "/assets/connectors/intercom.svg",
    categories: ["communication", "sales"],
    profiles: ["founders", "consultants"],
  },
  {
    id: "calendly",
    name: "Calendly",
    src: "/assets/connectors/calendly.svg",
    categories: ["calendar"],
    profiles: ["consultants", "investors"],
  },
  {
    id: "discord",
    name: "Discord",
    src: "/assets/connectors/discord.svg",
    categories: ["communication"],
    profiles: ["athletes", "engineers"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    src: "/assets/connectors/quickbooks.svg",
    categories: ["finance"],
    profiles: ["consultants", "founders"],
  },
];

export const connectorsByProfile = (profile: ConnectorProfile) =>
  connectors.filter((connector) => connector.profiles.includes(profile));
