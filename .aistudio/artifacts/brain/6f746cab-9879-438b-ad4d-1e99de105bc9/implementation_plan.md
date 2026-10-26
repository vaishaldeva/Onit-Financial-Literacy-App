# Onit Redesign: Bite-Sized Curriculum, Click-First Discovery & Interactive Home Hub

This plan restructures **Onit: Own Your Future** around the end user's core product vision: eliminating overwhelming walls of text, restoring the exact one-line-per-slide lesson pacing from the curriculum document, simplifying Credit Cards and Banks to high-level scannable cards with click-first category buttons, and transforming the Home tab into an interactive financial calculator and bank recommendation hub.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> All product decisions below incorporate your confirmed preferences from our clarification step and every point from the end user's feedback.

- **Confirmed Decision 1 — New Home Tab Purpose**: Replace the old Home page (which duplicated module and card lists) with an interactive **Bank & Card Recommendation Survey** (filtering by location/branch preference, current offer priority, and financial goal) paired with the **Interactive Financial Calculators Hub** (Credit Utilization, High-Yield Savings APY, 50/30/20 Budget, and Compound Growth sliders).
- **Confirmed Decision 2 — Three-Step Progressive Module Navigation**: Replace the 2-column text-heavy module cards with a **1-column high-level Module list** (search bar at top, zero paragraph clutter) $\to$ **Lesson list** for the selected module $\to$ **Bite-sized 1-line Slide Player** where each `C` slide is a single digestible thought and each `P` slide is an interactive question.
- **Confirmed Decision 3 — Full Curriculum Restoration + Timed Badge Battle**: Load the complete curriculum from the attached document (`Modules 1–9`, all lessons, all `C` content slides and `P` problem types: Multiple Choice `[MC]`, multi-statement True/False `[T/F]`, Select All `[SA]`, Matching `[MT]`, Drag/Sort/Order `[DD]`, plus the timed **Module 2 Badge Battle & Final Boss**).
- **Confirmed Decision 4 — Click-First Card Categories & High-Level Overviews**: Replace the Credit Card search bar with simple 1-tap reward category buttons (`Groceries`, `Gas`, `Dining`, `Travel`, `Online Shopping`, `Entertainment`, `Student / Starter`, `No Fee`), keep the clean search bar for Banks without cash-back category clutter, and strip paragraph descriptions from the main Cards/Banks feeds so full descriptions only appear when the user taps to inspect a card or bank.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers a fast, zero-friction mobile financial literacy and banking discovery app where young users learn through 1-sentence slides, test their instincts on interactive mini-problems, play with live financial sliders, and find/compare the best student cards and high-yield banks with simple taps.
- **Target Audience / Persona**: Gen-Z / young adult mobile users (ages 16–24) with short attention spans who want immediate clarity, zero textbook walls of text, and effortless tap-based navigation.
- **Key Value**: High retention and organic word-of-mouth growth driven by conversational 1-line pacing, progressive disclosure (high-level overview first, details on click), and practical decision tools.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Home Tab (Interactive Survey + Calculators Hub)**:
   - **Top At-a-Glance Progress Bar**: Compact greeting, current XP, overall curriculum progress bar, and a 1-tap **"Resume Lesson"** button.
   - **Interactive "Find Your Ideal Bank & Card" Survey**: A 3-question tap-only matcher:
     1. *How do you want to bank?* (In-person branches & cash deposits / 100% Online for max APY / Hybrid campus & ATM access)
     2. *What current offer matters most?* (Highest Savings APY / $0-Fee Student Checking / Cash Back & Welcome Bonus)
     3. *What is your main goal right now?* (Build Emergency Savings / Everyday Spending & Bills / Build Credit Score Safely)
     - Immediately outputs personalized Bank and Card matches with 1-tap **Pin** and **View Details** actions.
   - **Interactive Financial Calculators**: Tabbed slider playground featuring **Credit Utilization Impact**, **High-Yield Savings vs. Traditional Bank**, **50/30/20 Monthly Budget**, and **Compound Interest Growth**.

2. **Modules Tab (1-Column List $\to$ Lessons $\to$ 1-Line Slide Player)**:
   - **View A — Single-Column Modules List**:
     - Top curriculum progress bar + keyword search bar.
     - Single-column vertical stack of modules. Each module row displays **only** the Module Number, Title, Lesson Count, XP Badge, and Completion Checkmark—**no summary paragraphs or skill tag clutter**.
   - **View B — Module Overview & Lesson List**:
     - Tapping a module reveals a brief 1-sentence intro and the vertical list of all **Lessons** inside that module (plus the **Badge Battle & Final Boss** in Module 2).
     - Each lesson row shows Lesson Number, Title, Slide count, and status (`Start`, `Resume`, or `Completed`).
   - **View C — Bite-Sized 1-Line Slide Player**:
     - Renders one `C` (Content) or `P` (Problem) slide at a time from the curriculum document.
     - Content slides feature a clean centered layout with 1–2 conversational sentences in large, scannable typography (`18px–22px`).
     - Problem slides support:
       - **Multiple Choice (`[MC]`)**: Single-select option buttons.
       - **Multi-Statement True/False (`[T/F]`)**: Clean row of statements where the user taps `True` or `False` for each statement.
       - **Select All That Apply (`[SA]`)**: Multi-select checklist cards.
       - **Match Terms (`[MT]`)**: Tap-to-pair interactive matching cards.
       - **Sort / Order (`[DD]`)**: Two-bucket category sorting (e.g., *Good when borrowing* vs. *Good when saving*) or numbered sequence ordering (e.g., *First 90 days with a card*).
     - **Module 2 Badge Battle**: Timed challenge where wrong answers trigger a brief stall shake and rotate to the back of the queue until the user clears all questions within the timer, followed by the Final Boss matching round.

