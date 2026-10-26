import React, { useEffect, useState } from 'react';
import {
  Play,
  Sliders,
  Award,
  Sparkles,
  Pin,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building2,
  CreditCard,
  X,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  BANKS_DATA,
  CREDIT_CARDS_DATA,
  type BankItem,
  type CreditCardItem,
} from '../data/finlitData';
import {
  calculateHysaComparison,
  estimateUtilizationImpact,
} from '../utils/logic';
import { PhysicalCardVisual } from './PhysicalCardVisual';

interface HomeHubViewProps {
  userName?: string;
  hasUserStartedProgress: boolean;
  totalXp: number;
  maxPossibleXp: number;
  completedModulesCount: number;
  totalModulesCount: number;
  overallProgressPercent: number;
  activeModuleTitle: string;
  activeModuleNumberLabel: string;
  pinnedBankIds: string[];
  pinnedCardIds: string[];
  onTogglePinBank: (bankId: string) => void;
  onTogglePinCard: (cardId: string) => void;
  onResumeLearning: () => void;
  onOpenModulesTab: () => void;
  onOpenBanksTab: () => void;
  onOpenCardsTab: () => void;
  onOpenCompareTab: () => void;
  isPhoneView?: boolean;
}

type CalculatorTab = 'utilization' | 'hysa' | 'budget' | 'compound';

type SurveyLocationPref = 'online' | 'hybrid-cash' | 'branches';
type SurveyOfferPref = 'high-apy' | 'cash-bonus' | 'atm-rebates';
type SurveyGoalPref = 'buckets' | 'everyday-student' | 'travel-invest';

