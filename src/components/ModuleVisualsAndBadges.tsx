import React from 'react';
import { X, Sparkles, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import type { LearningModule } from '../data/finlitData';

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
    tileBgClass: 'bg-gradient-to-br from-[#23B883] via-[#28C08A] to-[#4AD295]',
    headerBgClass: 'bg-gradient-to-b from-[#23B883] via-[#1C996C] to-[#114B3A]',
    accentHex: '#23B883',
    badgeName: 'Money Foundations Badge',
    shortDescription: 'Learn the fundamentals of managing money',
  },
  'mod-02-credit': {
    id: 'mod-02-credit',
    tileBgClass: 'bg-gradient-to-br from-[#00B8A9] via-[#06A79D] to-[#0D9488]',
    headerBgClass: 'bg-gradient-to-b from-[#1CC5A3] via-[#159E83] to-[#0E4F45]',
    accentHex: '#00B8A9',
    badgeName: 'Credit Shield Badge',
    shortDescription: 'Understand credit, credit cards, and how to use them wisely',
  },
  'mod-03-university-finances': {
    id: 'mod-03-university-finances',
    tileBgClass: 'bg-gradient-to-br from-[#EB8C00] via-[#D97706] to-[#B45309]',
    headerBgClass: 'bg-gradient-to-b from-[#EB8C00] via-[#C26D05] to-[#593206]',
    accentHex: '#EB8C00',
    badgeName: 'Scholar Crown Badge',
    shortDescription: 'Understand college costs, FAFSA, aid, and how they affect taxes',
  },
  'mod-04-taxes': {
    id: 'mod-04-taxes',
    tileBgClass: 'bg-gradient-to-br from-[#E53835] via-[#DC2626] to-[#B91C1C]',
    headerBgClass: 'bg-gradient-to-b from-[#E53835] via-[#B91C1C] to-[#571212]',
    accentHex: '#E53835',
    badgeName: 'Tax Tactician Badge',
    shortDescription: "Understand payroll tax, income tax, and the forms you'll use as an employee",
  },
  'mod-05-types-of-accounts': {
    id: 'mod-05-types-of-accounts',
    tileBgClass: 'bg-gradient-to-br from-[#0288D1] via-[#0277BD] to-[#0369A1]',
    headerBgClass: 'bg-gradient-to-b from-[#0288D1] via-[#0369A1] to-[#0A3656]',
    accentHex: '#0288D1',
    badgeName: 'Account Vault Badge',
    shortDescription: "Every lesson covers: what the account is, who it's for, and when/why to use it.",
  },
  'mod-06-consumer-skills': {
    id: 'mod-06-consumer-skills',
    tileBgClass: 'bg-gradient-to-br from-[#1E62D0] via-[#1D4ED8] to-[#1E40AF]',
    headerBgClass: 'bg-gradient-to-b from-[#1E62D0] via-[#1D4ED8] to-[#122963]',
    accentHex: '#1E62D0',
    badgeName: 'Smart Spender Badge',
    shortDescription: 'Learn how to spend, save, and manage income and expenses wisely',
  },
  'mod-07-irl-money-skills': {
    id: 'mod-07-irl-money-skills',
    tileBgClass: 'bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]',
    headerBgClass: 'bg-gradient-to-b from-[#7C3AED] via-[#5B21B6] to-[#2B1257]',
    accentHex: '#7C3AED',
    badgeName: 'Real-World Navigator Badge',
    shortDescription: 'Master apartments, cars, insurance, and real-world contracts with confidence',
  },
  'mod-08-getting-out-of-debt': {
    id: 'mod-08-getting-out-of-debt',
    tileBgClass: 'bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#9F1239]',
    headerBgClass: 'bg-gradient-to-b from-[#E11D48] via-[#9F1239] to-[#4A0D21]',
    accentHex: '#E11D48',
    badgeName: 'Debt Breaker Badge',
    shortDescription: 'Compare avalanche vs. snowball payoffs and stay in control of borrowed money',
  },
  'mod-09-how-banks-work': {
    id: 'mod-09-how-banks-work',
    tileBgClass: 'bg-gradient-to-br from-[#0D9488] via-[#0F766E] to-[#115E59]',
    headerBgClass: 'bg-gradient-to-b from-[#0D9488] via-[#0F766E] to-[#0B3B38]',
    accentHex: '#0D9488',
    badgeName: 'Pillar Bank Badge',
    shortDescription: 'See how banks make money, protect deposits, and power everyday transfers',
  },
  'mod-10-financial-services': {
    id: 'mod-10-financial-services',
    tileBgClass: 'bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]',
    headerBgClass: 'bg-gradient-to-b from-[#10B981] via-[#059669] to-[#093B2C]',
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
 * Renders the playful illustrated scene inside a cream rounded square card
 * for each module tile on the Modules tab (matching IMG_4174.PNG).
 */
export const ModuleTileIllustration: React.FC<{
  moduleId: string;
  index?: number;
  className?: string;
}> = ({ moduleId, index = 0, className = 'h-24 w-24 sm:h-28 sm:w-28' }) => {
  const canonicalIdx = (CANONICAL_MODULE_IDS as readonly string[]).indexOf(moduleId);
  const slot = canonicalIdx >= 0 ? canonicalIdx : index % 10;

  return (
    <div
      className={`${className} rounded-[20px] bg-[#FAF6EE] shadow-md flex items-center justify-center overflow-hidden p-1.5 shrink-0 select-none border border-white/50`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Soft background botanical leaf accents */}
        <circle cx="60" cy="60" r="52" fill="#F3EDE0" />
        <path
          d="M16 88 C22 78, 30 82, 26 94 C20 94, 16 92, 16 88 Z"
          fill="#CBD5C0"
          opacity="0.65"
        />
        <path
          d="M102 86 C96 76, 88 80, 92 92 C98 92, 102 90, 102 86 Z"
          fill="#CBD5C0"
          opacity="0.65"
        />

        {/* MODULE 1: Intro to Financial Literacy (Book with $ + speech bubbles) */}
        {slot === 0 && (
          <g>
            {/* Floating bubbles */}
            <circle cx="30" cy="24" r="11" fill="#FDE2E4" />
            <circle cx="30" cy="24" r="5" fill="#F4A261" />
            <circle cx="68" cy="18" r="10" fill="#E2ECE9" />
            <text x="68" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2A9D8F">
              %
            </text>
            <circle cx="20" cy="48" r="10" fill="#E0FBFC" />
            <rect x="16" y="46" width="2.5" height="6" rx="1" fill="#2563EB" />
            <rect x="20" y="43" width="2.5" height="9" rx="1" fill="#2563EB" />
            <rect x="24" y="45" width="2.5" height="7" rx="1" fill="#2563EB" />
            <circle cx="96" cy="44" r="11" fill="#FFF1E6" />
            <rect x="92" y="40" width="2.5" height="8" rx="1" fill="#E76F51" />
            <rect x="97" y="38" width="2.5" height="10" rx="1" fill="#2A9D8F" />

            {/* Person shoulders + open golden book */}
            <path d="M34 112 C34 90, 86 90, 86 112 Z" fill="#3B82F6" />
            <circle cx="60" cy="52" r="11" fill="#1E293B" />
            <path
              d="M36 42 L60 48 L84 42 L84 86 L60 92 L36 86 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            <line x1="60" y1="48" x2="60" y2="92" stroke="#B45309" strokeWidth="1.5" />
            <text x="50" y="75" textAnchor="middle" fontSize="20" fontWeight="800" fill="#FEF3C7">
              $
            </text>
          </g>
        )}

        {/* MODULE 2: Credit (Tilted Teal Credit Card + Check, %, Lock, $ bubbles) */}
        {slot === 1 && (
          <g>
            <circle cx="28" cy="30" r="10" fill="#E6F4EA" />
            <path
              d="M24 30 L27 33 L33 27"
              stroke="#10B981"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="88" cy="28" r="10" fill="#E0F2FE" />
            <text x="88" y="32" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0284C7">
              %
            </text>
            <circle cx="26" cy="84" r="10" fill="#E6F4EA" />
            <rect x="22" y="83" width="8" height="6" rx="1.5" fill="#10B981" />
            <path d="M24 83 V80 A2 2 0 0 1 28 80 V83" stroke="#10B981" strokeWidth="1.5" fill="none" />
            <circle cx="86" cy="88" r="10" fill="#ECFDF5" />
            <text x="86" y="92" textAnchor="middle" fontSize="11" fontWeight="800" fill="#059669">
              $
            </text>

            {/* Tilted Credit Card */}
            <g transform="translate(60, 58) rotate(12)">
              <rect x="-28" y="-18" width="56" height="36" rx="6" fill="#14B8A6" stroke="#0D9488" strokeWidth="1.5" />
              <rect x="-28" y="-10" width="56" height="6" fill="#0F766E" />
              <rect x="-21" y="2" width="10" height="7" rx="1.5" fill="#FDE68A" />
              <circle cx="18" cy="10" r="4" fill="#CCFBF1" opacity="0.8" />
            </g>
          </g>
        )}

        {/* MODULE 3: University Finances (Graduation Cap on Books + Coins & Campus) */}
        {slot === 2 && (
          <g>
            <circle cx="24" cy="36" r="10" fill="#FEF3C7" />
            <circle cx="24" cy="36" r="6" fill="#F59E0B" />
            <circle cx="92" cy="32" r="11" fill="#FFE4E6" />
            <ellipse cx="92" cy="32" rx="6" ry="4.5" fill="#FB7185" />
            <circle cx="94" cy="78" r="11" fill="#FEF3C7" />
            <path d="M88 82 H100 L94 74 Z" fill="#D97706" />

            {/* Stacked Books */}
            <rect x="34" y="72" width="52" height="10" rx="3" fill="#84CC16" />
            <rect x="38" y="62" width="44" height="10" rx="3" fill="#38BDF8" />
            <rect x="42" y="52" width="36" height="10" rx="3" fill="#FBBF24" />

            {/* Graduation Cap */}
            <polygon points="60,28 88,40 60,52 32,40" fill="#D97706" />
            <rect x="46" y="46" width="28" height="9" rx="3" fill="#B45309" />
            <path d="M82 42 V56" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* MODULE 4: Taxes (Clipboard Form + Calculator + % and $) */}
        {slot === 3 && (
          <g>
            <circle cx="24" cy="32" r="10" fill="#FEE2E2" />
            <text x="24" y="36" textAnchor="middle" fontSize="10" fontWeight="800" fill="#EF4444">
              %
            </text>
            <circle cx="94" cy="28" r="10" fill="#FEF3C7" />
            <circle cx="94" cy="28" r="6.5" fill="#F59E0B" />
            <text x="94" y="31" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFF">
              $
            </text>
            <circle cx="22" cy="64" r="9" fill="#DCFCE7" />
            <path d="M19 64 L21 66 L26 61" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Tax Clipboard */}
            <rect x="38" y="28" width="38" height="54" rx="5" fill="#EF4444" />
            <rect x="42" y="34" width="30" height="44" rx="3" fill="#FFFFFF" />
            <rect x="49" y="24" width="16" height="7" rx="2.5" fill="#F59E0B" />
            <line x1="47" y1="44" x2="67" y2="44" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <line x1="47" y1="52" x2="67" y2="52" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
            <line x1="47" y1="60" x2="62" y2="60" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

            {/* Mini Calculator */}
            <rect x="66" y="54" width="24" height="32" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="70" y="58" width="16" height="6" rx="1.5" fill="#F59E0B" />
            <circle cx="73" cy="70" r="2" fill="#64748B" />
            <circle cx="78" cy="70" r="2" fill="#64748B" />
            <circle cx="83" cy="70" r="2" fill="#64748B" />
            <circle cx="73" cy="77" r="2" fill="#64748B" />
            <circle cx="78" cy="77" r="2" fill="#64748B" />
            <circle cx="83" cy="77" r="2" fill="#EF4444" />
          </g>
        )}

        {/* MODULE 5: Types of Accounts (Stacked Account Cards + Coin + Piggy + Lock) */}
        {slot === 4 && (
          <g>
            <circle cx="24" cy="28" r="10" fill="#FFE4E6" />
            <ellipse cx="24" cy="28" rx="5.5" ry="4" fill="#FB7185" />
            <circle cx="92" cy="26" r="10" fill="#DCFCE7" />
            <rect x="88" y="25" width="8" height="6" rx="1.5" fill="#16A34A" />
            <circle cx="24" cy="90" r="10" fill="#E0F2FE" />
            <path d="M20 92 L24 88 L28 90" stroke="#0284C7" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Stacked Cards */}
            <rect x="38" y="64" width="46" height="24" rx="5" fill="#FBBF24" transform="rotate(-6 61 76)" />
            <rect x="36" y="50" width="46" height="24" rx="5" fill="#34D399" transform="rotate(5 59 62)" />
            <rect x="36" y="36" width="46" height="24" rx="5" fill="#38BDF8" />
            <circle cx="59" cy="36" r="8" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1.5" />
            <text x="59" y="39" textAnchor="middle" fontSize="9" fontWeight="800" fill="#FFF">
              $
            </text>
          </g>
        )}

        {/* MODULE 6: Consumer Skills (Person holding Pie Chart + Bubbles) */}
        {slot === 5 && (
          <g>
            <circle cx="24" cy="30" r="10" fill="#FEF3C7" />
            <rect x="20" y="27" width="8" height="8" rx="1.5" fill="#F59E0B" />
            <circle cx="94" cy="30" r="10" fill="#DCFCE7" />
            <ellipse cx="94" cy="30" rx="5.5" ry="4" fill="#22C55E" />
            <circle cx="96" cy="58" r="10" fill="#E0E7FF" />
            <rect x="92" y="56" width="2.5" height="6" fill="#4F46E5" />
            <rect x="96" y="53" width="2.5" height="9" fill="#4F46E5" />

            {/* Person + Pie Chart Board */}
            <path d="M34 112 C34 88, 86 88, 86 112 Z" fill="#3B82F6" />
            <circle cx="60" cy="34" r="12" fill="#1E293B" />
            <rect x="42" y="42" width="36" height="44" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="11" fill="#3B82F6" />
            <path d="M60 60 L60 49 A11 11 0 0 1 71 60 Z" fill="#F59E0B" />
            <line x1="48" y1="77" x2="72" y2="77" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* MODULE 7: Practical Financial Skills (Keys, Car, Apartment & Shield) */}
        {slot === 6 && (
          <g>
            <circle cx="26" cy="30" r="10" fill="#EDE9FE" />
            <text x="26" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7C3AED">
              $
            </text>
            <circle cx="94" cy="30" r="10" fill="#DCFCE7" />
            <path d="M90 30 L93 33 L99 27" stroke="#16A34A" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* House / Apartment */}
            <polygon points="60,30 88,52 32,52" fill="#8B5CF6" />
            <rect x="38" y="52" width="44" height="36" rx="4" fill="#C4B5FD" />
            <rect x="54" y="66" width="12" height="22" rx="2" fill="#5B21B6" />
            <rect x="44" y="58" width="8" height="8" rx="1.5" fill="#FEF3C7" />
            <rect x="68" y="58" width="8" height="8" rx="1.5" fill="#FEF3C7" />
          </g>
        )}

        {/* MODULE 8: Getting Out of Debt (Target Shield & Snowball/Avalanche Chart) */}
        {slot === 7 && (
          <g>
            <circle cx="26" cy="30" r="10" fill="#FFE4E6" />
            <text x="26" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#E11D48">
              %
            </text>
            <circle cx="94" cy="30" r="10" fill="#DCFCE7" />
            <path d="M90 30 L93 33 L99 27" stroke="#16A34A" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Descending Debt Bars + Check Shield */}
            <rect x="32" y="44" width="10" height="42" rx="3" fill="#FB7185" />
            <rect x="47" y="54" width="10" height="32" rx="3" fill="#F43F5E" />
            <rect x="62" y="64" width="10" height="22" rx="3" fill="#E11D48" />
            <rect x="77" y="74" width="10" height="12" rx="3" fill="#10B981" />
            <path d="M34 40 L84 68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* MODULE 9: How Banks Work (Classical Bank Building with Pillars) */}
        {slot === 8 && (
          <g>
            <circle cx="24" cy="30" r="10" fill="#CCFBF1" />
            <text x="24" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0D9488">
              %
            </text>
            <circle cx="94" cy="30" r="10" fill="#FEF3C7" />
            <text x="94" y="34" textAnchor="middle" fontSize="10" fontWeight="800" fill="#D97706">
              $
            </text>

            {/* Bank Dome & Columns */}
            <polygon points="60,28 90,46 30,46" fill="#0D9488" />
            <rect x="32" y="46" width="56" height="6" rx="2" fill="#14B8A6" />
            <rect x="38" y="52" width="7" height="28" rx="2" fill="#99F6E4" />
            <rect x="56.5" y="52" width="7" height="28" rx="2" fill="#99F6E4" />
            <rect x="75" y="52" width="7" height="28" rx="2" fill="#99F6E4" />
            <rect x="28" y="80" width="64" height="8" rx="3" fill="#0F766E" />
          </g>
        )}

        {/* MODULE 10: Investing (Rising Growth Rocket & Compound Bars) */}
        {slot === 9 && (
          <g>
            <circle cx="26" cy="32" r="10" fill="#FEF3C7" />
            <text x="26" y="36" textAnchor="middle" fontSize="10" fontWeight="800" fill="#D97706">
              $
            </text>
            <circle cx="94" cy="28" r="10" fill="#DCFCE7" />
            <text x="94" y="32" textAnchor="middle" fontSize="10" fontWeight="800" fill="#059669">
              +
            </text>

            {/* Ascending Compound Bars + Upward Arrow */}
            <rect x="32" y="72" width="10" height="16" rx="3" fill="#6EE7B7" />
            <rect x="47" y="60" width="10" height="28" rx="3" fill="#34D399" />
            <rect x="62" y="48" width="10" height="40" rx="3" fill="#10B981" />
            <rect x="77" y="34" width="10" height="54" rx="3" fill="#059669" />
            <path
              d="M32 62 L54 46 L78 26 M78 26 H68 M78 26 V36"
              stroke="#F59E0B"
              strokeWidth="3.5"
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
 * Renders the 3D-style Collectible Sticker / Badge Figure for each module
 * (matching IMG_4173.PNG):
 * - When `unlocked === false` (< 100% lessons completed): shaded grey monochrome figure
 * - When `unlocked === true` (100% lessons completed): vibrant full-color figure
 */
export const ModuleBadgeFigure: React.FC<{
  moduleId: string;
  unlocked: boolean;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}> = ({ moduleId, unlocked, index = 0, size = 'lg' }) => {
  const canonicalIdx = (CANONICAL_MODULE_IDS as readonly string[]).indexOf(moduleId);
  const slot = canonicalIdx >= 0 ? canonicalIdx : index % 10;

  const sizeClasses =
    size === 'sm'
      ? 'h-9 w-9'
      : size === 'md'
      ? 'h-16 w-16'
      : 'h-24 w-24 sm:h-28 sm:w-28';

  // Grey palette for locked state (matches IMG_4173.PNG shaded figures) vs Vibrant palette for unlocked
  const primary = unlocked
    ? [
        '#34D399', // Mod 1 Emerald
        '#2DD4BF', // Mod 2 Teal
        '#FBBF24', // Mod 3 Gold
        '#F87171', // Mod 4 Coral
        '#38BDF8', // Mod 5 Sky
        '#60A5FA', // Mod 6 Blue
        '#A78BFA', // Mod 7 Violet
        '#FB7185', // Mod 8 Rose (Getting Out of Debt)
        '#2DD4BF', // Mod 9 Teal (How Banks Work)
        '#34D399', // Mod 10 Emerald (Financial Services)
      ][slot]
    : '#52565E';

  const secondary = unlocked
    ? [
        '#059669',
        '#0D9488',
        '#D97706',
        '#DC2626',
        '#0284C7',
        '#2563EB',
        '#7C3AED',
        '#E11D48',
        '#0F766E',
        '#059669',
      ][slot]
    : '#373A40';

  const accent = unlocked ? '#FDE68A' : '#686D76';
  const strokeTone = unlocked ? '#0F172A' : '#1E2024';

  return (
    <div
      className={`${sizeClasses} relative flex items-center justify-center select-none transition-transform duration-300 ${
        unlocked ? 'drop-shadow-[0_6px_18px_rgba(52,211,153,0.32)] scale-105' : 'opacity-90'
      }`}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Soft 3D Ground Shadow (just like IMG_4173.PNG) */}
        <ellipse cx="60" cy="102" rx="34" ry="7" fill="#090B0E" opacity="0.7" />

        {/* Slot 0: Intro Book & Coin Sticker */}
        {slot === 0 && (
          <g>
            <rect
              x="30"
              y="24"
              width="56"
              height="64"
              rx="12"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <rect x="38" y="34" width="40" height="10" rx="4" fill={secondary} />
            <circle
              cx="82"
              cy="76"
              r="16"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <path
              d="M82 69 V83 M75 76 H89"
              stroke={strokeTone}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 1: Credit Card Figure (matches IMG_4173.PNG top-left Credit card!) */}
        {slot === 1 && (
          <g>
            <rect
              x="22"
              y="34"
              width="76"
              height="50"
              rx="14"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <rect x="25" y="46" width="70" height="11" fill={secondary} />
            <rect x="34" y="66" width="14" height="7" rx="3.5" fill={secondary} />
            <rect x="54" y="66" width="18" height="7" rx="3.5" fill={secondary} />
            <path
              d="M34 40 Q60 36 86 40"
              stroke={accent}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        )}

        {/* Slot 2: University Graduation Cap Figure (matches IMG_4173.PNG bottom-left!) */}
        {slot === 2 && (
          <g>
            <path
              d="M38 56 V78 C38 86 82 86 82 78 V56"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <polygon
              points="60,28 98,46 60,62 22,46"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <circle
              cx="80"
              cy="76"
              r="15"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <path
              d="M80 70 V82 M74 76 H86"
              stroke={strokeTone}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 3: Taxes Document + Plus Badge (matches IMG_4173.PNG top-right!) */}
        {slot === 3 && (
          <g>
            <path
              d="M34 22 H68 L84 38 V84 C84 90 79 94 73 94 H34 C28 94 24 90 24 84 V32 C24 26 28 22 34 22 Z"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <path
              d="M68 22 V38 H84"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <rect x="36" y="48" width="28" height="7" rx="3.5" fill={secondary} />
            <rect x="36" y="60" width="20" height="7" rx="3.5" fill={secondary} />
            <circle
              cx="80"
              cy="74"
              r="16"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <path
              d="M80 67 V81 M73 74 H87"
              stroke={strokeTone}
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 4: Types of Accounts Stacked Cards (matches IMG_4173.PNG middle-left!) */}
        {slot === 4 && (
          <g>
            <rect
              x="26"
              y="26"
              width="52"
              height="36"
              rx="10"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <rect
              x="32"
              y="38"
              width="54"
              height="36"
              rx="10"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <rect
              x="38"
              y="52"
              width="56"
              height="36"
              rx="12"
              fill={unlocked ? '#7DD3FC' : '#60656F'}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <circle cx="52" cy="70" r="8" fill={secondary} />
            <path
              d="M52 66 V74 M48 70 H56"
              stroke={accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 5: Consumer Skills Pie / Coin Figure */}
        {slot === 5 && (
          <g>
            <circle
              cx="58"
              cy="56"
              r="30"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <path
              d="M58 56 L58 26 A30 30 0 0 1 88 56 Z"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <circle
              cx="82"
              cy="76"
              r="14"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <path
              d="M78 76 L81 79 L87 73"
              stroke={accent}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Slot 6: Practical Financial Skills Shield & Key */}
        {slot === 6 && (
          <g>
            <path
              d="M60 22 L90 34 V58 C90 78 60 92 60 92 C60 92 30 78 30 58 V34 Z"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <circle cx="60" cy="52" r="10" fill={accent} stroke={strokeTone} strokeWidth="3.5" />
            <rect x="57" y="60" width="6" height="14" rx="3" fill={accent} />
          </g>
        )}

        {/* Slot 7: Getting Out of Debt Lightning Bolt / Breaker */}
        {slot === 7 && (
          <g>
            <circle
              cx="58"
              cy="56"
              r="30"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <polygon
              points="64,28 42,58 58,58 52,84 76,52 60,52"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Slot 8: How Banks Work Classical Dome & Columns (matches IMG_4173.PNG middle-right!) */}
        {slot === 8 && (
          <g>
            <path
              d="M28 44 C28 24 92 24 92 44 Z"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
            />
            <rect
              x="24"
              y="44"
              width="72"
              height="10"
              rx="5"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <rect
              x="32"
              y="56"
              width="12"
              height="24"
              rx="4"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="3.5"
            />
            <rect
              x="54"
              y="56"
              width="12"
              height="24"
              rx="4"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="3.5"
            />
            <rect
              x="76"
              y="56"
              width="12"
              height="24"
              rx="4"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="3.5"
            />
            <rect
              x="22"
              y="80"
              width="76"
              height="11"
              rx="5.5"
              fill={secondary}
              stroke={strokeTone}
              strokeWidth="4"
            />
          </g>
        )}

        {/* Slot 9: Investing Magic Carpet / Rocket Figure (matches IMG_4173.PNG bottom-right!) */}
        {slot === 9 && (
          <g>
            <path
              d="M44 78 C50 56 64 42 86 36 C82 58 72 72 52 84 Z"
              fill={primary}
              stroke={strokeTone}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <circle
              cx="38"
              cy="80"
              r="13"
              fill={accent}
              stroke={strokeTone}
              strokeWidth="4"
            />
            <path
              d="M38 75 V85 M33 80 H43"
              stroke={strokeTone}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="76" cy="28" r="3.5" fill={accent} />
            <circle cx="88" cy="48" r="3" fill={accent} />
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
 * Full-screen / Modal "Badge Collection" Album (matching IMG_4173.PNG)
 * Opened from the "Badge Collection" button on the Home page.
 */
export const BadgeCollectionModal: React.FC<{
  items: ModuleBadgeStatusItem[];
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  isPhoneView?: boolean;
}> = ({ items, onClose, onSelectModule, isPhoneView = false }) => {
  const unlockedCount = items.filter((item) => item.isUnlocked).length;
  const totalCount = items.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Badge Collection Album"
      className={
        isPhoneView
          ? 'absolute inset-0 z-50 bg-[#0B0E14] flex flex-col overflow-y-auto px-4 py-4 animate-page-enter'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl px-4 py-6 overflow-y-auto animate-page-enter'
      }
    >
      <div
        className={`w-full ${
          isPhoneView
            ? 'space-y-5 pb-8'
            : 'max-w-2xl rounded-[32px] bg-[#0E121A] border border-white/12 p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto'
        }`}
      >
        {/* Top Header matching IMG_4173.PNG */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Badge Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Collection album
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Finish every lesson in a module to unlock its badge. Locked figures
              stay shaded until you complete the set.
            </p>
            <p className="pt-1 text-sm font-bold text-emerald-400 font-mono-tabular">
              {unlockedCount} / {totalCount} unlocked
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Badge Collection"
            className="min-h-[40px] min-w-[40px] rounded-2xl bg-white/10 hover:bg-white/15 border border-white/12 flex items-center justify-center text-white shrink-0 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2-Column Badge Album Grid matching IMG_4173.PNG */}
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
                {/* Rounded Square Sticker Tile */}
                <div
                  className={`w-full aspect-square rounded-[28px] p-3 flex flex-col items-center justify-center relative transition-all duration-300 ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-slate-800/90 to-[#141822] border-2 border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] group-hover:scale-[1.02]'
                      : 'bg-[#171A21] border-[3px] border-[#262A34] group-hover:border-white/20'
                  }`}
                >
                  <ModuleBadgeFigure
                    moduleId={module.id}
                    unlocked={isUnlocked}
                    index={idx}
                    size="lg"
                  />

                  {/* Subtle status indicator in top-right corner */}
                  <span
                    className={`absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Lock className="h-3 w-3" aria-hidden="true" />
                    )}
                  </span>
                </div>

                {/* Module Title & X/Y lessons underneath (matching IMG_4173.PNG) */}
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

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span>Done</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
