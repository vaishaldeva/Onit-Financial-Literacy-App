import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Trophy,
  BookOpen,
  Check,
  Lock,
  ArrowUp,
  ArrowDown,
  Zap,
  Timer,
  Flame,
  ListChecks,
} from 'lucide-react';
import type {
  LearningModule,
  ModuleSlide,
  ModuleLesson,
  BadgeBattleQuestion,
} from '../data/finlitData';
import {
  getQuestionHistoryKey,
  calculateModuleCompletionGate,
  calculateModuleLessonProgress,
  evaluateQuestionSelection,
  type AnsweredQuestionRecord,
} from '../utils/logic';
import {
  getModuleTheme,
  ModuleBadgeFigure,
  ModuleTileIllustration,
} from './ModuleVisualsAndBadges';

interface ModulePlayerViewProps {
  module: LearningModule;
  ModuleIcon?: React.FC<{ className?: string }>;
  slideIndex: number;
  onChangeSlideIndex: (newIndex: number) => void;
  answeredQuestions: Record<string, AnsweredQuestionRecord>;
  viewedSlideIdsForModule?: string[];
  completedLessonIdsForModule?: string[];
  onCompleteLesson?: (moduleId: string, lessonId: string) => void;
  onSubmitAnswer: (
    moduleId: string,
    slideId: string,
    selectedOptionIds: string[]
  ) => void;
  onResetSingleQuestion: (moduleId: string, slideId: string) => void;
  onBackToModuleList: () => void;
  onCompleteModule: (moduleId: string) => void;
  isModuleCompleted?: boolean;
  isPhoneView?: boolean;
  initialSubView?: 'lessons' | 'player';
}

const CONFETTI_COLORS = [
  '#34D399', // emerald-400
  '#22D3EE', // cyan-400
  '#6EE7B7', // emerald-300
  '#38BDF8', // sky-400
  '#FBBF24', // amber-400
  '#A7F3D0', // emerald-200
];

const SmoothConfettiBreeze: React.FC<{ burstKey: number }> = ({ burstKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(window.innerWidth, 320);
    const height = Math.max(window.innerHeight, 480);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles = Array.from({ length: 70 }, (_, i) => {
      const fromLeftWave = i % 2 === 0;
      const startX = fromLeftWave
        ? width * (0.15 + Math.random() * 0.45)
        : width * (0.3 + Math.random() * 0.4);
      const startY = fromLeftWave
        ? height * (0.25 + Math.random() * 0.35)
        : height * (0.45 + Math.random() * 0.25);

      const angle = -Math.PI * 0.38 + (Math.random() - 0.5) * 1.1;
      const speed = 5.5 + Math.random() * 8.5;

      return {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed + 1.8 + Math.random() * 2.4,
        vy: Math.sin(angle) * speed - 1.5 - Math.random() * 2.5,
        w: 8 + Math.random() * 5,
        h: 4 + Math.random() * 3,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.14,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: 0.08 + Math.random() * 0.09,
        windX: 0.06 + Math.random() * 0.06,
      };
    });

    const durationMs = 2000;
    const startTime = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= durationMs) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const fadeProgress =
        elapsed > 1350 ? Math.max(0, 1 - (elapsed - 1350) / 650) : 1;
      const alpha = fadeProgress * fadeProgress;

      for (const p of particles) {
        p.vx = p.vx * 0.985 + p.windX;
        p.vy = p.vy * 0.985 + 0.16;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        const scaleY = Math.max(0.2, Math.abs(Math.cos(p.tilt)));

        ctx.save();
        ctx.globalAlpha = alpha * 0.94;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(1, scaleY);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [burstKey]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />,
    document.body
  );
};

