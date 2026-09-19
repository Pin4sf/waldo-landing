import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("kennel route exists with canonical metadata", () => {
  assert.equal(existsSync("app/kennel/page.tsx"), true);

  const page = read("app/kennel/page.tsx");
  assert.match(page, /canonical: "\/kennel"/);
  assert.match(page, /<KennelPage \/>/);
});

test("kennel page carries the core sections", () => {
  const component = read("components/kennel/kennel-page.tsx");

  assert.match(component, /<BuildSiteNav \/>/);
  assert.match(component, /Kennel for Mac/);
  assert.match(component, /Stop managing agent sessions\./);
  assert.match(component, /The difference/);
  assert.match(component, /How it works/);
  assert.match(component, /Works with/);
  assert.match(component, /Open beta/);
  assert.match(component, /waldoco\/Waldo-Kennel/);
  assert.match(component, /FAQ/);
  assert.match(component, /<SceneCloseSection \/>/);

  for (const provider of ["Codex", "Claude Code", "OpenCode", "Cursor", "Pi"]) {
    assert.match(component, new RegExp(`"${provider}"`));
  }
});

test("kennel page is listed in the sitemap", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\$\{SITE_URL\}\/kennel/);
});

test("homepage kennel CTAs route to /kennel", () => {
  const home = read("components/home-build/home-build-page.tsx");
  assert.ok((home.match(/href="\/kennel"/g) ?? []).length >= 3);
});
