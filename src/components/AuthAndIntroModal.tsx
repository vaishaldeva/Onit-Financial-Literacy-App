import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Layers,
  CreditCard,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { POST_SIGNUP_INTRO_SLIDES } from '../data/finlitData';

export interface UserProfile {
  name: string;
  email: string;
  createdAt: number;
}

interface AuthAndIntroModalProps {
  mode: 'signup' | 'intro';
  userProfile: UserProfile | null;
  onCompleteSignup: (profile: UserProfile) => void;
  onFinishIntro: () => void;
  isPhoneView?: boolean;
}

export const AuthAndIntroModal: React.FC<AuthAndIntroModalProps> = ({
  mode,
  userProfile,
  onCompleteSignup,
  onFinishIntro,
  isPhoneView = false,
}) => {
  const [authTab, setAuthTab] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [introIndex, setIntroIndex] = useState(0);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authTab === 'signup' && (!name.trim() || !email.trim())) {
      setFormError('Please enter your name and email address to create your Onit account.');
      return;
    }
    if (authTab === 'login' && !email.trim()) {
      setFormError('Please enter your email address to sign in.');
      return;
    }
    setFormError('');
    const derivedName =
      name.trim() ||
      email
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()) ||
      'Alex Morgan';

    onCompleteSignup({
      name: derivedName,
      email: email.trim(),
      createdAt: Date.now(),
    });
  };

  const handleQuickDemoAccount = () => {
    setFormError('');
    onCompleteSignup({
      name: 'Alex Morgan',
      email: 'alex.morgan@onitfinance.com',
      createdAt: Date.now(),
    });
  };

  if (mode === 'signup') {
    return (
      <div
        className={
          isPhoneView
            ? 'w-full h-full flex flex-col justify-start overflow-y-auto px-5 py-4'
            : 'fixed inset-0 z-50 flex items-center justify-center bg-[#060911]/90 backdrop-blur-xl px-[22px] pt-[max(3.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto'
        }
      >
        <div
          className={`glass-panel-elevated relative w-full ${
            isPhoneView ? 'rounded-2xl p-4 sm:p-5 border border-white/15 my-auto' : 'max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 my-auto'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-bold text-emerald-400 tracking-wide uppercase">
                Onit: Own Your Future
              </p>
              <h1 className={`${isPhoneView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold text-white tracking-tight mt-0.5`}>
                {authTab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h1>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-2xl border border-white/12 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAuthTab('signup');
                  setFormError('');
                }}
                className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  authTab === 'signup'
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign Up</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab('login');
                  setFormError('');
                }}
                className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  authTab === 'login'
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign In</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {authTab === 'signup'
              ? 'Create your Onit account to save your learning progress, explore top credit cards and high-yield banks, and bookmark your favorite options.'
              : 'Sign in to access your saved module progress, pinned banks, and credit card comparisons.'}
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-3.5">
            {authTab === 'signup' && (
              <div>
                <label htmlFor="user-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alex Morgan"
                  className="w-full rounded-xl bg-slate-900/90 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label htmlFor="user-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@email.com"
                className="w-full rounded-xl bg-slate-900/90 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="user-password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <input
                id="user-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/90 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {formError && (
              <div role="alert" className="rounded-xl bg-rose-500/15 border border-rose-400/40 px-3.5 py-2 text-xs font-medium text-rose-200">
                {formError}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                className="flex-1 min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>
                  {authTab === 'signup'
                    ? 'Create Account & Start Intro'
                    : 'Sign In & Continue'}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemoAccount}
                className="min-h-[46px] rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Quick Demo
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Mode === 'intro': Post-Account-Creation Redesigned Intro Slides (Requirement #9)
  const slide = POST_SIGNUP_INTRO_SLIDES[introIndex];
  const isLastSlide = introIndex === POST_SIGNUP_INTRO_SLIDES.length - 1;

  const toneStyles = {
    emerald: {
      accentText: 'text-emerald-400',
      statBox: 'from-emerald-500/25 via-teal-500/10 to-slate-900/90 border-emerald-400/35',
      button: 'from-emerald-400 to-teal-400 text-slate-950',
    },
    cyan: {
      accentText: 'text-cyan-400',
      statBox: 'from-cyan-500/25 via-sky-500/10 to-slate-900/90 border-cyan-400/35',
      button: 'from-cyan-400 to-sky-400 text-slate-950',
    },
    violet: {
      accentText: 'text-violet-400',
      statBox: 'from-violet-500/25 via-indigo-500/10 to-slate-900/90 border-violet-400/35',
      button: 'from-violet-500 to-fuchsia-500 text-white',
    },
    amber: {
      accentText: 'text-amber-400',
      statBox: 'from-amber-500/25 via-orange-500/10 to-slate-900/90 border-amber-400/35',
      button: 'from-amber-400 to-emerald-400 text-slate-950',
    },
  }[slide.accentTone];

  return (
    <div
      className={
        isPhoneView
          ? 'w-full h-full flex flex-col justify-start overflow-y-auto px-5 py-4'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-[#060911]/90 backdrop-blur-xl px-[22px] pt-[max(3.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto'
      }
    >
      <div
        className={`glass-panel-elevated relative w-full ${
          isPhoneView
            ? 'rounded-2xl p-4 sm:p-5 border border-white/15 my-auto space-y-4'
            : 'max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 my-auto'
        }`}
      >
        {/* Top bar with progress segments & skip */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
            <span className="font-mono-tabular font-semibold text-white">{slide.stepNumber}</span>
            <span aria-hidden="true">·</span>
            <span>Welcome, {userProfile?.name || 'Member'}</span>
          </div>

          <button
            type="button"
            onClick={onFinishIntro}
            className="min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            Skip Intro Tour
          </button>
        </div>

        {/* Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 mb-4" aria-label="Intro tour progress">
          {POST_SIGNUP_INTRO_SLIDES.map((s, idx) => (
            <button
              key={s.stepNumber}
              type="button"
              onClick={() => setIntroIndex(idx)}
              aria-label={`Go to intro slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === introIndex
                  ? 'bg-emerald-400'
                  : idx < introIndex
                  ? 'bg-emerald-500/50'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <p className={`text-[11px] font-bold tracking-wider uppercase ${toneStyles.accentText}`}>
          {slide.kicker}
        </p>
        <h2 className={`${isPhoneView ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} font-bold text-white tracking-tight mt-1`}>
          {slide.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
          {slide.body}
        </p>

        {/* Highlight Metric Showcase */}
        <div className={`mt-4 rounded-2xl bg-gradient-to-r ${toneStyles.statBox} border p-4 flex items-center justify-between gap-3`}>
          <div>
            <span className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              {slide.highlightStat}
            </span>
            <p className="text-xs font-medium text-slate-200 mt-0.5">
              {slide.highlightLabel}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
            {introIndex === 0 && <Sparkles className="h-5 w-5 text-emerald-300" />}
            {introIndex === 1 && <CreditCard className="h-5 w-5 text-cyan-300" />}
            {introIndex === 2 && <Layers className="h-5 w-5 text-violet-300" />}
            {introIndex === 3 && <Shield className="h-5 w-5 text-amber-300" />}
          </div>
        </div>

        {/* Key Feature Bullets */}
        <ul className="mt-4 space-y-2.5">
          {slide.featureBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Bottom Navigation Controls */}
        <div className="mt-5 flex items-center justify-between gap-2.5 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIntroIndex((prev) => Math.max(0, prev - 1))}
            disabled={introIndex === 0}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border border-white/15 text-xs font-semibold text-white disabled:opacity-40 hover:bg-white/10 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          {!isLastSlide ? (
            <button
              type="button"
              onClick={() => setIntroIndex((prev) => prev + 1)}
              className={`min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r ${toneStyles.button} text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer`}
            >
              <span>Next ({introIndex + 1}/4)</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinishIntro}
              className="min-h-[42px] px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Enter Onit App</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
