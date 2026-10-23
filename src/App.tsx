import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CreditCard,
  Building2,
  Scale,
  ArrowRight,
  CheckCircle2,
  Pin,
  Play,
  Compass,
  Award,
  Smartphone,
  Monitor,
  ExternalLink,
  Settings,
  Sparkles,
} from 'lucide-react';
import {
  LEARNING_MODULES,
  BANKS_DATA,
  CREDIT_CARDS_DATA,
} from './data/finlitData';
import {
  recordAnsweredQuestion,
  togglePinnedId,
  getQuestionHistoryKey,
  type AnsweredQuestionRecord,
} from './utils/logic';
import { AuthAndIntroModal, type UserProfile } from './components/AuthAndIntroModal';
import { ModulePlayerView } from './components/ModulePlayerView';
import { VaultAndCompareView } from './components/VaultAndCompareView';
import { PhysicalCardVisual } from './components/PhysicalCardVisual';
import { SettingsModal } from './components/SettingsModal';

type MainTab = 'home' | 'modules' | 'cards' | 'banks' | 'compare';

export default function App() {
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('onit_profile_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    if (isAutostart) {
      return {
        name: 'Alex Morgan',
        email: 'alex.morgan@onitfinance.com',
        createdAt: Date.now(),
      };
    }
    return null;
  });

  // Requirement #9: Intro slides appear AFTER creating an account
  const [onboardingStage, setOnboardingStage] = useState<'none' | 'signup' | 'intro'>(() => {
    if (isAutostart) return 'none';
    try {
      const hasProfile = localStorage.getItem('onit_profile_v2');
      const hasFinishedIntro = localStorage.getItem('onit_intro_done_v2');
      if (!hasProfile) return 'signup';
      if (!hasFinishedIntro) return 'intro';
    } catch {
      return 'signup';
    }
    return 'none';
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [mobilePhoneFrameMode, setMobilePhoneFrameMode] = useState(false);

  const [activeModuleId, setActiveModuleId] = useState<string>(LEARNING_MODULES[0].id);
  const [moduleSlideIndices, setModuleSlideIndices] = useState<Record<string, number>>({
    'mod-credit-mastery': 0,
    'mod-smart-banking': 0,
    'mod-investing-campus': 0,
    'mod-budget-automation': 0,
  });

  // Requirement #5: Persistent answered questions map so going Back NEVER re-gives a solved question
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<string, AnsweredQuestionRecord>
  >(() => {
    try {
      const saved = localStorage.getItem('onit_answered_q_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('onit_completed_mods_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Requirement #8: Pinned banks and cards stay at the top before filtering AND populate Compare
  const [pinnedCardIds, setPinnedCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('onit_pinned_cards_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['card-amex-bce', 'card-capone-savor-student'];
  });

  const [pinnedBankIds, setPinnedBankIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('onit_pinned_banks_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['bank-sofi', 'bank-ally'];
  });

  // Persist key user states
  useEffect(() => {
    try {
      localStorage.setItem('onit_answered_q_v1', JSON.stringify(answeredQuestions));
    } catch {
      // ignore
    }
  }, [answeredQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('onit_pinned_cards_v1', JSON.stringify(pinnedCardIds));
      localStorage.setItem('onit_pinned_banks_v1', JSON.stringify(pinnedBankIds));
    } catch {
      // ignore
    }
  }, [pinnedCardIds, pinnedBankIds]);

  const handleUpdateProfileFromSettings = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('onit_profile_v2', JSON.stringify(updatedProfile));
    } catch {
      // ignore
    }
  };

  const handleCompleteSignup = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('onit_profile_v2', JSON.stringify(profile));
    } catch {
      // ignore
    }
    setOnboardingStage('intro');
  };

  const handleFinishIntro = () => {
    try {
      localStorage.setItem('onit_intro_done_v2', 'true');
    } catch {
      // ignore
    }
    setOnboardingStage('none');
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('onit_profile_v2');
      localStorage.removeItem('onit_intro_done_v2');
    } catch {
      // ignore
    }
    setOnboardingStage('signup');
  };

  const handleOpenModule = (moduleId: string, startSlideIndex?: number) => {
    setActiveModuleId(moduleId);
    if (typeof startSlideIndex === 'number') {
      setModuleSlideIndices((prev) => ({ ...prev, [moduleId]: startSlideIndex }));
    }
    setActiveTab('modules');
  };

  const handleSubmitQuestionAnswer = (
    moduleId: string,
    slideId: string,
    selectedOptionIds: string[]
  ) => {
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
    const slide = mod?.slides.find((s) => s.id === slideId);
    if (!slide || !slide.options) return;

    setAnsweredQuestions((prev) =>
      recordAnsweredQuestion(prev, moduleId, slideId, selectedOptionIds, slide.options!)
    );
  };

  const handleResetSingleQuestion = (moduleId: string, slideId: string) => {
    const key = getQuestionHistoryKey(moduleId, slideId);
    setAnsweredQuestions((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleCompleteModule = (moduleId: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
    setActiveTab('home');
  };

  // Calculate total XP from answered questions and completed modules
  const earnedQuestionXp = Object.values(answeredQuestions).reduce(
    (sum, rec) => sum + rec.evaluation.scoreDelta,
    0
  );
  const earnedModuleXp = completedModuleIds.reduce((sum, id) => {
    const m = LEARNING_MODULES.find((mod) => mod.id === id);
    return sum + (m ? m.xpReward : 0);
  }, 0);
  const totalXp = 350 + earnedQuestionXp + earnedModuleXp;

  const activeModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];

  const totalQuizzesCount = LEARNING_MODULES.reduce(
    (acc, mod) => acc + mod.slides.filter((s) => s.type !== 'content').length,
    0
  );
  const solvedQuizzesCount = Object.keys(answeredQuestions).length;

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 pb-20 md:pb-12 relative overflow-x-hidden">
      {/* Vibrant Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-violet-500/12 blur-[140px]" />
      </div>

      {/* Desktop-Only Floating View Switcher (Permits testing mobile preview on ANY screen, including Login & Settings) */}
      <div className="fixed top-3 right-4 z-[9999] hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-white/20 p-1.5 rounded-2xl shadow-2xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-2">
          Preview
        </span>
        <button
          type="button"
          onClick={() => setMobilePhoneFrameMode((prev) => !prev)}
          className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md"
        >
          {mobilePhoneFrameMode ? (
            <>
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>iPhone View</span>
            </>
          )}
        </button>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 px-4 sm:px-6 h-14">
          {/* App Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            Onit: Own Your Future
          </a>

          {/* Core App Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300" aria-label="Main navigation">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'home' ? 'text-emerald-400 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('modules')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'modules' ? 'text-emerald-400 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Modules
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'cards' ? 'text-emerald-400 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Credit Cards
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('banks')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'banks' ? 'text-emerald-400 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Banks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('compare')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'compare' ? 'text-emerald-400 font-semibold underline underline-offset-8' : ''
              }`}
            >
              Compare ({pinnedCardIds.length + pinnedBankIds.length})
            </button>
          </nav>

          {/* Right Controls: Settings + iPhone App View Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              aria-label="Open Account Settings"
              className="px-3 py-2 text-xs font-semibold text-slate-200 bg-white/8 hover:bg-white/15 border border-white/12 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setMobilePhoneFrameMode((prev) => !prev)}
              className="hidden md:flex px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:brightness-110 transition-all items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {mobilePhoneFrameMode ? (
                <>
                  <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Full View</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>iPhone View</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container (Supports Full Responsive Canvas OR Centered iPhone 15 Pro App Shell) */}
      <div
        className={
          mobilePhoneFrameMode
            ? 'relative z-10 mx-auto my-4 w-full max-w-[412px] h-[820px] max-h-[85vh] rounded-[46px] border-[10px] border-slate-800 bg-[#070B14] shadow-2xl shadow-emerald-500/15 overflow-hidden flex flex-col'
            : ''
        }
      >
        {mobilePhoneFrameMode && (
          <div className="shrink-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
            {/* iOS Status Bar + Dynamic Island */}
            <div className="pt-2.5 pb-1.5 px-6 flex items-center justify-between">
              <span className="font-mono-tabular text-[11px] font-bold text-slate-200">9:41</span>
              <div className="h-4 w-24 rounded-full bg-black border border-white/10" />
              <span className="font-mono-tabular text-[11px] font-semibold text-emerald-400">5G · 100%</span>
            </div>

            {/* Native Mobile Top Bar Inside iPhone View */}
            <div className="px-4 py-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="text-sm font-bold text-white tracking-tight truncate cursor-pointer"
              >
                Onit: Own Your Future
              </button>

              <div className="flex items-center gap-2 shrink-0">
                {userProfile && (
                  <span className="font-mono-tabular text-[11px] font-bold text-amber-300 bg-amber-500/12 border border-amber-400/25 px-2 py-1 rounded-lg">
                    {totalXp} XP
                  </span>
                )}
                {userProfile && (
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(true)}
                    aria-label="Open Settings in iPhone View"
                    className="min-h-[34px] min-w-[34px] rounded-xl bg-white/8 hover:bg-white/15 border border-white/12 flex items-center justify-center text-emerald-400 cursor-pointer"
                  >
                    <Settings className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* In-Frame Auth / Intro Slides when iPhone View is active */}
        {onboardingStage !== 'none' && mobilePhoneFrameMode ? (
          <div className="flex-1 overflow-y-auto w-full flex flex-col justify-center">
            <AuthAndIntroModal
              mode={onboardingStage}
              userProfile={userProfile}
              onCompleteSignup={handleCompleteSignup}
              onFinishIntro={handleFinishIntro}
              isPhoneView={true}
            />
          </div>
        ) : (
          <main
            className={`relative z-10 mx-auto w-full ${
              mobilePhoneFrameMode
                ? 'flex-1 overflow-y-auto max-w-full px-3.5 pt-3.5 pb-6 space-y-5'
                : 'max-w-7xl px-4 sm:px-6 pt-5 sm:pt-6 pb-8 space-y-6 sm:space-y-8'
            }`}
          >
          {/* =========================================================
              HOME VIEW
             ========================================================= */}
          {activeTab === 'home' && (
            <div className={mobilePhoneFrameMode ? 'space-y-5' : 'space-y-6 sm:space-y-8'}>
              {/* Hero Welcome & Progress Banner */}
              <section className="glass-panel-elevated rounded-3xl p-4 sm:p-8 border border-white/15 bg-gradient-to-br from-emerald-950/50 via-slate-900/90 to-cyan-950/50">
                <div
                  className={`grid grid-cols-1 ${
                    mobilePhoneFrameMode ? '' : 'lg:grid-cols-12'
                  } gap-5 sm:gap-6 items-center`}
                >
                  <div className={mobilePhoneFrameMode ? 'space-y-3.5' : 'lg:col-span-7 space-y-4'}>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-300 font-semibold">
                      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{userProfile ? `Welcome back, ${userProfile.name}` : 'Onit: Own Your Future'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular font-bold text-amber-300">{totalXp} XP Earned</span>
                    </div>

                    <h1
                      className={`${
                        mobilePhoneFrameMode
                          ? 'text-2xl'
                          : 'text-2xl sm:text-4xl lg:text-5xl'
                      } font-bold text-white tracking-tight leading-[1.12]`}
                    >
                      Own Your Financial Future.
                    </h1>

                    <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                      Master credit scores, high-yield banking, investing, and automated budgeting through interactive modules—then search, pin, and compare top credit cards and banks side-by-side.
                    </p>

                    <div
                      className={
                        mobilePhoneFrameMode
                          ? 'space-y-2 pt-1'
                          : 'flex flex-wrap items-center gap-2.5 pt-1'
                      }
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenModule('mod-credit-mastery')}
                        className={`${
                          mobilePhoneFrameMode ? 'w-full justify-center' : ''
                        } min-h-[46px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer`}
                      >
                        <Play className="h-4 w-4 fill-current shrink-0" aria-hidden="true" />
                        <span>Continue Learning</span>
                      </button>

                      <div
                        className={
                          mobilePhoneFrameMode
                            ? 'grid grid-cols-2 gap-2'
                            : 'flex flex-wrap items-center gap-2.5'
                        }
                      >
                        <button
                          type="button"
                          onClick={() => setActiveTab('cards')}
                          className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-semibold text-white transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Explore Cards
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab('banks')}
                          className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-semibold text-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Search Banks
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Progress & Pinned Summary Card */}
                  <div
                    className={`${
                      mobilePhoneFrameMode ? '' : 'lg:col-span-5'
                    } rounded-2xl bg-slate-950/85 border border-white/12 p-4 sm:p-5 space-y-3.5`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div>
                        <p className="text-[11px] sm:text-xs text-slate-400">Your Onit Progress</p>
                        <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                          Interactive Modules & Pinned Vault
                        </p>
                      </div>
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400 shrink-0" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/25 p-2.5">
                        <span className="font-mono-tabular text-lg sm:text-xl font-bold text-emerald-300 block">
                          {solvedQuizzesCount}/{totalQuizzesCount}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-300">Quizzes</span>
                      </div>
                      <div className="rounded-xl bg-cyan-500/10 border border-cyan-400/25 p-2.5">
                        <span className="font-mono-tabular text-lg sm:text-xl font-bold text-cyan-300 block">
                          {pinnedCardIds.length}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-300">Pinned Cards</span>
                      </div>
                      <div className="rounded-xl bg-amber-500/10 border border-amber-400/25 p-2.5">
                        <span className="font-mono-tabular text-lg sm:text-xl font-bold text-amber-300 block">
                          {pinnedBankIds.length}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-300">Pinned Banks</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setOnboardingStage('intro')}
                        className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 underline cursor-pointer"
                      >
                        Replay Intro Slides
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('compare')}
                        className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Compare Pinned ({pinnedCardIds.length + pinnedBankIds.length})</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Learning Modules Grid */}
              <section className="space-y-3.5 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Interactive Financial Literacy Curriculum
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Learning Modules
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Step-by-step interactive lessons, live calculators, and knowledge checks.
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    mobilePhoneFrameMode ? '' : 'md:grid-cols-2'
                  } gap-5 sm:gap-6`}
                >
                  {LEARNING_MODULES.map((mod) => {
                    const currentSlideIdx = moduleSlideIndices[mod.id] || 0;
                    const solvedInModule = mod.slides.filter(
                      (s) =>
                        s.type !== 'content' &&
                        Boolean(answeredQuestions[getQuestionHistoryKey(mod.id, s.id)])
                    ).length;
                    const totalQuizzesInModule = mod.slides.filter(
                      (s) => s.type !== 'content'
                    ).length;
                    const isCompleted =
                      completedModuleIds.includes(mod.id) ||
                      (totalQuizzesInModule > 0 && solvedInModule === totalQuizzesInModule);

                    const accentStyles = {
                      emerald: {
                        border: 'hover:border-emerald-400/60',
                        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
                        pill: 'bg-emerald-500/12 text-emerald-200 border-emerald-400/25',
                      },
                      cyan: {
                        border: 'hover:border-cyan-400/60',
                        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
                        pill: 'bg-cyan-500/12 text-cyan-200 border-cyan-400/25',
                      },
                      violet: {
                        border: 'hover:border-violet-400/60',
                        badge: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
                        pill: 'bg-violet-500/12 text-violet-200 border-violet-400/25',
                      },
                      amber: {
                        border: 'hover:border-amber-400/60',
                        badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
                        pill: 'bg-amber-500/12 text-amber-200 border-amber-400/25',
                      },
                    }[mod.accentColor];

                    return (
                      <article
                        key={mod.id}
                        className={`glass-panel-elevated group rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br ${mod.gradientClass} transition-all duration-300 flex flex-col justify-between ${accentStyles.border}`}
                      >
                        <div>
                          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
                            <img
                              src={mod.heroImage}
                              alt={mod.title}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-black/40 to-transparent" />
                            <div className="absolute top-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
                              <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-md truncate ${accentStyles.badge}`}>
                                {mod.numberLabel} · {mod.category}
                              </span>
                              <span className="px-2.5 py-1 rounded-xl bg-slate-950/85 border border-white/15 font-mono-tabular text-[11px] font-bold text-amber-300 shrink-0">
                                +{mod.xpReward} XP
                              </span>
                            </div>
                          </div>

                          <div className="p-4 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                                {mod.title}
                              </h3>
                              {isCompleted && (
                                <CheckCircle2
                                  className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5"
                                  aria-label="Module Completed"
                                />
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
                              {mod.summary}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-3.5">
                              {mod.keySkills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${accentStyles.pill}`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                          <div className="text-[11px] sm:text-xs text-slate-300 font-mono-tabular">
                            <span>
                              {mod.slides.length} Slides · {solvedInModule}/{totalQuizzesInModule} Quizzes
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleOpenModule(mod.id, 0)}
                            className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>
                              {currentSlideIdx > 0 ? 'Resume' : 'Start Module'}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* Featured Credit Cards & High-Yield Banks Preview */}
              <section className="space-y-3.5 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Top Picks & Rewards
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Featured Credit Cards & High-Yield Banks
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('cards')}
                      className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>All {CREDIT_CARDS_DATA.length} Cards</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('banks')}
                      className="text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Search {BANKS_DATA.length} Banks</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    mobilePhoneFrameMode ? '' : 'lg:grid-cols-3'
                  } gap-5 sm:gap-6`}
                >
                  {CREDIT_CARDS_DATA.slice(0, 3).map((card) => {
                    const isPinned = pinnedCardIds.includes(card.id);
                    return (
                      <div
                        key={card.id}
                        className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/12 flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-300 font-semibold">{card.issuer}</span>
                            <button
                              type="button"
                              onClick={() => setPinnedCardIds((prev) => togglePinnedId(prev, card.id))}
                              className={`min-h-[34px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer ${
                                isPinned
                                  ? 'bg-amber-400 text-slate-950'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              <Pin className="h-3 w-3" />
                              <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                            </button>
                          </div>

                          <PhysicalCardVisual card={card} compact />

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {card.upfrontBenefits.slice(0, 4).map((b, i) => (
                              <div
                                key={i}
                                className="rounded-xl bg-slate-950/85 border border-white/10 px-2.5 py-2"
                              >
                                <span className="font-mono-tabular text-base font-bold text-emerald-300 block">
                                  {b.rate}
                                </span>
                                <span className="text-[11px] text-slate-300 block truncate">
                                  {b.category}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed pt-1">
                            <strong className="text-cyan-300">Best For: </strong>
                            {card.bestForWho}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => setActiveTab('cards')}
                            className="min-h-[42px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                          >
                            View All Cards
                          </button>

                          <a
                            href={card.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[42px] px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 hover:brightness-110 transition-all whitespace-nowrap cursor-pointer"
                          >
                            <span>Apply on Bank Website</span>
                            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* =========================================================
              INTERACTIVE MODULE PLAYER VIEW
             ========================================================= */}
          {activeTab === 'modules' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {LEARNING_MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleOpenModule(mod.id)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      activeModule.id === mod.id
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'bg-white/8 text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    {mod.numberLabel}: {mod.title}
                  </button>
                ))}
              </div>

              <ModulePlayerView
                module={activeModule}
                slideIndex={moduleSlideIndices[activeModule.id] || 0}
                onChangeSlideIndex={(newIdx) =>
                  setModuleSlideIndices((prev) => ({
                    ...prev,
                    [activeModule.id]: newIdx,
                  }))
                }
                answeredQuestions={answeredQuestions}
                onSubmitAnswer={handleSubmitQuestionAnswer}
                onResetSingleQuestion={handleResetSingleQuestion}
                onBackToDashboard={() => setActiveTab('home')}
                onCompleteModule={handleCompleteModule}
                isPhoneView={mobilePhoneFrameMode}
              />
            </div>
          )}

          {/* =========================================================
              CREDIT CARDS, BANKS & COMPARE VIEWS
             ========================================================= */}
          {(activeTab === 'cards' || activeTab === 'banks' || activeTab === 'compare') && (
            <VaultAndCompareView
              activeSubTab={activeTab}
              onChangeSubTab={(sub) => setActiveTab(sub)}
              pinnedBankIds={pinnedBankIds}
              pinnedCardIds={pinnedCardIds}
              onTogglePinBank={(bankId) =>
                setPinnedBankIds((prev) => togglePinnedId(prev, bankId))
              }
              onTogglePinCard={(cardId) =>
                setPinnedCardIds((prev) => togglePinnedId(prev, cardId))
              }
              isPhoneView={mobilePhoneFrameMode}
            />
          )}
        </main>
        )}

        {/* In-Frame Settings Modal when iPhone View is active */}
        {showSettingsModal && mobilePhoneFrameMode && (
          <SettingsModal
            userProfile={userProfile}
            solvedQuizzesCount={solvedQuizzesCount}
            pinnedCardsCount={pinnedCardIds.length}
            pinnedBanksCount={pinnedBankIds.length}
            onUpdateProfile={handleUpdateProfileFromSettings}
            onReplayIntro={() => setOnboardingStage('intro')}
            onResetQuizzes={() => setAnsweredQuestions({})}
            onResetPins={() => {
              setPinnedCardIds(['card-amex-bce', 'card-capone-savor-student']);
              setPinnedBankIds(['bank-sofi', 'bank-ally']);
            }}
            onSignOut={handleSignOut}
            onClose={() => setShowSettingsModal(false)}
            isPhoneView={true}
          />
        )}

        {/* Mobile Bottom Navigation Bar — Anchored inside iPhone Shell or Fixed on Mobile Devices */}
        {onboardingStage === 'none' && (
          <nav
            aria-label="Mobile bottom navigation"
            className={`${
              mobilePhoneFrameMode
                ? 'shrink-0 z-40 w-full bg-slate-950/95 backdrop-blur-xl border-t border-white/12 pt-1 pb-2 px-1'
                : 'md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/12 py-1 px-1'
            }`}
          >
            <div className="grid grid-cols-5 items-center h-13">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center justify-center min-h-[44px] text-[10px] font-medium cursor-pointer ${
                  activeTab === 'home' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span className="mt-0.5">Home</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('modules')}
                className={`flex flex-col items-center justify-center min-h-[44px] text-[10px] font-medium cursor-pointer ${
                  activeTab === 'modules' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span className="mt-0.5">Modules</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`flex flex-col items-center justify-center min-h-[44px] text-[10px] font-medium cursor-pointer ${
                  activeTab === 'cards' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                <span className="mt-0.5">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('banks')}
                className={`flex flex-col items-center justify-center min-h-[44px] text-[10px] font-medium cursor-pointer ${
                  activeTab === 'banks' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span className="mt-0.5">Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('compare')}
                className={`flex flex-col items-center justify-center min-h-[44px] text-[10px] font-medium cursor-pointer ${
                  activeTab === 'compare' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Scale className="h-4 w-4" aria-hidden="true" />
                <span className="mt-0.5">Compare</span>
              </button>
            </div>

            {mobilePhoneFrameMode && (
              <div className="w-32 h-1 bg-white/25 rounded-full mx-auto mt-1" />
            )}
          </nav>
        )}
      </div>

      {/* Account & App Settings Modal (when in standard full desktop or mobile viewport) */}
      {showSettingsModal && !mobilePhoneFrameMode && (
        <SettingsModal
          userProfile={userProfile}
          solvedQuizzesCount={solvedQuizzesCount}
          pinnedCardsCount={pinnedCardIds.length}
          pinnedBanksCount={pinnedBankIds.length}
          onUpdateProfile={handleUpdateProfileFromSettings}
          onReplayIntro={() => setOnboardingStage('intro')}
          onResetQuizzes={() => setAnsweredQuestions({})}
          onResetPins={() => {
            setPinnedCardIds(['card-amex-bce', 'card-capone-savor-student']);
            setPinnedBankIds(['bank-sofi', 'bank-ally']);
          }}
          onSignOut={handleSignOut}
          onClose={() => setShowSettingsModal(false)}
          isPhoneView={false}
        />
      )}

      {/* Post-Account-Creation Onboarding & Intro Slides Modal (when in standard full desktop or mobile viewport) */}
      {onboardingStage !== 'none' && !mobilePhoneFrameMode && (
        <AuthAndIntroModal
          mode={onboardingStage}
          userProfile={userProfile}
          onCompleteSignup={handleCompleteSignup}
          onFinishIntro={handleFinishIntro}
          isPhoneView={false}
        />
      )}
    </div>
  );
}
