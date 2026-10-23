import type { QuizOption } from '../utils/logic';

const mod01IntroImg = '/assets/modules/mod-01-intro.svg';
const mod02CreditImg = '/assets/modules/mod-02-credit.svg';
const mod03CollegeImg = '/assets/modules/mod-03-college.svg';
const mod04TaxesImg = '/assets/modules/mod-04-taxes.svg';
const mod05AccountsImg = '/assets/modules/mod-05-accounts.svg';
const mod06ConsumerImg = '/assets/modules/mod-06-consumer.svg';
const mod07IrlSkillsImg = '/assets/modules/mod-07-irl-skills.svg';
const mod08BanksImg = '/assets/modules/mod-08-banks.svg';
const mod09DebtImg = '/assets/modules/mod-09-debt.svg';
const mod10InvestingImg = '/assets/modules/mod-10-investing.svg';

export type SlideType = 'content' | 'single-choice' | 'select-all';

export interface ContentTakeawayCard {
  label: string;
  metric: string;
  detail: string;
  tone: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
}

export interface ModuleSlide {
  id: string;
  type: SlideType;
  badge: string;
  title: string;
  subtitle: string;
  // For 'content' slides (redesigned visual interactive cards)
  heroCallout?: {
    stat: string;
    headline: string;
    description: string;
  };
  takeawayCards?: ContentTakeawayCard[];
  comparisonRows?: {
    topic: string;
    smartMove: string;
    costlyMistake: string;
  }[];
  proTip?: string;
  interactiveWidget?: 'utilization-sim' | 'hysa-sim' | 'compound-sim' | 'budget-50-30-20';
  // For 'single-choice' and 'select-all' quiz slides
  questionPrompt?: string;
  helperInstruction?: string;
  options?: QuizOption[];
  overallTakeaway?: string;
}

export interface LearningModule {
  id: string;
  numberLabel: string;
  title: string;
  category: string;
  duration: string;
  xpReward: number;
  accentColor: 'emerald' | 'cyan' | 'violet' | 'amber';
  gradientClass: string;
  heroImage: string;
  summary: string;
  keySkills: string[];
  slides: ModuleSlide[];
}

export interface BankItem {
  id: string;
  name: string;
  institutionType: 'All-in-One Fintech' | 'High-Yield Digital Bank' | 'National Branch Bank';
  category: 'HYSA' | 'Hybrid' | 'Traditional';
  categoryTag: 'HYSA' | 'Hybrid' | 'Traditional';
  tagline: string;
  savingsApy: string;
  savingsApyNumeric: number;
  checkingApy: string;
  monthlyFee: string;
  minimumDeposit: string;
  overdraftPolicy: string;
  atmAccess: string;
  fdicInsured: string;
  zelleSupport: string;
  earlyPaycheck: string;
  internationalFee: string;
  standoutPerk: string;
  description: string;
  verdict: string;
  topFeatures: string[];
  watchOutFor: string;
  brandGradient: string;
  badgeCode: string;
  applyUrl: string;
  officialDomain: string;
  preApprovalNote: string;
  searchKeywords: string[];
}

export interface UpfrontCardBenefit {
  rate: string;
  category: string;
  detail: string;
}

export interface CreditCardItem {
  id: string;
  name: string;
  issuer: string;
  network: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  category: 'Groceries & Gas' | 'Dining & Entertainment' | 'Cash Back & Starter' | 'Travel & Rent';
  tagline: string;
  annualFee: string;
  annualFeeNumeric: number;
  introApr: string;
  regularApr: string;
  foreignTxFee: string;
  recommendedCreditScore: string;
  welcomeBonus: string;
  // Requirement #7: Explicit upfront benefits shown BEFORE clicking on the card!
  upfrontBenefits: UpfrontCardBenefit[];
  upfrontSummaryLine: string;
  description: string;
  bestForWho: string;
  extraPerks: string[];
  cardVisual: {
    gradient: string;
    accentGlow: string;
    chipStyle: 'gold' | 'silver';
    numberTail: string;
    issuerBadge: string;
    patternType: 'waves' | 'grid' | 'prism' | 'aurora' | 'metallic';
  };
  applyUrl: string;
  officialDomain: string;
  preApprovalNote: string;
  searchKeywords: string[];
}

export interface IntroSlideItem {
  stepNumber: string;
  kicker: string;
  title: string;
  body: string;
  highlightStat: string;
  highlightLabel: string;
  accentTone: 'emerald' | 'cyan' | 'violet' | 'amber';
  featureBullets: string[];
}

