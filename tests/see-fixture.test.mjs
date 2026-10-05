import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BRIEFS,
  CHAT,
  FACTS,
  OUTBOX,
  OUTBOX_BRIEF,
  OVERNIGHT,
  PATTERNS,
  PLAN,
  SEE_CARDS,
  SEE_SECTION,
} from "../components/site/see/see-fixture.ts";

// "What you see of it" is six screens: five of one fictional Wednesday and the Thursday morning after it, and the map of spots
// (docs/website/what-you-see-plan.md, section 19). These tests keep the screens telling one story and
// keep to the brief: yes / no decisions, documents only in the details, crisp copy.

/** Every string the section shows, in one list */
function everyString() {
  const out = [];
  const walk = (v) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  [SEE_SECTION, SEE_CARDS, BRIEFS, OUTBOX, CHAT, PLAN, OVERNIGHT, PATTERNS].forEach(walk);
  return out;
}
const all = everyString().join("\n");

test("six cards in order, each with a short headline of one or two sentences and one line", () => {
  assert.deepEqual(SEE_CARDS.map((c) => c.id), ["overview", "chat", "health", "handoff", "catch-up", "patterns"]);
  for (const card of SEE_CARDS) {
    assert.ok(card.line.length > 0);
    assert.ok(card.headline.length <= 40, card.headline);
    assert.ok(card.headline.split(/(?<=\.)\s/).length <= 2, `${card.id}: one or two short sentences`);
  }
});

test("the brief moves through the day, in order, and every part has how it got there", () => {
  assert.equal(BRIEFS.length, 5);
  const toMinutes = (t) => {
    const [, h, m, ap] = t.match(/(\d+):(\d+)(am|pm)/);
    return ((Number(h) % 12) + (ap === "pm" ? 12 : 0)) * 60 + Number(m);
  };
  const times = BRIEFS.map((b) => toMinutes(b.time));
  assert.deepEqual([...times].sort((a, b) => a - b), times);
  for (const b of BRIEFS) {
    assert.ok(b.steps.length >= 3, `${b.time}: steps behind the brief`);
    assert.ok(b.decisions.length >= 1 && b.decisions.length <= 2);
    assert.equal(b.clock, b.time.replace(/am|pm/, ""), `${b.time}: the status bar shows the brief's time`);
  }
});

test("decisions are yes / no questions with no chips; documents live in their details", () => {
  for (const d of BRIEFS.flatMap((b) => b.decisions)) {
    assert.match(d.text, /\?$/);
    assert.doesNotMatch(d.text, /\[/);
    assert.ok(d.details.docs.length >= 1, `${d.text}: linked documents`);
  }
});

test("the copy stays crisp: short brief lines and short answers", () => {
  for (const line of BRIEFS.flatMap((b) => b.body)) assert.ok(line.replace(/\[([^|\]]+)[^\]]*\]/g, "$1").length <= 80, line);
  for (const turn of [...CHAT.turns, ...PLAN.turns]) {
    const text = turn.from === "you" ? turn.text : turn.lead;
    assert.ok(text.length <= 140, text);
  }
});

test("one story: the same facts on every screen", () => {
  assert.ok(PLAN.pins.some((p) => p.text === FACTS.recovery));
  assert.ok(PLAN.pins.some((p) => p.text === FACTS.hills));
  assert.match(PLAN.turns[1].lead, /32% recovery/);
  // card 4 shows the evening brief, whose decisions are the top of the list it sits on
  assert.equal(BRIEFS[OUTBOX_BRIEF].time, "8:30pm");
  assert.match(BRIEFS[OUTBOX_BRIEF].decisions.map((d) => d.text).join(" "), /quote/i);
  assert.match(BRIEFS[OUTBOX_BRIEF].decisions.map((d) => d.text).join(" "), /Flat 402/);
  assert.match(OUTBOX.items[0].versions.at(-1).draft, /Flat 402, 18 Church Street, Bengaluru, not Flat 204/);
  // the morning after: one notification, the correction that still waits; nothing about what is done or watched
  assert.equal(OVERNIGHT.note.state, "Needs you");
  assert.match(OVERNIGHT.note.text, /Flat 402/);
  assert.match(OVERNIGHT.note.text, /waits for your yes/);
  assert.doesNotMatch(JSON.stringify(OVERNIGHT), /Done|Watching|Prepared|\d+ (messages|emails)/);
  assert.match(OVERNIGHT.quiet.line, /Nothing else needs you/);
  // the run Waldo planned is the one the evening brief keeps
  assert.match(BRIEFS[4].body.join(" "), /Nothing sent/);
  assert.match(PLAN.turns[1].lead, /^5km easy at 7/);
});

