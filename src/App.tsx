import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  CreditCard,
  Building2,
  Scale,
  ArrowRight,
  CheckCircle2,
  Compass,
  Award,
  Smartphone,
  Monitor,
  Settings,
  Search,
  X,
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
  getAccountProgressStorageKey,
  createFreshAccountProgress,
  filterModulesByKeyword,
  type AnsweredQuestionRecord,
  type PerAccountProgressData,
} from './utils/logic';
import {
  AuthAndIntroModal,
  type UserProfile,
  type OnboardingStage,
} from './components/AuthAndIntroModal';
import { HomeHubView } from './components/HomeHubView';
import { ModulePlayerView } from './components/ModulePlayerView';
import { VaultAndCompareView } from './components/VaultAndCompareView';
import { SettingsModal } from './components/SettingsModal';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';

type MainTab = 'home' | 'modules' | 'cards' | 'banks' | 'compare';

const ALL_MODULE_IDS = LEARNING_MODULES.map((m) => m.id);
const FIRST_SLIDE_BY_MODULE: Record<string, string> = Object.fromEntries(
  LEARNING_MODULES.map((m) => [m.id, m.slides[0]?.id || ''])
);

function loadAccountProgress(email: string | undefined | null): PerAccountProgressData {
  const fallback = createFreshAccountProgress(ALL_MODULE_IDS, FIRST_SLIDE_BY_MODULE);
  if (!email) return fallback;
  try {
    const raw = localStorage.getItem(getAccountProgressStorageKey(email));
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PerAccountProgressData>;
    return {
      answeredQuestions: parsed.answeredQuestions || {},
      completedModuleIds: Array.isArray(parsed.completedModuleIds) ? parsed.completedModuleIds : [],
      pinnedCardIds: Array.isArray(parsed.pinnedCardIds) ? parsed.pinnedCardIds : [],
      pinnedBankIds: Array.isArray(parsed.pinnedBankIds) ? parsed.pinnedBankIds : [],
      moduleSlideIndices: {
        ...fallback.moduleSlideIndices,
        ...(parsed.moduleSlideIndices || {}),
      },
      viewedSlideIds: {
        ...fallback.viewedSlideIds,
        ...(parsed.viewedSlideIds || {}),
      },
      hasStartedLearning: Boolean(parsed.hasStartedLearning),
    };
  } catch {
    return fallback;
  }
}

