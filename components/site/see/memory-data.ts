// The graph behind the interactive map in "Longer he learns, smarter he gets." (components/site/memory-map.tsx).
// Constellations and spots are the phone card's (PATTERNS in see-fixture.ts: same names, same wording for the
// Tuesday Crash and its seven spots); the spots of the other five constellations, what he does about each
// pattern, and which things turn up together are written here. Every person, day and detail is invented, like
// everything in the fixture. Voice: what he noticed, plainly, never a diagnosis.
import { PATTERNS } from "./see-fixture";

export type MapSpot = {
  id: string;
  /** The constellation it belongs to */
  pattern: string;
  label: string;
  /** What a phone shows under the dot */
  short: string;
  /** Which icon it wears: a signal (sleep, hrv, stress, caffeine, form, weight, load) */
  signal: string;
  text: string;
  /** The week it was first seen */
  week: number;
};
export type MapPattern = {
  id: string;
  label: string;
  short: string;
  text: string;
  /** What he does about it */
  acts: string;
  /** The week it joined into a constellation */
  since: number;
};

const node = (id: string) => PATTERNS.nodes.find((n) => n.id === id)!;
/** The week each of the Tuesday Crash's spots first turns up, from the phone card's film */
const FIRST: Record<string, number> = { sleep: 1, hrv: 2, stress: 3, caffeine: 3, form: 4, weight: 4, load: 6 };

const crash = (id: string): MapSpot => ({
  id,
  pattern: "crash",
  label: node(id).label,
  short: node(id).short ?? node(id).label,
  signal: id,
  text: node(id).text,
  week: FIRST[id],
});

export const MAP_PATTERNS: MapPattern[] = [
  { id: "crash", label: node("crash").label, short: "Crash", text: node("crash").text, acts: "Keeps Tuesday mornings clear and moves the 4pm review to Wednesday.", since: 6 },
  { id: "cognitive", label: node("cognitive").label, short: "Stress", text: "Stress and focus move together when a day stacks up.", acts: "Puts a 15-minute gap after the second meeting in a row.", since: 8 },
  { id: "pattern", label: node("pattern").label, short: "Sleep", text: "Bedtime and sleep length, week to week.", acts: "Nudges your wind-down earlier on the night before a long day.", since: 9 },
  { id: "meals", label: node("meals").label, short: "Meals", text: "How skipped and late meals line up with your afternoons.", acts: "Holds a lunch slot on your calendar, and tells you when it is slipping.", since: 11 },
  { id: "flow", label: node("flow").label, short: "Flow", text: "When your best hours for focus actually fall.", acts: "Protects 9 to 11 for the work that needs you most.", since: 12 },
  { id: "training", label: node("training").label, short: "Training", text: "How hard sessions and recovery trade off.", acts: "Plans the hard session for the day after a light one.", since: 14 },
];

