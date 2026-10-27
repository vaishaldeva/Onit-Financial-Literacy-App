import React from 'react';
import { Wifi } from 'lucide-react';
import type { CreditCardItem } from '../data/finlitData';

interface PhysicalCardVisualProps {
  card: CreditCardItem;
  compact?: boolean;
}

export const PhysicalCardVisual: React.FC<PhysicalCardVisualProps> = ({
  card,
  compact = false,
}) => {
  const { id, cardVisual, issuer, name, network } = card;

  const renderEmvChip = (style: 'gold' | 'silver') => (
    <div
      className={`relative flex ${
        compact ? 'h-6 w-8' : 'h-8 w-11'
      } items-center justify-center rounded-md border ${
        style === 'gold'
          ? 'border-amber-200/70 bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600'
          : 'border-slate-200/70 bg-gradient-to-br from-white via-slate-200 to-slate-400'
      } shadow-inner shrink-0`}
    >
      <div className="h-4 w-6 rounded-[2px] border border-black/25 grid grid-cols-3 gap-px p-0.5">
        <div className="border-r border-b border-black/20" />
        <div className="border-r border-b border-black/20" />
        <div className="border-b border-black/20" />
        <div className="border-r border-black/20" />
        <div className="border-r border-black/20" />
        <div />
      </div>
    </div>
  );

  const renderNetworkLogo = () => {
    if (network === 'Mastercard') {
      return (
        <div className="flex flex-col items-end">
          <div className="relative flex items-center h-6 w-10">
            <span className="h-5 w-5 rounded-full bg-[#EB001B]/95 shadow-xs" />
            <span className="-ml-2.5 h-5 w-5 rounded-full bg-[#F79E1B]/95 mix-blend-screen shadow-xs" />
          </div>
          <span className="text-[7px] uppercase tracking-widest text-white/75 -mt-0.5">
            mastercard
          </span>
        </div>
      );
    }
    if (network === 'Visa') {
      return (
        <div className="flex flex-col items-end">
          <span className="italic font-extrabold tracking-tighter text-base sm:text-lg text-white leading-none drop-shadow-xs">
            VISA
          </span>
          <span className="text-[7px] uppercase tracking-wider text-sky-200/80 mt-0.5">
            Signature
          </span>
        </div>
      );
    }
    if (network === 'Amex') {
      return (
        <div className="px-1.5 py-1 rounded bg-[#016FD0] border border-white/50 shadow-xs">
          <span className="block text-[8px] font-extrabold tracking-tighter text-white leading-none">
            AMERICAN
          </span>
          <span className="block text-[8px] font-extrabold tracking-tighter text-white leading-none mt-0.5">
            EXPRESS
          </span>
        </div>
      );
    }
    if (network === 'Discover') {
      return (
        <div className="flex items-center gap-0.5 font-extrabold tracking-wider text-xs sm:text-sm text-slate-900">
          <span>DISC</span>
          <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 shadow-xs" />
          <span>VER</span>
        </div>
      );
    }
    return (
      <span className="text-[11px] font-semibold tracking-tight text-white">
        {network}
      </span>
    );
  };

  // 1. AMERICAN EXPRESS BLUE CASH EVERYDAY (Translucent Ice Border + Centurion Medallion)
  if (id === 'card-amex-bce') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl p-1.5 bg-gradient-to-br from-cyan-100/75 via-sky-200/60 to-blue-300/70 border border-cyan-100/80 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1]`}
        aria-label={`${name} physical card preview`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0077C8] via-[#0051A8] to-[#002F6C] p-4 sm:p-5 flex flex-col justify-between">
          {/* Concentric Amex Blue Cash Sunburst & Centurion Medallion */}
          <svg
            viewBox="0 0 200 120"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="amexGlow" cx="52%" cy="52%" r="50%">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#0284C7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#002F6C" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="105" cy="62" r="56" fill="url(#amexGlow)" />
            <circle
              cx="105"
              cy="62"
              r="34"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            <circle
              cx="105"
              cy="62"
              r="24"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="1.5"
            />
            {/* Stylized Centurion Crest Silhouette */}
            <path
              d="M95 45 C102 38, 114 40, 117 49 C112 47, 105 47, 98 51 Z M99 53 L113 53 L115 69 L96 69 Z"
              fill="#E0F2FE"
              fillOpacity="0.45"
            />
          </svg>

          <div className="relative z-10 flex items-start justify-between">
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-white uppercase drop-shadow-xs">
              AMERICAN EXPRESS
            </span>
            <Wifi className="h-4 w-4 rotate-90 text-cyan-100/90" />
          </div>

          <div className="relative z-10 flex items-center justify-between my-auto">
            {renderEmvChip('silver')}
            <span className="font-mono-tabular text-[11px] text-cyan-100/95 tracking-widest">
              3782 •••••• {cardVisual.numberTail}
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-cyan-100/80">
                Blue Cash Everyday®
              </p>
              <p className="font-mono-tabular text-[10px] tracking-widest text-white/95 uppercase mt-0.5">
                A. MEMBER · 09/29
              </p>
            </div>
            {renderNetworkLogo()}
          </div>
        </div>
      </div>
    );
  }

  // 2. DISCOVER IT STUDENT CHROME (Brushed Metallic Silver Plate + Orange Globe)
  if (id === 'card-discover-student') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 via-zinc-300 to-slate-400 border border-white/60 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1] p-4 sm:p-5 flex flex-col justify-between`}
        aria-label={`${name} physical card preview`}
      >
        {/* Brushed Aluminum Texture Lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(12deg, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.45) 1px, transparent 1px, transparent 4px)',
          }}
        />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-tl from-orange-500/25 via-amber-400/10 to-transparent blur-xl" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-0.5 text-sm sm:text-base font-black tracking-[0.14em] text-slate-900">
            <span>DISC</span>
            <span className="inline-block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 shadow-xs" />
            <span>VER</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-slate-900/85 text-[10px] font-bold italic text-white tracking-tight">
            it® chrome
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between my-auto">
          <div className="flex items-center gap-2">
            {renderEmvChip('silver')}
            <Wifi className="h-4 w-4 rotate-90 text-slate-700" />
          </div>
          <span className="font-mono-tabular text-[11px] font-medium tracking-widest text-slate-800">
            6011 •••• •••• {cardVisual.numberTail}
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between border-t border-slate-500/25 pt-2">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-700">
              CASHBACK MATCH™ · STUDENT
            </p>
            <p className="font-mono-tabular text-[10px] text-slate-900 tracking-wider uppercase">
              ONIT MEMBER
            </p>
          </div>
          {renderNetworkLogo()}
        </div>
      </div>
    );
  }

  // 3. CAPITAL ONE SAVOR (Burnished Copper Metallic + Concentric Acoustic Rings)
  if (id === 'card-capone-savor') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#9A4B26] via-[#6E2E14] to-[#2B1107] border border-amber-300/35 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1] p-4 sm:p-5 flex flex-col justify-between`}
        aria-label={`${name} physical card preview`}
      >
        {/* Concentric Copper Rings */}
        <svg
          viewBox="0 0 240 150"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          aria-hidden="true"
        >
          <circle
            cx="190"
            cy="75"
            r="35"
            fill="none"
            stroke="#FDBA74"
            strokeWidth="1"
          />
          <circle
            cx="190"
            cy="75"
            r="58"
            fill="none"
            stroke="#FDBA74"
            strokeWidth="1"
          />
          <circle
            cx="190"
            cy="75"
            r="82"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="0.8"
          />
        </svg>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                Capital One
              </span>
              <span className="inline-block h-2 w-4 rounded-full bg-gradient-to-r from-red-500 to-amber-300 -rotate-12" />
            </div>
            <p className="text-base sm:text-lg font-light tracking-[0.26em] text-amber-100 uppercase mt-0.5">
              SAVOR
            </p>
          </div>
          <Wifi className="h-4 w-4 rotate-90 text-amber-100/80" />
        </div>

        <div className="relative z-10 flex items-center justify-between my-auto">
          {renderEmvChip('gold')}
          <span className="font-mono-tabular text-[11px] text-amber-100/90 tracking-widest">
            5178 •••• •••• {cardVisual.numberTail}
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between border-t border-amber-200/15 pt-2">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-amber-200/80">
              DINING & ENTERTAINMENT REWARDS
            </p>
            <p className="font-mono-tabular text-[10px] text-white/90 tracking-wider">
              $0 ANNUAL FEE
            </p>
          </div>
          {renderNetworkLogo()}
        </div>
      </div>
    );
  }

  // 4. CHASE FREEDOM UNLIMITED (Deep Sapphire Navy + Chase Octagon + Silver Foil)
  if (id === 'card-chase-freedom-unlimited') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B357A] via-[#072152] to-[#03102B] border border-sky-300/35 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1] p-4 sm:p-5 flex flex-col justify-between`}
        aria-label={`${name} physical card preview`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.28),transparent_60%)]" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-white uppercase">
              CHASE
            </span>
            {/* Iconic Chase Octagon Mark */}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-sky-300"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6zm1.5 5.5v9h9v-9h-9z" />
            </svg>
          </div>
          <Wifi className="h-4 w-4 rotate-90 text-sky-200/85" />
        </div>

        <div className="relative z-10 flex items-center justify-between my-auto">
          {renderEmvChip('silver')}
          <div className="text-right">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] text-sky-100 uppercase">
              FREEDOM
            </p>
            <p className="text-[10px] tracking-[0.24em] text-sky-300 uppercase">
              UNLIMITED
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-end justify-between border-t border-sky-200/15 pt-2">
          <span className="font-mono-tabular text-[11px] text-sky-100/90 tracking-widest">
            4147 •••• •••• {cardVisual.numberTail}
          </span>
          {renderNetworkLogo()}
        </div>
      </div>
    );
  }

  // 5. BILT WORLD ELITE MASTERCARD (Anodized Matte Obsidian Metal + Architectural BILT Typography)
  if (id === 'card-bilt-mastercard') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 via-neutral-950 to-black border border-white/25 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1] p-4 sm:p-5 flex flex-col justify-between`}
        aria-label={`${name} physical card preview`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.12)_0%,transparent_42%,rgba(255,255,255,0.04)_100%)]" />

        <div className="relative z-10 flex items-start justify-between">
          <span className="text-base sm:text-lg font-black tracking-[0.28em] text-white uppercase">
            BILT
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-400">
            WORLD ELITE
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between my-auto">
          <div className="flex items-center gap-2">
            {renderEmvChip('silver')}
            <Wifi className="h-4 w-4 rotate-90 text-zinc-400" />
          </div>
          <span className="font-mono-tabular text-[11px] text-zinc-300 tracking-widest">
            5412 •••• •••• {cardVisual.numberTail}
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-2">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400">
              1X RENT REWARDS · ZERO FEE
            </p>
          </div>
          {renderNetworkLogo()}
        </div>
      </div>
    );
  }

  // Fallback card design
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cardVisual.gradient} border border-white/20 shadow-xl ${cardVisual.accentGlow} select-none aspect-[1.586/1] p-4 sm:p-5 flex flex-col justify-between`}
      aria-label={`${name} physical card preview`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/80">
            {issuer}
          </p>
          <h4 className="text-sm sm:text-base font-medium text-white">
            {name}
          </h4>
        </div>
        <Wifi className="h-3.5 w-3.5 rotate-90 text-white/85" />
      </div>
      <div className="flex items-center justify-between my-auto">
        {renderEmvChip(cardVisual.chipStyle)}
        <span className="font-mono-tabular text-[11px] text-white/90">
          •••• {cardVisual.numberTail}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-white/15 pt-2">
        <span className="text-[10px] text-white/80">{card.annualFee} Fee</span>
        {renderNetworkLogo()}
      </div>
    </div>
  );
};
