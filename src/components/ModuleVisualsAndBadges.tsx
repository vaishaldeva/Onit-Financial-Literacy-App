import React from 'react';
import { X, Sparkles, CheckCircle2, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { LearningModule } from '../data/finlitData';
import { SecondaryModalOverlay } from './SecondaryModalOverlay';

export interface ModuleThemeMeta {
  id: string;
  tileBgClass: string;
  headerBgClass: string;
  accentHex: string;
  badgeName: string;
  shortDescription: string;
}

export const CANONICAL_MODULE_IDS = [
  'mod-01-intro-finlit',
  'mod-02-credit',
  'mod-03-university-finances',
  'mod-04-taxes',
  'mod-05-types-of-accounts',
  'mod-06-consumer-skills',
  'mod-07-irl-money-skills',
  'mod-08-getting-out-of-debt',
  'mod-09-how-banks-work',
  'mod-10-financial-services',
] as const;

export const MODULE_THEME_BY_ID: Record<string, ModuleThemeMeta> = {
  'mod-01-intro-finlit': {
    id: 'mod-01-intro-finlit',
    tileBgClass: 'bg-gradient-to-br from-emerald-500/22 via-white/[0.04] to-teal-500/10 hover:from-emerald-500/30',
    headerBgClass: 'bg-gradient-to-br from-emerald-500/28 via-teal-900/45 to-[#0D131F]',
    accentHex: '#23B883',
    badgeName: 'Money Foundations Badge',
    shortDescription: 'Learn the fundamentals of managing money',
  },
  'mod-02-credit': {
    id: 'mod-02-credit',
    tileBgClass: 'bg-gradient-to-br from-teal-500/22 via-white/[0.04] to-cyan-500/10 hover:from-teal-500/30',
    headerBgClass: 'bg-gradient-to-br from-teal-500/28 via-cyan-900/45 to-[#0D131F]',
    accentHex: '#00B8A9',
    badgeName: 'Credit Shield Badge',
    shortDescription: 'Understand credit, credit cards, and how to use them wisely',
  },
  'mod-03-university-finances': {
    id: 'mod-03-university-finances',
    tileBgClass: 'bg-gradient-to-br from-amber-500/22 via-white/[0.04] to-orange-500/10 hover:from-amber-500/30',
    headerBgClass: 'bg-gradient-to-br from-amber-500/28 via-orange-950/45 to-[#0D131F]',
    accentHex: '#EB8C00',
    badgeName: 'Scholar Crown Badge',
    shortDescription: 'Understand college costs, FAFSA, aid, and how they affect taxes',
  },
  'mod-04-taxes': {
    id: 'mod-04-taxes',
    tileBgClass: 'bg-gradient-to-br from-rose-500/22 via-white/[0.04] to-orange-500/10 hover:from-rose-500/30',
    headerBgClass: 'bg-gradient-to-br from-rose-500/28 via-rose-950/45 to-[#0D131F]',
    accentHex: '#E53835',
    badgeName: 'Tax Tactician Badge',
    shortDescription: "Understand payroll tax, income tax, and the forms you'll use as an employee",
  },
  'mod-05-types-of-accounts': {
    id: 'mod-05-types-of-accounts',
    tileBgClass: 'bg-gradient-to-br from-sky-500/22 via-white/[0.04] to-cyan-500/10 hover:from-sky-500/30',
    headerBgClass: 'bg-gradient-to-br from-sky-500/28 via-sky-950/45 to-[#0D131F]',
    accentHex: '#0288D1',
    badgeName: 'Account Vault Badge',
    shortDescription: "Every lesson covers: what the account is, who it's for, and when/why to use it.",
  },
  'mod-06-consumer-skills': {
    id: 'mod-06-consumer-skills',
    tileBgClass: 'bg-gradient-to-br from-blue-500/22 via-white/[0.04] to-indigo-500/10 hover:from-blue-500/30',
    headerBgClass: 'bg-gradient-to-br from-blue-500/28 via-indigo-950/45 to-[#0D131F]',
    accentHex: '#1E62D0',
    badgeName: 'Smart Spender Badge',
    shortDescription: 'Learn how to spend, save, and manage income and expenses wisely',
  },
  'mod-07-irl-money-skills': {
    id: 'mod-07-irl-money-skills',
    tileBgClass: 'bg-gradient-to-br from-violet-500/22 via-white/[0.04] to-fuchsia-500/10 hover:from-violet-500/30',
    headerBgClass: 'bg-gradient-to-br from-violet-500/28 via-purple-950/45 to-[#0D131F]',
    accentHex: '#7C3AED',
    badgeName: 'Real-World Navigator Badge',
    shortDescription: 'Master apartments, cars, insurance, and real-world contracts with confidence',
  },
  'mod-08-getting-out-of-debt': {
    id: 'mod-08-getting-out-of-debt',
    tileBgClass: 'bg-gradient-to-br from-pink-500/22 via-white/[0.04] to-rose-500/10 hover:from-pink-500/30',
    headerBgClass: 'bg-gradient-to-br from-pink-500/28 via-rose-950/45 to-[#0D131F]',
    accentHex: '#E11D48',
    badgeName: 'Debt Breaker Badge',
    shortDescription: 'Compare avalanche vs. snowball payoffs and stay in control of borrowed money',
  },
  'mod-09-how-banks-work': {
    id: 'mod-09-how-banks-work',
    tileBgClass: 'bg-gradient-to-br from-cyan-500/22 via-white/[0.04] to-teal-500/10 hover:from-cyan-500/30',
    headerBgClass: 'bg-gradient-to-br from-cyan-500/28 via-teal-950/45 to-[#0D131F]',
    accentHex: '#0D9488',
    badgeName: 'Pillar Bank Badge',
    shortDescription: 'See how banks make money, protect deposits, and power everyday transfers',
  },
  'mod-10-financial-services': {
    id: 'mod-10-financial-services',
    tileBgClass: 'bg-gradient-to-br from-emerald-400/22 via-white/[0.04] to-sky-500/10 hover:from-emerald-400/30',
    headerBgClass: 'bg-gradient-to-br from-emerald-400/28 via-emerald-950/45 to-[#0D131F]',
    accentHex: '#10B981',
    badgeName: 'Compound Rocket Badge',
    shortDescription: 'Explore banking products, fintech tools, and financial services with confidence',
  },
};

export function getModuleTheme(moduleId: string, index = 0): ModuleThemeMeta {
  if (MODULE_THEME_BY_ID[moduleId]) {
    return MODULE_THEME_BY_ID[moduleId];
  }
  const keys = Object.keys(MODULE_THEME_BY_ID);
  return MODULE_THEME_BY_ID[keys[index % keys.length]];
}

/**
 * Renders the vibrant, colorful illustrated scene inside a rounded square card
 * for each module tile on the Modules tab and module overview header.
 */
export const ModuleTileIllustration: React.FC<{
  moduleId: string;
  index?: number;
  className?: string;
}> = ({ moduleId, index = 0, className = 'h-24 w-24 sm:h-28 sm:w-28' }) => {
  const canonicalIdx = (CANONICAL_MODULE_IDS as readonly string[]).indexOf(moduleId);
  const slot = canonicalIdx >= 0 ? canonicalIdx : index % 10;

  const backdropPalettes: {
    cardBg: string;
    outerCircle: string;
    innerGlow: string;
    leafLeft: string;
    leafRight: string;
  }[] = [
    // 0: Intro to Financial Literacy — Warm Sunrise Gold, Coral & Sky
    {
      cardBg: 'bg-gradient-to-br from-[#FFF7D6] via-[#FFE8B3] to-[#FFD6A5]',
      outerCircle: '#FFE39F',
      innerGlow: '#FFF4CC',
      leafLeft: '#34D399',
      leafRight: '#38BDF8',
    },
    // 1: Credit — Vibrant Aqua, Mint & Electric Sky
    {
      cardBg: 'bg-gradient-to-br from-[#DDFDF6] via-[#B8F7E8] to-[#BAE6FD]',
      outerCircle: '#99F6E4',
      innerGlow: '#E0F2FE',
      leafLeft: '#10B981',
      leafRight: '#F59E0B',
    },
    // 2: University Finances — Sunny Amber, Rose & Sky Blue
    {
      cardBg: 'bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FECDD3]',
      outerCircle: '#FDE047',
      innerGlow: '#FEF9C3',
      leafLeft: '#38BDF8',
      leafRight: '#FB7185',
    },
    // 3: Taxes — Coral Peach, Gold & Mint
    {
      cardBg: 'bg-gradient-to-br from-[#FFE4E6] via-[#FECDD3] to-[#FDE68A]',
      outerCircle: '#FDA4AF',
      innerGlow: '#FFF1F2',
      leafLeft: '#F59E0B',
      leafRight: '#22C55E',
    },
    // 4: Types of Accounts — Electric Sky, Cyan & Sunny Yellow
    {
      cardBg: 'bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#FEF08A]',
      outerCircle: '#7DD3FC',
      innerGlow: '#F0F9FF',
      leafLeft: '#10B981',
      leafRight: '#F43F5E',
    },
    // 5: Consumer Skills — Periwinkle, Lavender & Warm Gold
    {
      cardBg: 'bg-gradient-to-br from-[#E0E7FF] via-[#C7D2FE] to-[#FDE68A]',
      outerCircle: '#A5B4FC',
      innerGlow: '#EEF2FF',
      leafLeft: '#F59E0B',
      leafRight: '#10B981',
    },
    // 6: IRL Money Skills — Vibrant Violet, Pink & Mint
    {
      cardBg: 'bg-gradient-to-br from-[#F3E8FF] via-[#E9D5FF] to-[#FBCFE8]',
      outerCircle: '#D8B4FE',
      innerGlow: '#FAF5FF',
      leafLeft: '#34D399',
      leafRight: '#F59E0B',
    },
    // 7: Getting Out of Debt — Sunset Rose, Coral & Emerald
    {
      cardBg: 'bg-gradient-to-br from-[#FFE4E6] via-[#FDA4AF] to-[#A7F3D0]',
      outerCircle: '#FECDD3',
      innerGlow: '#FFF1F2',
      leafLeft: '#10B981',
      leafRight: '#F59E0B',
    },
    // 8: How Banks Work — Tropical Teal, Gold & Sky
    {
      cardBg: 'bg-gradient-to-br from-[#CCFBF1] via-[#99F6E4] to-[#FDE68A]',
      outerCircle: '#5EEAD4',
      innerGlow: '#F0FDFA',
      leafLeft: '#3B82F6',
      leafRight: '#F59E0B',
    },
    // 9: Investing / Financial Services — Lush Emerald, Gold & Cyan
    {
      cardBg: 'bg-gradient-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#BAE6FD]',
      outerCircle: '#6EE7B7',
      innerGlow: '#ECFDF5',
      leafLeft: '#F59E0B',
      leafRight: '#0284C7',
    },
  ];

  const pal = backdropPalettes[slot] || backdropPalettes[0];

  return (
    <div
      className={`${className} rounded-[20px] ${pal.cardBg} shadow-md flex items-center justify-center overflow-hidden p-1.5 shrink-0 select-none border-2 border-white/80`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Vibrant multi-layer aura & colorful botanical accents */}
        <circle cx="60" cy="60" r="53" fill={pal.outerCircle} opacity="0.72" />
        <circle cx="60" cy="60" r="41" fill={pal.innerGlow} opacity="0.92" />
        <path
          d="M14 89 C20 77, 31 81, 26 95 C19 95, 14 93, 14 89 Z"
          fill={pal.leafLeft}
          opacity="0.9"
        />
        <path
          d="M106 87 C100 75, 89 79, 94 93 C101 93, 106 91, 106 87 Z"
          fill={pal.leafRight}
          opacity="0.9"
        />

        {/* MODULE 1: Intro to Financial Literacy (Colorful Book with Gold $ + Vibrant Bubbles) */}
        {slot === 0 && (
          <g>
            {/* Floating colorful bubbles */}
            <circle cx="28" cy="24" r="11.5" fill="#FB7185" />
            <circle cx="28" cy="24" r="5.5" fill="#FDE047" />
            <circle cx="70" cy="18" r="10.5" fill="#10B981" />
            <text x="70" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              %
            </text>
            <circle cx="19" cy="49" r="10.5" fill="#38BDF8" />
            <rect x="14.5" y="47" width="2.8" height="6" rx="1" fill="#FFFFFF" />
            <rect x="18.2" y="43.5" width="2.8" height="9.5" rx="1" fill="#FDE047" />
            <rect x="22" y="45" width="2.8" height="8" rx="1" fill="#FFFFFF" />
            <circle cx="97" cy="44" r="11.5" fill="#A855F7" />
            <rect x="92.5" y="40" width="3" height="8" rx="1" fill="#FDE047" />
            <rect x="97.5" y="37" width="3" height="11" rx="1" fill="#34D399" />

            {/* Person shoulders + open golden/orange book */}
            <path d="M32 112 C32 88, 88 88, 88 112 Z" fill="#2563EB" />
            <circle cx="60" cy="50" r="11.5" fill="#1E293B" />
            <path
              d="M34 40 L60 47 L86 40 L86 86 L60 93 L34 86 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="2"
            />
            <path d="M60 47 L86 40 L86 86 L60 93 Z" fill="#FBBF24" />
            <line x1="60" y1="47" x2="60" y2="93" stroke="#92400E" strokeWidth="2" />
            <circle cx="48" cy="68" r="9.5" fill="#10B981" />
            <text x="48" y="72.5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <line x1="66" y1="59" x2="80" y2="56" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
            <line x1="66" y1="67" x2="80" y2="64" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <line x1="66" y1="75" x2="77" y2="73" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* MODULE 2: Credit (Colorful Tilted Credit Card + Rainbow Badges) */}
        {slot === 1 && (
          <g>
            <circle cx="26" cy="28" r="11" fill="#10B981" />
            <path
              d="M21 28 L25 32 L32 24"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="90" cy="26" r="11" fill="#3B82F6" />
            <text x="90" y="30" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              %
            </text>
            <circle cx="25" cy="86" r="11" fill="#F59E0B" />
            <rect x="21" y="85" width="8" height="6" rx="1.5" fill="#FFFFFF" />
            <path d="M23 85 V82 A2 2 0 0 1 27 82 V85" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
            <circle cx="90" cy="88" r="11" fill="#EC4899" />
            <text x="90" y="92.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              $
            </text>

            {/* Vibrant Multi-Tone Tilted Credit Card */}
            <g transform="translate(60, 58) rotate(11)">
              <rect x="-31" y="-20" width="62" height="40" rx="7" fill="#06B6D4" stroke="#0E7490" strokeWidth="2" />
              <path d="M-31 -6 H31 V13 A7 7 0 0 1 24 20 H-24 A7 7 0 0 1 -31 13 Z" fill="#0EA5E9" />
              <rect x="-31" y="-12" width="62" height="7" fill="#1E293B" />
              <rect x="-23" y="1" width="12" height="9" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
              <circle cx="15" cy="9" r="5.5" fill="#FB7185" />
              <circle cx="21" cy="9" r="5.5" fill="#FBBF24" opacity="0.9" />
            </g>
          </g>
        )}

        {/* MODULE 3: University Finances (Colorful Graduation Cap on Rainbow Books + Gold Coins) */}
        {slot === 2 && (
          <g>
            <circle cx="23" cy="34" r="11" fill="#F59E0B" />
            <text x="23" y="38" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <circle cx="94" cy="30" r="11" fill="#EC4899" />
            <ellipse cx="94" cy="30" rx="6" ry="4.5" fill="#FDE047" />
            <circle cx="95" cy="80" r="11" fill="#10B981" />
            <path d="M89 84 H101 L95 75 Z" fill="#FFFFFF" />

            {/* Vibrant Stacked Books */}
            <rect x="30" y="75" width="60" height="11" rx="3.5" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
            <rect x="35" y="63" width="50" height="11" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
            <rect x="40" y="51" width="40" height="11" rx="3.5" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />

            {/* Royal Blue & Gold Graduation Cap */}
            <polygon points="60,22 92,36 60,50 28,36" fill="#4F46E5" stroke="#312E81" strokeWidth="1.8" />
            <rect x="45" y="43" width="30" height="10" rx="3" fill="#6366F1" stroke="#312E81" strokeWidth="1.5" />
            <path d="M84 38 V55" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
            <circle cx="84" cy="56" r="3" fill="#F59E0B" />
          </g>
        )}

        {/* MODULE 4: Taxes (Colorful Clipboard Form + Turquoise Calculator + Gold Coin) */}
        {slot === 3 && (
          <g>
            <circle cx="22" cy="30" r="11" fill="#EF4444" />
            <text x="22" y="34" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              %
            </text>
            <circle cx="95" cy="27" r="11" fill="#F59E0B" />
            <text x="95" y="31.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <circle cx="22" cy="66" r="10" fill="#10B981" />
            <path d="M18 66 L21 69 L27 63" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />

            {/* Bright Coral-Red Tax Clipboard */}
            <rect x="35" y="26" width="42" height="58" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.8" />
            <rect x="40" y="33" width="32" height="46" rx="3.5" fill="#FFFFFF" />
            <rect x="47" y="21" width="18" height="8" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <line x1="45" y1="43" x2="67" y2="43" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="45" y1="51" x2="67" y2="51" stroke="#FB7185" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="45" y1="59" x2="61" y2="59" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="45" y1="67" x2="58" y2="67" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />

            {/* Vibrant Indigo/Cyan Mini Calculator */}
            <rect x="64" y="52" width="27" height="36" rx="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.8" />
            <rect x="68" y="56" width="19" height="8" rx="2" fill="#FEF08A" />
            <circle cx="71" cy="70" r="2.3" fill="#FFFFFF" />
            <circle cx="77.5" cy="70" r="2.3" fill="#FFFFFF" />
            <circle cx="84" cy="70" r="2.3" fill="#34D399" />
            <circle cx="71" cy="78" r="2.3" fill="#FFFFFF" />
            <circle cx="77.5" cy="78" r="2.3" fill="#FFFFFF" />
            <circle cx="84" cy="78" r="2.3" fill="#FBBF24" />
          </g>
        )}

        {/* MODULE 5: Types of Accounts (Colorful Layered Cards + Gold Dollar Medallion) */}
        {slot === 4 && (
          <g>
            <circle cx="24" cy="27" r="11" fill="#F43F5E" />
            <ellipse cx="24" cy="27" rx="6" ry="4.5" fill="#FDE047" />
            <circle cx="94" cy="26" r="11" fill="#10B981" />
            <rect x="90" y="25" width="8" height="6" rx="1.5" fill="#FFFFFF" />
            <circle cx="24" cy="90" r="11" fill="#8B5CF6" />
            <path d="M19 92 L24 87 L29 90" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Colorful Stacked Account Cards */}
            <rect x="35" y="64" width="50" height="26" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" transform="rotate(-7 60 77)" />
            <rect x="35" y="49" width="50" height="26" rx="6" fill="#10B981" stroke="#047857" strokeWidth="1.5" transform="rotate(6 60 62)" />
            <rect x="35" y="34" width="50" height="26" rx="6" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />
            <rect x="41" y="42" width="16" height="4" rx="2" fill="#93C5FD" />
            <rect x="41" y="49" width="26" height="4" rx="2" fill="#E0F2FE" />
            <circle cx="60" cy="34" r="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <text x="60" y="38" textAnchor="middle" fontSize="12" fontWeight="900" fill="#713F12">
              $
            </text>
          </g>
        )}

        {/* MODULE 6: Consumer Skills (Colorful Pie Chart & Shopping/Budget Icons) */}
        {slot === 5 && (
          <g>
            <circle cx="23" cy="29" r="11" fill="#F59E0B" />
            <rect x="19" y="25" width="8" height="8" rx="2" fill="#FFFFFF" />
            <circle cx="95" cy="28" r="11" fill="#10B981" />
            <text x="95" y="32" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <circle cx="96" cy="60" r="11" fill="#EC4899" />
            <rect x="91.5" y="58" width="3" height="6" rx="1" fill="#FFFFFF" />
            <rect x="96" y="54" width="3" height="10" rx="1" fill="#FDE047" />

            {/* Person + Multi-Color Pie Chart Board */}
            <path d="M32 112 C32 86, 88 86, 88 112 Z" fill="#4F46E5" />
            <circle cx="60" cy="31" r="12" fill="#1E293B" />
            <rect x="39" y="40" width="42" height="48" rx="6" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
            <circle cx="60" cy="59" r="13" fill="#3B82F6" />
            <path d="M60 59 L60 46 A13 13 0 0 1 73 59 Z" fill="#F59E0B" />
            <path d="M60 59 L73 59 A13 13 0 0 1 52 70 Z" fill="#10B981" />
            <line x1="46" y1="79" x2="74" y2="79" stroke="#F43F5E" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* MODULE 7: Practical Financial Skills (Colorful Home, Golden Key & Sun) */}
        {slot === 6 && (
          <g>
            <circle cx="25" cy="28" r="11" fill="#8B5CF6" />
            <text x="25" y="32" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <circle cx="95" cy="28" r="11" fill="#10B981" />
            <path d="M90 28 L94 32 L100 25" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="66" r="10" fill="#F59E0B" />
            <circle cx="24" cy="66" r="4" fill="#FEF08A" />

            {/* Colorful House / Apartment */}
            <polygon points="60,26 92,52 28,52" fill="#EC4899" stroke="#BE185D" strokeWidth="1.8" />
            <rect x="36" y="52" width="48" height="38" rx="4" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.8" />
            <rect x="53" y="66" width="14" height="24" rx="2.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <rect x="41" y="57" width="10" height="10" rx="2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="69" y="57" width="10" height="10" rx="2" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        {/* MODULE 8: Getting Out of Debt (Rainbow Payoff Bars + Golden Lightning Arrow) */}
        {slot === 7 && (
          <g>
            <circle cx="25" cy="28" r="11" fill="#F43F5E" />
            <text x="25" y="32" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              %
            </text>
            <circle cx="95" cy="28" r="11" fill="#10B981" />
            <path d="M90 28 L94 32 L100 25" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Colorful Descending Debt Payoff Bars */}
            <rect x="28" y="42" width="12" height="46" rx="3.5" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
            <rect x="45" y="52" width="12" height="36" rx="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
            <rect x="62" y="62" width="12" height="26" rx="3.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.2" />
            <rect x="79" y="72" width="12" height="16" rx="3.5" fill="#10B981" stroke="#047857" strokeWidth="1.2" />
            <path
              d="M32 36 L86 64 M86 64 H75 M86 64 V53"
              stroke="#FACC15"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* MODULE 9: How Banks Work (Colorful Classical Bank Building with Gold Dome & Pillars) */}
        {slot === 8 && (
          <g>
            <circle cx="24" cy="28" r="11" fill="#0EA5E9" />
            <text x="24" y="32" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              %
            </text>
            <circle cx="95" cy="28" r="11" fill="#F59E0B" />
            <text x="95" y="32.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              $
            </text>

            {/* Colorful Bank Roof, Gold Pediment & Turquoise Columns */}
            <polygon points="60,24 94,45 26,45" fill="#0D9488" stroke="#115E59" strokeWidth="1.8" />
            <circle cx="60" cy="36" r="5" fill="#FACC15" />
            <rect x="30" y="45" width="60" height="7" rx="2.5" fill="#F59E0B" />
            <rect x="36" y="52" width="8" height="28" rx="2.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
            <rect x="56" y="52" width="8" height="28" rx="2.5" fill="#34D399" stroke="#059669" strokeWidth="1.2" />
            <rect x="76" y="52" width="8" height="28" rx="2.5" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.2" />
            <rect x="26" y="80" width="68" height="9" rx="3.5" fill="#1E293B" />
          </g>
        )}

        {/* MODULE 10: Investing (Colorful Ascending Bars + Golden Growth Arrow) */}
        {slot === 9 && (
          <g>
            <circle cx="25" cy="30" r="11" fill="#F59E0B" />
            <text x="25" y="34.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              $
            </text>
            <circle cx="95" cy="26" r="11" fill="#EC4899" />
            <text x="95" y="30.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
              +
            </text>

            {/* Vibrant Multi-Color Compound Bars + Golden Upward Rocket Arrow */}
            <rect x="28" y="72" width="12" height="17" rx="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
            <rect x="45" y="59" width="12" height="30" rx="3.5" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.2" />
            <rect x="62" y="46" width="12" height="43" rx="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
            <rect x="79" y="32" width="12" height="57" rx="3.5" fill="#10B981" stroke="#047857" strokeWidth="1.2" />
            <path
              d="M30 60 L54 42 L80 22 M80 22 H68 M80 22 V34"
              stroke="#EF4444"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Renders the Hexagonal Achievement Badge paired with its soft geometric
 * rounded-hexagon & confetti square background, complete with borders and styling
 * (matching Screenshot_2026-10-29_at_8.44.07_PM_dc72ddc5.png):
 * - When `unlocked === true`: warm cream/pastel backdrop, soft white rounded hexagon,
 *   golden-orange floating confetti squares, outer cream hex border, vibrant orange-gold
 *   hex ring, black-outlined split hexagon with cream top header ("75" vector glyph) and
 *   bright yellow-gold lower chamber containing the black-outlined colored module icon.
 * - When `unlocked === false`: cohesive shaded slate-grey monochrome version of the exact
 *   same hexagonal achievement badge and background.
 */
export const ModuleBadgeFigure: React.FC<{
  moduleId: string;
  unlocked: boolean;
  index?: number;
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}> = ({ moduleId, unlocked, index = 0, size = 'lg', className = '' }) => {
  const canonicalIdx = (CANONICAL_MODULE_IDS as readonly string[]).indexOf(moduleId);
  const slot = canonicalIdx >= 0 ? canonicalIdx : index % 10;

  const sizeClasses =
    size === 'sm'
      ? 'h-full w-full min-h-[28px] min-w-[28px] rounded-[9px]'
      : size === 'md'
      ? 'h-full w-full min-h-[48px] min-w-[48px] rounded-[14px]'
      : size === 'full'
      ? 'h-full w-full aspect-square rounded-[22px]'
      : 'h-28 w-28 sm:h-32 sm:w-32 rounded-[22px]';

  // Background & Hexagon Frame Palette (matching Screenshot_2026-10-29_at_8.44.07_PM_dc72ddc5.png)
  const bgCanvas = unlocked ? '#FDF3B7' : '#181B23';
  const bgSoftHex = unlocked ? '#FCFBF3' : '#212631';
  const confettiSquare = unlocked ? '#F6B44B' : '#2E3444';
  const outerHexBorder = unlocked ? '#F3EAB8' : '#2C3140';
  const middleHexRing = unlocked ? '#F59B1B' : '#3C4356';
  const topHeaderFill = unlocked ? '#FAF3BE' : '#4E566B';
  const bottomChamberFill = unlocked ? '#FACC15' : '#353B4B';
  const inkStroke = unlocked ? '#05070B' : '#14171F';

  // Vibrant central icon colors per module when unlocked, shaded slate when locked
  const iconPrimary = unlocked
    ? [
        '#4FA3E3', // Mod 1 Sky Blue
        '#38BDF8', // Mod 2 Cyan-Blue
        '#4FA3E3', // Mod 3 Classic Graduation Cap Sky Blue (exact match to screenshot)
        '#60A5FA', // Mod 4 Blue
        '#4FA3E3', // Mod 5 Sky Blue
        '#4FA3E3', // Mod 6 Sky Blue
        '#60A5FA', // Mod 7 Blue
        '#4FA3E3', // Mod 8 Sky Blue
        '#4FA3E3', // Mod 9 Sky Blue
        '#34D399', // Mod 10 Emerald
      ][slot]
    : '#5E667A';

  const iconSecondary = unlocked
    ? [
        '#34D399',
        '#14B8A6',
        '#2563EB',
        '#F87171',
        '#34D399',
        '#FB7185',
        '#A78BFA',
        '#FB7185',
        '#2DD4BF',
        '#4FA3E3',
      ][slot]
    : '#474E60';

  const iconAccent = unlocked ? '#FFFFFF' : '#768096';

  return (
    <div
      aria-hidden="true"
      className={`${sizeClasses} ${className} relative flex items-center justify-center overflow-hidden select-none transition-all duration-300 ${
        unlocked
          ? 'ring-2 ring-[#F59B1B]/70 shadow-[0_6px_18px_rgba(245,155,27,0.28)]'
          : 'ring-1 ring-white/10 opacity-90'
      }`}
    >
      <svg viewBox="0 0 160 160" className="w-full h-full block">
        {/* 1. Outer Pastel/Dark Backdrop */}
        <rect x="0" y="0" width="160" height="160" fill={bgCanvas} />

        {/* 2. Large Soft Rounded-Corner Hexagon in Center of Background */}
        <path
          d="M 52,6 L 108,6 Q 122,6 129,18 L 154,64 Q 160,80 154,96 L 129,142 Q 122,154 108,154 L 52,154 Q 38,154 31,142 L 6,96 Q 0,80 6,64 L 31,18 Q 38,6 52,6 Z"
          fill={bgSoftHex}
        />

        {/* 3. Floating Geometric Square Confetti Accents (matching Screenshot_2026-10-29_at_8.44.07_PM) */}
        {/* Top-Right Tilted Square */}
        <rect
          x="124"
          y="8"
          width="21"
          height="21"
          fill={confettiSquare}
          transform="rotate(22 134.5 18.5)"
        />
        {/* Upper-Left Small Tilted Diamond Square */}
        <rect
          x="9"
          y="36"
          width="11"
          height="11"
          fill={confettiSquare}
          transform="rotate(36 14.5 41.5)"
        />
        {/* Mid-Left Angled Tab Behind Hexagon */}
        <rect
          x="19"
          y="86"
          width="10"
          height="20"
          fill={confettiSquare}
          transform="rotate(-28 24 96)"
        />
        {/* Bottom-Right Tilted Square */}
        <rect
          x="128"
          y="133"
          width="21"
          height="21"
          fill={confettiSquare}
          transform="rotate(32 138.5 143.5)"
        />
        {/* Bottom-Left Edge Small Square */}
        <rect
          x="-2"
          y="130"
          width="11"
          height="15"
          fill={confettiSquare}
          transform="rotate(-16 3.5 137.5)"
        />

        {/* 4. Outer Cream Hexagon Frame */}
        <polygon
          points="48,28 112,28 142,82 112,136 48,136 18,82"
          fill={outerHexBorder}
        />

        {/* 5. Bold Orange-Gold Hexagon Ring */}
        <polygon
          points="52,34 108,34 135,82 108,130 52,130 25,82"
          fill={middleHexRing}
        />

        {/* 6. Inner Split Hexagon: Top Cream Header + Bottom Bright Gold Chamber */}
        <polygon
          points="57,43 103,43 118.2,70 41.8,70"
          fill={topHeaderFill}
        />
        <polygon
          points="41.8,70 118.2,70 125,82 103,121 57,121 35,82"
          fill={bottomChamberFill}
        />

        {/* 7. Bold Black Outline & Horizontal Divider Line */}
        <polygon
          points="57,43 103,43 125,82 103,121 57,121 35,82"
          fill="none"
          stroke={inkStroke}
          strokeWidth="4.6"
          strokeLinejoin="miter"
        />
        <line
          x1="41.8"
          y1="70"
          x2="118.2"
          y2="70"
          stroke={inkStroke}
          strokeWidth="4.6"
        />

        {/* Central Module Achievement Icon Inside Bottom Chamber (Centered around 80, 96) */}
        {/* Slot 0: Intro Book & Coin Emblem */}
        {slot === 0 && (
          <g>
            <rect
              x="58"
              y="77"
              width="34"
              height="34"
              rx="5"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
            />
            <line
              x1="66"
              y1="77"
              x2="66"
              y2="111"
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="71"
              y="84"
              width="15"
              height="6"
              rx="2"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="2.4"
            />
            <circle
              cx="94"
              cy="103"
              r="10"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.6"
            />
            <path
              d="M 94,98.5 V 107.5 M 89.5,103 H 98.5"
              stroke={inkStroke}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 1: Credit Card Emblem */}
        {slot === 1 && (
          <g>
            <rect
              x="52"
              y="79"
              width="56"
              height="34"
              rx="6"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
            />
            <rect
              x="52"
              y="86"
              width="56"
              height="7"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="2.8"
            />
            <rect
              x="60"
              y="99"
              width="11"
              height="7"
              rx="2"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="2.4"
            />
            <line
              x1="78"
              y1="103"
              x2="98"
              y2="103"
              stroke={inkStroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 2: University Graduation Cap with Sweeping Left Tassel (Exact match to Screenshot_2026-10-29_at_8.44.07_PM) */}
        {slot === 2 && (
          <g>
            {/* Lower Cap Skullcap */}
            <rect
              x="65"
              y="93"
              width="30"
              height="16"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinejoin="miter"
            />
            {/* Top Mortarboard Diamond */}
            <polygon
              points="80,82 108,92 80,102 52,92"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinejoin="miter"
            />
            {/* Sweeping Curved Black Tassel to the Left */}
            <path
              d="M 79,92 Q 65,95 57,102 Q 52,106 46,105"
              fill="none"
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 3: Taxes Document & Check Emblem */}
        {slot === 3 && (
          <g>
            <path
              d="M 60,76 H 88 L 98,86 V 112 H 60 Z"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <path
              d="M 88,76 V 86 H 98"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <line
              x1="67"
              y1="92"
              x2="86"
              y2="92"
              stroke={inkStroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <line
              x1="67"
              y1="100"
              x2="81"
              y2="100"
              stroke={inkStroke}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <circle
              cx="94"
              cy="105"
              r="9"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.4"
            />
            <path
              d="M 90.5,105 L 93,107.5 L 98,102.5"
              fill="none"
              stroke={inkStroke}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Slot 4: Types of Accounts Stacked Passbooks */}
        {slot === 4 && (
          <g>
            <rect
              x="54"
              y="78"
              width="42"
              height="26"
              rx="5"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.5"
            />
            <rect
              x="64"
              y="86"
              width="42"
              height="26"
              rx="5"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
            />
            <circle
              cx="85"
              cy="99"
              r="6"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="2.8"
            />
          </g>
        )}

        {/* Slot 5: Consumer Skills Pie Chart */}
        {slot === 5 && (
          <g>
            <circle
              cx="79"
              cy="95"
              r="18"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
            />
            <path
              d="M 79,95 L 79,77 A 18,18 0 0,1 97,95 Z"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Slot 6: Practical Financial Skills Shield */}
        {slot === 6 && (
          <g>
            <path
              d="M 80,76 L 101,84 V 96 C 101,108 80,115 80,115 C 80,115 59,108 59,96 V 84 Z"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <circle
              cx="80"
              cy="93"
              r="5.5"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3"
            />
            <path
              d="M 80,98.5 V 105"
              stroke={inkStroke}
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 7: Getting Out of Debt Lightning Breaker */}
        {slot === 7 && (
          <g>
            <circle
              cx="80"
              cy="95"
              r="18"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
            />
            <polygon
              points="83,80 70,96 79,96 76,110 90,93 81,93"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Slot 8: How Banks Work Classical Pillar Bank */}
        {slot === 8 && (
          <g>
            <polygon
              points="80,76 105,88 55,88"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.8"
              strokeLinejoin="round"
            />
            <rect
              x="61"
              y="88"
              width="8"
              height="18"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="76"
              y="88"
              width="8"
              height="18"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="91"
              y="88"
              width="8"
              height="18"
              fill={iconAccent}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="54"
              y="106"
              width="52"
              height="6"
              rx="2"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.6"
            />
          </g>
        )}

        {/* Slot 9: Financial Services Growth Arrow & Bars */}
        {slot === 9 && (
          <g>
            <rect
              x="60"
              y="99"
              width="9"
              height="13"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="75"
              y="91"
              width="9"
              height="21"
              fill={iconPrimary}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <rect
              x="90"
              y="81"
              width="9"
              height="31"
              fill={iconSecondary}
              stroke={inkStroke}
              strokeWidth="3.2"
            />
            <path
              d="M 58,92 L 77,80 L 94,76"
              fill="none"
              stroke={inkStroke}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export interface ModuleBadgeStatusItem {
  module: LearningModule;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isUnlocked: boolean;
}

/**
 * Full-screen / Modal "Badge Collection" Album
 * Uses SecondaryModalOverlay so:
 * 1. Top header is pinned (shrink-0) and never cut off when loaded.
 * 2. External/background scrolling is completely locked until the user clicks back/close.
 * 3. Only this page scrolls via a single dedicated scroll container.
 */
export const BadgeCollectionModal: React.FC<{
  items: ModuleBadgeStatusItem[];
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  isPhoneView?: boolean;
}> = ({ items, onClose, onSelectModule, isPhoneView = false }) => {
  const unlockedCount = items.filter((item) => item.isUnlocked).length;
  const totalCount = items.length;

  const headerContent = (
    <div className="px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-4 flex items-start justify-between gap-4">
      <div className="space-y-1 min-w-0">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Badge Collection</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Collection album
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
          Finish every lesson in a module to unlock its badge. Locked badges
          stay shaded until you complete the module.
        </p>
        <p className="pt-0.5 text-xs sm:text-sm font-bold text-emerald-400 font-mono-tabular">
          {unlockedCount} / {totalCount} unlocked
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close Badge Collection"
        className="min-h-[40px] px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center gap-1.5 text-xs font-bold text-white shrink-0 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Back</span>
      </button>
    </div>
  );

  const footerContent = (
    <div className="px-5 py-3.5 sm:px-7 flex items-center justify-between gap-3">
      <span className="text-xs text-slate-400 font-mono-tabular">
        {unlockedCount} of {totalCount} badges earned
      </span>
      <button
        type="button"
        onClick={onClose}
        className="min-h-[40px] px-5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
      >
        <span>Done</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <SecondaryModalOverlay
      ariaLabel="Badge Collection Album"
      onClose={onClose}
      isPhoneView={isPhoneView}
      maxWidthClass="max-w-2xl"
      header={headerContent}
      footer={footerContent}
      cardClassName="bg-[#0E121A] border border-white/15"
      bodyClassName="px-4 py-4 sm:px-7 sm:py-6"
    >
      {/* 2-Column Badge Album Grid on Mobile, 3-Column on Desktop */}
      <div
        className={`grid grid-cols-2 ${
          isPhoneView ? 'gap-3.5' : 'sm:grid-cols-3 gap-4 sm:gap-5'
        }`}
      >
        {items.map(({ module, completedLessonsCount, totalLessonsCount, isUnlocked }, idx) => {
          const themeMeta = getModuleTheme(module.id, idx);
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => {
                onClose();
                onSelectModule(module.id);
              }}
              className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
            >
              {/* Rounded Square Achievement Badge Tile */}
              <div
                className={`w-full aspect-square rounded-[26px] p-1.5 flex flex-col items-center justify-center relative transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-300/30 via-emerald-400/20 to-slate-900 border-2 border-amber-400/70 shadow-[0_6px_24px_rgba(245,158,11,0.22)] group-hover:scale-[1.02]'
                    : 'bg-[#141821] border-2 border-[#262B38] group-hover:border-white/20'
                }`}
              >
                <ModuleBadgeFigure
                  moduleId={module.id}
                  unlocked={isUnlocked}
                  index={idx}
                  size="full"
                />

                {/* Status Indicator in Top-Right Corner */}
                <span
                  className={`absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center shadow-md ${
                    isUnlocked
                      ? 'bg-slate-950/85 text-emerald-300 border border-emerald-400/60'
                      : 'bg-slate-950/75 text-slate-400 border border-white/10'
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Lock className="h-3 w-3" aria-hidden="true" />
                  )}
                </span>
              </div>

              {/* Module Title & X/Y lessons underneath */}
              <div className="mt-2.5 px-1 w-full min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 break-words">
                  {module.title}
                </p>
                <p
                  className={`text-[11px] sm:text-xs mt-0.5 font-mono-tabular ${
                    isUnlocked ? 'text-emerald-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {completedLessonsCount}/{totalLessonsCount} lessons
                </p>
                {isUnlocked && (
                  <p className="text-[10px] font-semibold text-amber-300 mt-0.5 truncate">
                    {themeMeta.badgeName}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </SecondaryModalOverlay>
  );
};