test("the list to send is ranked, mixes work and life, and every item says how it goes out", () => {
  const order = { high: 0, soon: 1, later: 2 };
  const ranks = OUTBOX.items.map((i) => order[i.priority]);
  assert.deepEqual([...ranks].sort((a, b) => a - b), ranks);
  assert.ok(OUTBOX.items.some((i) => i.work) && OUTBOX.items.some((i) => !i.work));
  for (const item of OUTBOX.items) {
    assert.ok(item.versions.every((v) => v.draft.length > 0));
    assert.match(item.send, /^Send (with|on) /);
  }
});

test("conversations: the chat is named, trends are pinned, and not every answer has a graphic", () => {
  for (const chat of [CHAT, PLAN]) {
    assert.notEqual(chat.title, chat.untitled);
    assert.ok(chat.pins.length >= 3);
    const answers = chat.turns.filter((t) => t.from === "waldo");
    assert.ok(answers[0].work.length >= 3, "several checks before the first answer");
    assert.ok(answers[0].graphic);
    assert.ok(answers.some((a) => !a.graphic), "a plain follow-up");
  }
  // card 3 handles the nitty-gritty and leaves the meetings alone
  const handled = PLAN.turns[1].help.map((h) => h.text).join(" ");
  assert.match(handled, /calendar/);
  assert.match(handled, /Mrs\. Chen/);
  assert.match(handled, /Forerunner/);
  assert.match(PLAN.turns.at(-1).lead, /none of your meetings move/);
});

test("copy rules: no exclamation marks and none of the banned words", () => {
  assert.doesNotMatch(all, /!/);
  assert.doesNotMatch(all, /\b(wellness|mindfulness|holistic|optimi[sz]e|hustle|grind|dashboard|streak|AI-powered|smart|Waldo AI|Meet Waldo)\b/i);
});

test("spots and constellations: links join real nodes, the film only adds, and the counts compound", () => {
  const ids = new Set(PATTERNS.nodes.map((n) => n.id));
  assert.equal(ids.size, PATTERNS.nodes.length, "node ids are unique");
  assert.ok(ids.has(PATTERNS.home));
  for (const [a, b] of PATTERNS.links) {
    assert.ok(ids.has(a) && ids.has(b), `${a} - ${b}`);
    const kinds = [a, b].map((id) => PATTERNS.nodes.find((n) => n.id === id).kind);
    assert.deepEqual([...kinds].sort(), ["constellation", "spot"], "a spot is always joined to a constellation");
  }
  assert.equal(PATTERNS.links.length, 7);
  // each step keeps every spot of the one before, and never un-forms a pattern
  let before = PATTERNS.steps[0];
  for (const step of PATTERNS.steps.slice(1)) {
    for (const spot of before.spots) assert.ok(step.spots.includes(spot), `${spot} stays`);
    assert.ok(step.spots.every((id) => ids.has(id)));
    assert.ok(!before.centre || step.centre);
    assert.ok(!before.others || step.others);
    assert.ok(step.week >= before.week, "the weeks only go on");
    if (step.detail) assert.ok(ids.has(step.detail.id) && step.detail.count > 0 && step.detail.weeks <= step.week);
    before = step;
  }
  // the film ends with the whole map, and the pattern in the middle forms only once all seven spots have arrived
  assert.equal(PATTERNS.steps.at(-1).spots.length, 7);
  assert.equal(PATTERNS.steps.find((s) => s.centre).spots.length, 7);
  assert.equal(PATTERNS.steps.find((s) => s.detail?.id === PATTERNS.home).detail.count, 7, "the pattern in the middle is made of its seven spots");
});
