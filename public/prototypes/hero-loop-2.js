// Converge, fourth pass.
//
// The tools sit on a fan, joined to Waldo by thin lines. Context slides down those lines into him,
// one card per line at a time. Most of what he does goes quietly back to the tool it came from.
// What is left is one message, written the way he would actually write it, sitting in front of the
// fan with him on its top edge — so the picture is one thing, not three bands stacked up.

// Order matters: this is the order they sit in across the fan, left to right. The ones that carry
// the story sit near the middle; the quieter ones run off the edges.
const TOOLS = [
  { id: "spotify", cap: "Spotify", notes: [["Same playlist", "since two o'clock"]], acts: [["One more clue", "on how you are doing"]] },
  { id: "notion", cap: "Notion", notes: [["Meeting notes", "never written up"]], acts: [["Notes written up", "before the call"]] },
  { id: "figma", cap: "Figma", notes: [["Six comments", "before crit"]], acts: [["Crit notes sorted", "by what blocks"]] },
  { id: "github", cap: "GitHub", notes: [["Three reviews", "waiting on you"], ["One branch", "red since Friday"]], acts: [["Reviews batched", "into your focus hour"]] },
  { id: "linear", cap: "Linear", notes: [["Q1 doc", "overdue since Tuesday"], ["Six issues", "assigned to you"]], acts: [["Heavy task pushed", "to Thursday"]] },
  { id: "apple-health", cap: "Apple Health", notes: [["Slept 5h 42m", "cut short, twice"], ["Stress climbing", "since one o'clock"], ["Heart rate up", "and staying there"]], acts: [["Recovery block booked", "two till four, held"]] },
  { id: "google-calendar", cap: "Calendar", notes: [["9:00 standup", "back-to-back to noon"], ["Design review", "moved twice already"]], acts: [["Two meetings moved", "nine and ten, pushed"], ["Afternoon held", "nothing gets in"]] },
  { id: "gmail", cap: "Gmail", notes: [["14 threads", "three need you"], ["Investor reply", "due today"]], acts: [["Reply drafted", "waiting on your read"]] },
  { id: "slack", cap: "Slack", notes: [["92 unread", "none of it for you"], ["Three messages", "none urgent"]], acts: [["Priya and Sam told", "no reason given"], ["Quiet until eleven", "status set"]] },
  { id: "whatsapp", cap: "WhatsApp", notes: [["Mum", "called twice"]], acts: [["Reminder set", "for after work"]] },
  { id: "openai", cap: "Agents", notes: [["One finished", "waiting on a decision"], ["One needs context", "that only you hold"]], acts: [["Sent off with context", "no re-briefing"]] },
  { id: "stripe", cap: "Stripe", notes: [["Month closed up", "fourth in a row"]], acts: [["Numbers pulled", "for the update"]] },
];

const logo = (id) => "/assets/connectors/" + id + ".svg";
const chip = (id, label) => '<span class="chip"><img src="' + logo(id) + '" alt="" />' + label + "</span>";
const dot = (label) => '<span class="chip" data-dot>' + label + "</span>";

// The message. Written the way he talks: what he saw, what he did, then the short list of what is
// still yours. Chips are the tools he touched, named in the sentence rather than listed after it.
const BRIEFS = [
  {
    lines: [
      "Morning. Today is heavy and you are short on " + chip("apple-health", "Sleep") +
        ", so I kept the afternoon light. " + chip("google-calendar", "Design review") +
        " moved to Thursday, and I checked with " + chip("slack", "#design-team") + ".",
      "Your evening is clear. I put a " + chip("strava", "Z2 aerobic run") +
        " in at six, with the recovery routine after it.",
    ],
    ask: "Two things still need you.",
    items: [
      "The <u>vendor comparison</u> came back overnight. Nobody has read it, and the call it was for is Thursday.",
      "You owe Jones the <u>pricing doc</u> by Friday.",
    ],
  },
  {
    lines: [
      "Afternoon. Your " + chip("apple-health", "Stress") + " has been climbing since one, so I pulled the " +
        chip("google-calendar", "4:30") + " and held two till four. " + chip("slack", "#q1-prep") +
        " knows you are out.",
      "The " + chip("gmail", "investor reply") + " is written and sitting in your drafts. " +
        dot("Waiting on you") + " before it goes anywhere.",
    ],
    ask: "One thing still needs you.",
    items: [
      "Read that reply. It quotes the <u>runway number</u> you have not signed off yet.",
    ],
  },
];

