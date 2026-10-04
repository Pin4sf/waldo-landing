import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, Fragment, type ReactNode } from "react";

import { titleFit } from "@/lib/title-fit";

// The building blocks every page is assembled from. Layout, spacing and motion live in site.css,
// so pages only choose blocks and supply words. See docs/website/sitemap.md.

type LinkSpec = { label: string; href: string };

/** How a headline block arrives: on page load, on scroll, straight away, or not at all. */
export type Reveal = "load" | "view" | "now" | "none";

/** Delay for the nth piece of a headline block. Linear's hero: first line at 400ms, then 100ms apart. */
export function revealDelay(index: number) {
  return { "--rv-delay": `${400 + index * 100}ms` } as CSSProperties;
}

/** Puts a trailing "→" in its own span so it can lean forward on hover. */
export function ArrowLabel({ label }: { label: string }) {
  if (!label.endsWith("→")) return <>{label}</>;
  return (
    <>
      {label.slice(0, -1).trimEnd()}
      <span className="site-arrow" aria-hidden="true">
        →
      </span>
    </>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

export function SiteAnchor({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** A full band of the page. `frame` sections fill the screen, like the Figma frames. Space separates sections, never lines. */
export function Section({
  id,
  size = "frame",
  children,
}: {
  id?: string;
  /** "screen" is the home hero: one viewport tall, with what follows starting at the fold. "open" is every
      other page's opening: closer to the menu, like the home hero. */
  size?: "frame" | "auto" | "tight" | "screen" | "open";
  children: ReactNode;
}) {
  const classes = [
    "site-section",
    size === "frame" ? "site-section--frame" : "",
    size === "tight" ? "site-section--tight" : "",
    size === "screen" ? "site-section--screen" : "",
    size === "open" ? "site-section--open" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={classes}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/**
 * Every text block has the same three levels (see docs/website/type.md):
 *   label (small grey) · title (the Mottle headline) · body (regular text).
 * Emphasis inside body text is ink and medium weight (<strong>). There's no subtitle level:
 * `subtitle` and `body` are joined into one paragraph, subtitle first.
 * No other kinds of lines: no asides, no notes, no "·" lists.
 * Each piece rises in turn (Linear's hero timing): lines 100ms apart, buttons 250ms after the text.
 * The page's h1 plays on load; every other headline plays when it scrolls into view.
 */
export function Header({
  label,
  lines,
  as = "h2",
  subtitle,
  body,
  actions,
  reveal,
  center,
}: {
  label?: string;
  lines: string[];
  as?: "h1" | "h2";
  subtitle?: ReactNode;
  body?: ReactNode | ReactNode[];
  actions?: { primary?: LinkSpec; secondary?: LinkSpec };
  reveal?: Reveal;
  /** Title and text centred on the page, as in the home hero */
  center?: boolean;
}) {
  const Heading = as;
  const bodies = Array.isArray(body) ? body : body ? [body] : [];
  const mode = reveal ?? (as === "h1" ? "load" : "view");
  let step = 0;
  const next = () => revealDelay(step++);
  const labelDelay = label ? next() : undefined;
  const lineDelays = lines.map(() => next());
  const parts = [subtitle, ...bodies].filter((part) => part !== undefined && part !== null && part !== "");
  const textDelay = parts.length ? next() : undefined;
  const actionsDelay = actions ? revealDelay(step + 1.5) : undefined;

  return (
    <div className="site-header-block" data-reveal={mode === "none" ? undefined : mode} data-center={center ? "" : undefined}>
      {label ? (
        <p className="site-label site-rv" style={labelDelay}>
          {label}
        </p>
      ) : null}
      <Heading className="site-heading" style={titleFit(lines)}>
        {lines.map((line, index) => (
          <span key={line} className="site-rv" style={lineDelays[index]}>
            {line}
          </span>
        ))}
      </Heading>
      {parts.length ? (
        <p className="site-text site-rv" style={textDelay}>
          {parts.map((part, index) => (
            <Fragment key={index}>
              {index > 0 ? " " : null}
              {part}
            </Fragment>
          ))}
        </p>
      ) : null}
      {actions ? <Actions {...actions} style={actionsDelay} /> : null}
    </div>
  );
}

export function Actions({
  primary,
  secondary,
  style,
}: {
  primary?: LinkSpec;
  secondary?: LinkSpec;
  style?: CSSProperties;
}) {
  return (
    <div className={style ? "site-actions site-rv" : "site-actions"} style={style}>
      {primary ? (
        <SiteAnchor href={primary.href} className="site-button site-button--primary">
          <ArrowLabel label={primary.label} />
        </SiteAnchor>
      ) : null}
      {secondary ? (
        <SiteAnchor href={secondary.href} className="site-button site-button--secondary">
          <ArrowLabel label={secondary.label} />
        </SiteAnchor>
      ) : null}
    </div>
  );
}

/**
 * One rounded box with a centred title in it and one picture rising out of its foot, as in "Your context.
 * Your call." on the homepage (docs/website/site-wide-pass.md). `children` is the title (a centred Header);
 * `picture` is what rises: a StageImage, or a scene drawn in code. The picture sinks a little below the
 * box's edge, so it reads as coming up out of it.
 */
export function Stage({
  picture,
  narrow = false,
  children,
}: {
  picture: ReactNode;
  /** For a tall picture: it rises at about half the box's width */
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="site-stage" data-narrow={narrow ? "" : undefined}>
      {children}
      <div className="site-stage-picture" data-appear="rise">
        {picture}
      </div>
    </div>
  );
}

/** A picture file in a Stage: full width, its own shape, the top corners rounded */
export function StageImage({ label, src, eager = false }: { label: string; src: string; eager?: boolean }) {
  return (
    <div className="site-stage-window" data-visual={label} aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={0}
        height={0}
        sizes="(max-width: 640px) 100vw, 1100px"
        unoptimized={src.endsWith(".svg")}
        loading={eager ? "eager" : undefined}
      />
    </div>
  );
}

/** The last section of a page: a centred title, a line and the button, in a box like the Stage's */
export function Close({
  lines,
  body,
  actions,
}: {
  lines: string[];
  body?: ReactNode;
  actions: { primary?: LinkSpec; secondary?: LinkSpec };
}) {
  return (
    <Section size="auto">
      <div className="site-stage site-stage--close">
        <Header lines={lines} body={body} actions={actions} center />
      </div>
    </Section>
  );
}

/** Whatever follows the header (grid, table, list) sits at the same distance below it. */
export function Body({ children }: { children: ReactNode }) {
  return <div className="site-body">{children}</div>;
}

/** `boxed` puts each item in a white box (the homepage's card shape); a linked title makes the whole box the link */
export function Grid({ cols = 3, boxed = false, children }: { cols?: 2 | 3 | 4 | 5; boxed?: boolean; children: ReactNode }) {
  return (
    <div className="site-grid" data-appear="stagger" data-boxed={boxed ? "" : undefined} style={{ "--cols": cols } as CSSProperties}>
      {children}
    </div>
  );
}

/**
 * One column in a grid: title, a visual, then a bold line and body.
 * `visual` describes the picture. `image` is the file shown there; without one, the space stays
 * blank until the picture exists. `cover` fills the frame edge to edge (for full-bleed art).
 */
export function Item({
  meta,
  title,
  href,
  visual,
  image,
  cover,
  plain,
  scene,
  panel,
  eager,
  strong,
  children,
  link,
}: {
  meta?: ReactNode;
  title?: string;
  href?: string;
  visual?: string;
  image?: string;
  cover?: boolean;
  plain?: boolean;
  /** The picture is drawn in code (a moving scene) instead of being an image file */
  scene?: ReactNode;
  /** The scene has controls in it (a panel you can open), so it is read out and focusable, and the frame isn't pressed like a picture */
  panel?: boolean;
  eager?: boolean;
  strong?: ReactNode;
  children?: ReactNode;
  link?: LinkSpec;
}) {
  return (
    <div className="site-item">
      {meta ? <p className="site-label site-item-meta">{meta}</p> : null}
      {title ? (
        <h3 className="site-item-title">{href ? <SiteAnchor href={href}>{title}</SiteAnchor> : title}</h3>
      ) : null}
      {visual && scene ? (
        <div
          className={`site-visual site-visual--image site-visual--plain site-visual--scene${panel ? " site-visual--panel" : ""}`}
          data-visual={visual}
          aria-hidden={panel ? undefined : true}
          role={panel ? "group" : undefined}
          aria-label={panel ? visual : undefined}
        >
          {scene}
        </div>
      ) : visual ? (
        <Visual label={visual} src={image} cover={cover} plain={plain} eager={eager} />
      ) : null}
      {strong || children ? (
        <div className="site-item-text">
          {/* The first line (ink, medium) and the rest (grey, regular) are one paragraph */}
          {strong && (typeof children === "string" || !children) ? (
            <p>
              <strong>{strong}</strong>
              {children ? <> {children}</> : null}
            </p>
          ) : (
            <>
              {strong ? <p><strong>{strong}</strong></p> : null}
              {typeof children === "string" ? <p>{children}</p> : children}
            </>
          )}
        </div>
      ) : null}
      {link ? (
        <SiteAnchor href={link.href} className="site-link">
          <ArrowLabel label={link.label} />
        </SiteAnchor>
      ) : null}
    </div>
  );
}

/**
 * A picture in a soft frame. The label describes it for designers (hover / inspect). Without a
 * `src` it's blank space held for a picture that doesn't exist yet. The words around a picture
 * always carry the point, so pictures are decorative (empty alt text).
 */
export function Visual({
  label,
  src,
  wide = false,
  cover = false,
  plain = false,
  eager = false,
}: {
  label: string;
  src?: string;
  wide?: boolean;
  cover?: boolean;
  /** The picture is its own card: a plain white frame, no margin around it */
  plain?: boolean;
  /** Load straight away: for a picture near the top of the page */
  eager?: boolean;
}) {
  const size = wide ? "site-visual site-visual--wide" : "site-visual";
  if (!src) return <div className={size} data-visual={label} title={label} aria-hidden="true" />;
  // Wide pictures keep their own shape: full width, natural height
  if (wide) {
    return (
      <div className={`${size} site-visual--image site-visual--natural`} data-visual={label} aria-hidden="true">
        <Image
          src={src}
          alt=""
          width={0}
          height={0}
          sizes="(max-width: 640px) 100vw, 1200px"
          unoptimized={src.endsWith(".svg")}
          loading={eager ? "eager" : undefined}
        />
      </div>
    );
  }
  return (
    <div className={`${size} site-visual--image${cover ? " site-visual--cover" : ""}${plain ? " site-visual--plain" : ""}`} data-visual={label} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes={wide ? "(max-width: 640px) 100vw, 1200px" : "(max-width: 640px) 100vw, 480px"}
        unoptimized={src.endsWith(".svg")}
        loading={eager ? "eager" : undefined}
      />
    </div>
  );
}

export function Table({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  return (
    <table className="site-table" data-appear="self">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="site-list" data-appear="self">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export type Question = { q: string; a: ReactNode };

export function Questions({ groups }: { groups: { title?: string; items: Question[] }[] }) {
  return (
    <div className="site-faq">
      {groups.map((group, index) => (
        <div key={group.title ?? index} className="site-faq-group" data-appear="self">
          {group.title ? <h3 className="site-faq-group-title">{group.title}</h3> : null}
          {group.items.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <svg className="site-faq-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div>{typeof item.a === "string" ? <p>{item.a}</p> : item.a}</div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Status({ value }: { value: "today" | "next" | "planned" }) {
  const label = value === "today" ? "Working today" : value === "next" ? "Coming next" : "Planned";
  return <span className={`site-status site-status--${value}`}>{label}</span>;
}

/** A visible gap for content only Suyash can supply. Scaffold only. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="site-placeholder" data-appear="self">
      {children}
    </div>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return <p className="site-draft">{children}</p>;
}
