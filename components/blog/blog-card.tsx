import Image from "next/image";
import Link from "next/link";

import { type BlogPost, formatBlogDate, readBlogMarkdown } from "@/lib/blog-posts";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const { readingTime } = readBlogMarkdown(post);

  return (
    <article className={featured ? "blog-card blog-card--featured" : "blog-card"}>
      <Link href={`/blogs/${post.slug}`} className="blog-card-image-link" aria-label={`Read ${post.title}`}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          width={1536}
          height={1024}
          className="blog-card-image"
          sizes={featured ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 44vw"}
          priority={featured}
        />
      </Link>

      <div className="blog-card-copy">
        <div className="blog-card-meta">
          <span>{post.category}</span>
          <span>{readingTime} min read</span>
        </div>
        <h2 className="blog-card-title">
          <Link href={`/blogs/${post.slug}`}>
            {post.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Link>
        </h2>
        <p className="blog-card-dek">{post.dek}</p>
        <p className="blog-card-aside">{post.aside}</p>
        <div className="blog-card-byline">
          <span>{post.author.name}</span>
          <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time>
        </div>
      </div>
    </article>
  );
}