const stage = document.getElementById("stage");
const sky = document.getElementById("sky");
const web = document.getElementById("web");
const core = document.getElementById("core");
const meter = document.getElementById("meter");
const brief = document.getElementById("brief");
const readEl = document.getElementById("count");
const quietEl = document.getElementById("quiet");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pick = (list) => list[Math.floor(Math.random() * list.length)];

let cx = 0;
let cy = 0;
let seats = [];

// A shallow fan above him, wider than the stage so the end tools run off the edges. The radius
// wobbles a little per seat and the far tools sit smaller and lighter, because they are further away.
function layout() {
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  const phone = w < 700;
  const last = TOOLS.length - 1;
  cx = w / 2;
  cy = h * (phone ? 0.3 : 0.34);
  const rx = w * (phone ? 0.68 : 0.56);
  const ry = h * (phone ? 0.24 : 0.26);
  const spread = phone ? 0.64 : 0.8;
  const edge = (Math.PI * (1 - spread)) / 2;
  const coreR = phone ? 52 : 74;
  let paint = "";

  seats = TOOLS.map((tool, i) => {
    const t = i / last;
    const angle = Math.PI + edge + t * (Math.PI - edge * 2);
    // A small wobble, so the row is not machine-even.
    const wobble = 1 + [0.04, -0.05, 0.03, -0.03, 0.05, -0.02, 0.02, -0.05, 0.04, -0.03, 0.05, -0.04][i];
    // Distance from the middle of the fan: the ends are further away, so smaller and lighter.
    const out = Math.abs(t - 0.5) * 2;
    const scale = 1 - out * 0.22;
    const x = cx + Math.cos(angle) * rx * wobble;
    const y = cy + Math.sin(angle) * ry * wobble;
    const ux = cx - x;
    const uy = cy - y;
    const d = Math.hypot(ux, uy);
    const tileR = (phone ? 22 : 29) * scale;
    paint +=
      '<line x1="' + (x + (ux / d) * tileR) + '" y1="' + (y + (uy / d) * tileR) +
      '" x2="' + (cx - (ux / d) * coreR) + '" y2="' + (cy - (uy / d) * coreR) +
      '" stroke-width="' + (0.8 + (1 - out) * 0.5).toFixed(2) + '" />';
    return { x, y, tool, scale, busy: false };
  });

  web.setAttribute("viewBox", "0 0 " + w + " " + h);
  web.innerHTML = paint;

  const lines = web.querySelectorAll("line");
  stage.querySelectorAll(".tile").forEach((el, i) => {
    const seat = seats[i];
    seat.line = lines[i];
    seat.el = el;
    el.style.left = seat.x + "px";
    el.style.top = seat.y + "px";
    el.style.transform = "translate(-50%, -50%) scale(" + seat.scale.toFixed(3) + ")";
    el.style.opacity = (0.62 + seat.scale * 0.38).toFixed(3);
  });

  core.style.left = cx + "px";
  core.style.top = cy + "px";
  // The message sits across the point the lines meet, so the last stretch of every line runs
  // behind it and he sits on its top edge. One picture, not three bands.
  const top = cy - 8;
  brief.style.top = top + "px";
  meter.style.top = top + brief.offsetHeight + 24 + "px";
}

TOOLS.forEach((tool) => {
  const el = document.createElement("div");
  el.className = "tile";
  el.innerHTML =
    '<div class="mark"><img src="' + logo(tool.id) + '" alt="" /></div>' +
    '<div class="cap">' + tool.cap + "</div>" +
    '<div class="said"></div>';
  sky.appendChild(el);
});

let read = 812;
let quiet = 0;
readEl.textContent = read.toLocaleString();
quietEl.textContent = quiet;

