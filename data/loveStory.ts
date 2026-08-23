// ============================================================================
// data/loveStory.ts
//
// This is the ONLY file you need to edit to personalize the entire website.
// Replace the placeholder names, dates, photos, and messages below with
// your own story. Every section of the site reads from this file.
// ============================================================================

export const names = {
  // Your girlfriend's name — shown throughout the site
  partnerName: "Chinky",
  // Your name — shown on the love letter signature
  yourName: "Keval",
};

// ----------------------------------------------------------------------------
// LANDING SCREEN
// ----------------------------------------------------------------------------
export const landing = {
  greeting: `Hey ${names.partnerName} \u2764\uFE0F`,
  subtitle: "I made something special for you...",
  buttonLabel: "Open My Heart \u2764\uFE0F",
};

// ----------------------------------------------------------------------------
// SECTION 1 — OUR STORY (Timeline)
// ----------------------------------------------------------------------------
export interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  emoji: string;
}

export const timeline: TimelineEvent[] = [
  {
    title: "First Conversation",
    date: "The beginning",
    description:
      "I still remember the nervous excitement of typing that first message, not knowing it would change everything.",
    emoji: "\uD83D\uDCAC",
  },
  {
    title: "First Smile",
    date: "Soon after",
    description:
      "You said something so simple, and I smiled at my phone like an idiot for the rest of the day.",
    emoji: "\uD83D\uDE0A",
  },
  {
    title: "First Memory",
    date: "A day I replay often",
    description:
      "The first time we actually spent time together, and I realized I never wanted that feeling to end.",
    emoji: "\u2728",
  },
  {
    title: "When I Realized You Were Special",
    date: "The moment it clicked",
    description:
      "There wasn't one big moment — just a hundred small ones that quietly added up to 'this one, always this one.'",
    emoji: "\uD83D\uDC96",
  },
  {
    title: "Our Best Memories",
    date: "So many to count",
    description:
      "Every inside joke, every late night talk, every silly argument that ended in laughter — all of it, all of you.",
    emoji: "\uD83C\uDF19",
  },
  {
    title: "Today",
    date: "Right now",
    description:
      "Still here. Still choosing you. Still smiling at my phone like an idiot, honestly.",
    emoji: "\u2764\uFE0F",
  },
];

// ----------------------------------------------------------------------------
// SECTION 2 — REASONS I LOVE YOU
// ----------------------------------------------------------------------------
export interface LoveReason {
  title: string;
  emoji: string;
  message: string;
}

export const loveReasons: LoveReason[] = [
  { title: "Your Smile", emoji: "\u2764\uFE0F", message: "Chinky, your smile has a tiny superpower. Even my worst days feel lighter when I see it." },
  { title: "Your Voice", emoji: "\uD83C\uDFB6", message: "I could listen to you talk about absolutely anything and still wish the conversation would last longer." },
  { title: "Your Little Habits", emoji: "\uD83E\uDD79", message: "The little things you do without thinking have quietly become some of my favorite parts of every day." },
  { title: "The Way You Care", emoji: "\uD83D\uDC97", message: "You notice when people need kindness, and you give it so naturally. That beautiful heart is impossible not to love." },
  { title: "Your Laugh", emoji: "\uD83D\uDE02", message: "Your laugh makes joy feel contagious. I want to be responsible for hearing it as often as possible." },
  { title: "You Make Me Feel Safe", emoji: "\uD83C\uDF19", message: "With you, I can put down every mask and just be myself. That kind of comfort is a rare gift." },
  { title: "Ordinary Days", emoji: "\u2728", message: "You turn a normal day into a memory without even trying. Life feels more colorful with you in it." },
  { title: "Your Beautiful Heart", emoji: "\uD83D\uDC9E", message: "The person you are when nobody is watching is the person I admire most." },
  { title: "The Way You Understand Me", emoji: "\uD83E\uDD0D", message: "You understand the words I say, and sometimes the ones I cannot find. I feel seen by you." },
  { title: "Simply... You", emoji: "\u2764\uFE0F", message: "There is no clever explanation for it. I love the whole, wonderful, impossible-to-replace you." },
];

// ----------------------------------------------------------------------------
// SECTION 3 — LOVE QUOTES
// ----------------------------------------------------------------------------
export const quotes = [
  "Some people make your heart smile without even trying.",
  "If I had to choose again, I would still choose you.",
  "You turned ordinary moments into memories I never want to lose.",
  "I don't need a perfect life. I just want you somewhere in mine.",
  "Maybe forever isn't long enough with you.",
  "Out of all the people in this world, somehow I found you. And I'm so glad I did.",
  "You're not just someone I love. You're someone I want to keep choosing.",
];

