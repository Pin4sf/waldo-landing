import assert from "node:assert/strict";
import { test } from "node:test";

import { HERO_STATES } from "../components/site/hero-states.ts";
import {
  CATCH_UP,
  CHAT,
  FACTS,
  HANDOFF,
  HEALTH,
  ITEM_DETAIL,
  OVERVIEW,
  RUN_DETAIL,
  SEE_CARDS,
  SEE_SECTION,
} from "../components/site/see/see-fixture.ts";

// "What you see of it" is five views of the hero's Wednesday (docs/website/what-you-see-plan.md).
// These tests keep its facts the hero's facts and keep every screen from claiming more than it can.

const heroText = HERO_STATES.flatMap((s) => [s.incoming, s.waldo, ...s.body, ...s.asks.map((a) => a.text)]).join("\n");

/** Every string the section shows, in one list */
function everyString() {
  const out = [];
  const walk = (v) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  [SEE_SECTION, SEE_CARDS, OVERVIEW, ITEM_DETAIL, RUN_DETAIL, CHAT, HEALTH, HANDOFF, CATCH_UP].forEach(walk);
  return out;
}
const all = everyString().join("\n");

test("the hero still says what the section builds on", () => {
  assert.match(heroText, /5h 12m/);
  assert.match(heroText, /1:18am/);
  assert.match(heroText, /6:30am/);
  assert.match(heroText, /\$48,?000|\$48k/);
  assert.match(heroText, /60 seats|60-seat/);
  assert.match(heroText, /Flat 204/);
  assert.match(heroText, /Flat 402/);
  assert.match(heroText, /18 Church Street/);
  assert.match(heroText, /SR-2081/);
  assert.match(heroText, /#1041/);
  assert.match(heroText, /#1043/);
  assert.match(heroText, /Monday/);
  assert.match(heroText, /Friday/);
  assert.match(heroText, /12\.4km/);
  assert.match(heroText, /32%/);
  assert.match(heroText, /5km easy/);
  assert.match(heroText, /Quote v4|v4/);
});

test("the section's facts are the same on every screen", () => {
  for (const text of [OVERVIEW.summary, CATCH_UP.recap]) assert.match(text, /Quote v4/);
  assert.match(OVERVIEW.summary, /\$48k for 60 seats/);
  assert.match(OVERVIEW.summary, /Monday SSO/);
  assert.match(OVERVIEW.summary, /Friday kits/);
  assert.match(CATCH_UP.recap, /Monday-SSO and Friday-kit/);
  assert.equal(FACTS.flat.right, "402");
  assert.match(HANDOFF.draft, /Flat 402, 18 Church Street, Bengaluru, not Flat 204/);
  // Card 2 is Suyash's own drawing with its own conversation (sleep 8h 2m, Recovery 61): it is not
  // part of the Wednesday fixture, so the hero's facts are not asserted on it
  assert.equal(CHAT.thread.length, 5);
  assert.equal(CHAT.replies, 7);
  assert.ok(HEALTH.evidence.some((e) => e.value === "5h 12m" && e.source === "Garmin"));
  assert.ok(HEALTH.evidence.some((e) => e.value === "32%" && e.source === "WHOOP"));
  assert.ok(HEALTH.evidence.some((e) => e.value === "12.4km hills" && e.source === "Strava"));
  assert.doesNotMatch(all, /\bv3\b.*\$48k.*approved/);
  // The old quote does not come back as the current one
  assert.doesNotMatch(all, /Quote v3/);
});

test("no screen shows a clock time for the snapshot, a quiet-hours interval or a delivery window", () => {
  assert.doesNotMatch(all, /4:15|4:45/);
  assert.doesNotMatch(all, /8-10am|8–10am|after 11am/i);
  assert.doesNotMatch(CATCH_UP.label, /\d/);
  assert.equal(CATCH_UP.label, "After quiet hours");
});

test("nothing is sent, approved, moved, charged or done", () => {
  assert.doesNotMatch(all, /\bSent\b/); // "Nothing sent." is fine; a "Sent" state is not
  assert.doesNotMatch(all, /(?<!not )\b(approved|rescheduled|charged|completed|done)\b/i); // "not approved" is the point
  assert.match(OVERVIEW.summary, /Nothing sent\./);
  assert.equal(HANDOFF.status, "Draft only");
  assert.match(HANDOFF.edited.at(-1).text, /Nothing sent\./);
  assert.match(CATCH_UP.status, /doesn’t approve or send it/);
});

test("the three decisions on card 1 are all still open on card 5", () => {
  const ids = OVERVIEW.needs.map((n) => n.id);
  assert.deepEqual(ids, ["northstar", "update", "soundroom"]);
  const choices = CATCH_UP.choices.map((c) => c.id);
  for (const id of ids) assert.ok(choices.includes(id), `card 5 has ${id}`);
  assert.ok(choices.includes("run"), "card 5 keeps the run");
  assert.equal(CATCH_UP.choices.length, 4);
  for (const id of ids) assert.ok(ITEM_DETAIL[id].lines.length >= 1);
});

test("the clash and Thursday's proposal stay unresolved", () => {
  const row = OVERVIEW.quiet.find((q) => q.who === "Design review");
  assert.match(row.what, /Thursday 11am proposal still unsent/);
  assert.doesNotMatch(all, /moved to Thursday|was moved|has moved|accepted/i);
});

test("Northstar approval is not on the handoff card; the three gauges are 0 to 100 and match the evidence", () => {
  const handoff = JSON.stringify(HANDOFF);
  assert.doesNotMatch(handoff, /Northstar|Quote v4|\$48k/);
  assert.deepEqual(HEALTH.gauges.map((g) => g.id), ["form", "recovery", "weight"]);
  HEALTH.gauges.forEach((g) => assert.ok(g.value >= 0 && g.value <= 100));
  // Recovery's gauge is the WHOOP reading shown in the reasons
  assert.equal(`${HEALTH.gauges.find((g) => g.id === "recovery").value}%`, HEALTH.evidence.find((e) => e.name === "Recovery").value);
});

test("five cards in order, each with one headline and one line", () => {
  assert.deepEqual(
    SEE_CARDS.map((c) => c.id),
    ["overview", "chat", "health", "handoff", "catch-up"],
  );
  for (const card of SEE_CARDS) {
    assert.ok(card.headline.length > 0 && card.line.length > 0);
    assert.equal(card.headline.split(/(?<=\.)\s/).length, 2, `${card.id}: two short sentences`);
  }
  assert.deepEqual(SEE_SECTION.lines, ["Less to sort.", "Still your call."]);
});

test("copy rules: no exclamation marks and none of the banned words", () => {
  assert.doesNotMatch(all, /!/);
  assert.doesNotMatch(all, /\b(wellness|mindfulness|holistic|optimi[sz]e|hustle|grind|dashboard|streak|AI-powered|smart)\b/i);
});