export const POST_SIGNUP_INTRO_SLIDES: IntroSlideItem[] = [
  {
    stepNumber: '01 / 04',
    kicker: 'GETTING AROUND ONIT',
    title: 'Welcome to Onit: Here Is Where Everything Lives.',
    body: 'Use the navigation bar at the top of the screen (or the bottom bar on your phone) to jump between Home, Modules, Credit Cards, Banks, and Compare at any time.',
    highlightStat: '5 Main Tabs',
    highlightLabel: 'Home · Modules · Credit Cards · Banks · Compare',
    accentTone: 'emerald',
    featureBullets: [
      'Home gives you a quick snapshot of your level, XP, module progress, and pinned accounts',
      'Use Settings in the top-right corner to update your profile or replay this guide anytime',
      'Toggle "iPhone View" on desktop if you want to preview the mobile layout',
    ],
  },
  {
    stepNumber: '02 / 04',
    kicker: 'INTERACTIVE LEARNING MODULES',
    title: '10 Practical Modules Covering Real-Life Money Skills.',
    body: 'Open the Modules tab to step through all 10 lessons—from Intro to Financial Literacy, Mastering Credit & Smart Cards, College Finances & Student Aid, and Taxes & Your Take-Home Pay to Bank, Savings & Investment Accounts, Smart Spending, Real-World Money Skills, How Banks Work, Beating Debt, and Investing Beyond Banking.',
    highlightStat: '10 Modules',
    highlightLabel: 'Short, clear lessons with live calculators and interactive quizzes',
    accentTone: 'cyan',
    featureBullets: [
      'Use interactive sliders inside lessons to test credit scores, savings interest, and budgets',
      'Complete quick knowledge checks in each module to earn XP and check your understanding',
      'Your progress and quiz answers are saved automatically as you move between slides',
    ],
  },
  {
    stepNumber: '03 / 04',
    kicker: 'CREDIT CARDS & HIGH-YIELD BANKS',
    title: 'Search & Filter Cards and Bank Accounts in Seconds.',
    body: 'Visit the Credit Cards and Banks tabs to browse top accounts ($250 annual fee or less, and 100% FDIC-insured checking/savings), see key rewards right on each card, and filter by what matters to you.',
    highlightStat: 'Cards & Banks',
    highlightLabel: 'Search by keyword, reward category, interest rate, or account type',
    accentTone: 'violet',
    featureBullets: [
      'Use the search bar (with recent search history) to look up groceries, dining, zero fees, or ATM access',
      'Tap "Inspect Full Specs" on any card or bank to read the full breakdown in plain English',
      'Tap "Apply on Bank Website" to visit the official bank page when you are ready',
    ],
  },
  {
    stepNumber: '04 / 04',
    kicker: 'PINNING & SIDE-BY-SIDE COMPARE',
    title: 'Pin Your Top Choices to Compare Them Side-by-Side.',
    body: 'Not sure which credit card or bank account is the best fit? Tap the "Pin" button on any option to keep it at the top of your list and compare it in the Compare tab.',
    highlightStat: 'Pin & Compare',
    highlightLabel: 'Bookmark your favorite options and compare every detail side-by-side',
    accentTone: 'amber',
    featureBullets: [
      'Tap "Pin" on any credit card or bank to keep your favorites at the top of the list',
      'Open the Compare tab to view your pinned cards or pinned banks side-by-side',
      'Switch between your pinned choices to compare fees, rewards, and interest rates before deciding',
    ],
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  // ============================================================================
  // 1. INTRO TO FINANCIAL LITERACY
  // ============================================================================
  {
    id: 'mod-intro-finlit',
    numberLabel: 'MODULE 01',
    title: 'Intro to Financial Literacy',
    category: 'Money Fundamentals',
    duration: '5 Min Lesson',
    xpReward: 150,
    accentColor: 'emerald',
    gradientClass: 'from-emerald-500/30 via-teal-500/15 to-slate-900/90',
    heroImage: mod01IntroImg,
    summary:
      'Learn the fundamentals of managing money—how income, saving, emergency funds, and simple budgeting habits work together.',
    keySkills: ['Managing Money', '50/30/20 Budget', 'Emergency Fund'],
    slides: [
      {
        id: 'intro-s1',
        type: 'content',
        badge: 'LESSON 1 · THE BASICS',
        title: 'How to Manage Your Money Without Stress',
        subtitle:
          'Financial literacy simply means knowing how to manage the money coming in so your bills are paid, your future is funded, and you still have money left to enjoy life.',
        heroCallout: {
          stat: '50 / 30 / 20',
          headline: '50% Needs · 30% Wants · 20% Savings & Debt Payoff',
          description:
            'Instead of tracking every single dollar by hand, split your take-home pay into three simple buckets: half for essentials, 30% for fun, and 20% for savings or paying off debt.',
        },
        takeawayCards: [
          {
            label: '50% Needs',
            metric: 'Essentials',
            detail: 'Housing/rent, groceries, utilities, transportation, insurance, and minimum loan payments.',
            tone: 'emerald',
          },
          {
            label: '30% Wants',
            metric: 'Lifestyle',
            detail: 'Dining out, hobbies, entertainment, shopping, and subscriptions you enjoy.',
            tone: 'amber',
          },
          {
            label: '20% Savings',
            metric: 'Pay Yourself First',
            detail: 'Move 20% into savings or investments on payday before you spend the rest.',
            tone: 'cyan',
          },
          {
            label: 'Emergency Fund',
            metric: '3–6 Months',
            detail: 'Start with a $500–$1,000 safety net, then build up to 3–6 months of living expenses.',
            tone: 'violet',
          },
        ],
        interactiveWidget: 'budget-50-30-20',
        proTip:
          'Set up an automatic transfer to your savings account on payday. It is much easier to save when the money moves automatically before you see it in checking!',
      },
      {
        id: 'intro-s2',
        type: 'content',
        badge: 'LESSON 2 · SMART HABITS',
        title: 'Needs vs. Wants & Building Your Safety Net',
        subtitle:
          'The secret to getting ahead financially is not making millions—it is spending less than you earn and protecting yourself from unexpected surprises.',
        comparisonRows: [
          {
            topic: 'When You Get Paid',
            smartMove: 'Transfer 10%–20% into savings first ("Pay Yourself First")',
            costlyMistake: 'Spending all month and hoping something is left over to save',
          },
          {
            topic: 'Unexpected Car or Medical Bill',
            smartMove: 'Using your cash Emergency Fund with $0 interest',
            costlyMistake: 'Putting it on a 25% interest credit card with no plan to pay it off',
          },
          {
            topic: 'When Your Income Increases',
            smartMove: 'Increasing your automatic savings rate before upgrading your lifestyle',
            costlyMistake: 'Immediately spending every extra dollar ("Lifestyle Creep")',
          },
        ],
        proTip:
          'Even saving $25 or $50 per paycheck builds the habit. Consistency matters much more than starting with a huge amount.',
      },
      {
        id: 'intro-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Which of These Are Healthy Money Habits?',
        subtitle:
          'Select all correct options below, then tap Check Answer to see what is right (in green) and wrong (in red).',
        questionPrompt:
          'Which of the following habits are part of a strong foundation for managing your money?',
        helperInstruction:
          'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'intro-opt-1',
            label: 'Automatically moving a portion of each paycheck into savings on payday',
            isCorrect: true,
            explanation:
              'Correct! Paying yourself first makes saving automatic so you do not accidentally spend it.',
          },
          {
            id: 'intro-opt-2',
            label: 'Keeping an emergency fund in a safe savings account for unexpected bills',
            isCorrect: true,
            explanation:
              'Correct! An emergency fund keeps unexpected car repairs or medical bills from turning into debt.',
          },
          {
            id: 'intro-opt-3',
            label: 'Waiting until the end of the month to see if any money happens to be left to save',
            isCorrect: false,
            explanation:
              'When cash sits in checking all month, it almost always gets spent. Save first on payday instead.',
          },
          {
            id: 'intro-opt-4',
            label: 'Separating essential Needs (rent, groceries, utilities) from flexible Wants (dining out, shopping)',
            isCorrect: true,
            explanation:
              'Correct! Knowing your essential monthly bills helps you see exactly how much you can safely spend and save.',
          },
        ],
        overallTakeaway:
          'Pay yourself first on payday, know your Needs vs. Wants, and keep an emergency fund for surprises.',
      },
    ],
  },

  // ============================================================================
  // 2. MASTERING CREDIT & SMART CARDS
  // ============================================================================
  {
    id: 'mod-credit',
    numberLabel: 'MODULE 02',
    title: 'Mastering Credit & Smart Cards',
    category: 'Credit Scores & Smart Cards',
    duration: '6 Min Lesson',
    xpReward: 200,
    accentColor: 'cyan',
    gradientClass: 'from-cyan-500/30 via-teal-500/15 to-slate-900/90',
    heroImage: mod02CreditImg,
    summary:
      'Understand credit, credit cards, how your credit score is calculated, and how to use credit cards wisely without paying interest.',
    keySkills: ['How Credit Works', 'Credit Scores (300–850)', 'Paying $0 Interest'],
    slides: [
      {
        id: 'credit-s1',
        type: 'content',
        badge: 'LESSON 1 · HOW CREDIT WORKS',
        title: 'Understanding Your Credit Score (300 to 850)',
        subtitle:
          'A credit score is a 3-digit number (from 300 to 850) that tells lenders how reliably you pay back borrowed money. A higher score unlocks easier approvals and lower interest rates on apartments, car loans, and mortgages.',
        heroCallout: {
          stat: '65% of Score',
          headline: 'Paying On Time (35%) + Keeping Balances Low (30%)',
          description:
            'Two simple habits make up nearly two-thirds of your entire credit score: never missing a payment due date, and using less than 10%–30% of your total credit card limit.',
        },
        takeawayCards: [
          {
            label: 'Payment History',
            metric: '35%',
            detail: 'Always pay at least the minimum on time—and ideally the full statement balance. Turn on Autopay!',
            tone: 'emerald',
          },
          {
            label: 'Credit Used (Utilization)',
            metric: '30%',
            detail: 'How much of your credit limit you are using. Using under 30% is good; under 10% is best.',
            tone: 'cyan',
          },
          {
            label: 'Length of Credit History',
            metric: '15%',
            detail: 'How long your accounts have been open. Keep your oldest $0-annual-fee card open.',
            tone: 'violet',
          },
          {
            label: 'New Credit & Mix',
            metric: '20%',
            detail: '10% types of credit + 10% new applications. Avoid applying for many cards at once.',
            tone: 'amber',
          },
        ],
        interactiveWidget: 'utilization-sim',
        proTip:
          'You NEVER have to carry a balance or pay interest to build a great credit score. Paying your full statement balance every month builds credit for free!',
      },
      {
        id: 'credit-s2',
        type: 'content',
        badge: 'LESSON 2 · USING CARDS WISELY',
        title: 'How to Use a Credit Card Without Paying Interest',
        subtitle:
          'Credit cards give you rewards and fraud protection, but they charge 20%–29% APR interest if you do not pay your statement balance in full.',
        comparisonRows: [
          {
            topic: 'Monthly Payment',
            smartMove: 'Pay the full Statement Balance by the due date ($0 interest)',
            costlyMistake: 'Paying only the $25–$35 minimum payment and paying 24%+ interest',
          },
          {
            topic: 'Statement Closing Date',
            smartMove: 'Keep your balance under 10%–30% of your limit when the monthly statement closes',
            costlyMistake: 'Maxing out your card right before the statement closes',
          },
          {
            topic: 'Treating Your Credit Limit',
            smartMove: 'Only charging what you already have the cash in checking to pay for',
            costlyMistake: 'Treating a $2,000 credit limit like $2,000 of free extra income',
          },
        ],
        proTip:
          'Think of a credit card like a debit card that earns cashback rewards: only buy what you can already afford in cash, and pay the bill in full every month.',
      },
      {
        id: 'credit-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'How Do You Use a Credit Card Wisely?',
        subtitle:
          'Select all correct options below to test your credit knowledge.',
        questionPrompt:
          'You have a credit card with a $2,000 limit. Which of the following actions will help you build a strong credit score without paying interest?',
        helperInstruction:
          'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'c-opt-1',
            label: 'Pay your full statement balance every month before the payment due date',
            isCorrect: true,
            explanation:
              'Correct! Paying the full statement balance by the due date means you pay $0.00 in interest.',
          },
          {
            id: 'c-opt-2',
            label: 'Leave a $500 unpaid balance on the card each month so the bank charges you interest',
            isCorrect: false,
            explanation:
              'Myth! Carrying a balance and paying interest does NOT help your score—it only costs you money.',
          },
          {
            id: 'c-opt-3',
            label: 'Keep your balance low (under 10%–30% of your $2,000 limit)',
            isCorrect: true,
            explanation:
              'Correct! Keeping your balance low relative to your limit helps the 30% Credit Utilization part of your score.',
          },
          {
            id: 'c-opt-4',
            label: 'Turn on Autopay so you never accidentally miss a payment due date',
            isCorrect: true,
            explanation:
              'Correct! On-time payment history is 35% of your credit score—the single biggest factor.',
          },
        ],
        overallTakeaway:
          'Pay on time, pay your statement balance in full to avoid interest, and keep your balance low relative to your credit limit.',
      },
      {
        id: 'credit-q2',
        type: 'single-choice',
        badge: 'QUICK QUESTION · SINGLE CHOICE',
        title: 'When Do Credit Card Companies Charge Interest?',
        subtitle: 'Choose the single best answer below.',
        questionPrompt:
          'If your monthly credit card statement balance is $300 and your minimum payment is $35, how much should you pay by the due date to pay $0 in interest?',
        helperInstruction: 'Select one answer below.',
        options: [
          {
            id: 'cq2-1',
            label: 'The full $300 Statement Balance',
            isCorrect: true,
            explanation:
              'Exactly right! Paying the full $300 statement balance by the due date keeps your grace period active so you pay $0 interest.',
          },
          {
            id: 'cq2-2',
            label: 'Only the $35 Minimum Payment',
            isCorrect: false,
            explanation:
              'Paying only the minimum avoids a late fee, but the remaining $265 will immediately start accruing 20%–29% APR interest.',
          },
          {
            id: 'cq2-3',
            label: '$0 until the end of the year',
            isCorrect: false,
            explanation:
              'Skipping your monthly due date triggers late fees, interest charges, and hurts your credit score.',
          },
        ],
        overallTakeaway:
          'Always pay the full Statement Balance by the due date—not just the minimum payment.',
      },
    ],
  },

  // ============================================================================
  // 3. COLLEGE FINANCES & STUDENT AID
  // ============================================================================
  {
    id: 'mod-university-finances',
    numberLabel: 'MODULE 03',
    title: 'College Finances & Student Aid',
    category: 'College Costs, FAFSA & Aid',
    duration: '5 Min Lesson',
    xpReward: 150,
    accentColor: 'amber',
    gradientClass: 'from-amber-500/30 via-orange-500/15 to-slate-900/90',
    heroImage: mod03CollegeImg,
    summary:
      'Understand college costs, FAFSA, financial aid, scholarships, student loans, and how college expenses affect your taxes.',
    keySkills: ['FAFSA & Grants', 'Federal vs. Private Loans', 'Education Tax Credits'],
    slides: [
      {
        id: 'uni-s1',
        type: 'content',
        badge: 'LESSON 1 · COLLEGE COSTS & FAFSA',
        title: 'Understanding College Costs, FAFSA & Financial Aid',
        subtitle:
          'Almost nobody pays the full "sticker price" of college if they apply for financial aid properly. Understanding the order of financial aid can save you tens of thousands of dollars.',
        heroCallout: {
          stat: 'Free Money First',
          headline: '1. Scholarships & Grants → 2. Work-Study → 3. Federal Loans → 4. Private Loans',
          description:
            'Always submit the FAFSA (Free Application for Federal Student Aid) every year to unlock Pell Grants, state grants, school scholarships, and low-interest federal loans before ever touching private loans.',
        },
        takeawayCards: [
          {
            label: 'Grants & Scholarships',
            metric: '$0 Repaid',
            detail: 'Gift aid (like the Federal Pell Grant or merit scholarships) that you never have to pay back.',
            tone: 'emerald',
          },
          {
            label: 'Federal Direct Subsidized',
            metric: '0% While in School',
            detail: 'The government pays the interest while you are enrolled in school at least half-time.',
            tone: 'cyan',
          },
          {
            label: 'Federal Unsubsidized',
            metric: 'Interest Accrues',
            detail: 'Interest starts adding up right away, even while you are still taking classes.',
            tone: 'amber',
          },
          {
            label: 'Net Price vs Sticker',
            metric: 'True Cost',
            detail: 'Net Price = Total Cost of Attendance (tuition, housing, books) minus Grants and Scholarships.',
            tone: 'violet',
          },
        ],
        proTip:
          'File your FAFSA as early as possible every year—many state and university grant funds are awarded on a first-come, first-served basis!',
      },
      {
        id: 'uni-s2',
        type: 'content',
        badge: 'LESSON 2 · COLLEGE & TAXES',
        title: 'How Scholarships, 529 Plans & College Affect Taxes',
        subtitle:
          'College expenses and financial aid interact directly with tax returns through form 1098-T, tax-free scholarship rules, and education tax credits.',
        comparisonRows: [
          {
            topic: 'Scholarships Used for Tuition & Books',
            smartMove: '100% tax-free when used for tuition, mandatory fees, and required course materials',
            costlyMistake: 'Forgetting that scholarship money used for room & board is generally taxable income',
          },
          {
            topic: 'American Opportunity Tax Credit (AOTC)',
            smartMove: 'Claiming up to $2,500/year in tax credits for the first 4 years of college (Form 1098-T)',
            costlyMistake: 'Not checking your school portal for Form 1098-T at tax time',
          },
          {
            topic: 'Borrowing Student Loans',
            smartMove: 'Only borrowing what you truly need for tuition and essentials',
            costlyMistake: 'Accepting the maximum loan offer to spend on vacations or dining out',
          },
        ],
        proTip:
          'Even after you graduate, you can deduct up to $2,500 of student loan interest paid each year on your federal tax return!',
      },
      {
        id: 'uni-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Smart Ways to Handle University Finances',
        subtitle: 'Select all true statements about college aid, loans, and taxes.',
        questionPrompt:
          'Which of the following are smart and accurate ways to manage college costs and financial aid?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'uni-opt-1',
            label: 'Grants and scholarships are "gift aid" that do not have to be paid back',
            isCorrect: true,
            explanation:
              'Correct! Grants and scholarships reduce your actual cost of college without creating debt.',
          },
          {
            id: 'uni-opt-2',
            label: 'Federal Direct Subsidized Loans do not charge interest while you are enrolled at least half-time',
            isCorrect: true,
            explanation:
              'Correct! The U.S. Department of Education covers the interest on subsidized loans while you are in school.',
          },
          {
            id: 'uni-opt-3',
            label: 'You only need to fill out the FAFSA once during your freshman year and never again',
            isCorrect: false,
            explanation:
              'False! You must submit the FAFSA every single academic year to keep receiving federal and school aid.',
          },
          {
            id: 'uni-opt-4',
            label: 'Form 1098-T from your university helps you or your family claim education tax credits like the AOTC',
            isCorrect: true,
            explanation:
              'Correct! Form 1098-T reports qualified tuition expenses used to claim up to $2,500/year in tax credits.',
          },
        ],
        overallTakeaway:
          'Submit the FAFSA every year, prioritize grants and scholarships, choose federal subsidized loans before unsubsidized or private loans, and save Form 1098-T for taxes.',
      },
    ],
  },

  // ============================================================================
  // 4. TAXES & YOUR TAKE-HOME PAY
  // ============================================================================
  {
    id: 'mod-taxes',
    numberLabel: 'MODULE 04',
    title: 'Taxes & Your Take-Home Pay',
    category: 'Paychecks, Tax Forms & Brackets',
    duration: '5 Min Lesson',
    xpReward: 150,
    accentColor: 'violet',
    gradientClass: 'from-rose-500/25 via-violet-500/15 to-slate-900/90',
    heroImage: mod04TaxesImg,
    summary:
      "Understand payroll tax, income tax, how tax brackets work, and the forms (W-4, W-2, 1099, 1040) you'll use as an employee.",
    keySkills: ['Payroll vs. Income Tax', 'W-4, W-2 & 1099 Forms', 'How Tax Brackets Work'],
    slides: [
      {
        id: 'tax-s1',
        type: 'content',
        badge: 'LESSON 1 · YOUR PAYCHECK',
        title: 'Payroll Tax vs. Income Tax: Where Does Your Paycheck Go?',
        subtitle:
          'When you earn $20/hour for 40 hours, your Gross Pay is $800—but the check deposited into your bank (Net Pay) is smaller because of two main types of taxes.',
        heroCallout: {
          stat: 'Gross vs. Net',
          headline: 'Gross Pay (Total Earned) − Taxes & Deductions = Net Pay (Take-Home Cash)',
          description:
            'Every employee paycheck has two types of tax withholdings: Payroll Taxes (FICA for Social Security and Medicare) and Income Taxes (Federal, State, and sometimes Local).',
        },
        takeawayCards: [
          {
            label: 'Payroll Tax (FICA)',
            metric: '7.65%',
            detail: '6.2% for Social Security + 1.45% for Medicare. Your employer also pays a matching 7.65%.',
            tone: 'rose',
          },
          {
            label: 'Income Tax',
            metric: 'Progressive',
            detail: 'Federal and state tax based on how much you earn. You only pay higher rates on the dollars in higher brackets.',
            tone: 'violet',
          },
          {
            label: 'Standard Deduction',
            metric: 'Tax-Free Base',
            detail: 'The first ~$14,600+ you earn as a single filer is shielded from federal income tax automatically.',
            tone: 'emerald',
          },
          {
            label: 'Tax Refund',
            metric: 'April 15',
            detail: 'If too much income tax was withheld from your paychecks during the year, the IRS refunds the extra!',
            tone: 'cyan',
          },
        ],
        proTip:
          'Getting a raise into a higher tax bracket NEVER makes you take home less money—only the new dollars above the bracket line are taxed at the higher rate!',
      },
      {
        id: 'tax-s2',
        type: 'content',
        badge: 'LESSON 2 · TAX FORMS',
        title: 'The 4 Tax Forms Every Employee & Worker Needs to Know',
        subtitle:
          'Do not let form numbers intimidate you. Each form has one simple job depending on whether you are starting a job, finishing a year, or doing freelance work.',
        comparisonRows: [
          {
            topic: 'Form W-4 (Day 1 of a New Job)',
            smartMove: 'Filled out when hired to tell your employer how much federal income tax to withhold from each paycheck',
            costlyMistake: 'Leaving it blank or claiming exempt when you actually owe taxes',
          },
          {
            topic: 'Form W-2 (Sent by Jan 31)',
            smartMove: 'Sent by your employer showing your total wages and all taxes already withheld for the year',
            costlyMistake: 'Filing your tax return before receiving all W-2s from every job you worked that year',
          },
          {
            topic: 'Form 1099-NEC (Freelance / Gig Work)',
            smartMove: 'Setting aside 20%–30% of gig/freelance pay since no taxes are withheld automatically',
            costlyMistake: 'Spending 100% of DoorDash/freelance income and being surprised by a tax bill in April',
          },
        ],
        proTip:
          'Form 1040 is the actual annual tax return you submit to the IRS by April 15 using the numbers from your W-2 and 1099 forms.',
      },
      {
        id: 'tax-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Understanding Payroll Tax, Income Tax & Forms',
        subtitle: 'Select all true statements below.',
        questionPrompt:
          'Which of the following statements about paychecks and employee tax forms are correct?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'tax-opt-1',
            label: 'Form W-4 is filled out when you start a job to control how much income tax is withheld from your paychecks',
            isCorrect: true,
            explanation:
              'Correct! Your W-4 tells your employer how much federal tax to withhold each payday.',
          },
          {
            id: 'tax-opt-2',
            label: 'Form W-2 is sent by your employer at the end of the year summarizing your earnings and taxes paid',
            isCorrect: true,
            explanation:
              'Correct! Employers send Form W-2 by January 31 so you can file your annual tax return.',
          },
          {
            id: 'tax-opt-3',
            label: 'Payroll taxes (FICA) fund Social Security and Medicare',
            isCorrect: true,
            explanation:
              'Correct! FICA payroll taxes (7.65% for employees) go toward Social Security and Medicare.',
          },
          {
            id: 'tax-opt-4',
            label: 'If a raise pushes you into the next tax bracket, 100% of your entire salary gets taxed at that higher rate',
            isCorrect: false,
            explanation:
              'Common myth! Tax brackets are marginal—only the dollars above the bracket threshold are taxed at the higher rate.',
          },
        ],
        overallTakeaway:
          'Fill out a W-4 when hired, use your W-2 (or 1099) to file your tax return by April 15, and remember that tax brackets only apply to the dollars inside each bracket.',
      },
    ],
  },

  // ============================================================================
  // 5. BANK, SAVINGS & INVESTMENT ACCOUNTS
  // ============================================================================
  {
    id: 'mod-types-of-accounts',
    numberLabel: 'MODULE 05',
    title: 'Bank, Savings & Investment Accounts',
    category: 'Checking, Savings & Investing Accounts',
    duration: '6 Min Lesson',
    xpReward: 200,
    accentColor: 'cyan',
    gradientClass: 'from-sky-500/30 via-cyan-500/15 to-slate-900/90',
    heroImage: mod05AccountsImg,
    summary:
      "Every lesson covers: what the account is, who it's for, and when and why to use it—from Checking and High-Yield Savings to CDs, Roth IRAs, and 401(k)s.",
    keySkills: ['Checking vs. Savings', 'High-Yield Savings (HYSA)', 'Roth IRA & 401(k)'],
    slides: [
      {
        id: 'acct-s1',
        type: 'content',
        badge: 'LESSON 1 · BANK ACCOUNTS',
        title: 'Checking, Regular Savings & High-Yield Savings (HYSA)',
        subtitle:
          'Different accounts are built for different jobs. Keeping all your money in a regular checking account means missing out on hundreds of dollars in free interest.',
        heroCallout: {
          stat: '4.20%–4.50% APY',
          headline: 'Checking Is for Daily Bills · High-Yield Savings Is for Your Cash Reserves',
          description:
            'A traditional bank savings account often pays just 0.01% APY ($0.50/year on $5,000). An FDIC-insured High-Yield Savings Account (HYSA) pays 4.10%–4.50% APY ($225+/year on $5,000) with zero risk.',
        },
        takeawayCards: [
          {
            label: 'Checking Account',
            metric: 'Daily Spending',
            detail: 'What it is: A transaction account with a debit card and direct deposit. Use it for: Paying bills and ATM cash.',
            tone: 'cyan',
          },
          {
            label: 'High-Yield Savings (HYSA)',
            metric: '4.10%–4.50% APY',
            detail: 'What it is: An online FDIC-insured savings account. Use it for: Your emergency fund and short-term goals.',
            tone: 'emerald',
          },
          {
            label: 'Certificate of Deposit (CD)',
            metric: 'Fixed Rate Lock',
            detail: 'What it is: A savings account that locks in a fixed interest rate for 6–24 months. Use it for: Cash you will not touch.',
            tone: 'amber',
          },
          {
            label: 'Money Market Account',
            metric: 'Savings + Checks',
            detail: 'What it is: A hybrid savings account that pays solid interest while offering limited check-writing or debit access.',
            tone: 'violet',
          },
        ],
        interactiveWidget: 'hysa-sim',
        proTip:
          'Keep 1 month of expenses in your Checking account for bills, and move the rest of your cash reserves into a 4.20%+ High-Yield Savings Account!',
      },
      {
        id: 'acct-s2',
        type: 'content',
        badge: 'LESSON 2 · INVESTMENT & RETIREMENT ACCOUNTS',
        title: '401(k), Roth IRA & Standard Brokerage Accounts',
        subtitle:
          'Once your emergency fund is in a High-Yield Savings Account, long-term wealth is built inside investment accounts. Here is who each one is for and when to use it.',
        comparisonRows: [
          {
            topic: '401(k) / 403(b) (Employer Retirement Plan)',
            smartMove: 'For employees: Contribute at least enough to get 100% of your employer match (free money!)',
            costlyMistake: 'Leaving free employer matching dollars on the table',
          },
          {
            topic: 'Roth IRA (Individual Retirement Account)',
            smartMove: 'For anyone with earned income: Put in after-tax money now so all future growth is 100% tax-free in retirement',
            costlyMistake: 'Depositing money into a Roth IRA but forgetting to select an index fund to invest it in',
          },
          {
            topic: 'Standard Taxable Brokerage Account',
            smartMove: 'For medium/long-term goals before retirement: No contribution limits and you can withdraw anytime',
            costlyMistake: 'Investing money you need next month for rent or tuition into the stock market',
          },
        ],
        proTip:
          'You can withdraw your original contributions (what you put in) from a Roth IRA at any time without penalty if a true emergency ever happens.',
      },
      {
        id: 'acct-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Matching the Right Account to the Right Purpose',
        subtitle: 'Select all accurate matches below.',
        questionPrompt:
          'Which of the following statements correctly match the financial account to when and why you should use it?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'acct-opt-1',
            label: 'Use a Checking Account for receiving direct deposits, paying monthly bills, and debit/ATM access',
            isCorrect: true,
            explanation:
              'Correct! Checking accounts are built for frequent everyday transactions and bill payments.',
          },
          {
            id: 'acct-opt-2',
            label: 'Use a High-Yield Savings Account (HYSA) to earn 4.00%+ APY on your emergency fund while keeping it FDIC-insured',
            isCorrect: true,
            explanation:
              'Correct! A High-Yield Savings Account keeps your emergency cash safe, accessible, and earning high interest.',
          },
          {
            id: 'acct-opt-3',
            label: 'Use a Roth IRA to invest earned income so your money grows tax-free for retirement',
            isCorrect: true,
            explanation:
              'Correct! Roth IRAs are one of the best tax-free wealth-building tools for young adults and workers.',
          },
          {
            id: 'acct-opt-4',
            label: 'Lock your monthly rent money inside a 5-year Certificate of Deposit (CD) with early withdrawal penalties',
            isCorrect: false,
            explanation:
              'Wrong move! CDs charge early withdrawal penalties—only put money in a CD if you do not need it until the term ends.',
          },
        ],
        overallTakeaway:
          'Use Checking for daily bills, High-Yield Savings for your emergency fund and 1–3 year goals, and a 401(k) or Roth IRA for long-term investing.',
      },
    ],
  },

  // ============================================================================
  // 6. SMART SPENDING & CONSUMER SKILLS
  // ============================================================================
  {
    id: 'mod-consumer-skills',
    numberLabel: 'MODULE 06',
    title: 'Smart Spending & Consumer Skills',
    category: 'Smart Spending & Money Habits',
    duration: '5 Min Lesson',
    xpReward: 150,
    accentColor: 'emerald',
    gradientClass: 'from-blue-500/30 via-indigo-500/15 to-slate-900/90',
    heroImage: mod06ConsumerImg,
    summary:
      'Learn how to spend, save, and manage income and expenses wisely—from unit pricing and subscription audits to avoiding impulse traps.',
    keySkills: ['Smart Comparison Shopping', 'Subscription Audits', 'Avoiding Impulse Traps'],
    slides: [
      {
        id: 'cons-s1',
        type: 'content',
        badge: 'LESSON 1 · SMART SPENDING',
        title: 'How to Spend Wisely & Spot Marketing Traps',
        subtitle:
          'Stores and apps design checkouts to make you spend more without noticing. Learning a few simple consumer skills helps you keep hundreds of extra dollars a year.',
        heroCallout: {
          stat: 'The 24-Hour Rule',
          headline: 'Wait 24 Hours Before Any Non-Essential Purchase Over $50',
          description:
            'Impulse buying relies on urgency ("Sale ends tonight!"). Leaving an item in your cart for 24 hours eliminates 70% of impulse purchases you would later regret.',
        },
        takeawayCards: [
          {
            label: 'Check Unit Price',
            metric: 'Price per oz',
            detail: 'On grocery shelves, look at the small "price per ounce/unit" tag instead of the big sticker price.',
            tone: 'emerald',
          },
          {
            label: 'Subscription Audit',
            metric: 'Save $50+/mo',
            detail: 'Cancel forgotten free trials and streaming apps you have not opened in the last 30 days.',
            tone: 'rose',
          },
          {
            label: 'Buy Now, Pay Later',
            metric: 'Watch Out',
            detail: 'Splitting a $100 purchase into 4 payments of $25 makes it easy to overspend across multiple orders.',
            tone: 'amber',
          },
          {
            label: 'Cost Per Use',
            metric: 'Quality Math',
            detail: 'A $100 winter coat worn 100 times ($1/use) is a better value than a $40 outfit worn once ($40/use).',
            tone: 'cyan',
          },
        ],
        proTip:
          'Whenever you sign up for a free trial, immediately set a calendar reminder 2 days before it renews—or cancel right away, since most trials still run until the end of the free period!',
      },
      {
        id: 'cons-s2',
        type: 'content',
        badge: 'LESSON 2 · MANAGING EXPENSES',
        title: 'Lowering Your Everyday Bills Without Sacrificing Quality',
        subtitle:
          'Smart consumers focus on trimming recurring monthly expenses once rather than stressing over every small purchase.',
        comparisonRows: [
          {
            topic: 'Grocery & Everyday Shopping',
            smartMove: 'Shopping with a list, comparing unit prices, and using a 3% cashback grocery card paid in full',
            costlyMistake: 'Shopping hungry without a list and paying convenience delivery markups every night',
          },
          {
            topic: 'Recurring Bills (Internet, Phone, Insurance)',
            smartMove: 'Comparing competitor rates once a year to lower your monthly fixed bills',
            costlyMistake: 'Auto-renewing at higher promotional expiration rates for years without checking',
          },
          {
            topic: 'Extended Store Warranties',
            smartMove: 'Skipping overpriced $30 store warranties on small electronics and using your credit card’s free extended warranty perk',
            costlyMistake: 'Buying extended warranties on every cheap gadget you already can afford to replace',
          },
        ],
        proTip:
          'Many no-annual-fee credit cards automatically add 1 extra year of manufacturer warranty protection when you buy electronics with the card!',
      },
      {
        id: 'cons-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Which of These Are Smart Consumer Skills?',
        subtitle: 'Select all smart consumer habits below.',
        questionPrompt:
          'Which of the following actions help you get the best value for your money and avoid overspending?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'cons-opt-1',
            label: 'Comparing the "unit price" (price per ounce or count) at the grocery store',
            isCorrect: true,
            explanation:
              'Correct! Unit pricing reveals which package size or brand actually gives you the most for your money.',
          },
          {
            id: 'cons-opt-2',
            label: 'Waiting 24 hours before buying non-essential items to avoid impulse spending',
            isCorrect: true,
            explanation:
              'Correct! Cooling off for 24 hours prevents emotional impulse buys.',
          },
          {
            id: 'cons-opt-3',
            label: 'Reviewing your bank/card statements to cancel unused monthly subscriptions and free trials',
            isCorrect: true,
            explanation:
              'Correct! Canceling unused subscriptions puts cash right back into your monthly budget.',
          },
          {
            id: 'cons-opt-4',
            label: 'Using "Buy Now, Pay Later" for five different shopping carts at once because each first payment looks small',
            isCorrect: false,
            explanation:
              'Stacking multiple Buy Now, Pay Later plans quickly drains your next paycheck and can trigger late fees.',
          },
        ],
        overallTakeaway:
          'Compare unit prices, use the 24-hour rule on big wants, audit recurring subscriptions, and avoid stacking Buy Now, Pay Later plans.',
      },
    ],
  },

  // ============================================================================
  // 7. REAL-WORLD MONEY SKILLS & LIFE TASKS
  // ============================================================================
  {
    id: 'mod-irl-money-skills',
    numberLabel: 'MODULE 07',
    title: 'Real-World Money Skills & Life Tasks',
    category: 'Everyday Practical Tasks',
    duration: '5 Min Lesson',
    xpReward: 150,
    accentColor: 'violet',
    gradientClass: 'from-violet-500/30 via-purple-500/15 to-slate-900/90',
    heroImage: mod07IrlSkillsImg,
    summary:
      'Everyday tasks that nobody teaches you but everyone needs to know—setting up direct deposit, renting an apartment, writing checks, and spotting scams.',
    keySkills: ['Direct Deposit & Checks', 'Renting an Apartment', 'Spotting Financial Scams'],
    slides: [
      {
        id: 'irl-s1',
        type: 'content',
        badge: 'LESSON 1 · REAL-WORLD BASICS',
        title: 'Everyday Money Tasks Nobody Teaches You in School',
        subtitle:
          'When you start a job, rent an apartment, or set up bills, people expect you to know these practical steps automatically. Here is your cheat sheet.',
        heroCallout: {
          stat: 'Routing + Account #',
          headline: 'How Direct Deposit, Checks & Apartment Leases Work',
          description:
            'Every bank account has two numbers at the bottom of a check or inside your banking app: the 9-digit Routing Number (identifies your bank) and your Account Number (identifies your specific account).',
        },
        takeawayCards: [
          {
            label: 'Setting Up Direct Deposit',
            metric: '9-Digit Routing',
            detail: 'Give HR your bank’s 9-digit Routing Number and your Checking Account Number so your paycheck arrives automatically.',
            tone: 'violet',
          },
          {
            label: 'Renting an Apartment',
            metric: '≤ 30% of Income',
            detail: 'Landlords usually look for gross income of ~3x monthly rent, a credit check, first month’s rent, and a refundable security deposit.',
            tone: 'emerald',
          },
          {
            label: 'Renter’s Insurance',
            metric: '~$12 / month',
            detail: 'Your landlord’s insurance only covers the building—not your laptop, furniture, or clothes if there is a fire, leak, or theft.',
            tone: 'cyan',
          },
          {
            label: 'Cashier’s Check / Money Order',
            metric: 'Guaranteed Funds',
            detail: 'For security deposits or cars, landlords may ask for a Cashier’s Check from your bank so the funds are guaranteed.',
            tone: 'amber',
          },
        ],
        proTip:
          'When moving into a rental apartment, always take photos and a 2-minute video of every room on Day 1 so you get 100% of your security deposit back when you move out!',
      },
      {
        id: 'irl-s2',
        type: 'content',
        badge: 'LESSON 2 · PROTECTING YOURSELF',
        title: 'Spotting Real-Life Scams, Freezing Credit & Reading Bills',
        subtitle:
          'Scammers target young adults and busy professionals through fake bank texts, peer-to-peer payment apps, and fake job offers.',
        comparisonRows: [
          {
            topic: 'Zelle / Venmo / CashApp Payments',
            smartMove: 'Only using Zelle/Venmo with people you personally know and trust (it works like handing someone physical cash)',
            costlyMistake: 'Paying a stranger on Zelle for concert tickets or an apartment before seeing it in person',
          },
          {
            topic: '"Bank Fraud Department" Texts or Calls',
            smartMove: 'Hanging up and calling the official number on the back of your card—never share a 6-digit one-time passcode!',
            costlyMistake: 'Reading a 6-digit security code over the phone to someone claiming to be your bank',
          },
          {
            topic: 'Medical or Service Bills',
            smartMove: 'Always asking for an "Itemized Bill" to catch duplicate or incorrect billing codes before paying',
            costlyMistake: 'Paying a vague summary medical bill without checking if insurance was applied',
          },
        ],
        proTip:
          'Your bank will NEVER call or text you and ask you to read back a 6-digit verification code or Zelle money to "yourself" to stop fraud.',
      },
      {
        id: 'irl-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'IRL Money Skills Check',
        subtitle: 'Select all true statements below.',
        questionPrompt:
          'Which of the following are smart real-world money practices?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'irl-opt-1',
            label: 'Using your bank’s 9-digit Routing Number and your Account Number to set up paycheck direct deposit',
            isCorrect: true,
            explanation:
              'Correct! Those two numbers let your employer deposit your paycheck directly into your account.',
          },
          {
            id: 'irl-opt-2',
            label: 'Taking timestamped photos/video of an apartment on move-in day to protect your security deposit',
            isCorrect: true,
            explanation:
              'Correct! Documenting pre-existing scratches or wear ensures you are not charged for them when moving out.',
          },
          {
            id: 'irl-opt-3',
            label: 'Never sharing a 6-digit one-time security code with anyone who calls or texts you',
            isCorrect: true,
            explanation:
              'Correct! Real banks never ask you to read back a one-time login or transfer code.',
          },
          {
            id: 'irl-opt-4',
            label: 'Sending a $1,000 security deposit via Zelle for an apartment you have never toured in person',
            isCorrect: false,
            explanation:
              'Classic rental scam! Never send Zelle/wire deposits for an apartment before touring it and signing a verified lease.',
          },
        ],
        overallTakeaway:
          'Know where to find your routing and account numbers, document apartment conditions on Day 1, and treat Zelle like physical cash.',
      },
    ],
  },

  // ============================================================================
  // 8. HOW BANKS WORK & ZERO-FEE BANKING
  // ============================================================================
  {
    id: 'mod-how-banks-work',
    numberLabel: 'MODULE 08',
    title: 'How Banks Work & Zero-Fee Banking',
    category: 'Banking Institutions & Safety',
    duration: '4 Min Lesson',
    xpReward: 150,
    accentColor: 'emerald',
    gradientClass: 'from-teal-500/30 via-emerald-500/15 to-slate-900/90',
    heroImage: mod08BanksImg,
    summary:
      'Short module — understanding the institution behind all your accounts, how banks make money, FDIC insurance, and how to avoid bank fees.',
    keySkills: ['How Banks Make Money', 'FDIC $250k Insurance', 'Avoiding Bank Fees'],
    slides: [
      {
        id: 'banks-s1',
        type: 'content',
        badge: 'LESSON 1 · BEHIND THE SCENES',
        title: 'How Banks Work & Keep Your Money Safe',
        subtitle:
          'A bank is not just a vault full of cash. When you deposit money, the bank keeps a reserve on hand and lends out the rest for mortgages, car loans, and business loans.',
        heroCallout: {
          stat: '$250,000 FDIC',
          headline: 'Your Deposits Are Insured by the U.S. Government Up to $250,000',
          description:
            'As long as your bank is FDIC-insured (or NCUA-insured for credit unions), your checking and savings money is 100% protected up to $250,000 per depositor, per bank—even if the bank itself ever fails.',
        },
        takeawayCards: [
          {
            label: 'Net Interest Margin',
            metric: 'How Banks Profit',
            detail: 'Banks charge borrowers 6%–8% on loans and pay savers a portion of that back as savings interest (APY).',
            tone: 'emerald',
          },
          {
            label: 'FDIC / NCUA Insured',
            metric: '$250,000 Safe',
            detail: 'Federal protection guarantees you never lose a penny of insured checking or savings deposits.',
            tone: 'cyan',
          },
          {
            label: 'Online vs. Branch Banks',
            metric: '4.30% vs 0.01%',
            detail: 'Online banks do not pay for thousands of physical buildings, so they pay you 4.00%+ APY instead of 0.01%.',
            tone: 'violet',
          },
          {
            label: 'Credit Unions',
            metric: 'Member-Owned',
            detail: 'Non-profit cooperatives owned by their members, often offering great local auto loan rates and low fees.',
            tone: 'amber',
          },
        ],
        proTip:
          'All checking and savings accounts listed in Onit’s Bank offers are 100% FDIC-insured!',
      },
      {
        id: 'banks-s2',
        type: 'content',
        badge: 'LESSON 2 · ZERO-FEE BANKING',
        title: '3 Bank Fees You Should Never Pay',
        subtitle:
          'Some traditional banks charge fees just for holding your money or accidentally going $5 below zero. Here is how to avoid all three.',
        comparisonRows: [
          {
            topic: 'Monthly Maintenance Fee ($10–$15/mo)',
            smartMove: 'Choosing a $0-monthly-fee checking and savings account with no minimum balance requirement',
            costlyMistake: 'Paying $144/year in monthly fees just to keep an account open',
          },
          {
            topic: 'Overdraft Fee ($35 per transaction)',
            smartMove: 'Turning off debit card overdraft or linking a savings account for free overdraft transfers',
            costlyMistake: 'Buying a $4 coffee when your checking has $2 and getting hit with a $35 overdraft fee',
          },
          {
            topic: 'Out-of-Network ATM Fee ($3–$5)',
            smartMove: 'Using banks with 40,000+ free Allpoint/MoneyPass ATMs or automatic ATM fee refunds',
            costlyMistake: 'Paying $5 to the ATM operator plus $3 to your bank every time you withdraw $20',
          },
        ],
        proTip:
          'You can have both: a free local bank account for depositing cash in person, linked to a 4.20%+ online High-Yield Savings Account!',
      },
      {
        id: 'banks-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'How Do Banks & FDIC Insurance Work?',
        subtitle: 'Select all correct answers below.',
        questionPrompt:
          'Which of the following statements about how banks work are true?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'hb-opt-1',
            label: 'FDIC insurance protects your checking and savings deposits up to $250,000 per depositor, per insured bank',
            isCorrect: true,
            explanation:
              'Correct! FDIC insurance means your money is backed by the U.S. government up to $250,000.',
          },
          {
            id: 'hb-opt-2',
            label: 'Banks make money primarily by lending deposits out at a higher interest rate than they pay savers',
            isCorrect: true,
            explanation:
              'Correct! The difference between what banks earn on loans and what they pay on deposits is how banks operate.',
          },
          {
            id: 'hb-opt-3',
            label: 'Online FDIC-insured banks can pay 4.00%+ APY because they have lower overhead costs than branch banks',
            isCorrect: true,
            explanation:
              'Correct! Without thousands of physical branches to maintain, online banks pass higher interest rates to you.',
          },
          {
            id: 'hb-opt-4',
            label: 'Every bank in America legally requires you to pay a $12 monthly maintenance fee',
            isCorrect: false,
            explanation:
              'False! Many top banks offer $0 monthly fees and $0 minimum balance requirements.',
          },
        ],
        overallTakeaway:
          'Always choose an FDIC-insured bank with $0 monthly fees, $0 overdraft traps, and a strong savings APY.',
      },
    ],
  },

  // ============================================================================
  // 9. BEATING DEBT & PAYOFF STRATEGIES
  // ============================================================================
  {
    id: 'mod-getting-out-of-debt',
    numberLabel: 'MODULE 09',
    title: 'Beating Debt & Payoff Strategies',
    category: 'Debt Payoff Game Plan',
    duration: '5 Min Lesson',
    xpReward: 200,
    accentColor: 'amber',
    gradientClass: 'from-rose-500/30 via-amber-500/15 to-slate-900/90',
    heroImage: mod09DebtImg,
    summary:
      'Get your mindset right, understand how debt builds through compounding interest, and build a clear step-by-step game plan to get out.',
    keySkills: ['Debt Mindset', 'Avalanche vs. Snowball', 'Stopping High Interest'],
    slides: [
      {
        id: 'debt-s1',
        type: 'content',
        badge: 'LESSON 1 · HOW DEBT BUILDS',
        title: 'Getting Your Mindset Right & Understanding How Debt Grows',
        subtitle:
          'If you have debt, take a deep breath: millions of people have been in your shoes and paid it off. The first step is ditching shame and looking clearly at the numbers.',
        heroCallout: {
          stat: '20%–29% APR',
          headline: 'Why Minimum Payments Keep You Stuck—And How to Break the Cycle',
          description:
            'On a $3,000 credit card balance at 24% APR, paying only the minimum payment can take over 10 years and cost thousands in interest. Adding even $50–$100 extra per month cuts years off the timeline!',
        },
        takeawayCards: [
          {
            label: 'Step 1: List Every Debt',
            metric: 'Total Clarity',
            detail: 'Write down each balance, interest rate (APR), and minimum monthly payment in one place.',
            tone: 'emerald',
          },
          {
            label: 'Step 2: Pay All Minimums',
            metric: 'Protect Credit',
            detail: 'Always pay the minimum on every loan/card on time so you never get hit with $35 late fees or score drops.',
            tone: 'cyan',
          },
          {
            label: 'Step 3: Target One Debt',
            metric: 'Focus Extra Cash',
            detail: 'Put all extra payoff dollars toward ONE target debt at a time until it is 100% gone.',
            tone: 'amber',
          },
          {
            label: 'High-APR vs. Low-APR',
            metric: '> 7% Is Urgent',
            detail: 'Credit card debt (20%–29% APR) and payday loans are emergencies; low-rate federal student loans (4%–5%) are lower priority.',
            tone: 'rose',
          },
        ],
        proTip:
          'While paying off high-interest credit card debt, switch to using a debit card or cash for daily spending so the balance only moves in one direction: down!',
      },
      {
        id: 'debt-s2',
        type: 'content',
        badge: 'LESSON 2 · YOUR GAME PLAN',
        title: 'Two Proven Payoff Methods: Debt Avalanche vs. Debt Snowball',
        subtitle:
          'Once you pay the minimum on all debts, there are two famous ways to attack the rest. Pick the one that fits your personality best.',
        comparisonRows: [
          {
            topic: 'The Debt Avalanche (Highest Interest Rate First)',
            smartMove: 'Put all extra money toward the debt with the highest APR (e.g., a 26% credit card)—mathematically saves you the most money',
            costlyMistake: 'Ignoring a 28% APR credit card while paying extra on a 4% student loan',
          },
          {
            topic: 'The Debt Snowball (Smallest Balance First)',
            smartMove: 'Knock out your smallest dollar balance first (e.g., a $300 balance) for a fast psychological win, then roll that payment into the next debt',
            costlyMistake: 'Trying to pay $15 extra on five different debts at once and feeling like nothing is finishing',
          },
          {
            topic: '0% Intro APR Balance Transfer / Lowering Rates',
            smartMove: 'Calling your card issuer to ask for a lower APR or using a 0% balance transfer card while aggressively paying it down',
            costlyMistake: 'Running up new charges on the old card after transferring the balance',
          },
        ],
        proTip:
          'When Debt #1 hits $0, take the entire amount you were paying toward Debt #1 and roll it directly onto Debt #2—your payoff speed snowballs!',
      },
      {
        id: 'debt-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Building Your Debt Payoff Game Plan',
        subtitle: 'Select all true statements below.',
        questionPrompt:
          'Which of the following are effective steps for getting out of debt?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'debt-opt-1',
            label: 'Pay the minimum on every debt on time, then focus all extra money on one target debt at a time',
            isCorrect: true,
            explanation:
              'Correct! Paying minimums protects your credit score while focusing extra cash knocks out debts one by one.',
          },
          {
            id: 'debt-opt-2',
            label: 'Use the Debt Avalanche method (highest interest rate first) to save the most money on interest',
            isCorrect: true,
            explanation:
              'Correct! Attacking the highest APR debt first mathematically minimizes the total interest you pay.',
          },
          {
            id: 'debt-opt-3',
            label: 'Use the Debt Snowball method (smallest balance first) if quick wins help keep you motivated',
            isCorrect: true,
            explanation:
              'Correct! Eliminating small balances quickly builds momentum and frees up monthly cashflow.',
          },
          {
            id: 'debt-opt-4',
            label: 'Stop opening your bills and ignore minimum payments until you can pay the entire balance at once',
            isCorrect: false,
            explanation:
              'Never ignore minimums—missing payments triggers late fees, penalty APRs, and credit score damage.',
          },
        ],
        overallTakeaway:
          'List your debts clearly, pay all minimums on time, and use either the Avalanche (highest APR first) or Snowball (smallest balance first) method to become debt-free.',
      },
    ],
  },

  // ============================================================================
  // 10. INVESTING & TOOLS BEYOND BANKING
  // ============================================================================
  {
    id: 'mod-financial-services',
    numberLabel: 'MODULE 10',
    title: 'Investing & Tools Beyond Banking',
    category: 'Tools Beyond Your Bank Account',
    duration: '6 Min Lesson',
    xpReward: 200,
    accentColor: 'violet',
    gradientClass: 'from-indigo-500/30 via-violet-500/15 to-slate-900/90',
    heroImage: mod10InvestingImg,
    summary:
      'A map of the financial tools available to you beyond just a bank account—investment brokerages, index funds, insurance, and payment apps.',
    keySkills: ['Brokerages & Index Funds', 'Compound Growth', 'Insurance & Payment Apps'],
    slides: [
      {
        id: 'finserv-s1',
        type: 'content',
        badge: 'LESSON 1 · BEYOND A BANK ACCOUNT',
        title: 'A Map of Financial Tools Beyond Your Bank Account',
        subtitle:
          'Banks are built for storing and moving cash safely. To build long-term wealth and protect your life, you use other specialized financial services.',
        heroCallout: {
          stat: 'Compound Growth',
          headline: 'Bank Accounts Protect Your Cash · Investment Brokerages Grow Your Wealth',
          description:
            'Through a low-cost brokerage (like Fidelity, Vanguard, or Schwab), you can buy an S&P 500 or Total Stock Market Index Fund—owning a tiny piece of 500+ top companies at once so your money compounds over time.',
        },
        takeawayCards: [
          {
            label: 'Investment Brokerages',
            metric: 'Index Funds & ETFs',
            detail: 'Platforms where you open a Roth IRA or investment account to buy diversified index funds with ~$0 commissions.',
            tone: 'violet',
          },
          {
            label: 'Insurance Providers',
            metric: 'Risk Protection',
            detail: 'Health, auto, renter’s, and term life insurance protect you from catastrophic bills that could wipe out your savings.',
            tone: 'emerald',
          },
          {
            label: 'Payment Apps (Zelle/Venmo)',
            metric: 'Fast Transfers',
            detail: 'Great for splitting dinner, but do not store large balances inside payment apps—move cash to your FDIC bank!',
            tone: 'cyan',
          },
          {
            label: 'Credit Bureaus',
            metric: 'Experian · Equifax · TransUnion',
            detail: 'The 3 agencies that track your credit report. You can check and freeze your credit with all 3 for $0.',
            tone: 'amber',
          },
        ],
        interactiveWidget: 'compound-sim',
        proTip:
          'Use the interactive Compound Growth slider above to see how investing even $100–$200/month in a low-cost index fund grows over 10, 20, and 30 years!',
      },
      {
        id: 'finserv-s2',
        type: 'content',
        badge: 'LESSON 2 · WHAT TO AVOID',
        title: 'Helpful Financial Services vs. Predatory Traps',
        subtitle:
          'Not every financial company is on your side. Knowing which services build wealth and which ones drain it protects your future.',
        comparisonRows: [
          {
            topic: 'Long-Term Investing',
            smartMove: 'Low-cost S&P 500 or Total Market Index Funds (0.03% fee) held for years',
            costlyMistake: 'High-fee advisors charging 1.5%/yr or day-trading risky hype coins with rent money',
          },
          {
            topic: 'Short-Term Cash Crunch',
            smartMove: 'Using your emergency fund, a credit union small-dollar loan, or a 0% payment plan with your utility/provider',
            costlyMistake: 'Payday loans, check-cashing stores, or car title loans that charge 300%–400% APR!',
          },
          {
            topic: 'Peer-to-Peer Apps (Venmo / CashApp)',
            smartMove: 'Transferring incoming payments straight into your 4.20%+ FDIC-insured bank account',
            costlyMistake: 'Leaving thousands of dollars sitting idle in a payment app earning 0% interest',
          },
        ],
        proTip:
          'Avoid payday loans and check-cashing stores at all costs—their fees often equal 300% to 400% annual interest.',
      },
      {
        id: 'finserv-q1',
        type: 'select-all',
        badge: 'CHECK YOUR KNOWLEDGE · SELECT ALL',
        title: 'Using Financial Services Wisely',
        subtitle: 'Select all true statements below.',
        questionPrompt:
          'Which of the following are smart ways to use financial services beyond your basic bank account?',
        helperInstruction: 'Select ALL options that apply, then tap Check Answer.',
        options: [
          {
            id: 'fs-opt-1',
            label: 'Using a low-cost brokerage account or Roth IRA to invest in diversified S&P 500 / Total Market index funds',
            isCorrect: true,
            explanation:
              'Correct! Index funds let you invest across hundreds of companies at once with ultra-low fees.',
          },
          {
            id: 'fs-opt-2',
            label: 'Transferring cash out of Venmo/CashApp into your FDIC-insured High-Yield Savings Account so it is insured and earning interest',
            isCorrect: true,
            explanation:
              'Correct! Money sitting in payment apps usually earns 0% and may not have automatic FDIC protection.',
          },
          {
            id: 'fs-opt-3',
            label: 'Carrying essential insurance (health, auto, renter’s) to protect your savings from major accidents',
            isCorrect: true,
            explanation:
              'Correct! Insurance transfers catastrophic financial risks away from your personal savings.',
          },
          {
            id: 'fs-opt-4',
            label: 'Using a 400% APR payday loan whenever you want extra weekend spending money',
            isCorrect: false,
            explanation:
              'Never use payday loans! They trap borrowers in a cycle of 300%–400% APR fees.',
          },
        ],
        overallTakeaway:
          'Pair a great FDIC-insured bank with a low-cost investment brokerage for index funds, essential insurance for protection, and zero predatory loans.',
      },
    ],
  },
];

