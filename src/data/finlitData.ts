import {
  type SlideType,
  type ProblemFormat,
  type ContentTakeawayCard,
  type TfStatementItem,
  type MatchingPairItem,
  type DdBucketItem,
  type DdOrderItem,
  type ModuleSlide,
  type BadgeBattleQuestion,
  type ModuleLesson,
  type LearningModule,
} from './curriculumTypes';
import { CURRICULUM_MODULES_1_TO_5 } from './curriculumModules1To5';
import { CURRICULUM_MODULES_6_TO_10 } from './curriculumModules6To10';

export type {
  SlideType,
  ProblemFormat,
  ContentTakeawayCard,
  TfStatementItem,
  MatchingPairItem,
  DdBucketItem,
  DdOrderItem,
  ModuleSlide,
  BadgeBattleQuestion,
  ModuleLesson,
  LearningModule,
};

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
      'Home gives you interactive financial calculators and a 3-step Bank & Card Recommendation Survey',
      'Use Settings in the top-right corner to update your profile or replay this guide anytime',
      'Toggle "iPhone View" on desktop if you want to preview the mobile layout',
    ],
  },
  {
    stepNumber: '02 / 04',
    kicker: 'BITE-SIZED LEARNING MODULES',
    title: '10 Modules with Quick 1-Line Lessons & Quizzes.',
    body: 'Open the Modules tab to browse all 10 modules in a clean single-column list, pick a lesson, and tap through bite-sized 1-line slides and interactive questions.',
    highlightStat: '10 Modules',
    highlightLabel: 'One concept at a time — no walls of text or boring lectures',
    accentTone: 'cyan',
    featureBullets: [
      'Pick a module to see its lessons, then step through 1-line content slides at your own pace',
      'Test your knowledge with Multiple Choice, True/False, Select All, Matching, and Sort problems',
      'Take on the timed Module 2 Badge Battle & Final Boss to master credit',
    ],
  },
  {
    stepNumber: '03 / 04',
    kicker: 'CREDIT CARDS & HIGH-YIELD BANKS',
    title: 'Filter Cards by Category & Search Banks in Seconds.',
    body: 'Visit the Credit Cards tab to tap simple category filters (Groceries, Gas, Dining, Travel, Starter) and the Banks tab to search top FDIC-insured accounts.',
    highlightStat: 'Cards & Banks',
    highlightLabel: 'High-level overviews first — tap any card or bank for the full breakdown',
    accentTone: 'violet',
    featureBullets: [
      'Tap a category button in Credit Cards to filter instantly without needing to know what to type',
      'See key rewards and APYs at a glance, then tap "Full Details" only when you want the deep dive',
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
      'Unpin or swap options anytime as you narrow down your favorite accounts',
    ],
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  ...CURRICULUM_MODULES_1_TO_5,
  ...CURRICULUM_MODULES_6_TO_10,
];

