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
} from 'lucide-react';
import type { UserProfile } from './AuthAndIntroModal';

interface SettingsModalProps {
  userProfile: UserProfile | null;
  solvedQuizzesCount: number;
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
  solvedQuizzesCount,
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
  const [name, setName] = useState(userProfile?.name || 'Alex Morgan');
  const [email, setEmail] = useState(userProfile?.email || 'alex.morgan@onitfinance.com');
  const [savedBanner, setSavedBanner] = useState(false);

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
            ? 'rounded-2xl p-4 sm:p-5 border border-white/15 my-auto space-y-5'
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
            className="min-h-[40px] min-w-[40px] rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
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

          {savedBanner && (
            <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 px-4 py-2.5 text-xs font-semibold text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Your Onit profile has been saved!</span>
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
              onClick={onResetQuizzes}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/12 text-xs font-semibold text-amber-300 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Solved Quizzes</span>
              </span>
              <span className="font-mono-tabular text-[11px] text-slate-400">
                {solvedQuizzesCount} Solved
              </span>
            </button>

            <button
              type="button"
              onClick={onResetPins}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/12 text-xs font-semibold text-slate-200 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Pin className="h-3.5 w-3.5 text-emerald-400" />
                <span>Restore Default Pins</span>
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
