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
  const globals = read("app/globals.css");

  assert.match(homePage, /They.re simply ahead of the curve/);
  assert.match(homePage, /They aren.t working less/);
  assert.match(homePage, /they.ve already rescheduled it and messaged the room/);
  assert.match(homePage, /SceneCloseSection/);
  assert.match(homePage, /bg-\[var\(--surface-t3\)\]/);
  assert.match(globals, /--new-home-base:\s*#F4F3F0/);
  assert.match(globals, /--new-home-light-frame:\s*#FAFAF8/);
  assert.match(globals, /\.new-home\s*\{[^}]*background:\s*var\(--new-home-base\)/s);
  assert.match(globals, /\.new-home-section\s*\{[^}]*background:\s*transparent/s);
  assert.doesNotMatch(homePage, /new-home-footer-art/);
});

test("site metadata reflects current Waldo positioning and happy dog imagery", () => {
  const siteMetadata = read("lib/site-metadata.ts");
  const layout = read("app/layout.tsx");
  const homePage = read("app/page.tsx");
  const featuresPage = read("app/features/page.tsx");
  const waitlistPage = read("app/waitlist/page.tsx");
  const ogImage = read("app/opengraph-image.tsx");
  const sitemap = read("app/sitemap.ts");
  const robots = read("app/robots.ts");

  assert.match(siteMetadata, /Action layer for the human day/);
  assert.match(siteMetadata, /closes the daily workflow loop/);
  assert.match(siteMetadata, /what moves, what stays, what gets protected/);
  assert.match(siteMetadata, /good-week-dark-mode\.svg/);
  assert.match(siteMetadata, /LAST_CONTENT_UPDATE/);

  assert.match(layout, /SITE_TITLE/);
  assert.match(layout, /SoftwareApplication/);
  assert.match(layout, /HAPPY_WALDO_IMAGE_URL/);
  assert.match(layout, /featureList/);
  assert.match(layout, /formatDetection/);
  assert.doesNotMatch(layout, /Waldo — Already on it\./);
  assert.doesNotMatch(layout, /twitter\.com\/heywaldo/);

  assert.match(homePage, /export const metadata/);
  assert.match(featuresPage, /FEATURES_DESCRIPTION/);
  assert.match(featuresPage, /what moves, what stays, and what gets protected/);
  assert.match(waitlistPage, /WAITLIST_DESCRIPTION/);
  assert.match(waitlistPage, /Let Waldo in/);

  assert.match(ogImage, /Happy Waldo beside the action layer for the human day/);
  assert.match(ogImage, /HAPPY_WALDO_IMAGE_PATH/);
  assert.match(ogImage, /Action layer/);
  assert.match(ogImage, /human day/);
  assert.match(sitemap, /LAST_CONTENT_UPDATE/);
  assert.match(robots, /SITE_URL/);
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
  assert.match(fonts, /Mottle\[wght\]\.ttf/);
  assert.match(layout, /mottle\.variable/);
  assert.match(globals, /--mottle-display-weight:\s*460/);
  assert.match(globals, /\.type-h1\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.type-h1\s*\{[^}]*font-weight:\s*var\(--mottle-display-weight\)/s);
  assert.match(globals, /\.type-h2\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.type-h2\s*\{[^}]*font-weight:\s*var\(--mottle-display-weight\)/s);
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
  const desktopNav = read("components/navbar.tsx");
  assert.match(nav, /Menu/);
  assert.match(nav, /\{ label: "Features", tooltip: "Explore the full tour of Waldo\." \}/);
  assert.doesNotMatch(nav, /\{ label: "Features", href:/);
  assert.match(desktopNav, /\{ label: "Features", tooltip: "Explore the full tour of Waldo\." \}/);
  assert.doesNotMatch(desktopNav, /\{ label: "Features", href:/);
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
  assert.equal(existsSync("public/assets/home/mascots/waldo-sad-with-flower.svg"), true);

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
  assert.match(section, /\/assets\/home\/mascots\/waldo-sad-with-flower\.svg/);
  assert.doesNotMatch(section, /\/assets\/home\/mascots\/Vector\.svg/);
  assert.match(homePage, /DeathOfChatboxSection/);
  assert.doesNotMatch(homePage, /new-chat-proof/);
});

test("new homepage uses the tight too much data bento after the chatbox copy", () => {
  assert.equal(existsSync("components/home/too-much-data-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/too-much-data.svg"), true);
  assert.equal(existsSync("public/assets/home/waldo-close-eye.svg"), true);
  assert.equal(existsSync("public/assets/home/mascots/rough-dark-mode.svg"), true);
  assert.equal(existsSync("public/assets/home/mascots/waldo-facepalm.svg"), true);
  assert.equal(existsSync("public/assets/home/data-bento/nutrition-details.png"), true);
  assert.equal(existsSync("public/assets/home/data-bento/gmail-q1-review.png"), true);
  assert.equal(existsSync("public/assets/home/data-bento/calendar-strategy.png"), true);
  assert.equal(existsSync("public/assets/home/data-bento/stress-heart-rate.png"), true);
  assert.equal(existsSync("public/assets/home/devices/apple-watchface.svg"), true);
  assert.equal(existsSync("public/assets/home/devices/analog-watch.svg"), true);

  const homePage = read("components/home/new-home-page.tsx");
  const section = read("components/home/too-much-data-section.tsx");
  const globals = read("app/globals.css");

  assert.match(homePage, /@\/components\/home\/too-much-data-section/);
  assert.match(homePage, /TooMuchDataSection/);
  assert.doesNotMatch(homePage, /function MissingOutSection/);
  assert.match(section, /useState/);
  assert.match(section, /new-data-marquee-track/);
  assert.match(section, /waldo-facepalm\.svg/);
  assert.doesNotMatch(section, /rough-dark-mode\.svg/);
  assert.match(section, /data-bento/);
  assert.match(section, /\.png/);
  assert.match(section, /nutrition-details/);
  assert.match(section, /stress-heart-rate/);
  assert.match(section, /You already have everything/);
  assert.match(section, /Waldo needs/);
  assert.match(section, /Months of health data, sitting idle/);
  assert.match(section, /requestAnimationFrame/);
  assert.match(section, /onPointerEnter=\{showBubble\}/);
  assert.match(section, /onPointerLeave=\{hideBubble\}/);
  assert.match(section, /data-visible=\{isBubbleVisible \? "true" : "false"\}/);
  assert.match(section, /oof, thats a lot of data/);
  assert.match(section, /new-wearable-device-row/);
  assert.match(section, /Got a wearable\? Thats all Waldo needs/);
  assert.match(globals, /\.new-too-much-data-card/);
  assert.match(globals, /--new-story-rail/);
  assert.match(globals, /--new-visual-rail:\s*980px/);
  assert.match(globals, /--new-data-bento-visual-rail:\s*760px/);
  assert.match(globals, /\.new-too-much-data-card\s*\{[^}]*max-width:\s*var\(--new-data-bento-visual-rail\)/s);
  assert.match(globals, /\.new-too-much-data-card\s*\{[^}]*width:\s*min\(100%,\s*var\(--new-data-bento-visual-rail\)\)/s);
  assert.match(globals, /\.new-data-asset-card/);
  assert.match(globals, /\.new-too-much-data-inner\s*\{[^}]*opacity:\s*0\.75/s);
  assert.match(globals, /\.new-too-much-data-waldo\[data-bubble-visible="true"\]/);
  assert.match(globals, /\.new-too-much-data-waldo p\[data-visible="true"\]/);
  assert.match(globals, /\.new-too-much-data-waldo-illustration:hover\s*\+\s*p/);
  assert.match(globals, /\.new-too-much-data-waldo p\s*\{[^}]*visibility:\s*hidden/s);
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
  assert.match(globals, /--new-editorial-h2-size:\s*1\.875rem/);
  assert.match(
    globals,
    /\.new-chatbox-missing-copy h2,\s*\.new-too-much-data-copy h2,\s*\.new-handled-cta-panel h2\s*\{[^}]*font-size:\s*var\(--new-editorial-h2-size\)/s,
  );
  assert.match(
    globals,
    /\.new-chatbox-missing-copy h2,\s*\.new-too-much-data-copy h2,\s*\.new-handled-cta-panel h2\s*\{[^}]*white-space:\s*nowrap/s,
  );
  assert.doesNotMatch(globals, /\.new-chatbox-missing-copy h2\s*\{[^}]*font-size:\s*clamp\(3\.6rem/s);
  assert.doesNotMatch(globals, /\.new-too-much-data-copy h2\s*\{[^}]*font-size:\s*clamp\(3\.6rem/s);
  assert.match(globals, /@media\s*\(min-width:\s*735px\)\s*\{[\s\S]*\.new-home-hero,\s*\.new-home-section\s*\{[^}]*padding-inline:\s*56px/s);
  assert.match(globals, /@media\s*\(min-width:\s*735px\)\s*\{[\s\S]*\.new-chatbox-section\s*\{[^}]*gap:\s*132px/s);
  assert.match(globals, /@media\s*\(min-width:\s*735px\)\s*\{[\s\S]*\.new-handled-section\s*\{[^}]*padding:\s*64px 56px 96px/s);
  assert.match(globals, /@media\s*\(min-width:\s*735px\)\s*\{[\s\S]*\.new-accounts-section\s*\{[^}]*gap:\s*0/s);
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
  assert.match(section, /waldo-smart-panel[^"]*bg-\[var\(--surface-t2\)\]/);
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
  assert.match(globals, /\.waldo-smart-section\s*\{[^}]*background:\s*var\(--new-home-light-frame,\s*var\(--surface-t2\)\)/s);
  assert.match(globals, /\.waldo-smart-section\s*\{[^}]*width:\s*100%/s);
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
  assert.match(section, /useState/);
  assert.match(section, /new-chatbox-glow/);
  assert.match(section, /new-chatbox-waldo-wrap/);
  assert.match(section, /onPointerEnter=\{showEulogy\}/);
  assert.match(section, /onPointerLeave=\{hideEulogy\}/);
  assert.match(section, /data-visible=\{isEulogyVisible \? "true" : "false"\}/);
  assert.doesNotMatch(section, /setProperty\("--chatbox-/);
  assert.doesNotMatch(globals, /--chatbox-x/);
  assert.doesNotMatch(globals, /--chatbox-y/);
  assert.doesNotMatch(globals, /transition:\s*all/);
  assert.match(globals, /--new-chatbox-visual-rail:\s*760px/);
  assert.match(globals, /\.new-chatbox-card\s*\{[^}]*max-width:\s*var\(--new-chatbox-visual-rail\)/s);
  assert.match(globals, /\.new-chatbox-card\s*\{[^}]*width:\s*min\(100%,\s*var\(--new-chatbox-visual-rail\)\)/s);
  assert.match(globals, /\.new-chatbox-input\s*\{[^}]*width:\s*min\(80%,\s*600px\)/s);
  assert.match(globals, /\.new-chatbox-eulogy\s*\{[^}]*opacity:\s*0/s);
  assert.match(globals, /\.new-chatbox-eulogy\s*\{[^}]*visibility:\s*hidden/s);
  assert.match(globals, /\.new-chatbox-eulogy\[data-visible="true"\]/);
  assert.match(globals, /\.new-chatbox-waldo-wrap:hover\s*\+\s*\.new-chatbox-eulogy\s*\{[^}]*opacity:\s*1/s);
  assert.match(globals, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce/);
});

test("handled cards use the Interface Craft selectable deck interaction", () => {
  assert.equal(existsSync("components/home/handled-cards-section.tsx"), true);

  const section = read("components/home/handled-cards-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");
  const sunflowerCursor = read("components/sunflower-cursor.tsx");

  assert.match(section, /"use client"/);
  assert.match(section, /useState/);
  assert.match(section, /useRef/);
  assert.match(section, /useCallback/);
  assert.match(section, /useLayoutEffect/);
  assert.match(section, /deckOrder/);
  assert.match(section, /DeckTransitionDirection/);
  assert.match(section, /aria-pressed/);
  assert.match(section, /data-card-state/);
  assert.match(section, /data-deck-direction=\{deckTransitionDirection \?\? "none"\}/);
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
  assert.match(section, /handleCardMouseDown/);
  assert.match(section, /event\.preventDefault\(\)/);
  assert.match(section, /RESIZE_SETTLE_MS\s*=\s*160/);
  assert.match(section, /DECK_BREAKPOINT_EXIT_MS\s*=\s*320/);
  assert.match(section, /DECK_BREAKPOINT_ENTER_MS\s*=\s*760/);
  assert.match(section, /DESKTOP_CARD_WIDTH\s*=\s*228/);
  assert.match(section, /DESKTOP_SELECTED_WIDTH\s*=\s*312/);
  assert.match(section, /DESKTOP_SELECTED_HEIGHT\s*=\s*384/);
  assert.match(section, /if\s*\(selectedIndex\s*===\s*index\)\s*\{[\s\S]*?z:\s*index\s*\+\s*1/s);
  assert.doesNotMatch(section, /z:\s*20/);
  assert.match(section, /stageRef/);
  assert.match(section, /getStageViewportCenter/);
  assert.match(section, /visibleOnly/);
  assert.match(section, /rememberStageViewportCenter/);
  assert.match(section, /getStageViewportCenter\(\{\s*visibleOnly:\s*true\s*\}\)/);
  assert.match(section, /stabilizeStageViewportCenter/);
  assert.match(section, /window\.scrollBy\(\{\s*top:\s*deltaY,\s*left:\s*0\s*\}\)/);
  assert.match(section, /viewportWatchFrameRef/);
  assert.match(section, /resizePreserveReleaseTimerRef/);
  assert.match(section, /isPreservingResizeFocusRef/);
  assert.match(section, /if\s*\(isPreservingResizeFocusRef\.current\)\s*\{[\s\S]*?return/s);
  assert.match(section, /viewportSnapshotRef/);
  assert.match(section, /renderedMobileDeckRef/);
  assert.match(section, /isCrossingRenderedMode/);
  assert.match(section, /options:\s*\{\s*forceGeometry\?:\s*boolean\s*\}/);
  assert.match(section, /if\s*\(options\.forceGeometry \|\| !isCrossingRenderedMode\)\s*\{[\s\S]*?setViewportWidth\(nextViewport\.width\)/s);
  assert.match(section, /renderedMobileDeckRef\.current\s*=\s*initialViewport\.isMobile/);
  assert.match(section, /setRenderedMobileDeck\(initialViewport\.isMobile\)/);
  assert.match(section, /renderedMobileDeckRef\.current\s*=\s*isMobileDeck/);
  assert.match(section, /setViewportWidth\(window\.innerWidth\)/);
  assert.match(section, /const breakpointQuery\s*=\s*window\.matchMedia\("\(max-width:\s*734px\)"\)/);
  assert.match(section, /const readViewportSnapshot\s*=\s*\(\)\s*=>\s*\(\{/);
  assert.match(section, /const watchViewport\s*=\s*\(\)\s*=>\s*\{/);
  assert.match(section, /nextViewport\.width !== previousViewport\.width/);
  assert.match(section, /nextViewport\.isMobile !== previousViewport\.isMobile/);
  assert.match(section, /viewportWatchFrameRef\.current\s*=\s*requestAnimationFrame\(watchViewport\)/);
  assert.match(section, /cancelAnimationFrame\(viewportWatchFrameRef\.current\)/);
  assert.match(section, /isPreservingResizeFocusRef\.current\s*=\s*true/);
  assert.match(section, /isPreservingResizeFocusRef\.current\s*=\s*false/);
  assert.match(section, /DECK_BREAKPOINT_EXIT_MS\s*\+\s*DECK_BREAKPOINT_ENTER_MS/);
  assert.match(section, /setIsMobileDeck\(nextViewport\.isMobile\)/);
  assert.match(section, /window\.visualViewport\?\.addEventListener\("resize",\s*handleResize\)/);
  assert.match(section, /breakpointQuery\.addEventListener\("change",\s*handleResize\)/);
  assert.match(section, /new ResizeObserver\(handleResize\)/);
  assert.match(section, /layoutResizeObserver\.observe\(document\.documentElement\)/);
  assert.match(section, /layoutResizeObserver\.observe\(stageRef\.current\)/);
  assert.match(section, /window\.visualViewport\?\.removeEventListener\("resize",\s*handleResize\)/);
  assert.match(section, /breakpointQuery\.removeEventListener\("change",\s*handleResize\)/);
  assert.match(section, /layoutResizeObserver\?\.disconnect\(\)/);
  assert.match(section, /setDeckTransitionDirection\(nextDirection\)/);
  assert.match(section, /const nextDirection:\s*DeckTransitionDirection\s*=\s*isMobileDeck \? "desktop-to-mobile" : "mobile-to-desktop"/);
  assert.match(section, /resizeTimerRef/);
  assert.match(section, /deckTransitionPhase/);
  assert.match(section, /deckTransitionEnterTimerRef/);
  assert.match(section, /renderedMobileDeck/);
  assert.match(section, /handleDocumentPointerDown/);
  assert.match(section, /document\.addEventListener\("pointerdown",\s*handleDocumentPointerDown\)/);
  assert.match(section, /target\.closest\("\.new-handled-card-button"\)/);
  assert.match(section, /getOffsetMultiplier/);
  assert.match(section, /getClusterScale/);
  assert.match(section, /DESKTOP_DOCK_SPACING/);
  assert.match(section, /setSelectedIndex\(\(currentIndex\) => \(currentIndex === index \? null : index\)\)/);
  assert.match(section, /className="new-handled-content"\s+data-animate="blur-fade"/);
  assert.match(section, /className="new-handled-section"\s+aria-labelledby="handled-title"\s+data-no-bloom="true"/);
  assert.match(section, /new-handled-deck-cluster/);
  assert.doesNotMatch(section, /new-handled-card-graphic/);
  assert.match(section, /new-handled-card-body/);
  assert.match(section, /new-handled-card-title/);
  assert.match(section, /Plans your\\nday\. In detail\./);
  assert.match(section, /Reads your night, then rebuilds\\nthe day around it/);
  assert.match(section, /Writes what\\nyou.d rather not\./);
  assert.match(section, /The follow-up you've dodged since Tuesday, written in your voice\. Sent, or waiting for your nod\./);
  assert.match(section, /Reads you\\nlike a clinician\./);
  assert.match(section, /Goes through your numbers the way a careful clinician would - and finds what you'd never catch alone\./);
  assert.doesNotMatch(section, /Goes through your numbers like a\\ncareful clinician would - then finds/);
  assert.match(section, /Catches\\nwhat.s shifting\./);
  assert.match(section, /quietly drift, then flags it\\nwhile it.s still easy to fix/);
  assert.match(section, /Shows how\\nfar you.ve come\./);
  assert.match(section, /months, years, so progress\\nstops being a guess/);
  assert.match(section, /new-handled-cta-panel/);
  assert.match(section, /This is what .handled. looks like\./);
  assert.match(section, /Waldo plans like Napoleon/);
  assert.doesNotMatch(section, /href="\/features"/);
  assert.doesNotMatch(section, /Learn More →/);
  assert.doesNotMatch(section, /className="new-handled-cta-panel"\s+data-animate="blur-fade"/);
  assert.doesNotMatch(section, /className="new-handled-deck-stage"\s+data-animate="blur-fade"/);
  assert.doesNotMatch(section, /renderHandledGraphic/);
  assert.match(homePage, /@\/components\/home\/handled-cards-section/);
  assert.match(homePage, /<HandledCardsSection \/>/);
  assert.doesNotMatch(homePage, /const handledCards/);
  assert.match(globals, /\.new-handled-deck-stage/);
  assert.match(globals, /\.new-handled-deck-cluster\s*\{[^}]*height:\s*550px/s);
  assert.match(globals, /\.new-handled-deck-stage\s*\{[^}]*width:\s*min\(100%,\s*900px\)/s);
  assert.match(globals, /--handled-card-width:\s*228px/);
  assert.match(globals, /--handled-card-height:\s*288px/);
  assert.match(globals, /--handled-selected-width:\s*312px/);
  assert.match(globals, /--handled-selected-height:\s*384px/);
  assert.match(globals, /--handled-layout-ease:\s*cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
  assert.match(globals, /--handled-spring-xy:\s*linear\(/);
  assert.match(globals, /--handled-spring-rs:\s*linear\(/);
  assert.match(globals, /--handled-card-radius:\s*20px/);
  assert.match(globals, /new-handled-cluster-enter/);
  assert.match(globals, /new-handled-cluster-exit/);
  assert.match(globals, /new-handled-desktop-bunch-exit/);
  assert.match(globals, /new-handled-mobile-stack-exit/);
  assert.match(globals, /new-handled-mobile-deck-enter/);
  assert.match(globals, /new-handled-desktop-confetti-in/);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-direction="desktop-to-mobile"\]\[data-deck-phase="leaving"\]\s+\.new-handled-deck-cluster\s*\{[^}]*new-handled-desktop-bunch-exit 320ms/s);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-direction="desktop-to-mobile"\]\[data-deck-phase="leaving"\]\s+\.new-handled-card-button\[data-tone="blue"\]\s*\{[^}]*scale\(0\.84\)/s);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-mode="mobile"\]\[data-deck-direction="mobile-to-desktop"\]\[data-deck-phase="leaving"\]\s+\.new-handled-deck-cluster\s*\{[^}]*new-handled-mobile-stack-exit 320ms/s);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-mode="desktop"\]\[data-deck-direction="mobile-to-desktop"\]\[data-deck-phase="entered"\]\s+\.new-handled-card-button\s*\{[^}]*new-handled-desktop-confetti-in 720ms/s);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-mode="desktop"\]\[data-deck-direction="mobile-to-desktop"\]\[data-deck-phase="entered"\]\s+\.new-handled-card-button\[data-tone="red"\]\s*\{[^}]*animation-delay:\s*144ms/s);
  assert.match(globals, /\.new-handled-deck-stage\[data-deck-mode="mobile"\]\[data-deck-direction="desktop-to-mobile"\]\[data-deck-phase="entered"\]\s+\.new-handled-deck-cluster\s*\{[^}]*new-handled-mobile-deck-enter 460ms/s);
  assert.match(globals, /data-tone="blue"[\s\S]*--handled-card-ink:\s*#213453;[\s\S]*background:\s*#2DB9FF;/);
  assert.match(globals, /data-tone="green"[\s\S]*--handled-card-ink:\s*#B1E080;[\s\S]*background:\s*#3E5035;/);
  assert.match(globals, /data-tone="purple"[\s\S]*--handled-card-ink:\s*#F6A6D2;[\s\S]*background:\s*#3F345D;/);
  assert.match(globals, /data-tone="yellow"[\s\S]*--handled-card-ink:\s*#4E301F;[\s\S]*background:\s*#FFD351;/);
  assert.match(globals, /data-tone="red"[\s\S]*--handled-card-ink:\s*#531421;[\s\S]*background:\s*#FF4B4D;/);
  assert.match(globals, /\.new-handled-section\s*\{[^}]*display:\s*flex/s);
  assert.match(globals, /\.new-handled-section\s*\{[^}]*overflow-anchor:\s*none/s);
  assert.match(
    globals,
    /\.new-handled-section\s*\{[^}]*padding:\s*clamp\(34px,\s*5\.5vw,\s*64px\)\s*clamp\(22px,\s*5vw,\s*56px\)\s*clamp\(56px,\s*7vw,\s*96px\)/s,
  );
  assert.match(globals, /\.new-handled-content\s*\{[^}]*display:\s*flex/s);
  assert.match(globals, /\.new-handled-content\s*\{[^}]*justify-content:\s*center/s);
  assert.match(globals, /\.new-handled-content\s*\{[^}]*margin-inline:\s*auto/s);
  assert.match(globals, /\.new-handled-content\s*\{[^}]*gap:\s*clamp\(76px,\s*7vw,\s*108px\)/s);
  assert.match(globals, /\.new-handled-cta-panel\s*\{[^}]*align-items:\s*center/s);
  assert.match(globals, /\.new-handled-cta-panel\s*\{[^}]*margin-inline:\s*auto/s);
  assert.match(globals, /\.new-handled-cta-panel\s*\{[^}]*gap:\s*clamp\(12px,\s*1\.4vw,\s*18px\)/s);
  assert.match(globals, /\.new-handled-cta-panel h2\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.new-handled-cta-panel h2\s*\{[^}]*font-size:\s*var\(--new-editorial-h2-size\)/s);
  assert.match(globals, /\.new-handled-cta-panel h2\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(globals, /\.new-handled-cta-panel p\s*\{[^}]*font-size:\s*var\(--new-editorial-body-size\)/s);
  assert.match(globals, /\.new-handled-feature-link\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(sunflowerCursor, /const SIZE_MIN = 39/);
  assert.match(sunflowerCursor, /const SIZE_MAX = 62/);
  assert.match(sunflowerCursor, /\[data-no-bloom\]/);
  assert.match(globals, /\.new-handled-card-button/);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*-webkit-user-select:\s*none/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*user-select:\s*none/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*--handled-card-left:\s*calc\(var\(--handled-card-width\)\s*\/\s*-2\)/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*--handled-card-top:\s*calc\(var\(--handled-card-height\)\s*\/\s*-2\)/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*transform:\s*translate3d\(var\(--handled-card-left\),\s*var\(--handled-card-top\),\s*0\)\s*rotate\(var\(--handled-card-rotate\)\)\s*scale\(var\(--handled-card-scale\)\)/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*height\s*750ms\s*var\(--handled-spring-rs\)/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*transform\s*850ms\s*var\(--handled-spring-xy\)/s);
  assert.match(globals, /\.new-handled-card-button\s*\{[^}]*width\s*750ms\s*var\(--handled-spring-rs\)/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]/);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="dock"\]/);
  assert.match(globals, /\.new-handled-card-shell\s*\{[^}]*position:\s*relative/s);
  assert.match(globals, /\.new-handled-card-shell\s*\{[^}]*user-select:\s*none/s);
  assert.match(globals, /\.new-handled-card-shell\s*\{[^}]*transform:\s*translate3d\(0,\s*0,\s*0\)\s*scale\(1\)/s);
  assert.match(globals, /\.new-handled-card-shell\s*\{[^}]*will-change:\s*transform/s);
  assert.doesNotMatch(globals, /\.new-handled-card-graphic\s*\{/);
  assert.doesNotMatch(globals, /grid-template-rows:\s*minmax/);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*--handled-title-scale:\s*0\.88/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*font-size:\s*25px/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*user-select:\s*none/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*line-height:\s*28px/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*left:\s*24px/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*max-width:\s*205px/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*top:\s*213px/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*transform:\s*translate3d\(0,\s*0,\s*0\)\s*scale\(var\(--handled-title-scale\)\)/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*transform-origin:\s*left top/s);
  assert.match(globals, /--handled-motion-spring:\s*cubic-bezier\(0\.34,\s*1\.56,\s*0\.64,\s*1\)/);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*transform\s*750ms\s*var\(--handled-spring-rs\)/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*will-change:\s*left,\s*top,\s*transform/s);
  assert.doesNotMatch(globals, /\.new-handled-card-title\s*\{[^}]*font-size\s*360ms\s*var\(--handled-layout-ease\)/s);
  assert.doesNotMatch(globals, /\.new-handled-card-title\s*\{[^}]*line-height\s*360ms\s*var\(--handled-layout-ease\)/s);
  assert.match(globals, /\.new-handled-card-title\s*\{[^}]*white-space:\s*pre-line/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*--handled-title-scale:\s*1/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*font-size:\s*25px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*left:\s*32px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*max-width:\s*260px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-title\s*\{[^}]*top:\s*190px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*filter:\s*blur\(0px\)/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*left:\s*40px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*top:\s*342px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*font-size:\s*16px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*line-height:\s*25px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*height:\s*75px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*max-height:\s*75px/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*white-space:\s*pre-line/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*user-select:\s*none/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*transform:\s*none/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*filter\s*520ms\s*var\(--handled-reveal-ease\)\s*0ms/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*opacity\s*520ms\s*var\(--handled-reveal-ease\)\s*0ms/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*left\s*460ms\s*var\(--handled-layout-ease\)\s*260ms/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*top\s*460ms\s*var\(--handled-layout-ease\)\s*260ms/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*width\s*460ms\s*var\(--handled-layout-ease\)\s*260ms/s);
  assert.match(globals, /\.new-handled-card-body\s*\{[^}]*-webkit-line-clamp:\s*3/s);
  assert.doesNotMatch(globals, /max-height 320ms var\(--handled-reveal-ease\)/);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*left:\s*32px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*top:\s*260px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*filter\s*420ms\s*var\(--handled-reveal-ease\)\s*80ms/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*opacity\s*420ms\s*var\(--handled-reveal-ease\)\s*80ms/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*left\s*360ms\s*var\(--handled-layout-ease\)\s*0ms/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*top\s*360ms\s*var\(--handled-layout-ease\)\s*0ms/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*width\s*360ms\s*var\(--handled-layout-ease\)\s*0ms/s);
  assert.doesNotMatch(globals, /\.new-handled-card-button\[data-card-state="fan"\]\s+\.new-handled-card-body,\s*\.new-handled-card-button\[data-card-state="dock"\]\s+\.new-handled-card-body\s*\{[^}]*transition-delay:\s*0ms/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*width:\s*250px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\s+\.new-handled-card-body\s*\{[^}]*-webkit-line-clamp:\s*3/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="selected"\]\[data-tone="green"\]\s+\.new-handled-card-body,\s*\.new-handled-card-button\[data-card-state="selected"\]\[data-tone="purple"\]\s+\.new-handled-card-body\s*\{[^}]*width:\s*260px/s);
  assert.match(globals, /\.new-handled-card-button\[data-card-state="dock"\]\s+\.new-handled-card-title\s*\{[^}]*--handled-title-scale:\s*0\.88/s);
  assert.match(globals, /--stack-drag-x/);
  assert.match(globals, /--stack-drag-rotate/);
  assert.match(globals, /--handled-card-x/);
  assert.match(globals, /--handled-card-y/);
  assert.match(globals, /--handled-card-left/);
  assert.match(globals, /--handled-card-top/);
  assert.match(globals, /--handled-card-rotate/);
  assert.match(globals, /--handled-card-scale/);
  assert.match(globals, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*and\s*\(min-width:\s*735px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-state="fan"\]\s+\.new-handled-card-button\[data-card-state="fan"\]:hover\s+\.new-handled-card-shell\s*\{[^}]*transform:\s*translate3d\(0,\s*-8px,\s*0\)\s*scale\(1\.03\)/s);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-section\s*\{[^}]*gap:\s*clamp\(22px,\s*7vw,\s*76px\)/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s*\{[^}]*height:\s*clamp\(430px,\s*58svh,\s*600px\)/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-button\[data-stack-slot="0"\]/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*--handled-card-height:\s*min\(94vw,\s*360px\)/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*--handled-card-radius:\s*20px/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s*\{[^}]*width:\s*100%/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-title\s*\{[^}]*font-size:\s*clamp\(1\.42rem,\s*7vw,\s*1\.6rem\)/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-body\s*\{[^}]*font-size:\s*1\.0625rem/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-body\s*\{[^}]*height:\s*auto/s);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-body\s*\{[^}]*max-height:\s*0/s);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-handled-deck-stage\[data-deck-mode="mobile"\]\s+\.new-handled-card-body\s*\{[^}]*max-height\s*420ms\s*var\(--handled-reveal-ease\)/s);
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot="0"\]\[data-dragging="true"\]\s*\{[^}]*transition:\s*none/s);
  assert.match(
    globals,
    /\.new-handled-deck-stage\[data-drag-active="true"\]\s+\.new-handled-card-button\[data-stack-slot\]:not\(\[data-stack-slot="0"\]\)\s*\{[^}]*pointer-events:\s*none/s,
  );
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot\]\s*\{[^}]*touch-action:\s*pan-y/s);
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot="0"\]\s+\.new-handled-card-body/);
  assert.match(globals, /\.new-handled-card-button\[data-stack-slot="0"\]\s+\.new-handled-card-body\s*\{[^}]*max-height:\s*150px/s);
  assert.doesNotMatch(globals, /--fan-x/);
  assert.doesNotMatch(globals, /--dock-x/);
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
  assert.match(globals, /\.new-accounts-copy\s*\{[^}]*max-width:\s*var\(--new-editorial-body-width\)/s);
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

test("new homepage uses the supplied long-game visual as one intact SVG", () => {
  assert.equal(existsSync("components/home/long-game-section.tsx"), true);
  assert.equal(existsSync("public/assets/home/longer-he-runs.svg"), true);

  const section = read("components/home/long-game-section.tsx");
  const homePage = read("components/home/new-home-page.tsx");
  const globals = read("app/globals.css");
  const visual = read("public/assets/home/longer-he-runs.svg");

  assert.match(homePage, /@\/components\/home\/long-game-section/);
  assert.match(homePage, /<LongGameSection \/>/);
  assert.doesNotMatch(homePage, /function LongGameSection/);
  assert.match(section, /LongGameSection/);
  assert.match(section, /Longer he learns, smarter he gets\./);
  assert.match(section, /Months in, Waldo gets to know you, more than you do/);
  assert.match(section, /Shows how you can compound/);
  assert.match(section, /No tool has all of it/);
  assert.match(section, /src="\/assets\/home\/longer-he-runs\.svg"/);
  assert.match(section, /width=\{975\}/);
  assert.match(section, /height=\{590\}/);
  assert.match(section, /className="new-long-game-map-image"/);
  assert.match(section, /unoptimized/);
  assert.equal((section.match(/<Image\b/g) ?? []).length, 1);
  assert.doesNotMatch(section, /longGameSpotDots|longGameAnchors|longGameCategoryChips|longGameEventChips/);
  assert.doesNotMatch(section, /<svg|EventChip|CategoryChip|long-game-stress-shot-up/);
  assert.match(visual, /<svg width="975" height="590" viewBox="0 0 975 590"/);
  assert.doesNotMatch(visual, /<script|<foreignObject|(?:href|src)="https?:\/\//);
  assert.match(globals, /\.new-long-game-section/);
  assert.match(globals, /\.new-long-game-section\s*\{[^}]*background:\s*var\(--new-home-light-frame\)/s);
  assert.match(globals, /\.new-long-game-map\s*\{[^}]*max-width:\s*975px/s);
  assert.match(globals, /\.new-long-game-map\s*\{[^}]*width:\s*min\(100%,\s*975px\)/s);
  assert.match(globals, /\.new-long-game-map-image\s*\{[^}]*height:\s*auto/s);
  assert.match(globals, /\.new-long-game-map-image\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(globals, /\.new-long-game-map\s*\{[^}]*min-height:\s*650px/s);
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
    const profileSvg = read(`public/assets/home/profiles/${asset}`);
    const profilePaths = profileSvg.match(/<path\b[^>]*>/g) ?? [];
    assert.equal(profilePaths.length, 2);
    assert.match(profilePaths[1], /opacity="0"/);
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
  assert.match(section, /body:\s*"Waldo reads/);
  assert.match(section, /ink:\s*"#/);
  assert.match(section, /--profession-card-ink/);
  assert.match(section, /cardConnectorLimit/);
  assert.match(section, /connectorIds\.slice\(0,\s*cardConnectorLimit\)/);
  assert.doesNotMatch(section, /ProfessionIconWave/);
  assert.doesNotMatch(section, /professionWaveConnectors/);
  assert.doesNotMatch(section, /new-profession-icon-wave/);
  assert.match(section, /apple-health/);
  assert.match(section, /strava/);
  assert.match(section, /garmin/);
  assert.match(section, /whoop/);
  assert.match(section, /"use client"/);
  assert.match(section, /useEffect/);
  assert.match(section, /useRef/);
  assert.match(section, /useState/);
  assert.match(section, /marqueeRef/);
  assert.match(section, /marqueeTrackRef/);
  assert.match(section, /marqueeIsWrappingRef/);
  assert.match(section, /activeCardId/);
  assert.match(section, /setActiveCardId/);
  assert.match(section, /marqueeCardsWithLoop/);
  assert.match(section, /onScroll=\{handleMarqueeScroll\}/);
  assert.match(section, /onClick=\{\(\) => \{/);
  assert.match(section, /data-body-visible=\{isBodyVisible\}/);
  assert.match(section, /aria-expanded=\{isBodyVisible\}/);
  assert.doesNotMatch(section, /window\.addEventListener\("scroll"/);
  assert.doesNotMatch(section, /requestAnimationFrame/);
  assert.doesNotMatch(section, /handleMarqueePointerDown/);
  assert.doesNotMatch(section, /setPointerCapture/);
  assert.doesNotMatch(section, /data-user-dragging/);
  assert.doesNotMatch(section, /profession-tilt/);
  assert.match(section, /new-profession-marquee-track/);
  assert.match(section, /new-profession-exported-card/);
  assert.match(section, /new-profession-card-body/);
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
  assert.doesNotMatch(globals, /\.new-profession-icon-wave/);
  assert.match(globals, /\.new-profession-marquee/);
  assert.match(globals, /\.new-profession-marquee-track/);
  assert.match(globals, /\.new-profession-card-shell/);
  assert.match(globals, /\.new-profession-card-shell\s*\{[^}]*background:\s*transparent/s);
  assert.match(globals, /\.new-profession-card-shell\s*\{[^}]*border:\s*0/s);
  assert.match(globals, /\.new-profession-card-shell\s*\{[^}]*cursor:\s*pointer/s);
  assert.match(globals, /\.new-profession-exported-card/);
  assert.match(globals, /\.new-profession-card-body\s*\{[^}]*opacity:\s*0/s);
  assert.match(globals, /\.new-profession-card-body\s*\{[^}]*transform:\s*translate3d\(0,\s*10px,\s*0\)/s);
  assert.match(globals, /\.new-profession-card-body\s*\{[^}]*visibility:\s*hidden/s);
  assert.match(globals, /\.new-profession-card-body\s*\{[^}]*transition:\s*opacity 240ms ease,\s*transform 360ms var\(--ease-premium\),\s*visibility 0s linear 240ms/s);
  assert.match(globals, /\.new-profession-card-shell:hover/);
  assert.match(globals, /\.new-profession-card-shell\[data-body-visible="true"\] \.new-profession-card-body\s*\{[^}]*opacity:\s*1/s);
  assert.match(globals, /\.new-profession-card-shell\[data-body-visible="true"\] \.new-profession-card-body\s*\{[^}]*visibility:\s*visible/s);
  assert.doesNotMatch(globals, /\.new-profession-card-shell:hover \.new-profession-card-body/);
  assert.doesNotMatch(globals, /\.new-profession-card-shell:hover\s*\{[^}]*drop-shadow/s);
  assert.match(globals, /\.new-profession-card-logos \.connector-chip\s*\{[^}]*animation:\s*none/s);
  assert.match(globals, /\.new-profession-card-logos \.connector-chip\s*\{[^}]*box-shadow:\s*none/s);
  assert.match(globals, /\.new-profession-section\s*\{[^}]*max-width:\s*none/s);
  assert.match(globals, /\.new-profession-section\s*\{[^}]*padding-inline:\s*0/s);
  assert.match(globals, /\.new-profession-copy-stage\s*\{[^}]*max-width:\s*var\(--new-home-wide\)/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*padding-block:\s*44px 28px/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*width:\s*100vw/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*overflow-x:\s*auto/s);
  assert.match(globals, /\.new-profession-marquee\s*\{[^}]*scrollbar-width:\s*none/s);
  assert.match(globals, /\.new-profession-marquee::-webkit-scrollbar\s*\{[^}]*display:\s*none/s);
  assert.doesNotMatch(globals, /\.new-profession-marquee\s*\{[^}]*cursor:\s*grab/s);
  assert.doesNotMatch(globals, /\.new-profession-marquee\[data-dragging="true"\]/);
  assert.match(globals, /\.new-profession-marquee-track\s*\{[^}]*gap:\s*clamp\(10px,\s*1vw,\s*16px\)/s);
  assert.doesNotMatch(globals, /\.new-profession-marquee-track\s*\{[^}]*--marquee-loop-x:\s*0px/s);
  assert.doesNotMatch(globals, /\.new-profession-marquee-track\s*\{[^}]*transform:\s*translate3d\(var\(--marquee-loop-x\)/s);
  assert.match(globals, /\.new-profession-card-shell\s*\{[^}]*transform:\s*translate3d\(0,\s*0,\s*0\)/s);
  assert.doesNotMatch(globals, /\.new-profession-card-shell\s*\{[^}]*rotate\(var\(--profession-tilt\)/s);
  assert.doesNotMatch(globals, /\.new-profession-card-shell:hover\s*\{[^}]*rotate/s);
  assert.doesNotMatch(globals, /@keyframes\s+new-profession-marquee/);
  assert.match(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-profession-marquee/);
  assert.doesNotMatch(globals, /prefers-reduced-motion:\s*reduce[\s\S]*new-profession-icon-wave/);
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
  assert.match(section, /new-data-alone-line-handoff/);
  assert.match(section, /data-alone-left-cluster\.svg/);
  assert.match(section, /new-data-alone-map-image/);
  assert.doesNotMatch(section, /new-data-alone-line-map/);
  assert.doesNotMatch(section, /new-data-alone-line-node/);
  assert.match(globals, /\.new-data-alone-section/);
  assert.match(globals, /\.new-data-alone-copy/);
  assert.match(globals, /\.new-data-alone-stage/);
  assert.match(globals, /\.new-data-alone-map/);
  assert.match(globals, /\.new-data-alone-handoff-card/);
  assert.match(globals, /\.new-data-alone-toggle/);
  assert.match(globals, /\.new-data-alone-line-svg/);
  assert.match(globals, /\.new-data-alone-map-image/);
  assert.match(globals, /\.new-data-alone-line\s*\{[^}]*animation:\s*new-data-alone-line-strobe/s);
  assert.match(globals, /\.new-data-alone-line\s*\{[^}]*stroke-dasharray:\s*9 14/s);
  assert.match(globals, /@keyframes\s+new-data-alone-line-strobe/);
  assert.match(globals, /stroke-dashoffset/);
  assert.doesNotMatch(globals, /\.new-data-alone-line-map/);
  assert.doesNotMatch(globals, /\.new-data-alone-line-node/);
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
  assert.doesNotMatch(closeSection, /href="\/features"/);
  assert.doesNotMatch(closeSection, /Explore features/);
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
  assert.match(globals, /\.new-scene-close-title\s*\{[^}]*font-size:\s*clamp\(2\.5rem,\s*2\.2rem \+ 0\.9vw,\s*3\.125rem\)/s);
  assert.match(globals, /\.new-scene-close-copy\s*\{[^}]*font-size:\s*1\.125rem/s);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-scene-close-title\s*\{[^}]*font-size:\s*2\.5rem/);
  assert.match(globals, /@media\s*\(max-width:\s*734px\)\s*\{[\s\S]*\.new-scene-close-copy\s*\{[^}]*font-size:\s*1\.125rem/);
  assert.doesNotMatch(globals, /\.new-scene-close-title\s*\{[^}]*8\.8rem/s);
  assert.doesNotMatch(globals, /\.new-scene-close-copy\s*\{[^}]*3rem/s);
});
