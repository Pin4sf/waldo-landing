"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export type FeatureDetailRow = {
  term: string;
  description: string;
};

export type FeatureDetail = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  paragraphs?: string[];
  rowsLabel?: string;
  rows?: FeatureDetailRow[];
};

export function FeaturePanel({
  detail,
  open,
  onOpenChange,
}: {
  detail: FeatureDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="kennel-panel-overlay fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content
          className="kennel-panel-content fixed inset-y-0 right-0 z-50 flex w-full max-w-[520px] flex-col overflow-y-auto bg-[#FAFAF8] focus:outline-none"
          aria-describedby={undefined}
        >
          {detail ? (
            <div className="flex flex-col gap-8 px-8 py-14 sm:px-10">
              <div className="flex items-start justify-between gap-6">
                <p className="type-caption text-[#6B6B68]">{detail.eyebrow}</p>
                <Dialog.Close
                  aria-label="Close"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#1A1A1A] transition-colors hover:bg-black/5"
                >
                  <span aria-hidden style={{ fontSize: "1.1rem", lineHeight: 1 }}>
                    ×
                  </span>
                </Dialog.Close>
              </div>

              <div className="flex flex-col gap-4">
                <Dialog.Title
                  className="type-h1 text-[#1A1A1A]"
                  style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
                >
                  {detail.title}
                </Dialog.Title>
                <p className="type-body text-[#6B6B68]" style={{ fontSize: "17.1px", lineHeight: "1.5" }}>
                  {detail.intro}
                </p>
              </div>

              {detail.paragraphs?.length ? (
                <div className="flex flex-col gap-4">
                  {detail.paragraphs.map((p, i) => (
                    <p key={i} className="type-body text-[#1A1A1A]/80" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}

              {detail.rows?.length ? (
                <div className="flex flex-col gap-4">
                  {detail.rowsLabel ? (
                    <p className="type-caption text-[#6B6B68]">{detail.rowsLabel}</p>
                  ) : null}
                  <dl className="flex flex-col divide-y divide-black/[0.08] border-t border-black/[0.08]">
                    {detail.rows.map((row) => (
                      <div key={row.term} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-4 py-4">
                        <dt className="type-body font-medium text-[#1A1A1A]" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                          {row.term}
                        </dt>
                        <dd className="type-body text-[#6B6B68]" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                          {row.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>

      <style>{`
        .kennel-panel-overlay {
          animation: kennel-panel-fade 0.25s ease-out;
        }
        .kennel-panel-content {
          box-shadow: -24px 0 64px rgba(0, 0, 0, 0.12);
          animation: kennel-panel-slide-in 0.32s cubic-bezier(.22,1,.36,1);
        }
        .kennel-panel-overlay[data-state="closed"] {
          animation: kennel-panel-fade 0.2s ease-in reverse;
        }
        .kennel-panel-content[data-state="closed"] {
          animation: kennel-panel-slide-in 0.22s cubic-bezier(.22,1,.36,1) reverse;
        }
        @keyframes kennel-panel-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes kennel-panel-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </Dialog.Root>
  );
}
