import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CopyLinkButton } from "@/components/blog/copy-link-button";
import {
  BLOG_POSTS,
  findBlogPost,
  formatBlogDate,
  readBlogMarkdown,
  slugifyHeading,
} from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return getNodeText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function ArticleH2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const label = getNodeText(children);
  const id = slugifyHeading(label);

  return (
    <h2 id={id} {...props}>
      <span>{children}</span>
      <a className="blog-heading-anchor" href={`#${id}`} aria-label={`Link to ${label}`}>
        #
      </a>
    </h2>
  );
}

function ArticleH3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const label = getNodeText(children);
  const id = slugifyHeading(label);

  return (
    <h3 id={id} {...props}>
      <span>{children}</span>
      <a className="blog-heading-anchor" href={`#${id}`} aria-label={`Link to ${label}`}>
        #
      </a>
    </h3>
  );
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.dek,
      url: `${SITE_URL}/blogs/${post.slug}`,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1536, height: 1024, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
      images: [post.image],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const { content, headings, readingTime } = readBlogMarkdown(post);
  const postIndex = BLOG_POSTS.findIndex((candidate) => candidate.slug === post.slug);
  const relatedPosts = [1, 2].map(
    (offset) => BLOG_POSTS[(postIndex + offset) % BLOG_POSTS.length],
  );
  const authorName = post.author.name || "Waldo team";
  const articleUrl = `${SITE_URL}/blogs/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.dek,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: authorName },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const markdownComponents = {
    h2: ArticleH2,
    h3: ArticleH3,
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <main id="blog-main" className="blog-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="blog-article">
        <header className="blog-article-header">
          <Link href="/blogs" className="blog-back-link">
            Latest writing
          </Link>
          <p className="blog-kicker">{post.category}</p>
          <h1 className="blog-display">
            {post.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="blog-article-dek">{post.dek}</p>

          <div className="blog-byline-block">
            <Image src={post.author.image} alt="" width={48} height={48} />
            <div>
              <p>By {authorName}</p>
              <p>{post.author.role}</p>
            </div>
            <div className="blog-publish-meta">
              <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time>
              <span>{readingTime} min read</span>
              {post.dateModified !== post.datePublished ? (
                <span>Updated {formatBlogDate(post.dateModified)}</span>
              ) : null}
            </div>
          </div>
        </header>

        <figure className="blog-article-hero">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 767px) 100vw, 1120px"
          />
          <figcaption>{post.artCredit}</figcaption>
        </figure>

        <div className="blog-mobile-actions">
          <CopyLinkButton title={post.title} />
        </div>

        <details className="blog-mobile-contents">
          <summary>In this article</summary>
          <ol>
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.label}</a>
              </li>
            ))}
          </ol>
        </details>

        <div className="blog-reading-grid">
          <aside className="blog-contents" aria-label="Article contents">
            <p>In this article</p>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content}
            </ReactMarkdown>

            <section className="blog-sources" aria-labelledby="blog-sources-title">
              <h2 id="blog-sources-title">Sources and basis</h2>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.label}>
                    <a
                      href={source.href}
                      target={source.href.startsWith("http") ? "_blank" : undefined}
                      rel={source.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="blog-author-note" aria-label="About the author">
              <Image src={post.author.image} alt="" width={58} height={58} />
              <div>
                <h2>{authorName}</h2>
                <p>{post.author.bio}</p>
              </div>
            </section>
          </div>

          <aside className="blog-actions-rail">
            <CopyLinkButton title={post.title} />
          </aside>
        </div>

        <footer className="blog-related">
          <div className="blog-related-heading">
            <h2>Keep reading</h2>
            <Link href="/blogs">All notes</Link>
          </div>
          <div className="blog-related-grid">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.slug}>
                <Link href={`/blogs/${relatedPost.slug}`} className="blog-related-image">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.imageAlt}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 767px) 100vw, 44vw"
                  />
                </Link>
                <p>{relatedPost.category}</p>
                <h3>
                  <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </footer>
      </article>
    </main>
  );
}
