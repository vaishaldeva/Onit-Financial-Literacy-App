import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateQuestionSelection,
  getQuestionHistoryKey,
  recordAnsweredQuestion,
  filterAndSortWithPinnedFirst,
  getPinnedComparableItems,
  togglePinnedId,
  calculateHysaComparison,
  estimateUtilizationImpact,
  rankCardsForCheckout,
  calculateStatementShield,
  auditTravelReadiness,
  calculateSubscriptionSniperSummary,
  calculateInternshipAndRothProjection,
  calculateModuleCompletionGate,
  filterModulesByKeyword,
  type QuizOption,
} from './logic.ts';

const sampleOptions: QuizOption[] = [
  {
    id: 'opt-1',
    label: 'Pay statement balance in full every month',
    isCorrect: true,
    explanation: 'Avoids 20%+ APR interest charges completely.',
  },
  {
    id: 'opt-2',
    label: 'Keep credit utilization below 10%',
    isCorrect: true,
    explanation: 'Utilization makes up 30% of your FICO score.',
  },
  {
    id: 'opt-3',
    label: 'Carry a small balance to build credit faster',
    isCorrect: false,
    explanation: 'Myth! Carrying a balance only costs you interest and never boosts your score.',
  },
  {
    id: 'opt-4',
    label: 'Close your oldest student card right after graduation',
    isCorrect: false,
    explanation: 'Closing your oldest card shortens your credit age and lowers total available credit.',
  },
];

test('Select All That Apply: identifies right selections, wrong selections, and missed right answers', () => {
  const result = evaluateQuestionSelection(sampleOptions, ['opt-1', 'opt-3']);

  assert.equal(result.isFullyCorrect, false);
  assert.equal(result.correctSelectedCount, 1);
  assert.equal(result.wrongSelectedCount, 1);
  assert.equal(result.missedCorrectCount, 1);
  assert.equal(result.totalCorrectRequired, 2);

  const byId = Object.fromEntries(result.optionBreakdown.map((o) => [o.optionId, o]));
  assert.equal(byId['opt-1'].status, 'correct-selected');
  assert.equal(byId['opt-3'].status, 'wrong-selected');
  assert.equal(byId['opt-2'].status, 'missed-correct');
  assert.equal(byId['opt-4'].status, 'neutral-unselected');
});

test('Select All That Apply: marks fully correct when all right options and zero wrong options are picked', () => {
  const result = evaluateQuestionSelection(sampleOptions, ['opt-1', 'opt-2']);
  assert.equal(result.isFullyCorrect, true);
  assert.equal(result.correctSelectedCount, 2);
  assert.equal(result.wrongSelectedCount, 0);
  assert.equal(result.missedCorrectCount, 0);
});

test('Back navigation & attempt tracking: answered questions track attemptsCount and award 0 individual XP', () => {
  const history = {};
  const attempt1 = recordAnsweredQuestion(
    history,
    'mod-credit',
    'slide-q1',
    ['opt-1'],
    sampleOptions,
    1700000000000
  );

  const key = getQuestionHistoryKey('mod-credit', 'slide-q1');
  assert.ok(attempt1[key]);
  assert.equal(attempt1[key].attemptsCount, 1);
  assert.equal(attempt1[key].evaluation.isFullyCorrect, false);
  assert.equal(attempt1[key].evaluation.scoreDelta, 0);

  const attempt2 = recordAnsweredQuestion(
    attempt1,
    'mod-credit',
    'slide-q1',
    ['opt-1', 'opt-2'],
    sampleOptions,
    1700000005000
  );
  assert.equal(attempt2[key].attemptsCount, 2);
  assert.deepEqual(attempt2[key].selectedOptionIds, ['opt-1', 'opt-2']);
  assert.equal(attempt2[key].evaluation.isFullyCorrect, true);
  assert.equal(attempt2[key].evaluation.scoreDelta, 0);
});

