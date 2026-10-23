import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Sliders,
  Trophy,
  BookOpen,
  Check,
  Lock,
} from 'lucide-react';
import type { LearningModule, ModuleSlide } from '../data/finlitData';
import {
  getQuestionHistoryKey,
  calculateHysaComparison,
  estimateUtilizationImpact,
  calculateModuleCompletionGate,
  type AnsweredQuestionRecord,
} from '../utils/logic';

interface ModulePlayerViewProps {
  module: LearningModule;
  slideIndex: number;
  onChangeSlideIndex: (newIndex: number) => void;
  answeredQuestions: Record<string, AnsweredQuestionRecord>;
  viewedSlideIdsForModule?: string[];
  onSubmitAnswer: (
    moduleId: string,
    slideId: string,
    selectedOptionIds: string[]
  ) => void;
  onResetSingleQuestion: (moduleId: string, slideId: string) => void;
  onBackToDashboard: () => void;
  onCompleteModule: (moduleId: string) => void;
  isModuleCompleted?: boolean;
  isPhoneView?: boolean;
}

export const ModulePlayerView: React.FC<ModulePlayerViewProps> = ({
  module,
  slideIndex,
  onChangeSlideIndex,
  answeredQuestions,
  viewedSlideIdsForModule = [],
  onSubmitAnswer,
  onResetSingleQuestion,
  onBackToDashboard,
  onCompleteModule,
  isModuleCompleted = false,
  isPhoneView = false,
}) => {
  const slide: ModuleSlide = module.slides[slideIndex] || module.slides[0];
  const totalSlides = module.slides.length;
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === totalSlides - 1;

  const historyKey = getQuestionHistoryKey(module.id, slide.id);
  const existingRecord = answeredQuestions[historyKey];

  const effectiveViewedSlideIds = Array.from(
    new Set([...viewedSlideIdsForModule, slide.id])
  );
  const completionGate = calculateModuleCompletionGate(
    module,
    answeredQuestions,
    effectiveViewedSlideIds
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(
    existingRecord ? existingRecord.selectedOptionIds : []
  );
  const [validationMessage, setValidationMessage] = useState('');

  const [simBalance, setSimBalance] = useState(250);
  const [simLimit, setSimLimit] = useState(2500);
  const [simDeposit, setSimDeposit] = useState(3000);
  const [simMonthlyContribution, setSimMonthlyContribution] = useState(200);
  const [simIncome, setSimIncome] = useState(3600);
  const [simInvestMonthly, setSimInvestMonthly] = useState(200);
  const [simInvestYears, setSimInvestYears] = useState(20);

  const [showCelebration, setShowCelebration] = useState(false);
  const [revealedSolutionSlides, setRevealedSolutionSlides] = useState<Record<string, boolean>>({});
  const playerTopRef = useRef<HTMLDivElement | null>(null);

  // Always scroll back to the top of the slide when clicking Next Slide, Previous, or switching modules
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    const scrollableMain = playerTopRef.current?.closest('main');
    if (scrollableMain) {
      scrollableMain.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [slideIndex, module.id]);

  useEffect(() => {
    setShowCelebration(false);
  }, [module.id]);

  useEffect(() => {
    setValidationMessage('');
    if (existingRecord) {
      setSelectedIds(existingRecord.selectedOptionIds);
    } else {
      setSelectedIds([]);
      setRevealedSolutionSlides((prev) => {
        if (!prev[historyKey]) return prev;
        const next = { ...prev };
        delete next[historyKey];
        return next;
      });
    }
  }, [slide.id, existingRecord, historyKey]);

  const handleToggleOption = (optionId: string) => {
    setValidationMessage('');
    if (slide.type === 'single-choice') {
      setSelectedIds([optionId]);
      return;
    }
    setSelectedIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCheckAnswer = () => {
    if (selectedIds.length === 0) {
      setValidationMessage('Please select at least one option before checking your answer.');
      return;
    }
    setValidationMessage('');
    onSubmitAnswer(module.id, slide.id, selectedIds);
  };

  const utilSim = estimateUtilizationImpact(simLimit, simBalance);
  const hysaSim = calculateHysaComparison(simDeposit, simMonthlyContribution, 4.5, 3);

  const monthlyGrowthRate = 0.08 / 12;
  const totalMonthsInvested = simInvestYears * 12;
  const compoundTotal = Math.round(
    simInvestMonthly * ((Math.pow(1 + monthlyGrowthRate, totalMonthsInvested) - 1) / monthlyGrowthRate)
  );
  const compoundPrincipal = simInvestMonthly * totalMonthsInvested;
  const compoundGains = Math.max(0, compoundTotal - compoundPrincipal);

  const toneCardStyles = {
    emerald: 'from-emerald-500/20 via-teal-500/10 to-slate-900/90 border-emerald-400/35 text-emerald-300',
    cyan: 'from-cyan-500/20 via-sky-500/10 to-slate-900/90 border-cyan-400/35 text-cyan-300',
    violet: 'from-violet-500/20 via-fuchsia-500/10 to-slate-900/90 border-violet-400/35 text-violet-300',
    amber: 'from-amber-500/20 via-orange-500/10 to-slate-900/90 border-amber-400/35 text-amber-300',
    rose: 'from-rose-500/20 via-pink-500/10 to-slate-900/90 border-rose-400/35 text-rose-300',
  };

  return (
    <div ref={playerTopRef} className="space-y-4 sm:space-y-6 relative">
      {/* Top Module Navigation Bar — Mobile-First so Slide Pills Never Clip */}
      <div className="glass-panel rounded-2xl p-3.5 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          {/* Interactive Slide Step Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {module.slides.map((s, idx) => {
              const sKey = getQuestionHistoryKey(module.id, s.id);
              const sRecord = answeredQuestions[sKey];
              const isCurrent = idx === slideIndex;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChangeSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                  className={`min-h-[36px] min-w-[36px] px-2.5 py-1 rounded-xl text-xs font-mono-tabular font-bold transition-all flex items-center justify-center gap-1 shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : sRecord?.evaluation.isFullyCorrect
                      ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                      : sRecord
                      ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                      : 'bg-white/8 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {s.type !== 'content' && (
                    <span className="text-[10px]">
                      {sRecord?.evaluation.isFullyCorrect ? '✓' : 'Q'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
              <span className="font-mono-tabular font-bold text-emerald-400">
                {module.numberLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{module.category}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-snug mt-0.5">
              {module.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-tabular font-bold border ${
                completionGate.allSlidesViewed
                  ? 'bg-emerald-500/15 border-emerald-400/35 text-emerald-300'
                  : 'bg-white/8 border-white/12 text-slate-300'
              }`}
            >
              Slides {completionGate.viewedSlidesCount}/{completionGate.totalSlidesCount}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-tabular font-bold border ${
                completionGate.meetsPassingScore
                  ? 'bg-emerald-500/15 border-emerald-400/35 text-emerald-300'
                  : completionGate.allQuizzesAnswered
                  ? 'bg-rose-500/15 border-rose-400/35 text-rose-300'
                  : 'bg-amber-500/15 border-amber-400/35 text-amber-300'
              }`}
            >
              Quiz Score: {completionGate.quizAccuracyPercent}% (70%+ req)
            </span>
          </div>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div
        className={`glass-panel-elevated rounded-3xl border border-white/15 ${
          isPhoneView ? 'p-4' : 'p-4 sm:p-8'
        }`}
      >
        {/* Slide Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-400 truncate">
            {slide.badge}
          </span>
          <span className="font-mono-tabular text-[11px] sm:text-xs text-slate-400 shrink-0">
            Slide {slideIndex + 1} of {totalSlides}
          </span>
        </div>

        <h2
          className={`${
            isPhoneView ? 'text-xl' : 'text-xl sm:text-3xl'
          } font-bold text-white tracking-tight leading-snug`}
        >
          {slide.title}
        </h2>
        <p className="text-xs sm:text-base text-slate-300 leading-relaxed mt-2">
          {slide.subtitle}
        </p>

        {/* =========================================================
            CONTENT SLIDE VIEW
           ========================================================= */}
        {slide.type === 'content' && (
          <div className="mt-5 space-y-5">
            {/* Hero Callout Banner */}
            {slide.heroCallout && (
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-slate-900/95 border border-emerald-400/35 p-4 sm:p-6">
                <div
                  className={`flex flex-col ${
                    isPhoneView ? '' : 'md:flex-row md:items-center'
                  } justify-between gap-4`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                      Core Financial Rule
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                      {slide.heroCallout.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {slide.heroCallout.description}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-slate-950/85 border border-white/15 px-4 py-3 text-center">
                    <span className="font-mono-tabular text-xl sm:text-3xl font-bold text-emerald-300 block">
                      {slide.heroCallout.stat}
                    </span>
                    <span className="text-[11px] text-slate-300">Target Benchmark</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4-Card Bento Grid of Visual Takeaways */}
            {slide.takeawayCards && (
              <div
                className={`grid grid-cols-1 ${
                  isPhoneView ? '' : 'sm:grid-cols-2'
                } gap-3.5`}
              >
                {slide.takeawayCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl bg-gradient-to-br ${toneCardStyles[card.tone]} border p-4 sm:p-5 overflow-hidden`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/85 min-w-0">
                        {card.label}
                      </span>
                      <span className="font-mono-tabular text-base sm:text-xl font-bold text-white break-words min-w-0">
                        {card.metric}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Smart Move vs. Costly Mistake Comparison Table */}
            {slide.comparisonRows && (
              <div className="rounded-2xl bg-slate-950/75 border border-white/12 overflow-hidden">
                <div className="px-4 py-3 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Side-by-Side Action Playbook
                  </span>
                  <BookOpen className="h-4 w-4 text-cyan-300 shrink-0" aria-hidden="true" />
                </div>
                <div className="divide-y divide-white/10">
                  {slide.comparisonRows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`p-4 grid grid-cols-1 ${
                        isPhoneView ? '' : 'md:grid-cols-3'
                      } gap-2.5 items-start`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">
                        {row.topic}
                      </div>
                      <div className="rounded-xl bg-emerald-500/12 border border-emerald-400/30 p-3 text-xs text-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <strong className="text-white block mb-0.5">Smart Move:</strong>
                          {row.smartMove}
                        </span>
                      </div>
                      <div className="rounded-xl bg-rose-500/12 border border-rose-400/30 p-3 text-xs text-rose-200 flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <strong className="text-white block mb-0.5">Costly Trap:</strong>
                          {row.costlyMistake}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Interactive Simulator #1: Credit Utilization Live Slider */}
            {slide.interactiveWidget === 'utilization-sim' && (
              <div className="rounded-2xl bg-slate-950/90 border border-cyan-400/30 p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      FICO Credit Utilization Simulator
                    </span>
                  </div>
                  <span
                    className={`font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg ${
                      utilSim.utilizationPercent <= 10
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : utilSim.utilizationPercent <= 30
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                    }`}
                  >
                    {utilSim.utilizationPercent}% · {utilSim.tierLabel}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    isPhoneView ? '' : 'sm:grid-cols-2'
                  } gap-4`}
                >
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-balance">Reported Statement Balance</label>
                      <span className="font-mono-tabular font-bold text-white">
                        ${simBalance.toLocaleString()}
                      </span>
                    </div>
                    <input
                      id="sim-balance"
                      type="range"
                      min={0}
                      max={simLimit}
                      step={50}
                      value={simBalance}
                      onChange={(e) => setSimBalance(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-limit">Total Credit Limit</label>
                      <span className="font-mono-tabular font-bold text-white">
                        ${simLimit.toLocaleString()}
                      </span>
                    </div>
                    <input
                      id="sim-limit"
                      type="range"
                      min={500}
                      max={15000}
                      step={500}
                      value={simLimit}
                      onChange={(e) => {
                        const newLim = Number(e.target.value);
                        setSimLimit(newLim);
                        if (simBalance > newLim) setSimBalance(newLim);
                      }}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div
                  className={`rounded-xl bg-white/[0.04] p-3 flex flex-col ${
                    isPhoneView ? '' : 'sm:flex-row sm:items-center'
                  } justify-between gap-2 text-xs text-slate-200`}
                >
                  <span>{utilSim.recommendation}</span>
                  <span className="font-mono-tabular font-bold text-xs sm:text-sm shrink-0 text-emerald-300">
                    Est. FICO Impact: {utilSim.estimatedScoreImpact}
                  </span>
                </div>
              </div>
            )}

            {/* Embedded Interactive Simulator #2: HYSA vs 0.01% Legacy Bank */}
            {slide.interactiveWidget === 'hysa-sim' && (
              <div className="rounded-2xl bg-slate-950/90 border border-cyan-400/30 p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      3-Year High-Yield (4.50% APY) vs. 0.01% Bank
                    </span>
                  </div>
                  <span className="font-mono-tabular text-xs sm:text-sm font-bold text-emerald-300">
                    +${hysaSim.extraEarnedWithHysa.toLocaleString()} Extra Interest
                  </span>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    isPhoneView ? '' : 'sm:grid-cols-2'
                  } gap-4`}
                >
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-deposit">Starting Emergency Fund</label>
                      <span className="font-mono-tabular font-bold text-white">
                        ${simDeposit.toLocaleString()}
                      </span>
                    </div>
                    <input
                      id="sim-deposit"
                      type="range"
                      min={500}
                      max={25000}
                      step={500}
                      value={simDeposit}
                      onChange={(e) => setSimDeposit(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-monthly">Monthly Savings Transfer</label>
                      <span className="font-mono-tabular font-bold text-white">
                        ${simMonthlyContribution}/mo
                      </span>
                    </div>
                    <input
                      id="sim-monthly"
                      type="range"
                      min={0}
                      max={1500}
                      step={50}
                      value={simMonthlyContribution}
                      onChange={(e) => setSimMonthlyContribution(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    isPhoneView ? '' : 'sm:grid-cols-2'
                  } gap-3 pt-1`}
                >
                  <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3">
                    <span className="text-xs text-emerald-200 block">4.50% APY High-Yield Savings (3 Yrs)</span>
                    <span className="font-mono-tabular text-lg sm:text-xl font-bold text-white">
                      ${hysaSim.hysaTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-300 block mt-0.5">
                      +${hysaSim.hysaInterestEarned.toLocaleString()} interest earned
                    </span>
                  </div>
                  <div className="rounded-xl bg-rose-500/12 border border-rose-400/30 p-3">
                    <span className="text-xs text-rose-200 block">0.01% Traditional Bank (3 Yrs)</span>
                    <span className="font-mono-tabular text-lg sm:text-xl font-bold text-white">
                      ${hysaSim.traditionalTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-rose-300 block mt-0.5">
                      Only +${hysaSim.traditionalInterestEarned} interest earned
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Interactive Simulator #3: 50/30/20 Payday Router */}
            {slide.interactiveWidget === 'budget-50-30-20' && (
              <div className="rounded-2xl bg-slate-950/90 border border-amber-400/30 p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    50 / 30 / 20 Monthly Paycheck Router
                  </span>
                  <span className="font-mono-tabular text-xs sm:text-sm font-bold text-white">
                    ${simIncome.toLocaleString()} / month
                  </span>
                </div>
                <input
                  type="range"
                  aria-label="Monthly Take-Home Income"
                  min={1000}
                  max={12000}
                  step={200}
                  value={simIncome}
                  onChange={(e) => setSimIncome(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-2.5 sm:p-3">
                    <span className="text-[11px] font-semibold text-emerald-300 block">50% Needs</span>
                    <span className="font-mono-tabular text-sm sm:text-lg font-bold text-white">
                      ${Math.round(simIncome * 0.5).toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-amber-500/15 border border-amber-400/30 p-2.5 sm:p-3">
                    <span className="text-[11px] font-semibold text-amber-300 block">30% Wants</span>
                    <span className="font-mono-tabular text-sm sm:text-lg font-bold text-white">
                      ${Math.round(simIncome * 0.3).toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-cyan-500/15 border border-cyan-400/30 p-2.5 sm:p-3">
                    <span className="text-[11px] font-semibold text-cyan-300 block">20% Future</span>
                    <span className="font-mono-tabular text-sm sm:text-lg font-bold text-white">
                      ${Math.round(simIncome * 0.2).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Interactive Simulator #4: Compound Growth & Index Fund Simulator */}
            {slide.interactiveWidget === 'compound-sim' && (
              <div className="rounded-2xl bg-slate-950/90 border border-violet-400/30 p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-violet-300">
                    <Sliders className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Index Fund Compound Growth Simulator (8% Avg Return)
                    </span>
                  </div>
                  <span className="font-mono-tabular text-xs sm:text-sm font-bold text-emerald-300">
                    Total: ${compoundTotal.toLocaleString()}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    isPhoneView ? '' : 'sm:grid-cols-2'
                  } gap-4`}
                >
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-invest-monthly">Monthly Investment</label>
                      <span className="font-mono-tabular font-bold text-white">
                        ${simInvestMonthly}/mo
                      </span>
                    </div>
                    <input
                      id="sim-invest-monthly"
                      type="range"
                      min={25}
                      max={1500}
                      step={25}
                      value={simInvestMonthly}
                      onChange={(e) => setSimInvestMonthly(Number(e.target.value))}
                      className="w-full accent-violet-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <label htmlFor="sim-invest-years">Investment Time Horizon</label>
                      <span className="font-mono-tabular font-bold text-white">
                        {simInvestYears} Years
                      </span>
                    </div>
                    <input
                      id="sim-invest-years"
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

                <div
                  className={`grid grid-cols-1 ${
                    isPhoneView ? '' : 'sm:grid-cols-2'
                  } gap-3 pt-1`}
                >
                  <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
                    <span className="text-xs text-slate-300 block">Total You Invested (Principal)</span>
                    <span className="font-mono-tabular text-base sm:text-lg font-bold text-white">
                      ${compoundPrincipal.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3">
                    <span className="text-xs text-emerald-200 block">Compound Investment Growth</span>
                    <span className="font-mono-tabular text-base sm:text-lg font-bold text-emerald-300">
                      +${compoundGains.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Tip Footer */}
            {slide.proTip && (
              <div className="rounded-2xl bg-amber-500/12 border border-amber-400/30 p-3.5 sm:p-4 flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  <strong className="text-amber-300">Onit Pro Tip: </strong>
                  {slide.proTip}
                </p>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            QUIZ SLIDE VIEW (2 Tries Before Offering Solution on 3rd Time)
           ========================================================= */}
        {slide.type !== 'content' && slide.options && (() => {
          const attemptsCount = existingRecord?.attemptsCount || 0;
          const isFullyCorrect = Boolean(existingRecord?.evaluation.isFullyCorrect);
          // Solution is only offered after 2 wrong attempts (for the 3rd try), and revealed if clicked or after 3rd attempt
          const canOfferSolution = Boolean(existingRecord && !isFullyCorrect && attemptsCount >= 2);
          const isSolutionRevealed =
            isFullyCorrect ||
            Boolean(revealedSolutionSlides[historyKey]) ||
            attemptsCount >= 3;

          const handleApplySolution = () => {
            if (!slide.options) return;
            const correctIds = slide.options.filter((o) => o.isCorrect).map((o) => o.id);
            setSelectedIds(correctIds);
            setRevealedSolutionSlides((prev) => ({ ...prev, [historyKey]: true }));
            onSubmitAnswer(module.id, slide.id, correctIds);
          };

          return (
            <div className="mt-5 space-y-4">
              {existingRecord && (
                <div
                  className={`rounded-2xl border p-3.5 sm:p-4 flex flex-col ${
                    isPhoneView ? '' : 'sm:flex-row sm:items-center'
                  } justify-between gap-3 ${
                    isFullyCorrect
                      ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                      : 'bg-amber-500/15 border-amber-400/40 text-amber-100'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isFullyCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm">
                      <p className="font-bold text-white">
                        {isFullyCorrect
                          ? 'Quiz Completed — 100% Correct!'
                          : attemptsCount === 1
                          ? `Not Quite Right — Try Once More! (1st of 2 Tries Used)`
                          : !isSolutionRevealed
                          ? `2nd Try Used — Ready for Your 3rd Try or View Solution`
                          : `Solution Revealed (${existingRecord.evaluation.correctSelectedCount} of ${existingRecord.evaluation.totalCorrectRequired} correct selected)`}
                      </p>
                      <p className="text-slate-200 mt-0.5">
                        {isFullyCorrect
                          ? 'Review the explanations below, or continue to the next slide anytime.'
                          : attemptsCount === 1
                          ? `You got ${existingRecord.evaluation.correctSelectedCount} of ${existingRecord.evaluation.totalCorrectRequired} right${
                              existingRecord.evaluation.wrongSelectedCount > 0
                                ? ` (${existingRecord.evaluation.wrongSelectedCount} incorrect pick${
                                    existingRecord.evaluation.wrongSelectedCount > 1 ? 's' : ''
                                  })`
                                : ''
                            }. Give it one more try before the solution is offered!`
                          : !isSolutionRevealed
                          ? 'You have tried twice. You can now tap "Show Solution" to see the right answers, or try a 3rd time below.'
                          : 'Check the highlighted solution badges below, select the correct options, and tap Check Answer (or tap Apply Solution).'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {canOfferSolution && !isSolutionRevealed && (
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedSolutionSlides((prev) => ({
                            ...prev,
                            [historyKey]: true,
                          }))
                        }
                        className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                      >
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Show Solution</span>
                      </button>
                    )}

                    {!isFullyCorrect && isSolutionRevealed && (
                      <button
                        type="button"
                        onClick={handleApplySolution}
                        className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Apply Solution</span>
                      </button>
                    )}

                    {(isFullyCorrect || isSolutionRevealed) && (
                      <button
                        type="button"
                        onClick={() => {
                          setRevealedSolutionSlides((prev) => {
                            const next = { ...prev };
                            delete next[historyKey];
                            return next;
                          });
                          onResetSingleQuestion(module.id, slide.id);
                        }}
                        className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-white/15 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Reset Question</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-3.5 sm:p-5">
                <p className="text-sm sm:text-base font-bold text-white">
                  {slide.questionPrompt}
                </p>
                <p className="text-xs text-cyan-300 mt-1 font-medium">
                  {slide.helperInstruction}
                </p>
              </div>

              {/* Option Cards: Per-option right/wrong/missed solution is hidden on 1st wrong try and only shown if correct or on 3rd try / Show Solution */}
              <div className="space-y-3" role="group" aria-label={slide.questionPrompt}>
                {slide.options.map((option) => {
                  const isSelected = selectedIds.includes(option.id);
                  const breakdownItem = existingRecord?.evaluation.optionBreakdown.find(
                    (b) => b.optionId === option.id
                  );
                  const feedbackStatus = breakdownItem?.status;

                  let cardStyle =
                    'bg-slate-900/80 border-white/12 hover:border-white/30 text-slate-100';
                  let statusBadge: React.ReactNode = null;

                  if (existingRecord && isSolutionRevealed && feedbackStatus) {
                    if (feedbackStatus === 'correct-selected') {
                      cardStyle =
                        'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/10';
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>✓ Correct Selection</span>
                        </span>
                      );
                    } else if (feedbackStatus === 'wrong-selected') {
                      cardStyle =
                        'bg-rose-500/20 border-rose-400 text-white shadow-lg shadow-rose-500/10';
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300">
                          <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>✕ Incorrect Selection (Uncheck)</span>
                        </span>
                      );
                    } else if (feedbackStatus === 'missed-correct') {
                      cardStyle =
                        'bg-amber-500/15 border-amber-400/80 border-dashed text-white';
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>• Correct Answer (Missed — Select This)</span>
                        </span>
                      );
                    } else {
                      cardStyle = 'bg-slate-950/50 border-white/8 text-slate-400';
                    }
                  } else if (isSelected) {
                    cardStyle =
                      'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10';
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleToggleOption(option.id)}
                      role={slide.type === 'select-all' ? 'checkbox' : 'radio'}
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleToggleOption(option.id);
                        }
                      }}
                      className={`rounded-2xl border p-3.5 sm:p-5 transition-all cursor-pointer select-none ${cardStyle}`}
                    >
                      <div
                        className={`flex flex-col ${
                          isPhoneView ? '' : 'sm:flex-row sm:items-start'
                        } justify-between gap-2`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                              isSelected
                                ? 'bg-emerald-400 border-emerald-400 text-slate-950'
                                : 'border-white/30 bg-slate-950'
                            }`}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-base font-medium leading-snug">
                            {option.label}
                          </span>
                        </div>

                        {statusBadge && (
                          <div className={`${isPhoneView ? 'pl-8' : 'pl-8 sm:pl-0'} shrink-0`}>
                            {statusBadge}
                          </div>
                        )}
                      </div>

                      {existingRecord && isSolutionRevealed && (
                        <div className="mt-2.5 pl-8 text-xs text-slate-200 border-t border-white/10 pt-2">
                          {option.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {validationMessage && (
                <div role="alert" className="rounded-xl bg-rose-500/15 border border-rose-400/40 px-4 py-2.5 text-xs font-medium text-rose-200">
                  {validationMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all cursor-pointer"
                >
                  {!existingRecord
                    ? 'Check Answer'
                    : isFullyCorrect
                    ? 'Update / Re-Verify Answer'
                    : attemptsCount === 1
                    ? 'Submit 2nd Try'
                    : 'Submit 3rd Try'}
                </button>

                {existingRecord && isSolutionRevealed && slide.overallTakeaway && (
                  <p className="text-xs sm:text-sm text-emerald-300 font-medium flex-1">
                    <strong>Key Takeaway:</strong> {slide.overallTakeaway}
                  </p>
                )}
              </div>
            </div>
          );
        })()}

        {/* Module Completion Requirement Callout on Final Slide when not yet unlocked */}
        {isLastSlide && !isModuleCompleted && !completionGate.canComplete && (
          <div className="mt-5 rounded-2xl bg-amber-500/12 border border-amber-400/35 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Lock className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs text-amber-100 leading-relaxed">
                <p className="font-bold text-amber-300">
                  Complete Button Locked (70%+ Quiz Score & All Slides Required)
                </p>
                <p className="mt-0.5">{completionGate.lockReason}</p>
              </div>
            </div>

            {!completionGate.allSlidesViewed ? (
              <button
                type="button"
                onClick={() => {
                  const firstUnviewedIdx = module.slides.findIndex(
                    (s) => !effectiveViewedSlideIds.includes(s.id)
                  );
                  if (firstUnviewedIdx !== -1) {
                    onChangeSlideIndex(firstUnviewedIdx);
                  }
                }}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer hover:brightness-110 transition-all"
              >
                Go to Unviewed Slide
              </button>
            ) : (
              !completionGate.meetsPassingScore &&
              slide.type === 'content' && (
                <button
                  type="button"
                  onClick={() => {
                    const quizIdx = module.slides.findIndex((s) => s.type !== 'content');
                    if (quizIdx !== -1) {
                      onChangeSlideIndex(quizIdx);
                    }
                  }}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer hover:brightness-110 transition-all"
                >
                  Go to Quiz
                </button>
              )
            )}
          </div>
        )}

        {/* Slide Footer Navigation — Touch-Friendly 2-Column Split on Mobile */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onChangeSlideIndex(Math.max(0, slideIndex - 1))}
            disabled={isFirstSlide}
            className="min-h-[44px] px-3.5 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm font-semibold text-white disabled:opacity-40 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {!isLastSlide ? (
            <button
              type="button"
              onClick={() => onChangeSlideIndex(Math.min(totalSlides - 1, slideIndex + 1))}
              className="min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Next Slide</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          ) : isModuleCompleted ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-slate-400 opacity-55 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-not-allowed select-none"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <span>Completed</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={!completionGate.canComplete}
              onClick={() => {
                if (!completionGate.canComplete) return;
                setShowCelebration(true);
              }}
              title={
                completionGate.canComplete
                  ? `Complete module and claim +${module.xpReward} XP`
                  : completionGate.lockReason
              }
              className={`min-h-[44px] px-3 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                completionGate.canComplete
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 cursor-pointer'
                  : 'bg-slate-800/90 border border-white/15 text-slate-400 opacity-75 cursor-not-allowed'
              }`}
            >
              {completionGate.canComplete ? (
                <>
                  <Trophy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Complete (+{module.xpReward} XP)</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                  <span>Locked (Need 70%+ Quiz)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Confetti & Trophy Celebration Overlay when "Complete" is clicked */}
      {showCelebration && (
        <div
          className={`${
            isPhoneView ? 'fixed inset-0' : 'fixed inset-0'
          } z-[100] flex items-center justify-center bg-[#060911]/90 backdrop-blur-xl px-6 overflow-hidden`}
        >
          {/* Confetti Particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 42 }).map((_, i) => {
              const colors = [
                '#34D399',
                '#22D3EE',
                '#FBBF24',
                '#A78BFA',
                '#FB7185',
                '#6EE7B7',
              ];
              const leftPct = (i * 2.45) % 100;
              const delaySec = (i % 9) * 0.08;
              const durationSec = 1.9 + (i % 5) * 0.25;
              const driftPx = ((i % 7) - 3) * 28;
              const isCircle = i % 3 === 0;
              return (
                <span
                  key={i}
                  className={`absolute top-0 animate-confetti-fall ${
                    isCircle ? 'h-2.5 w-2.5 rounded-full' : 'h-3.5 w-2 rounded-xs'
                  }`}
                  style={
                    {
                      left: `${leftPct}%`,
                      backgroundColor: colors[i % colors.length],
                      animationDelay: `${delaySec}s`,
                      '--confetti-duration': `${durationSec}s`,
                      '--confetti-drift': `${driftPx}px`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>

          {/* Celebration Trophy Card */}
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-[#0D1526] border border-amber-400/40 p-6 sm:p-7 text-center shadow-2xl shadow-amber-500/20 animate-trophy-pop">
            {/* Glowing Trophy Emblem */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/35 via-emerald-400/25 to-cyan-400/25 blur-xl animate-pulse-ring" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-slate-950 shadow-xl shadow-amber-500/30 border-2 border-amber-200">
                <Trophy className="h-10 w-10 stroke-[2.2]" aria-hidden="true" />
              </div>
            </div>

            <p className="mt-4 text-xs font-bold tracking-widest uppercase text-amber-300">
              Module Completed!
            </p>
            <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {module.title}
            </h3>

            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 px-4 py-2 text-sm font-mono-tabular font-bold text-emerald-300">
              <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>+{module.xpReward} XP Earned</span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Great job mastering {module.category.toLowerCase()}. Your XP and progress have been saved to your profile.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowCelebration(false);
                onCompleteModule(module.id);
              }}
              className="mt-5 w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
