import React, { useState, useEffect } from 'react';
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
  Sliders,
  TrendingUp,
  Lock,
  Building2,
  MailCheck,
  RefreshCw,
} from 'lucide-react';
import { POST_SIGNUP_INTRO_SLIDES } from '../data/finlitData';
import { validatePasswordRules, normalizeAccountEmail } from '../utils/logic';
import { PWAInstallButton } from './PWAInstallButton';

export interface UserProfile {
  name: string;
  email: string;
  createdAt: number;
  emailVerified?: boolean;
}

interface StoredAccountRecord extends UserProfile {
  password: string;
}

const ACCOUNTS_REGISTRY_KEY = 'onit_registered_accounts_v2';

function getRegisteredAccounts(): Record<string, StoredAccountRecord> {
  try {
    const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore storage errors
  }
  return {};
}

function saveRegisteredAccount(record: StoredAccountRecord): void {
  try {
    const existing = getRegisteredAccounts();
    const key = normalizeAccountEmail(record.email);
    existing[key] = record;
    localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(existing));
  } catch {
    // ignore storage errors
  }
}

export type OnboardingStage = 'splash' | 'signup' | 'demo' | 'intro' | 'none';

interface AuthAndIntroModalProps {
  mode: Exclude<OnboardingStage, 'none'>;
  userProfile: UserProfile | null;
  onFinishSplash: () => void;
  onCompleteSignup: (profile: UserProfile, isNewSignup: boolean) => void;
  onStartQuickDemo: () => void;
  onReturnToSignup: () => void;
  onFinishIntro: () => void;
  isPhoneView?: boolean;
}

