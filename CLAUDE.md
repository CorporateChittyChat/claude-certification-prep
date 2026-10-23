# Claude Certification Prep

Free, unofficial study material for Anthropic's Claude certifications, published as a static GitHub Pages site
(https://corporatechittychat.github.io/claude-certification-prep/). Two tracks are live (CCAO-F, CCDV-F); CCAR-F and
CCAR-P are next and must follow the same build. These rules exist so a new track ships with everything the live tracks
have, in the same shape, and so nothing here ever drifts into claiming to be official.

## Non-negotiables

- **Original material only.** Every question, flashcard, example and worked scenario is written for this project.
  Nothing from, or derived from, any real exam, ever. If a contributor cannot say where a question came from, drop it.
- **Unofficial, and it says so.** Every page footer and every artefact a learner can download or share (badge,
  certificate, recap deck) carries the disclaimer: independent material, not affiliated with, endorsed by or approved by
  Anthropic; not a certification, score or prediction. Certification names are used only to identify what the material
  helps you study for.
- **No product claims the current docs do not support.** Model names, prices, limits and feature names change: read
  them from https://docs.claude.com on the day, say so in the material, and keep the durable judgement (the rule, the
  verb-first choice, the staircase) as the thing being taught.
- **Learner text is data.** Pages render card text, question text and learner input with `textContent`, never
  `innerHTML` with data in it. Progress lives in the browser only (localStorage, every call guarded); no accounts, no
  server, no analytics.
- **Free stays free.** No paywall, no sign-up. The only ask is the coffee link, placed at moments of earned value
  (round done, results screen, certificate), never as a gate.

## Repository shape

```
index.html              home: hero, track cards, video cards, start-here paths, coffee
flashcards.html         flip cards + printable traps sheet (data in flashcards-data.js)
path.html               learning path per track: outcomes, lessons, readiness, certificate (data in path-data.js)
supporters.json         coffee count, written daily by .github/workflows/supporters.yml
<track>/README.md       the track's map: domains or episodes -> guide, video, code
<track>/domains/*.md    one study guide per domain (CCAO-F style) or episode map (CCDV-F style)
<track>/exam-logistics.md, exam-tips.md
<track>/practice/mock-exam.md, mock-exam-answers.md, mock-exam-player.html, episode-questions.md
<track>/assets/         recap deck PDF/PPTX and other printables
```

Track ids are lower-case with the hyphen: `ccao-f`, `ccdv-f`, `ccar-f`, `ccar-p`. They are used as folder names,
URL parameters (`?track=`), localStorage key suffixes and keys in the two data files.

## Launching a new track (CCAR-F, CCAR-P): the checklist

Do these in order; the home page counts and the readiness maths depend on the data files being complete.

1. **Playlist first.** Read the real playlist: count the videos and take each video's length (the playlist page with a
   consent cookie exposes `lengthSeconds`; oEmbed gives titles). Every "N episodes / N videos" on the site must equal
   the playlist count, bonus and wrap-up videos included. Re-check whenever a video is added.
2. **Track folder** with README (domain-or-episode table mapping to guide, video and code), `exam-logistics.md` (with an
   as-of date), `exam-tips.md`, and one study guide per domain in the live tracks' voice: moves, the exam trap in a
   callout, a "Remember" list, a link to the worked question.
3. **Practice.** `episode-questions.md` (one worked question per domain with full trap analysis), a 30-question
   `mock-exam.md` with `mock-exam-answers.md`, and `mock-exam-player.html` copied from a live track. In the player:
   `Q` has `d:"<Domain key> · <label>"` (the key before ` · ` is what `GUIDES` and `examMap` use), the badge tiers and
   `saveResult()` stay as they are, and the result key is `exam-<track>`.
