import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("kennel route exists with canonical metadata", () => {
  assert.equal(existsSync("app/kennel/page.tsx"), true);

  const page = read("app/kennel/page.tsx");
  assert.match(page, /canonical: "\/kennel"/);
  assert.match(page, /SiteShell theme="dark"/);
});

test("kennel page carries the core sections", () => {
  const page = read("app/kennel/page.tsx");
  assert.match(page, /SiteShell theme="dark"/);
  for (const text of ["Kennel for Mac", "How Kennel works", "Questions", "Codex", "Claude Code", "Cursor", "waldoco/Waldo-Kennel"]) {
    assert.ok(page.includes(text), `missing ${text}`);
  }
  assert.match(page, /Kennel gets it done/);
});

test("kennel page is listed in the sitemap", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\$\{SITE_URL\}\/kennel/);
});

test("homepage kennel CTAs route to /kennel", () => {
  const home = read("components/home-build/home-build-page.tsx");
  assert.ok((home.match(/href="\/kennel"/g) ?? []).length >= 3);
});
