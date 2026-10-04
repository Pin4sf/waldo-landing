# Trust carousel: "Your context. Your call." (local review)

> **Update (2026-10-04): the four-card carousel below was replaced by one single visual, told as a story.** "Your context. Your call." is one rounded box: the centred heading, the line "What he can access. What he can do. What he keeps.", a "Read the Privacy page" button (links to `/privacy`), and one app window rising out of the box's foot. The window tells one small story about one meeting in five beats, with five steps along its top (they are buttons too): **1 He sees** (a calendar he can read and can't change, "Read only", with the Google connection behind it: Calendar, Gmail and Tasks, each read only; editing is a separate permission), **2 He asks** (the Northstar call and the Design review land at 15:00; he prepares a move to Thursday 14:00 and waits: "Waiting for you", Approve and Reject), **3 You decide** (you approve, the meeting moves to Thursday, the card says "Done" with an Undo button), **4 He keeps** (a note, "Keeps mornings for focus work", written by Waldo, background and not an instruction; a correction is typed, he answers "Got it. I'll save that over the old note.", the note is saved over and Thursday morning shows as Focus), **5 Where it goes** (Supabase, Anthropic, Telegram with what each does; "Policy in draft"). The calendar is the one thing that stays; the card on the right is the beat. It plays by itself while on screen, one beat after another, and goes round; with less motion it starts on the first beat and the steps still work. Files: `components/site/trust-window.tsx` and `trust-window.css`; the box and heading are in `app/page.tsx`. Two columns on desktop, stacked below 860px (the steps keep only the current name). People and meetings (Northstar, Priya, Design review) are made up. `trust-panels.tsx` and `trust-panels.css` (the old carousel's panels) are no longer used and can be deleted.
>
> Same rules as before: only what the code backs. "Undo in one tap" is from the site's own FAQ; the 4-hour expiry is not shown (the job that expires proposals isn't confirmed to run). Left out: retention, deletion, region, encryption, "never trained on", "never shared". The beat 4 note and its correction are the same ones as in the old card 3; the "focus on Thursday mornings" tint is only a picture of what the saved note says.

Status: **Built locally for review (2026-10-03). Not pushed, not deployed.** It replaces the Tell / Ask / Just do it carousel on the homepage. Section 2, the hero's 27 states and dots, and every other section are unchanged.

