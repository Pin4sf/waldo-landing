import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export const typeStyles = {
  display: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(1.65rem,1.05rem + 2.64vw,3.4rem)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.06,
  },
  h1: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(2rem,1.4rem + 2.4vw,3rem)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  h2: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(1.5rem,1.2rem + 1.4vw,2rem)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.18,
  },
  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1.25rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  body: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
  },
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  eyebrow: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  caption: {
    fontFamily: "var(--font-body)",
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  aside: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontStyle: "oblique 10deg",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  data: {
    fontFamily: "var(--font-body)",
    fontVariantNumeric: "tabular-nums",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  },
} satisfies Record<string, CSSProperties>;

export function WaldoCTA({ className = "" }: { className?: string }) {
  return (
    <Link href="/waitlist" className={`waldo-cta focusable-ring ${className}`}>
      Let Waldo in →
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  aside,
  dark = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center ${className}`}>
      {eyebrow ? (
        <p className={dark ? "type-eyebrow text-[var(--text-tertiary)]" : "type-eyebrow text-[var(--text-tertiary)]"}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={dark ? "type-h1 text-[var(--surface-t2)]" : "type-h1 text-[var(--ink)]"} data-animate="headline">
        {title}
      </h2>
      {children ? (
        <div className={dark ? "type-body max-w-[58ch] text-[var(--text-tertiary)]" : "type-body max-w-[58ch] text-[var(--text-secondary)]"} data-animate="fade-up">
          {children}
        </div>
      ) : null}
      {aside ? (
        <p className={dark ? "type-aside text-[var(--text-tertiary)]" : "type-aside text-[var(--text-tertiary)]"} data-animate="fade-up">
          {aside}
        </p>
      ) : null}
    </div>
  );
}

export function Aside({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`type-aside text-[var(--text-tertiary)] ${className}`}>{children}</p>;
}

export function Readout({
  label,
  value,
  read,
  dark = false,
}: {
  label: string;
  value: string;
  read: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "rounded-[12px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-4" : "surface-card-top p-4"}>
      <div className="flex items-baseline justify-between gap-3">
        <span className={dark ? "type-label text-[var(--surface-t2)]" : "type-label text-[var(--ink)]"}>{label}</span>
        <span className={dark ? "type-data text-[var(--surface-t2)]" : "type-data text-[var(--ink)]"}>{value}</span>
      </div>
      <p className={dark ? "type-aside mt-2 text-[var(--text-tertiary)]" : "type-aside mt-2 text-[var(--text-tertiary)]"}>
        {read}
      </p>
    </div>
  );
}