// ----------------------------------------------------------------------------
// SECTION 4 — LOVE QUIZ ("How Well Do You Know Us?")
// ----------------------------------------------------------------------------
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number; // index into options that is "correct" for the reveal message
  responseMessage: string; // shown after answering, regardless of choice
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Who fell first?",
    options: ["Me", "You", "We both did \u2764\uFE0F"],
    correctIndex: 2,
    responseMessage: "Honestly? Does it even matter — we landed in the same place.",
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your laugh", "Your kindness", "All of it, honestly"],
    correctIndex: 2,
    responseMessage: "Trick question. It was always going to be all of it.",
  },
  {
    question: "Who says sorry first?",
    options: ["Me", "You", "Whoever misses the other more"],
    correctIndex: 2,
    responseMessage: "That's usually me, if we're being honest.",
  },
  {
    question: "What's our cutest memory?",
    options: [
      "The one we always bring up",
      "The one neither of us mentions but both remember",
      "This one, right now",
    ],
    correctIndex: 2,
    responseMessage: "Every day with you adds one more to the list.",
  },
  {
    question: "Where do I want us to be in the future?",
    options: ["Anywhere", "Somewhere new", "Wherever you are"],
    correctIndex: 2,
    responseMessage: "That one's easy. It was always going to be wherever you are.",
  },
];

export const quizCompleteMessage = {
  title: "Congratulations \u2764\uFE0F",
  subtitle: "You know our story almost as well as I do.",
};

// ----------------------------------------------------------------------------
// SECTION 5 — CATCH THE HEARTS GAME
// ----------------------------------------------------------------------------
export const catchHeartsGame = {
  targetCount: 15,
  counterLabel: "Hearts collected:",
  targetLabel: "Collect 15 hearts \u2764\uFE0F",
  successMessage:
    "You caught my heart... but honestly, you had it from the beginning. \u2764\uFE0F",
  continueButtonLabel: "Continue Our Story \u2192",
};

// ----------------------------------------------------------------------------
// SECTION 6 — THE LOVE LETTER
// ----------------------------------------------------------------------------
export const loveLetter = {
  envelopeText: "I wrote this just for you...",
  salutation: "My Love,",
  paragraphs: [
    "I don't know if words will ever be enough to explain how much you mean to me.",
    "You make my ordinary days feel special.",
    "Your smile, your voice, your little habits, and even the smallest moments we share have become some of my favorite parts of life.",
    "I don't promise that every day will be perfect.",
    "But I promise that whenever life gets difficult, I will always want to stand beside you.",
    "You are not just someone I love.",
    "You are someone I want to keep choosing, again and again.",
    "And now there is just one thing left to ask...",
  ],
  signature: names.yourName,
};

// ----------------------------------------------------------------------------
// SECTION 7 — THE PROPOSAL
// ----------------------------------------------------------------------------
export const proposal = {
  buildupLines: [
    "After everything we've shared...",
    "After every laugh...",
    "Every silly moment...",
    "Every memory...",
    "Every little reason I fell for you...",
  ],
  realization: "I realized something.",
  bigStatement: "I DON'T WANT A FUTURE WITHOUT YOU. \u2764\uFE0F",
  questionIntro: "So I have one question...",
  question: "CHINKY, WILL YOU BE MINE? \uD83D\uDC8D\u2764\uFE0F",
  // Both buttons are intentionally positive — no "no" option, per the brief.
  optionA: "YES \u2764\uFE0F",
  optionB: "OF COURSE YES \uD83E\uDD79",
  celebrationMessage: "YOU JUST MADE ME THE HAPPIEST PERSON ALIVE \u2764\uFE0F",
  afterMessage: "Because I want to be yours. Our story officially begins...",
};

// ----------------------------------------------------------------------------
// SECTION 8 — FINAL MESSAGE
// ----------------------------------------------------------------------------
export const finalMessage = {
  lines: [
    "Thank you for being you.",
    "Thank you for coming into my life.",
    "And thank you for giving me a reason to smile a little more every day.",
  ],
  closing: "Here's to our next chapter. \u2764\uFE0F",
  replayButtonLabel: "Replay Our Story \uD83D\uDD04",
};

// ----------------------------------------------------------------------------
// PROGRESS INDICATOR / NAVIGATION LABELS
// ----------------------------------------------------------------------------
export const progressSteps = [
  "Our Story \u2764\uFE0F",
  "Why I Love You \uD83D\uDC95",
  "Games",
  "Love Letter",
  "The Question",
];

// ----------------------------------------------------------------------------
// SEO / METADATA
// ----------------------------------------------------------------------------
export const siteMeta = {
  title: `For ${names.partnerName} \u2764\uFE0F`,
  description: `A little love story, made by ${names.yourName} for ${names.partnerName}.`,
};