export const BANKS_DATA: BankItem[] = [
  {
    id: 'bank-sofi',
    name: 'SoFi Checking & Savings',
    institutionType: 'All-in-One Fintech',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: 'Up to 4.50% APY savings + 0.50% APY checking with zero monthly account fees.',
    savingsApy: '4.50% APY',
    savingsApyNumeric: 4.5,
    checkingApy: '0.50% APY',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: 'Up to $50 fee-free Overdraft Coverage (with qualifying direct deposit)',
    atmAccess: '55,000+ Fee-Free Allpoint ATMs',
    fdicInsured: 'Up to $2M via SoFi Insured Deposit Program',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Up to 2 days early direct deposit',
    internationalFee: '0% Mastercard Foreign Transaction Fee',
    standoutPerk: 'Up to $300 Direct Deposit Bonus + 20 Custom Savings Vaults',
    description:
      'An all-in-one digital checking and High-Yield Savings powerhouse. Includes up to 20 customizable Savings Vaults, 2-day early paycheck direct deposit, automatic debit round-ups into savings, and 55,000+ fee-free Allpoint ATMs located inside Target, CVS, and Walgreens.',
    verdict:
      'Best all-in-one checking + 4.50% APY savings hub if you have direct deposit (from a job or payroll) and want up to 20 organized Savings Vaults.',
    topFeatures: [
      '4.50% APY on Savings Vaults with qualifying direct deposit (or $5,000/mo deposit)',
      'Zero monthly maintenance fees, zero minimum balance requirements, and zero overdraft fees',
      'Automatic Spare Change Round-Ups transferred straight into your chosen Vault',
    ],
    watchOutFor:
      'Requires a qualifying direct deposit (any amount) or $5,000/mo in deposits to unlock the top 4.50% APY tier (otherwise earns 1.20% APY—if you do not use direct deposit, choose Ally or Capital One 360).',
    brandGradient: 'from-cyan-500/25 via-sky-500/10 to-slate-900/95',
    badgeCode: 'SOFI',
    applyUrl: 'https://www.sofi.com/banking/',
    officialDomain: 'sofi.com',
    preApprovalNote: 'Opens online in ~3 minutes with zero hard credit pull.',
    searchKeywords: ['sofi', '4.50%', 'hysa', 'vaults', 'direct deposit', 'allpoint', 'no fee', 'early paycheck'],
  },
  {
    id: 'bank-ally',
    name: 'Ally Bank Spending & High-Yield Savings',
    institutionType: 'High-Yield Digital Bank',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: '4.20% APY on all balances with zero direct deposit hoops and visual Savings Buckets.',
    savingsApy: '4.20% APY',
    savingsApyNumeric: 4.2,
    checkingApy: '0.25% APY',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 Overdraft Fees + CoverDraft™ up to $250 buffer',
    atmAccess: '43,000+ Allpoint ATMs + $10/mo out-of-network ATM reimbursement',
    fdicInsured: '$250,000 FDIC Insured (Member FDIC)',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Up to 2 days early direct deposit',
    internationalFee: '1% international ATM fee',
    standoutPerk: 'Up to 30 Visual Savings Buckets + $10/mo Out-of-Network ATM Rebate',
    description:
      'Ally is the gold standard for anyone who wants high-yield savings without needing recurring payroll direct deposits. Every dollar earns 4.20% APY from $1 upward, and its visual "Savings Buckets" let you divide one account into up to 30 goals (Emergency Fund, Travel, Car, Rent, Taxes) while reimbursing up to $10/month in out-of-network ATM fees.',
    verdict:
      'Best no-strings-attached 4.20% APY savings account—no direct deposit or minimum balance required, plus up to 30 visual Savings Buckets.',
    topFeatures: [
      '4.20% APY for everyone—no direct deposit or minimum balance required',
      'Up to 30 digital Savings Buckets & automated "Surprise Savings" booster transfers',
      'Reimburses up to $10 per statement cycle for other banks’ ATM operator fees nationwide',
    ],
    watchOutFor:
      '100% online bank—you cannot deposit physical paper cash directly at an ATM (must transfer via ACH or pair with Capital One 360 / local branch for cash).',
    brandGradient: 'from-violet-500/25 via-fuchsia-500/10 to-slate-900/95',
    badgeCode: 'ALLY',
    applyUrl: 'https://www.ally.com/bank/online-savings-account/',
    officialDomain: 'ally.com',
    preApprovalNote: 'No minimum deposit or direct deposit required to earn the full 4.20% APY.',
    searchKeywords: ['ally', '4.20%', 'buckets', 'hysa', 'atm reimbursement', 'zelle', 'no direct deposit'],
  },
  {
    id: 'bank-capone-360',
    name: 'Capital One 360 Checking & Performance Savings',
    institutionType: 'High-Yield Digital Bank',
    category: 'Hybrid',
    categoryTag: 'Hybrid',
    tagline: '4.10% APY savings + physical Capital One Cafés & cash deposit at CVS/Walgreens.',
    savingsApy: '4.10% APY',
    savingsApyNumeric: 4.1,
    checkingApy: '0.10% APY',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 Overdraft Fees + Free Auto-Transfer from Savings',
    atmAccess: '70,000+ Fee-Free Capital One & Allpoint ATMs',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Up to 2 days early direct deposit',
    internationalFee: '$0 Foreign Transaction or International ATM Fees',
    standoutPerk: 'Deposit Physical Cash at CVS/Walgreens + $0 Foreign Debit Card Fees',
    description:
      'Combines high-yield online banking (4.10% APY Performance Savings) with real-world physical convenience. Deposit physical cash right at the register at CVS and Walgreens via the mobile app, enjoy zero foreign transaction fees on the debit card when traveling abroad, and manage your checking, HYSA, and Capital One credit cards inside one top-rated app.',
    verdict:
      'Best hybrid bank for people who want 4.10% APY savings with no minimums plus easy physical cash deposits at CVS & Walgreens.',
    topFeatures: [
      '4.10% APY Performance Savings with zero minimums and instant internal transfers',
      'Deposit physical bills directly into your account at CVS® and Walgreens® registers',
      'Zero foreign transaction fees on the 360 Checking debit card for international travel',
    ],
    watchOutFor:
      'Fewer traditional brick-and-mortar branches than Chase or Bank of America outside major metro hubs.',
    brandGradient: 'from-amber-500/25 via-orange-500/10 to-slate-900/95',
    badgeCode: 'CAP1',
    applyUrl: 'https://www.capitalone.com/bank/',
    officialDomain: 'capitalone.com',
    preApprovalNote: 'Instant online setup; pairs seamlessly with Capital One Savor & Quicksilver cards.',
    searchKeywords: ['capital one', '360', '4.10%', 'cvs', 'cash deposit', 'international', 'no foreign fee', 'hybrid'],
  },
  {
    id: 'bank-chase',
    name: 'Chase Total / College Checking®',
    institutionType: 'National Branch Bank',
    category: 'Traditional',
    categoryTag: 'Traditional',
    tagline: '4,700+ physical branches, 15,000+ Chase ATMs, and up to $300 new checking bonus.',
    savingsApy: '0.01% APY',
    savingsApyNumeric: 0.01,
    checkingApy: '0.00% APY',
    monthlyFee: '$0 w/ Direct Deposit or Student status',
    minimumDeposit: '$0',
    overdraftPolicy: 'Chase Overdraft Assist℠ ($0 fee if overdrawn by $50 or less)',
    atmAccess: '15,000+ Chase ATMs + 4,700+ Physical Branches',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Instant Built-in Zelle®',
    earlyPaycheck: 'Standard ACH settlement',
    internationalFee: '3% foreign debit transaction fee',
    standoutPerk: 'Up to $300 New Checking Bonus + Existing Relationship for Chase Credit Cards',
    description:
      'America’s largest physical branch footprint with two tailored options: Chase Total Checking® (waives the $12 monthly fee with $500+/mo in electronic deposits and offers a $300 new-customer bonus) and Chase College Checking℠ ($0 fee for ages 17–24 with a $100 bonus). Ideal for in-person cashier’s checks, cash deposits, and boosting approval odds for Chase Freedom® & Sapphire® cards.',
    verdict:
      'Best brick-and-mortar checking account for in-person branch access, Zelle, and building a relationship with Chase—pair it with an external 4.20%+ HYSA for your savings.',
    topFeatures: [
      'Up to $300 new Total Checking bonus (or $100 on College Checking)',
      '4,700+ physical branches for cash deposits, cashier’s checks, and in-person support',
      'Establishes an internal Chase banking history that strengthens Chase credit card approvals',
    ],
    watchOutFor:
      'Pays only 0.01% APY on savings and charges $12/mo on Total Checking if waiver requirements are not met—keep your emergency fund in a 4.20%+ HYSA!',
    brandGradient: 'from-blue-500/25 via-indigo-500/10 to-slate-900/95',
    badgeCode: 'CHASE',
    applyUrl: 'https://www.chase.com/personal/checking',
    officialDomain: 'chase.com',
    preApprovalNote: 'Apply online in 5 minutes or at any of 4,700+ Chase branches nationwide.',
    searchKeywords: ['chase', 'college checking', 'total checking', 'branches', 'cash deposit', 'zelle', 'bonus', 'traditional'],
  },
  {
    id: 'bank-schwab',
    name: 'Charles Schwab Bank Investor Checking™',
    institutionType: 'All-in-One Fintech',
    category: 'Hybrid',
    categoryTag: 'Hybrid',
    tagline: 'Unlimited 100% worldwide ATM fee rebates + $0 foreign fees + linked brokerage & Roth IRA.',
    savingsApy: '0.45% Checking (or ~4.4% Money Fund)',
    savingsApyNumeric: 0.45,
    checkingApy: '0.45% APY',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 Overdraft Fees',
    atmAccess: 'Unlimited 100% Rebates at ANY ATM Worldwide',
    fdicInsured: '$250,000 FDIC Insured + SIPC Brokerage Protection',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Standard ACH',
    internationalFee: '$0 Foreign Transaction & $0 Worldwide ATM Fees',
    standoutPerk: '100% Unlimited Worldwide ATM Fee Rebates + Linked Investing & Roth IRA',
    description:
      'The ultimate checking account for travelers and investors. Automatically links to a $0-minimum Schwab One brokerage account (making it effortless to invest in S&P 500 ETFs or a Roth IRA) and reimburses 100% of ATM fees charged by ANY machine anywhere on Earth at the end of every month, with zero foreign exchange markups.',
    verdict:
      'Unbeatable checking account for domestic & international travelers—never hunt for an in-network ATM again, and invest right from the same login.',
    topFeatures: [
      'Use any ATM in any country—Schwab refunds 100% of operator fees every month',
      'Zero foreign transaction fees and real Visa exchange rates for global travel',
      'Directly connected to Schwab Brokerage & Roth IRAs with $0 commission ETFs',
    ],
    watchOutFor:
      'Standard checking yield is 0.45% APY—pair with an external HYSA or purchase Schwab Value Advantage Money Fund (SWVXX) inside the linked brokerage.',
    brandGradient: 'from-emerald-500/25 via-teal-500/10 to-slate-900/95',
    badgeCode: 'SCHWAB',
    applyUrl: 'https://www.schwab.com/checking',
    officialDomain: 'schwab.com',
    preApprovalNote: 'Automatically opens a paired $0-fee Schwab One Brokerage account with zero minimums.',
    searchKeywords: ['schwab', 'investor checking', 'international', 'atm rebate', 'travel', 'study abroad', 'roth ira'],
  },
  {
    id: 'bank-discover',
    name: 'Discover® Cashback Debit & Online Savings',
    institutionType: 'High-Yield Digital Bank',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: '4.10% APY Online Savings + 1% cashback on up to $3,000/mo in debit card purchases.',
    savingsApy: '4.10% APY',
    savingsApyNumeric: 4.1,
    checkingApy: '1% Debit Cashback',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 Overdraft Fees & $0 Insufficient Funds Fees',
    atmAccess: '60,000+ Fee-Free Allpoint & MoneyPass ATMs',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Up to 2 days early direct deposit',
    internationalFee: '$0 Foreign Fee on Discover Network',
    standoutPerk: '1% Cashback on Debit Purchases (Up to $3,000/mo) + 4.10% APY Savings',
    description:
      'Discover combines a 4.10% APY Online Savings account with a unique Cashback Debit checking account that pays 1% cashback on up to $3,000 in debit card purchases each month ($360/year)—with zero monthly fees, zero overdraft fees, free official bank checks, and 24/7 U.S.-based customer service.',
    verdict:
      'Great choice if you want 4.10% APY savings with zero minimums and already use a Discover credit card inside the same mobile app.',
    topFeatures: [
      '4.10% APY Online Savings with $0 minimum deposit and $0 monthly fees',
      '1% cashback on up to $3,000/month in everyday debit card purchases',
      '60,000+ fee-free ATMs nationwide plus free cashier’s checks and paper checks',
    ],
    watchOutFor:
      'Discover debit cards have lower international acceptance outside North America compared to Visa or Mastercard debit cards.',
    brandGradient: 'from-rose-500/25 via-amber-500/10 to-slate-900/95',
    badgeCode: 'DISC',
    applyUrl: 'https://www.discover.com/online-banking/',
    officialDomain: 'discover.com',
    preApprovalNote: 'Opens online in minutes with $0 minimum deposit and 24/7 U.S. support.',
    searchKeywords: ['discover', '4.10%', 'cashback debit', 'hysa', 'no fee', 'online savings'],
  },
];

