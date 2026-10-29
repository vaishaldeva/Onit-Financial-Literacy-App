import React, { useState } from 'react';
import {
  X,
  User,
  RotateCcw,
  LogOut,
  CheckCircle2,
  Play,
  ShieldCheck,
  Pin,
  Sparkles,
  Gamepad2,
} from 'lucide-react';
import type { UserProfile } from './AuthAndIntroModal';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  userProfile: UserProfile | null;
  totalXp: number;
  maxPossibleXp: number;
  completedModulesCount: number;
  totalModulesCount: number;
  solvedQuizzesCount: number;
  totalQuizzesCount: number;
  pinnedCardsCount: number;
  pinnedBanksCount: number;
  onUpdateProfile: (profile: UserProfile) => void;
  onReplayIntro: () => void;
  onResetQuizzes: () => void;
  onResetPins: () => void;
  onSignOut: () => void;
  onClose: () => void;
  isPhoneView?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  userProfile,
  totalXp,
  maxPossibleXp,
  completedModulesCount,
  totalModulesCount,
  solvedQuizzesCount,
  totalQuizzesCount,
  pinnedCardsCount,
  pinnedBanksCount,
  onUpdateProfile,
  onReplayIntro,
  onResetQuizzes,
  onResetPins,
  onSignOut,
  onClose,
  isPhoneView = false,
}) => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(userProfile?.name || 'Alex Morgan');
  const [email, setEmail] = useState(userProfile?.email || 'alex.morgan@onitfinance.com');
  const [savedBanner, setSavedBanner] = useState(false);
  const [resetBanner, setResetBanner] = useState(false);

  const progressPercent =
    totalModulesCount > 0
      ? Math.round((completedModulesCount / totalModulesCount) * 100)
      : 0;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || 'Alex Morgan',
      email: email.trim() || 'alex.morgan@onitfinance.com',
      createdAt: userProfile?.createdAt || Date.now(),
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const handleResetXpAndQuestionsClick = () => {
    onResetQuizzes();
    setResetBanner(true);
    setTimeout(() => setResetBanner(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Onit Account and App Settings"
      className={
        isPhoneView
          ? 'absolute inset-0 z-40 bg-slate-950/98 backdrop-blur-xl flex flex-col justify-start px-5 py-4 overflow-y-auto'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-[22px] pt-[max(3.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto'
      }
    >
      <div
        className={`glass-panel-elevated w-full ${
          isPhoneView
            ? 'rounded-3xl p-4 sm:p-5 border border-white/15 my-auto space-y-5'
            : 'max-w-xl rounded-3xl p-6 sm:p-8 border border-white/15 my-auto space-y-6'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
              <User className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400">
                Onit: Own Your Future
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Account & App Settings
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="min-h-[40px] min-w-[40px] rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Theme Switcher (Theme 1 vs Theme 2) */}
        <div className="rounded-2xl bg-slate-950/65 border border-white/14 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-white">App Theme</p>
            <p className="text-[11px] text-slate-300">
              Switch between Theme 1 and Theme 2
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5 bg-slate-950/90 p-1 rounded-2xl border border-white/12 shrink-0">
            <button
              type="button"
              onClick={() => setTheme('modern')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                theme === 'modern'
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Theme 1</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('retro')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                theme === 'retro'
                  ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Theme 2</span>
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="settings-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-slate-950/90 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="settings-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Account Email
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-950/90 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* At-a-Glance Account Progress Bar directly under Full Name & Account Email */}
          <div className="rounded-2xl bg-slate-950/90 border border-white/12 p-3.5 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-200">
                Learning Progress ({completedModulesCount}/{totalModulesCount} Modules)
              </span>
              <span className="font-mono-tabular font-bold text-emerald-300">
                {progressPercent}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Account learning progress"
              className="h-2.5 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px]"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.45)] transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progressPercent, progressPercent > 0 ? 4 : 0)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-tabular">
              <span>{solvedQuizzesCount}/{totalQuizzesCount} Solved Questions</span>
              <span>{completedModulesCount} Completed</span>
            </div>
          </div>

          {savedBanner && (
            <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 px-4 py-2.5 text-xs font-semibold text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Your Onit profile has been saved!</span>
            </div>
          )}

          {resetBanner && (
            <div className="rounded-xl bg-amber-500/15 border border-amber-400/40 px-4 py-2.5 text-xs font-semibold text-amber-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0" />
              <span>Progress and solved questions have been reset!</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Progress saved automatically</span>
            </div>

            <button
              type="submit"
              className="min-h-[42px] px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

        {/* App Controls & Progress Actions */}
        <div className="border-t border-white/10 pt-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            App Controls & Account Actions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onReplayIntro();
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/12 text-xs font-semibold text-cyan-300 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Play className="h-3.5 w-3.5" />
                <span>Replay Intro Slides</span>
              </span>
              <span className="text-[11px] text-slate-400">4 Slides</span>
            </button>

            <button
              type="button"
              onClick={handleResetXpAndQuestionsClick}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/12 text-xs font-semibold text-amber-300 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-left">
                <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                <span>Reset XP and Solved Questions</span>
              </span>
              <span className="font-mono-tabular text-[11px] text-slate-400 shrink-0">
                {totalXp} XP · {solvedQuizzesCount}
              </span>
            </button>

            <button
              type="button"
              onClick={onResetPins}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/12 text-xs font-semibold text-slate-200 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Pin className="h-3.5 w-3.5 text-emerald-400" />
                <span>Clear Pinned Items</span>
              </span>
              <span className="font-mono-tabular text-[11px] text-slate-400">
                {pinnedCardsCount + pinnedBanksCount} Pinned
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/35 text-xs font-bold text-rose-200 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </span>
              <span className="text-[11px] text-rose-300">Auth</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
