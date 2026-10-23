import React from 'react';
import { Wifi, ShieldCheck } from 'lucide-react';
import type { CreditCardItem } from '../data/finlitData';

interface PhysicalCardVisualProps {
  card: CreditCardItem;
  compact?: boolean;
}

export const PhysicalCardVisual: React.FC<PhysicalCardVisualProps> = ({ card, compact = false }) => {
  const { cardVisual, issuer, name, network } = card;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cardVisual.gradient} border border-white/20 shadow-xl ${cardVisual.accentGlow} select-none transition-transform duration-200 group-hover:scale-[1.01] ${
        compact ? 'aspect-[1.586/1] p-4' : 'aspect-[1.586/1] p-5 sm:p-6'
      }`}
      aria-label={`${name} physical card preview`}
    >
      {/* Subtle geometric bank-card pattern overlay */}
      <div className="pointer-events-none absolute inset-0 card-shine" />
      {cardVisual.patternType === 'aurora' && (
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/15 bg-white/5 blur-[1px]" />
      )}
      {cardVisual.patternType === 'prism' && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/12 via-cyan-200/5 to-transparent skew-x-12" />
      )}
      {cardVisual.patternType === 'waves' && (
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-64 rounded-full bg-fuchsia-300/15 blur-2xl" />
      )}
      {(cardVisual.patternType === 'grid' || cardVisual.patternType === 'metallic') && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top Row: Issuer & Contactless */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80 truncate">
              {issuer}
            </p>
            <h4
              className={`${
                compact ? 'text-xs sm:text-sm truncate' : 'text-base sm:text-lg'
              } font-bold tracking-tight text-white drop-shadow-sm`}
            >
              {name}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 text-white/85 shrink-0">
            <Wifi className="h-3.5 w-3.5 rotate-90" aria-hidden="true" />
          </div>
        </div>

        {/* Middle Row: Realistic Metallic EMV Chip */}
        <div className="my-auto flex items-center justify-between py-1">
          <div
            className={`relative flex ${
              compact ? 'h-7 w-9' : 'h-8 w-11'
            } items-center justify-center rounded-md border ${
              cardVisual.chipStyle === 'gold'
                ? 'border-amber-200/60 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600'
                : 'border-slate-200/60 bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500'
            } shadow-inner shrink-0`}
          >
            <div className="h-4 w-6 rounded-xs border border-black/25 grid grid-cols-2 gap-px p-0.5">
              <div className="border-r border-b border-black/20" />
              <div className="border-b border-black/20" />
              <div className="border-r border-black/20" />
              <div />
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono-tabular text-[11px] font-semibold tracking-widest text-white/90 whitespace-nowrap">
              •••• {cardVisual.numberTail}
            </span>
          </div>
        </div>

        {/* Bottom Row: Cardholder & Network Mark */}
        <div className="flex items-center justify-between gap-2 border-t border-white/15 pt-2">
          <div className="flex items-center gap-1.5 text-[10px] text-white/90 whitespace-nowrap truncate">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300 shrink-0" aria-hidden="true" />
            <span className="font-semibold tracking-wide">ONIT VAULT</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{card.annualFee} Fee</span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-bold tracking-tight text-white whitespace-nowrap">
              {network}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
