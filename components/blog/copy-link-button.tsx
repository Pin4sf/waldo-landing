"use client";

import { useState } from "react";

export function CopyLinkButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareArticle() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      return;
    }

    await copyLink();
  }

  return (
    <div className="blog-article-actions" aria-label="Article actions">
      <button type="button" onClick={copyLink} aria-live="polite">
        {copied ? "Copied" : "Copy link"}
      </button>
      <button type="button" onClick={shareArticle}>
        Share
      </button>
    </div>
  );
}