export const BANKS_DATA: BankItem[] = [
  {
    id: 'bank-sofi',
    name: 'SoFi Checking & Savings',
    institutionType: 'All-in-One Fintech',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: 'Best for direct deposit & 20 custom savings vaults',
    savingsApy: '4.50%',
    savingsApyNumeric: 4.5,
    checkingApy: '0.50%',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: 'Up to $50 fee-free buffer',
    atmAccess: '55,000+ Allpoint ATMs',
    fdicInsured: 'Up to $2M FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: '2-day early paycheck',
    internationalFee: '$0 foreign fee',
    standoutPerk: 'Up to $300 bonus + 20 Savings Vaults',
    description:
      'All-in-one digital checking and 4.50% APY savings with up to 20 custom Vaults and 2-day early paychecks.',
    verdict:
      'Top pick if you have direct deposit from a job.',
    topFeatures: [
      '4.50% APY on savings with direct deposit',
      'Up to 20 custom Savings Vaults + auto round-ups',
      '55,000+ fee-free ATMs at Target, CVS & Walgreens',
    ],
    watchOutFor:
      'Needs direct deposit to unlock 4.50% APY (otherwise 1.20% APY).',
    brandGradient: 'from-cyan-500/25 via-sky-500/10 to-slate-900/95',
    badgeCode: 'SOFI',
    applyUrl: 'https://www.sofi.com/banking/',
    officialDomain: 'sofi.com',
    preApprovalNote: 'Opens online in 3 mins · No credit score impact.',
    searchKeywords: ['checking', 'sofi', '4.50%', 'hysa', 'vaults', 'direct deposit', 'allpoint', 'no fee', 'early paycheck'],
  },
  {
    id: 'bank-ally',
    name: 'Ally Bank High-Yield Savings',
    institutionType: 'High-Yield Digital Bank',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: 'Best for 4.20% APY with zero direct deposit needed',
    savingsApy: '4.20%',
    savingsApyNumeric: 4.2,
    checkingApy: '0.25%',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 overdraft fees',
    atmAccess: '43,000+ ATMs + $10/mo rebate',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: '2-day early paycheck',
    internationalFee: '1% foreign fee',
    standoutPerk: '30 Savings Buckets + $10/mo ATM rebate',
    description:
      'Earns 4.20% APY on every dollar with no direct deposit required, plus up to 30 visual Savings Buckets.',
    verdict:
      'Best 4.20% APY account if you do not have direct deposit.',
    topFeatures: [
      '4.20% APY for everyone — no direct deposit needed',
      'Up to 30 visual Savings Buckets for separate goals',
      'Refunds up to $10/month in out-of-network ATM fees',
    ],
    watchOutFor:
      'Online-only — cannot deposit physical paper cash directly.',
    brandGradient: 'from-violet-500/25 via-fuchsia-500/10 to-slate-900/95',
    badgeCode: 'ALLY',
    applyUrl: 'https://www.ally.com/bank/online-savings-account/',
    officialDomain: 'ally.com',
    preApprovalNote: '$0 minimum and no direct deposit required.',
    searchKeywords: ['ally', '4.20%', 'buckets', 'hysa', 'atm reimbursement', 'zelle', 'no direct deposit'],
  },
  {
    id: 'bank-capone-360',
    name: 'Capital One 360',
    institutionType: 'High-Yield Digital Bank',
    category: 'Hybrid',
    categoryTag: 'Hybrid',
    tagline: 'Best for 4.10% APY + cash deposits at CVS & Walgreens',
    savingsApy: '4.10%',
    savingsApyNumeric: 4.1,
    checkingApy: '0.10%',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 overdraft fees',
    atmAccess: '70,000+ Fee-Free ATMs',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: '2-day early paycheck',
    internationalFee: '$0 foreign fees',
    standoutPerk: 'Cash deposits at CVS/Walgreens + $0 foreign fees',
    description:
      '4.10% APY savings with zero minimums, physical cash deposits at CVS & Walgreens, and $0 foreign debit fees.',
    verdict:
      'Best hybrid bank for high APY plus physical cash deposits.',
    topFeatures: [
      '4.10% APY savings with $0 minimums or requirements',
      'Deposit physical cash right at CVS® & Walgreens® registers',
      '$0 foreign transaction fees when traveling abroad',
    ],
    watchOutFor:
      'Fewer physical branches than Chase outside major cities.',
    brandGradient: 'from-amber-500/25 via-orange-500/10 to-slate-900/95',
    badgeCode: 'CAP1',
    applyUrl: 'https://www.capitalone.com/bank/',
    officialDomain: 'capitalone.com',
    preApprovalNote: 'Pairs in one app with Capital One Savor & Quicksilver cards.',
    searchKeywords: ['checking', 'capital one', '360', '4.10%', 'cvs', 'cash deposit', 'international', 'no foreign fee', 'hybrid'],
  },
  {
    id: 'bank-chase',
    name: 'Chase College / Total Checking®',
    institutionType: 'National Branch Bank',
    category: 'Traditional',
    categoryTag: 'Traditional',
    tagline: 'Best for 4,700+ walk-in branches & up to $300 bonus',
    savingsApy: '0.01%',
    savingsApyNumeric: 0.01,
    checkingApy: '0.00%',
    monthlyFee: '$0 Student / Direct Dep.',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 fee if overdrawn ≤ $50',
    atmAccess: '15,000+ ATMs & 4,700+ Branches',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Standard ACH',
    internationalFee: '3% foreign fee',
    standoutPerk: 'Up to $300 bonus + 4,700+ local branches',
    description:
      'America’s largest branch network. $0 monthly fee for college students (ages 17–24) or with direct deposit.',
    verdict:
      'Best for walk-in branches and cash — pair with a 4%+ HYSA for savings.',
    topFeatures: [
      'Up to $300 new Total Checking bonus ($100 College bonus)',
      '4,700+ walk-in branches for cash & in-person help',
      'Boosts approval odds for Chase Freedom® credit cards',
    ],
    watchOutFor:
      'Pays only 0.01% APY on savings — keep savings in a 4%+ HYSA.',
    brandGradient: 'from-blue-500/25 via-indigo-500/10 to-slate-900/95',
    badgeCode: 'CHASE',
    applyUrl: 'https://www.chase.com/personal/checking',
    officialDomain: 'chase.com',
    preApprovalNote: 'Open online in 5 mins or at any Chase branch.',
    searchKeywords: ['checking', 'chase', 'college checking', 'total checking', 'branches', 'cash deposit', 'zelle', 'bonus', 'traditional'],
  },
  {
    id: 'bank-schwab',
    name: 'Charles Schwab Investor Checking™',
    institutionType: 'All-in-One Fintech',
    category: 'Hybrid',
    categoryTag: 'Hybrid',
    tagline: 'Best for 100% worldwide ATM rebates & Roth IRA',
    savingsApy: '0.45%',
    savingsApyNumeric: 0.45,
    checkingApy: '0.45%',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 overdraft fees',
    atmAccess: '100% Free ATMs Worldwide',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: 'Standard ACH',
    internationalFee: '$0 foreign & ATM fees',
    standoutPerk: 'Unlimited worldwide ATM fee rebates',
    description:
      'Refunds 100% of ATM fees at any machine worldwide, charges $0 foreign fees, and links to a Roth IRA / brokerage.',
    verdict:
      'Unbeatable checking account for travel and investing.',
    topFeatures: [
      '100% unlimited ATM fee rebates at any ATM worldwide',
      '$0 foreign transaction fees for international travel',
      'Linked $0-minimum brokerage & Roth IRA account',
    ],
    watchOutFor:
      'Checking pays 0.45% APY — use money market or external HYSA for big savings.',
    brandGradient: 'from-emerald-500/25 via-teal-500/10 to-slate-900/95',
    badgeCode: 'SCHWAB',
    applyUrl: 'https://www.schwab.com/checking',
    officialDomain: 'schwab.com',
    preApprovalNote: 'Includes a linked $0-fee Schwab brokerage account.',
    searchKeywords: ['checking', 'schwab', 'investor checking', 'international', 'atm rebate', 'travel', 'study abroad', 'roth ira'],
  },
  {
    id: 'bank-discover',
    name: 'Discover® Online Savings & Debit',
    institutionType: 'High-Yield Digital Bank',
    category: 'HYSA',
    categoryTag: 'HYSA',
    tagline: 'Best for 4.10% APY + 1% cashback on debit swipes',
    savingsApy: '4.10%',
    savingsApyNumeric: 4.1,
    checkingApy: '1% Debit Cashback',
    monthlyFee: '$0',
    minimumDeposit: '$0',
    overdraftPolicy: '$0 overdraft fees',
    atmAccess: '60,000+ Fee-Free ATMs',
    fdicInsured: '$250,000 FDIC Insured',
    zelleSupport: 'Built-in Zelle®',
    earlyPaycheck: '2-day early paycheck',
    internationalFee: '$0 foreign fee',
    standoutPerk: '1% cashback on debit card + 4.10% APY savings',
    description:
      'Combines a 4.10% APY savings account with a checking card that earns 1% cashback on debit purchases.',
    verdict:
      'Great if you want 4.10% APY plus 1% back on debit card purchases.',
    topFeatures: [
      '4.10% APY savings with $0 minimum or monthly fees',
      '1% cashback on up to $3,000/mo in debit card purchases',
      '60,000+ fee-free Allpoint & MoneyPass ATMs nationwide',
    ],
    watchOutFor:
      'Discover debit is less accepted outside North America than Visa/Mastercard.',
    brandGradient: 'from-rose-500/25 via-amber-500/10 to-slate-900/95',
    badgeCode: 'DISC',
    applyUrl: 'https://www.discover.com/online-banking/',
    officialDomain: 'discover.com',
    preApprovalNote: '$0 minimum deposit + 24/7 U.S. support.',
    searchKeywords: ['checking', 'discover', '4.10%', 'cashback debit', 'hysa', 'no fee', 'online savings'],
  },
];