4. **Flashcards.** Add the track to `flashcards-data.js`: topics (name, icon, link) and about 50 cards, roughly five per
   domain, two of them traps. Every card has all of: `f` (front), `b` (one-line answer), `v` (visual), `ex` (in
   practice: a concrete scenario), `hook` (one memorable line). Visual types: `steps` (ordered; `{l, g:1}` marks a
   gate), `vs` (left/right, first item is the heading; `n:1` for neutral instead of fail/works), `list` (`[icon,
   text]`), `stack`, `ladder` (`[name, sub]`), `formula`, `code`, `table` (`h`, `r`), `pills`. Trap fronts are the
   tempting move in quotes; the back says why it fails and what to do instead. Cards restate the track's own guides.
5. **Learning path.** Add the track to `path-data.js`: `outcomes` (5–7, each a verb), `prereqs` (3), `examMap` (exam
   domain key -> flashcard topic index), and sections of lessons. A lesson has `id` (`<2-letter track code>-xx`),
   `title`, `mins` (video length + reading or build estimate), `links` (`[icon, label, url]`, the video label carries
   its length), `t` (flashcard topic index), optional `opt:true` (not needed for the certificate) and `exam:true` on
   the mock-exam lesson. Keep the three-section shape: before you start, the domains or episodes, exam rehearsal.
6. **Home page.** Turn the track's "Coming soon" card and video card into the live shape: status chip, stats row (use
   real numbers), the links list with the learning path as the `feature` link, the mock exam, guides, practice,
   flashcards (say "N illustrated flip cards"), and the video series with its real count. Add the track to the hero
   buttons, the start-here paths and the nav if it has a mock exam. Update README.md and the flashcards/paths blurbs.
7. **Verify live** before pushing (see below), then commit on `main` and push. This repo does not use pull requests.

## Learning-experience rules (what the live tracks do; new tracks match)

- **Course shape** modelled on Anthropic's Skilljar pages: what you'll learn and prerequisites, lessons in order with
  checkboxes and time estimates, one timed mock exam, progress and a completion certificate. Add what Skilljar lacks:
  per-lesson time estimates and a readiness score.
- **Readiness** = lessons done 30% + flashcards known 30% + best mock score 40%; the weakest area combines flashcard
  results and the mock's per-domain split and deep-links to `flashcards.html?track=<t>&topic=<n>`.
- **Certificate** unlocks only when every required lesson is ticked and the best mock score is 67% or better. It names
  the learner, the track, lessons, best score, flashcards known and the date, and carries the disclaimer. It is a
  record of this practice path, never an official credential; never style it to look like one.
- **Every answer teaches three ways:** the rule, a picture of it, a concrete example, plus a hook to remember it by.
- **Exam technique is a topic** in every track: strike the panicker and the do-nothing, compare the last two, pick the
  boring one; AI drafts, a person decides; policy and data sensitivity outrank everything (CCAO-F); if it must always
  hold, enforce it in code (CCDV-F). Write the equivalent theme for the architect tracks once the material exists.
- **Copy voice:** short sentences, British spelling, no hype, the trap named as a trap. Say "practice badge",
  "completion certificate", "readiness", never "certified", "pass guarantee" or "official".

## Verifying changes

- Static site, nothing to build. Serve locally with `python -m http.server 8765 --bind 127.0.0.1` from the repo root
  (file:// is blocked in the browser tools); stop it by PID when done.
- Open the changed page in a headless browser and check: zero console errors, no horizontal overflow at 390 px, the
  data files parse (`node -e` with a `window` stub), every card or lesson has all its fields, counts match the
  playlist. For the path page, simulate `exam-<track>` and `path-done-<track>` in localStorage and confirm the
  readiness number and the certificate unlock, then remove the simulated keys.
- Keep scratch output (screenshots, downloaded pages, scripts) out of this repo and out of any other project folder;
  browser tools that write snapshot files into a project directory must have that directory deleted afterwards.
- Report status honestly: implemented, checked in a browser, or pushed. Pushed to `main` means live within minutes.

## Commits

Commit on `main` and push; one commit per coherent change with a title line and a body that says what changed and why
in plain prose. End with `Co-Authored-By: Claude <model name> <noreply@anthropic.com>` when Claude wrote it.