export default function App() {
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('onit_profile_v5');
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

  // Always start with the animated logo splash screen on app launch (unless autostart=1)
  const [onboardingStage, setOnboardingStage] = useState<OnboardingStage>(() => {
    if (isAutostart) return 'none';
    return 'splash';
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [modulesScreenMode, setModulesScreenMode] = useState<'list' | 'module'>('list');
  const [moduleSearchQuery, setModuleSearchQuery] = useState('');
  const [mobilePhoneFrameMode, setMobilePhoneFrameMode] = useState(false);
  const [isStandalonePWA, setIsStandalonePWA] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkStandalone = () => {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsStandalonePWA(standalone);
    };
    checkStandalone();
    const mq = window.matchMedia('(display-mode: standalone)');
    mq.addEventListener?.('change', checkStandalone);
    return () => mq.removeEventListener?.('change', checkStandalone);
  }, []);

  // Lock mobile screen from iOS pinch-to-zoom shifting or horizontal drift
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const preventPinchGesture = (e: Event) => {
      e.preventDefault();
    };
    const preventMultiTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    const resetHorizontalShift = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    };

    document.addEventListener('gesturestart', preventPinchGesture, { passive: false });
    document.addEventListener('gesturechange', preventPinchGesture, { passive: false });
    document.addEventListener('gestureend', preventPinchGesture, { passive: false });
    document.addEventListener('touchmove', preventMultiTouchZoom, { passive: false });
    window.addEventListener('scroll', resetHorizontalShift, { passive: true });

    return () => {
      document.removeEventListener('gesturestart', preventPinchGesture);
      document.removeEventListener('gesturechange', preventPinchGesture);
      document.removeEventListener('gestureend', preventPinchGesture);
      document.removeEventListener('touchmove', preventMultiTouchZoom);
      window.removeEventListener('scroll', resetHorizontalShift);
    };
  }, []);

  const mainContainerRef = useRef<HTMLElement | null>(null);

  const [activeModuleId, setActiveModuleId] = useState<string>(LEARNING_MODULES[0].id);

  // Per-account isolated progress states (New users start at 0 XP, 0 quizzes, 0 pinned cards, 0 pinned banks)
  const [moduleSlideIndices, setModuleSlideIndices] = useState<Record<string, number>>(
    () => loadAccountProgress(userProfile?.email).moduleSlideIndices
  );

  const [viewedSlideIds, setViewedSlideIds] = useState<Record<string, string[]>>(
    () => loadAccountProgress(userProfile?.email).viewedSlideIds
  );

  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<string, AnsweredQuestionRecord>
  >(() => loadAccountProgress(userProfile?.email).answeredQuestions);

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(
    () => loadAccountProgress(userProfile?.email).completedModuleIds
  );

  const [pinnedCardIds, setPinnedCardIds] = useState<string[]>(
    () => loadAccountProgress(userProfile?.email).pinnedCardIds
  );

  const [pinnedBankIds, setPinnedBankIds] = useState<string[]>(
    () => loadAccountProgress(userProfile?.email).pinnedBankIds
  );

  const [hasStartedLearning, setHasStartedLearning] = useState<boolean>(
    () => loadAccountProgress(userProfile?.email).hasStartedLearning
  );

  // Ensure current slide in activeModuleId is recorded as viewed whenever inside a module
  useEffect(() => {
    const mod = LEARNING_MODULES.find((m) => m.id === activeModuleId);
    if (!mod) return;
    const currentIdx = moduleSlideIndices[activeModuleId] || 0;
    const currentSlide = mod.slides[currentIdx] || mod.slides[0];
    if (!currentSlide) return;

    setViewedSlideIds((prev) => {
      const existing = prev[activeModuleId] || [];
      if (existing.includes(currentSlide.id)) return prev;
      return {
        ...prev,
        [activeModuleId]: [...existing, currentSlide.id],
      };
    });
  }, [activeModuleId, moduleSlideIndices]);

  // Scroll to top whenever activeTab, activeModuleId, modulesScreenMode, or current slide index changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [activeTab, activeModuleId, modulesScreenMode, moduleSlideIndices, mobilePhoneFrameMode]);

  // Persist isolated progress strictly under the active user's account email
  useEffect(() => {
    if (!userProfile?.email) return;
    try {
      const accountData: PerAccountProgressData = {
        answeredQuestions,
        completedModuleIds,
        pinnedCardIds,
        pinnedBankIds,
        moduleSlideIndices,
        viewedSlideIds,
        hasStartedLearning,
      };
      localStorage.setItem(
        getAccountProgressStorageKey(userProfile.email),
        JSON.stringify(accountData)
      );
    } catch {
      // ignore storage errors
    }
  }, [
    userProfile?.email,
    answeredQuestions,
    completedModuleIds,
    pinnedCardIds,
    pinnedBankIds,
    moduleSlideIndices,
    viewedSlideIds,
    hasStartedLearning,
  ]);

  const applyAccountProgressToState = (progress: PerAccountProgressData) => {
    setAnsweredQuestions(progress.answeredQuestions);
    setCompletedModuleIds(progress.completedModuleIds);
    setPinnedCardIds(progress.pinnedCardIds);
    setPinnedBankIds(progress.pinnedBankIds);
    setModuleSlideIndices(progress.moduleSlideIndices);
    setViewedSlideIds(progress.viewedSlideIds);
    setHasStartedLearning(progress.hasStartedLearning);
  };

  const handleUpdateProfileFromSettings = (updatedProfile: UserProfile) => {
    const previousEmail = userProfile?.email;
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('onit_profile_v5', JSON.stringify(updatedProfile));
      if (previousEmail && previousEmail.toLowerCase() !== updatedProfile.email.toLowerCase()) {
        const currentProgress: PerAccountProgressData = {
          answeredQuestions,
          completedModuleIds,
          pinnedCardIds,
          pinnedBankIds,
          moduleSlideIndices,
          viewedSlideIds,
          hasStartedLearning,
        };
        localStorage.setItem(
          getAccountProgressStorageKey(updatedProfile.email),
          JSON.stringify(currentProgress)
        );
      }
    } catch {
      // ignore
    }
  };

  const handleFinishSplash = () => {
    setOnboardingStage((prev) => {
      if (prev !== 'splash') return prev;
      return userProfile ? 'none' : 'signup';
    });
  };

  const handleCompleteSignup = (profile: UserProfile, isNewSignup: boolean) => {
    let targetProgress: PerAccountProgressData;
    if (isNewSignup) {
      targetProgress = createFreshAccountProgress(ALL_MODULE_IDS, FIRST_SLIDE_BY_MODULE);
      try {
        localStorage.setItem(
          getAccountProgressStorageKey(profile.email),
          JSON.stringify(targetProgress)
        );
      } catch {
        // ignore
      }
    } else {
      targetProgress = loadAccountProgress(profile.email);
    }

    applyAccountProgressToState(targetProgress);
    setUserProfile(profile);
    setActiveTab('home');
    setModulesScreenMode('list');
    setActiveModuleId(LEARNING_MODULES[0].id);

    try {
      localStorage.setItem('onit_profile_v5', JSON.stringify(profile));
      localStorage.setItem('onit_intro_done_v5', 'true');
    } catch {
      // ignore
    }
    setOnboardingStage('none');
  };

  const handleStartQuickDemo = () => {
    setOnboardingStage('demo');
  };

  const handleReturnToSignup = () => {
    setOnboardingStage('signup');
  };

  const handleFinishIntro = () => {
    try {
      localStorage.setItem('onit_intro_done_v5', 'true');
    } catch {
      // ignore
    }
    setOnboardingStage(userProfile ? 'none' : 'signup');
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('onit_profile_v5');
      localStorage.removeItem('onit_intro_done_v5');
    } catch {
      // ignore
    }
    setUserProfile(null);
    applyAccountProgressToState(createFreshAccountProgress(ALL_MODULE_IDS, FIRST_SLIDE_BY_MODULE));
    setActiveTab('home');
    setModulesScreenMode('list');
    setOnboardingStage('signup');
  };

  const handleOpenModule = (moduleId: string, startSlideIndex?: number) => {
    setHasStartedLearning(true);
    setActiveModuleId(moduleId);
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
    const targetIdx =
      typeof startSlideIndex === 'number'
        ? startSlideIndex
        : moduleSlideIndices[moduleId] || 0;
    const targetSlideId = mod?.slides[targetIdx]?.id;

    if (typeof startSlideIndex === 'number') {
      setModuleSlideIndices((prev) => ({ ...prev, [moduleId]: startSlideIndex }));
    }
    if (targetSlideId) {
      setViewedSlideIds((prev) => {
        const cur = prev[moduleId] || [];
        return cur.includes(targetSlideId)
          ? prev
          : { ...prev, [moduleId]: [...cur, targetSlideId] };
      });
    }
    setModulesScreenMode('module');
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

    setHasStartedLearning(true);
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
    setHasStartedLearning(true);
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
    setModulesScreenMode('list');
    setActiveTab('modules');
  };

  const handleResetXpAndSolvedQuestions = () => {
    const fresh = createFreshAccountProgress(ALL_MODULE_IDS, FIRST_SLIDE_BY_MODULE);
    setAnsweredQuestions({});
    setCompletedModuleIds([]);
    setModuleSlideIndices(fresh.moduleSlideIndices);
    setViewedSlideIds(fresh.viewedSlideIds);
    setHasStartedLearning(false);
    setActiveModuleId(LEARNING_MODULES[0].id);
    setModulesScreenMode('list');

    if (userProfile?.email) {
      try {
        const updatedAccountData: PerAccountProgressData = {
          answeredQuestions: {},
          completedModuleIds: [],
          pinnedCardIds,
          pinnedBankIds,
          moduleSlideIndices: fresh.moduleSlideIndices,
          viewedSlideIds: fresh.viewedSlideIds,
          hasStartedLearning: false,
        };
        localStorage.setItem(
          getAccountProgressStorageKey(userProfile.email),
          JSON.stringify(updatedAccountData)
        );
      } catch {
        // ignore storage errors
      }
    }
  };

  // Calculate total XP strictly from the set xpReward of completed modules (no individual quiz XP)
  const uniqueCompletedModuleIds = Array.from(new Set(completedModuleIds));
  const totalXp = uniqueCompletedModuleIds.reduce((sum, id) => {
    const m = LEARNING_MODULES.find((mod) => mod.id === id);
    return sum + (m ? m.xpReward : 0);
  }, 0);
  const maxPossibleXp = LEARNING_MODULES.reduce((sum, mod) => sum + mod.xpReward, 0);
  const totalModulesCount = LEARNING_MODULES.length;
  const completedModulesCount = uniqueCompletedModuleIds.length;
  const overallProgressPercent =
    totalModulesCount > 0
      ? Math.round((completedModulesCount / totalModulesCount) * 100)
      : 0;

  const activeModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];

  const totalQuizzesCount = LEARNING_MODULES.reduce(
    (acc, mod) => acc + mod.slides.filter((s) => s.type !== 'content').length,
    0
  );
  const solvedQuizzesCount = Object.keys(answeredQuestions).length;

  const hasUserStartedProgress =
    hasStartedLearning ||
    totalXp > 0 ||
    solvedQuizzesCount > 0 ||
    completedModuleIds.length > 0 ||
    Object.values(moduleSlideIndices).some((idx) => idx > 0);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 pb-28 md:pb-12 relative overflow-x-clip">
      {/* Vibrant Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-violet-500/12 blur-[140px]" />
      </div>

      {/* Desktop-Only Floating View Switcher */}
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
      {(onboardingStage === 'none' || mobilePhoneFrameMode) && (
        <header
          className={`sticky top-0 z-30 bg-[#070B14] md:bg-slate-950/90 md:backdrop-blur-xl border-b border-white/10 safe-top-header ${
            isStandalonePWA ? 'safe-top-standalone-fallback' : ''
          }`}
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-[22px] sm:px-7 min-h-[58px]">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                if (onboardingStage === 'none') setActiveTab('home');
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            >
              Onit: Own Your Future
            </a>

            {onboardingStage === 'none' && (
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
                  onClick={() => {
                    setModulesScreenMode('list');
                    setActiveTab('modules');
                  }}
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
            )}

            <div className="flex items-center gap-2 shrink-0">
              <PWAInstallButton />

              {onboardingStage === 'none' && (
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  aria-label="Open Account Settings"
                  className="min-h-[40px] min-w-[40px] px-3 py-2 text-xs font-semibold text-slate-200 bg-white/8 hover:bg-white/15 border border-white/12 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              )}

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
      )}

      {/* Main Content Container */}
      {(onboardingStage === 'none' || mobilePhoneFrameMode) && (
        <div
          className={
            mobilePhoneFrameMode
              ? 'relative z-10 mx-auto my-4 w-full max-w-[412px] h-[820px] max-h-[85vh] rounded-[46px] border-[10px] border-slate-800 bg-[#070B14] shadow-2xl shadow-emerald-500/15 overflow-hidden flex flex-col'
              : ''
          }
        >
          {mobilePhoneFrameMode && (
            <div className="shrink-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
              <div className="pt-2.5 pb-1.5 px-6 flex items-center justify-between">
                <span className="font-mono-tabular text-[11px] font-bold text-slate-200">9:41</span>
                <div className="h-4 w-24 rounded-full bg-black border border-white/10" />
                <span className="font-mono-tabular text-[11px] font-semibold text-emerald-400">5G · 100%</span>
              </div>

              {onboardingStage === 'none' && (
                <div className="px-4 py-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('home')}
                    className="text-sm font-bold text-white tracking-tight truncate cursor-pointer"
                  >
                    Onit: Own Your Future
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <PWAInstallButton compact />
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
              )}
            </div>
          )}

          {onboardingStage !== 'none' && mobilePhoneFrameMode ? (
            <div className="flex-1 overflow-hidden w-full flex flex-col justify-center">
              <AuthAndIntroModal
                mode={onboardingStage}
                userProfile={userProfile}
                onFinishSplash={handleFinishSplash}
                onCompleteSignup={handleCompleteSignup}
                onStartQuickDemo={handleStartQuickDemo}
                onReturnToSignup={handleReturnToSignup}
                onFinishIntro={handleFinishIntro}
                isPhoneView={true}
              />
            </div>
          ) : (
            <main
              ref={mainContainerRef}
              className={`relative mx-auto w-full ${
                mobilePhoneFrameMode
                  ? 'flex-1 overflow-y-auto max-w-full px-5 pt-4 pb-6 space-y-5'
                  : 'max-w-7xl px-[22px] sm:px-7 pt-5 sm:pt-6 pb-8 space-y-6 sm:space-y-8'
              }`}
            >
              {/* =========================================================
                  HOME VIEW (Interactive Calculators Playground + Bank & Card Recommendation Survey)
                 ========================================================= */}
              {activeTab === 'home' && (
                <HomeHubView
                  userName={userProfile?.name}
                  hasUserStartedProgress={hasUserStartedProgress}
                  totalXp={totalXp}
                  maxPossibleXp={maxPossibleXp}
                  completedModulesCount={completedModulesCount}
                  totalModulesCount={totalModulesCount}
                  overallProgressPercent={overallProgressPercent}
                  activeModuleTitle={activeModule.title}
                  activeModuleNumberLabel={activeModule.numberLabel}
                  pinnedBankIds={pinnedBankIds}
                  pinnedCardIds={pinnedCardIds}
                  onTogglePinBank={(bankId) =>
                    setPinnedBankIds((prev) => togglePinnedId(prev, bankId))
                  }
                  onTogglePinCard={(cardId) =>
                    setPinnedCardIds((prev) => togglePinnedId(prev, cardId))
                  }
                  onResumeLearning={() => handleOpenModule(activeModuleId)}
                  onOpenModulesTab={() => {
                    setModulesScreenMode('list');
                    setActiveTab('modules');
                  }}
                  onOpenBanksTab={() => setActiveTab('banks')}
                  onOpenCardsTab={() => setActiveTab('cards')}
                  onOpenCompareTab={() => setActiveTab('compare')}
                  isPhoneView={mobilePhoneFrameMode}
                />
              )}

              {/* =========================================================
                  MODULES VIEW (3-Level Navigation: Single-Column Module List -> Lesson List -> 1-Line Slide Player)
                 ========================================================= */}
              {activeTab === 'modules' && (
                <div className="space-y-4">
                  {/* Top Curriculum Progress Bar */}
                  <div className="rounded-2xl bg-slate-950/85 border border-white/12 px-3.5 py-2.5 sm:px-4 sm:py-3 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                        <span>
                          Curriculum Progress: {completedModulesCount}/{totalModulesCount} Modules
                        </span>
                      </span>
                      <span className="font-mono-tabular font-bold text-emerald-300 shrink-0">
                        {totalXp}/{maxPossibleXp} XP · {overallProgressPercent}%
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={overallProgressPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Modules tab curriculum progress"
                      className="h-2 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px]"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.45)] transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.max(
                            overallProgressPercent,
                            overallProgressPercent > 0 ? 4 : 0
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {modulesScreenMode === 'list' ? (
                    /* LEVEL 1: SINGLE-COLUMN MODULE LIST (No explanation until clicked) */
                    <div className="space-y-3.5">
                      <div className="relative">
                        <Search
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400"
                          aria-hidden="true"
                        />
                        <input
                          type="search"
                          value={moduleSearchQuery}
                          onChange={(e) => setModuleSearchQuery(e.target.value)}
                          placeholder="Search modules or lessons by keyword (e.g., credit, FAFSA, taxes, HYSA)..."
                          aria-label="Search modules by keyword"
                          className="w-full rounded-2xl bg-slate-950/90 border border-white/15 pl-10 pr-24 py-3 text-base sm:text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                        />
                        {moduleSearchQuery.trim() && (
                          <button
                            type="button"
                            onClick={() => setModuleSearchQuery('')}
                            aria-label="Clear module search"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Clear</span>
                          </button>
                        )}
                      </div>

                      {(() => {
                        const matchingModules = filterModulesByKeyword(
                          LEARNING_MODULES,
                          moduleSearchQuery
                        );

                        if (matchingModules.length === 0) {
                          return (
                            <div className="glass-panel rounded-3xl p-6 text-center space-y-2 border border-white/12">
                              <p className="text-sm font-bold text-white">
                                No modules found matching &ldquo;{moduleSearchQuery}&rdquo;
                              </p>
                              <button
                                type="button"
                                onClick={() => setModuleSearchQuery('')}
                                className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                              >
                                Show All 10 Modules
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-1 gap-3">
                            {matchingModules.map((mod) => {
                              const isCompleted = completedModuleIds.includes(mod.id);
                              const viewedInMod = (viewedSlideIds[mod.id] || []).length;
                              const hasProgressInMod = viewedInMod > 1;

                              return (
                                <button
                                  key={mod.id}
                                  type="button"
                                  onClick={() => {
                                    setHasStartedLearning(true);
                                    setActiveModuleId(mod.id);
                                    setModulesScreenMode('module');
                                  }}
                                  className="w-full text-left glass-panel-elevated rounded-2xl p-4 sm:p-5 border border-white/12 hover:border-emerald-400/50 transition-all flex items-center justify-between gap-4 cursor-pointer"
                                >
                                  <div className="min-w-0 space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 font-mono-tabular text-[11px] font-bold text-emerald-300">
                                        {mod.numberLabel}
                                      </span>
                                      <span className="font-mono-tabular text-xs text-slate-400">
                                        {mod.lessons.length} Lessons
                                      </span>
                                      <span className="font-mono-tabular text-xs font-bold text-amber-300">
                                        +{mod.xpReward} XP
                                      </span>
                                    </div>

                                    <h2 className="text-base sm:text-lg font-bold text-white truncate">
                                      {mod.title}
                                    </h2>
                                  </div>

                                  <div className="shrink-0 flex items-center gap-2">
                                    {isCompleted ? (
                                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 flex items-center gap-1">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Review</span>
                                      </span>
                                    ) : (
                                      <span className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm">
                                        <span>{hasProgressInMod ? 'Resume' : 'Open'}</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                      </span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* LEVEL 2 (Lesson Selector) & LEVEL 3 (1-Line Slide Player) */
                    <ModulePlayerView
                      module={activeModule}
                      slideIndex={moduleSlideIndices[activeModule.id] || 0}
                      onChangeSlideIndex={(newIdx) => {
                        const targetSlide = activeModule.slides[newIdx];
                        setModuleSlideIndices((prev) => ({
                          ...prev,
                          [activeModule.id]: newIdx,
                        }));
                        if (targetSlide) {
                          setViewedSlideIds((prev) => {
                            const existing = prev[activeModule.id] || [];
                            if (existing.includes(targetSlide.id)) return prev;
                            return {
                              ...prev,
                              [activeModule.id]: [...existing, targetSlide.id],
                            };
                          });
                        }
                      }}
                      answeredQuestions={answeredQuestions}
                      viewedSlideIdsForModule={viewedSlideIds[activeModule.id] || []}
                      onSubmitAnswer={handleSubmitQuestionAnswer}
                      onResetSingleQuestion={handleResetSingleQuestion}
                      onBackToModuleList={() => setModulesScreenMode('list')}
                      onCompleteModule={handleCompleteModule}
                      isModuleCompleted={completedModuleIds.includes(activeModule.id)}
                      isPhoneView={mobilePhoneFrameMode}
                      initialSubView="lessons"
                    />
                  )}
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
              totalXp={totalXp}
              maxPossibleXp={maxPossibleXp}
              completedModulesCount={completedModulesCount}
              totalModulesCount={totalModulesCount}
              solvedQuizzesCount={solvedQuizzesCount}
              totalQuizzesCount={totalQuizzesCount}
              pinnedCardsCount={pinnedCardIds.length}
              pinnedBanksCount={pinnedBankIds.length}
              onUpdateProfile={handleUpdateProfileFromSettings}
              onReplayIntro={() => setOnboardingStage('intro')}
              onResetQuizzes={handleResetXpAndSolvedQuestions}
              onResetPins={() => {
                setPinnedCardIds([]);
                setPinnedBankIds([]);
              }}
              onSignOut={handleSignOut}
              onClose={() => setShowSettingsModal(false)}
              isPhoneView={true}
            />
          )}

          {/* Mobile Bottom Navigation Bar — Instant Tap Response with Smooth Pill Indicator */}
          {onboardingStage === 'none' && (() => {
            const navItems: { id: MainTab; label: string; Icon: React.FC<{ className?: string }> }[] = [
              { id: 'home', label: 'Home', Icon: Compass },
              { id: 'modules', label: 'Modules', Icon: BookOpen },
              { id: 'cards', label: 'Cards', Icon: CreditCard },
              { id: 'banks', label: 'Banks', Icon: Building2 },
              { id: 'compare', label: 'Compare', Icon: Scale },
            ];
            const activeIdx = Math.max(
              0,
              navItems.findIndex((item) => item.id === activeTab)
            );

            return (
              <nav
                aria-label="Mobile bottom navigation"
                className={`${
                  mobilePhoneFrameMode
                    ? 'shrink-0 z-40 w-full px-3 pt-1.5 pb-2.5 bg-gradient-to-t from-[#070B14] via-[#070B14]/90 to-transparent'
                    : 'md:hidden fixed bottom-0 left-0 right-0 z-40 px-3.5 pt-2 pb-[max(0.9rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-transparent pointer-events-none'
                }`}
              >
                <div className="pointer-events-auto liquid-glass-dock relative mx-auto max-w-md rounded-[28px] p-1.5 select-none">
                  <div
                    aria-hidden="true"
                    className="liquid-glass-pill pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 rounded-[22px] transition-transform duration-200 ease-out"
                    style={{
                      width: 'calc((100% - 12px) / 5)',
                      transform: `translate3d(${activeIdx * 100}%, 0, 0)`,
                    }}
                  />

                  <div className="relative z-10 grid grid-cols-5 items-center min-h-[58px]">
                    {navItems.map(({ id, label, Icon }) => {
                      const isActive = activeTab === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            if (id === 'modules') setModulesScreenMode('list');
                            setActiveTab(id);
                          }}
                          className={`touch-manipulation flex flex-col items-center justify-center min-h-[54px] py-1.5 px-1 rounded-[22px] text-[11px] transition-colors cursor-pointer ${
                            isActive
                              ? 'text-white font-bold drop-shadow-[0_1px_6px_rgba(52,211,153,0.45)]'
                              : 'text-slate-300/90 hover:text-white font-semibold'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 transition-transform duration-150 ${
                              isActive ? 'text-emerald-300 scale-110' : 'text-slate-300'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="mt-1 leading-tight">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {mobilePhoneFrameMode && (
                  <div className="w-32 h-1 bg-white/25 rounded-full mx-auto mt-2" />
                )}
              </nav>
            );
          })()}
        </div>
      )}

      {/* Account & App Settings Modal (when in standard full desktop or mobile viewport) */}
      {showSettingsModal && !mobilePhoneFrameMode && (
        <SettingsModal
          userProfile={userProfile}
          totalXp={totalXp}
          maxPossibleXp={maxPossibleXp}
          completedModulesCount={completedModulesCount}
          totalModulesCount={totalModulesCount}
          solvedQuizzesCount={solvedQuizzesCount}
          totalQuizzesCount={totalQuizzesCount}
          pinnedCardsCount={pinnedCardIds.length}
          pinnedBanksCount={pinnedBankIds.length}
          onUpdateProfile={handleUpdateProfileFromSettings}
          onReplayIntro={() => setOnboardingStage('intro')}
          onResetQuizzes={handleResetXpAndSolvedQuestions}
          onResetPins={() => {
            setPinnedCardIds([]);
            setPinnedBankIds([]);
          }}
          onSignOut={handleSignOut}
          onClose={() => setShowSettingsModal(false)}
          isPhoneView={false}
        />
      )}

      {/* Standalone Static Splash / Create Account / Quick Demo / Intro Page */}
      {onboardingStage !== 'none' && !mobilePhoneFrameMode && (
        <AuthAndIntroModal
          mode={onboardingStage}
          userProfile={userProfile}
          onFinishSplash={handleFinishSplash}
          onCompleteSignup={handleCompleteSignup}
          onStartQuickDemo={handleStartQuickDemo}
          onReturnToSignup={handleReturnToSignup}
          onFinishIntro={handleFinishIntro}
          isPhoneView={false}
        />
      )}

      {/* Offline Mode Connectivity Banner */}
      <OfflineIndicator />
    </div>
  );
}
