import React, { useState } from 'react';
import {
  Search,
  Pin,
  Scale,
  Building2,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  ArrowRight,
  Check,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  BANKS_DATA,
  CREDIT_CARDS_DATA,
  type BankItem,
  type CreditCardItem,
} from '../data/finlitData';
import {
  filterAndSortWithPinnedFirst,
  getPinnedComparableItems,
} from '../utils/logic';
import { PhysicalCardVisual } from './PhysicalCardVisual';

interface VaultAndCompareViewProps {
  activeSubTab: 'cards' | 'banks' | 'compare';
  onChangeSubTab: (tab: 'cards' | 'banks' | 'compare') => void;
  pinnedBankIds: string[];
  pinnedCardIds: string[];
  onTogglePinBank: (bankId: string) => void;
  onTogglePinCard: (cardId: string) => void;
  isPhoneView?: boolean;
}

export const VaultAndCompareView: React.FC<VaultAndCompareViewProps> = ({
  activeSubTab,
  onChangeSubTab,
  pinnedBankIds,
  pinnedCardIds,
  onTogglePinBank,
  onTogglePinCard,
  isPhoneView = false,
}) => {
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategory, setBankCategory] = useState('all');
  const [cardSearch, setCardSearch] = useState('');
  const [cardCategory, setCardCategory] = useState('all');

  const [selectedCardDetail, setSelectedCardDetail] = useState<CreditCardItem | null>(null);
  const [selectedBankDetail, setSelectedBankDetail] = useState<BankItem | null>(null);

  const [compareMode, setCompareMode] = useState<'cards' | 'banks'>('cards');
  const [selectedCompareCardIds, setSelectedCompareCardIds] = useState<string[]>([]);
  const [selectedCompareBankIds, setSelectedCompareBankIds] = useState<string[]>([]);

  const sortedBanks = filterAndSortWithPinnedFirst(
    BANKS_DATA,
    pinnedBankIds,
    bankSearch,
    bankCategory
  );

  const sortedCards = filterAndSortWithPinnedFirst(
    CREDIT_CARDS_DATA,
    pinnedCardIds,
    cardSearch,
    cardCategory
  );

  const pinnedCardsList = getPinnedComparableItems(CREDIT_CARDS_DATA, pinnedCardIds);
  const pinnedBanksList = getPinnedComparableItems(BANKS_DATA, pinnedBankIds);

  const maxCompareCols = isPhoneView ? 2 : 3;

  const activeComparedCards =
    selectedCompareCardIds.length > 0
      ? pinnedCardsList.filter((c) => selectedCompareCardIds.includes(c.id))
      : pinnedCardsList.slice(0, maxCompareCols);

  const activeComparedBanks =
    selectedCompareBankIds.length > 0
      ? pinnedBanksList.filter((b) => selectedCompareBankIds.includes(b.id))
      : pinnedBanksList.slice(0, maxCompareCols);

  const toggleCompareSelectionCard = (cardId: string) => {
    setSelectedCompareCardIds((prev) => {
      const current =
        prev.length > 0 ? prev : pinnedCardsList.slice(0, maxCompareCols).map((c) => c.id);
      if (current.includes(cardId)) {
        return current.filter((id) => id !== cardId);
      }
      return [...current, cardId];
    });
  };

  const toggleCompareSelectionBank = (bankId: string) => {
    setSelectedCompareBankIds((prev) => {
      const current =
        prev.length > 0 ? prev : pinnedBanksList.slice(0, maxCompareCols).map((b) => b.id);
      if (current.includes(bankId)) {
        return current.filter((id) => id !== bankId);
      }
      return [...current, bankId];
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Mode Switcher — Zero Clipping on Mobile & iPhone View */}
      <div
        className={`glass-panel rounded-3xl p-4 sm:p-6 flex flex-col ${
          isPhoneView ? '' : 'lg:flex-row lg:items-center'
        } justify-between gap-4`}
      >
        <div>
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
            {activeSubTab === 'cards' && 'Credit Card Directory'}
            {activeSubTab === 'banks' && 'High-Yield Banking Directory'}
            {activeSubTab === 'compare' && 'Side-by-Side Comparison'}
          </p>
          <h1
            className={`${
              isPhoneView ? 'text-xl' : 'text-xl sm:text-3xl'
            } font-bold text-white tracking-tight mt-0.5`}
          >
            {activeSubTab === 'cards' && 'Explore Credit Cards'}
            {activeSubTab === 'banks' && 'Search Banks & High-Yield Accounts'}
            {activeSubTab === 'compare' && 'Compare Your Pinned Choices'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {activeSubTab === 'cards' &&
              'Browse cashback multipliers, annual fees, welcome bonuses, and card perks.'}
            {activeSubTab === 'banks' &&
              'Search high-yield savings and zero-fee checking accounts by APY, ATM access, and account features.'}
            {activeSubTab === 'compare' &&
              'Compare your pinned credit cards and pinned banks head-to-head.'}
          </p>
        </div>

        {/* Sub-Tab Selector — Fits 100% inside 375px iPhone screen without clipping */}
        <div
          className={`grid grid-cols-3 items-center gap-1 bg-slate-950/85 p-1.5 rounded-2xl border border-white/10 w-full ${
            isPhoneView ? '' : 'lg:w-auto'
          } shrink-0`}
        >
          <button
            type="button"
            onClick={() => onChangeSubTab('cards')}
            className={`min-h-[40px] px-2 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'cards'
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Cards ({pinnedCardIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSubTab('banks')}
            className={`min-h-[40px] px-2 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'banks'
                ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Banks ({pinnedBankIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSubTab('compare')}
            className={`min-h-[40px] px-2 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'compare'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Compare ({pinnedCardIds.length + pinnedBankIds.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB 1: CREDIT CARDS
         ========================================================= */}
      {activeSubTab === 'cards' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Search & Swipeable Category Filter Bar */}
          <div className="glass-panel rounded-2xl p-3.5 sm:p-4 space-y-3">
            <div className="relative w-full">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search credit cards by reward category, issuer, or perk"
                value={cardSearch}
                onChange={(e) => setCardSearch(e.target.value)}
                placeholder="Search cards (e.g., '3% Groceries', 'Gas', 'Online', 'Dining')..."
                className="w-full rounded-xl bg-slate-950/90 border border-white/12 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {[
                'all',
                'pinned',
                'Groceries & Gas',
                'Dining & Entertainment',
                'Cash Back & Starter',
                'Travel & Rent',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCardCategory(cat)}
                  className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    cardCategory === cat
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-white/6 text-slate-300 hover:bg-white/12'
                  }`}
                >
                  {cat === 'all'
                    ? 'All Cards'
                    : cat === 'pinned'
                    ? `Pinned (${pinnedCardIds.length})`
                    : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Credit Cards Grid */}
          <div
            className={`grid grid-cols-1 ${
              isPhoneView ? '' : 'lg:grid-cols-2'
            } gap-5`}
          >
            {sortedCards.map((card) => {
              const isPinned = pinnedCardIds.includes(card.id);

              return (
                <article
                  key={card.id}
                  className={`glass-panel-elevated group rounded-3xl p-4 sm:p-6 transition-all flex flex-col justify-between ${
                    isPinned
                      ? 'border-emerald-400/50 shadow-lg shadow-emerald-500/10'
                      : 'border-white/10'
                  }`}
                >
                  <div>
                    {/* Top Row: Category/Issuer & Pin Button */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 min-w-0">
                        <span className="font-semibold text-emerald-400">{card.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{card.issuer}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTogglePinCard(card.id)}
                        aria-label={isPinned ? `Unpin ${card.name}` : `Pin ${card.name} to top and compare`}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isPinned
                            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                            : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isPinned ? 'Pinned' : 'Pin Card'}</span>
                      </button>
                    </div>

                    {/* Bank-Style Physical Card Picture + Upfront Multipliers */}
                    <div
                      className={`grid grid-cols-1 ${
                        isPhoneView ? '' : 'sm:grid-cols-12'
                      } gap-4 sm:gap-5 items-center`}
                    >
                      <div className={isPhoneView ? '' : 'sm:col-span-6'}>
                        <PhysicalCardVisual card={card} compact />
                      </div>

                      <div className={`${isPhoneView ? '' : 'sm:col-span-6'} space-y-2`}>
                        <p className="text-xs font-bold text-cyan-300 tracking-wide">
                          Key Rewards & Multipliers:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {card.upfrontBenefits.map((benefit, i) => (
                            <div
                              key={i}
                              className="rounded-xl bg-slate-950/90 border border-white/12 p-2.5"
                            >
                              <span className="font-mono-tabular text-base sm:text-xl font-bold text-emerald-300 block">
                                {benefit.rate}
                              </span>
                              <span className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight block mt-0.5">
                                {benefit.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 px-3 py-2 text-xs font-semibold text-emerald-200">
                      {card.upfrontSummaryLine}
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="mt-3 rounded-xl bg-slate-950/80 border border-white/10 p-3 text-xs text-slate-200">
                      <span className="font-bold text-cyan-300">Best For: </span>
                      <span>{card.bestForWho}</span>
                    </div>
                  </div>

                  {/* Bottom Specs + Touch-Friendly 2-Column Action Bar */}
                  <div className="mt-4 pt-3.5 border-t border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs text-slate-300 font-mono-tabular">
                      <div className="flex flex-wrap items-center gap-2">
                        <span>
                          Fee: <strong className="text-white">{card.annualFee}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          FTF: <strong className="text-white">{card.foreignTxFee}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Bonus:{' '}
                          <strong className="text-emerald-300">
                            {card.welcomeBonus.split('(')[0]}
                          </strong>
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{card.officialDomain}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCardDetail(card)}
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>Full Breakdown</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>

                      <a
                        href={card.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/15 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                      >
                        <span>Apply on Bank Website</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: BANKS
         ========================================================= */}
      {activeSubTab === 'banks' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Bank Search & Swipeable Category Filter */}
          <div className="glass-panel rounded-2xl p-3.5 sm:p-4 space-y-3">
            <div className="relative w-full">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search banks by name, APY, ATM access, or perks"
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                placeholder="Search banks (e.g., 'Ally', '4.50% APY', 'Buckets', 'Chase')..."
                className="w-full rounded-xl bg-slate-950/90 border border-white/12 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {['all', 'pinned', 'HYSA', 'Hybrid', 'Traditional'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBankCategory(cat)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    bankCategory === cat
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-white/6 text-slate-300 hover:bg-white/12'
                  }`}
                >
                  {cat === 'all'
                    ? 'All Banks'
                    : cat === 'pinned'
                    ? `Pinned (${pinnedBankIds.length})`
                    : cat}
                </button>
              ))}
            </div>
          </div>

          {sortedBanks.length === 0 ? (
            <div className="glass-panel rounded-3xl p-8 text-center">
              <p className="text-base font-bold text-white">No banks matched "{bankSearch}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for "HYSA", "Zelle", "ATM", or clear the search filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBankSearch('');
                  setBankCategory('all');
                }}
                className="mt-4 min-h-[42px] px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Reset Bank Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {sortedBanks.map((bank) => {
                const isPinned = pinnedBankIds.includes(bank.id);

                return (
                  <article
                    key={bank.id}
                    className={`glass-panel-elevated rounded-3xl p-4 sm:p-6 transition-all bg-gradient-to-r ${bank.brandGradient} ${
                      isPinned
                        ? 'border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                        : 'border-white/12'
                    }`}
                  >
                    {/* Top Row: Bank Badge, Title & Pin Button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950/90 border border-white/15 font-mono-tabular text-xs font-bold text-cyan-300">
                          {bank.badgeCode}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                            <span className="font-semibold text-cyan-300">
                              {bank.institutionType}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-400">{bank.officialDomain}</span>
                          </div>
                          <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                            {bank.name}
                          </h2>
                          <p className="text-xs sm:text-sm font-medium text-emerald-300 mt-0.5">
                            {bank.tagline}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTogglePinBank(bank.id)}
                        aria-label={isPinned ? `Unpin ${bank.name}` : `Pin ${bank.name} to top and compare`}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isPinned
                            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isPinned ? 'Pinned' : 'Pin Bank'}</span>
                      </button>
                    </div>

                    {/* Key Quantitative Metrics Strip (2x2 on mobile/iPhone, 4-col on desktop) */}
                    <div
                      className={`grid grid-cols-2 ${
                        isPhoneView ? '' : 'sm:grid-cols-4'
                      } gap-2.5 sm:gap-3 mt-4`}
                    >
                      <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-3">
                        <p className="text-[11px] text-slate-400">Savings Yield</p>
                        <p className="font-mono-tabular text-base sm:text-xl font-bold text-emerald-300 mt-0.5">
                          {bank.savingsApy}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-3">
                        <p className="text-[11px] text-slate-400">Monthly Fee</p>
                        <p className="font-mono-tabular text-sm sm:text-lg font-bold text-white mt-0.5">
                          {bank.monthlyFee}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-3">
                        <p className="text-[11px] text-slate-400">ATM Network</p>
                        <p className="text-xs font-bold text-cyan-300 mt-1 leading-snug">
                          {bank.atmAccess}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-3">
                        <p className="text-[11px] text-slate-400">Standout Perk</p>
                        <p className="text-xs font-bold text-amber-300 mt-1 leading-snug">
                          {bank.standoutPerk}
                        </p>
                      </div>
                    </div>

                    {/* Description & Verdict */}
                    <div
                      className={`mt-4 grid grid-cols-1 ${
                        isPhoneView ? '' : 'lg:grid-cols-12'
                      } gap-4`}
                    >
                      <div className={`${isPhoneView ? '' : 'lg:col-span-8'} space-y-2`}>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Why It Stands Out
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {bank.description}
                        </p>
                        <ul className="pt-1.5 space-y-1.5">
                          {bank.topFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className={`${
                          isPhoneView ? '' : 'lg:col-span-4'
                        } flex flex-col justify-between gap-3 rounded-2xl bg-slate-950/75 border border-white/10 p-3.5 sm:p-4`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Onit Verdict</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed mt-1">
                            {bank.verdict}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-white/10">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Fine Print Watch-Out</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mt-1">
                            {bank.watchOutFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom 2-Column Action Bar for Banks (Touch-Friendly on iPhone & Desktop) */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedBankDetail(bank)}
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>Inspect Full Specs</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>

                      <a
                        href={bank.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                      >
                        <span>Apply on Bank Website</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: SIDE-BY-SIDE COMPARE STUDIO (Strictly Pinned Items Only)
         ========================================================= */}
      {activeSubTab === 'compare' && (
        <div className="space-y-4">
          <div
            className={`glass-panel rounded-2xl p-4 flex flex-col ${
              isPhoneView ? '' : 'sm:flex-row sm:items-center'
            } justify-between gap-3`}
          >
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white">
                Side-by-Side Comparison
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Select from your pinned credit cards or pinned banks to compare their rates, fees, and perks side-by-side.
              </p>
            </div>

            <div
              className={`grid grid-cols-2 items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-white/10 w-full ${
                isPhoneView ? '' : 'sm:w-auto'
              } shrink-0`}
            >
              <button
                type="button"
                onClick={() => setCompareMode('cards')}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'cards'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Pinned Cards ({pinnedCardsList.length})
              </button>
              <button
                type="button"
                onClick={() => setCompareMode('banks')}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'banks'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Pinned Banks ({pinnedBanksList.length})
              </button>
            </div>
          </div>

          {/* COMPARE CREDIT CARDS */}
          {compareMode === 'cards' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-3.5 sm:p-4">
                <p className="text-xs font-semibold text-slate-300 mb-2.5">
                  Choose Between Your Pinned Credit Cards:
                </p>
                {pinnedCardsList.length === 0 ? (
                  <div className="rounded-xl bg-slate-950/80 border border-white/10 p-6 text-center">
                    <p className="text-sm font-bold text-white">
                      You have no pinned credit cards yet.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pin at least 2 credit cards in the Cards tab to compare them side-by-side.
                    </p>
                    <button
                      type="button"
                      onClick={() => onChangeSubTab('cards')}
                      className="mt-4 min-h-[42px] px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      Go Pin Credit Cards
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                    {pinnedCardsList.map((card) => {
                      const isSelectedForMatrix = activeComparedCards.some(
                        (c) => c.id === card.id
                      );
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => toggleCompareSelectionCard(card.id)}
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelectedForMatrix
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-950/70 border-white/15 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{card.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {activeComparedCards.length > 0 && (
                <div className="glass-panel-elevated rounded-3xl border border-white/15 overflow-hidden">
                  <div className="bg-slate-950/95 border-b border-white/12 p-3 sm:p-4">
                    <div
                      className={`grid gap-2.5 sm:gap-3 ${
                        !isPhoneView && activeComparedCards.length >= 3
                          ? 'grid-cols-2 lg:grid-cols-3'
                          : 'grid-cols-2'
                      }`}
                    >
                      {activeComparedCards.slice(0, maxCompareCols).map((card, idx) => (
                        <div
                          key={card.id}
                          className={`rounded-2xl bg-slate-900/90 border border-white/10 p-2.5 sm:p-3 ${
                            idx === 2 ? 'hidden lg:block' : ''
                          }`}
                        >
                          <div className="mb-2 max-w-[200px]">
                            <PhysicalCardVisual card={card} compact />
                          </div>
                          <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 truncate">
                            {card.issuer}
                          </p>
                          <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">
                            {card.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side-by-Side Split Metric Rows */}
                  <div className="divide-y divide-white/10 p-3 sm:p-5 space-y-3.5">
                    {[
                      {
                        label: 'Key Cashback Multipliers',
                        render: (c: CreditCardItem) => (
                          <span className="text-emerald-300 font-semibold">
                            {c.upfrontSummaryLine}
                          </span>
                        ),
                      },
                      {
                        label: 'Annual Fee & Foreign Tx Fee',
                        render: (c: CreditCardItem) => (
                          <span className="font-mono-tabular font-bold text-white">
                            {c.annualFee} Annual · {c.foreignTxFee} FTF
                          </span>
                        ),
                      },
                      {
                        label: 'Welcome Bonus',
                        render: (c: CreditCardItem) => (
                          <span className="text-cyan-300 font-medium">{c.welcomeBonus}</span>
                        ),
                      },
                      {
                        label: 'Intro APR & Regular APR',
                        render: (c: CreditCardItem) => (
                          <span className="font-mono-tabular text-slate-200">
                            {c.introApr} ({c.regularApr})
                          </span>
                        ),
                      },
                      {
                        label: 'Recommended Credit Score',
                        render: (c: CreditCardItem) => (
                          <span className="text-slate-200">{c.recommendedCreditScore}</span>
                        ),
                      },
                      {
                        label: 'Best For',
                        render: (c: CreditCardItem) => (
                          <span className="text-slate-300">{c.bestForWho}</span>
                        ),
                      },
                      {
                        label: 'Official Bank Application',
                        render: (c: CreditCardItem) => (
                          <div className="space-y-2">
                            <p className="text-[11px] text-slate-400">
                              {c.preApprovalNote}
                            </p>
                            <a
                              href={c.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[40px] px-2.5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 hover:brightness-110 transition-all text-center"
                            >
                              <span>Apply on Bank Website</span>
                              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                            </a>
                          </div>
                        ),
                      },
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="pt-3 first:pt-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {row.label}
                        </p>
                        <div
                          className={`grid gap-2.5 sm:gap-3 ${
                            !isPhoneView && activeComparedCards.length >= 3
                              ? 'grid-cols-2 lg:grid-cols-3'
                              : 'grid-cols-2'
                          }`}
                        >
                          {activeComparedCards.slice(0, maxCompareCols).map((card, idx) => (
                            <div
                              key={card.id}
                              className={`rounded-xl bg-slate-950/75 border border-white/8 p-2.5 sm:p-3 text-xs leading-relaxed break-words ${
                                idx === 2 ? 'hidden lg:block' : ''
                              }`}
                            >
                              {row.render(card)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* COMPARE BANKS */}
          {compareMode === 'banks' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-3.5 sm:p-4">
                <p className="text-xs font-semibold text-slate-300 mb-2.5">
                  Choose Between Your Pinned Banks:
                </p>
                {pinnedBanksList.length === 0 ? (
                  <div className="rounded-xl bg-slate-950/80 border border-white/10 p-6 text-center">
                    <p className="text-sm font-bold text-white">
                      You have no pinned banks yet.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pin at least 2 banks in the Banks tab to compare them side-by-side.
                    </p>
                    <button
                      type="button"
                      onClick={() => onChangeSubTab('banks')}
                      className="mt-4 min-h-[42px] px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      Go Pin Banks
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                    {pinnedBanksList.map((bank) => {
                      const isSelected = activeComparedBanks.some((b) => b.id === bank.id);
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => toggleCompareSelectionBank(bank.id)}
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-slate-950/70 border-white/15 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{bank.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {activeComparedBanks.length > 0 && (
                <div className="glass-panel-elevated rounded-3xl border border-white/15 overflow-hidden">
                  <div className="bg-slate-950/95 border-b border-white/12 p-3 sm:p-4">
                    <div
                      className={`grid gap-2.5 sm:gap-3 ${
                        !isPhoneView && activeComparedBanks.length >= 3
                          ? 'grid-cols-2 lg:grid-cols-3'
                          : 'grid-cols-2'
                      }`}
                    >
                      {activeComparedBanks.slice(0, maxCompareCols).map((bank, idx) => (
                        <div
                          key={bank.id}
                          className={`rounded-2xl bg-slate-900/90 border border-white/10 p-3 ${
                            idx === 2 ? 'hidden lg:block' : ''
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-400 block truncate">
                            {bank.institutionType}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">
                            {bank.name}
                          </h3>
                          <span className="font-mono-tabular text-xs sm:text-sm font-bold text-emerald-300 mt-1 block">
                            {bank.savingsApy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side-by-Side Split Bank Rows */}
                  <div className="divide-y divide-white/10 p-3 sm:p-5 space-y-3.5">
                    {[
                      {
                        label: 'Savings APY & Checking APY',
                        render: (b: BankItem) => (
                          <span className="font-mono-tabular font-bold text-emerald-300">
                            {b.savingsApy} Savings · {b.checkingApy} Checking
                          </span>
                        ),
                      },
                      {
                        label: 'Monthly Fee & Minimum Deposit',
                        render: (b: BankItem) => (
                          <span className="font-mono-tabular font-bold text-white">
                            {b.monthlyFee} · {b.minimumDeposit} Min
                          </span>
                        ),
                      },
                      {
                        label: 'Overdraft Protection Policy',
                        render: (b: BankItem) => (
                          <span className="text-slate-200">{b.overdraftPolicy}</span>
                        ),
                      },
                      {
                        label: 'ATM Access & Reimbursements',
                        render: (b: BankItem) => (
                          <span className="text-cyan-300 font-medium">{b.atmAccess}</span>
                        ),
                      },
                      {
                        label: 'Standout Highlight Perk',
                        render: (b: BankItem) => (
                          <span className="text-amber-300 font-medium">
                            {b.standoutPerk}
                          </span>
                        ),
                      },
                      {
                        label: 'Onit Verdict',
                        render: (b: BankItem) => (
                          <span className="text-slate-300">{b.verdict}</span>
                        ),
                      },
                      {
                        label: 'Official Bank Website Application',
                        render: (b: BankItem) => (
                          <div className="space-y-2">
                            <p className="text-[11px] text-slate-400">
                              {b.preApprovalNote}
                            </p>
                            <a
                              href={b.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[40px] px-2.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 hover:brightness-110 transition-all text-center"
                            >
                              <span>Apply on Bank Website</span>
                              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                            </a>
                          </div>
                        ),
                      },
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="pt-3 first:pt-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          {row.label}
                        </p>
                        <div
                          className={`grid gap-2.5 sm:gap-3 ${
                            !isPhoneView && activeComparedBanks.length >= 3
                              ? 'grid-cols-2 lg:grid-cols-3'
                              : 'grid-cols-2'
                          }`}
                        >
                          {activeComparedBanks.slice(0, maxCompareCols).map((bank, idx) => (
                            <div
                              key={bank.id}
                              className={`rounded-xl bg-slate-950/75 border border-white/8 p-2.5 sm:p-3 text-xs leading-relaxed break-words ${
                                idx === 2 ? 'hidden lg:block' : ''
                              }`}
                            >
                              {row.render(bank)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Deep-Dive Credit Card Modal */}
      {selectedCardDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCardDetail.name} details`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3.5 sm:p-4 overflow-y-auto"
        >
          <div className="glass-panel-elevated w-full max-w-2xl rounded-3xl p-5 sm:p-8 border border-white/15 my-auto space-y-4 sm:space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-400">
                  {selectedCardDetail.issuer} · {selectedCardDetail.network} · {selectedCardDetail.officialDomain}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedCardDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardDetail(null)}
                aria-label="Close card details"
                className="min-h-[40px] min-w-[40px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-w-xs mx-auto">
              <PhysicalCardVisual card={selectedCardDetail} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {selectedCardDetail.upfrontBenefits.map((b, i) => (
                <div key={i} className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                  <span className="font-mono-tabular text-lg sm:text-xl font-bold text-emerald-300 block">
                    {b.rate}
                  </span>
                  <span className="text-xs font-semibold text-white block mt-0.5">
                    {b.category}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {b.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4 space-y-2 text-xs text-slate-200">
              <p>
                <strong className="text-cyan-300">Welcome Bonus:</strong>{' '}
                {selectedCardDetail.welcomeBonus}
              </p>
              <p>
                <strong className="text-emerald-300">APR Terms:</strong>{' '}
                {selectedCardDetail.introApr} · {selectedCardDetail.regularApr}
              </p>
              <p>
                <strong className="text-amber-300">Best For:</strong>{' '}
                {selectedCardDetail.bestForWho}
              </p>
              <p className="pt-1 text-slate-300 flex items-start gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Official Pre-Approval Note:</strong>{' '}
                  {selectedCardDetail.preApprovalNote}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => onTogglePinCard(selectedCardDetail.id)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Pin className="h-4 w-4" />
                <span>
                  {pinnedCardIds.includes(selectedCardDetail.id)
                    ? 'Pinned to Top & Compare'
                    : 'Pin This Card'}
                </span>
              </button>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
                <a
                  href={selectedCardDetail.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Apply on Bank Website</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCardDetail(null)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Dive Bank Modal */}
      {selectedBankDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedBankDetail.name} details`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3.5 sm:p-4 overflow-y-auto"
        >
          <div className="glass-panel-elevated w-full max-w-2xl rounded-3xl p-5 sm:p-8 border border-white/15 my-auto space-y-4 sm:space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyan-400">
                  {selectedBankDetail.institutionType} · {selectedBankDetail.fdicInsured} · {selectedBankDetail.officialDomain}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedBankDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBankDetail(null)}
                aria-label="Close bank details"
                className="min-h-[40px] min-w-[40px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                <span className="text-xs text-slate-400 block">Savings APY</span>
                <span className="font-mono-tabular text-base sm:text-lg font-bold text-emerald-300">
                  {selectedBankDetail.savingsApy}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                <span className="text-xs text-slate-400 block">Checking APY</span>
                <span className="font-mono-tabular text-base sm:text-lg font-bold text-cyan-300">
                  {selectedBankDetail.checkingApy}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                <span className="text-xs text-slate-400 block">Monthly Fee</span>
                <span className="font-mono-tabular text-sm sm:text-base font-bold text-white">
                  {selectedBankDetail.monthlyFee}
                </span>
              </div>
              <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3">
                <span className="text-xs text-slate-400 block">Zelle®</span>
                <span className="text-xs font-bold text-white">
                  {selectedBankDetail.zelleSupport}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {selectedBankDetail.description}
            </p>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-4 space-y-2 text-xs text-slate-200">
              <div>
                <strong className="text-emerald-300 block mb-1">
                  Onit Verdict:
                </strong>
                {selectedBankDetail.verdict}
              </div>
              <p className="pt-2 border-t border-white/10 text-slate-300 flex items-start gap-1.5">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Official Account Opening Note:</strong>{' '}
                  {selectedBankDetail.preApprovalNote}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => onTogglePinBank(selectedBankDetail.id)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Pin className="h-4 w-4" />
                <span>
                  {pinnedBankIds.includes(selectedBankDetail.id)
                    ? 'Pinned to Top & Compare'
                    : 'Pin This Bank'}
                </span>
              </button>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
                <a
                  href={selectedBankDetail.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Apply on Bank Website</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedBankDetail(null)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
