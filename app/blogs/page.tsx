import type { Metadata } from "next";

import { Body, Close, Grid, Header, Item } from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { formatBlogDate, getBlogPosts, type BlogPost } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site-metadata";

// Structure: docs/website/pages/blog.md (v2): latest two big, then one uniform grid.
// Category chips + search come back once there are 10+ posts.
// Layout follows the homepage (docs/website/site-wide-pass.md): centred titles, an endless carousel, the shared close.

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

function PostItem({ post, eager = false }: { post: BlogPost; eager?: boolean }) {
  // Label: category and date, stacked (like Apple Newsroom). Title, then the dek as body.
  return (
    <Item
      meta={
        <>
          {post.category}
          <br />
          {formatBlogDate(post.datePublished)}
        </>
      }
      title={post.title}
      href={`/blogs/${post.slug}`}
      visual={post.imageAlt}
      image={post.image}
      cover
      eager={eager}
    >
      {post.dek}
    </Item>
  );
}

export default function BlogsPage() {
  const posts = getBlogPosts();
  const latest = posts.slice(0, 2);
  const rest = posts.slice(2);

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
          <Body>
            <p className="site-label site-label--center">Latest</p>
            <Grid cols={2}>
              {latest.map((post) => (
                <PostItem key={post.slug} post={post} eager />
              ))}
            </Grid>
          </Body>
        </div>
      </section>

      {rest.length > 0 ? (
        <section className="site-section">
          <div className="site-container">
            <Header lines={["All", "notes."]} subtitle={`Every note so far, newest first. ${posts.length} in all.`} center />
            <Body>
              <Carousel label="All notes" loop>
                {rest.map((post) => (
                  <PostItem key={post.slug} post={post} />
                ))}
              </Carousel>
            </Body>
          </div>
        </section>
      ) : null}

      <Close
        lines={["Waldo reads how you’re doing,", "then handles your day."]}
        body={
          <>
            See everything it does, one part at a time. New notes arrive every two weeks. Follow them by{" "}
            <a className="site-link" href="/blogs/rss.xml">RSS</a>.
          </>
        }
        actions={{ primary: { label: "See how Waldo works →", href: "/how-it-works" } }}
      />
    </main>
  );
}
