export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

export type OptionDiagnosticStatus =
  | 'correct-selected'
  | 'wrong-selected'
  | 'missed-correct'
  | 'neutral-unselected';

export interface OptionEvaluation {
  optionId: string;
  label: string;
  isCorrect: boolean;
  wasSelected: boolean;
  status: OptionDiagnosticStatus;
  statusBadgeText: string;
  explanation: string;
}

export interface QuestionEvaluationResult {
  isFullyCorrect: boolean;
  correctSelectedCount: number;
  wrongSelectedCount: number;
  missedCorrectCount: number;
  totalCorrectRequired: number;
  scoreDelta: number;
  summaryMessage: string;
  optionBreakdown: OptionEvaluation[];
}

export interface AnsweredQuestionRecord {
  key: string;
  moduleId: string;
  slideId: string;
  selectedOptionIds: string[];
  evaluation: QuestionEvaluationResult;
  attemptsCount: number;
  answeredAt: number;
}

export interface PinnableItem {
  id: string;
  name: string;
  category: string;
  searchKeywords?: string[];
  description?: string;
}

export type CheckoutCategoryKey =
  | 'groceries'
  | 'gas'
  | 'dining'
  | 'online'
  | 'rent'
  | 'travel';

export interface CheckoutSwipeCardInput {
  id: string;
  name: string;
  issuer: string;
  foreignTxFee: string;
  categoryRates: Record<CheckoutCategoryKey, number>;
}

export interface RankedCheckoutCard {
  id: string;
  name: string;
  issuer: string;
  isPinned: boolean;
  ratePercent: number;
  estimatedRewardDollars: number;
}

export interface TrackedSubscriptionItem {
  id: string;
  name: string;
  category: string;
  monthlyCost: number;
  daysUntilRenewal: number;
  isStudentTrial: boolean;
  status: 'active' | 'canceled';
}

/**
 * Evaluates a Select-All-That-Apply or Single-Choice question, returning
 * exact per-option diagnostics so the user sees which selected answers are
 * right, which selected answers are wrong, and which right answers were missed.
 */
export function evaluateQuestionSelection(
  options: QuizOption[],
  selectedIds: string[]
): QuestionEvaluationResult {
  const selectedSet = new Set(selectedIds);
  let correctSelectedCount = 0;
  let wrongSelectedCount = 0;
  let missedCorrectCount = 0;
  let totalCorrectRequired = 0;

  const optionBreakdown: OptionEvaluation[] = options.map((opt) => {
    const wasSelected = selectedSet.has(opt.id);
    if (opt.isCorrect) {
      totalCorrectRequired += 1;
    }

    let status: OptionDiagnosticStatus;
    let statusBadgeText: string;

    if (wasSelected && opt.isCorrect) {
      correctSelectedCount += 1;
      status = 'correct-selected';
      statusBadgeText = 'Correct Selection';
    } else if (wasSelected && !opt.isCorrect) {
      wrongSelectedCount += 1;
      status = 'wrong-selected';
      statusBadgeText = 'Incorrect Selection';
    } else if (!wasSelected && opt.isCorrect) {
      missedCorrectCount += 1;
      status = 'missed-correct';
      statusBadgeText = 'Missed Right Answer';
    } else {
      status = 'neutral-unselected';
      statusBadgeText = 'Not Selected (Incorrect Option)';
    }

    return {
      optionId: opt.id,
      label: opt.label,
      isCorrect: opt.isCorrect,
      wasSelected,
      status,
      statusBadgeText,
      explanation: opt.explanation,
    };
  });

  const isFullyCorrect =
    wrongSelectedCount === 0 &&
    missedCorrectCount === 0 &&
    correctSelectedCount === totalCorrectRequired &&
    totalCorrectRequired > 0;

  // XP is awarded strictly at the module level upon module completion
  const scoreDelta = 0;

  let summaryMessage = '';
  if (isFullyCorrect) {
    summaryMessage = `Spot on! You identified all ${totalCorrectRequired} correct factor${totalCorrectRequired > 1 ? 's' : ''} with zero false picks.`;
  } else {
    const parts: string[] = [];
    if (correctSelectedCount > 0) {
      parts.push(`${correctSelectedCount} right selection${correctSelectedCount > 1 ? 's' : ''}`);
    }
    if (wrongSelectedCount > 0) {
      parts.push(`${wrongSelectedCount} wrong selection${wrongSelectedCount > 1 ? 's' : ''}`);
    }
    if (missedCorrectCount > 0) {
      parts.push(`${missedCorrectCount} missed right answer${missedCorrectCount > 1 ? 's' : ''}`);
    }
    summaryMessage = `Breakdown: ${parts.join(' · ')}.`;
  }

  return {
    isFullyCorrect,
    correctSelectedCount,
    wrongSelectedCount,
    missedCorrectCount,
    totalCorrectRequired,
    scoreDelta,
    summaryMessage,
    optionBreakdown,
  };
}

