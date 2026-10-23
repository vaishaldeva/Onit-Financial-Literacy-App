# Onit: Own Your Future

**Onit: Own Your Future** is a mobile-first personal finance learning platform, credit card vault, and high-yield banking comparison app built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Post-Signup Onboarding Tour**: Account creation & sign-in flow followed by a 4-step interactive onboarding guide.
- **Interactive Learning Modules & Live Simulators**:
  - **Module 01 — Credit Score Mastery**: Interactive FICO Score Simulator & Credit Utilization calculator.
  - **Module 02 — High-Yield Banking**: Live High-Yield Savings (HYSA) vs. Traditional Bank APY compound interest visualizer.
  - **Module 03 — Investing & Wealth**: Index funds, Roth IRA vs. 401(k), and compound growth playbooks.
  - **Module 04 — Cashflow & 50/30/20**: Interactive 50/30/20 monthly take-home pay allocator.
- **Smart "Select All That Apply" Quizzes**:
  - Immediate per-option visual feedback showing which selected options are right (`SELECTED · RIGHT`), which are wrong (`SELECTED · WRONG`), and which correct choices were missed (`MISSED · RIGHT`).
  - Persistent question memory so navigating back and forth between slides never resets solved questions.
- **Credit Card & High-Yield Bank Vault**:
  - Realistic physical card artwork and upfront reward multiplier grids (`3%` Groceries, Gas, Online Retail, etc.) visible before clicking.
  - Real-time search and category filters across cards and banks.
  - Direct **Apply on Bank Website** links for every card and bank.
- **Pin & Side-by-Side Compare**:
  - Pin favorite credit cards and banks to keep them anchored at the top of the list.
  - Compare pinned cards or pinned banks side-by-side in the **Compare** tab.
- **Mobile-First & iPhone View Ready**:
  - Responsive layout tailored for iPhone and mobile viewports (`375px–430px`) as well as desktop browsers.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Type-check with TypeScript
npm run lint

# Build for production
npm run build
```
