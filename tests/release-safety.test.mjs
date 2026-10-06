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
 for(const name of ["privacy","terms","support","why-waldo"]){const code=read(`app/${name}/page.tsx`);assert.doesNotMatch(code,/Placeholder|never the words|encrypted|don't train|download.*delete/i);assert.match(code,/review|not been published|being prepared/);}
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