test('Pinning & Search: pinned items always stay at the top before filtering and searching', () => {
  const banks = [
    { id: 'bank-chase', name: 'Chase College Checking', category: 'Traditional', searchKeywords: ['branch', 'zelle'] },
    { id: 'bank-sofi', name: 'SoFi Checking & Savings', category: 'HYSA', searchKeywords: ['4.50% apy', 'direct deposit'] },
    { id: 'bank-ally', name: 'Ally High-Yield Savings', category: 'HYSA', searchKeywords: ['buckets', 'no minimum'] },
  ];

  const sorted = filterAndSortWithPinnedFirst(banks, ['bank-ally'], '', 'all');
  assert.equal(sorted[0].id, 'bank-ally');
  assert.equal(sorted.length, 3);

  const filteredSearch = filterAndSortWithPinnedFirst(banks, ['bank-ally'], 'hysa', 'all');
  assert.equal(filteredSearch[0].id, 'bank-ally');
  assert.equal(filteredSearch.length, 2);
});

test('Compare Studio: strictly filters down to pinned items only', () => {
  const cards = [
    { id: 'card-savor', name: 'Capital One SavorOne Student' },
    { id: 'card-discover', name: 'Discover it Student Cash Back' },
    { id: 'card-bce', name: 'Amex Blue Cash Everyday' },
  ];

  const pinnedIds = togglePinnedId(['card-savor'], 'card-bce');
  const comparable = getPinnedComparableItems(cards, pinnedIds);
  assert.equal(comparable.length, 2);
  assert.deepEqual(
    comparable.map((c) => c.id),
    ['card-savor', 'card-bce']
  );
});

test('Calculators: HYSA compound calculator and credit utilization estimator return accurate figures', () => {
  const hysa = calculateHysaComparison(2000, 150, 4.6, 3);
  assert.ok(hysa.hysaTotal > hysa.traditionalTotal);
  assert.ok(hysa.extraEarnedWithHysa > 400);

  const utilOptimal = estimateUtilizationImpact(2000, 120);
  assert.equal(utilOptimal.utilizationPercent, 6);
  assert.ok(utilOptimal.tierLabel.includes('Optimal'));
});

test('Onit Toolkit #1–#5: Checkout Radar, Statement Shield, Travel Check, Subscription Sniper, and Internship Roth', () => {
  // 1. Checkout Radar
  const radar = rankCardsForCheckout(
    [
      {
        id: 'c1',
        name: 'Blue Cash Everyday',
        issuer: 'Amex',
        foreignTxFee: '2.7%',
        categoryRates: { groceries: 3, gas: 3, dining: 1, online: 3, rent: 1, travel: 1 },
      },
      {
        id: 'c2',
        name: 'SavorOne Student',
        issuer: 'Capital One',
        foreignTxFee: '$0',
        categoryRates: { groceries: 3, gas: 1, dining: 3, online: 1, rent: 1, travel: 3 },
      },
    ],
    ['c2'],
    'dining',
    200
  );
  assert.equal(radar.bestOverallCard.id, 'c2');
  assert.equal(radar.bestOverallCard.estimatedRewardDollars, 6);

  // 2. Statement Shield
  const shield = calculateStatementShield(18, 15, 600, 2000);
  assert.equal(shield.daysUntilSnapshot, 3);
  assert.equal(shield.targetNinePercentBalance, 180);
  assert.equal(shield.paydownNeededBeforeClose, 420);
  assert.equal(shield.isUrgentWindow, true);

  // 3. Travel Check
  const travel = auditTravelReadiness(
    [{ id: 'c2', name: 'SavorOne Student', foreignTxFee: '$0 (None)' }],
    [{ id: 'b1', name: 'Charles Schwab', atmAccess: 'Unlimited Worldwide ATM Rebates', studentPerkHighlight: '$0 Foreign Fees' }],
    1500
  );
  assert.equal(travel.isFullyTravelReady, true);
  assert.equal(travel.foreignFeeSavingsDollars, 45);

  // 4. Subscription Sniper
  const subs = calculateSubscriptionSniperSummary([
    { id: 's1', name: 'Prime Student', category: 'Shopping', monthlyCost: 7.49, daysUntilRenewal: 3, isStudentTrial: true, status: 'active' },
    { id: 's2', name: 'Textbook Rental', category: 'Study', monthlyCost: 19.95, daysUntilRenewal: 12, isStudentTrial: false, status: 'canceled' },
  ]);
  assert.equal(subs.urgentExpiringCount, 1);
  assert.equal(subs.annualSavedFromCanceled, 239);

  // 5. Internship & Roth Estimator
  const intern = calculateInternshipAndRothProjection(28, 40, 10, 12, 15, 40);
  assert.equal(intern.grossSummerPay, 11200);
  assert.ok(intern.projectedTaxFreeRothAt60 > 35000);
});