export const ModulePlayerView: React.FC<ModulePlayerViewProps> = ({
  module,
  ModuleIcon = BookOpen,
  slideIndex,
  onChangeSlideIndex,
  answeredQuestions,
  viewedSlideIdsForModule = [],
  completedLessonIdsForModule = [],
  onCompleteLesson,
  onSubmitAnswer,
  onResetSingleQuestion,
  onBackToModuleList,
  onCompleteModule,
  isModuleCompleted = false,
  isPhoneView = false,
  initialSubView = 'lessons',
}) => {
  const [subView, setSubView] = useState<'lessons' | 'player'>(initialSubView);
  const [localCompletedLessonIds, setLocalCompletedLessonIds] = useState<string[]>([]);

  const safeSlideIndex = Math.max(
    0,
    Math.min(module.slides.length - 1, slideIndex)
  );
  const slide: ModuleSlide = module.slides[safeSlideIndex] || module.slides[0];

  const currentLesson: ModuleLesson =
    module.lessons.find((l) => l.id === slide.lessonId) || module.lessons[0];

  const lessonSlideIndices = module.slides
    .map((s, idx) => (s.lessonId === currentLesson.id ? idx : -1))
    .filter((idx) => idx !== -1);

  const firstLessonSlideIdx = lessonSlideIndices[0] ?? 0;
  const lastLessonSlideIdx =
    lessonSlideIndices[lessonSlideIndices.length - 1] ?? module.slides.length - 1;

  const isLastSlideOfLesson = safeSlideIndex === lastLessonSlideIdx;

  const historyKey = getQuestionHistoryKey(module.id, slide.id);
  const existingRecord = answeredQuestions[historyKey];

  const effectiveViewedSlideIds =
    subView === 'player'
      ? Array.from(new Set([...viewedSlideIdsForModule, slide.id]))
      : viewedSlideIdsForModule;

  const mergedCompletedLessonIds = Array.from(
    new Set([...completedLessonIdsForModule, ...localCompletedLessonIds])
  );

  const lessonProgress = calculateModuleLessonProgress(
    module,
    answeredQuestions,
    effectiveViewedSlideIds,
    mergedCompletedLessonIds,
    isModuleCompleted
  );

  const completionGate = calculateModuleCompletionGate(
    module,
    answeredQuestions,
    effectiveViewedSlideIds
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(
    existingRecord ? existingRecord.selectedOptionIds : []
  );
  const [validationMessage, setValidationMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [revealedSolutionSlides, setRevealedSolutionSlides] = useState<
    Record<string, boolean>
  >({});

  const [mtSelections, setMtSelections] = useState<Record<string, string>>({});
  const [ddBucketSelections, setDdBucketSelections] = useState<
    Record<string, string>
  >({});
  const [ddOrderedIds, setDdOrderedIds] = useState<string[]>([]);

  const savedMtBySlideRef = useRef<Record<string, Record<string, string>>>({});
  const savedBucketBySlideRef = useRef<Record<string, Record<string, string>>>(
    {}
  );
  const savedOrderBySlideRef = useRef<Record<string, string[]>>({});

  // Timed Badge Battle state (Module 2 Lesson 13)
  const [battleActive, setBattleActive] = useState(false);
  const [battleQueue, setBattleQueue] = useState<BadgeBattleQuestion[]>([]);
  const [battleClearedIds, setBattleClearedIds] = useState<string[]>([]);
  const [battleSecondsLeft, setBattleSecondsLeft] = useState(180);
  const [battleStallMessage, setBattleStallMessage] = useState<string | null>(
    null
  );
  const [battleSaPicks, setBattleSaPicks] = useState<number[]>([]);
  const [battleMistakes, setBattleMistakes] = useState(0);
  const [battleScorePercent, setBattleScorePercent] = useState<number | null>(
    null
  );
  const [battleCompleted, setBattleCompleted] = useState(false);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);
  const [wrongShakeActive, setWrongShakeActive] = useState(false);
  const [wrongGlowActive, setWrongGlowActive] = useState(false);

  const regularLessons = module.lessons.filter((l) => !l.isBadgeBattle);
  const completedRegularLessonsCount = regularLessons.filter((l) =>
    lessonProgress.completedLessonIdSet.has(l.id)
  ).length;
  const regularLessonsCompletionPercent =
    regularLessons.length > 0
      ? Math.round((completedRegularLessonsCount / regularLessons.length) * 100)
      : 100;
  const isBadgeBattleUnlocked =
    isModuleCompleted || regularLessonsCompletionPercent >= 70;

  const playerTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSubView(initialSubView);
  }, [module.id, initialSubView]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    const scrollableMain = playerTopRef.current?.closest('main');
    if (scrollableMain) {
      scrollableMain.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    }
  }, [safeSlideIndex, module.id, subView]);

  useEffect(() => {
    setShowCelebration(false);
  }, [module.id]);

  useEffect(() => {
    setConfettiBurstKey(0);
    setWrongShakeActive(false);
    setWrongGlowActive(false);
  }, [slide.id, module.id]);

  useEffect(() => {
    setValidationMessage('');
    if (existingRecord) {
      setSelectedIds(existingRecord.selectedOptionIds);
    } else {
      setSelectedIds([]);
      setRevealedSolutionSlides((prev) => {
        if (!prev[historyKey]) return prev;
        const next = { ...prev };
        delete next[historyKey];
        return next;
      });
    }

    if (slide.problemFormat === 'mt' && slide.matchingPairs) {
      const savedMt = savedMtBySlideRef.current[historyKey];
      if (savedMt && Object.keys(savedMt).length > 0) {
        setMtSelections(savedMt);
      } else {
        const nextMt: Record<string, string> = {};
        if (existingRecord) {
          slide.matchingPairs.forEach((p) => {
            if (existingRecord.selectedOptionIds.includes(p.correctOptionId)) {
              nextMt[p.id] = p.right;
            }
          });
        }
        setMtSelections(nextMt);
      }
    }

    if (slide.problemFormat === 'dd-bucket' && slide.ddBucketConfig) {
      const savedBucket = savedBucketBySlideRef.current[historyKey];
      if (savedBucket && Object.keys(savedBucket).length > 0) {
        setDdBucketSelections(savedBucket);
      } else {
        const nextBucket: Record<string, string> = {};
        if (existingRecord) {
          slide.ddBucketConfig.items.forEach((item) => {
            if (
              existingRecord.selectedOptionIds.includes(item.correctOptionId)
            ) {
              nextBucket[item.id] = item.correctCategory;
            }
          });
        }
        setDdBucketSelections(nextBucket);
      }
    }

    if (slide.problemFormat === 'dd-order' && slide.ddOrderConfig) {
      const items = slide.ddOrderConfig.items;
      const savedOrder = savedOrderBySlideRef.current[historyKey];
      if (existingRecord?.evaluation.isFullyCorrect) {
        const sorted = [...items]
          .sort((a, b) => a.correctPosition - b.correctPosition)
          .map((i) => i.id);
        setDdOrderedIds(sorted);
      } else if (savedOrder && savedOrder.length === items.length) {
        setDdOrderedIds(savedOrder);
        if (!existingRecord) {
          const restoredOptionIds = savedOrder.map((itemId, pos) => {
            const found = items.find((i) => i.id === itemId)!;
            return found.correctPosition === pos
              ? found.correctOptionId
              : found.wrongOptionId;
          });
          setSelectedIds(restoredOptionIds);
        }
      } else {
        const scrambled = [...items]
          .sort((a, b) => {
            const aKey = (a.correctPosition * 3 + 1) % items.length;
            const bKey = (b.correctPosition * 3 + 1) % items.length;
            return aKey - bKey;
          })
          .map((i) => i.id);
        if (
          scrambled.every((id, idx) => id === items[idx]?.id) &&
          scrambled.length > 1
        ) {
          const first = scrambled[0];
          scrambled[0] = scrambled[1];
          scrambled[1] = first;
        }
        setDdOrderedIds(scrambled);
        const initialOptionIds = scrambled.map((itemId, pos) => {
          const found = items.find((i) => i.id === itemId)!;
          return found.correctPosition === pos
            ? found.correctOptionId
            : found.wrongOptionId;
        });
        if (!existingRecord) {
          setSelectedIds(initialOptionIds);
        }
      }
    }

    if (currentLesson.isBadgeBattle && currentLesson.badgeBattleQuestions) {
      const isAlreadyScored = Boolean(
        existingRecord?.evaluation.isFullyCorrect
      );
      setBattleActive(false);
      setBattleStallMessage(null);
      setBattleSaPicks([]);
      setBattleCompleted(isAlreadyScored);
      if (isAlreadyScored) {
        setBattleClearedIds(
          currentLesson.badgeBattleQuestions.map((q) => q.id)
        );
        setBattleScorePercent((prev) => prev ?? 100);
      } else {
        setBattleClearedIds([]);
        setBattleScorePercent(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.id, historyKey]);

  useEffect(() => {
    if (!battleActive || battleCompleted) return;
    if (battleSecondsLeft <= 0) {
      setBattleActive(false);
      return;
    }
    const timer = window.setInterval(() => {
      setBattleSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [battleActive, battleCompleted, battleSecondsLeft]);

  const startBadgeBattle = () => {
    const questions = currentLesson.badgeBattleQuestions || [];
    setBattleQueue([...questions]);
    setBattleClearedIds([]);
    setBattleSecondsLeft(180);
    setBattleStallMessage(null);
    setBattleSaPicks([]);
    setBattleMistakes(0);
    setBattleScorePercent(null);
    setBattleCompleted(false);
    setBattleActive(true);
  };

  const handleAnswerBattleQuestion = (isCorrect: boolean) => {
    if (battleStallMessage || battleQueue.length === 0) return;
    const currentQ = battleQueue[0];

    if (isCorrect) {
      const remaining = battleQueue.slice(1);
      setBattleClearedIds((prev) => [...prev, currentQ.id]);
      setBattleQueue(remaining);
      setBattleSaPicks([]);
      if (remaining.length === 0) {
        const totalQuestions =
          currentLesson.badgeBattleQuestions?.length || 17;
        const earnedScore = Math.max(
          1,
          Math.round(
            (totalQuestions / (totalQuestions + battleMistakes)) * 100
          )
        );
        setBattleScorePercent(earnedScore);
        setBattleCompleted(true);
        setBattleActive(false);

        const clearOptionIds =
          slide.options && slide.options.length > 0
            ? slide.options.filter((o) => o.isCorrect).map((o) => o.id)
            : ['m2-l13-c1-cleared'];
        onSubmitAnswer(module.id, slide.id, clearOptionIds);
        const nextCompletedIds = localCompletedLessonIds.includes(
          currentLesson.id
        )
          ? localCompletedLessonIds
          : [...localCompletedLessonIds, currentLesson.id];
        setLocalCompletedLessonIds(nextCompletedIds);
        onCompleteLesson?.(module.id, currentLesson.id);
        triggerConfettiBreeze();
      }
    } else {
      setBattleMistakes((prev) => prev + 1);
      setBattleSecondsLeft((prev) => Math.max(0, prev - 5));
      setBattleStallMessage(
        'Time penalty (-5s) — this question will cycle back later.'
      );
      window.setTimeout(() => {
        setBattleQueue((prev) => {
          if (prev.length <= 1) return prev;
          return [...prev.slice(1), prev[0]];
        });
        setBattleSaPicks([]);
        setBattleStallMessage(null);
      }, 1150);
    }
  };

  const handleToggleOption = (optionId: string) => {
    setValidationMessage('');
    setWrongGlowActive(false);
    if (slide.type === 'single-choice') {
      setSelectedIds([optionId]);
      return;
    }
    setSelectedIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleTfPick = (
    _statementId: string,
    trueOptionId: string,
    falseOptionId: string,
    pickTrue: boolean
  ) => {
    setValidationMessage('');
    setWrongGlowActive(false);
    const chosenId = pickTrue ? trueOptionId : falseOptionId;
    setSelectedIds((prev) => {
      const filtered = prev.filter(
        (id) => id !== trueOptionId && id !== falseOptionId
      );
      return [...filtered, chosenId];
    });
  };

  const handleMtPick = (
    pairId: string,
    chosenRight: string,
    correctRight: string,
    correctOptionId: string,
    wrongOptionId: string
  ) => {
    setValidationMessage('');
    setWrongGlowActive(false);
    setMtSelections((prev) => {
      const updated = { ...prev, [pairId]: chosenRight };
      savedMtBySlideRef.current[historyKey] = updated;
      return updated;
    });
    const targetOptionId =
      chosenRight === correctRight ? correctOptionId : wrongOptionId;
    setSelectedIds((prev) => {
      const filtered = prev.filter(
        (id) => id !== correctOptionId && id !== wrongOptionId
      );
      return chosenRight ? [...filtered, targetOptionId] : filtered;
    });
  };

  const handleDdBucketPick = (
    itemId: string,
    chosenCategory: string,
    correctCategory: string,
    correctOptionId: string,
    wrongOptionId: string
  ) => {
    setValidationMessage('');
    setWrongGlowActive(false);
    setDdBucketSelections((prev) => {
      const updated = { ...prev, [itemId]: chosenCategory };
      savedBucketBySlideRef.current[historyKey] = updated;
      return updated;
    });
    const targetOptionId =
      chosenCategory === correctCategory ? correctOptionId : wrongOptionId;
    setSelectedIds((prev) => {
      const filtered = prev.filter(
        (id) => id !== correctOptionId && id !== wrongOptionId
      );
      return [...filtered, targetOptionId];
    });
  };

  const handleDdMoveOrder = (index: number, direction: -1 | 1) => {
    if (!slide.ddOrderConfig) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= ddOrderedIds.length) return;
    setValidationMessage('');
    setWrongGlowActive(false);
    const nextOrder = [...ddOrderedIds];
    const temp = nextOrder[index];
    nextOrder[index] = nextOrder[targetIndex];
    nextOrder[targetIndex] = temp;
    setDdOrderedIds(nextOrder);
    savedOrderBySlideRef.current[historyKey] = nextOrder;

    const items = slide.ddOrderConfig.items;
    const updatedOptionIds = nextOrder.map((itemId, pos) => {
      const found = items.find((i) => i.id === itemId)!;
      return found.correctPosition === pos
        ? found.correctOptionId
        : found.wrongOptionId;
    });
    setSelectedIds(updatedOptionIds);
  };

  const triggerConfettiBreeze = () => {
    const nextKey = Date.now();
    setConfettiBurstKey(nextKey);
    window.setTimeout(() => {
      setConfettiBurstKey((curr) => (curr === nextKey ? 0 : curr));
    }, 2000);
  };

  const handleCheckAnswer = () => {
    if (existingRecord?.evaluation.isFullyCorrect) {
      return;
    }
    if (slide.problemFormat === 'tf' && slide.tfStatements) {
      if (selectedIds.length < slide.tfStatements.length) {
        setValidationMessage(
          'Mark True or False for every statement before checking.'
        );
        return;
      }
    } else if (slide.problemFormat === 'mt' && slide.matchingPairs) {
      if (
        Object.keys(mtSelections).filter((k) => mtSelections[k]).length <
        slide.matchingPairs.length
      ) {
        setValidationMessage('Match every item before checking your answer.');
        return;
      }
    } else if (slide.problemFormat === 'dd-bucket' && slide.ddBucketConfig) {
      if (
        Object.keys(ddBucketSelections).filter((k) => ddBucketSelections[k])
          .length < slide.ddBucketConfig.items.length
      ) {
        setValidationMessage(
          'Sort every item into a category before checking.'
        );
        return;
      }
    } else if (selectedIds.length === 0) {
      setValidationMessage('Select an option before checking your answer.');
      return;
    }

    setValidationMessage('');
    onSubmitAnswer(module.id, slide.id, selectedIds);

    if (slide.options) {
      const evalResult = evaluateQuestionSelection(slide.options, selectedIds);
      if (evalResult.isFullyCorrect) {
        setWrongGlowActive(false);
        setWrongShakeActive(false);
        setRevealedSolutionSlides((prev) => {
          if (!prev[historyKey]) return prev;
          const next = { ...prev };
          delete next[historyKey];
          return next;
        });
        triggerConfettiBreeze();
      } else {
        setWrongGlowActive(true);
        setWrongShakeActive(false);
        window.requestAnimationFrame(() => {
          setWrongShakeActive(true);
        });
        window.setTimeout(() => {
          setWrongShakeActive(false);
        }, 460);
      }
    }
  };

  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const lessonCompleteTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (lessonCompleteTimerRef.current) {
        window.clearTimeout(lessonCompleteTimerRef.current);
      }
    };
  }, []);

  const handleFinishLesson = () => {
    const nextCompletedIds = localCompletedLessonIds.includes(currentLesson.id)
      ? localCompletedLessonIds
      : [...localCompletedLessonIds, currentLesson.id];
    setLocalCompletedLessonIds(nextCompletedIds);
    onCompleteLesson?.(module.id, currentLesson.id);
    setShowLessonComplete(true);
    triggerConfettiBreeze();
    if (lessonCompleteTimerRef.current) {
      window.clearTimeout(lessonCompleteTimerRef.current);
    }
    lessonCompleteTimerRef.current = window.setTimeout(() => {
      setShowLessonComplete(false);
      setSubView('lessons');
    }, 3000);
  };

  const openLessonAtSlide = (lesson: ModuleLesson) => {
    if (lesson.isBadgeBattle && !isBadgeBattleUnlocked) {
      return;
    }
    const firstSlideOfTargetLesson = module.slides.findIndex(
      (s) => s.lessonId === lesson.id
    );
    if (firstSlideOfTargetLesson >= 0) {
      onChangeSlideIndex(firstSlideOfTargetLesson);
    }
    setShowLessonComplete(false);
    setSubView('player');
  };

  const moduleTheme = getModuleTheme(module.id);
  const isFinalLessonInModule =
    module.lessons[module.lessons.length - 1]?.id === currentLesson.id;

  // =========================================================
  // LEVEL 2: MODULE OVERVIEW & FLOWING VERTICAL LESSON PATH
  // =========================================================
  if (subView === 'lessons') {
    const progressPercent = lessonProgress.progressPercent;
    const isBadgeUnlocked = Boolean(isModuleCompleted || progressPercent >= 100);
    const canCompleteModuleNow =
      completionGate.canComplete || progressPercent >= 100;

    const nextUpLessonId = module.lessons.find((l) => {
      const done = lessonProgress.completedLessonIdSet.has(l.id);
      const locked = Boolean(l.isBadgeBattle) && !isBadgeBattleUnlocked;
      return !done && !locked;
    })?.id;

    return (
      <div ref={playerTopRef} className="space-y-6 pb-4">
        {/* Top Module Header with Smooth Ambient Gradient + High-Contrast Text */}
        <div
          className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${moduleTheme.headerBgClass} p-5 sm:p-6 backdrop-blur-xl shadow-xl border border-white/[0.09]`}
        >
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <button
              type="button"
              onClick={onBackToModuleList}
              aria-label="Back to Modules"
              className="h-9 px-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.10] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 stroke-[2.2]" aria-hidden="true" />
              <span>Modules</span>
            </button>

            {(isModuleCompleted || canCompleteModuleNow) && (
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 text-xs font-bold shadow-sm inline-flex items-center gap-1.5 select-none">
                <Trophy className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                <span>Module Complete</span>
              </div>
            )}
          </div>

          {/* Main Banner Content: Left Info + Badge Status Pill | Right Circular % Badge */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              {/* Module Thumbnail Picture + Title */}
              <div className="flex items-center gap-3.5 min-w-0">
                <ModuleTileIllustration
                  moduleId={module.id}
                  className="h-13 w-13 sm:h-15 sm:w-15 shrink-0 !rounded-2xl shadow-md"
                />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-tight break-words">
                    {module.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                    {lessonProgress.completedLessonsCount} of{' '}
                    {lessonProgress.totalLessons} lessons completed
                  </p>
                </div>
              </div>

              {/* Sleek Pill Badge Status Under Title */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/[0.10] pl-1.5 pr-3 py-1 max-w-full">
                <div className="h-7 w-7 shrink-0 rounded-full bg-black/40 border border-white/[0.10] flex items-center justify-center overflow-hidden p-0.5">
                  <ModuleBadgeFigure
                    moduleId={module.id}
                    unlocked={isBadgeUnlocked}
                    size="sm"
                  />
                </div>
                <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold text-white leading-tight">
                    {moduleTheme.badgeName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider leading-none ${
                      isBadgeUnlocked
                        ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-white/[0.08] text-slate-300 border border-white/[0.08]'
                    }`}
                  >
                    {isBadgeUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>
            </div>

            {/* Circular % Complete Ring Badge on Right */}
            <div className="shrink-0">
              <div className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-full bg-white/[0.08] backdrop-blur-md border-2 border-emerald-400/50 shadow-lg flex flex-col items-center justify-center text-white">
                <span className="font-mono-tabular text-base sm:text-lg font-bold leading-none">
                  {progressPercent}%
                </span>
                <span className="text-[10px] font-medium text-slate-300 mt-0.5">
                  Done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Flowing Vertical Lesson Path (Un-boxed, direct on canvas) */}
        <div className="px-1 sm:px-3 py-1">
          <div className="relative">
            {module.lessons.map((lesson, idx) => {
              const isLessonDone = lessonProgress.completedLessonIdSet.has(
                lesson.id
              );
              const isBattleLocked =
                Boolean(lesson.isBadgeBattle) && !isBadgeBattleUnlocked;
              const isUpNext = lesson.id === nextUpLessonId;
              const isLastLessonNode = idx === module.lessons.length - 1;

              const nodeCircleClass = isBattleLocked
                ? 'bg-white/[0.05] border-white/[0.12] text-slate-500 shadow-none'
                : lesson.isBadgeBattle
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-200/40 text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.45)]'
                : isLessonDone
                ? 'bg-emerald-400 border-emerald-200/40 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.4)]'
                : isUpNext
                ? 'bg-sky-500 border-sky-200/50 text-white shadow-[0_0_20px_rgba(14,165,233,0.55)] ring-4 ring-sky-500/20'
                : 'bg-white/[0.08] border-white/[0.16] text-white';

              const statusText = isBattleLocked
                ? `Unlock at 70% (${regularLessonsCompletionPercent}%/70%)`
                : lesson.isBadgeBattle
                ? isLessonDone
                  ? 'Boss Blitz Cleared!'
                  : 'Boss Blitz Ready'
                : isLessonDone
                ? 'Completed'
                : isUpNext
                ? 'Up Next'
                : 'Not Started';

              return (
                <div
                  key={lesson.id}
                  className="relative flex items-stretch gap-3.5 sm:gap-4"
                >
                  {/* Left Column: Circular Path Node + Smooth Connector Line */}
                  <div className="flex flex-col items-center shrink-0 w-11 sm:w-12">
                    <button
                      type="button"
                      disabled={isBattleLocked}
                      onClick={() => openLessonAtSlide(lesson)}
                      aria-label={`Lesson ${lesson.number}: ${lesson.title}`}
                      className={`relative z-10 h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 flex items-center justify-center transition-transform ${
                        isBattleLocked
                          ? 'cursor-not-allowed'
                          : 'hover:scale-105 active:scale-95 cursor-pointer'
                      } ${nodeCircleClass}`}
                    >
                      {isBattleLocked ? (
                        <Lock className="h-4 w-4" aria-hidden="true" />
                      ) : lesson.isBadgeBattle ? (
                        <Zap
                          className="h-4 w-4 fill-current"
                          aria-hidden="true"
                        />
                      ) : isLessonDone ? (
                        <Check
                          className="h-4 w-4 stroke-[3]"
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>

                    {/* Vertical Connector Line to Next Node */}
                    <div
                      className={`w-[2px] flex-1 my-1.5 rounded-full transition-colors ${
                        isLastLessonNode ? 'min-h-[24px]' : 'min-h-[30px]'
                      } ${
                        isLessonDone
                          ? 'bg-emerald-400/60'
                          : 'bg-white/[0.10]'
                      }`}
                    />
                  </div>

                  {/* Right Column: Airy Lesson Card */}
                  <div className="flex-1 min-w-0 pb-3.5 sm:pb-4">
                    <button
                      type="button"
                      disabled={isBattleLocked}
                      onClick={() => openLessonAtSlide(lesson)}
                      className={`w-full text-left rounded-[24px] p-3.5 sm:p-4 border transition-all flex items-center justify-between gap-3 backdrop-blur-md ${
                        isBattleLocked
                          ? 'bg-white/[0.02] border-white/[0.06] opacity-65 cursor-not-allowed'
                          : lesson.isBadgeBattle
                          ? 'bg-gradient-to-r from-amber-500/15 via-white/[0.04] to-rose-500/12 border-amber-400/35 hover:border-amber-300/60 cursor-pointer'
                          : isLessonDone
                          ? 'bg-emerald-500/[0.07] border-emerald-400/30 hover:border-emerald-300/50 cursor-pointer'
                          : isUpNext
                          ? 'bg-sky-500/[0.10] border-sky-400/45 hover:border-sky-300/70 shadow-[0_6px_20px_rgba(14,165,233,0.12)] cursor-pointer'
                          : 'bg-white/[0.035] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.15] cursor-pointer'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[11px] font-semibold tracking-wide ${
                              lesson.isBadgeBattle
                                ? 'text-amber-300'
                                : isLessonDone
                                ? 'text-emerald-300'
                                : isUpNext
                                ? 'text-sky-300'
                                : 'text-slate-400'
                            }`}
                          >
                            {lesson.isBadgeBattle
                              ? 'Boss Blitz'
                              : `Lesson ${lesson.number}`}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span
                            className={`text-[11px] font-medium ${
                              isBattleLocked
                                ? 'text-amber-300/80'
                                : isLessonDone
                                ? 'text-emerald-300/90'
                                : isUpNext
                                ? 'text-sky-300/90'
                                : 'text-slate-400'
                            }`}
                          >
                            {statusText}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-semibold text-white leading-snug break-words">
                          {lesson.title}
                        </h3>
                      </div>

                      <div className="shrink-0 flex items-center">
                        {isBattleLocked ? (
                          <span className="h-9 w-9 rounded-full bg-white/[0.05] text-amber-300/80 flex items-center justify-center">
                            <Lock className="h-4 w-4" />
                          </span>
                        ) : isLessonDone ? (
                          <span className="h-9 w-9 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5" />
                          </span>
                        ) : (
                          <span
                            className={`h-9 w-9 rounded-full flex items-center justify-center ${
                              isUpNext
                                ? 'bg-sky-500 text-white shadow-sm'
                                : 'bg-white/[0.07] text-slate-300'
                            }`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Final Finish Node on the Path: Module Badge Pedestal */}
            <div className="relative flex items-center gap-3.5 sm:gap-4">
              <div className="flex flex-col items-center shrink-0 w-11 sm:w-12">
                <div
                  className={`h-11 w-11 rounded-full border-2 flex items-center justify-center ${
                    isBadgeUnlocked
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-white/[0.04] border-white/[0.12]'
                  }`}
                >
                  <Trophy
                    className={`h-4 w-4 ${
                      isBadgeUnlocked ? 'text-amber-300' : 'text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div
                className={`flex-1 min-w-0 rounded-[24px] p-4 border flex items-center justify-between gap-3 ${
                  isBadgeUnlocked
                    ? 'bg-gradient-to-r from-emerald-500/15 via-white/[0.04] to-sky-500/15 border-emerald-400/40'
                    : 'bg-white/[0.03] border-white/[0.07]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    {isBadgeUnlocked ? 'Badge Unlocked!' : 'Path Reward'}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug break-words">
                    {moduleTheme.badgeName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isBadgeUnlocked
                      ? 'Added to your Badge Collection in full color!'
                      : 'Complete all lessons on the path to unlock'}
                  </p>
                </div>
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-black/30 border border-white/[0.08] flex items-center justify-center p-0.5 overflow-hidden">
                  <ModuleBadgeFigure
                    moduleId={module.id}
                    unlocked={isBadgeUnlocked}
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // LEVEL 3: ACTIVE LESSON SCREEN (No Slide Counter Header Clutter)
  // =========================================================
  const isContentSlide = slide.type === 'content';

  return (
    <div ref={playerTopRef} className="space-y-4 relative">
      {confettiBurstKey > 0 && <SmoothConfettiBreeze burstKey={confettiBurstKey} />}

      {/* Clean Un-boxed Lesson Header Row */}
      <div className="flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={() => setSubView('lessons')}
          className="min-h-[36px] px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.10] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Lessons</span>
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 border border-emerald-300/35 font-mono-tabular text-[11px] font-bold text-emerald-300">
            {currentLesson.number}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white truncate">
            {currentLesson.title}
          </span>
        </div>
      </div>

      {/* Main Slide Card */}
      <div
        className={`glass-panel-elevated rounded-3xl border transition-all duration-300 ${
          !isContentSlide && existingRecord?.evaluation.isFullyCorrect
            ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-[0_0_32px_rgba(16,185,129,0.25)]'
            : !isContentSlide && wrongGlowActive
            ? 'border-rose-400/75 ring-1 ring-rose-400/35 shadow-[0_0_24px_rgba(244,63,94,0.22)]'
            : 'border-white/[0.09]'
        } ${wrongShakeActive ? 'animate-subtle-shake' : ''} ${
          isPhoneView ? 'p-5' : 'p-6 sm:p-8'
        } min-h-[240px] flex flex-col justify-between`}
      >
        <div className="space-y-4">
          {/* =========================================================
              1-LINE BITE-SIZED CONTENT SLIDE (C SLIDE)
             ========================================================= */}
          {isContentSlide && !currentLesson.isBadgeBattle && (
            <div className="py-5 sm:py-8 space-y-3">
              <p
                className={`${
                  isPhoneView ? 'text-base' : 'text-base sm:text-lg'
                } font-normal text-slate-100 leading-relaxed`}
              >
                {slide.title}
              </p>

              {slide.smallNote && (
                <p className="text-xs text-slate-400 font-normal leading-relaxed pt-2 border-t border-white/10">
                  {slide.smallNote}
                </p>
              )}
            </div>
          )}

          {/* =========================================================
              TIMED MODULE 2 BADGE BATTLE SLIDE
             ========================================================= */}
          {isContentSlide &&
            currentLesson.isBadgeBattle &&
            currentLesson.badgeBattleQuestions && (
              <div className="py-2 space-y-4">
                <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-slate-900 border border-amber-400/40 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-amber-300" />
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Module 2 Boss Blitz
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 font-mono-tabular text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-white/15 text-emerald-300">
                        Cleared: {battleClearedIds.length}/
                        {currentLesson.badgeBattleQuestions.length}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                          battleSecondsLeft <= 30
                            ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                            : 'bg-slate-950/90 border-amber-400/30 text-amber-300'
                        }`}
                      >
                        <Timer className="h-3.5 w-3.5" />
                        <span>
                          {Math.floor(battleSecondsLeft / 60)}:
                          {String(battleSecondsLeft % 60).padStart(2, '0')}
                        </span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200">
                    {slide.title}
                  </p>

                  {!battleActive && !battleCompleted && (
                    <button
                      type="button"
                      onClick={startBadgeBattle}
                      className="min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="h-4 w-4 fill-current" />
                      <span>
                        {battleSecondsLeft === 0
                          ? 'Time Up — Retry Boss Blitz'
                          : 'Start Timed Boss Blitz (17 Questions)'}
                      </span>
                    </button>
                  )}

                  {battleCompleted && (
                    <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-emerald-200 text-xs sm:text-sm font-bold">
                        <Trophy className="h-5 w-5 text-amber-300 shrink-0" />
                        <span>
                          Boss Blitz Cleared! Score:{' '}
                          {battleScorePercent ?? 100}%
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={startBadgeBattle}
                        className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
                      >
                        Play Again
                      </button>
                    </div>
                  )}

                  {battleActive && battleQueue.length > 0 && (
                    <div className="rounded-2xl bg-slate-950/90 border border-white/15 p-4 space-y-3">
                      {battleStallMessage && (
                        <div className="rounded-xl bg-rose-500/20 border border-rose-400/40 px-3 py-2 text-xs font-semibold text-rose-200">
                          {battleStallMessage}
                        </div>
                      )}

                      {(() => {
                        const q = battleQueue[0];
                        return (
                          <div className="space-y-3">
                            <p className="text-xs sm:text-sm font-semibold text-white">
                              {q.prompt}
                            </p>

                            {(q.format === 'tof' || q.format === 'mc') && q.choices && (
                              <div className="space-y-2">
                                {q.choices.map((choice) => (
                                  <button
                                    key={choice.id}
                                    type="button"
                                    onClick={() =>
                                      handleAnswerBattleQuestion(choice.isCorrect)
                                    }
                                    className="w-full text-left p-3 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/10 text-xs text-slate-100 cursor-pointer"
                                  >
                                    {choice.label}
                                  </button>
                                ))}
                              </div>
                            )}

                            {q.format === 'sa' && q.choices && (
                              <div className="space-y-2.5">
                                <div className="space-y-2">
                                  {q.choices.map((choice, idx) => {
                                    const picked = battleSaPicks.includes(idx);
                                    return (
                                      <button
                                        key={choice.id}
                                        type="button"
                                        onClick={() =>
                                          setBattleSaPicks((prev) =>
                                            prev.includes(idx)
                                              ? prev.filter((i) => i !== idx)
                                              : [...prev, idx]
                                          )
                                        }
                                        className={`w-full text-left p-3 rounded-2xl border text-xs flex items-center gap-2.5 cursor-pointer ${
                                          picked
                                            ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                            : 'bg-white/8 border-white/10 text-slate-200'
                                        }`}
                                      >
                                        <span
                                          className={`h-4 w-4 rounded flex items-center justify-center border ${
                                            picked
                                              ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                                              : 'border-white/30'
                                          }`}
                                        >
                                          {picked && (
                                            <Check className="h-3 w-3 stroke-[3]" />
                                          )}
                                        </span>
                                        <span>{choice.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const expectedIndices = q.choices
                                      .map((c, idx) => (c.isCorrect ? idx : -1))
                                      .filter((idx) => idx !== -1);
                                    const isExact =
                                      battleSaPicks.length ===
                                        expectedIndices.length &&
                                      expectedIndices.every((i) =>
                                        battleSaPicks.includes(i)
                                      );
                                    handleAnswerBattleQuestion(isExact);
                                  }}
                                  className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                                >
                                  Submit Selection
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* =========================================================
              INTERACTIVE PROBLEM SLIDE (TF / MT / DD / MC / SA)
             ========================================================= */}
          {!isContentSlide && slide.options && (() => {
            const pFormat =
              slide.problemFormat ||
              (slide.type === 'select-all' ? 'sa' : 'mc');
            const attemptsUsed = existingRecord?.attemptsCount || 0;
            const isFullyCorrect = Boolean(
              existingRecord?.evaluation.isFullyCorrect
            );
            const canShowSolutionButton =
              attemptsUsed >= 2 && !isFullyCorrect;
            const isShowingSolution = Boolean(
              revealedSolutionSlides[historyKey]
            );

            return (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-300">
                      {pFormat === 'tf' && 'True or False'}
                      {pFormat === 'mt' && 'Matching'}
                      {pFormat === 'dd-bucket' && 'Sort into Categories'}
                      {pFormat === 'dd-order' && 'Put in Order'}
                      {pFormat === 'mc' && 'Multiple Choice'}
                      {pFormat === 'sa' && 'Select All That Apply'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {canShowSolutionButton && (
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedSolutionSlides((prev) => ({
                            ...prev,
                            [historyKey]: !prev[historyKey],
                          }))
                        }
                        className="px-3 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-xs font-medium text-amber-200 transition-colors cursor-pointer"
                      >
                        {isShowingSolution ? 'Hide Solution' : 'Show Solution'}
                      </button>
                    )}

                    {existingRecord && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetSingleQuestion(module.id, slide.id);
                          setSelectedIds([]);
                          setMtSelections({});
                          setDdBucketSelections({});
                          delete savedMtBySlideRef.current[historyKey];
                          delete savedBucketBySlideRef.current[historyKey];
                          delete savedOrderBySlideRef.current[historyKey];
                          setRevealedSolutionSlides((prev) => {
                            const next = { ...prev };
                            delete next[historyKey];
                            return next;
                          });
                        }}
                        className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-normal text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-sm sm:text-base font-medium text-white leading-snug">
                  {slide.questionPrompt || slide.title}
                </h2>

                {/* FORMAT 1: TRUE / FALSE STATEMENTS */}
                {pFormat === 'tf' && slide.tfStatements && (
                  <div className="space-y-2.5">
                    {slide.tfStatements.map((st) => {
                      const pickedTrue = selectedIds.includes(st.trueOptionId);
                      const pickedFalse = selectedIds.includes(
                        st.falseOptionId
                      );

                      return (
                        <div
                          key={st.id}
                          className="rounded-2xl bg-slate-900/80 border border-white/12 p-3.5 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                              {st.text}
                            </p>
                            {isShowingSolution && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                Solution: {st.isTrue ? 'True' : 'False'}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleTfPick(
                                  st.id,
                                  st.trueOptionId,
                                  st.falseOptionId,
                                  true
                                )
                              }
                              className={`min-h-[38px] rounded-full border text-xs font-medium transition-all cursor-pointer ${
                                pickedTrue
                                  ? 'bg-emerald-500/25 border-emerald-400 text-white'
                                  : 'bg-slate-950/70 border-white/12 text-slate-300 hover:text-white'
                              }`}
                            >
                              True
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleTfPick(
                                  st.id,
                                  st.trueOptionId,
                                  st.falseOptionId,
                                  false
                                )
                              }
                              className={`min-h-[38px] rounded-full border text-xs font-medium transition-all cursor-pointer ${
                                pickedFalse
                                  ? 'bg-cyan-500/25 border-cyan-400 text-white'
                                  : 'bg-slate-950/70 border-white/12 text-slate-300 hover:text-white'
                              }`}
                            >
                              False
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* FORMAT 2: MATCHING PAIRS */}
                {pFormat === 'mt' && slide.matchingPairs && (() => {
                  const uniqueRightChoices = Array.from(
                    new Set(slide.matchingPairs.map((c) => c.right))
                  );
                  return (
                    <div className="space-y-2.5">
                      {slide.matchingPairs.map((pair) => {
                        const currentVal = mtSelections[pair.id] || '';
                        return (
                          <div
                            key={pair.id}
                            className="rounded-2xl bg-slate-900/80 border border-white/12 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                          >
                            <div className="space-y-1">
                              <span className="text-xs sm:text-sm font-medium text-white block">
                                {pair.left}
                              </span>
                              {isShowingSolution && (
                                <span className="inline-block px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[11px] font-medium text-amber-300">
                                  → {pair.right}
                                </span>
                              )}
                            </div>

                            <select
                              aria-label={`Match for ${pair.left}`}
                              value={currentVal}
                              onChange={(e) =>
                                handleMtPick(
                                  pair.id,
                                  e.target.value,
                                  pair.right,
                                  pair.correctOptionId,
                                  pair.wrongOptionId
                                )
                              }
                              className="rounded-xl bg-slate-950 border border-white/20 px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none sm:max-w-[260px]"
                            >
                              <option value="">Select match...</option>
                              {uniqueRightChoices.map((choiceText, idx) => (
                                <option key={idx} value={choiceText}>
                                  {choiceText}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* FORMAT 3: DRAG/SORT INTO BUCKETS */}
                {pFormat === 'dd-bucket' && slide.ddBucketConfig && (
                  <div className="space-y-2.5">
                    {slide.ddBucketConfig.items.map((item) => {
                      const pickedCat = ddBucketSelections[item.id] || '';
                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-slate-900/80 border border-white/12 p-3.5 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-xs sm:text-sm text-slate-100">
                              {item.label}
                            </span>
                            {isShowingSolution && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                → {item.correctCategory}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {slide.ddBucketConfig!.categories.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() =>
                                  handleDdBucketPick(
                                    item.id,
                                    cat,
                                    item.correctCategory,
                                    item.correctOptionId,
                                    item.wrongOptionId
                                  )
                                }
                                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                                  pickedCat === cat
                                    ? 'bg-emerald-500/25 border-emerald-400 text-white'
                                    : 'bg-slate-950/70 border-white/12 text-slate-300 hover:text-white'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* FORMAT 4: SEQUENCE ORDER */}
                {pFormat === 'dd-order' && slide.ddOrderConfig && (
                  <div className="space-y-2">
                    {ddOrderedIds.map((itemId, idx) => {
                      const itemObj = slide.ddOrderConfig!.items.find(
                        (i) => i.id === itemId
                      );
                      if (!itemObj) return null;

                      return (
                        <div
                          key={itemObj.id}
                          className="rounded-2xl bg-slate-900/80 border border-white/12 p-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono-tabular text-xs font-semibold text-emerald-300">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm text-white block">
                                {itemObj.label}
                              </span>
                              {isShowingSolution && (
                                <span className="text-[11px] font-medium text-amber-300">
                                  Correct position: #{itemObj.correctPosition + 1}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleDdMoveOrder(idx, -1)}
                              aria-label="Move up"
                              className="p-1.5 rounded-full bg-white/8 hover:bg-white/15 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === ddOrderedIds.length - 1}
                              onClick={() => handleDdMoveOrder(idx, 1)}
                              aria-label="Move down"
                              className="p-1.5 rounded-full bg-white/8 hover:bg-white/15 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* FORMAT 5 & 6: MULTIPLE CHOICE (MC) & SELECT ALL (SA) */}
                {(pFormat === 'mc' || pFormat === 'sa') && (
                  <div className="space-y-2.5">
                    {slide.options.map((option) => {
                      const isSelected = selectedIds.includes(option.id);

                      let cardStyle =
                        'bg-slate-900/80 border-white/12 hover:border-white/30 text-slate-100';
                      if (isShowingSolution && option.isCorrect) {
                        cardStyle =
                          'bg-amber-500/15 border-amber-400 text-white';
                      } else if (isSelected) {
                        cardStyle = isFullyCorrect
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'bg-cyan-500/20 border-cyan-400 text-white';
                      }

                      return (
                        <div
                          key={option.id}
                          onClick={() => handleToggleOption(option.id)}
                          role={
                            slide.type === 'select-all' ? 'checkbox' : 'radio'
                          }
                          aria-checked={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleToggleOption(option.id);
                            }
                          }}
                          className={`rounded-2xl border p-3.5 sm:p-4 transition-all cursor-pointer select-none ${cardStyle}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                  isSelected
                                    ? 'bg-emerald-400 border-emerald-400 text-slate-950'
                                    : 'border-white/30 bg-slate-950'
                                }`}
                              >
                                {isSelected && (
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                )}
                              </div>
                              <span className="text-xs sm:text-sm font-normal leading-relaxed">
                                {option.label}
                              </span>
                            </div>

                            {isShowingSolution && option.isCorrect && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                ← Solution
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {validationMessage && (
                  <div
                    role="alert"
                    className="rounded-xl bg-rose-500/15 border border-rose-400/40 px-3.5 py-2 text-xs font-normal text-rose-200"
                  >
                    {validationMessage}
                  </div>
                )}

                <div className="pt-1 relative inline-block w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={isFullyCorrect}
                    aria-disabled={isFullyCorrect}
                    onClick={handleCheckAnswer}
                    className={`w-full sm:w-auto min-h-[42px] px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      isFullyCorrect
                        ? 'bg-emerald-500/30 text-emerald-200/75 border border-emerald-400/30 shadow-none opacity-80 cursor-default pointer-events-none'
                        : 'bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 shadow-md hover:brightness-110 cursor-pointer'
                    }`}
                  >
                    {isFullyCorrect ? 'Got it!' : 'Submit'}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (safeSlideIndex <= firstLessonSlideIdx) {
                setSubView('lessons');
              } else {
                onChangeSlideIndex(Math.max(0, safeSlideIndex - 1));
              }
            }}
            className="min-h-[42px] px-4.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back</span>
          </button>

          {currentLesson.isBadgeBattle ? (
            <button
              type="button"
              onClick={() => {
                const nextIncompleteLesson = module.lessons.find(
                  (l) =>
                    !l.isBadgeBattle &&
                    !lessonProgress.completedLessonIdSet.has(l.id)
                );
                if (nextIncompleteLesson) {
                  openLessonAtSlide(nextIncompleteLesson);
                } else if (battleCompleted) {
                  handleFinishLesson();
                } else {
                  setSubView('lessons');
                }
              }}
              className="min-h-[42px] px-5 py-2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : !isLastSlideOfLesson ? (
            <button
              type="button"
              onClick={() =>
                onChangeSlideIndex(
                  Math.min(module.slides.length - 1, safeSlideIndex + 1)
                )
              }
              className="min-h-[42px] px-5 py-2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishLesson}
              className="min-h-[42px] px-5 py-2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Finish Lesson</span>
            </button>
          )}
        </div>
      </div>

      {/* Brief "Lesson Complete" Screen/Animation before navigating back to parent Module screen */}
      {showLessonComplete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lesson ${currentLesson.number} Complete`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-page-enter"
        >
          <div className="glass-panel-elevated w-full max-w-sm rounded-[32px] p-6 sm:p-7 text-center space-y-4 border border-emerald-300/35 shadow-2xl">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-gradient-to-br from-emerald-300/30 via-teal-300/25 to-sky-300/30 border border-emerald-300/45 flex items-center justify-center shadow-lg animate-trophy-pop">
              <CheckCircle2 className="h-9 w-9 text-emerald-300" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Lesson {currentLesson.number} Complete
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug break-words">
                {currentLesson.title}
              </h3>
            </div>

            {(isFinalLessonInModule || lessonProgress.progressPercent >= 100) && (
              <div className="rounded-2xl bg-[#181B20]/95 border border-emerald-400/35 p-3 flex items-center gap-3 text-left shadow-inner">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#1E1E1E] border border-white/10 flex items-center justify-center p-0.5 overflow-hidden">
                  <ModuleBadgeFigure
                    moduleId={module.id}
                    unlocked={
                      lessonProgress.progressPercent >= 100 ||
                      lessonProgress.completedLessonsCount >=
                        lessonProgress.totalLessons
                    }
                    size="md"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Module Badge Earned
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                    {moduleTheme.badgeName}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Unlocked in your Badge Collection!
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (lessonCompleteTimerRef.current) {
                  window.clearTimeout(lessonCompleteTimerRef.current);
                }
                setShowLessonComplete(false);
                setSubView('lessons');
              }}
              className="w-full min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Back to Module</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Module Completion Celebration Modal */}
      {showCelebration && !isModuleCompleted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Module Completed Celebration"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-emerald-400/40 p-6 text-center space-y-5 shadow-2xl">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-300 via-emerald-400 to-cyan-400 p-0.5 shadow-lg">
              <div className="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-amber-300 animate-bounce" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Module Complete!</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {module.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowCelebration(false);
                onCompleteModule(module.id);
              }}
              className="w-full min-h-[46px] px-5 py-3 rounded-full bg-gradient-to-r from-emerald-300 to-sky-300 text-slate-950 text-sm font-bold shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};