export const HomeHubView: React.FC<HomeHubViewProps> = ({
  userName,
  hasUserStartedProgress,
  totalXp,
  maxPossibleXp,
  completedModulesCount,
  totalModulesCount,
  overallProgressPercent,
  activeModuleTitle,
  activeModuleNumberLabel,
  pinnedBankIds,
  pinnedCardIds,
  onTogglePinBank,
  onTogglePinCard,
  onResumeLearning,
  onOpenModulesTab,
  onOpenBanksTab,
  onOpenCardsTab,
  onOpenCompareTab,
  isPhoneView = false,
}) => {
  // Interactive Calculator State
  const [activeCalc, setActiveCalc] = useState<CalculatorTab>('utilization');
  const [simBalance, setSimBalance] = useState(200);
  const [simLimit, setSimLimit] = useState(2000);
  const [simDeposit, setSimDeposit] = useState(2500);
  const [simMonthlySave, setSimMonthlySave] = useState(150);
  const [simIncome, setSimIncome] = useState(2400);
  const [simInvestMonthly, setSimInvestMonthly] = useState(150);
  const [simInvestYears, setSimInvestYears] = useState(20);

  // Bank Recommendation Survey State (Location, Current Offer, What You Want Out of One)
  const [locationPref, setLocationPref] = useState<SurveyLocationPref | null>('online');
  const [offerPref, setOfferPref] = useState<SurveyOfferPref | null>('high-apy');
  const [goalPref, setGoalPref] = useState<SurveyGoalPref | null>('buckets');

  const [inspectBank, setInspectBank] = useState<BankItem | null>(null);
  const [inspectCard, setInspectCard] = useState<CreditCardItem | null>(null);

  useEffect(() => {
    if (inspectBank || inspectCard) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [inspectBank, inspectCard]);

  const utilSim = estimateUtilizationImpact(simLimit, simBalance);
  const hysaSim = calculateHysaComparison(simDeposit, simMonthlySave, 4.5, 3);

  const monthlyGrowthRate = 0.08 / 12;
  const totalMonthsInvested = simInvestYears * 12;
  const compoundTotal = Math.round(
    simInvestMonthly *
      ((Math.pow(1 + monthlyGrowthRate, totalMonthsInvested) - 1) / monthlyGrowthRate)
  );
  const compoundPrincipal = simInvestMonthly * totalMonthsInvested;
  const compoundGains = Math.max(0, compoundTotal - compoundPrincipal);

  // Score banks based on the 3 survey answers
  const getRecommendedBanks = (): { bank: BankItem; matchReason: string; matchScore: number }[] => {
    return BANKS_DATA.map((bank) => {
      let score = 70;
      const reasons: string[] = [];

      // 1. Location preference
      if (locationPref === 'branches') {
        if (bank.id === 'bank-chase') {
          score += 22;
          reasons.push('4,700+ walk-in branches & 15,000+ ATMs');
        } else if (bank.id === 'bank-capone-360') {
          score += 12;
          reasons.push('Physical Capital One Cafés & CVS/Walgreens cash deposits');
        }
      } else if (locationPref === 'hybrid-cash') {
        if (bank.id === 'bank-capone-360') {
          score += 22;
          reasons.push('Easy cash deposits at CVS/Walgreens + 4.10% APY');
        } else if (bank.id === 'bank-sofi' || bank.id === 'bank-discover') {
          score += 14;
          reasons.push('55,000+ Allpoint ATMs nationwide');
        }
      } else if (locationPref === 'online') {
        if (bank.id === 'bank-ally' || bank.id === 'bank-sofi' || bank.id === 'bank-discover') {
          score += 18;
          reasons.push(`High-yield ${bank.savingsApy} online savings`);
        }
      }

      // 2. Offer preference
      if (offerPref === 'high-apy') {
        if (bank.savingsApyNumeric >= 4.2) {
          score += 18;
          reasons.push(`Top-tier ${bank.savingsApy} with $0 monthly fee`);
        } else if (bank.savingsApyNumeric >= 4.0) {
          score += 14;
        }
      } else if (offerPref === 'cash-bonus') {
        if (bank.id === 'bank-sofi' || bank.id === 'bank-chase') {
          score += 20;
          reasons.push('Up to $300 new account bonus offer');
        } else if (bank.id === 'bank-discover') {
          score += 14;
          reasons.push('1% cashback on debit card purchases');
        }
      } else if (offerPref === 'atm-rebates') {
        if (bank.id === 'bank-schwab') {
          score += 24;
          reasons.push('100% unlimited worldwide ATM fee rebates');
        } else if (bank.id === 'bank-ally') {
          score += 16;
          reasons.push('$10/mo out-of-network ATM fee reimbursement');
        }
      }

      // 3. Goal preference
      if (goalPref === 'buckets') {
        if (bank.id === 'bank-ally') {
          score += 20;
          reasons.push('Up to 30 visual Savings Buckets (no direct deposit needed)');
        } else if (bank.id === 'bank-sofi') {
          score += 18;
          reasons.push('Up to 20 custom Savings Vaults + round-ups');
        }
      } else if (goalPref === 'everyday-student') {
        if (bank.id === 'bank-chase' || bank.id === 'bank-capone-360' || bank.id === 'bank-discover') {
          score += 18;
          reasons.push('Zero-fee student/everyday checking & Zelle');
        }
      } else if (goalPref === 'travel-invest') {
        if (bank.id === 'bank-schwab') {
          score += 24;
          reasons.push('$0 foreign fees + built-in Roth IRA & brokerage');
        } else if (bank.id === 'bank-capone-360') {
          score += 16;
          reasons.push('$0 foreign debit card fees anywhere abroad');
        }
      }

      return {
        bank,
        matchReason: reasons.slice(0, 2).join(' · ') || bank.tagline,
        matchScore: Math.min(99, score),
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendedBanks = getRecommendedBanks();
  const topBankMatch = recommendedBanks[0];
  const runnerUpBankMatch = recommendedBanks[1];

  // Pair a recommended starter/everyday credit card based on goal
  const recommendedCard: CreditCardItem =
    goalPref === 'travel-invest'
      ? CREDIT_CARDS_DATA.find((c) => c.id === 'card-capone-savor-student') || CREDIT_CARDS_DATA[0]
      : goalPref === 'everyday-student'
      ? CREDIT_CARDS_DATA.find((c) => c.id === 'card-discover-it-student') || CREDIT_CARDS_DATA[0]
      : CREDIT_CARDS_DATA[0];

  return (
    <div className={isPhoneView ? 'space-y-4' : 'space-y-6'}>
      {/* =========================================================
          1. COMPACT AT-A-GLANCE PROGRESS BAR & QUICK RESUME
         ========================================================= */}
      <section className="glass-panel-elevated rounded-3xl p-4 sm:p-6 border border-white/15 bg-gradient-to-br from-emerald-950/45 via-slate-900/90 to-cyan-950/45">
        <div
          className={`flex flex-col ${
            isPhoneView ? '' : 'md:flex-row md:items-center'
          } justify-between gap-4`}
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {userName
                  ? hasUserStartedProgress
                    ? `Welcome back, ${userName}`
                    : `Welcome, ${userName}`
                  : 'Onit: Own Your Future'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular font-bold text-amber-300">
                {totalXp} XP
              </span>
            </div>
            <h1
              className={`${
                isPhoneView ? 'text-xl' : 'text-xl sm:text-2xl'
              } font-bold text-white tracking-tight`}
            >
              Money Tools & Personalized Bank Finder
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onResumeLearning}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden="true" />
              <span>
                {hasUserStartedProgress
                  ? `Resume ${activeModuleNumberLabel}`
                  : 'Start Learning'}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenModulesTab}
              className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              All 10 Modules
            </button>
          </div>
        </div>

        {/* Smooth At-a-Glance Progress Bar */}
        <div className="mt-4 pt-3.5 border-t border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>
                {completedModulesCount}/{totalModulesCount} Modules Completed
              </span>
              <span className="hidden sm:inline text-slate-400">
                · Up next: {activeModuleTitle}
              </span>
            </span>
            <span className="font-mono-tabular font-bold text-emerald-300">
              {totalXp}/{maxPossibleXp} XP · {overallProgressPercent}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={overallProgressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall module completion progress"
            className="h-2.5 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.45)] transition-all duration-500 ease-out"
              style={{
                width: `${Math.max(
                  overallProgressPercent,
                  overallProgressPercent > 0 ? 4 : 0
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          2. INTERACTIVE FINANCIAL CALCULATORS PLAYGROUND
         ========================================================= */}
      <section className="glass-panel-elevated rounded-3xl p-4 sm:p-6 border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Sliders className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Interactive Calculators</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
              Slide the Numbers to See How Money Works
            </h2>
          </div>

          {/* 4-Calculator Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(
              [
                { id: 'utilization', label: 'Credit Utilization' },
                { id: 'hysa', label: 'High-Yield Savings' },
                { id: 'budget', label: '50/30/20 Budget' },
                { id: 'compound', label: 'Compound Growth' },
              ] as { id: CalculatorTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCalc(tab.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCalc === tab.id
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-sm'
                    : 'bg-white/8 text-slate-300 hover:bg-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CALCULATOR 1: CREDIT UTILIZATION */}
        {activeCalc === 'utilization' && (
          <div className="rounded-2xl bg-slate-950/90 border border-cyan-400/30 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                How Much of Your Credit Limit Are You Using?
              </span>
              <span
                className={`font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  utilSim.utilizationPercent <= 10
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/35'
                    : utilSim.utilizationPercent <= 29
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/35'
                    : utilSim.utilizationPercent <= 49
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/35'
                    : 'bg-rose-500/20 text-rose-300 border-rose-400/35'
                }`}
              >
                {utilSim.utilizationPercent}% Used · {utilSim.tierLabel}
              </span>
            </div>

            <div
              className={`grid grid-cols-1 ${
                isPhoneView ? '' : 'sm:grid-cols-2'
              } gap-4`}
            >
              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-util-balance">Statement Balance You Owe</label>
                  <span className="font-mono-tabular font-bold text-emerald-300 text-sm">
                    ${simBalance.toLocaleString()}
                  </span>
                </div>
                <input
                  id="home-util-balance"
                  type="range"
                  min={0}
                  max={simLimit}
                  step={25}
                  value={simBalance}
                  onChange={(e) => setSimBalance(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-util-limit">Your Total Credit Limit</label>
                  <span className="font-mono-tabular font-bold text-cyan-300 text-sm">
                    ${simLimit.toLocaleString()}
                  </span>
                </div>
                <input
                  id="home-util-limit"
                  type="range"
                  min={500}
                  max={10000}
                  step={250}
                  value={simLimit}
                  onChange={(e) => {
                    const nextLim = Number(e.target.value);
                    setSimLimit(nextLim);
                    if (simBalance > nextLim) setSimBalance(nextLim);
                  }}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Visual Utilization Bar with 10% and 30% markers */}
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-200 ${
                    utilSim.utilizationPercent <= 10
                      ? 'bg-emerald-400'
                      : utilSim.utilizationPercent <= 29
                      ? 'bg-cyan-400'
                      : utilSim.utilizationPercent <= 49
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.max(2, utilSim.utilizationPercent)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-tabular">
                <span>0% (Best: 1%–9%)</span>
                <span>30% Max Target</span>
                <span>100% Maxed Out</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/[0.04] border border-white/8 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-200">{utilSim.recommendation}</span>
              <span className="font-mono-tabular font-bold text-emerald-300 shrink-0">
                Score Impact: {utilSim.estimatedScoreImpact}
              </span>
            </div>
          </div>
        )}

        {/* CALCULATOR 2: HIGH-YIELD SAVINGS APY */}
        {activeCalc === 'hysa' && (
          <div className="rounded-2xl bg-slate-950/90 border border-emerald-400/30 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                3-Year Growth: 4.50% High-Yield Savings vs. 0.01% Normal Bank
              </span>
              <span className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">
                +${hysaSim.extraEarnedWithHysa.toLocaleString()} Free Extra Interest
              </span>
            </div>

            <div
              className={`grid grid-cols-1 ${
                isPhoneView ? '' : 'sm:grid-cols-2'
              } gap-4`}
            >
              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-hysa-deposit">Starting Savings</label>
                  <span className="font-mono-tabular font-bold text-white text-sm">
                    ${simDeposit.toLocaleString()}
                  </span>
                </div>
                <input
                  id="home-hysa-deposit"
                  type="range"
                  min={100}
                  max={20000}
                  step={100}
                  value={simDeposit}
                  onChange={(e) => setSimDeposit(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-hysa-monthly">Monthly Deposit</label>
                  <span className="font-mono-tabular font-bold text-cyan-300 text-sm">
                    ${simMonthlySave}/mo
                  </span>
                </div>
                <input
                  id="home-hysa-monthly"
                  type="range"
                  min={0}
                  max={1000}
                  step={25}
                  value={simMonthlySave}
                  onChange={(e) => setSimMonthlySave(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3">
                <span className="text-[11px] font-semibold text-emerald-200 block">
                  4.50% APY High-Yield (3 Yrs)
                </span>
                <span className="font-mono-tabular text-lg sm:text-xl font-bold text-white block mt-0.5">
                  ${hysaSim.hysaTotal.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-300 block">
                  +${hysaSim.hysaInterestEarned.toLocaleString()} interest
                </span>
              </div>

              <div className="rounded-xl bg-rose-500/12 border border-rose-400/30 p-3">
                <span className="text-[11px] font-semibold text-rose-200 block">
                  0.01% Traditional Bank (3 Yrs)
                </span>
                <span className="font-mono-tabular text-lg sm:text-xl font-bold text-white block mt-0.5">
                  ${hysaSim.traditionalTotal.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-300 block">
                  Only +${hysaSim.traditionalInterestEarned} interest
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 3: 50/30/20 BUDGET */}
        {activeCalc === 'budget' && (
          <div className="rounded-2xl bg-slate-950/90 border border-amber-400/30 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                50 / 30 / 20 Monthly Take-Home Pay Splitter
              </span>
              <span className="font-mono-tabular text-sm font-bold text-amber-300">
                ${simIncome.toLocaleString()} / month
              </span>
            </div>

            <input
              type="range"
              aria-label="Monthly Take-Home Pay"
              min={500}
              max={10000}
              step={100}
              value={simIncome}
              onChange={(e) => setSimIncome(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3">
                <span className="text-[11px] font-bold text-emerald-300 block">50% Needs</span>
                <span className="font-mono-tabular text-base sm:text-xl font-bold text-white block mt-0.5">
                  ${Math.round(simIncome * 0.5).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-300 block">Rent, groceries, bills</span>
              </div>
              <div className="rounded-xl bg-amber-500/15 border border-amber-400/30 p-3">
                <span className="text-[11px] font-bold text-amber-300 block">30% Wants</span>
                <span className="font-mono-tabular text-base sm:text-xl font-bold text-white block mt-0.5">
                  ${Math.round(simIncome * 0.3).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-300 block">Dining out, fun, apps</span>
              </div>
              <div className="rounded-xl bg-cyan-500/15 border border-cyan-400/30 p-3">
                <span className="text-[11px] font-bold text-cyan-300 block">20% Savings</span>
                <span className="font-mono-tabular text-base sm:text-xl font-bold text-white block mt-0.5">
                  ${Math.round(simIncome * 0.2).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-300 block">HYSA, investing, debt</span>
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR 4: COMPOUND INVESTING GROWTH */}
        {activeCalc === 'compound' && (
          <div className="rounded-2xl bg-slate-950/90 border border-violet-400/30 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                S&P 500 Index Fund Compound Growth (8% Avg Annual Return)
              </span>
              <span className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-200 border border-violet-400/35">
                Projected Total: ${compoundTotal.toLocaleString()}
              </span>
            </div>

            <div
              className={`grid grid-cols-1 ${
                isPhoneView ? '' : 'sm:grid-cols-2'
              } gap-4`}
            >
              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-comp-monthly">Monthly Investment</label>
                  <span className="font-mono-tabular font-bold text-white text-sm">
                    ${simInvestMonthly}/mo
                  </span>
                </div>
                <input
                  id="home-comp-monthly"
                  type="range"
                  min={25}
                  max={1000}
                  step={25}
                  value={simInvestMonthly}
                  onChange={(e) => setSimInvestMonthly(Number(e.target.value))}
                  className="w-full accent-violet-400 cursor-pointer"
                />
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3.5">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <label htmlFor="home-comp-years">Years Invested</label>
                  <span className="font-mono-tabular font-bold text-cyan-300 text-sm">
                    {simInvestYears} Years
                  </span>
                </div>
                <input
                  id="home-comp-years"
                  type="range"
                  min={5}
                  max={40}
                  step={5}
                  value={simInvestYears}
                  onChange={(e) => setSimInvestYears(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
                <span className="text-[11px] text-slate-300 block">What You Put In</span>
                <span className="font-mono-tabular text-lg font-bold text-white block mt-0.5">
                  ${compoundPrincipal.toLocaleString()}
                </span>
              </div>
              <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3">
                <span className="text-[11px] text-emerald-200 block">Compound Growth Earned</span>
                <span className="font-mono-tabular text-lg font-bold text-emerald-300 block mt-0.5">
                  +${compoundGains.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          3. BANK & CARD RECOMMENDATION SURVEY
         ========================================================= */}
      <section className="glass-panel-elevated rounded-3xl p-4 sm:p-6 border border-white/15 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              3-Click Recommendation Survey
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
              Which Bank & Card Should You Open?
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Tap your location preference, current offer priority, and main goal to see your top match.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setLocationPref('online');
              setOfferPref('high-apy');
              setGoalPref('buckets');
            }}
            className="self-start sm:self-auto min-h-[36px] px-3 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>

        {/* 3 Simple Survey Questions */}
        <div
          className={`grid grid-cols-1 ${
            isPhoneView ? '' : 'lg:grid-cols-3'
          } gap-3.5`}
        >
          {/* Question 1: Location */}
          <div className="rounded-2xl bg-slate-950/85 border border-white/10 p-3.5 space-y-2.5">
            <p className="text-xs font-bold text-cyan-300">
              1. Location & Branch Access
            </p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'online', label: '100% Online (Highest APY)' },
                  { id: 'hybrid-cash', label: 'Cash Deposits at CVS/Walgreens' },
                  { id: 'branches', label: 'Walk-In Local Branches Nearby' },
                ] as { id: SurveyLocationPref; label: string }[]
              ).map((opt) => {
                const active = locationPref === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLocationPref(opt.id)}
                    className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      active
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {active && <CheckCircle2 className="h-4 w-4 text-cyan-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Current Offer */}
          <div className="rounded-2xl bg-slate-950/85 border border-white/10 p-3.5 space-y-2.5">
            <p className="text-xs font-bold text-emerald-300">
              2. Current Offer You Want
            </p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'high-apy', label: '4.10%–4.50% Savings APY' },
                  { id: 'cash-bonus', label: 'Up to $300 Sign-Up Bonus' },
                  { id: 'atm-rebates', label: '100% Worldwide ATM Rebates' },
                ] as { id: SurveyOfferPref; label: string }[]
              ).map((opt) => {
                const active = offerPref === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOfferPref(opt.id)}
                    className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      active
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-sm'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {active && <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: What They Want Out of One */}
          <div className="rounded-2xl bg-slate-950/85 border border-white/10 p-3.5 space-y-2.5">
            <p className="text-xs font-bold text-amber-300">
              3. What You Want Most Out of It
            </p>
            <div className="space-y-1.5">
              {(
                [
                  { id: 'buckets', label: 'Savings Buckets / Goal Vaults' },
                  { id: 'everyday-student', label: 'Simple Student / Daily Spending' },
                  { id: 'travel-invest', label: 'Travel Abroad + Investing' },
                ] as { id: SurveyGoalPref; label: string }[]
              ).map((opt) => {
                const active = goalPref === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoalPref(opt.id)}
                    className={`w-full min-h-[40px] px-3 py-2 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      active
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {active && <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personalized Recommendations Result */}
        <div
          className={`grid grid-cols-1 ${
            isPhoneView ? '' : 'lg:grid-cols-2'
          } gap-4 pt-1`}
        >
          {/* Top Bank Match */}
          {topBankMatch && (
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/15 via-slate-900/95 to-emerald-500/10 border border-cyan-400/35 p-4 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/35 text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Top Bank Match · {topBankMatch.matchScore}% Fit</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onTogglePinBank(topBankMatch.bank.id)}
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      pinnedBankIds.includes(topBankMatch.bank.id)
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Pin className="h-3 w-3" />
                    <span>
                      {pinnedBankIds.includes(topBankMatch.bank.id) ? 'Pinned' : 'Pin Bank'}
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {topBankMatch.bank.name}
                  </h3>
                  <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                    {topBankMatch.matchReason}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl bg-slate-950/85 border border-white/10 p-2 text-center">
                    <span className="text-[10px] text-slate-400 block">Savings APY</span>
                    <span className="font-mono-tabular text-xs sm:text-sm font-bold text-emerald-300">
                      {topBankMatch.bank.savingsApy}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-950/85 border border-white/10 p-2 text-center">
                    <span className="text-[10px] text-slate-400 block">Monthly Fee</span>
                    <span className="font-mono-tabular text-xs sm:text-sm font-bold text-white">
                      {topBankMatch.bank.monthlyFee}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-950/85 border border-white/10 p-2 text-center">
                    <span className="text-[10px] text-slate-400 block">Category</span>
                    <span className="text-xs font-bold text-cyan-300">
                      {topBankMatch.bank.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setInspectBank(topBankMatch.bank)}
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Full Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <a
                  href={topBankMatch.bank.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 hover:brightness-110 transition-all cursor-pointer"
                >
                  <span>Official Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Paired Credit Card Recommendation */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 via-slate-900/95 to-violet-500/10 border border-emerald-400/35 p-4 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/35 text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Recommended Card Pairing</span>
                </span>

                <button
                  type="button"
                  onClick={() => onTogglePinCard(recommendedCard.id)}
                  className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                    pinnedCardIds.includes(recommendedCard.id)
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Pin className="h-3 w-3" />
                  <span>
                    {pinnedCardIds.includes(recommendedCard.id) ? 'Pinned' : 'Pin Card'}
                  </span>
                </button>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {recommendedCard.name}
                </h3>
                <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                  {recommendedCard.upfrontSummaryLine}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {recommendedCard.upfrontBenefits.slice(0, 2).map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-950/85 border border-white/10 p-2 flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-200 font-medium truncate">
                      {b.category}
                    </span>
                    <span className="font-mono-tabular text-sm font-bold text-emerald-300 shrink-0 ml-2">
                      {b.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setInspectCard(recommendedCard)}
                className="min-h-[40px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Full Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <a
                href={recommendedCard.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Official Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Runner-up & Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-300">
          {runnerUpBankMatch && (
            <span>
              Runner-up bank:{' '}
              <button
                type="button"
                onClick={() => setInspectBank(runnerUpBankMatch.bank)}
                className="font-bold text-cyan-300 hover:underline cursor-pointer"
              >
                {runnerUpBankMatch.bank.name} ({runnerUpBankMatch.bank.savingsApy})
              </button>
            </span>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBanksTab}
              className="font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
            >
              Browse All {BANKS_DATA.length} Banks →
            </button>
            <button
              type="button"
              onClick={onOpenCardsTab}
              className="font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer"
            >
              Browse All {CREDIT_CARDS_DATA.length} Cards →
            </button>
            {pinnedBankIds.length + pinnedCardIds.length > 0 && (
              <button
                type="button"
                onClick={onOpenCompareTab}
                className="font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
              >
                Compare Pinned ({pinnedBankIds.length + pinnedCardIds.length}) →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Bank Detail Modal */}
      {inspectBank && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${inspectBank.name} details`}
          onClick={() => setInspectBank(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-slate-900 border border-white/15 shadow-2xl"
          >
            <div className="shrink-0 px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-4 bg-slate-900 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyan-400">
                  {inspectBank.institutionType} · {inspectBank.fdicInsured}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                  {inspectBank.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectBank(null)}
                aria-label="Close bank details"
                className="touch-manipulation min-h-[38px] min-w-[38px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 pt-4 pb-6 sm:px-7 sm:pt-5 sm:pb-7 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                  <span className="text-[11px] text-slate-400 block">Savings APY</span>
                  <span className="font-mono-tabular text-base font-bold text-emerald-300">
                    {inspectBank.savingsApy}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                  <span className="text-[11px] text-slate-400 block">Monthly Fee</span>
                  <span className="font-mono-tabular text-base font-bold text-white">
                    {inspectBank.monthlyFee}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                  <span className="text-[11px] text-slate-400 block">ATM Access</span>
                  <span className="text-xs font-bold text-cyan-300">
                    {inspectBank.atmAccess}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {inspectBank.description}
              </p>

              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-3.5 space-y-1.5 text-xs text-slate-200">
                <p>
                  <strong className="text-emerald-300">Onit Verdict:</strong>{' '}
                  {inspectBank.verdict}
                </p>
                <p className="text-amber-200">
                  <strong className="text-amber-300">Watch Out For:</strong>{' '}
                  {inspectBank.watchOutFor}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onTogglePinBank(inspectBank.id)}
                  className="touch-manipulation min-h-[42px] px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pin className="h-3.5 w-3.5" />
                  <span>
                    {pinnedBankIds.includes(inspectBank.id) ? 'Pinned' : 'Pin This Bank'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectBank(null)}
                  className="touch-manipulation min-h-[42px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {inspectCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${inspectCard.name} details`}
          onClick={() => setInspectCard(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-slate-900 border border-white/15 shadow-2xl"
          >
            <div className="shrink-0 px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-4 bg-slate-900 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-400">
                  {inspectCard.issuer} · {inspectCard.annualFee} Annual Fee
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                  {inspectCard.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectCard(null)}
                aria-label="Close card details"
                className="touch-manipulation min-h-[38px] min-w-[38px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 pt-4 pb-6 sm:px-7 sm:pt-5 sm:pb-7 space-y-4">
              <div className="max-w-xs mx-auto">
                <PhysicalCardVisual card={inspectCard} compact />
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {inspectCard.description}
              </p>

              <div className="rounded-2xl bg-slate-950/85 border border-white/10 p-3.5 space-y-1.5 text-xs text-slate-200">
                <p>
                  <strong className="text-cyan-300">Welcome Bonus:</strong>{' '}
                  {inspectCard.welcomeBonus}
                </p>
                <p>
                  <strong className="text-amber-300">Best For:</strong>{' '}
                  {inspectCard.bestForWho}
                </p>
                <p className="flex items-start gap-1.5 text-slate-300 pt-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{inspectCard.preApprovalNote}</span>
                </p>
              </div>

              <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onTogglePinCard(inspectCard.id)}
                  className="touch-manipulation min-h-[42px] px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pin className="h-3.5 w-3.5" />
                  <span>
                    {pinnedCardIds.includes(inspectCard.id) ? 'Pinned' : 'Pin This Card'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectCard(null)}
                  className="touch-manipulation min-h-[42px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
