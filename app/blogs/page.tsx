import type { Metadata } from "next";

import { Header } from "@/components/site/blocks";
import { NotesWheel } from "@/components/site/notes-wheel";
import { getBlogWheelNotes } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site-metadata";

// Structure: docs/website/pages/blog.md. Since 2026-10-12 the page is one section: the title, then
// every note on the wheel from the homepage (components/site/notes-wheel.tsx). The "Latest" grid,
// the "All notes" carousel and the closing band were removed at Suyash's request.

const title = "Waldo notes: agents, your body and your day";
const description =
  "Plain-language notes about agents, your body, and the patterns hiding inside an ordinary day.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/blogs",
    types: { "application/rss+xml": `${SITE_URL}/blogs/rss.xml` },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blogs`,
    type: "website",
  },
};

export default function BlogsPage() {
  return (
    <main id="blog-main">
      <section className="site-section site-section--open">
        <div className="site-container">
          <Header
            as="h1"
            label="Waldo notes"
            lines={["Things worth", "noticing."]}
            subtitle="Plain-language notes about agents, your body, and the patterns hiding inside an ordinary day."
            body="A quiet place for the things Waldo noticed."
            center
          />
        </div>
      </section>

      <NotesWheel notes={getBlogWheelNotes()} />
    </main>
  );
}