export const MAP_SPOTS: MapSpot[] = [
  // The Tuesday Crash: the phone card's seven
  ...["stress", "sleep", "caffeine", "form", "hrv", "weight", "load"].map(crash),

  // Cognitive Stress
  { id: "cog-run", pattern: "cognitive", label: "Back to back, no gap", short: "No gap", signal: "stress", text: "Four meetings in a row with no break. Stress climbed after the second.", week: 2 },
  { id: "cog-3pm", pattern: "cognitive", label: "Focus gone by 3pm", short: "3pm", signal: "form", text: "On days with six or more meetings, your focus was gone by mid-afternoon.", week: 3 },
  { id: "cog-inbox", pattern: "cognitive", label: "Late-night inbox", short: "Inbox", signal: "stress", text: "Email after 10pm, then a slower start the next morning.", week: 5 },
  { id: "cog-switch", pattern: "cognitive", label: "Eleven tool switches", short: "Switching", signal: "form", text: "Eleven jumps between tools before noon. Form dipped a little with each one.", week: 6 },
  { id: "cog-deadline", pattern: "cognitive", label: "Deadline day", short: "Deadline", signal: "load", text: "Strain stayed high all day when a deadline landed, even with a light calendar.", week: 7 },
  { id: "cog-quiet", pattern: "cognitive", label: "Quiet morning, clear head", short: "Quiet", signal: "form", text: "A meeting-free morning, and your best focus of the week.", week: 8 },

  // Sleep Pattern
  { id: "sp-bed", pattern: "pattern", label: "Bedtime drifting", short: "Bedtime", signal: "sleep", text: "Bedtime slid about 40 minutes later across three weeks.", week: 3 },
  { id: "sp-weekend", pattern: "pattern", label: "Weekend catch-up", short: "Weekend", signal: "sleep", text: "Two extra hours on Saturday, then a short Sunday night.", week: 4 },
  { id: "sp-screen", pattern: "pattern", label: "Late screen, light sleep", short: "Late screen", signal: "hrv", text: "HRV sat lower on the nights you were still up after midnight.", week: 5 },
  { id: "sp-wake", pattern: "pattern", label: "Steady wake time", short: "Wake time", signal: "sleep", text: "Wake time held within 20 minutes for ten days straight, and mornings felt it.", week: 7 },
  { id: "sp-travel", pattern: "pattern", label: "Short night after travel", short: "Travel", signal: "sleep", text: "A five-hour night after the flight home, and a flat day after it.", week: 9 },
  { id: "sp-early", pattern: "pattern", label: "Early bed, long run", short: "Early bed", signal: "sleep", text: "You go to bed earlier the night before a long run, without being asked.", week: 10 },

  // Meals
  { id: "ml-breakfast", pattern: "meals", label: "Skipped breakfast", short: "Breakfast", signal: "caffeine", text: "When breakfast was skipped, your afternoon Form fell sooner.", week: 4 },
  { id: "ml-lunch", pattern: "meals", label: "Late lunch", short: "Late lunch", signal: "caffeine", text: "Lunch after 2pm, then a slump around 4.", week: 6 },
  { id: "ml-coffee", pattern: "meals", label: "Coffee before food", short: "Coffee first", signal: "caffeine", text: "Two coffees before eating, and stress ran higher until lunch.", week: 7 },
  { id: "ml-dinner", pattern: "meals", label: "Late, heavy dinner", short: "Dinner", signal: "sleep", text: "A large dinner after 9pm, then lighter sleep.", week: 10 },
  { id: "ml-steady", pattern: "meals", label: "Proper lunch by 1pm", short: "Lunch by 1", signal: "caffeine", text: "A real lunch by 1pm, and an even afternoon.", week: 11 },

  // Work Flow
  { id: "fl-best", pattern: "flow", label: "Best hours, 9 to 11", short: "9 to 11", signal: "form", text: "Your focus is highest between 9 and 11, most days.", week: 5 },
  { id: "fl-monday", pattern: "flow", label: "Slow Monday start", short: "Monday", signal: "form", text: "The first hour of Monday runs about a third lower than the rest of the week.", week: 6 },
  { id: "fl-calls", pattern: "flow", label: "Calls before 2pm", short: "Calls", signal: "stress", text: "Calls before 2pm cost you more than the same calls later.", week: 8 },
  { id: "fl-friday", pattern: "flow", label: "Friday afternoon dip", short: "Friday", signal: "load", text: "Output falls off after 3pm on Fridays, every week.", week: 9 },
  { id: "fl-walk", pattern: "flow", label: "A walk, then a clear hour", short: "Walk", signal: "form", text: "A ten-minute walk before a hard task, and a clearer hour after it.", week: 11 },
  { id: "fl-ninety", pattern: "flow", label: "Deep work, 90 minutes", short: "90 minutes", signal: "form", text: "Blocks shorter than 90 minutes rarely held your focus.", week: 12 },

  // Training Style
  { id: "tr-hard", pattern: "training", label: "Hard run, flat morning", short: "Hard run", signal: "load", text: "After a hard run, the next morning’s HRV runs low until about noon.", week: 5 },
  { id: "tr-easy", pattern: "training", label: "Easy day, good recovery", short: "Easy day", signal: "hrv", text: "A light session the day before, and a high Recovery score the day after.", week: 6 },
  { id: "tr-hills", pattern: "training", label: "Hills on Thursdays", short: "Hills", signal: "load", text: "Your hardest sessions land on Thursdays, when the week is already heavy.", week: 8 },
  { id: "tr-two", pattern: "training", label: "Two hard days in a row", short: "Back to back", signal: "load", text: "A second hard day straight after the first, and Form drops for two days.", week: 9 },
  { id: "tr-evening", pattern: "training", label: "Evening heavy lifting", short: "Evening lift", signal: "weight", text: "Heavy sessions late in the evening, then a slower wind-down.", week: 11 },
  { id: "tr-rest", pattern: "training", label: "Rest day, deeper sleep", short: "Rest day", signal: "sleep", text: "Sleep runs deeper the night after a rest day.", week: 12 },
  { id: "tr-sunday", pattern: "training", label: "Long run on Sunday", short: "Long run", signal: "load", text: "The long run is always Sunday, and Monday’s Recovery pays for it.", week: 13 },
  { id: "tr-warm", pattern: "training", label: "Better after a warm-up", short: "Warm-up", signal: "form", text: "Sessions that start with a proper warm-up keep your heart rate steadier.", week: 14 },
];

/** Things that turn up together across constellations, both ways round: a spot on one side and a spot on the other */
const WITH: [string, string][] = [
  ["sleep", "sp-screen"], ["sleep", "sp-bed"], ["hrv", "sp-screen"], ["hrv", "tr-hard"],
  ["stress", "cog-run"], ["stress", "fl-calls"], ["caffeine", "ml-coffee"], ["caffeine", "ml-lunch"],
  ["form", "cog-3pm"], ["form", "fl-best"], ["weight", "cog-deadline"], ["load", "tr-hard"], ["load", "tr-two"],
  ["cog-inbox", "sp-screen"], ["cog-switch", "fl-walk"], ["ml-breakfast", "cog-3pm"], ["ml-dinner", "sp-bed"],
  ["tr-evening", "sp-bed"], ["tr-rest", "sp-wake"], ["tr-sunday", "tr-easy"], ["fl-friday", "ml-lunch"], ["sp-early", "tr-sunday"],
];
export const WITH_OF: Record<string, string[]> = {};
for (const [a, b] of WITH) {
  (WITH_OF[a] ??= []).push(b);
  (WITH_OF[b] ??= []).push(a);
}

/** Constellations that are close to each other. The Tuesday Crash is close to every one. */
const NEAR: [string, string][] = [
  ["crash", "cognitive"], ["crash", "pattern"], ["crash", "meals"], ["crash", "flow"], ["crash", "training"],
  ["cognitive", "flow"], ["pattern", "training"], ["meals", "pattern"],
];
export const NEAR_OF: Record<string, string[]> = {};
for (const [a, b] of NEAR) {
  (NEAR_OF[a] ??= []).push(b);
  (NEAR_OF[b] ??= []).push(a);
}

export const SPOT_BY_ID: Record<string, MapSpot> = Object.fromEntries(MAP_SPOTS.map((s) => [s.id, s]));
export const PATTERN_BY_ID: Record<string, MapPattern> = Object.fromEntries(MAP_PATTERNS.map((p) => [p.id, p]));
export const SPOTS_OF: Record<string, MapSpot[]> = {};
for (const s of MAP_SPOTS) (SPOTS_OF[s.pattern] ??= []).push(s);