3. **Cards & Banks Tabs (Progressive Disclosure & Click-First Filters)**:
   - **Credit Cards Tab**:
     - **Click-Only Category Selector**: One-tap filter buttons (`All`, `Pinned`, `Groceries`, `Gas`, `Dining`, `Online Shopping`, `Travel`, `Entertainment`, `Student / Starter`).
     - **Scannable Card Tile**: Shows only the card artwork, card name, annual fee, and top reward rate badges. All long descriptions, pros/cons, and "Best For" paragraphs are hidden until the user taps **Details**.
   - **Banks Tab**:
     - **Clean Search Bar**: Simple search input at the top without cash-back category pills.
     - **Scannable Bank Tile**: Shows only the bank badge, name, 1-line tagline, Savings APY, Monthly Fee, and ATM network. Long descriptions, bullet lists, and fine-print callouts only appear inside the **Details** modal on click.

### Visual Identity & Theme
- **Aesthetic Direction**: Clean, high-contrast dark fintech mobile interface (`#070B14` canvas) with generous whitespace, zero text clutter, and tactile thumb-zone ergonomics.
- **Color Palette & Mood**: Deep Obsidian (`#070B14`) primary canvas, Slate glass surfaces (`rgba(15, 23, 42, 0.85)`), Emerald (`#34D399`) and Cyan (`#22D3EE`) action accents, Amber (`#FBBF24`) XP and achievement highlights.
- **Typography & Hierarchy**: `Plus Jakarta Sans` / system geometric sans for punchy, high-legibility 1-line lesson slides (`text-lg sm:text-xl font-semibold leading-relaxed`), paired with `tabular-nums` monospace for APY rates, XP counters, and calculator outputs.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Progressive Disclosure Over Upfront Descriptions**
  - *Chosen Approach*: Hide module summaries, card paragraphs, and bank essays from list views; show them only after the user clicks into a module, card, or bank.
  - *Why*: Directly solves the end user's biggest complaint ("wayyy too much text at any given point... scaring the user"). Users scan titles in seconds and only read details they care about.
- **Decision 2: Exact 1-Line Slide Granularity (`C` and `P` Slides)**
  - *Chosen Approach*: Structure each module into its constituent **Lessons**, and each lesson into individual 1-line `C` slides interleaved with `P` quiz slides exactly as written in the attached curriculum PDF.
  - *Why*: Preserves the author's conversational pacing ("one concept at a time... you don't even realize how much you end up reading") rather than dumping multiple paragraphs onto a single slide.
- **Decision 3: Click-First Category Filtering on Credit Cards**
  - *Chosen Approach*: Replace the Credit Card search bar and search history box with direct 1-tap category buttons (`Groceries`, `Gas`, `Dining`, `Travel`, `Student`, etc.).
  - *Why*: Young users often don't know what card name or keyword to type; tapping a spending category like `Groceries` or `Dining` is instant and foolproof.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        App Shell & Per-Account State                    │
│     (Splash -> Auth Gate -> Main Mobile/Desktop Shell + Glass Dock)     │
└───────┬────────────────────────┬──────────────────────┬─────────────────┘
        │                        │                      │
        ▼                        ▼                      ▼
┌───────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐
│   Home Tab View   │  │   Modules Tab View   │  │ Cards / Banks / Compare│
│                   │  │                      │  │                        │
│ • At-a-Glance Bar │  │ • 1-Col Module List  │  │ • Cards: 1-Tap Category│
│ • 3-Step Bank &   │  │   (Title + XP only)  │  │   Buttons + Compact    │
│   Card Matcher    │  │          │           │  │   Tile -> Detail Modal │
│ • 4 Interactive   │  │          ▼           │  │ • Banks: Search Bar +  │
│   Slider          │  │ • Module Lesson List │  │   Compact Tile ->      │
│   Calculators     │  │   (Lessons 1..N)     │  │   Detail Modal         │
│                   │  │          │           │  │ • Compare: Side-by-Side│
│                   │  │          ▼           │  │   Pinned Matrix        │
│                   │  │ • 1-Line C/P Slide   │  │                        │
│                   │  │   Player + Timed     │  │                        │
│                   │  │   Badge Battle       │  │                        │
└───────────────────┘  └──────────────────────┘  └────────────────────────┘
```

### Data Model & State
- **Hierarchical Curriculum Schema (`LearningModule` $\to$ `ModuleLesson` $\to$ `LessonSlide`)**:
  - `LearningModule`: `id`, `numberLabel`, `title`, `category`, `xpReward`, `shortOverview` (shown only after clicking the module), `lessons: ModuleLesson[]`, and optional `badgeBattle`.
  - `ModuleLesson`: `id`, `numberLabel`, `title`, `slides: ModuleSlide[]`.
  - `ModuleSlide`: Supports `content` (1-line conversational text), `mc` (Multiple Choice), `tf` (Multi-statement True/False), `sa` (Select All That Apply), `mt` (Matching pairs), and `dd` (Category Sort or Sequence Order).
- **Per-Account Progress Persistence**:
  - Tracks viewed slides, answered problem records (with 2-try retry before solution reveal), completed lessons, and completed modules (requiring all lessons in the module to be completed with $\ge 70\%$ quiz accuracy before claiming module XP).