/**
 * Builds the canonical persistence key for a question slide so navigating
 * Back after answering a question preserves the answered state and never re-gives it.
 */
export function getQuestionHistoryKey(moduleId: string, slideId: string): string {
  return `${moduleId}:${slideId}`;
}

export function recordAnsweredQuestion(
  history: Record<string, AnsweredQuestionRecord>,
  moduleId: string,
  slideId: string,
  selectedOptionIds: string[],
  options: QuizOption[],
  timestamp = Date.now()
): Record<string, AnsweredQuestionRecord> {
  const key = getQuestionHistoryKey(moduleId, slideId);
  const prevRecord = history[key];
  const attemptsCount = (prevRecord?.attemptsCount || 0) + 1;
  const evaluation = evaluateQuestionSelection(options, selectedOptionIds);
  return {
    ...history,
    [key]: {
      key,
      moduleId,
      slideId,
      selectedOptionIds: [...selectedOptionIds],
      evaluation,
      attemptsCount,
      answeredAt: timestamp,
    },
  };
}

/**
 * Pinned items are ALWAYS kept at the top before category and search filtering.
 */
export function filterAndSortWithPinnedFirst<T extends PinnableItem>(
  items: T[],
  pinnedIds: string[],
  searchQuery: string,
  categoryFilter: string | string[]
): T[] {
  const pinnedSet = new Set(pinnedIds);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const rawCategories = Array.isArray(categoryFilter)
    ? categoryFilter
    : [categoryFilter];
  const normalizedCategories = rawCategories
    .map((c) => c.trim().toLowerCase())
    .filter((c) => c.length > 0 && c !== 'all');

  // Step 1: Order with pinned items at the very top first (preserving original relative order)
  const orderedWithPinnedTop = [...items].sort((a, b) => {
    const aPinned = pinnedSet.has(a.id) ? 1 : 0;
    const bPinned = pinnedSet.has(b.id) ? 1 : 0;
    return bPinned - aPinned;
  });

  // Step 2: Apply multi-category (AND) and search filters while keeping pinned items at the top
  return orderedWithPinnedTop.filter((item) => {
    const itemKeywords = (item.searchKeywords || []).map((k) => k.toLowerCase());
    const itemCategoryLower = item.category.toLowerCase();

    const matchesAllCategories =
      normalizedCategories.length === 0 ||
      normalizedCategories.every((cat) => {
        if (cat === 'pinned') {
          return pinnedSet.has(item.id);
        }
        return (
          itemCategoryLower === cat ||
          itemCategoryLower.includes(cat) ||
          itemKeywords.some((kw) => kw === cat || kw.includes(cat))
        );
      });

    if (!matchesAllCategories) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      item.name,
      item.category,
      item.description || '',
      ...(item.searchKeywords || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

/**
 * Returns only the items that the user has explicitly pinned for the Compare Studio.
 */
export function getPinnedComparableItems<T extends { id: string }>(
  items: T[],
  pinnedIds: string[]
): T[] {
  const pinnedSet = new Set(pinnedIds);
  return items.filter((item) => pinnedSet.has(item.id));
}

/**
 * Toggles an item ID in a pinned ID array.
 */
export function togglePinnedId(pinnedIds: string[], targetId: string): string[] {
  if (pinnedIds.includes(targetId)) {
    return pinnedIds.filter((id) => id !== targetId);
  }
  return [targetId, ...pinnedIds];
}

/**
 * Calculates projected HYSA compound balance vs traditional bank 0.01% APY.
 */
export function calculateHysaComparison(
  initialDeposit: number,
  monthlyContribution: number,
  hysaApyPercent: number,
  years: number
): {
  hysaTotal: number;
  hysaInterestEarned: number;
  traditionalTotal: number;
  traditionalInterestEarned: number;
  extraEarnedWithHysa: number;
} {
  const months = Math.max(1, Math.round(years * 12));
  const hysaMonthlyRate = hysaApyPercent / 100 / 12;
  const tradMonthlyRate = 0.01 / 100 / 12;

  let hysaBalance = initialDeposit;
  let tradBalance = initialDeposit;
  const totalPrincipal = initialDeposit + monthlyContribution * months;

  for (let m = 0; m < months; m++) {
    hysaBalance = (hysaBalance + monthlyContribution) * (1 + hysaMonthlyRate);
    tradBalance = (tradBalance + monthlyContribution) * (1 + tradMonthlyRate);
  }

  const hysaTotal = Math.round(hysaBalance);
  const traditionalTotal = Math.round(tradBalance);
  const hysaInterestEarned = Math.max(0, hysaTotal - totalPrincipal);
  const traditionalInterestEarned = Math.max(0, traditionalTotal - totalPrincipal);

  return {
    hysaTotal,
    hysaInterestEarned,
    traditionalTotal,
    traditionalInterestEarned,
    extraEarnedWithHysa: Math.max(0, hysaInterestEarned - traditionalInterestEarned),
  };
}

/**
 * Estimates credit score impact from utilization ratio.
 */
export function estimateUtilizationImpact(
  creditLimit: number,
  statementBalance: number
): {
  utilizationPercent: number;
  tierLabel: string;
  estimatedScoreImpact: string;
  recommendation: string;
} {
  const safeLimit = Math.max(100, creditLimit);
  const ratio = Math.min(100, Math.max(0, Math.round((statementBalance / safeLimit) * 100)));

  if (ratio <= 9) {
    return {
      utilizationPercent: ratio,
      tierLabel: 'Optimal Zone (1%–9%)',
      estimatedScoreImpact: '+25 to +40 pts boost',
      recommendation: 'Gold standard for FICO scoring. Paying down before the statement closing date locks in this tier.',
    };
  }
  if (ratio <= 29) {
    return {
      utilizationPercent: ratio,
      tierLabel: 'Healthy Zone (10%–29%)',
      estimatedScoreImpact: '+5 to +15 pts steady',
      recommendation: 'Solid standing, though dropping under 10% before statement close unlocks top-tier student card approvals.',
    };
  }
  if (ratio <= 49) {
    return {
      utilizationPercent: ratio,
      tierLabel: 'Elevated Caution (30%–49%)',
      estimatedScoreImpact: '-15 to -30 pts drag',
      recommendation: 'Scoring models begin penalizing balances above 30%. Make a mid-cycle payment before the statement closes.',
    };
  }
  return {
    utilizationPercent: ratio,
    tierLabel: 'High Utilization Alert (50%+)',
    estimatedScoreImpact: '-45 to -85 pts penalty',
    recommendation: 'High utilization heavily suppresses your score even if you pay on time. Split payments twice a month.',
  };
}

/**
 * TOOLKIT #1: Ranks cards for a specific checkout purchase category & spend amount,
 * prioritizing higher rate and breaking ties with pinned status.
 */
export function rankCardsForCheckout(
  cards: CheckoutSwipeCardInput[],
  pinnedCardIds: string[],
  category: CheckoutCategoryKey,
  spendAmount: number
): {
  bestPinnedCard: RankedCheckoutCard | null;
  bestOverallCard: RankedCheckoutCard;
  rankedList: RankedCheckoutCard[];
} {
  const pinnedSet = new Set(pinnedCardIds);
  const safeSpend = Math.max(0, spendAmount);

  const rankedList: RankedCheckoutCard[] = cards
    .map((card) => {
      const ratePercent = card.categoryRates[category] ?? 1;
      const estimatedRewardDollars = Number(((safeSpend * ratePercent) / 100).toFixed(2));
      return {
        id: card.id,
        name: card.name,
        issuer: card.issuer,
        isPinned: pinnedSet.has(card.id),
        ratePercent,
        estimatedRewardDollars,
      };
    })
    .sort((a, b) => {
      if (b.ratePercent !== a.ratePercent) {
        return b.ratePercent - a.ratePercent;
      }
      return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    });

  const bestPinnedCard = rankedList.find((c) => c.isPinned) || null;
  const bestOverallCard = rankedList[0];

  return {
    bestPinnedCard,
    bestOverallCard,
    rankedList,
  };
}

/**
 * TOOLKIT #2: Statement Closing Date "Utilization Shield" Countdown & Paydown Calculator
 */
export function calculateStatementShield(
  statementClosingDay: number,
  currentDayOfMonth: number,
  currentBalance: number,
  creditLimit: number
): {
  daysUntilSnapshot: number;
  currentUtilizationPercent: number;
  targetNinePercentBalance: number;
  paydownNeededBeforeClose: number;
  isUrgentWindow: boolean;
  statusMessage: string;
} {
  const clampedStatementDay = Math.min(28, Math.max(1, statementClosingDay));
  const clampedCurrentDay = Math.min(28, Math.max(1, currentDayOfMonth));

  const daysUntilSnapshot =
    clampedStatementDay >= clampedCurrentDay
      ? clampedStatementDay - clampedCurrentDay
      : 30 - clampedCurrentDay + clampedStatementDay;

  const safeLimit = Math.max(100, creditLimit);
  const currentUtilizationPercent = Math.round((currentBalance / safeLimit) * 100);
  const targetNinePercentBalance = Math.floor(safeLimit * 0.09);
  const paydownNeededBeforeClose = Math.max(0, Math.round(currentBalance - targetNinePercentBalance));
  const isUrgentWindow = daysUntilSnapshot <= 3 && paydownNeededBeforeClose > 0;

  const statusMessage =
    paydownNeededBeforeClose === 0
      ? `Shield Active! Your $${currentBalance} balance is already at ${currentUtilizationPercent}% (under the 9% FICO sweet spot).`
      : `Pay $${paydownNeededBeforeClose.toLocaleString()} within the next ${daysUntilSnapshot} day${
          daysUntilSnapshot === 1 ? '' : 's'
        } (before Day ${clampedStatementDay}) so bureaus snapshot a $${targetNinePercentBalance} balance (9% utilization).`;

  return {
    daysUntilSnapshot,
    currentUtilizationPercent,
    targetNinePercentBalance,
    paydownNeededBeforeClose,
    isUrgentWindow,
    statusMessage,
  };
}

/**
 * TOOLKIT #3: Study Abroad & Spring Break "Zero-Fee Travel Check"
 */
export function auditTravelReadiness(
  pinnedCards: { id: string; name: string; foreignTxFee: string }[],
  pinnedBanks: { id: string; name: string; atmAccess: string; studentPerkHighlight: string }[],
  plannedInternationalSpend: number
): {
  zeroFeePinnedCards: string[];
  feeChargingPinnedCards: string[];
  travelFriendlyPinnedBanks: string[];
  foreignFeeSavingsDollars: number;
  isFullyTravelReady: boolean;
} {
  const zeroFeePinnedCards = pinnedCards
    .filter((c) => c.foreignTxFee.includes('$0'))
    .map((c) => c.name);
  const feeChargingPinnedCards = pinnedCards
    .filter((c) => !c.foreignTxFee.includes('$0'))
    .map((c) => c.name);

  const travelFriendlyPinnedBanks = pinnedBanks
    .filter(
      (b) =>
        b.atmAccess.toLowerCase().includes('worldwide') ||
        b.atmAccess.toLowerCase().includes('reimbursement') ||
        b.studentPerkHighlight.toLowerCase().includes('foreign')
    )
    .map((b) => b.name);

  const foreignFeeSavingsDollars = Math.round(Math.max(0, plannedInternationalSpend) * 0.03);
  const isFullyTravelReady =
    zeroFeePinnedCards.length > 0 && travelFriendlyPinnedBanks.length > 0;

  return {
    zeroFeePinnedCards,
    feeChargingPinnedCards,
    travelFriendlyPinnedBanks,
    foreignFeeSavingsDollars,
    isFullyTravelReady,
  };
}

/**
 * TOOLKIT #4: Free-Trial & Campus Subscription Sniper Summary
 */
export function calculateSubscriptionSniperSummary(
  subscriptions: TrackedSubscriptionItem[]
): {
  activeMonthlyBurn: number;
  activeAnnualBurn: number;
  annualSavedFromCanceled: number;
  urgentExpiringCount: number;
} {
  let activeMonthlyBurn = 0;
  let canceledMonthlySaved = 0;
  let urgentExpiringCount = 0;

  for (const sub of subscriptions) {
    if (sub.status === 'active') {
      activeMonthlyBurn += sub.monthlyCost;
      if (sub.daysUntilRenewal <= 5) {
        urgentExpiringCount += 1;
      }
    } else {
      canceledMonthlySaved += sub.monthlyCost;
    }
  }

  return {
    activeMonthlyBurn: Number(activeMonthlyBurn.toFixed(2)),
    activeAnnualBurn: Math.round(activeMonthlyBurn * 12),
    annualSavedFromCanceled: Math.round(canceledMonthlySaved * 12),
    urgentExpiringCount,
  };
}

/**
 * TOOLKIT #5: Summer Internship Paycheck & Roth IRA Tax Estimator
 */
export function calculateInternshipAndRothProjection(
  hourlyRate: number,
  hoursPerWeek: number,
  weeks: number,
  effectiveTaxPercent: number,
  rothContributionPercent: number,
  yearsToCompound = 40
): {
  grossSummerPay: number;
  estimatedTaxWithheld: number;
  netTakeHomePay: number;
  rothContributionDollars: number;
  projectedTaxFreeRothAt60: number;
  spendableAfterRoth: number;
} {
  const grossSummerPay = Math.round(Math.max(0, hourlyRate * hoursPerWeek * weeks));
  const estimatedTaxWithheld = Math.round(grossSummerPay * (effectiveTaxPercent / 100));
  const netTakeHomePay = Math.max(0, grossSummerPay - estimatedTaxWithheld);
  const rothContributionDollars = Math.min(
    7000,
    Math.round(netTakeHomePay * (rothContributionPercent / 100))
  );
  // 8.5% historical nominal / real adjusted equity growth over 40 years
  const projectedTaxFreeRothAt60 = Math.round(
    rothContributionDollars * Math.pow(1.085, Math.max(1, yearsToCompound))
  );
  const spendableAfterRoth = Math.max(0, netTakeHomePay - rothContributionDollars);

  return {
    grossSummerPay,
    estimatedTaxWithheld,
    netTakeHomePay,
    rothContributionDollars,
    projectedTaxFreeRothAt60,
    spendableAfterRoth,
  };
}

/**
 * Adds a search query to the recent search history list (deduplicated case-insensitively,
 * trimmed, most recent first, capped at maxItems).
 */
export function addSearchHistoryEntry(
  history: string[],
  rawQuery: string,
  maxItems = 8
): string[] {
  const trimmed = rawQuery.trim();
  if (trimmed.length < 2) {
    return history;
  }
  const filtered = history.filter(
    (entry) => entry.toLowerCase() !== trimmed.toLowerCase()
  );
  return [trimmed, ...filtered].slice(0, maxItems);
}

/**
 * Removes a specific search query from the recent search history list.
 */
export function removeSearchHistoryEntry(
  history: string[],
  queryToRemove: string
): string[] {
  return history.filter(
    (entry) => entry.toLowerCase() !== queryToRemove.toLowerCase()
  );
}

export interface PasswordValidationResult {
  isValid: boolean;
  hasMinSevenLetters: boolean;
  hasCapitalLetter: boolean;
  letterCount: number;
  errorMessage: string;
}

/**
 * Validates that a password contains at least 7 letters (A-Z / a-z)
 * and at least 1 capital letter (A-Z).
 */
export function validatePasswordRules(password: string): PasswordValidationResult {
  const lettersOnly = password.replace(/[^a-zA-Z]/g, '');
  const letterCount = lettersOnly.length;
  const hasMinSevenLetters = letterCount >= 7;
  const hasCapitalLetter = /[A-Z]/.test(password);
  const isValid = hasMinSevenLetters && hasCapitalLetter;

  let errorMessage = '';
  if (!hasMinSevenLetters && !hasCapitalLetter) {
    errorMessage = 'Password must contain at least 7 letters and at least 1 capital letter.';
  } else if (!hasMinSevenLetters) {
    errorMessage = `Password must contain at least 7 letters (currently ${letterCount}).`;
  } else if (!hasCapitalLetter) {
    errorMessage = 'Password must include at least 1 capital letter (A–Z).';
  }

  return {
    isValid,
    hasMinSevenLetters,
    hasCapitalLetter,
    letterCount,
    errorMessage,
  };
}

export interface PerAccountProgressData {
  answeredQuestions: Record<string, AnsweredQuestionRecord>;
  completedModuleIds: string[];
  pinnedCardIds: string[];
  pinnedBankIds: string[];
  moduleSlideIndices: Record<string, number>;
  viewedSlideIds: Record<string, string[]>;
  hasStartedLearning: boolean;
}

export function normalizeAccountEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getAccountProgressStorageKey(email: string): string {
  return `onit_account_progress_v5:${normalizeAccountEmail(email)}`;
}

export function createFreshAccountProgress(
  moduleIds: string[],
  firstSlideByModule?: Record<string, string>
): PerAccountProgressData {
  const initialViewed: Record<string, string[]> = {};
  for (const id of moduleIds) {
    const firstSlideId = firstSlideByModule?.[id];
    initialViewed[id] = firstSlideId ? [firstSlideId] : [];
  }
  return {
    answeredQuestions: {},
    completedModuleIds: [],
    pinnedCardIds: [],
    pinnedBankIds: [],
    moduleSlideIndices: Object.fromEntries(moduleIds.map((id) => [id, 0])),
    viewedSlideIds: initialViewed,
    hasStartedLearning: false,
  };
}

export interface ModuleCompletionGateResult {
  allSlidesViewed: boolean;
  viewedSlidesCount: number;
  totalSlidesCount: number;
  allQuizzesAnswered: boolean;
  answeredQuizzesCount: number;
  totalQuizzesCount: number;
  quizAccuracyPercent: number;
  meetsPassingScore: boolean;
  canComplete: boolean;
  lockReason: string;
}

/**
 * Evaluates whether a user is allowed to press the "Complete" button on a module:
 * 1. Must have viewed all slides/materials in the module.
 * 2. Must have answered all quizzes in the module.
 * 3. Must have achieved an average quiz accuracy of 70% or higher across the module's quizzes.
 */
export function calculateModuleCompletionGate(
  module: {
    id: string;
    slides: {
      id: string;
      type: 'content' | 'single-choice' | 'select-all';
    }[];
  },
  answeredQuestions: Record<string, AnsweredQuestionRecord>,
  viewedSlideIdsForModule: string[]
): ModuleCompletionGateResult {
  const viewedSet = new Set(viewedSlideIdsForModule);
  const totalSlidesCount = module.slides.length;
  const viewedSlidesCount = module.slides.filter((s) => viewedSet.has(s.id)).length;
  const allSlidesViewed = viewedSlidesCount >= totalSlidesCount;

  const quizSlides = module.slides.filter((s) => s.type !== 'content');
  const totalQuizzesCount = quizSlides.length;

  let answeredQuizzesCount = 0;
  let cumulativeQuizScore = 0;

  for (const qSlide of quizSlides) {
    const key = getQuestionHistoryKey(module.id, qSlide.id);
    const rec = answeredQuestions[key];
    if (rec) {
      answeredQuizzesCount += 1;
      if (rec.evaluation.isFullyCorrect) {
        cumulativeQuizScore += 100;
      } else if (qSlide.type === 'select-all') {
        const netCorrect = Math.max(
          0,
          rec.evaluation.correctSelectedCount - rec.evaluation.wrongSelectedCount
        );
        const partialPct = Math.round(
          (netCorrect / Math.max(1, rec.evaluation.totalCorrectRequired)) * 100
        );
        cumulativeQuizScore += Math.min(99, partialPct);
      } else {
        cumulativeQuizScore += 0;
      }
    }
  }

  const allQuizzesAnswered = answeredQuizzesCount >= totalQuizzesCount;
  const quizAccuracyPercent =
    totalQuizzesCount === 0
      ? 100
      : allQuizzesAnswered
      ? Math.round(cumulativeQuizScore / totalQuizzesCount)
      : Math.round(cumulativeQuizScore / totalQuizzesCount);

  const meetsPassingScore = allQuizzesAnswered && quizAccuracyPercent >= 70;
  const canComplete = allSlidesViewed && allQuizzesAnswered && meetsPassingScore;

  let lockReason = '';
  if (!allSlidesViewed) {
    const remainingSlides = totalSlidesCount - viewedSlidesCount;
    lockReason = `Review all module slides (${viewedSlidesCount}/${totalSlidesCount} viewed — ${remainingSlides} left) before completing.`;
  } else if (!allQuizzesAnswered) {
    const remainingQuizzes = totalQuizzesCount - answeredQuizzesCount;
    lockReason = `Complete all module quizzes (${answeredQuizzesCount}/${totalQuizzesCount} answered — ${remainingQuizzes} left) and score 70%+ to unlock Complete.`;
  } else if (!meetsPassingScore) {
    lockReason = `Quiz score is ${quizAccuracyPercent}% (70% required to pass). Retry the quiz question${
      totalQuizzesCount > 1 ? 's' : ''
    } to reach 70%+ and unlock Complete.`;
  }

  return {
    allSlidesViewed,
    viewedSlidesCount,
    totalSlidesCount,
    allQuizzesAnswered,
    answeredQuizzesCount,
    totalQuizzesCount,
    quizAccuracyPercent,
    meetsPassingScore,
    canComplete,
    lockReason,
  };
}

export interface SearchableLearningModule {
  id: string;
  numberLabel: string;
  title: string;
  category: string;
  summary: string;
  keySkills: string[];
  slides: {
    title: string;
    subtitle: string;
    badge: string;
  }[];
}

/**
 * Filters learning modules by keyword across title, summary/description, category,
 * module number, key skill tags, and slide titles/subtitles.
 */
export function filterModulesByKeyword<T extends SearchableLearningModule>(
  modules: T[],
  rawQuery: string
): T[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return modules;

  const queryTokens = query.split(/\s+/).filter(Boolean);

  return modules.filter((mod) => {
    const searchableText = [
      mod.numberLabel,
      mod.title,
      mod.category,
      mod.summary,
      ...mod.keySkills,
      ...mod.slides.flatMap((s) => [s.title, s.subtitle, s.badge]),
    ]
      .join(' ')
      .toLowerCase();

    return queryTokens.every((token) => searchableText.includes(token));
  });
}