export const CREDIT_CARDS_DATA: CreditCardItem[] = [
  {
    id: 'card-amex-bce',
    name: 'Blue Cash Everyday® Card',
    issuer: 'American Express',
    network: 'Amex',
    category: 'Groceries & Gas',
    tagline: 'The 3% Triple Threat: 3% on Groceries, 3% on Gas, and 3% on Online Retail Purchases.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: '0% Intro APR for 15 months on purchases',
    regularApr: '19.24%–29.99% Variable',
    foreignTxFee: '2.7%',
    recommendedCreditScore: 'Good to Excellent (670+)',
    welcomeBonus: '$200 Statement Credit (spend $2,000 in 6 months)',
    upfrontBenefits: [
      {
        rate: '3%',
        category: 'Groceries',
        detail: 'U.S. Supermarkets (up to $6,000/yr, then 1%)',
      },
      {
        rate: '3%',
        category: 'Gas Stations',
        detail: 'U.S. Gas Stations (up to $6,000/yr, then 1%)',
      },
      {
        rate: '3%',
        category: 'Online Retail',
        detail: 'Amazon, Target, Walmart, Apple & online stores (up to $6k/yr)',
      },
      {
        rate: '1%',
        category: 'Everything Else',
        detail: 'Unlimited 1% cash back on all other everyday spend',
      },
    ],
    upfrontSummaryLine: '3% on Groceries · 3% on Gas · 3% on Online Retail Purchases (up to $6k/yr each)',
    description:
      'A must-have everyday card for anyone who buys groceries, fills up on gas, and shops online at Amazon, Target.com, Walmart.com, or major retailers. Delivers 3% cash back across all three everyday pillars with a $0 annual fee, plus an $84/year Disney Bundle credit ($7/month statement credit).',
    bestForWho:
      'Spends on weekly supermarket runs, gas, and online shopping and wants 3% back across all three with a $0 annual fee.',
    extraPerks: [
      '$84/year ($7/month) statement credit toward the Disney Bundle (Disney+, Hulu, ESPN+)',
      '$180/year ($15/month) Home Chef meal kit credit',
      'Amex "Apply with Confidence" soft-pull check shows approval before any hard credit inquiry',
    ],
    cardVisual: {
      gradient: 'from-sky-500 via-cyan-600 to-blue-900',
      accentGlow: 'shadow-cyan-500/25',
      chipStyle: 'silver',
      numberTail: '8402',
      issuerBadge: 'AMERICAN EXPRESS',
      patternType: 'prism',
    },
    applyUrl: 'https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/',
    officialDomain: 'americanexpress.com',
    preApprovalNote: 'Amex "Apply with Confidence" lets you see if you are approved with zero impact to your credit score until you accept.',
    searchKeywords: ['amex', 'blue cash everyday', '3%', 'groceries', 'gas', 'online', 'disney', 'no annual fee'],
  },
  {
    id: 'card-capone-savor-student',
    name: 'Capital One SavorOne Rewards',
    issuer: 'Capital One',
    network: 'Mastercard',
    category: 'Dining & Entertainment',
    tagline: 'Unlimited 3% cash back on Dining, Groceries, Entertainment & Streaming with $0 annual fee.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: '0% Intro APR for 15 mos',
    regularApr: '19.99%–29.99% Variable',
    foreignTxFee: '$0 (None)',
    recommendedCreditScore: 'Fair to Excellent (Standard & Student Tiers Available)',
    welcomeBonus: '$200 Cash Bonus (spend $500 in first 3 months)',
    upfrontBenefits: [
      {
        rate: '3%',
        category: 'Dining & Takeout',
        detail: 'Unlimited 3% at restaurants, cafes, bars & food delivery',
      },
      {
        rate: '3%',
        category: 'Groceries',
        detail: 'Unlimited 3% at grocery stores (excluding superstores)',
      },
      {
        rate: '3%',
        category: 'Entertainment & Streaming',
        detail: 'Movies, concerts, sports, Spotify, Netflix & Hulu',
      },
      {
        rate: '8%',
        category: 'CapOne Entertainment',
        detail: '8% back on tickets booked via Capital One Entertainment',
      },
    ],
    upfrontSummaryLine: '3% on Dining · 3% on Groceries · 3% on Entertainment & Streaming · $0 Foreign Fees',
    description:
      'Earn unlimited 3% cash back at restaurants, cafes, grocery stores, movie theaters, concerts, sporting events, and popular streaming services—plus 8% cash back on Capital One Entertainment tickets and $0 foreign transaction fees worldwide.',
    bestForWho:
      'Wants uncapped 3% cash back on both groceries and restaurants plus $0 foreign transaction fees on international trips.',
    extraPerks: [
      '$0 Foreign Transaction Fees—use it anywhere abroad with zero 3% surcharge',
      '5% cash back on hotels and rental cars booked through Capital One Travel',
      'Soft-pull pre-approval tool on CapitalOne.com checks eligibility in 60 seconds',
    ],
    cardVisual: {
      gradient: 'from-orange-500 via-rose-600 to-purple-900',
      accentGlow: 'shadow-rose-500/25',
      chipStyle: 'gold',
      numberTail: '3914',
      issuerBadge: 'CAPITAL ONE',
      patternType: 'aurora',
    },
    applyUrl: 'https://www.capitalone.com/credit-cards/savorone-dining-rewards/',
    officialDomain: 'capitalone.com',
    preApprovalNote: 'Capital One Pre-Approval checks your eligibility in 60 seconds with a 100% soft pull.',
    searchKeywords: ['capital one', 'savor', 'savorone', '3%', 'dining', 'groceries', 'streaming', 'entertainment', 'no foreign fee'],
  },
  {
    id: 'card-discover-it-student',
    name: 'Discover it® Cash Back',
    issuer: 'Discover',
    network: 'Discover',
    category: 'Cash Back & Starter',
    tagline: '5% rotating quarterly categories (Groceries, Gas, Amazon, Dining) + 100% Year-1 Cashback Match.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: '0% Intro APR for 15 months',
    regularApr: '18.24%–27.24% Variable',
    foreignTxFee: '$0 (None)',
    recommendedCreditScore: 'No Credit History to Excellent (600–850)',
    welcomeBonus: 'Unlimited Cashback Match™ (Doubles all Year-1 Cash Back!)',
    upfrontBenefits: [
      {
        rate: '5%',
        category: 'Rotating Categories',
        detail: 'Groceries, Gas, Amazon.com, Dining & Digital Wallets (up to $1,500/qtr)',
      },
      {
        rate: '10%',
        category: 'Effective Year-1 Match',
        detail: '5% quarterly categories become 10% after Year-1 Cashback Match',
      },
      {
        rate: '2%',
        category: 'Year-1 Base Match',
        detail: '1% base rate becomes 2% on everything else in your first year',
      },
      {
        rate: '$0',
        category: 'Annual & Foreign Fee',
        detail: 'Zero annual fee, zero foreign fee, and first late fee waived',
      },
    ],
    upfrontSummaryLine: '5% on Groceries, Gas, Amazon & Apple Pay (Quarterly) + 100% Year-1 Cashback Match',
    description:
      'Earn 5% cash back on rotating quarterly categories (such as Grocery Stores, Gas Stations, Amazon.com, Restaurants, and Digital Wallets/Apple Pay up to $1,500/quarter) and 1% on everything else—then Discover automatically DOUBLES all cash back earned in your entire first year (effectively 10% and 2% in Year 1!).',
    bestForWho:
      'Wants to maximize 5% quarterly categories (Amazon, Groceries, Gas, Restaurants) with a 2x first-year Cashback Match—or is building credit from scratch.',
    extraPerks: [
      'Cashback Match™ automatically doubles every single dollar of rewards at the end of Month 12',
      'Free FICO® Credit Scorecard updated monthly inside the Discover mobile app',
      'No credit score required to apply on the Student tier; soft-pull pre-approval check available',
    ],
    cardVisual: {
      gradient: 'from-violet-600 via-indigo-600 to-amber-500',
      accentGlow: 'shadow-violet-500/25',
      chipStyle: 'silver',
      numberTail: '5519',
      issuerBadge: 'DISCOVER',
      patternType: 'waves',
    },
    applyUrl: 'https://www.discover.com/credit-cards/cash-back/it-card.html',
    officialDomain: 'discover.com',
    preApprovalNote: 'Check if you are pre-approved on Discover.com with zero impact to your credit score.',
    searchKeywords: ['discover', 'discover it', '5%', '10%', 'cashback match', 'starter', 'groceries', 'gas', 'amazon'],
  },
  {
    id: 'card-chase-freedom-rise',
    name: 'Chase Freedom Unlimited®',
    issuer: 'Chase',
    network: 'Visa',
    category: 'Dining & Entertainment',
    tagline: '3% on Dining & Drugstores + 5% Chase Travel + 1.5% unlimited catch-all on everything else.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: '0% Intro APR for 15 months on purchases',
    regularApr: '20.49%–29.24% Variable',
    foreignTxFee: '3%',
    recommendedCreditScore: 'Good to Excellent (670+)',
    welcomeBonus: '$200 Bonus (spend $500 in first 3 months)',
    upfrontBenefits: [
      {
        rate: '3%',
        category: 'Dining & Delivery',
        detail: 'Restaurants, takeout, and eligible delivery services',
      },
      {
        rate: '3%',
        category: 'Drugstores',
        detail: 'CVS, Walgreens, and pharmacy purchases',
      },
      {
        rate: '5%',
        category: 'Chase Travel℠',
        detail: 'Flights, hotels & car rentals booked via Chase Travel',
      },
      {
        rate: '1.5%',
        category: 'All Other Spend',
        detail: 'Unlimited 1.5% floor on every purchase (50% more than 1% cards)',
      },
    ],
    upfrontSummaryLine: '3% on Dining · 3% at Drugstores · 5% on Chase Travel · 1.5% on Everything Else',
    description:
      'The ultimate everyday catch-all card. Instead of settling for 1% on non-category bills (insurance, utilities, medical, auto service, retail), Freedom Unlimited gives an automatic 1.5% floor on everything—plus 3% on dining (including takeout/delivery) and 3% at drugstores (CVS/Walgreens). Points are Chase Ultimate Rewards® that can also combine with Chase Sapphire®.',
    bestForWho:
      'Wants one reliable $0-fee Visa card that earns 3% on dining/drugstores and 1.5% on all household bills and miscellaneous spend.',
    extraPerks: [
      '$200 welcome bonus after spending just $500 in the first 3 months (a 40% return on spend)',
      'Earns Chase Ultimate Rewards® points that never expire as long as the account is open',
      'Includes Purchase Protection (120 days against damage/theft) and Extended Warranty protection',
    ],
    cardVisual: {
      gradient: 'from-blue-600 via-indigo-700 to-slate-900',
      accentGlow: 'shadow-blue-500/25',
      chipStyle: 'silver',
      numberTail: '9041',
      issuerBadge: 'CHASE',
      patternType: 'grid',
    },
    applyUrl: 'https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited',
    officialDomain: 'chase.com',
    preApprovalNote: 'Existing Chase checking customers see elevated approval odds inside the Chase app.',
    searchKeywords: ['chase', 'freedom unlimited', '3%', '1.5%', 'dining', 'drugstores', 'travel', 'visa'],
  },
  {
    id: 'card-bilt-mastercard',
    name: 'Bilt World Elite Mastercard®',
    issuer: 'Bilt Rewards',
    network: 'Mastercard',
    category: 'Travel & Rent',
    tagline: 'Earn 1X points on Rent with ZERO transaction fees + 3X on Dining + 2X on Travel.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: 'N/A (Pay in full monthly)',
    regularApr: '20.49%–29.49% Variable',
    foreignTxFee: '$0 (None)',
    recommendedCreditScore: 'Good to Excellent (670+)',
    welcomeBonus: '5X Points on all eligible purchases for first 5 days',
    upfrontBenefits: [
      {
        rate: '1X',
        category: 'Rent ($0 Tx Fee)',
        detail: 'Earn points on rent via ACH routing/account number or check (up to 100k pts/yr)',
      },
      {
        rate: '3X',
        category: 'Dining & Bars',
        detail: 'Unlimited 3X points at restaurants, cafes, and bars worldwide',
      },
      {
        rate: '2X',
        category: 'Flights & Hotels',
        detail: '2X points on travel booked directly with airlines and hotels',
      },
      {
        rate: '6X',
        category: 'Rent Day (1st of Mo)',
        detail: 'Double points on the 1st of every month (6X Dining, 4X Travel, 2X Other)',
      },
    ],
    upfrontSummaryLine: '1X on Rent with $0 Fee · 3X on Dining · 2X on Travel · 1:1 Hyatt & Airline Transfers',
    description:
      'Rent is the largest monthly expense for millions of people—yet landlords charge a 3% fee to use normal credit cards. Bilt generates a dedicated routing & account number (or mails a paper check) so you earn 1X transferable points on rent up to 100,000 points/year with $0 fee, plus 3X on dining and 1:1 transfers to Hyatt, United, American, and Alaska Airlines.',
    bestForWho:
      'Pays monthly rent ($1,000–$3,500+/mo) and wants to turn rent payments into free flights and Hyatt hotel nights with zero fees.',
    extraPerks: [
      'Points transfer 1:1 to World of Hyatt, Alaska Airlines, United MileagePlus, and Air Canada Aeroplan',
      'Up to $800 in Cell Phone Protection when you pay your monthly wireless bill with Bilt',
      'Zero foreign transaction fees + Trip Cancellation & Auto Rental Collision Damage Waiver',
    ],
    cardVisual: {
      gradient: 'from-neutral-800 via-zinc-900 to-black',
      accentGlow: 'shadow-emerald-500/20',
      chipStyle: 'silver',
      numberTail: '7108',
      issuerBadge: 'BILT REWARDS',
      patternType: 'metallic',
    },
    applyUrl: 'https://www.biltrewards.com/card',
    officialDomain: 'biltrewards.com',
    preApprovalNote: 'Requires making at least 5 transactions per statement period to earn points.',
    searchKeywords: ['bilt', 'rent', 'travel', 'dining', 'hyatt', 'no foreign fee', 'mastercard', 'apartments'],
  },
  {
    id: 'card-citi-double-cash',
    name: 'Citi® Double Cash Card',
    issuer: 'Citi',
    network: 'Mastercard',
    category: 'Cash Back & Starter',
    tagline: 'Unlimited 2% cash back on every purchase (1% when you buy + 1% as you pay) with $0 annual fee.',
    annualFee: '$0',
    annualFeeNumeric: 0,
    introApr: '0% Intro APR for 18 months on Balance Transfers',
    regularApr: '19.24%–29.24% Variable',
    foreignTxFee: '3%',
    recommendedCreditScore: 'Good to Excellent (670+)',
    welcomeBonus: '$200 Cash Back (spend $1,500 in first 6 months)',
    upfrontBenefits: [
      {
        rate: '2%',
        category: 'Everything You Buy',
        detail: '1% unlimited when you buy + 1% as you pay for those purchases',
      },
      {
        rate: '5%',
        category: 'Citi Travel℠ Portal',
        detail: '5% total cash back on hotels, car rentals & attractions in Citi Travel',
      },
      {
        rate: '$200',
        category: 'Welcome Bonus',
        detail: 'Earn $200 (20,000 ThankYou® Points) after $1,500 spend in 6 mos',
      },
      {
        rate: '$0',
        category: 'Annual Fee',
        detail: 'No category tracking, no quarterly activations, $0 annual fee',
      },
    ],
    upfrontSummaryLine: 'Unlimited 2% Cash Back on Every Purchase (1% Buy + 1% Pay) · $200 Welcome Bonus',
    description:
      'One of the simplest, highest-earning flat-rate cards on the market. Earn an automatic 2% cash back on every single purchase—from car repairs and medical bills to taxes, utilities, and shopping—with zero category caps or quarterly activations required.',
    bestForWho:
      'Wants a simple, no-nonsense 2% flat cashback rate on every purchase without tracking categories.',
    extraPerks: [
      'Rewards are earned as Citi ThankYou® Points that can be redeemed for direct deposit cash back',
      'Zero category caps—earn 2% whether you spend $500 or $50,000 a year',
      '24/7 fraud protection and instant virtual card numbers via Citi Entertainment & mobile app',
    ],
    cardVisual: {
      gradient: 'from-emerald-600 via-teal-700 to-cyan-950',
      accentGlow: 'shadow-emerald-500/25',
      chipStyle: 'gold',
      numberTail: '6209',
      issuerBadge: 'CITIBANK',
      patternType: 'waves',
    },
    applyUrl: 'https://www.citi.com/credit-cards/citi-double-cash-credit-card',
    officialDomain: 'citi.com',
    preApprovalNote: 'Use Citi’s online pre-qualification tool to check offers with zero impact to your credit score.',
    searchKeywords: ['citi', 'double cash', '2%', 'flat rate', 'everything', 'cash back', 'no annual fee'],
  },
];
