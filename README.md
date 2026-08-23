# Our Love Story 💕

An interactive, cinematic digital love story that slowly builds toward a proposal — built with Next.js, Framer Motion, and Tailwind CSS.

## 1. Install

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To test the production build (recommended before deploying):

```bash
npm run build
npm start
```

## 3. Customize everything in one place

Almost everything on the site — names, dates, memories, quotes, quiz questions, and the love letter — lives in a single file:

```
data/loveStory.ts
```

Open that file and edit the plain text values. You don't need to touch any component code.

### Change your names

```ts
export const names = {
  partnerName: "Riya",   // her name
  yourName: "Keval",     // your name
};
```

Her name automatically updates the landing screen greeting and page title.

### Edit the timeline ("Our Story")

Edit the `timeline` array — each entry is one milestone card:

```ts
{
  title: "First Conversation",
  date: "March 2024",
  description: "Write what actually happened here.",
  emoji: "💬",
},
```

Add, remove, or reorder entries freely — the timeline renders however many you provide.

### Edit "Reasons I Love You"

Edit the `loveReasons` array. Each entry has a `title`, `emoji`, and personalized `message` revealed when Chinky taps the card.

### Edit the love quotes

Edit the `quotes` array to change the slow, rotating quote chapter. This version intentionally has no photo gallery.

### Edit the quiz ("How Well Do You Know Us?")

Edit the `quizQuestions` array. Each question needs `question`, `options`, and a `responseMessage` shown after she answers (the game isn't scored right/wrong on purpose — every answer gets a warm response).

### Edit the love letter

Edit the `loveLetter` object — `salutation`, the `paragraphs` array (each string becomes its own animated paragraph), and `signature`.

### Edit the proposal

Edit the `proposal` object — the buildup lines, the big statement, the question text, and both button labels. Both buttons are intentionally positive (no "no" option), so keep that spirit if you customize the copy.

### Edit the final message

Edit the `finalMessage` object — the closing lines and the replay button label.

## 4. Project structure

```
app/
  layout.tsx        — fonts, metadata, root HTML shell
  page.tsx           — orchestrates the whole experience & progress state
  globals.css         — theme tokens, glassmorphism, glow effects
components/
  Hero.tsx             — cinematic landing screen
  StoryTimeline.tsx    — Section 1: Our Story
  LoveReasons.tsx      — Section 2: Reasons I Love You
  LoveQuotes.tsx       — Section 3: rotating love quotes
  LoveQuiz.tsx          — Section 4: How Well Do You Know Us?
  CatchHeartsGame.tsx   — Section 5: Catch the Hearts
  LoveLetter.tsx        — Section 6: The Love Letter
  Proposal.tsx           — Section 7: The Proposal
  FinalMessage.tsx        — Section 8: Final Message + replay
  FloatingHearts.tsx        — ambient floating hearts/sparkles
  CursorGlow.tsx              — desktop heart cursor + mouse glow
  ProgressIndicator.tsx          — heartbeat-line progress bar
  LockedSection.tsx                — gates a section until a prior step is done
  SectionWrapper.tsx                — shared section heading/layout
data/
  loveStory.ts                       — ALL editable content lives here
```

Progress (which parts have been unlocked/completed) is saved to the browser's `localStorage`, so if she closes the tab and comes back, she won't have to redo the quiz or the game.

## 5. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect it as a Next.js project — no configuration needed.
4. Click **Deploy**.

That's it — no environment variables, no database, no paid services required.

## Notes

- The site respects `prefers-reduced-motion` — animations are minimized automatically for anyone with that OS setting enabled.
- The heart cursor and mouse-glow effects are desktop-only and won't appear on touch devices.
- Dark "romantic mode" can be toggled with the moon/sun button in the bottom-left corner once the experience begins.