export const OnitAnimatedLogo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const isLarge = size === 'lg';
  return (
    <div
      className={`relative flex items-center justify-center ${
        isLarge ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-10 w-10'
      }`}
    >
      {/* Pulsing Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/35 via-cyan-400/25 to-violet-500/25 blur-xl ${
          isLarge ? 'animate-pulse-ring' : ''
        }`}
      />

      {/* Outer Rotating Orbital Ring */}
      {isLarge && (
        <svg
          viewBox="0 0 140 140"
          className="absolute inset-0 h-full w-full animate-spin-slow"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <circle
            cx="70"
            cy="70"
            r="64"
            fill="none"
            stroke="url(#orbitGrad1)"
            strokeWidth="2"
            strokeDasharray="18 10 6 10"
            strokeLinecap="round"
          />
          <circle cx="70" cy="6" r="4" fill="#34D399" />
          <circle cx="134" cy="70" r="3" fill="#22D3EE" />
        </svg>
      )}

      {/* Inner Counter-Rotating Geometric Ring */}
      {isLarge && (
        <svg
          viewBox="0 0 140 140"
          className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin-reverse-slow"
          aria-hidden="true"
        >
          <circle
            cx="70"
            cy="70"
            r="52"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            strokeDasharray="8 12"
          />
        </svg>
      )}

      {/* Core Emblem Shield & Ascending Bars + Arrow */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B1528] to-emerald-950 border border-emerald-400/40 shadow-2xl shadow-emerald-500/20 ${
          isLarge ? 'h-20 w-20 sm:h-22 sm:w-22 animate-float-slow' : 'h-10 w-10 rounded-xl'
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className={isLarge ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-6 w-6'}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="onitBarGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="onitArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>

          {/* 3 Ascending Wealth Pillars */}
          <rect x="12" y="36" width="8" height="16" rx="3" fill="url(#onitBarGrad)" opacity="0.65" />
          <rect x="26" y="27" width="8" height="25" rx="3" fill="url(#onitBarGrad)" opacity="0.85" />
          <rect x="40" y="18" width="8" height="34" rx="3" fill="url(#onitBarGrad)" />

          {/* Soaring Upward Trajectory Arrow */}
          <path
            d="M12 30 Q26 26, 46 11"
            fill="none"
            stroke="url(#onitArrowGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M37 10 L47 10 L47 20"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const AuthAndIntroModal: React.FC<AuthAndIntroModalProps> = ({
  mode,
  userProfile,
  onFinishSplash,
  onCompleteSignup,
  onStartQuickDemo,
  onReturnToSignup,
  onFinishIntro,
  isPhoneView = false,
}) => {
  const [authTab, setAuthTab] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Email verification step state during Sign Up
  const [signupStep, setSignupStep] = useState<'form' | 'verify'>('form');
  const [expectedCode, setExpectedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [showMailBanner, setShowMailBanner] = useState(false);
  const [resendConfirmation, setResendConfirmation] = useState(false);

  // Splash animation progress (0 -> 100)
  const [splashProgress, setSplashProgress] = useState(0);
  const [splashExiting, setSplashExiting] = useState(false);

  // Quick Demo & Intro slide states
  const [demoSlideIndex, setDemoSlideIndex] = useState(0);
  const [introIndex, setIntroIndex] = useState(0);

  // Interactive mini-sandbox states inside the Quick Demo
  const [demoUtilization, setDemoUtilization] = useState(8);
  const [demoSavingsBalance, setDemoSavingsBalance] = useState(5000);
  const [demoVaultPreviewTab, setDemoVaultPreviewTab] = useState<'cards' | 'banks'>('cards');

  // Lock document scroll completely when standalone page is active so mobile never scrolls or shifts
  useEffect(() => {
    if (isPhoneView || typeof document === 'undefined') return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [isPhoneView]);

  // Choreographed Splash Screen timer
  useEffect(() => {
    if (mode !== 'splash') return;
    setSplashProgress(0);
    setSplashExiting(false);

    const interval = window.setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    const exitTimer = window.setTimeout(() => {
      setSplashExiting(true);
    }, 1350);

    const finishTimer = window.setTimeout(() => {
      onFinishSplash();
    }, 1750);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [mode, onFinishSplash]);

  // Show incoming verification code banner shortly after entering 'verify' step
  useEffect(() => {
    if (signupStep !== 'verify') {
      setShowMailBanner(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setShowMailBanner(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [signupStep, expectedCode]);

  const pwValidation = validatePasswordRules(password);

  const generateSixDigitCode = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const normalizedEmail = normalizeAccountEmail(cleanEmail);

    if (authTab === 'signup') {
      if (!name.trim()) {
        setFormError('Please enter your Full Name.');
        return;
      }
      if (!cleanEmail || !cleanEmail.includes('@')) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (!pwValidation.isValid) {
        setFormError(pwValidation.errorMessage);
        return;
      }

      const accounts = getRegisteredAccounts();
      if (accounts[normalizedEmail]) {
        setFormError('An account with this email already exists. Please switch to Sign In.');
        return;
      }

      // Proceed to Email Verification step
      setFormError('');
      const newCode = generateSixDigitCode();
      setExpectedCode(newCode);
      setEnteredCode('');
      setSignupStep('verify');
      return;
    }

    // Sign In flow
    if (!cleanEmail || !password.trim()) {
      setFormError('Please enter your email and password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const existingAccount = accounts[normalizedEmail];

    if (existingAccount) {
      if (existingAccount.password !== password) {
        setFormError('Incorrect password for this account. Please try again.');
        return;
      }
      setFormError('');
      onCompleteSignup(
        {
          name: existingAccount.name,
          email: existingAccount.email,
          createdAt: existingAccount.createdAt,
          emailVerified: true,
        },
        false
      );
      return;
    }

    // If signing in with an email not yet registered on this device, enforce password rules & register isolated account
    if (!pwValidation.isValid) {
      setFormError('Account not found, or password does not meet requirements (7+ letters, 1 capital).');
      return;
    }

    const derivedName =
      cleanEmail
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Member';

    const newRecord: StoredAccountRecord = {
      name: derivedName,
      email: cleanEmail,
      password,
      createdAt: Date.now(),
      emailVerified: true,
    };
    saveRegisteredAccount(newRecord);
    setFormError('');
    onCompleteSignup(
      {
        name: newRecord.name,
        email: newRecord.email,
        createdAt: newRecord.createdAt,
        emailVerified: true,
      },
      false
    );
  };

  const handleVerifyEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = enteredCode.trim();
    if (cleanCode.length !== 6) {
      setFormError('Please enter the 6-digit verification code.');
      return;
    }
    if (cleanCode !== expectedCode) {
      setFormError('Invalid verification code. Tap the notification banner above or check the code.');
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const newAccount: StoredAccountRecord = {
      name: cleanName,
      email: cleanEmail,
      password,
      createdAt: Date.now(),
      emailVerified: true,
    };

    saveRegisteredAccount(newAccount);
    setFormError('');
    setSignupStep('form');
    onCompleteSignup(
      {
        name: newAccount.name,
        email: newAccount.email,
        createdAt: newAccount.createdAt,
        emailVerified: true,
      },
      true
    );
  };

  const handleResendCode = () => {
    const freshCode = generateSixDigitCode();
    setExpectedCode(freshCode);
    setEnteredCode('');
    setFormError('');
    setResendConfirmation(true);
    window.setTimeout(() => setResendConfirmation(false), 2500);
  };

  // Wrapper classes guaranteeing a 100% opaque, static, mobile-safe non-scrolling viewport
  const staticContainerClass = isPhoneView
    ? 'relative w-full h-full bg-[#060911] flex flex-col justify-between overflow-hidden px-4 py-3 select-none'
    : 'fixed inset-0 z-50 w-full h-[100dvh] max-h-[100dvh] bg-[#060911] flex flex-col justify-between overflow-hidden overscroll-none px-[22px] sm:px-7 pb-[max(1.25rem,env(safe-area-inset-bottom))] select-none';

  // ============================================================================
  // 1. ANIMATED SPLASH / LOADING SCREEN WITH LOGO (MOBILE-FIRST)
  // ============================================================================
  if (mode === 'splash') {
    const statusLabel =
      splashProgress < 40
        ? 'Loading modules...'
        : splashProgress < 80
        ? 'Preparing tools...'
        : 'Ready';

    return (
      <div
        onClick={onFinishSplash}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onFinishSplash();
        }}
        aria-label="Loading Onit. Tap to continue"
        className={`${staticContainerClass} items-center justify-center cursor-pointer transition-all duration-400 ${
          splashExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-emerald-500/15 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan-500/15 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-xs w-full px-4">
          <OnitAnimatedLogo size="lg" />

          <div className="mt-6 space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Onit
            </h1>
            <p className="text-xs sm:text-sm text-emerald-400 font-semibold tracking-wide">
              Own Your Future
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-7 w-full max-w-[220px] space-y-2">
            <div className="h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 transition-all duration-100 ease-out"
                style={{ width: `${Math.min(100, splashProgress)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-tabular">
              <span>{statusLabel}</span>
              <span className="text-emerald-400 font-bold">{Math.min(100, splashProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. STATIC, SIMPLE, MOBILE-FIRST "CREATE YOUR ACCOUNT" + EMAIL VERIFICATION PAGE
  // ============================================================================
  if (mode === 'signup') {
    return (
      <div className={staticContainerClass}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-28 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>

        {/* Top Static Brand Bar — Clears iOS Status Bar Blur Completely */}
        <header
          className={`relative z-10 w-full max-w-md mx-auto flex items-center justify-between shrink-0 ${
            !isPhoneView ? 'safe-top-header' : 'pt-1'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <OnitAnimatedLogo size="sm" />
            <span className="text-base font-bold tracking-tight text-white">
              Onit: Own Your Future
            </span>
          </div>

          <PWAInstallButton compact={isPhoneView} />
        </header>

        {/* STEP 2B: EMAIL VERIFICATION SCREEN */}
        {signupStep === 'verify' ? (
          <main className="relative z-10 w-full max-w-md mx-auto my-auto animate-page-enter space-y-3">
            {/* Interactive Incoming Verification Email Banner (Tap to Auto-Fill on Mobile) */}
            {showMailBanner && (
              <button
                type="button"
                onClick={() => {
                  setEnteredCode(expectedCode);
                  setFormError('');
                }}
                className="w-full text-left rounded-2xl bg-slate-900/95 border border-emerald-400/45 p-3 shadow-xl shadow-emerald-500/15 flex items-center justify-between gap-3 animate-page-enter cursor-pointer hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                    <MailCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-emerald-300 truncate">
                      Onit Verification Email · Now
                    </p>
                    <p className="text-xs text-white font-semibold truncate mt-0.5">
                      Your code is <span className="font-mono-tabular font-extrabold text-amber-300">{expectedCode}</span>
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 text-[11px] font-bold shrink-0">
                  Tap to Fill
                </span>
              </button>
            )}

            <div
              className={`rounded-3xl bg-[#0D1526] border border-white/15 shadow-2xl ${
                isPhoneView ? 'p-4' : 'p-5 sm:p-6'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Verify Your Email
                </h1>
                <span className="text-xs font-mono-tabular font-bold text-emerald-400">
                  Step 2 of 2
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We sent a 6-digit verification code to{' '}
                <strong className="text-white">{email.trim()}</strong>. Enter the code below to activate your account.
              </p>

              <form onSubmit={handleVerifyEmailSubmit} className="space-y-3.5">
                <div>
                  <label
                    htmlFor="verification-code-input"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    6-Digit Verification Code
                  </label>
                  <input
                    id="verification-code-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={enteredCode}
                    onChange={(e) => {
                      setEnteredCode(e.target.value.replace(/[^0-9]/g, ''));
                      setFormError('');
                    }}
                    placeholder="000000"
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-4 py-3 text-center font-mono-tabular text-xl font-bold tracking-[0.35em] text-white placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none select-text"
                  />
                </div>

                {resendConfirmation && (
                  <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 px-3 py-1.5 text-xs font-medium text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>A new 6-digit verification code has been sent!</span>
                  </div>
                )}

                {formError && (
                  <div
                    role="alert"
                    className="rounded-xl bg-rose-500/15 border border-rose-400/40 px-3 py-1.5 text-xs font-medium text-rose-200"
                  >
                    {formError}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Verify & Create Account</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="min-h-[40px] rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 px-3 py-2 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      <span>Resend Code</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSignupStep('form');
                        setFormError('');
                      }}
                      className="min-h-[40px] rounded-xl bg-white/8 hover:bg-white/14 border border-white/12 px-3 py-2 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Edit Details</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        ) : (
          /* STEP 2A: SIMPLE CREATE YOUR ACCOUNT / SIGN IN FORM */
          <main className="relative z-10 w-full max-w-md mx-auto my-auto animate-page-enter">
            <div
              className={`rounded-3xl bg-[#0D1526] border border-white/15 shadow-2xl ${
                isPhoneView ? 'p-4' : 'p-5 sm:p-6'
              }`}
            >
              {/* Clean Title & Sign Up / Sign In Switcher */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h1
                  className={`${
                    isPhoneView ? 'text-lg' : 'text-xl sm:text-2xl'
                  } font-bold text-white tracking-tight`}
                >
                  {authTab === 'signup' ? 'Create Your Account' : 'Sign In'}
                </h1>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/12 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab('signup');
                      setFormError('');
                    }}
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      authTab === 'signup'
                        ? 'bg-emerald-400 text-slate-950 shadow-sm'
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
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      authTab === 'login'
                        ? 'bg-cyan-400 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Sign In</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                {authTab === 'signup'
                  ? 'Enter your details below to get started.'
                  : 'Enter your email and password to continue.'}
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-2.5">
                {authTab === 'signup' && (
                  <div>
                    <label
                      htmlFor="user-name"
                      className="block text-xs font-semibold text-slate-300 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setFormError('');
                      }}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none select-text"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="user-email"
                    className="block text-xs font-semibold text-slate-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormError('');
                    }}
                    placeholder="you@email.com"
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none select-text"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-password"
                    className="block text-xs font-semibold text-slate-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="user-password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFormError('');
                    }}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none select-text"
                  />

                  {/* Live Password Requirements Checklist on Sign Up */}
                  {authTab === 'signup' && (
                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
                      <div
                        className={`flex items-center gap-1.5 ${
                          pwValidation.hasMinSevenLetters ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>Min. 7 letters ({pwValidation.letterCount}/7)</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 ${
                          pwValidation.hasCapitalLetter ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>1+ capital letter</span>
                      </div>
                    </div>
                  )}
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="rounded-xl bg-rose-500/15 border border-rose-400/40 px-3 py-1.5 text-xs font-medium text-rose-200"
                  >
                    {formError}
                  </div>
                )}

                <div className="pt-1.5 space-y-2">
                  <button
                    type="submit"
                    className="w-full min-h-[46px] rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>{authTab === 'signup' ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormError('');
                      setDemoSlideIndex(0);
                      onStartQuickDemo();
                    }}
                    className="w-full min-h-[42px] rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    <span>Quick Demo</span>
                  </button>
                </div>
              </form>
            </div>
          </main>
        )}

        {/* Empty bottom spacer to balance vertical centering cleanly on mobile */}
        <div className="h-2 shrink-0" aria-hidden="true" />
      </div>
    );
  }

  // ============================================================================
  // 3. QUICK DEMO PREVIEW (INTRO + INTERACTIVE COOL FEATURES — REQUIRES SIGNUP TO ENTER)
  // ============================================================================
  if (mode === 'demo') {
    const totalDemoSlides = 5;
    const isLastDemoSlide = demoSlideIndex === totalDemoSlides - 1;

    const simulatedFicoScore =
      demoUtilization <= 10
        ? 785
        : demoUtilization <= 29
        ? 735
        : demoUtilization <= 49
        ? 675
        : 610;
    const simulatedFicoStatus =
      demoUtilization <= 10
        ? 'Optimal (+45 pts)'
        : demoUtilization <= 29
        ? 'Good (+15 pts)'
        : demoUtilization <= 49
        ? 'Fair (-25 pts)'
        : 'High Risk (-65 pts)';

    const hysaFiveYearInterest = Math.round(demoSavingsBalance * (Math.pow(1 + 0.046, 5) - 1));
    const tradFiveYearInterest = Math.max(
      1,
      Math.round(demoSavingsBalance * (Math.pow(1 + 0.0001, 5) - 1))
    );

    return (
      <div className={staticContainerClass}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-28 left-1/3 h-64 w-64 rounded-full bg-cyan-500/12 blur-[100px]" />
          <div className="absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-emerald-500/12 blur-[100px]" />
        </div>

        {/* Top Bar with Back to Sign Up */}
        <header
          className={`relative z-10 w-full max-w-md mx-auto flex items-center justify-between shrink-0 ${
            !isPhoneView ? 'safe-top-header' : 'pt-1'
          }`}
        >
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-mono-tabular font-bold text-emerald-400">
              {demoSlideIndex + 1} / {totalDemoSlides}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-300">Quick Demo</span>
          </div>

          <button
            type="button"
            onClick={onReturnToSignup}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-emerald-300 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </header>

        {/* Main Static Demo Card */}
        <main className="relative z-10 w-full max-w-md mx-auto my-auto animate-page-enter">
          <div
            className={`rounded-3xl bg-[#0D1526] border border-white/15 shadow-2xl ${
              isPhoneView ? 'p-4' : 'p-5 sm:p-6'
            }`}
          >
            {/* Step Progress Dots */}
            <div className="grid grid-cols-5 gap-1.5 mb-3.5" aria-label="Quick demo progress">
              {Array.from({ length: totalDemoSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDemoSlideIndex(idx)}
                  aria-label={`Demo slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === demoSlideIndex
                      ? 'bg-emerald-400'
                      : idx < demoSlideIndex
                      ? 'bg-emerald-500/50'
                      : 'bg-white/12'
                  }`}
                />
              ))}
            </div>

            {/* SLIDE 0: THE INTRO */}
            {demoSlideIndex === 0 && (
              <div className="space-y-3">
                <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                  WELCOME TO ONIT
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Master Real-World Money Skills in 5 Minutes a Day
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Onit combines 10 interactive financial modules with live calculators and a credit card & high-yield bank comparison vault.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="rounded-2xl bg-slate-950/90 border border-emerald-400/30 p-3">
                    <span className="font-mono-tabular text-base sm:text-lg font-bold text-emerald-300 block">
                      10 Modules
                    </span>
                    <span className="text-[11px] text-slate-300 mt-0.5 block">
                      Credit, Taxes, College, Banking & Investing
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-950/90 border border-cyan-400/30 p-3">
                    <span className="font-mono-tabular text-base sm:text-lg font-bold text-cyan-300 block">
                      Live Tools
                    </span>
                    <span className="text-[11px] text-slate-300 mt-0.5 block">
                      FICO Lab, HYSA & Card Comparisons
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 1: COOL FEATURE #1 — LIVE CREDIT UTILIZATION & FICO SIMULATOR */}
            {demoSlideIndex === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-cyan-400">
                    FEATURE 1 · INTERACTIVE FICO LAB
                  </p>
                  <Sliders className="h-4 w-4 text-cyan-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Test Your Credit Score in Real Time
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drag the slider below to see how your credit card utilization affects your simulated FICO score:
                </p>

                <div className="rounded-2xl bg-slate-950 border border-cyan-400/30 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Card Utilization</span>
                      <span className="font-mono-tabular text-lg font-bold text-white">
                        {demoUtilization}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Simulated FICO</span>
                      <span
                        className={`font-mono-tabular text-base sm:text-lg font-bold ${
                          demoUtilization <= 10
                            ? 'text-emerald-400'
                            : demoUtilization <= 29
                            ? 'text-cyan-300'
                            : demoUtilization <= 49
                            ? 'text-amber-300'
                            : 'text-rose-400'
                        }`}
                      >
                        {simulatedFicoScore} · {simulatedFicoStatus}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={95}
                    value={demoUtilization}
                    onChange={(e) => setDemoUtilization(Number(e.target.value))}
                    aria-label="Preview Credit Utilization Percentage"
                    className="w-full accent-emerald-400 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono-tabular">
                    <span>1%–10% Best</span>
                    <span>30% Limit</span>
                    <span>90%+ Maxed</span>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: COOL FEATURE #2 — HIGH-YIELD SAVINGS (HYSA) CALCULATOR */}
            {demoSlideIndex === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                    FEATURE 2 · APY GROWTH CALCULATOR
                  </p>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Compare High-Yield vs. Traditional Banks
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Slide your savings balance to compare a 0.01% APY bank against a 4.60% APY High-Yield Savings Account over 5 years:
                </p>

                <div className="rounded-2xl bg-slate-950 border border-emerald-400/30 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Savings Balance:</span>
                    <span className="font-mono-tabular text-base sm:text-lg font-bold text-white">
                      ${demoSavingsBalance.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={1000}
                    max={25000}
                    step={500}
                    value={demoSavingsBalance}
                    onChange={(e) => setDemoSavingsBalance(Number(e.target.value))}
                    aria-label="Preview Savings Balance"
                    className="w-full accent-emerald-400 cursor-pointer"
                  />

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-2.5">
                      <span className="text-[10px] text-slate-400 block">Big Bank (0.01%)</span>
                      <span className="font-mono-tabular text-sm sm:text-base font-bold text-slate-300 mt-0.5 block">
                        +${tradFiveYearInterest} in 5 yrs
                      </span>
                    </div>
                    <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/35 p-2.5">
                      <span className="text-[10px] text-emerald-300 block">High-Yield (4.60%)</span>
                      <span className="font-mono-tabular text-sm sm:text-base font-bold text-emerald-300 mt-0.5 block">
                        +${hysaFiveYearInterest.toLocaleString()} in 5 yrs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: COOL FEATURE #3 — CARD & BANK VAULT + SIDE-BY-SIDE COMPARE */}
            {demoSlideIndex === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-violet-400">
                    FEATURE 3 · CARD & BANK VAULT
                  </p>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setDemoVaultPreviewTab('cards')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                        demoVaultPreviewTab === 'cards'
                          ? 'bg-violet-400 text-slate-950'
                          : 'text-slate-300'
                      }`}
                    >
                      Cards
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoVaultPreviewTab('banks')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                        demoVaultPreviewTab === 'banks'
                          ? 'bg-emerald-400 text-slate-950'
                          : 'text-slate-300'
                      }`}
                    >
                      Banks
                    </button>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Pin & Compare Top Accounts Side-by-Side
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  See upfront reward rates and fees before clicking, and pin your top picks to compare them head-to-head.
                </p>

                {demoVaultPreviewTab === 'cards' ? (
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-violet-400/35 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-violet-300 uppercase">
                          Capital One · Starter Pick
                        </span>
                        <h3 className="text-sm font-bold text-white">SavorOne Student Cash Rewards</h3>
                      </div>
                      <CreditCard className="h-5 w-5 text-violet-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-emerald-300 block">3%</span>
                        <span className="text-[10px] text-slate-300">Dining/Groceries</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-cyan-300 block">$0</span>
                        <span className="text-[10px] text-slate-300">Annual Fee</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-amber-300 block">$0</span>
                        <span className="text-[10px] text-slate-300">Foreign Fee</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/50 to-slate-950 border border-emerald-400/35 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-300 uppercase">
                          SoFi Checking & Savings · FDIC
                        </span>
                        <h3 className="text-sm font-bold text-white">High-Yield Digital Banking</h3>
                      </div>
                      <Building2 className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-emerald-300 block">4.50%</span>
                        <span className="text-[10px] text-slate-300">Savings APY</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-cyan-300 block">$0</span>
                        <span className="text-[10px] text-slate-300">Monthly Fee</span>
                      </div>
                      <div className="rounded-xl bg-slate-950/80 border border-white/10 p-2">
                        <span className="font-mono-tabular text-sm font-bold text-amber-300 block">2-Day</span>
                        <span className="text-[10px] text-slate-300">Early Pay</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SLIDE 4: FINAL SLIDE — SIGN UP REQUIRED TO ENTER FULL APP */}
            {demoSlideIndex === 4 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-amber-400">
                    READY TO START?
                  </p>
                  <Lock className="h-4 w-4 text-amber-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Create Your Account to Enter the App
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sign up now to unlock all 10 interactive modules, save your quiz progress, and compare cards and banks:
                </p>

                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>All 10 interactive modules & quizzes</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Full Credit Card & High-Yield Bank comparison vault</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Isolated personal XP, lessons, and pinned favorites</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Demo Navigation Controls */}
            <div className="mt-4 flex items-center justify-between gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  demoSlideIndex === 0
                    ? onReturnToSignup()
                    : setDemoSlideIndex((prev) => Math.max(0, prev - 1))
                }
                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-white/15 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{demoSlideIndex === 0 ? 'Back' : 'Previous'}</span>
              </button>

              {!isLastDemoSlide ? (
                <button
                  type="button"
                  onClick={() => setDemoSlideIndex((prev) => prev + 1)}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>Next ({demoSlideIndex + 1}/{totalDemoSlides})</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onReturnToSignup}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  <span>Create Account</span>
                </button>
              )}
            </div>
          </div>
        </main>

        <div className="h-2 shrink-0" aria-hidden="true" />
      </div>
    );
  }

  // ============================================================================
  // 4. POST-SIGNUP / REPLAYABLE INTRO TOUR (FOR AUTHENTICATED MEMBERS)
  // ============================================================================
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
    <div className={staticContainerClass}>
      <div className="relative z-10 w-full max-w-md mx-auto my-auto animate-page-enter">
        <div
          className={`rounded-3xl bg-[#0D1526] border border-white/15 shadow-2xl ${
            isPhoneView ? 'p-4 space-y-3' : 'p-5 sm:p-6'
          }`}
        >
          {/* Top bar with progress segments & skip */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="font-mono-tabular font-semibold text-white">{slide.stepNumber}</span>
              <span aria-hidden="true">·</span>
              <span>Welcome, {userProfile?.name || 'Member'}</span>
            </div>

            <button
              type="button"
              onClick={onFinishIntro}
              className="min-h-[34px] px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 mb-3" aria-label="Intro tour progress">
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
          <h2
            className={`${
              isPhoneView ? 'text-lg' : 'text-xl sm:text-2xl'
            } font-bold text-white tracking-tight mt-1`}
          >
            {slide.title}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mt-1.5">{slide.body}</p>

          {/* Highlight Metric Showcase */}
          <div
            className={`mt-3 rounded-2xl bg-gradient-to-r ${toneStyles.statBox} border p-3.5 flex items-center justify-between gap-3`}
          >
            <div>
              <span className="font-mono-tabular text-xl font-bold text-white">
                {slide.highlightStat}
              </span>
              <p className="text-xs font-medium text-slate-200 mt-0.5">{slide.highlightLabel}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              {introIndex === 0 && <Sparkles className="h-5 w-5 text-emerald-300" />}
              {introIndex === 1 && <CreditCard className="h-5 w-5 text-cyan-300" />}
              {introIndex === 2 && <Layers className="h-5 w-5 text-violet-300" />}
              {introIndex === 3 && <Shield className="h-5 w-5 text-amber-300" />}
            </div>
          </div>

          {/* Key Feature Bullets */}
          <ul className="mt-3 space-y-2">
            {slide.featureBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                <CheckCircle2
                  className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Bottom Navigation Controls */}
          <div className="mt-4 flex items-center justify-between gap-2.5 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIntroIndex((prev) => Math.max(0, prev - 1))}
              disabled={introIndex === 0}
              className="min-h-[40px] px-3.5 py-2 rounded-xl border border-white/15 text-xs font-semibold text-white disabled:opacity-40 hover:bg-white/10 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous</span>
            </button>

            {!isLastSlide ? (
              <button
                type="button"
                onClick={() => setIntroIndex((prev) => prev + 1)}
                className={`min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r ${toneStyles.button} text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer`}
              >
                <span>Next ({introIndex + 1}/4)</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinishIntro}
                className="min-h-[40px] px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Return to App</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
