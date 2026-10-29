import React, { useEffect, useState } from 'react';
import {
  Search,
  Pin,
  Scale,
  Building2,
  CreditCard,
  CheckCircle2,
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
import { useTheme } from '../context/ThemeContext';

interface VaultAndCompareViewProps {
  activeSubTab: 'cards' | 'banks' | 'compare';
  onChangeSubTab: (tab: 'cards' | 'banks' | 'compare') => void;
  pinnedBankIds: string[];
  pinnedCardIds: string[];
  onTogglePinBank: (bankId: string) => void;
  onTogglePinCard: (cardId: string) => void;
  isPhoneView?: boolean;
}

const SIMPLE_CARD_CATEGORIES = [
  { id: 'all', label: 'All Cards' },
  { id: 'pinned', label: 'Pinned' },
  { id: 'All Purchases', label: 'All Purchases' },
  { id: 'Groceries', label: 'Groceries' },
  { id: 'Gas', label: 'Gas' },
  { id: 'Dining', label: 'Dining' },
  { id: 'Online Shopping', label: 'Online Shopping' },
  { id: 'Entertainment', label: 'Entertainment' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Starter', label: 'Starter / Student' },
];

export const VaultAndCompareView: React.FC<VaultAndCompareViewProps> = ({
  activeSubTab,
  onChangeSubTab,
  pinnedBankIds,
  pinnedCardIds,
  onTogglePinBank,
  onTogglePinCard,
  isPhoneView = false,
}) => {
  const { isModern } = useTheme();
  const [bankSearch, setBankSearch] = useState('');
  const [bankCategory, setBankCategory] = useState('all');
  // Multi-category selection for credit cards (empty array = 'all')
  const [selectedCardCategories, setSelectedCardCategories] = useState<string[]>([]);

  const [selectedCardDetail, setSelectedCardDetail] = useState<CreditCardItem | null>(null);
  const [selectedBankDetail, setSelectedBankDetail] = useState<BankItem | null>(null);

  useEffect(() => {
    if (selectedCardDetail || selectedBankDetail) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedCardDetail, selectedBankDetail]);

  const [compareMode, setCompareMode] = useState<'cards' | 'banks'>('cards');
  const [selectedCompareCardIds, setSelectedCompareCardIds] = useState<string[]>([]);
  const [selectedCompareBankIds, setSelectedCompareBankIds] = useState<string[]>([]);

  const handleToggleCardCategory = (catId: string) => {
    if (catId === 'all') {
      setSelectedCardCategories([]);
      return;
    }
    setSelectedCardCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const sortedBanks = filterAndSortWithPinnedFirst(
    BANKS_DATA,
    pinnedBankIds,
    bankSearch,
    bankCategory
  );

  const sortedCards = filterAndSortWithPinnedFirst(
    CREDIT_CARDS_DATA,
    pinnedCardIds,
    '',
    selectedCardCategories.length === 0 ? 'all' : selectedCardCategories
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

  const subCardClass = isModern
    ? 'rounded-2xl bg-slate-900/55 border border-white/14 shadow-inner'
    : 'rounded-xl bg-slate-950/90 border border-white/10';

  const primaryCtaClass = isModern
    ? 'rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 font-semibold shadow-[0_8px_20px_-4px_rgba(52,211,153,0.35)] hover:brightness-105'
    : 'rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold shadow-md shadow-emerald-500/15 hover:brightness-110';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Compact Sub-Tab Switcher */}
      <div
        className={`glass-panel ${
          isModern ? 'rounded-[28px] p-3 sm:p-3.5' : 'rounded-2xl p-2 sm:p-2.5'
        } flex flex-col sm:flex-row items-center justify-between gap-2.5`}
      >
        <div className="flex items-center gap-2.5 px-2">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center ${
              isModern
                ? 'rounded-2xl bg-gradient-to-br from-emerald-400/25 via-sky-400/20 to-indigo-400/25 border border-white/20 shadow-sm'
                : 'rounded-xl bg-white/10 border border-white/15'
            }`}
          >
            {activeSubTab === 'cards' && (
              <CreditCard className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            )}
            {activeSubTab === 'banks' && (
              <Building2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            )}
            {activeSubTab === 'compare' && (
              <Scale className="h-4 w-4 text-violet-300" aria-hidden="true" />
            )}
          </div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {activeSubTab === 'cards' && 'Credit Cards'}
            {activeSubTab === 'banks' && 'Banks'}
            {activeSubTab === 'compare' && 'Compare Pinned'}
          </h1>
        </div>

        <div
          className={`grid grid-cols-3 items-center gap-1.5 ${
            isModern
              ? 'bg-slate-950/55 p-1.5 rounded-2xl border border-white/14'
              : 'bg-slate-950/90 p-1 rounded-xl border border-white/10'
          } w-full ${isPhoneView ? '' : 'sm:w-auto'} shrink-0`}
        >
          <button
            type="button"
            onClick={() => onChangeSubTab('cards')}
            className={`min-h-[38px] px-2.5 sm:px-3.5 py-1.5 ${
              isModern ? 'rounded-xl' : 'rounded-lg'
            } text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'cards'
                ? isModern
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 shadow-md'
                  : 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Cards ({pinnedCardIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSubTab('banks')}
            className={`min-h-[38px] px-2.5 sm:px-3.5 py-1.5 ${
              isModern ? 'rounded-xl' : 'rounded-lg'
            } text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'banks'
                ? isModern
                  ? 'bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 text-slate-950 shadow-md'
                  : 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Banks ({pinnedBankIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSubTab('compare')}
            className={`min-h-[38px] px-2.5 sm:px-3.5 py-1.5 ${
              isModern ? 'rounded-xl' : 'rounded-lg'
            } text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'compare'
                ? isModern
                  ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-slate-950 shadow-md'
                  : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Compare ({pinnedCardIds.length + pinnedBankIds.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB 1: CREDIT CARDS (Multi-Category Filter + High-Level Overview)
         ========================================================= */}
      {activeSubTab === 'cards' && (
        <div className="space-y-4 sm:space-y-5">
          {/* Multi-Category Filter Bar */}
          <div
            className={`glass-panel ${
              isModern ? 'rounded-[28px] p-4 sm:p-5' : 'rounded-2xl p-3.5 sm:p-4'
            } space-y-2.5`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-emerald-300">
                Filter by Category (Select One or More):
              </span>
              {selectedCardCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCardCategories([])}
                  className="text-xs font-semibold text-slate-300 hover:text-white underline cursor-pointer"
                >
                  Clear Filters ({selectedCardCategories.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {SIMPLE_CARD_CATEGORIES.map((cat) => {
                const isSelected =
                  cat.id === 'all'
                    ? selectedCardCategories.length === 0
                    : selectedCardCategories.includes(cat.id);
                const label =
                  cat.id === 'pinned'
                    ? `Pinned (${pinnedCardIds.length})`
                    : cat.label;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleToggleCardCategory(cat.id)}
                    className={`min-h-[38px] px-3.5 py-1.5 ${
                      isModern ? 'rounded-2xl' : 'rounded-xl'
                    } text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? isModern
                          ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 shadow-[0_6px_16px_-4px_rgba(52,211,153,0.4)]'
                          : 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-sm'
                        : isModern
                        ? 'bg-white/10 text-slate-100 hover:bg-white/15 border border-white/14'
                        : 'bg-white/8 text-slate-200 hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    {isSelected && cat.id !== 'all' && (
                      <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                    )}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {sortedCards.length === 0 && (
            <div className="glass-panel rounded-3xl p-6 text-center space-y-3 border border-white/12">
              <p className="text-sm font-bold text-white">
                {selectedCardCategories.includes('pinned') && pinnedCardIds.length === 0
                  ? 'You have no pinned credit cards yet.'
                  : `No cards matched all selected categories (${selectedCardCategories.join(' + ')}).`}
              </p>
              <button
                type="button"
                onClick={() => setSelectedCardCategories([])}
                className="min-h-[40px] px-4 py-2 rounded-2xl bg-emerald-400 text-slate-950 text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
              >
                Show All Cards
              </button>
            </div>
          )}

          {/* High-Level Credit Cards Grid (Full description hidden until clicked) */}
          <div
            className={`grid grid-cols-1 ${
              isPhoneView ? '' : 'lg:grid-cols-2'
            } gap-4 sm:gap-5`}
          >
            {sortedCards.map((card) => {
              const isPinned = pinnedCardIds.includes(card.id);

              return (
                <article
                  key={card.id}
                  onClick={() => setSelectedCardDetail(card)}
                  className={`glass-panel-elevated group ${
                    isModern ? 'rounded-[28px] p-4 sm:p-5' : 'rounded-2xl p-3.5 sm:p-4'
                  } transition-all flex flex-col justify-between cursor-pointer hover:border-emerald-400/45 ${
                    isPinned
                      ? 'border-emerald-400/55 shadow-lg shadow-emerald-500/15'
                      : 'border-white/12'
                  }`}
                >
                  <div>
                    {/* Top Row: Issuer, Annual Fee & Pin Button */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs min-w-0">
                        <span className="font-medium text-emerald-300">{card.issuer}</span>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="font-mono-tabular font-normal text-slate-300">
                          {card.annualFee} Annual Fee
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePinCard(card.id);
                        }}
                        aria-label={
                          isPinned
                            ? `Unpin ${card.name}`
                            : `Pin ${card.name} to top and compare`
                        }
                        className={`min-h-[32px] px-3 py-1 ${
                          isModern ? 'rounded-2xl' : 'rounded-xl'
                        } text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isPinned
                            ? 'bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                            : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                      </button>
                    </div>

                    {/* Compact High-Level Card Info (No image until clicked!) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm sm:text-base font-medium text-white leading-snug">
                          {card.name}
                        </h2>
                        <span className="text-[11px] font-normal text-sky-300 shrink-0">
                          Details →
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {card.upfrontBenefits.map((benefit, i) => (
                          <div
                            key={i}
                            className={`${subCardClass} px-2.5 py-2`}
                          >
                            <span className="font-mono-tabular text-xs sm:text-sm font-medium text-emerald-300 block">
                              {benefit.rate}
                            </span>
                            <span className="text-[11px] text-slate-300 font-normal leading-tight block truncate">
                              {benefit.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Bar: View Card & Details vs Apply */}
                  <div
                    className="mt-3.5 pt-3 border-t border-white/12 grid grid-cols-2 gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCardDetail(card)}
                      className={`min-h-[38px] px-3 py-1.5 ${
                        isModern ? 'rounded-2xl' : 'rounded-xl'
                      } bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-normal text-white flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer`}
                    >
                      <span>View Card &amp; Details</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </button>

                    <a
                      href={card.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[38px] px-3 py-1.5 ${primaryCtaClass} text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer`}
                    >
                      <span>Apply</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: BANKS (Glanceable Only — Zero Word Salad)
         ========================================================= */}
      {activeSubTab === 'banks' && (
        <div className="space-y-3.5">
          {/* Clean Search & Filter Pills */}
          <div
            className={`glass-panel ${
              isModern ? 'rounded-[28px] p-3.5 sm:p-4' : 'rounded-2xl p-3'
            } space-y-2.5`}
          >
            <div className="relative w-full">
              <Search
                className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search banks"
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                placeholder="Search banks..."
                className={`w-full ${
                  isModern
                    ? 'rounded-2xl bg-slate-950/60 border border-white/16'
                    : 'rounded-xl bg-slate-950/90 border border-white/12'
                } pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none`}
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {['all', 'pinned', 'Checking', 'HYSA', 'Hybrid', 'Traditional'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBankCategory(cat)}
                  className={`min-h-[36px] px-3.5 py-1.5 ${
                    isModern ? 'rounded-2xl' : 'rounded-xl'
                  } text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    bankCategory === cat
                      ? isModern
                        ? 'bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 text-slate-950 font-semibold shadow-sm'
                        : 'bg-white text-slate-950 shadow-sm'
                      : 'bg-white/8 text-slate-200 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  {cat === 'all'
                    ? 'All'
                    : cat === 'pinned'
                    ? `Pinned (${pinnedBankIds.length})`
                    : cat}
                </button>
              ))}
            </div>
          </div>

          {sortedBanks.length === 0 ? (
            <div className="glass-panel rounded-3xl p-6 text-center">
              <p className="text-sm font-medium text-white">
                No banks matched &ldquo;{bankSearch}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setBankSearch('');
                  setBankCategory('all');
                }}
                className="mt-3 min-h-[38px] px-4 py-1.5 rounded-2xl bg-cyan-400 text-slate-950 text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {sortedBanks.map((bank) => {
                const isPinned = pinnedBankIds.includes(bank.id);

                return (
                  <article
                    key={bank.id}
                    className={`glass-panel-elevated ${
                      isModern ? 'rounded-[28px] p-4 sm:p-5' : 'rounded-3xl p-4'
                    } transition-all bg-gradient-to-r ${bank.brandGradient} ${
                      isPinned
                        ? 'border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                        : 'border-white/14'
                    }`}
                  >
                    {/* Row 1: Badge + Bank Name + Pin */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                            isModern
                              ? 'rounded-2xl bg-slate-950/70 border border-white/20 shadow-inner'
                              : 'rounded-xl bg-slate-950/90 border border-white/15'
                          } font-mono-tabular text-[11px] font-semibold text-cyan-300`}
                        >
                          {bank.badgeCode}
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-cyan-300">
                            {bank.categoryTag}
                          </span>
                          <h2 className="text-sm sm:text-base font-medium text-white leading-tight truncate">
                            {bank.name}
                          </h2>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTogglePinBank(bank.id)}
                        aria-label={isPinned ? `Unpin ${bank.name}` : `Pin ${bank.name}`}
                        className={`min-h-[34px] px-3 py-1 ${
                          isModern ? 'rounded-2xl' : 'rounded-xl'
                        } text-xs font-medium flex items-center gap-1 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isPinned
                            ? 'bg-amber-300 text-slate-950 shadow-sm'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                      </button>
                    </div>

                    {/* Row 2: Glanceable Numbers (Savings APY, Checking APY, Monthly Fee) */}
                    <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                      <div className={`${subCardClass} px-3 py-2.5`}>
                        <p className="text-[10px] text-slate-400">Savings APY</p>
                        <p className="font-mono-tabular text-sm sm:text-base font-medium text-emerald-300 mt-0.5">
                          {bank.savingsApy}
                        </p>
                      </div>
                      <div className={`${subCardClass} px-3 py-2.5`}>
                        <p className="text-[10px] text-slate-400">Checking</p>
                        <p className="font-mono-tabular text-xs sm:text-sm font-normal text-cyan-300 mt-1">
                          {bank.checkingApy}
                        </p>
                      </div>
                      <div className={`${subCardClass} px-3 py-2.5`}>
                        <p className="text-[10px] text-slate-400">Monthly Fee</p>
                        <p className="font-mono-tabular text-xs sm:text-sm font-normal text-white mt-1">
                          {bank.monthlyFee}
                        </p>
                      </div>
                    </div>

                    {/* Row 3: Single 1-Line Key Takeaway */}
                    <p className="text-xs font-normal text-slate-200 mt-2.5 px-0.5">
                      {bank.tagline}
                    </p>

                    {/* Row 4: Action Buttons */}
                    <div className="mt-3.5 pt-3 border-t border-white/12 grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedBankDetail(bank)}
                        className={`min-h-[40px] px-3 py-2 ${
                          isModern ? 'rounded-2xl bg-slate-950/65' : 'rounded-xl bg-slate-950/85'
                        } hover:bg-slate-900 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer`}
                      >
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </button>

                      <a
                        href={bank.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`min-h-[40px] px-3 py-2 ${primaryCtaClass} text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer`}
                      >
                        <span>Apply</span>
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
            className={`glass-panel ${
              isModern ? 'rounded-[28px] p-4 sm:p-5' : 'rounded-2xl p-4'
            } flex flex-col ${
              isPhoneView ? '' : 'sm:flex-row sm:items-center'
            } justify-between gap-3`}
          >
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white">
                Side-by-Side Comparison
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Compare your pinned cards or banks side-by-side.
              </p>
            </div>

            <div
              className={`grid grid-cols-2 items-center gap-1.5 ${
                isModern
                  ? 'bg-slate-950/55 p-1.5 rounded-2xl border border-white/14'
                  : 'bg-slate-950/90 p-1.5 rounded-xl border border-white/10'
              } w-full ${isPhoneView ? '' : 'sm:w-auto'} shrink-0`}
            >
              <button
                type="button"
                onClick={() => setCompareMode('cards')}
                className={`min-h-[38px] px-3 py-1.5 ${
                  isModern ? 'rounded-xl' : 'rounded-lg'
                } text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'cards'
                    ? isModern
                      ? 'bg-gradient-to-r from-emerald-300 to-teal-300 text-slate-950 shadow-sm'
                      : 'bg-emerald-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Pinned Cards ({pinnedCardsList.length})
              </button>
              <button
                type="button"
                onClick={() => setCompareMode('banks')}
                className={`min-h-[38px] px-3 py-1.5 ${
                  isModern ? 'rounded-xl' : 'rounded-lg'
                } text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  compareMode === 'banks'
                    ? isModern
                      ? 'bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950 shadow-sm'
                      : 'bg-cyan-400 text-slate-950'
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
              <div
                className={`glass-panel ${
                  isModern ? 'rounded-[28px] p-4' : 'rounded-2xl p-3.5 sm:p-4'
                }`}
              >
                <p className="text-xs font-semibold text-slate-300 mb-2.5">
                  Pinned Credit Cards:
                </p>
                {pinnedCardsList.length === 0 ? (
                  <div className={`${subCardClass} p-6 text-center`}>
                    <p className="text-sm font-bold text-white">
                      You have no pinned credit cards yet.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pin at least 2 credit cards in the Cards tab to compare them side-by-side.
                    </p>
                    <button
                      type="button"
                      onClick={() => onChangeSubTab('cards')}
                      className={`mt-4 min-h-[42px] px-4 py-2 ${primaryCtaClass} text-xs cursor-pointer`}
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
                          className={`min-h-[38px] px-3.5 py-1.5 ${
                            isModern ? 'rounded-2xl' : 'rounded-xl'
                          } text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelectedForMatrix
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-950/60 border-white/15 text-slate-400 hover:text-white'
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
                  <div
                    className={`${
                      isModern ? 'bg-slate-950/60' : 'bg-slate-950/95'
                    } border-b border-white/12 p-3 sm:p-4`}
                  >
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
                          className={`rounded-2xl ${
                            isModern ? 'bg-slate-900/65' : 'bg-slate-900/90'
                          } border border-white/12 p-2.5 sm:p-3 ${
                            idx === 2 ? 'hidden lg:block' : ''
                          }`}
                        >
                          <div className="mb-2 max-w-[200px]">
                            <PhysicalCardVisual card={card} compact />
                          </div>
                          <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 truncate">
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
                        label: 'Best For',
                        render: (c: CreditCardItem) => (
                          <span className="text-slate-300">{c.bestForWho}</span>
                        ),
                      },
                      {
                        label: 'Official Bank Application',
                        render: (c: CreditCardItem) => (
                          <a
                            href={c.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`min-h-[40px] px-2.5 py-2 ${primaryCtaClass} text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all text-center`}
                          >
                            <span>Apply</span>
                            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                          </a>
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
                              className={`${subCardClass} p-2.5 sm:p-3 text-xs leading-relaxed break-words ${
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
              <div
                className={`glass-panel ${
                  isModern ? 'rounded-[28px] p-4' : 'rounded-2xl p-3.5 sm:p-4'
                }`}
              >
                <p className="text-xs font-semibold text-slate-300 mb-2.5">
                  Pinned Banks:
                </p>
                {pinnedBanksList.length === 0 ? (
                  <div className={`${subCardClass} p-6 text-center`}>
                    <p className="text-sm font-bold text-white">
                      You have no pinned banks yet.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pin at least 2 banks in the Banks tab to compare them side-by-side.
                    </p>
                    <button
                      type="button"
                      onClick={() => onChangeSubTab('banks')}
                      className={`mt-4 min-h-[42px] px-4 py-2 ${primaryCtaClass} text-xs cursor-pointer`}
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
                          className={`min-h-[38px] px-3.5 py-1.5 ${
                            isModern ? 'rounded-2xl' : 'rounded-xl'
                          } text-xs font-bold border transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-slate-950/60 border-white/15 text-slate-400 hover:text-white'
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
                  <div
                    className={`${
                      isModern ? 'bg-slate-950/60' : 'bg-slate-950/95'
                    } border-b border-white/12 p-3 sm:p-4`}
                  >
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
                          className={`rounded-2xl ${
                            isModern ? 'bg-slate-900/65' : 'bg-slate-900/90'
                          } border border-white/12 p-3 ${
                            idx === 2 ? 'hidden lg:block' : ''
                          }`}
                        >
                          <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300 block truncate">
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
                        label: 'Official Bank Application',
                        render: (b: BankItem) => (
                          <a
                            href={b.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`min-h-[40px] px-2.5 py-2 ${primaryCtaClass} text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all text-center`}
                          >
                            <span>Apply</span>
                            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                          </a>
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
                              className={`${subCardClass} p-2.5 sm:p-3 text-xs leading-relaxed break-words ${
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

      {/* Deep-Dive Credit Card Modal (Shown only when user clicks a card) */}
      {selectedCardDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCardDetail.name} details`}
          onClick={() => setSelectedCardDetail(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-slate-900 border border-white/15 shadow-2xl"
          >
            {/* Fixed Non-Overlapping Header */}
            <div className="shrink-0 px-5 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-4 bg-slate-900 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-400">
                  {selectedCardDetail.issuer} · {selectedCardDetail.network} · {selectedCardDetail.officialDomain}
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-0.5 leading-snug">
                  {selectedCardDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardDetail(null)}
                aria-label="Close card details"
                className="touch-manipulation min-h-[40px] min-w-[40px] rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dedicated Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8 space-y-4 sm:space-y-5">
              <div className="max-w-xs mx-auto">
                <PhysicalCardVisual card={selectedCardDetail} />
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedCardDetail.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedCardDetail.upfrontBenefits.map((b, i) => (
                  <div key={i} className={`${subCardClass} p-3`}>
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

              <div className={`${subCardClass} p-4 space-y-2 text-xs text-slate-200`}>
                <p>
                  <strong className="text-cyan-300">Welcome Bonus:</strong>{' '}
                  {selectedCardDetail.welcomeBonus}
                </p>
                <p>
                  <strong className="text-emerald-300">Fees & APR:</strong>{' '}
                  {selectedCardDetail.annualFee} Annual Fee · {selectedCardDetail.foreignTxFee} Foreign Fee · {selectedCardDetail.introApr} ({selectedCardDetail.regularApr})
                </p>
                <p>
                  <strong className="text-amber-300">Best For:</strong>{' '}
                  {selectedCardDetail.bestForWho}
                </p>
                <p className="pt-1 text-slate-300 flex items-start gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Pre-Approval Note:</strong>{' '}
                    {selectedCardDetail.preApprovalNote}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:flex sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onTogglePinCard(selectedCardDetail.id)}
                  className="touch-manipulation min-h-[44px] px-4 py-2 rounded-2xl bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
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
                    className={`touch-manipulation min-h-[44px] px-4 py-2.5 ${primaryCtaClass} text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer`}
                  >
                    <span>Apply</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedCardDetail(null)}
                    className="touch-manipulation min-h-[44px] px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Dive Bank Modal (Glanceable Key Facts Only — No Word Salad) */}
      {selectedBankDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedBankDetail.name} details`}
          onClick={() => setSelectedBankDetail(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-slate-900 border border-white/15 shadow-2xl"
          >
            {/* Fixed Non-Overlapping Header */}
            <div className="shrink-0 px-5 pt-4 pb-3.5 sm:px-7 sm:pt-5 sm:pb-4 bg-slate-900 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-cyan-400">
                  {selectedBankDetail.categoryTag} · {selectedBankDetail.fdicInsured}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                  {selectedBankDetail.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBankDetail(null)}
                aria-label="Close bank details"
                className="touch-manipulation min-h-[38px] min-w-[38px] rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dedicated Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 pt-4 pb-5 sm:px-7 sm:pt-5 sm:pb-6 space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div className={`${subCardClass} p-3`}>
                  <span className="text-[11px] text-slate-400 block">Savings APY</span>
                  <span className="font-mono-tabular text-lg font-bold text-emerald-300">
                    {selectedBankDetail.savingsApy}
                  </span>
                </div>
                <div className={`${subCardClass} p-3`}>
                  <span className="text-[11px] text-slate-400 block">Checking</span>
                  <span className="font-mono-tabular text-lg font-bold text-cyan-300">
                    {selectedBankDetail.checkingApy}
                  </span>
                </div>
                <div className={`${subCardClass} p-3`}>
                  <span className="text-[11px] text-slate-400 block">Monthly Fee</span>
                  <span className="font-mono-tabular text-sm font-bold text-white">
                    {selectedBankDetail.monthlyFee}
                  </span>
                </div>
                <div className={`${subCardClass} p-3`}>
                  <span className="text-[11px] text-slate-400 block">ATMs</span>
                  <span className="text-xs font-bold text-white">
                    {selectedBankDetail.atmAccess}
                  </span>
                </div>
              </div>

              <ul className={`space-y-2 ${subCardClass} p-3.5`}>
                {selectedBankDetail.topFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/25 p-3.5 space-y-2 text-xs text-slate-200">
                <p>
                  <strong className="text-emerald-300">Best For:</strong>{' '}
                  {selectedBankDetail.verdict}
                </p>
                <p className="pt-1.5 border-t border-white/10">
                  <strong className="text-amber-300">Watch Out:</strong>{' '}
                  {selectedBankDetail.watchOutFor}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:flex sm:items-center justify-between gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onTogglePinBank(selectedBankDetail.id)}
                  className="touch-manipulation min-h-[42px] px-4 py-2 rounded-2xl bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Pin className="h-4 w-4" />
                  <span>
                    {pinnedBankIds.includes(selectedBankDetail.id)
                      ? 'Pinned'
                      : 'Pin Bank'}
                  </span>
                </button>

                <div className="grid grid-cols-2 sm:flex items-center gap-2">
                  <a
                    href={selectedBankDetail.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`touch-manipulation min-h-[42px] px-4 py-2 ${primaryCtaClass} text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer`}
                  >
                    <span>Apply</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedBankDetail(null)}
                    className="touch-manipulation min-h-[42px] px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
