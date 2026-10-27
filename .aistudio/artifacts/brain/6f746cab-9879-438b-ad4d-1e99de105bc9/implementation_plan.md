# Owner Feedback Refinements Plan

This plan implements every change requested by the app owner to make the credit card browsing more compact, add a dedicated Checking account filter, lock the Badge Battle behind 70% lesson progression upfront, replace exam-like quiz grading with a feel-good green border glow and button confetti, and switch slides and cards to smaller, non-bold typography.

## User Review & Critical Decisions

> [!IMPORTANT]
> All three product clarifications were confirmed and are reflected below. No existing features will be removed outside of the specific adjustments requested by the owner.

- **Confirmed Decision 1 — Checking Account Filter Placement**: Add a dedicated **Checking** filter pill inside the **Banks** tab (`All`, `Pinned`, `Checking`, `HYSA`, `Hybrid`, `Traditional`) so users can filter specifically for checking accounts.
- **Confirmed Decision 2 — Realistic Credit Card Visuals Only on Click**: Remove the credit card preview image from the Cards list items so more cards are visible at once, and display realistic card face artwork (with authentic issuer emblems, metallic textures, and layout geometry) inside the card detail popup when clicked.
- **Confirmed Decision 3 — Smaller, Non-Bold Typography**: Keep the dark theme while changing module slide text, quiz prompts, and card copy to smaller, regular-weight (`font-normal`) text and toning down heavy game-style display labels so text feels light and effortless to read.

---

## 1. Overview & Core Concept

- **What It Does**: Refines the Credit Cards tab, Banks tab, and Modules player based directly on the app owner's walkthrough feedback.
- **Target Audience / Persona**: Gen-Z / young users who want fast, low-friction visual scanning without feeling like they are reading a textbook or taking a school exam.
- **Key Value**:
  1. **Compact Credit Card List + Realistic Card Art on Click**: Users see more credit cards on screen at a glance, and see a realistic visual of the physical card face when they tap into a card's details.
  2. **1-Click Checking Filter**: Users looking specifically to open a checking account can filter for checking accounts with a single tap in the Banks tab.
  3. **Upfront 70% Lock on Badge Battle + Youth-Friendly Wording**: The Module 2 Badge Battle starts locked in the lesson list until 70% of the module's lessons are completed, and uses clear terms like **"time penalty"** instead of "stall".
  4. **Feel-Good Quiz Acknowledgement (No Exam Labels)**: Removes "Correct!" / "Incorrect" / "Correct answer:" exam grading when answering module questions; instead, getting a question right lights up the slide border in emerald green and bursts confetti around the submit button.
  5. **Lighter, Smaller Typography**: Replaces bulky, large bold slide text with smaller, regular-weight (`font-normal`) text that is easy on the eyes.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Credit Cards List → Realistic Card Modal**:
     - In the **Cards** tab, each card row displays the issuer, annual fee, card name, 2×2 reward rate chips, and action buttons—without the large card graphic taking up vertical space.
     - Tapping a card opens the detail modal showcasing a realistic card face design tailored to that specific card (Amex Blue Cash Everyday centurion wave, Discover Chrome brushed metallic, Capital One Savor concentric copper rings, Chase Freedom Unlimited navy emblem, and Bilt obsidian metal).
  2. **Banks Tab → Checking Filter**:
     - Tapping the **Checking** filter button in the Banks tab filters the list to accounts offering checking features and highlights their checking APY/perks.
  3. **Module Lesson List → Locked Badge Battle (Until 70% Lessons Completed)**:
     - When opening Module 2, the Badge Battle item in the lesson list shows a lock icon and `Locked (X% / 70% lessons completed)` until the user completes at least 70% of the regular lessons in the module.
     - Trying to advance from Lesson 12 into the Badge Battle before reaching 70% lesson completion keeps the user gated with a clear progress indicator rather than letting them play first and seeing `Locked (3% / 70%)` afterward.
  4. **Module Slide Player → Green Border Glow + Submit Button Confetti**:
     - Content slides and quiz prompts render in smaller, non-bold (`font-normal`, `text-base sm:text-lg`) typography.
     - When a user gets a quiz question wrong, the app does not flash "Incorrect" or reveal the "Correct answer:" right away—it simply prompts them to try again (and offers `Show Solution` on the 3rd attempt).
     - When a user gets a quiz question right, the slide card border glows emerald green and a particle confetti burst animates directly around the submit button.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Upfront 70% Lesson Progression Gate for Badge Battle**
  - *Chosen Approach*: Calculate the percentage of regular lessons completed in the module (`completedRegularLessons / totalRegularLessons * 100`). Lock the Badge Battle lesson row in the Lesson Selector (and the "Next Lesson" transition into Badge Battle) until that percentage reaches at least 70%.
  - *Why*: Matches the owner's exact expectation that users must earn access to the Badge Battle by completing 70% of the lessons first, rather than playing the battle at 3% and only seeing a lock message at the end.