Files: `components/site/trust-panels.tsx`, `components/site/trust-panels.css` (new); `app/page.tsx` (the Trust section only); `components/site/blocks.tsx` (`Item` gets a `panel` prop so a picture with controls in it is read out and focusable, instead of hidden); `components/site/see/kit.tsx` (one line: the phone can crop at this carousel's frame as well as at a five-card slide); `docs/website/pages/home.md`.

## What it is

Heading, in the site's current treatment: **Your context. / Your call.** and the line *What he can access. What he can do. What he keeps.*

Four cards in the site's own carousel (scroll, snap, neighbour peek, the two round arrows, keyboard and a labelled region). It never moves by itself. Each card is a title, one picture, and one sentence.

**The pictures are screens of the same app as the five-card section above it** (2026-10-03 restyle): the same phone, status bar, header, "Ask Waldo" bar, cards, rows, state tags, buttons and sheets, built from the same kit (`see/kit.tsx`, `see/phone.css`) under the same rules: SF Pro, two weights, 0.5px hairlines at 8%, continuous corners, pills for buttons, ink for what needs you, the orange only for something held, no shadows or gradients, icons only from the icon set. Each screen has one button; it opens the app's own sheet (with a close button and Escape), or, on card 4, links to `/privacy`. Under the carousel: *Illustrative controls · sample data*.

Motion (built from what the five-card section already does): the rows rise in turn once when the screen first comes into view, the limit bar fills (card 2), the sheet slides up and its chat bubbles pop (card 3). With less motion nothing moves. Text sizes inside the phone have a floor on narrow frames (10.5 / 11.5 / 12.5 / 13.5px), and on phone-width frames the phone is drawn a little wider than the frame and cropped at its sides, as in the five-card section.

## Exact copy

| Card | Title | Sentence under it | In the panel |
|---|---|---|---|
| 1 | What can he see? | Each connection shows what Waldo can read, and where to take that access back. | Screen "Google" · m•••••@gmail.com, Connected · Can read: Calendar `calendar.readonly`, Gmail `gmail.readonly`, Tasks `tasks.readonly` · Can change: Nothing, editing is a separate permission. · How to take access back (opens the sheet "Taking access back": 1 In your Google Account, open Security, then your connections to third-party apps and services. Choose Waldo, then Remove access. 2 Gmail access is read-only. Waldo reads when messages arrive and their labels, not subjects or text. 3 Removing access stops new reads. What Waldo already saved is a separate step.) |
| 2 | What can he do? | Waldo prepares a change and waits. Nothing moves until you approve it. | Screen "Waiting for you" · Permission request, Needs you · Move Design review to Thursday, 11:00. · Where: Google Calendar · one event · Limit: Needs your yes. Expires after 4 hours. · Northstar reply · prepared, not sent · Review the change (opens: Now: Design review, today 15:00 · Then: Design review, Thursday 11:00 · Nothing changes until you approve. You can approve or reject it.) |
| 3 | What does he remember? | A saved note shows when it last changed. To correct it, tell Waldo. | Screen "Saved note" · Preference, Updated Tue 13 Oct · Keeps mornings for focus work. · How it's used: Written by Waldo; Background when he plans your day or replies. Not an instruction from you. · How to correct it (opens "Correcting a note", a chat: "Mornings are only for focus on Tuesdays and Thursdays." / "Got it. I'll save that over the old note.") |
| 4 | Where does my data go? | The services that handle your data, and what each one does, in plain words. | Screen "Data use" · Where it goes, Policy in draft · Supabase: Stores your account, readings, calendar and message timing, notes and chats. · Anthropic: Writes Waldo's replies from the context each message needs. · Telegram: Carries his messages, if you chat there. · Read the Privacy page (links to `/privacy`) |

The brief's four captions were instructions for the concept, so the cards use shorter ones that only describe what the code does (the sentences above). The brief's captions, for reference: "Show the access behind each connection, not just an app logo." / "Make the permission specific. Keep the boundary visible." / "A saved fact should come with its source and a way to correct it." / "Name the services involved and explain what each receives."

## Evidence for each depicted control

All paths are in the product repo, `../Waldo`. The landing repo has no product code; it only has copy.

**Card 1: what he can see**
- Scope names: `supabase/functions/oauth-google/index.ts` lines 31 to 40 (`calendar` is `calendar.readonly`, `gmail` is `gmail.readonly`, `tasks` is `tasks.readonly`). The phone app asks for `scopes=calendar,gmail,tasks` (`waldo-app/src/screens/ProfileScreen.tsx:107`, `OnboardingScreen.tsx:76`, `src/lib/supabase.ts:95`). So with the phone app's connection, Waldo has read-only Google permissions.
- "Can change: nothing": editing needs separate scopes (`calendar_write` is `calendar.events`, `tasks_write` is `tasks`), and only the internal console and demo ask for them (`tools/waldo-console/src/supabase-api.ts:814-815`). `execute-proposal` fails with "No Google Calendar write token. Re-authorize with calendar_write" without them.
- Gmail: the sync reads only `internalDate` and `labelIds` (`sync-gmail/index.ts:84-89`, `format: 'metadata'`). That is what the sync does, not what the permission allows: `gmail.readonly` can read bodies. The file header says `gmail.metadata`, but the code requests `gmail.readonly`.
- Taking access back: Google's own page is a route outside Waldo (the wording of Google's menu is from memory and should be checked). Waldo's own disconnect, `disconnect-provider`, deletes the stored tokens and sync logs only. It does not call Google to revoke the grant, and it does not delete the synced calendar or message-timing rows. Its only caller is the internal console (`tools/waldo-console/.../IntegrationsPanel.tsx`); the phone app has Connect but no Disconnect.