export const CREDIT_CARDS_DATA: CreditCardItem[] = [
  {
    id: 'card-amex-bce',
    name: 'Blue Cash Everyday® Card',
    issuer: 'American Express',
    network: 'Amex',
    category: 'Groceries & Gas',
    tagline: '3% on Groceries, 3% on Gas, and 3% on Online Retail Purchases.',
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
    upfrontSummaryLine: '3% Groceries · 3% Gas · 3% Online Shopping',
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
    searchKeywords: ['amex', 'blue cash everyday', '3%', 'groceries', 'gas', 'online', 'online shopping', 'disney', 'no annual fee'],
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
        category: 'Entertainment',
        detail: 'Movies, concerts, sports, Spotify, Netflix & Hulu',
      },
      {
        rate: '8%',
        category: 'CapOne Entertainment',
        detail: '8% back on tickets booked via Capital One Entertainment',
      },
    ],
    upfrontSummaryLine: '3% Dining · 3% Groceries · 3% Entertainment · $0 Foreign Fees',
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
    searchKeywords: ['capital one', 'savor', 'savorone', '3%', 'dining', 'groceries', 'streaming', 'entertainment', 'travel', 'starter', 'student', 'no foreign fee'],
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
        category: 'Year-1 Match',
        detail: '5% quarterly categories become 10% after Year-1 Cashback Match',
      },
      {
        rate: '2%',
        category: 'Year-1 Base Match',
        detail: '1% base rate becomes 2% on everything else in your first year',
      },
      {
        rate: '$0',
        category: 'Annual Fee',
        detail: 'Zero annual fee, zero foreign fee, and first late fee waived',
      },
    ],
    upfrontSummaryLine: '5% Rotating Categories + 2x First-Year Cashback Match',
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
    searchKeywords: ['discover', 'discover it', '5%', '10%', 'cashback match', 'starter', 'student', 'groceries', 'gas', 'online shopping', 'amazon', 'all purchases'],
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
        category: 'All Purchases',
        detail: 'Unlimited 1.5% floor on every purchase (50% more than 1% cards)',
      },
    ],
    upfrontSummaryLine: '3% Dining · 3% Drugstores · 5% Travel · 1.5% All Purchases',
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
    searchKeywords: ['chase', 'freedom unlimited', '3%', '1.5%', 'dining', 'drugstores', 'travel', 'visa', 'all purchases'],
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
    upfrontSummaryLine: '1X Rent ($0 Fee) · 3X Dining · 2X Travel · $0 Foreign Fees',
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
        category: 'All Purchases',
        detail: '1% unlimited when you buy + 1% as you pay for those purchases',
      },
      {
        rate: '5%',
        category: 'Citi Travel℠',
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
    upfrontSummaryLine: 'Unlimited 2% Cash Back on All Purchases · $200 Bonus',
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
    searchKeywords: ['citi', 'double cash', '2%', 'flat rate', 'everything', 'all purchases', 'starter', 'cash back', 'no annual fee'],
  },
];