test('Module Completion Gate: requires all slides viewed AND >= 70% quiz score to unlock Complete button', () => {
  const mockModule = {
    id: 'mod-test',
    slides: [
      { id: 's1', type: 'content' as const },
      { id: 's2', type: 'select-all' as const },
    ],
  };

  // Not all slides viewed
  const gate1 = calculateModuleCompletionGate(mockModule, {}, ['s1']);
  assert.equal(gate1.canComplete, false);
  assert.equal(gate1.allSlidesViewed, false);

  // All slides viewed, but quiz not answered
  const gate2 = calculateModuleCompletionGate(mockModule, {}, ['s1', 's2']);
  assert.equal(gate2.canComplete, false);
  assert.equal(gate2.allSlidesViewed, true);
  assert.equal(gate2.allQuizzesAnswered, false);

  // Quiz answered with 50% (< 70%)
  const wrongHistory = recordAnsweredQuestion(
    {},
    'mod-test',
    's2',
    ['opt-1'],
    sampleOptions
  );
  const gate3 = calculateModuleCompletionGate(mockModule, wrongHistory, ['s1', 's2']);
  assert.equal(gate3.quizAccuracyPercent, 50);
  assert.equal(gate3.canComplete, false);

  // Quiz answered with 100% (>= 70%)
  const rightHistory = recordAnsweredQuestion(
    {},
    'mod-test',
    's2',
    ['opt-1', 'opt-2'],
    sampleOptions
  );
  const gate4 = calculateModuleCompletionGate(mockModule, rightHistory, ['s1', 's2']);
  assert.equal(gate4.quizAccuracyPercent, 100);
  assert.equal(gate4.canComplete, true);
});

test('Module Keyword Search: matches title, description, category, key skills, or slide content', () => {
  const sampleModules = [
    {
      id: 'm1',
      numberLabel: 'Module 01',
      title: 'Intro to Financial Literacy',
      category: 'Foundations',
      summary: 'Master the 50/30/20 rule and emergency funds.',
      keySkills: ['50/30/20 Rule', 'Emergency Fund'],
      slides: [{ title: 'Cash Flow', subtitle: 'Budgeting basics', badge: 'Slide 1' }],
    },
    {
      id: 'm2',
      numberLabel: 'Module 05',
      title: 'Mastering Your Credit Score',
      category: 'Credit',
      summary: 'Learn how FICO scores and utilization work.',
      keySkills: ['FICO Score', 'Utilization'],
      slides: [{ title: 'Statement Closing Date', subtitle: 'Keep under 10%', badge: 'Slide 1' }],
    },
  ];

  assert.equal(filterModulesByKeyword(sampleModules, 'fico').length, 1);
  assert.equal(filterModulesByKeyword(sampleModules, 'fico')[0].id, 'm2');
  assert.equal(filterModulesByKeyword(sampleModules, 'emergency').length, 1);
  assert.equal(filterModulesByKeyword(sampleModules, 'statement closing').length, 1);
  assert.equal(filterModulesByKeyword(sampleModules, '').length, 2);
});