- **Decision 2: Non-Exam Quiz Feedback (Border Glow + Micro-Confetti)**
  - *Chosen Approach*: Remove the status banner with "Correct!" / "Not quite" and per-row "Correct answer:" labels on wrong tries. On a right answer, animate the slide container border to glowing emerald (`border-emerald-400 ring-2 ring-emerald-400/40 shadow-[0_0_25px_rgba(52,211,153,0.3)]`) and spawn a lightweight CSS/SVG confetti burst anchored to the submit button.
  - *Why*: Eliminates the feeling of being graded on a test while still giving an immediate, rewarding dopamine hit when solved.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              Application State                           │
│   completedModuleIds · answeredQuestions · viewedSlideIds · pinnedIds    │
└───────────────────┬──────────────────────────────────┬───────────────────┘
                    │                                  │
                    ▼                                  ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────┐
│        VaultAndCompareView            │  │       ModulePlayerView        │
│ ───────────────────────────────────── │  │ ───────────────────────────── │
│ • Cards List: Compact (No Card Image) │  │ • Typography: Smaller,        │
│ • Card Detail Modal: Realistic        │  │   regular weight (font-normal)│
│   PhysicalCardVisual per card ID      │  │ • Lesson List: Badge Battle   │
│ • Banks Filter Bar: Adds "Checking"   │  │   locked until ≥70% lessons   │
│   category filter                     │  │ • Badge Battle: Reworded      │
│                                       │  │   "stall" → "time penalty"    │
│                                       │  │ • Quiz Submit: Green border   │
│                                       │  │   glow + button confetti, no  │
│                                       │  │   exam "Correct/Incorrect" UI │
└───────────────────────────────────────┘  └───────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **Credit Cards List & Detail Modal**: Remove `<PhysicalCardVisual />` from the list card grid so cards stack compactly; upgrade `<PhysicalCardVisual />` inside the detail modal with card-specific SVG artwork, realistic EMV chip detailing, network logos (Visa, Mastercard, Amex, Discover), and authentic card face typography.
  - **Banks Filter Logic**: Add `'Checking'` to the Banks category filter bar and update `filterAndSortWithPinnedFirst` so `'Checking'` matches banks with checking accounts.
  - **Badge Battle Gate & Wording**: Compute `lessonCompletionPercent` across non-battle lessons in the module; disable clicking the Badge Battle lesson card when `lessonCompletionPercent < 70` (showing `Locked · X%/70% lessons done`), and replace all instances of `"stall"` / `"Stalling"` with `"time penalty"` / `"Time penalty"`.
  - **Quiz Feedback & Typography**: Replace bold/oversized slide text (`text-xl sm:text-3xl font-bold`) with `text-base sm:text-lg font-normal text-slate-100`, remove "Correct!" / "Correct answer:" labels when wrong, and add an emerald border highlight on the slide container plus a confetti particle burst around the submit button upon solving.
