import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("current homepage is preserved at the features route", () => {
  assert.equal(existsSync("app/features/page.tsx"), true);

  const featuresPage = read("app/features/page.tsx");
  assert.match(featuresPage, /PageLayout/);
});

test("features route focuses on feature sections and comments out duplicated narrative beats", () => {
  const layout = read("components/page-layout.tsx");

  assert.match(layout, /<AlreadyDoneSection \/>/);
  assert.match(layout, /<ActionFanSection \/>/);
  assert.match(layout, /<SecuritySection \/>/);
  assert.match(layout, /<WhereIsWaldoSection \/>/);
  assert.match(layout, /<SceneCloseSection \/>/);

  assert.match(layout, /Duplicated on the redesigned homepage/);
  for (const section of [
    "HealthDataSection",
    "DeathOfChatbotSection",
    "MorningBriefSection",
    "AgentFeaturesSection",
    "UseCasesSection",
    "ValidationSection",
    "LongGameSection",
    "FaqSection",
  ]) {
    assert.doesNotMatch(layout, new RegExp(`^\\s*<${section} \\/>`, "m"));
  }
});

test("feature hero keeps proof motion without per-frame React or filter-heavy cues", () => {
  const scene = read("components/sections/hero-proof-scene.tsx");
  const globals = read("app/globals.css");

  assert.match(scene, /transitionCue/);
  assert.match(scene, /cueTimeoutRef/);
  assert.match(scene, /rotationTimeoutRef/);
  assert.match(scene, /window\.setTimeout/);
  assert.doesNotMatch(scene, /setProgress/);
  assert.doesNotMatch(scene, /progressRef/);
  assert.doesNotMatch(scene, /requestAnimationFrame/);
  assert.doesNotMatch(scene, /waldo-hero-gradient-grain/);

  const boostRule = globals.slice(
    globals.indexOf(".waldo-hero-gradient-boost::before"),
    globals.indexOf(".waldo-hero-gradient-mesh"),
  );
  const meshRule = globals.slice(
    globals.indexOf(".waldo-hero-gradient-mesh {"),
    globals.indexOf(".waldo-hero-gradient-mesh-a"),
  );
  const cueRules = globals.slice(
    globals.indexOf(".waldo-hero-transition-cue .waldo-hero-gradient-flow"),
    globals.indexOf(".waldo-proof-card .type-aside"),
  );

  assert.match(boostRule, /filter:\s*blur\(30px\)/);
  assert.doesNotMatch(boostRule, /transition:[^}]*filter/s);
  assert.doesNotMatch(boostRule, /will-change:[^;]*filter/);
  assert.match(meshRule, /filter:\s*blur\(38px\)\s+saturate\(1\.04\)/);
  assert.doesNotMatch(meshRule, /will-change:[^;]*filter/);
  assert.doesNotMatch(cueRules, /filter:/);
});

test("root route renders the redesigned homepage shell", () => {
  const homePage = read("app/page.tsx");

  assert.match(homePage, /NewHomePage/);
  assert.doesNotMatch(homePage, /PageLayout/);
});

test("new homepage keeps the Figma hero copy and deployed footer scene", () => {
  const homePage = read("components/home/new-home-page.tsx");

  assert.match(homePage, /They.re simply ahead of the curve/);
  assert.match(homePage, /They aren.t working less/);
  assert.match(homePage, /they.ve already rescheduled it and messaged the room/);
  assert.match(homePage, /SceneCloseSection/);
  assert.doesNotMatch(homePage, /new-home-footer-art/);
});

test("new homepage moves FAQ above the closing footer CTA", () => {
  const homePage = read("components/home/new-home-page.tsx");

  assert.match(homePage, /@\/components\/sections\/faq-section/);
  assert.match(homePage, /<WhereWaldoSection \/>[\s\S]*<FaqSection \/>[\s\S]*<SceneCloseSection \/>/);
});