function land() {
  read += 1 + Math.floor(Math.random() * 3);
  readEl.textContent = read.toLocaleString();
  if (reduced) return;
  core.animate(
    [{ transform: "translate(-50%, -50%) scale(1)" }, { transform: "translate(-50%, -50%) scale(1.035)" }, { transform: "translate(-50%, -50%) scale(1)" }],
    { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
}

function card(tool, note) {
  return (
    '<div class="note"><img src="' + logo(tool.id) + '" alt="" />' +
    "<div><b>" + note[0] + "</b><span>" + note[1] + "</span></div></div>"
  );
}

// One card per line, and never on a line next to one that is already busy. This is what stops the
// cards landing on top of each other.
function freeSeat() {
  const open = seats.filter((seat, i) => !seat.busy && !(seats[i - 1] && seats[i - 1].busy) && !(seats[i + 1] && seats[i + 1].busy));
  return open.length ? pick(open) : null;
}

function incoming() {
  if (document.hidden) return;
  const seat = freeSeat();
  if (!seat) return;
  seat.busy = true;
  seat.line.setAttribute("data-live", "");

  const el = document.createElement("div");
  el.className = "fly";
  el.innerHTML = card(seat.tool, pick(seat.tool.notes));
  el.style.left = seat.x + "px";
  el.style.top = seat.y + "px";
  sky.appendChild(el);

  const dx = cx - seat.x;
  const dy = cy - seat.y;
  const run = el.animate(
    [
      { transform: "translate(-50%, -50%) translate(0, 0) scale(0.94)", opacity: 0 },
      { opacity: 1, offset: 0.2 },
      { opacity: 1, offset: 0.55 },
      { transform: "translate(-50%, -50%) translate(" + dx * 0.62 + "px, " + dy * 0.62 + "px) scale(0.72)", opacity: 0 },
    ],
    { duration: 3000 + Math.random() * 900, easing: "cubic-bezier(0.4, 0, 0.3, 1)" },
  );
  run.onfinish = () => {
    el.remove();
    seat.busy = false;
    seat.line.removeAttribute("data-live");
    land();
  };
}

// The quiet half: work goes back up the line, and the tool says what changed.
function outgoing() {
  if (document.hidden) return;
  const seat = pick(seats);
  const act = pick(seat.tool.acts);
  const el = document.createElement("div");
  el.className = "fly";
  el.innerHTML = '<div class="pill">' + act[0] + "</div>";
  el.style.left = cx + "px";
  el.style.top = cy + "px";
  sky.appendChild(el);

  const dx = seat.x - cx;
  const dy = seat.y - cy;
  const run = el.animate(
    [
      { transform: "translate(-50%, -50%) scale(0.85)", opacity: 0 },
      { opacity: 1, offset: 0.22 },
      { opacity: 1, offset: 0.74 },
      { transform: "translate(-50%, -50%) translate(" + dx * 0.74 + "px, " + dy * 0.74 + "px) scale(0.94)", opacity: 0 },
    ],
    { duration: 2000, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
  );
  run.onfinish = () => {
    el.remove();
    quiet += 1;
    quietEl.textContent = quiet;
    seat.el.querySelector(".said").textContent = act[1];
    seat.el.setAttribute("data-hit", "");
    setTimeout(() => seat.el.removeAttribute("data-hit"), 3400);
  };
}

// The message builds itself a line at a time, the way it would arrive.
let briefAt = 0;

function writeBrief() {
  const say = BRIEFS[briefAt++ % BRIEFS.length];
  brief.innerHTML =
    say.lines.map((line) => "<p>" + line + "</p>").join("") +
    '<p class="ask">' + say.ask + "</p>" +
    "<ul>" + say.items.map((item) => "<li>" + item + "</li>").join("") + "</ul>";

  const blocks = [...brief.querySelectorAll("p, li")];
  if (reduced) {
    layout();
    return;
  }
  blocks.forEach((block, i) => {
    block.classList.add("reveal");
    block.animate(
      [{ opacity: 0, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 620, delay: 240 + i * 220, easing: "cubic-bezier(0.32, 0.72, 0, 1)", fill: "forwards" },
    ).onfinish = () => block.classList.remove("reveal");
  });
  brief.querySelectorAll(".chip").forEach((pill, i) => {
    pill.animate(
      [{ opacity: 0, transform: "scale(0.92)" }, { opacity: 1, transform: "scale(1)" }],
      { duration: 460, delay: 620 + i * 150, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
    );
  });
  layout();
}

function cycleBrief() {
  if (document.hidden) {
    setTimeout(cycleBrief, 2000);
    return;
  }
  brief.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: "ease-out" }).onfinish = () => {
    writeBrief();
    brief.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: "ease-out" });
    setTimeout(cycleBrief, 13000);
  };
}

writeBrief();
layout();
addEventListener("resize", layout);
if (document.fonts) document.fonts.ready.then(layout);

if (reduced) {
  seats.slice(4, 8).forEach((seat) => {
    const el = document.createElement("div");
    el.className = "fly";
    el.innerHTML = card(seat.tool, seat.tool.notes[0]);
    el.style.left = seat.x + (cx - seat.x) * 0.35 + "px";
    el.style.top = seat.y + (cy - seat.y) * 0.35 + "px";
    sky.appendChild(el);
  });
  quiet = 11;
  quietEl.textContent = quiet;
} else {
  setInterval(incoming, 760);
  setTimeout(() => setInterval(outgoing, 3600), 1600);
  setTimeout(cycleBrief, 13000);
}
