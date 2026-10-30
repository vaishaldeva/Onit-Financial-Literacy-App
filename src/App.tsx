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
  Wallet,
  ShieldCheck,
  TrendingUp,
  Landmark,
  GraduationCap,
  Receipt,
  PiggyBank,
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
  calculateModuleLessonProgress,
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
import {
  getModuleTheme,
  ModuleTileIllustration,
  ModuleBadgeFigure,
  BadgeCollectionModal,
  type ModuleBadgeStatusItem,
} from './components/ModuleVisualsAndBadges';
import { useTheme } from './context/ThemeContext';

type MainTab = 'home' | 'modules' | 'cards' | 'banks' | 'compare';

export const MODULE_VISUAL_ICONS = [
  Wallet,
  CreditCard,
  ShieldCheck,
  Landmark,
  PiggyBank,
  TrendingUp,
  Receipt,
  GraduationCap,
  Scale,
  Award,
];

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
      completedLessonIds: parsed.completedLessonIds || {},
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
  const { isModern } = useTheme();
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
  const [showBadgeCollectionModal, setShowBadgeCollectionModal] = useState(false);
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
  const navTrackRef = useRef<HTMLDivElement | null>(null);
  const [navDragIndex, setNavDragIndex] = useState<number | null>(null);
  const navTouchStartXRef = useRef<number | null>(null);
  const isDraggingNavRef = useRef<boolean>(false);

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

  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, string[]>>(
    () => loadAccountProgress(userProfile?.email).completedLessonIds || {}
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
        completedLessonIds,
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
    completedLessonIds,
    pinnedCardIds,
    pinnedBankIds,
    moduleSlideIndices,
    viewedSlideIds,
    hasStartedLearning,
  ]);

  const applyAccountProgressToState = (progress: PerAccountProgressData) => {
    setAnsweredQuestions(progress.answeredQuestions);
    setCompletedModuleIds(progress.completedModuleIds);
    setCompletedLessonIds(progress.completedLessonIds || {});
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

  const handleCompleteLesson = (moduleId: string, lessonId: string) => {
    setHasStartedLearning(true);
    const mod = LEARNING_MODULES.find((m) => m.id === moduleId);
    setCompletedLessonIds((prev) => {
      const existing = prev[moduleId] || [];
      const nextForModule = existing.includes(lessonId)
        ? existing
        : [...existing, lessonId];
      if (mod && nextForModule.length >= mod.lessons.length) {
        setCompletedModuleIds((prevMods) =>
          prevMods.includes(moduleId) ? prevMods : [...prevMods, moduleId]
        );
      }
      if (existing.includes(lessonId)) return prev;
      return {
        ...prev,
        [moduleId]: nextForModule,
      };
    });
    if (mod) {
      const lessonSlideIds = mod.slides
        .filter((s) => s.lessonId === lessonId)
        .map((s) => s.id);
      setViewedSlideIds((prev) => {
        const existing = prev[moduleId] || [];
        return {
          ...prev,
          [moduleId]: Array.from(new Set([...existing, ...lessonSlideIds])),
        };
      });
    }
  };

  const handleResetXpAndSolvedQuestions = () => {
    const fresh = createFreshAccountProgress(ALL_MODULE_IDS, FIRST_SLIDE_BY_MODULE);
    setAnsweredQuestions({});
    setCompletedModuleIds([]);
    setCompletedLessonIds({});
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
          completedLessonIds: {},
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

  const badgeCollectionItems: ModuleBadgeStatusItem[] = LEARNING_MODULES.map((mod) => {
    const isExplicitDone = completedModuleIds.includes(mod.id);
    const lProg = calculateModuleLessonProgress(
      mod,
      answeredQuestions,
      viewedSlideIds[mod.id] || [],
      completedLessonIds[mod.id] || [],
      isExplicitDone
    );
    const isUnlocked = isExplicitDone || lProg.progressPercent >= 100;
    return {
      module: mod,
      completedLessonsCount: lProg.completedLessonsCount,
      totalLessonsCount: lProg.totalLessons,
      isUnlocked,
    };
  });

  // Calculate total XP strictly from the set xpReward of completed/unlocked modules
  const unlockedModuleIds = badgeCollectionItems
    .filter((item) => item.isUnlocked)
    .map((item) => item.module.id);
  const uniqueCompletedModuleIds = Array.from(
    new Set([...completedModuleIds, ...unlockedModuleIds])
  );
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
    Object.values(completedLessonIds).some((arr) => arr.length > 0) ||
    Object.values(moduleSlideIndices).some((idx) => idx > 0);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isModern
          ? 'bg-gradient-to-b from-[#131D36] via-[#11192E] to-[#0D1527]'
          : 'bg-[#070B14]'
      } text-slate-100 pb-28 md:pb-12 relative overflow-x-clip`}
    >
      {/* Welcoming Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {isModern ? (
          <>
            <div className="absolute -top-36 left-1/4 h-[440px] w-[440px] rounded-full bg-emerald-400/18 blur-[140px]" />
            <div className="absolute top-1/4 -right-28 h-[420px] w-[420px] rounded-full bg-sky-400/18 blur-[140px]" />
            <div className="absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-indigo-400/16 blur-[150px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
            <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[130px]" />
            <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-violet-500/12 blur-[140px]" />
          </>
        )}
      </div>

      {/* Desktop-Only Floating View Switcher */}
      <div className="fixed top-3 right-4 z-[9999] hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-white/20 p-1.5 rounded-2xl shadow-2xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-2">
          Preview
        </span>
        <button
          type="button"
          onClick={() => setMobilePhoneFrameMode((prev) => !prev)}
          className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-300 to-sky-300 rounded-xl hover:brightness-105 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md"
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
          className={`sticky top-0 z-30 ${
            isModern
              ? 'bg-[#131D36]/90 backdrop-blur-2xl border-b border-white/12'
              : 'bg-[#070B14] md:bg-slate-950/90 md:backdrop-blur-xl border-b border-white/10'
          } safe-top-header ${
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
                    activeTab === 'home' ? 'text-emerald-300 font-semibold underline underline-offset-8' : ''
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
                    activeTab === 'modules' ? 'text-emerald-300 font-semibold underline underline-offset-8' : ''
                  }`}
                >
                  Modules
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'cards' ? 'text-emerald-300 font-semibold underline underline-offset-8' : ''
                  }`}
                >
                  Credit Cards
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('banks')}
                  className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'banks' ? 'text-emerald-300 font-semibold underline underline-offset-8' : ''
                  }`}
                >
                  Banks
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('compare')}
                  className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'compare' ? 'text-emerald-300 font-semibold underline underline-offset-8' : ''
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
                  className={`min-h-[40px] min-w-[40px] px-3 py-2 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/14 ${
                    isModern ? 'rounded-2xl' : 'rounded-xl'
                  } transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer`}
                >
                  <Settings className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobilePhoneFrameMode((prev) => !prev)}
                className="hidden md:flex px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-300 to-sky-300 rounded-2xl hover:brightness-105 transition-all items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
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
          id={mobilePhoneFrameMode ? 'onit-phone-frame' : undefined}
          className={
            mobilePhoneFrameMode
              ? `relative z-10 mx-auto my-4 w-full max-w-[412px] h-[820px] max-h-[85vh] rounded-[46px] border-[10px] border-slate-800 ${
                  isModern ? 'bg-[#11192E]' : 'bg-[#070B14]'
                } shadow-2xl shadow-emerald-500/15 overflow-hidden flex flex-col`
              : ''
          }
        >
          {mobilePhoneFrameMode && (
            <div className="shrink-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
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
                      <button
                        type="button"
                        onClick={() => setShowSettingsModal(true)}
                        aria-label="Open Settings in iPhone View"
                        className="min-h-[34px] min-w-[34px] rounded-2xl bg-white/10 hover:bg-white/15 border border-white/12 flex items-center justify-center text-emerald-300 cursor-pointer"
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
                  HOME VIEW (Interactive Calculators Playground + Bank & Card Recommendation Survey + Badge Collection)
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
                  badgeCollectionItems={badgeCollectionItems}
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
                  onOpenModuleById={(moduleId) => handleOpenModule(moduleId)}
                  onOpenBanksTab={() => setActiveTab('banks')}
                  onOpenCardsTab={() => setActiveTab('cards')}
                  onOpenCompareTab={() => setActiveTab('compare')}
                  isPhoneView={mobilePhoneFrameMode}
                />
              )}

              {/* =========================================================
                  MODULES VIEW (Colorful Tile/Card Grid with Custom Pictures — Matching IMG_4174.PNG)
                 ========================================================= */}
              {activeTab === 'modules' && (
                <div className="space-y-4">
                  {modulesScreenMode === 'list' ? (
                    /* LEVEL 1: VIBRANT MODULE TILES GRID (2 Columns on Mobile, 3 on Desktop) */
                    <div className="space-y-4">
                      {/* Relocated Badge Collection Mini UI & Button at Very Top of Modules Tab */}
                      <div className="glass-panel-elevated rounded-3xl p-3.5 sm:p-4 border border-white/15 bg-gradient-to-br from-emerald-950/35 via-slate-900/80 to-sky-950/35 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex -space-x-2 overflow-hidden shrink-0">
                            {badgeCollectionItems.slice(0, 4).map((item, idx) => (
                              <div
                                key={item.module.id}
                                className={`h-10 w-10 rounded-xl flex items-center justify-center p-0.5 border overflow-hidden ${
                                  item.isUnlocked
                                    ? 'bg-slate-900 border-amber-400/60'
                                    : 'bg-[#171A21] border-white/10'
                                }`}
                              >
                                <ModuleBadgeFigure
                                  moduleId={item.module.id}
                                  unlocked={item.isUnlocked}
                                  index={idx}
                                  size="sm"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-white truncate">
                              Badge Collection
                            </p>
                            <p className="text-[11px] text-emerald-300 font-mono-tabular">
                              {badgeCollectionItems.filter((b) => b.isUnlocked).length} /{' '}
                              {totalModulesCount} unlocked
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowBadgeCollectionModal(true)}
                          className="min-h-[38px] px-4 py-1.5 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/18 text-xs font-bold text-white flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                        >
                          <Award className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                          <span>Badge Collection</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      {showBadgeCollectionModal && (
                        <BadgeCollectionModal
                          items={badgeCollectionItems}
                          onClose={() => setShowBadgeCollectionModal(false)}
                          onSelectModule={(moduleId) => handleOpenModule(moduleId)}
                          isPhoneView={mobilePhoneFrameMode}
                        />
                      )}

                      <div className="relative">
                        <Search
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300"
                          aria-hidden="true"
                        />
                        <input
                          type="search"
                          value={moduleSearchQuery}
                          onChange={(e) => setModuleSearchQuery(e.target.value)}
                          placeholder="Search modules..."
                          aria-label="Search modules by keyword"
                          className={`w-full ${
                            isModern
                              ? 'rounded-3xl bg-slate-900/65 border border-white/16 shadow-sm'
                              : 'rounded-2xl bg-slate-950/90 border border-white/15'
                          } pl-11 pr-20 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none`}
                        />
                        {moduleSearchQuery.trim() && (
                          <button
                            type="button"
                            onClick={() => setModuleSearchQuery('')}
                            aria-label="Clear module search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
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
                                className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-300 text-slate-950 text-xs font-bold cursor-pointer"
                              >
                                Show All Modules
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div
                            className={`grid grid-cols-2 ${
                              mobilePhoneFrameMode
                                ? 'gap-3'
                                : 'sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'
                            }`}
                          >
                            {matchingModules.map((mod) => {
                              const canonicalIdx = Math.max(
                                0,
                                LEARNING_MODULES.findIndex((m) => m.id === mod.id)
                              );
                              const themeMeta = getModuleTheme(mod.id, canonicalIdx);
                              const badgeStatus = badgeCollectionItems.find(
                                (b) => b.module.id === mod.id
                              );
                              const isUnlocked = Boolean(badgeStatus?.isUnlocked);

                              return (
                                <button
                                  key={mod.id}
                                  type="button"
                                  onClick={() => {
                                    setHasStartedLearning(true);
                                    setActiveModuleId(mod.id);
                                    setModulesScreenMode('module');
                                  }}
                                  className={`group w-full text-left ${themeMeta.tileBgClass} rounded-[26px] p-3.5 sm:p-5 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex flex-col justify-between gap-3 border border-white/20 cursor-pointer overflow-hidden`}
                                >
                                  <div className="flex items-start justify-between gap-2 w-full">
                                    <ModuleTileIllustration
                                      moduleId={mod.id}
                                      index={canonicalIdx}
                                      className="h-20 w-20 sm:h-24 sm:w-24"
                                    />

                                    <div
                                      className={`h-10 w-10 rounded-xl flex items-center justify-center p-0.5 shrink-0 overflow-hidden ${
                                        isUnlocked
                                          ? 'bg-slate-950/65 border border-amber-300/70 shadow-sm'
                                          : 'bg-black/30 border border-white/15'
                                      }`}
                                      title={
                                        isUnlocked
                                          ? `${themeMeta.badgeName} Unlocked!`
                                          : `${themeMeta.badgeName} (Complete 100% of lessons to unlock)`
                                      }
                                    >
                                      <ModuleBadgeFigure
                                        moduleId={mod.id}
                                        unlocked={isUnlocked}
                                        index={canonicalIdx}
                                        size="sm"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1 min-w-0 w-full">
                                    <h2 className="text-sm sm:text-lg font-extrabold text-white leading-snug break-words">
                                      {mod.title}
                                    </h2>
                                    <p className="text-[11px] sm:text-xs text-white/95 font-normal leading-snug line-clamp-3 break-words">
                                      {themeMeta.shortDescription}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* LEVEL 2 (Lesson Selector) & LEVEL 3 (Slide Player) */
                    <ModulePlayerView
                      module={activeModule}
                      ModuleIcon={
                        MODULE_VISUAL_ICONS[
                          Math.max(
                            0,
                            LEARNING_MODULES.findIndex((m) => m.id === activeModule.id)
                          ) % MODULE_VISUAL_ICONS.length
                        ]
                      }
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
                      completedLessonIdsForModule={completedLessonIds[activeModule.id] || []}
                      onCompleteLesson={handleCompleteLesson}
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

          {/* Mobile Bottom Navigation Bar — Soft Modern Default + Retro Support */}
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
            const pillPosition = navDragIndex !== null ? navDragIndex : activeIdx;
            const highlightedIdx =
              navDragIndex !== null
                ? Math.min(navItems.length - 1, Math.max(0, Math.round(navDragIndex)))
                : activeIdx;

            const getClampedIndexFromClientX = (clientX: number): number | null => {
              const el = navTrackRef.current;
              if (!el) return null;
              const rect = el.getBoundingClientRect();
              if (rect.width <= 0) return null;
              const relX = clientX - rect.left;
              const ratio = Math.max(0, Math.min(0.9999, relX / rect.width));
              const rawFloat = ratio * navItems.length - 0.5;
              return Math.max(0, Math.min(navItems.length - 1, rawFloat));
            };

            const finishNavTouch = () => {
              if (isDraggingNavRef.current && navDragIndex !== null) {
                const targetIdx = Math.min(
                  navItems.length - 1,
                  Math.max(0, Math.round(navDragIndex))
                );
                const nextTab = navItems[targetIdx]?.id;
                if (nextTab) {
                  if (nextTab === 'modules') setModulesScreenMode('list');
                  setActiveTab(nextTab);
                }
              }
              setNavDragIndex(null);
              navTouchStartXRef.current = null;
              isDraggingNavRef.current = false;
            };

            return (
              <nav
                aria-label="Mobile bottom navigation"
                className={`${
                  mobilePhoneFrameMode
                    ? `shrink-0 z-40 w-full px-3 pt-1.5 pb-2.5 bg-gradient-to-t ${
                        isModern
                          ? 'from-[#0D1527] via-[#0D1527]/90'
                          : 'from-[#070B14] via-[#070B14]/90'
                      } to-transparent`
                    : `md:hidden fixed bottom-0 left-0 right-0 z-40 px-3.5 pt-2 pb-[max(0.9rem,env(safe-area-inset-bottom))] bg-gradient-to-t ${
                        isModern
                          ? 'from-[#0D1527] via-[#0D1527]/85'
                          : 'from-[#070B14] via-[#070B14]/85'
                      } to-transparent pointer-events-none`
                }`}
              >
                <div
                  ref={navTrackRef}
                  onTouchStart={(e) => {
                    if (e.touches.length === 1) {
                      navTouchStartXRef.current = e.touches[0].clientX;
                      isDraggingNavRef.current = false;
                    }
                  }}
                  onTouchMove={(e) => {
                    if (e.touches.length === 1) {
                      const clientX = e.touches[0].clientX;
                      const startX = navTouchStartXRef.current ?? clientX;
                      if (!isDraggingNavRef.current && Math.abs(clientX - startX) > 5) {
                        isDraggingNavRef.current = true;
                      }
                      if (isDraggingNavRef.current) {
                        const clamped = getClampedIndexFromClientX(clientX);
                        if (clamped !== null) {
                          setNavDragIndex(clamped);
                        }
                      }
                    }
                  }}
                  onTouchEnd={finishNavTouch}
                  onTouchCancel={finishNavTouch}
                  className={`pointer-events-auto liquid-glass-dock relative mx-auto max-w-md ${
                    isModern ? 'rounded-[32px] p-1.5' : 'rounded-[28px] p-1.5'
                  } select-none touch-pan-x`}
                >
                  <div
                    aria-hidden="true"
                    className={`liquid-glass-pill pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 ${
                      isModern ? 'rounded-[26px]' : 'rounded-[22px]'
                    } ${
                      navDragIndex !== null
                        ? 'transition-none scale-[1.04]'
                        : 'transition-transform duration-200 ease-out'
                    }`}
                    style={{
                      width: 'calc((100% - 12px) / 5)',
                      transform: `translate3d(${pillPosition * 100}%, 0, 0)`,
                    }}
                  />

                  <div className="relative z-10 grid grid-cols-5 items-center min-h-[58px]">
                    {navItems.map(({ id, label, Icon }, idx) => {
                      const isActive = idx === highlightedIdx;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setNavDragIndex(null);
                            isDraggingNavRef.current = false;
                            if (id === 'modules') setModulesScreenMode('list');
                            setActiveTab(id);
                          }}
                          className={`touch-manipulation flex flex-col items-center justify-center min-h-[54px] py-1.5 px-1 ${
                            isModern ? 'rounded-[26px]' : 'rounded-[22px]'
                          } text-[11px] transition-colors cursor-pointer ${
                            isActive
                              ? 'text-white font-bold drop-shadow-[0_1px_6px_rgba(52,211,153,0.45)]'
                              : 'text-slate-300/90 hover:text-white font-medium'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 transition-transform duration-150 ${
                              isActive
                                ? isModern
                                  ? 'text-emerald-200 scale-110'
                                  : 'text-emerald-300 scale-110'
                                : 'text-slate-300'
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