test("FAQ accordion uses restrained disclosure motion with reduced-motion fallback", () => {
  const section = read("components/sections/faq-section.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /waldo-faq-trigger/);
  assert.match(section, /waldo-faq-icon/);
  assert.match(section, /waldo-faq-content/);
  assert.match(section, /waldo-faq-content-inner/);
  assert.doesNotMatch(section, /transition-all/);

  assert.match(globals, /\.waldo-faq-content\s*\{[^}]*height:\s*0/s);
  assert.match(globals, /\.waldo-faq-content\[data-state="open"\]\s*\{[^}]*animation:\s*waldo-faq-open 560ms/s);
  assert.match(globals, /\.waldo-faq-content\[data-state="closed"\]\s*\{[^}]*animation:\s*waldo-faq-close 360ms/s);
  assert.match(globals, /@keyframes\s+waldo-faq-open[\s\S]*height:\s*var\(--radix-accordion-content-height\)/);
  assert.match(globals, /\.waldo-faq-content-inner\s*\{[^}]*opacity:\s*0/s);
  assert.match(globals, /\.waldo-faq-content-inner\s*\{[^}]*filter:\s*blur\(4px\)/s);
  assert.match(globals, /\.waldo-faq-content-inner\s*\{[^}]*transform:\s*translate3d\(0,\s*-10px,\s*0\)/s);
  assert.match(globals, /\.waldo-faq-content\[data-state="open"\]\s+\.waldo-faq-content-inner\s*\{[^}]*animation:\s*waldo-faq-answer-in 560ms/s);
  assert.match(globals, /@keyframes\s+waldo-faq-answer-in[\s\S]*opacity:\s*0[\s\S]*opacity:\s*1/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*\.waldo-faq-content[\s\S]*animation:\s*none !important/s);
});

test("Mottle replaces Corben as the headline font", () => {
  const fonts = read("lib/fonts.ts");
  const layout = read("app/layout.tsx");
  const globals = read("app/globals.css");

  assert.match(fonts, /mottle/);
  assert.match(fonts, /Mottle\[wght\]\.woff2/);
  assert.match(layout, /mottle\.variable/);
  assert.match(globals, /\.type-h1\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.type-h2\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
});

test("local connector system is available for animated homepage sections", () => {
  assert.equal(existsSync("components/connectors/connector-data.ts"), true);
  assert.equal(existsSync("components/connectors/connector-chip.tsx"), true);

  const data = read("components/connectors/connector-data.ts");
  for (const id of ["slack", "figma", "linear", "github", "gmail", "google-calendar", "notion"]) {
    assert.match(data, new RegExp(`id:\\s*"${id}"`));
  }
});

test("new homepage nav uses the menu button and full nav option set", () => {
  assert.equal(existsSync("components/home/new-home-nav.tsx"), true);

  const nav = read("components/home/new-home-nav.tsx");
  assert.match(nav, /Menu/);
  assert.match(nav, /Features/);
  assert.match(nav, /Pricing/);
  assert.match(nav, /Blog/);
  assert.match(nav, /Sign In/);
  assert.match(nav, /Let Waldo in →/);
  assert.match(nav, /waldo-spot/);
  assert.doesNotMatch(nav, /waldo-wagging/);
});

test("new homepage includes the layered death of chatbox section", () => {
  assert.equal(existsSync("components/home/death-of-chatbox-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/death-of-chatbox-waldo.svg"), true);
  assert.equal(existsSync("public/assets/home/mascots/Vector.svg"), true);

  const section = read("components/home/death-of-chatbox-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");

  assert.match(section, /DeathOfChatboxSection/);
  assert.match(section, /Welcome back, User/);
  assert.match(section, /You will have to tell me about how can I help you/);
  assert.match(section, /RIP purple gradient friend/);
  assert.match(section, /They never type a prompt in a chat box/);
  assert.match(section, /that tech is now old and dead/);
  assert.match(section, /Developers have moved to CLI Agents/);
  assert.match(section, /What you.re missing out on/);
  assert.match(section, /Waldo is the first everyday AI agent/);
  assert.match(section, /\/assets\/home\/mascots\/Vector\.svg/);
  assert.match(homePage, /DeathOfChatboxSection/);
  assert.doesNotMatch(homePage, /new-chat-proof/);
});

test("new homepage uses the too much data Figma card asset after the chatbox copy", () => {
  assert.equal(existsSync("components/home/too-much-data-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/too-much-data.svg"), true);
  assert.equal(existsSync("public/assets/home/waldo-close-eye.svg"), true);
  assert.equal(existsSync("public/assets/home/mascots/rough-dark-mode.svg"), true);
  assert.equal(existsSync("public/assets/home/health-infographic/nutrition-details.svg"), true);
  assert.equal(existsSync("public/assets/home/health-infographic/nutrition-details.webp"), true);
  assert.equal(existsSync("public/assets/home/health-infographic/stress-heart-rate.svg"), true);
  assert.equal(existsSync("public/assets/home/health-infographic/stress-heart-rate.webp"), true);
  assert.equal(existsSync("public/assets/home/devices/apple-watchface.svg"), true);
  assert.equal(existsSync("public/assets/home/devices/analog-watch.svg"), true);

  const homePage = read("components/home/new-home-page.tsx");
  const section = read("components/home/too-much-data-section.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/too-much-data-section/);
  assert.match(homePage, /TooMuchDataSection/);
  assert.doesNotMatch(homePage, /function MissingOutSection/);
  assert.match(section, /new-data-marquee-track/);
  assert.match(section, /rough-dark-mode\.svg/);
  assert.match(section, /health-infographic/);
  assert.match(section, /\.webp/);
  assert.match(section, /nutrition-details/);
  assert.match(section, /stress-heart-rate/);
  assert.match(section, /You already have everything/);
  assert.match(section, /Waldo needs/);
  assert.match(section, /Months of health data, sitting idle/);
  assert.match(section, /requestAnimationFrame/);
  assert.match(section, /oof, thats a lot of data/);
  assert.match(section, /new-wearable-device-row/);
  assert.match(section, /Got a wearable\? Thats all Waldo needs/);
  assert.match(globals, /\.new-too-much-data-card/);
  assert.match(globals, /--new-story-rail/);
  assert.match(globals, /\.new-data-asset-card/);
  assert.match(globals, /\.new-wearable-device-row/);
  assert.match(globals, /new-data-marquee-up/);
  assert.match(globals, /new-data-marquee-down/);
  assert.doesNotMatch(globals, /new-too-much-data-card:hover \.new-data-marquee-track/);
});

test("new homepage keeps post-hero sections in editorial H2 hierarchy", () => {
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");

  assert.equal((homePage.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(homePage, /function WearablesSection/);
  assert.doesNotMatch(homePage, /<WearablesSection \/>/);
  assert.match(globals, /--new-editorial-copy-width/);
  assert.match(globals, /--new-editorial-h2-size/);
  assert.match(
    globals,
    /\.new-chatbox-missing-copy h2,\s*\.new-too-much-data-copy h2\s*\{[^}]*font-size:\s*var\(--new-editorial-h2-size\)/s,
  );
  assert.doesNotMatch(globals, /\.new-chatbox-missing-copy h2\s*\{[^}]*font-size:\s*clamp\(3\.6rem/s);
  assert.doesNotMatch(globals, /\.new-too-much-data-copy h2\s*\{[^}]*font-size:\s*clamp\(3\.6rem/s);
});

test("smart flow section mixes workspace connector logos with health cards", () => {
  const section = read("components/sections/morning-brief-section.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /Smart like Alfred, goofy like Pluto\./);
  assert.match(section, /It handles the serious part quietly, before you(?:'|&apos;)ve asked/);
  assert.match(section, /dog that(?:'|&apos;)s a little\s+pleased with itself/);
  assert.match(section, /workspaceConnectorCards/);

  for (const label of [
    "Gmail",
    "Drive",
    "Outlook",
    "Slack",
    "WhatsApp",
    "Telegram",
    "Figma",
    "Linear",
    "GitHub",
    "Asana",
    "Zendesk",
    "Salesforce",
  ]) {
    assert.match(section, new RegExp(`label:\\s*"${label}"`));
  }

  assert.match(section, /waldo-smart-logo-card/);
  assert.match(section, /waldo-smart-logo-icon/);
  for (const file of [
    "microsoft-outlook.svg",
    "whatsapp.svg",
    "telegram.svg",
    "asana.svg",
    "zendesk.svg",
    "salesforce.svg",
  ]) {
    assert.equal(existsSync(`public/assets/connectors/${file}`), true);
    assert.match(section, new RegExp(`/assets/connectors/${file}`));
  }
  assert.doesNotMatch(section, /initials:/);
  assert.doesNotMatch(section, /waldo-smart-logo-initials/);
  assert.match(globals, /\.waldo-smart-logo-card/);
  assert.doesNotMatch(globals, /\.waldo-smart-logo-initials/);
});

test("smart flow section avoids paint-heavy work while smooth scrolling", () => {
  assert.equal(existsSync("components/sections/smart-section-activity.tsx"), true);

  const section = read("components/sections/morning-brief-section.tsx");
  const activity = read("components/sections/smart-section-activity.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /SmartSectionActivity/);
  assert.doesNotMatch(section, /priority=\{index < 4\}/);
  assert.doesNotMatch(section, /waldo-smart-phone-image[^>]+priority/);
  assert.match(activity, /useElementInView/);
  assert.match(activity, /data-smart-active/);
  assert.match(activity, /640px 0px/);
  assert.match(globals, /\.waldo-smart-panel\s*\{[^}]*content-visibility:\s*auto/s);
  assert.match(globals, /\.waldo-smart-panel\s*\{[^}]*contain:\s*layout paint style/s);
  assert.match(
    globals,
    /\.waldo-smart-panel\[data-smart-active="false"\]\s+\.waldo-smart-source-card,\s*\.waldo-smart-panel\[data-smart-active="false"\]\s+\.waldo-smart-receipt/s,
  );
  assert.match(globals, /animation-play-state:\s*paused/);

  const sourceRule = globals.slice(globals.indexOf(".waldo-smart-source-card {"), globals.indexOf(".waldo-smart-asset-card"));
  const assetRule = globals.slice(globals.indexOf(".waldo-smart-asset-card {"), globals.indexOf(".waldo-smart-logo-card"));
  const receiptRule = globals.slice(globals.indexOf(".waldo-smart-receipt {"), globals.indexOf(".waldo-smart-receipt-tags"));
  assert.match(sourceRule, /will-change:\s*transform,\s*opacity/);
  assert.match(sourceRule, /box-shadow:\s*0 18px 38px rgba\(0,\s*0,\s*0,\s*0\.07\)/);
  assert.doesNotMatch(assetRule, /background:/);
  assert.doesNotMatch(assetRule, /border:/);
  assert.doesNotMatch(assetRule, /box-shadow:/);
  assert.doesNotMatch(assetRule, /overflow:\s*hidden/);
  assert.match(receiptRule, /will-change:\s*opacity,\s*transform/);
  assert.doesNotMatch(sourceRule, /will-change:[^;]*filter/);
  assert.doesNotMatch(receiptRule, /will-change:[^;]*filter/);

  const desktopSourceFlow = globals.slice(globals.indexOf("@keyframes waldo-smart-source-flow"), globals.indexOf("@keyframes waldo-smart-receipt-flow"));
  const desktopReceiptFlow = globals.slice(globals.indexOf("@keyframes waldo-smart-receipt-flow"), globals.indexOf("@keyframes waldo-smart-phone-stream"));
  const mobileSourceStart = globals.indexOf("@keyframes waldo-smart-source-flow", globals.indexOf("@media (max-width: 767px)"));
  const mobileSourceFlow = globals.slice(mobileSourceStart, globals.indexOf("@keyframes waldo-smart-receipt-flow", mobileSourceStart));
  const mobileReceiptStart = globals.indexOf("@keyframes waldo-smart-receipt-flow", globals.indexOf("@media (max-width: 767px)"));
  const mobileReceiptFlow = globals.slice(mobileReceiptStart, globals.indexOf("@keyframes waldo-smart-phone-receipt-flow", mobileReceiptStart));
  assert.doesNotMatch(desktopSourceFlow, /opacity:\s*0\.\d+/);
  assert.doesNotMatch(mobileSourceFlow, /opacity:\s*0\.\d+/);
  assert.doesNotMatch(desktopSourceFlow, /filter:/);
  assert.doesNotMatch(desktopReceiptFlow, /filter:/);
  assert.doesNotMatch(mobileSourceFlow, /filter:/);
  assert.doesNotMatch(mobileReceiptFlow, /filter:/);
});

test("features health cards render as vertical viewport sections without carousel controls", () => {
  const section = read("components/sections/already-done-section.tsx");

  for (const title of [
    "Mornings, sorted.",
    "The edge, taken off.",
    "Connecting the Dots",
    "Gut Feeling, verified",
    "old habits new endings",
  ]) {
    assert.match(section, new RegExp(`headline:\\s*"${title.replaceAll(".", "\\.")}"`));
  }

  assert.match(section, /waldo-health-vertical-stack/);
  assert.match(section, /waldo-health-vertical-card/);
  assert.match(section, /min-h-\[82svh\]/);
  assert.doesNotMatch(section, /trackRef/);
  assert.doesNotMatch(section, /waldo-carousel-controls/);
  assert.doesNotMatch(section, /PlayPauseIcon/);
  assert.doesNotMatch(section, /grid-flow-col/);
  assert.doesNotMatch(section, /overflow-x-auto/);

  const globals = read("app/globals.css");
  assert.match(globals, /--slide-width:\s*min\(96vw,\s*1360px\)/);
  assert.match(globals, /--slide-height:\s*min\(56vw,\s*790px\)/);
  assert.match(globals, /\.waldo-health-vertical-stack\s*\{[^}]*gap:\s*clamp\(0\.75rem,\s*2vw,\s*1\.75rem\)/s);
  assert.match(globals, /\.waldo-health-vertical-stack\s*\{[^}]*padding-bottom:\s*clamp\(6rem,\s*18svh,\s*12rem\)/s);
  assert.match(globals, /\.waldo-health-vertical-card\s*\{[^}]*padding-block:\s*clamp\(0\.5rem,\s*2svh,\s*1\.5rem\)/s);
});

test("features health cards use centered masked heading and active-card reveal without scroll hijacking", () => {
  const section = read("components/sections/already-done-section.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /activeHealthIndex/);
  assert.match(section, /IntersectionObserver/);
  assert.match(section, /cardRefs/);
  assert.match(section, /waldo-health-heading-block/);
  assert.match(section, /waldo-health-heading-mask/);
  assert.match(section, /data-active=\{activeHealthIndex === index\}/);
  assert.doesNotMatch(section, /waldo-health-active-chapter/);
  assert.doesNotMatch(section, /activeSlide\.headline/);
  assert.doesNotMatch(section, /padStart\(2/);
  assert.doesNotMatch(section, /preventDefault\(\)/);
  assert.doesNotMatch(section, /wheel/);

  assert.match(globals, /\.waldo-health-heading-block\s*\{[^}]*position:\s*relative/s);
  assert.match(globals, /\.waldo-health-heading-block\s*\{[^}]*margin-inline:\s*auto/s);
  assert.match(globals, /\.waldo-health-heading-block\s*\{[^}]*width:\s*var\(--slide-width\)/s);
  assert.doesNotMatch(globals, /\.waldo-health-heading-block\s*\{[^}]*position:\s*sticky/s);
  assert.match(globals, /\.waldo-health-heading-mask\s*\{[^}]*overflow:\s*hidden/s);
  assert.doesNotMatch(globals, /waldo-health-active-chapter/);
  assert.match(globals, /\.waldo-health-vertical-card\s+\.waldo-health-frame-card\s*\{[^}]*filter:\s*blur\(10px\)/s);
  assert.match(globals, /\.waldo-health-vertical-card\[data-active="true"\]\s+\.waldo-health-frame-card\s*\{[^}]*filter:\s*none/s);
});

test("death of chatbox motion follows premium interaction standards", () => {
  const section = read("components/home/death-of-chatbox-section.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /requestAnimationFrame/);
  assert.match(section, /new-chatbox-glow/);
  assert.match(section, /new-chatbox-waldo-wrap/);
  assert.doesNotMatch(section, /setProperty\("--chatbox-/);
  assert.doesNotMatch(globals, /--chatbox-x/);
  assert.doesNotMatch(globals, /--chatbox-y/);
  assert.doesNotMatch(globals, /transition:\s*all/);
  assert.match(globals, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce/);
});

test("handled cards use the Interface Craft selectable deck interaction", () => {
  assert.equal(existsSync("components/home/handled-cards-section.tsx"), true);

  const section = read("components/home/handled-cards-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");

  assert.match(section, /"use client"/);
  assert.match(section, /useState/);
  assert.match(section, /useRef/);
  assert.match(section, /deckOrder/);
  assert.match(section, /aria-pressed/);
  assert.match(section, /data-card-state/);
  assert.match(section, /data-stack-slot/);
  assert.match(section, /handleStageClick/);
  assert.match(section, /event\.stopPropagation/);
  assert.match(section, /handlePointerDown/);
  assert.match(section, /handlePointerMove/);
  assert.match(section, /handlePointerUp/);
  assert.match(section, /moveFirstCardToBack/);
  assert.match(section, /getSwipeThreshold/);
  assert.match(section, /setTimeout/);
  assert.match(section, /Math\.abs\(finalX\)\s*>\s*swipeThreshold/);
  assert.match(section, /Math\.abs\(finalX\)\s*>\s*Math\.abs\(finalY\)\s*\*\s*1\.35/);
  assert.doesNotMatch(section, /setFrontIndex/);
  assert.match(section, /isDragging/);
  assert.match(section, /data-dragging/);
  assert.match(section, /data-drag-active/);
  assert.match(section, /isMobileStack/);
  assert.match(section, /new-handled-card-graphic/);
  assert.match(section, /new-handled-card-body/);
  assert.match(section, /new-handled-card-title/);
  assert.match(section, /Plans your day\. In detail\./);
  assert.match(section, /Overnight, Waldo reads how you actually slept/);
  assert.match(section, /Writes what you.d rather not\./);
  assert.match(section, /The reschedule note\. The follow-up you.ve put off/);
  assert.match(section, /Reads you like a clinician\./);
  assert.match(section, /Waldo does\. It goes through your health/);
  assert.match(section, /Catches what.s shifting\./);
  assert.match(section, /Waldo watches the wider window/);
  assert.match(section, /Shows how far you.ve come\./);
  assert.match(section, /Waldo keeps the honest record/);
  assert.match(section, /new-handled-cta-panel/);
  assert.match(section, /This is what .handled. looks like\./);
  assert.match(section, /Waldo plans like Napoleon/);
  assert.match(section, /href="\/features"/);
  assert.match(section, /Learn More →/);
  assert.match(section, /renderHandledGraphic/);
  assert.match(homePage, /@\/components\/home\/handled-cards-section/);
  assert.match(homePage, /<HandledCardsSection \/>/);
  assert.doesNotMatch(homePage, /const handledCards/);
  assert.match(globals, /\.new-handled-deck-stage/);
  assert.match(globals, /\.new-handled-section\s*\{[^}]*display:\s*flex/s);
  assert.match(globals, /\.new-handled-section\s*\{[^}]*padding:\s*clamp\(34px,\s*5\.5vw,\s*64px\)\s*0\s*clamp\(68px,\s*9vw,\s*116px\)/s);
  assert.match(globals, /\.new-handled-cta-panel\s*\{[^}]*align-items:\s*center/s);
  assert.match(globals, /\.new-handled-cta-panel h2\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.new-handled-feature-link\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(globals, /\.new-handled-card-button/);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]/);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="dock"\]/);
  assert.match(globals, /\.new-handled-card-shell\s*\{[^}]*grid-template-rows:\s*minmax/s);
  assert.match(globals, /\.new-handled-card-graphic\s*\{[^}]*position:\s*relative/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-shell\s*\{[^}]*grid-template-rows/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*font-size:\s*clamp\(2\.05rem/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*-webkit-line-clamp:\s*11/s);
  assert.match(globals, /--stack-drag-x/);
  assert.match(globals, /--stack-drag-rotate/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-card-button\[data-stack-slot="0"\]/);
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot="0"\]\[data-dragging="true"\]\s*\{[^}]*transition:\s*none/s);
  assert.match(
    globals,
    /\.new-handled-deck-stage\[data-drag-active="true"\]\s+\.new-handled-card-button\[data-stack-slot\]:not\(\[data-stack-slot="0"\]\)\s*\{[^}]*pointer-events:\s*none/s,
  );
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot\]\s*\{[^}]*touch-action:\s*pan-y/s);
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot="0"\]\s+\.new-handled-card-body/);
  assert.match(globals, /--fan-x/);
  assert.match(globals, /--dock-x/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce/);
});

test("new homepage uses a layered accounts graph from the Figma reference", () => {
  assert.equal(existsSync("components/home/accounts-graph-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/agent-ask-thread.svg"), true);
  assert.equal(existsSync("public/assets/home/agent-patrol.svg"), true);
  assert.equal(existsSync("public/assets/home/agent-approval.svg"), true);

  const section = read("components/home/accounts-graph-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/accounts-graph-section/);
  assert.match(homePage, /<AccountsGraphSection \/>/);
  assert.doesNotMatch(homePage, /function AccountGraphSection/);
  assert.match(section, /AccountsGraphSection/);
  assert.match(section, /accountsGraphPills/);
  assert.match(section, /accountsGraphApps/);
  assert.match(section, /viewBox="0 0 1014 651"/);
  assert.match(section, /new-accounts-graph-card/);
  assert.match(section, /new-accounts-connector-lines/);
  assert.match(section, /new-accounts-pill/);
  assert.match(section, /new-accounts-app-node/);
  assert.match(section, /new-accounts-cloudflare-icon/);
  assert.match(section, /id:\s*"cloudflare",\s*x:\s*400,\s*y:\s*414/);
  assert.match(section, /new-accounts-jira-icon/);
  assert.match(section, /\/logodots\.svg/);
  assert.match(section, /\/assets\/connectors\/github\.svg/);
  assert.match(section, /\/assets\/connectors\/notion\.svg/);
  assert.match(section, /\/assets\/connectors\/gmail\.svg/);
  assert.match(section, /All your accounts, one you/);
  assert.match(section, /Waldo holds your work inbox/);
  assert.match(section, /instead of a dozen logins that don(?:'|&apos;)t talk/);
  assert.match(section, /useState/);
  assert.match(section, /new-accounts-showcase/);
  assert.match(section, /new-accounts-carousel-frame/);
  assert.match(section, /new-accounts-carousel-window/);
  assert.match(section, /new-accounts-carousel-track/);
  assert.match(section, /new-accounts-carousel-button/);
  assert.match(section, /setActiveSlide/);
  assert.match(section, /activeSlide/);
  assert.match(section, /new-agent-showcase-card/);
  assert.match(section, /new-agent-ask-card/);
  assert.match(section, /agent-ask-thread\.svg/);
  assert.match(section, /Ask about any of it/);
  assert.match(section, /Pin a card, ask a follow-up/);
  assert.match(section, /new-agent-patrol-card/);
  assert.match(section, /agent-patrol\.svg/);
  assert.match(section, /The engine never clocks off/);
  assert.match(section, /builds your morning before the alarm/);
  assert.match(section, /new-agent-approval-card/);
  assert.match(section, /agent-approval\.svg/);
  assert.match(section, /Small stuff, handled by sub-agents/);
  assert.match(section, /Waldo knows the difference/);
  assert.match(globals, /\.new-accounts-section/);
  assert.match(globals, /\.new-accounts-showcase/);
  assert.match(globals, /\.new-accounts-carousel-window\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(globals, /\.new-accounts-carousel-track\s*\{[^}]*display:\s*flex/s);
  assert.match(globals, /\.new-accounts-carousel-track\s*\{[^}]*translate3d\(calc\(var\(--active-slide\) \* -100%\)/s);
  assert.match(globals, /\.new-accounts-carousel-button/);
  assert.match(globals, /\.new-agent-showcase-card/);
  assert.match(globals, /\.new-agent-showcase-card\s*\{[^}]*--new-agent-visual-max:\s*1013\.099px/s);
  assert.match(globals, /\.new-agent-showcase-card\s*\{[^}]*--new-agent-visual-height:\s*650\.896px/s);
  assert.match(globals, /\.new-agent-showcase-card\s*\{[^}]*container-type:\s*inline-size/s);
  assert.match(globals, /\.new-agent-showcase-card\s*\{[^}]*flex:\s*0 0 100%/s);
  assert.match(globals, /\.new-agent-visual-card/);
  assert.match(globals, /\.new-agent-visual-card\s*\{[^}]*aspect-ratio:\s*1013\.099\s*\/\s*650\.896/s);
  assert.match(globals, /\.new-agent-visual-card\s*\{[^}]*height:\s*min\(var\(--new-agent-visual-height\),\s*64\.25cqw\)/s);
  assert.match(globals, /\.new-agent-exported-visual/);
  assert.match(globals, /\.new-agent-exported-visual\s*\{[^}]*background:\s*transparent/s);
  assert.match(globals, /\.new-agent-exported-visual\s*\{[^}]*border:\s*0/s);
  assert.match(globals, /\.new-agent-exported-visual\s*\{[^}]*box-shadow:\s*none/s);
  assert.match(globals, /\.new-agent-exported-image/);
  assert.match(globals, /\.new-agent-exported-ask\s+\.new-agent-exported-image\s*\{[^}]*height:\s*100%/s);
  assert.match(globals, /\.new-agent-exported-patrol\s+\.new-agent-exported-image\s*\{[^}]*max-width:\s*61\.9%/s);
  assert.match(globals, /\.new-agent-exported-approval\s+\.new-agent-exported-image\s*\{[^}]*max-width:\s*55\.8%/s);
  assert.match(globals, /\.new-accounts-graph-card/);
  assert.match(globals, /\.new-accounts-graph-card\s*\{[^}]*aspect-ratio:\s*1013\.099\s*\/\s*650\.896/s);
  assert.match(globals, /\.new-accounts-copy\s*\{[^}]*max-width:\s*682px/s);
  assert.match(globals, /\.new-accounts-connector-lines path\s*\{[^}]*stroke-dasharray/s);
  assert.match(globals, /\.new-accounts-pill\s*\{[^}]*animation:\s*new-accounts-float/s);
  assert.match(globals, /\.new-accounts-app-node\s*\{[^}]*animation:\s*new-accounts-node-breathe/s);
  assert.match(globals, /@keyframes\s+new-agent-card-rise/);
  assert.match(globals, /@keyframes\s+new-agent-thread-pulse/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-accounts-carousel-button/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-accounts-graph-card/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-agent-exported-patrol/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-accounts-float/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*\.new-agent-visual-card/);
});

test("new homepage includes the long-game constellation section from the Figma reference", () => {
  assert.equal(existsSync("components/home/long-game-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/long-game-waldo.svg"), true);
  assert.equal(existsSync("public/assets/home/mascots/Vector-1.svg"), true);
  assert.equal(existsSync("public/assets/home/long-game-stress-shot-up.svg"), true);
  assert.equal(existsSync("public/assets/home/long-game-sleep-compromised.svg"), true);
  assert.equal(existsSync("public/assets/home/long-game-hrv-dipped.svg"), true);
  assert.equal(existsSync("public/assets/home/long-game-form-crash.svg"), true);

  const section = read("components/home/long-game-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/long-game-section/);
  assert.match(homePage, /<LongGameSection \/>/);
  assert.doesNotMatch(homePage, /function LongGameSection/);
  assert.match(section, /LongGameSection/);
  assert.match(section, /Longer he learns, smarter he gets\./);
  assert.match(section, /Months in, Waldo gets to know you, more than you do/);
  assert.match(section, /Shows how you can compound/);
  assert.match(section, /No tool has all of it/);
  assert.match(section, /Tuesday Crash/);
  for (const label of [
    "Cognitive Stress",
    "Sleep Pattern",
    "Training Style",
    "Work Flow",
    "Meals",
    "Excess Caffeine",
    "Weight Intensified",
    "Load Collapsed",
  ]) {
    assert.match(section, new RegExp(label));
  }
  for (const asset of [
    "Vector-1.svg",
    "long-game-stress-shot-up.svg",
    "long-game-sleep-compromised.svg",
    "long-game-hrv-dipped.svg",
    "long-game-form-crash.svg",
  ]) {
    assert.match(section, new RegExp(asset));
  }
  assert.match(section, /longGameSpotDots/);
  assert.match(section, /longGameAnchors/);
  assert.match(section, /longGameCategoryChips/);
  assert.match(section, /longGameEventChips/);
  assert.match(section, /viewBox="0 0 1240 780"/);
  assert.match(globals, /\.new-long-game-section/);
  assert.match(globals, /\.new-long-game-map/);
  assert.match(globals, /\.new-long-game-orbit-lines/);
  assert.match(globals, /\.new-long-game-chip/);
  assert.match(globals, /\.new-long-game-category/);
  assert.match(globals, /\.new-long-game-event-image/);
  assert.match(globals, /\.new-long-game-spot-dot/);
  assert.match(globals, /\.new-long-game-anchor-dot/);
  assert.match(globals, /--long-game-mobile-scale/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-long-game-map/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-long-game-category-work/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-long-game-event-weight/);
  assert.match(globals, /\.new-long-game-orbit-lines path\s*\{[^}]*animation:\s*none/s);
  assert.match(globals, /\.new-long-game-orbit-lines path\s*\{[^}]*stroke-dasharray:\s*none/s);
  assert.match(globals, /@keyframes\s+new-long-game-cluster-drift/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-long-game/);
});

test("new homepage includes the profession connector marquee with exported profile cards", () => {
  assert.equal(existsSync("components/home/profession-section.tsx"), true);

  for (const asset of [
    "profession-consultants.svg",
    "profession-athletes.svg",
    "profession-founders.svg",
    "profession-engineers.svg",
    "profession-investors.svg",
  ]) {
    assert.equal(existsSync(`public/assets/home/profiles/${asset}`), true);
  }

  const section = read("components/home/profession-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const data = read("components/connectors/connector-data.ts");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/profession-section/);
  assert.match(homePage, /<ProfessionSection \/>/);
  assert.doesNotMatch(homePage, /function ProfessionSection/);
  assert.match(section, /ProfessionSection/);
  assert.match(section, /Same Waldo\. Different hats\./);
  assert.match(section, /Waldo works with every profession/);
  assert.match(section, /grandma’s bakery/);
  assert.match(section, /See All Applications →/);
  assert.match(section, /professionCards/);
  assert.match(section, /professionWaveConnectors/);
  assert.match(section, /professionWaveConnectorsWithLoop/);
  assert.match(section, /iconWaveLoopCount/);
  assert.match(section, /cardConnectorLimit/);
  assert.match(section, /connectorIds\.slice\(0,\s*cardConnectorLimit\)/);
  assert.match(section, /new-profession-icon-wave/);
  assert.match(section, /new-profession-icon-wave-track/);
  assert.match(section, /new-profession-icon-wave-logo/);
  assert.match(section, /apple-health/);
  assert.match(section, /strava/);
  assert.match(section, /garmin/);
  assert.match(section, /whoop/);
  assert.match(section, /"use client"/);
  assert.match(section, /useEffect/);
  assert.match(section, /useRef/);
  assert.match(section, /useState/);
  assert.match(section, /marqueeTrackRef/);
  assert.match(section, /marqueeCardsWithLoop/);
  assert.match(section, /handleMarqueePointerDown/);
  assert.match(section, /handleMarqueePointerMove/);
  assert.match(section, /handleMarqueePointerUp/);
  assert.match(section, /setPointerCapture/);
  assert.match(section, /releasePointerCapture/);
  assert.match(section, /data-dragging/);
  assert.match(section, /data-user-dragging/);
  assert.match(section, /onPointerDown/);
  assert.match(section, /onPointerMove/);
  assert.match(section, /onPointerUp/);
  assert.match(section, /onPointerCancel/);
  assert.match(section, /onLostPointerCapture/);
  assert.match(section, /window\.addEventListener\("pointerup"/);
  assert.match(section, /window\.addEventListener\("pointercancel"/);
  assert.match(section, /requestAnimationFrame/);
  assert.match(section, /new-profession-marquee-track/);
  assert.match(section, /new-profession-exported-card/);
  const waveIds = [...section.matchAll(/professionWaveConnectors\s*=\s*\[[\s\S]*?\];/g)][0]?.[0].match(/"([^"]+)"/g)?.map((entry) => entry.match(/"([^"]+)"/)[1]) ?? [];
  assert.ok(waveIds.length >= 14);
  assert.equal(new Set(waveIds).size, waveIds.length);
  for (const connectorId of [
    "hubspot",
    "salesforce",
    "strava",
    "garmin",
    "oura",
    "google-fit",
    "microsoft-outlook",
    "google-calendar",
    "gmail",
    "linear",
    "slack",
    "notion",
    "figma",
    "github",
    "salesforce",
    "apple-health",
    "whoop",
  ]) {
    assert.match(data, new RegExp(`id:\\s*"${connectorId}"`));
  }
  assert.match(globals, /\.new-profession-section/);
  assert.match(globals, /\.new-profession-copy-stage/);
  assert.match(globals, /\.new-profession-icon-wave/);
  assert.match(globals, /\.new-profession-icon-wave-track/);
  assert.match(globals, /\.new-profession-icon-wave-logo/);
  assert.match(globals, /\.new-profession-marquee/);
  assert.match(globals, /\.new-profession-marquee-track/);
  assert.match(globals, /\.new-profession-card-shell/);
  assert.match(globals, /\.new-profession-exported-card/);
  assert.match(globals, /\.new-profession-card-shell:hover/);
  assert.match(globals, /\.new-profession-card-logos \.connector-chip\s*\{[^}]*animation:\s*none/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*padding-block:\s*44px 28px/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*cursor:\s*grab/s);
  assert.match(globals, /\.new-profession-marquee\[data-dragging="true"\]\s*\{[^}]*cursor:\s*grabbing/s);
  assert.match(globals, /\.new-profession-marquee-track\s*\{[^}]*--marquee-loop-x:\s*0px/s);
  assert.match(globals, /\.new-profession-marquee-track\s*\{[^}]*--marquee-drag-x:\s*0px/s);
  assert.match(globals, /\.new-profession-marquee-track\s*\{[^}]*transform:\s*translate3d\(calc\(var\(--marquee-loop-x/s);
  assert.match(globals, /@keyframes\s+new-profession-marquee/);
  assert.match(globals, /@keyframes\s+new-profession-icon-wave/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-profession-marquee/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-profession-icon-wave-track/);
});

test("new homepage includes the data autonomy handoff section", () => {
  assert.equal(existsSync("components/home/data-alone-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/data-alone/data-alone-map.svg"), true);
  assert.equal(existsSync("public/assets/home/data-alone/data-alone-waldo.svg"), true);
  assert.equal(existsSync("public/assets/home/data-alone/autonomy-toggle.svg"), true);

  const section = read("components/home/data-alone-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/data-alone-section/);
  assert.match(homePage, /<DataAloneSection \/>/);
  assert.doesNotMatch(homePage, /function PrivacySection/);
  assert.doesNotMatch(homePage, /<PrivacySection \/>/);
  assert.match(section, /"use client"/);
  assert.match(section, /DataAloneSection/);
  assert.match(section, /autonomyLevels/);
  assert.match(section, /useState/);
  assert.match(section, /setActiveLevel/);
  assert.match(section, /aria-pressed/);
  assert.match(section, /data-active/);
  assert.match(section, /The data\? Yours alone\./);
  assert.match(section, /Your health data stays in your hands/);
  assert.match(section, /We do not sell data/);
  assert.match(section, /The wheel is always in your hands/);
  assert.match(section, /Inform/);
  assert.match(section, /Propose/);
  assert.match(section, /Autonomous/);
  assert.match(section, /L1/);
  assert.match(section, /L2/);
  assert.match(section, /L3/);
  assert.match(section, /Readiness check for/);
  assert.match(section, /Weekly team Sync - 9:00/);
  assert.match(section, /I'd move your 9am to 10:30/);
  assert.match(section, /new-data-alone-section/);
  assert.match(section, /new-data-alone-stage/);
  assert.match(section, /new-data-alone-map/);
  assert.match(section, /new-data-alone-handoff-card/);
  assert.match(section, /new-data-alone-toggle/);
  assert.match(section, /new-data-alone-line-svg/);
  assert.match(section, /data-flow-line/);
  assert.match(section, /new-data-alone-line-map/);
  assert.match(section, /new-data-alone-line-handoff/);
  assert.match(section, /new-data-alone-line-node/);
  assert.match(globals, /\.new-data-alone-section/);
  assert.match(globals, /\.new-data-alone-copy/);
  assert.match(globals, /\.new-data-alone-stage/);
  assert.match(globals, /\.new-data-alone-map/);
  assert.match(globals, /\.new-data-alone-handoff-card/);
  assert.match(globals, /\.new-data-alone-toggle/);
  assert.match(globals, /\.new-data-alone-line-svg/);
  assert.match(globals, /\.new-data-alone-line-map\s*\{[^}]*stroke-dasharray:\s*none/s);
  assert.match(globals, /\.new-data-alone-line-handoff,\s*\.new-data-alone-line-toggle\s*\{[^}]*stroke-dasharray:\s*none/s);
  assert.match(globals, /\.new-data-alone-line-node/);
  assert.match(globals, /@keyframes\s+new-data-alone-line-flow/);
  assert.match(globals, /stroke-dashoffset/);
  assert.match(globals, /\.new-data-alone-toggle-button\[data-active="true"\]/);
  assert.match(globals, /\.new-data-alone-handoff-card\[data-level="autonomous"\]/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-data-alone/);
});

test("new homepage includes the where beat and updated closing CTA copy", () => {
  assert.equal(existsSync("components/home/where-waldo-section.tsx"), true);

  const homePage = read("components/home/new-home-page.tsx");
  const whereSection = read("components/home/where-waldo-section.tsx");
  const closeSection = read("components/sections/downstream-build-sections.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/where-waldo-section/);
  assert.match(homePage, /<DataAloneSection \/>[\s\S]*<WhereWaldoSection \/>[\s\S]*<SceneCloseSection \/>/);
  assert.match(whereSection, /Where’s Waldo\?/);
  assert.match(whereSection, /Already three steps ahead\./);
  assert.match(whereSection, /new-where-waldo-section/);
  assert.match(whereSection, /new-where-waldo-waldo/);
  assert.match(globals, /\.new-where-waldo-section/);
  assert.match(globals, /\.new-where-waldo-waldo/);
  assert.match(closeSection, /Your health isn’t going to fix itself\./);
  assert.match(closeSection, /Get Waldo\. Free to start\. Works with the device you own\./);
  assert.match(closeSection, /And then you'll be the one they're looking out for\./);
  assert.match(closeSection, /WaldoCTA/);
  assert.match(closeSection, /new-scene-close-actions/);
  assert.match(closeSection, /new-scene-close-secondary-cta/);
  assert.match(closeSection, /href="\/features"/);
  assert.match(closeSection, /Explore features/);
  assert.match(closeSection, /\["Explore features",\s*"\/features"\]/);
  assert.doesNotMatch(closeSection, /Get Started/);
  assert.match(closeSection, /new-scene-close-copy-zone/);
  assert.match(closeSection, /new-scene-close-art/);
  assert.match(closeSection, /<FooterScenePicture[\s\S]*new-scene-close-art[\s\S]*new-scene-close-copy-zone/);
  assert.match(closeSection, /className="new-scene-close-art[^"]*\babsolute\b/);
  assert.match(closeSection, /className="new-scene-close-art[^"]*\binset-0\b/);
  assert.doesNotMatch(closeSection, /h-\[calc\(100%\+48px\)\]/);
  assert.match(globals, /\.new-scene-close-section\s*\{[^}]*aspect-ratio:\s*1440\s*\/\s*811/s);
  assert.match(globals, /\.new-scene-close-section\s*\{[^}]*min-height:\s*clamp\(720px,\s*100svh,\s*920px\)/s);
  assert.match(globals, /\.new-scene-close-copy-zone\s*\{[^}]*min-height:\s*clamp\(330px,\s*42svh,\s*390px\)/s);
  assert.match(globals, /\.new-scene-close-actions\s*\{[^}]*display:\s*flex/s);
  assert.match(globals, /\.new-scene-close-secondary-cta\s*\{[^}]*border-radius:\s*999px/s);
  assert.match(globals, /\.new-scene-close-copy-zone\s*\{[^}]*padding-top:\s*clamp\(64px,\s*10svh,\s*128px\)/s);
  assert.match(globals, /\.new-scene-close-art\s*\{[^}]*height:\s*100%/s);
  assert.match(globals, /\.new-scene-close-art\s+img\s*\{[^}]*height:\s*100%/s);
  assert.match(globals, /\.new-scene-close-art\s+img\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(globals, /\.new-scene-close-title\s*\{[^}]*font-size:\s*clamp\(2\.35rem,\s*1\.55rem \+ 2\.15vw,\s*3\.8rem\)/s);
  assert.match(globals, /\.new-scene-close-copy\s*\{[^}]*font-size:\s*clamp\(0\.98rem,\s*0\.78rem \+ 0\.55vw,\s*1\.2rem\)/s);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-scene-close-title\s*\{[^}]*font-size:\s*clamp\(2\.05rem,\s*8\.6vw,\s*2\.78rem\)/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-scene-close-copy\s*\{[^}]*font-size:\s*clamp\(0\.9rem,\s*3\.45vw,\s*1\.02rem\)/);
  assert.doesNotMatch(globals, /\.new-scene-close-title\s*\{[^}]*8\.8rem/s);
  assert.doesNotMatch(globals, /\.new-scene-close-copy\s*\{[^}]*3rem/s);
});
