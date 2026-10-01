import assert from "node:assert/strict";
import { test } from "node:test";

import {
  FILLER,
  HERO_PLACES,
  HERO_ROW,
  HERO_STATES,
  heldWork,
  leadFor,
  openWork,
  segments,
  slotOf,
} from "../components/site/hero-states.ts";

test("the day is 27 signals, and Calendar and Gmail each speak twice", () => {
  assert.equal(HERO_STATES.length, 27);
  const count = (tool) => HERO_STATES.filter((s) => s.tool === tool).length;
  assert.equal(count("google-calendar"), 2);
  assert.equal(count("gmail"), 2);
  assert.equal(new Set(HERO_STATES.map((s) => s.tool)).size, 25);
});

test("every signal has a notification, a reply and a card of two paragraphs and one or two asks", () => {
  for (const [i, state] of HERO_STATES.entries()) {
    const at = `signal ${i + 1} (${state.tool})`;
    assert.ok(state.incoming.length > 20, `${at}: incoming`);
    assert.ok(state.waldo.length > 10, `${at}: reply`);
    assert.equal(state.body.length, 2, `${at}: two paragraphs`);
    assert.ok(state.asks.length >= 1 && state.asks.length <= 2, `${at}: one or two asks`);
    for (const ask of state.asks) assert.ok(ask.covers.length > 0, `${at}: an ask covers some work`);
  }
});

test("the pills carry short previews; the full payload stays in the script", () => {
  for (const [i, state] of HERO_STATES.entries()) {
    const at = `signal ${i + 1} (${state.tool})`;
    assert.ok(state.pill.length >= 15 && state.pill.length <= 50, `${at}: pill "${state.pill}"`);
    assert.ok(state.say.length >= 10 && state.say.length <= 40, `${at}: say "${state.say}"`);
    assert.ok(state.pill.length < state.incoming.length, `${at}: pill is shorter than the payload`);
    assert.ok(!/[\[\]…!]/.test(state.pill + state.say), `${at}: no brackets, ellipsis or exclamation`);
  }
});

test("copy rules: no exclamation marks, every [bracket] closes, chips are never empty", () => {
  for (const state of HERO_STATES) {
    const all = [state.incoming, state.waldo, ...state.body, ...state.asks.map((a) => a.text)];
    for (const text of all) {
      assert.ok(!text.includes("!"), `exclamation mark in: ${text}`);
      assert.equal((text.match(/\[/g) ?? []).length, (text.match(/\]/g) ?? []).length, text);
      for (const part of segments(text)) assert.ok(part.text.trim().length > 0, text);
    }
    // Brackets belong to the card, not to the notification pills
    assert.ok(!/[\[\]]/.test(state.incoming + state.waldo));
  }
});

test("segments cuts text into plain runs and chips", () => {
  assert.deepEqual(segments("Move [Design review] to Thursday at 11?"), [
    { text: "Move ", chip: false },
    { text: "Design review", chip: true },
    { text: " to Thursday at 11?", chip: false },
  ]);
  assert.equal(leadFor(1), "One thing still needs you.");
  assert.equal(leadFor(2), "Two things still need you.");
});

test("the row: one place per signal, three apart, and a silent icon so the loop never waits", () => {
  const places = HERO_STATES.map((_, i) => slotOf(i));
  assert.equal(new Set(places).size, HERO_STATES.length, "every signal has its own place");
  assert.equal(HERO_ROW.length, HERO_PLACES);
  assert.equal(HERO_PLACES, HERO_STATES.length + 1);
  // Stepping three at a time must visit every place before coming back, so the count is not a multiple of three
  assert.notEqual(HERO_PLACES % 3, 0);
  // Each signal's icon is the tool at its place, and the one place left over holds the silent filler
  HERO_STATES.forEach((state, i) => assert.equal(HERO_ROW[slotOf(i)], state.tool));
  const spare = HERO_ROW.map((_, j) => j).filter((j) => !places.includes(j));
  assert.deepEqual(spare.map((j) => HERO_ROW[j]), [FILLER]);
  // After the last signal the filler passes, then the first signal comes round again
  assert.equal(slotOf(HERO_STATES.length), spare[0]);
  assert.equal(slotOf(HERO_PLACES), slotOf(0));
  // The filler repeats a tool that speaks, half a row away from where it speaks
  const own = slotOf(HERO_STATES.findIndex((st) => st.tool === FILLER));
  const apart = Math.abs(spare[0] - own);
  assert.ok(Math.min(apart, HERO_PLACES - apart) >= 10, "the filler is far from its tool's own place");
  // Calendar and Gmail each have two places
  for (const tool of ["google-calendar", "gmail"]) {
    assert.equal(HERO_ROW.filter((t) => t === tool).length, 2, tool);
  }
});

test("the ledger only grows: nothing is dropped when it leaves the two visible bullets", () => {
  let before = [];
  for (let n = 1; n <= HERO_STATES.length; n++) {
    const now = openWork(n).map((w) => w.id);
    for (const id of before) assert.ok(now.includes(id), `${id} vanished at signal ${n}`);
    before = now;
  }
  const ids = openWork(HERO_STATES.length).map((w) => w.id);
  for (const id of ["clash", "rohan", "quote", "update", "walkthrough", "tempo", "soundroom", "pr184"]) {
    assert.ok(ids.includes(id), `${id} is still tracked at the end`);
  }
});

test("continuity: the same work stays open while other items take the two visible slots", () => {
  const held = (n) => heldWork(n).map((w) => w.id);
  // Rohan's reply is shown at signal 3, and is held, not gone, from signal 4 on
  assert.ok(!held(3).includes("rohan"));
  assert.ok(held(4).includes("rohan"));
  assert.ok(held(27).includes("rohan"));
  // The 3pm clash leaves the bullets when the button arrives, and is still open at the end
  assert.ok(held(10).includes("clash"));
  assert.ok(held(27).includes("clash"));
  // The onboarding walkthrough, the easy-run choice and the Soundroom address stay open
  for (const id of ["walkthrough", "tempo", "soundroom"]) assert.ok(held(27).includes(id), id);
  // Cedar's retry and the kits are being watched, never a decision Waldo hands back
  assert.ok(openWork(27).some((w) => w.id === "cedar" && w.watching));
  assert.ok(!held(27).includes("cedar"));
});

test("the Northstar quote moves v2, v3, v4 without ever being approved", () => {
  const label = (n) => openWork(n).find((w) => w.id === "quote")?.label ?? "";
  assert.match(label(4), /\$48k/);
  assert.match(label(7), /v3/);
  assert.match(label(19), /v4/);
  for (const state of HERO_STATES) {
    for (const item of state.work) {
      assert.ok(!/\bapproved\b/i.test(item.label) || /not approved/i.test(item.label), item.label);
    }
  }
});

test("the script never claims a send, a move, a charge or a merge", () => {
  const claims = /\b(I(’ve| have) (sent|moved|rescheduled|booked|merged|charged|scheduled|approved))\b/i;
  for (const state of HERO_STATES) for (const text of state.body) assert.ok(!claims.test(text), text);
});
