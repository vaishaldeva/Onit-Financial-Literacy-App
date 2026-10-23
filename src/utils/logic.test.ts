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

test('Back navigation persistence: answered questions remain stored in history by moduleId:slideId', () => {
  const history = {};
  const updated = recordAnsweredQuestion(
    history,
    'mod-credit',
    'slide-q1',
    ['opt-1', 'opt-2'],
    sampleOptions,
    1700000000000
  );

  const key = getQuestionHistoryKey('mod-credit', 'slide-q1');
  assert.ok(updated[key]);
  assert.deepEqual(updated[key].selectedOptionIds, ['opt-1', 'opt-2']);
  assert.equal(updated[key].evaluation.isFullyCorrect, true);
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