**Card 2: what he can do**
- Waldo is told to propose, not act: the `propose_action` tool ("NEVER take action directly") and a `waldo_proposals` table with status pending, approved, rejected, expired and a 4-hour `expires_at` (`invoke-agent/index.ts` around lines 205-230, `migrations/20260412000004_waldo_proposals.sql`). `execute-proposal` runs only on approve and checks the user.
- Action kinds that exist: calendar create and move, task create and defer, Todoist create and defer. **There is no email-send action.** So a held Northstar reply, and any "review recipient, destination and full words before send" step, has no code behind it; it appears only as a "prepared, not sent" line and is not described further.
- The 4-hour expiry is a column default; the cron that sets rows to expired is commented out in the migration ("added separately"), so it isn't confirmed to run.

**Card 3: what he remembers**
- Storage: `core_memory` has `key`, `value`, `updated_at` and `hall_type` (facts, events, discoveries, preferences, advice) (`migrations/20260331000001`, `20260410000001`). There is **no source field and no owner-stated versus inferred field**, so the panel shows kind and last update, and "Written by Waldo" (the agent's `update_memory` tool, and the nightly and weekly jobs, write the rows).
- Use: memory is passed to the model as background, marked "NOT new user input" (`invoke-agent/index.ts` around lines 664-669 and 855-858). That backs "not an instruction from you".
- Correction: `update_memory` saves by key, so a new version replaces the old (`invoke-agent/index.ts:510-522`). Whether it is called is the model's choice, so "tell Waldo" is a request, not a guaranteed edit. **No remove or forget route was found.**

**Card 4: where his data goes**
- Supabase stores the data (`supabase/`). Anthropic is called in `_shared/llm-provider.ts:66`. Telegram and WhatsApp bots exist (`functions/telegram-bot`, `functions/whatsapp-bot`). The Privacy page exists and is marked as a draft; the legal part is unwritten.
- Left out because no code or policy backs it: retention, deletion, region, encryption, "never trained on", "never shared".

## Unresolved privacy and security questions (need an answer from the product team)

1. **Other model providers.** `llm-provider.ts` routes generation tasks (morning and evening messages) to DeepSeek V3 when `DEEPSEEK_API_KEY` is set, and Kimi is an option. Is either on in production? The Privacy page and card 4 name only Anthropic. If DeepSeek or Kimi ever receives user context, card 4 and the Privacy page must say so.
2. **Gmail permission versus behaviour.** The sync reads only times and labels, but the Google permission is `gmail.readonly`. Is moving to `gmail.metadata` planned? Until then "never the words" describes the sync, not the permission.
3. **Retention and deletion.** No retention job, account-deletion function or data-export function was found. The live Privacy page lists "Settings: What Waldo knows / Connections / Your data: Export / Delete". The phone app's profile screen has only Connect and Sign out. Which of these exist?
4. **Removing a memory.** No tool or screen deletes a `core_memory` row. What is the route, and do copies in conversation history or logs remain?
5. **Disconnecting.** Does Waldo revoke at Google, and does it delete already-synced rows? Today it does neither.
6. **Tokens.** The migration comment says tokens are encrypted (Vault, pgcrypto), but `oauth-google` stores `access_token` and `refresh_token` as given. Is encryption applied somewhere else?
7. **Sending.** Is there, or will there be, an action that sends an email or message? If so, what does the review step show before send? (The brief's recipient, destination and full words rule has nothing to attach to yet.)
8. **Secrets in memory.** `sync-rescuetime` reads a RescueTime API key from `core_memory`. Memory is shown to the model; keys shouldn't live there.
9. **Access checks found while reading** (not for the website): `disconnect-provider` and the `oauth-google` disconnect and status routes take `user_id` from the request with no sign-in check; `waldo_proposals` has a policy letting the anonymous role read every row (`anon_read_proposals`, `using (true)`). Please confirm these are closed in production.
10. **Telegram and WhatsApp.** Is WhatsApp shipped? The Privacy page lists Telegram only.
11. **Anthropic terms.** "We don't train on your data" and any retention claim depend on the provider terms and the plan used; none is written down in the repo.

## What I did not do

No real service is touched: every control only reveals text, and the one link goes to this site's own `/privacy`. I did not change the real console, send feedback to anyone, or touch the Privacy page copy. The Privacy page itself says things the code doesn't back (see question 3); that is a separate fix.
