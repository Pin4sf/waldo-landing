import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
const read = p => readFileSync(p, "utf8");
test("release uses patched Next and synchronized lockfile", () => {
 const pkg=JSON.parse(read("package.json")), lock=JSON.parse(read("package-lock.json"));
 assert.equal(pkg.dependencies.next,"16.3.8"); assert.equal(lock.packages["node_modules/next"].version,pkg.dependencies.next);
 assert.match(pkg.scripts.build,/--webpack/);
});
test("unfinished policies make no invented guarantees", () => {
 for(const name of ["support","why-waldo"]){const code=read(`app/${name}/page.tsx`);assert.doesNotMatch(code,/Placeholder|never the words|encrypted|don't train|download.*delete/i);assert.match(code,/review|not been published|being prepared/);}
 assert.doesNotMatch(read("components/site/waitlist-panel.tsx"),/agree to our/);
});
test("Trust labels the sample and exposes real local controls", () => {
 const code=read("components/site/trust-window.tsx");
 assert.match(code,/sample data · no real account connected/);assert.match(code,/Approve example/);assert.match(code,/Reject example/);assert.match(code,/setRequest\("done"\)/);assert.match(code,/setRequest\("rejected"\)/);assert.match(code,/Sample write access/);assert.doesNotMatch(code,/undo it in one tap|whole trail/);
 assert.match(read("components/site/trust-window.css"),/order: -1/);
});
test("public privacy article does not repeat unsupported product promises", () => {
 const article=read("content/blogs/06-what-we-actually-do-with-your-data.md");
 assert.match(article,/Final app terms are still pending/);
 assert.doesNotMatch(article,/^audio:|stay private|encrypted at rest|never sold|never shared|never used to train/m);
 assert.doesNotMatch(read("content/blogs/05-connectors-and-professions.md"),/keeps the undo one tap away/);
});
test("the Privacy Policy and Terms of Use are published from their reviewed text", () => {
 for(const name of ["privacy","terms"]){
  const page=read(`app/${name}/page.tsx`), text=read(`content/legal/${name}.md`);
  assert.match(page,new RegExp(`<LegalPage name="${name}" />`)); assert.doesNotMatch(page,/index: false/);
  assert.doesNotMatch(text,/CONFIRM|\\\[|&#91;|@Shivansh|Oct 19|set on publication/); assert.match(text,/ECOFRESH GREENSYNC LLP/); assert.match(text,/27 October 2026/);
 }
 const legal=read("lib/legal.ts"); assert.match(legal,/privacy: \{ title: "Privacy Policy", file: "privacy.md", version: 1/); assert.match(legal,/terms: \{ title: "Terms of Use", file: "terms.md", version: 1/);
 assert.match(read("content/legal/privacy.md"),/Grievance Officer:\*\* Shivansh Mahendra Fulper/);
});
test("every page names the company and the waitlist points at the published policy", () => {
 const footer=read("components/site/site-footer.tsx");
 assert.match(footer,/Waldo is a product of ECOFRESH GREENSYNC LLP/); assert.match(footer,/href: "\/privacy"/); assert.match(footer,/href: "\/terms"/);
 const waitlist=read("components/site/waitlist-panel.tsx");
 assert.doesNotMatch(waitlist,/still under review/); assert.match(waitlist,/href="\/privacy"/);
});
