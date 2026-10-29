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
  evaluateQuestionSelection,
  type AnsweredQuestionRecord,
} from '../utils/logic';

interface ModulePlayerViewProps {
  module: LearningModule;
  slideIndex: number;
  onChangeSlideIndex: (newIndex: number) => void;
  answeredQuestions: Record<string, AnsweredQuestionRecord>;
  viewedSlideIdsForModule?: string[];
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

    // Spawn sleek paper ribbons that gently blow across the visible screen
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

      // Smooth ease-out fade during the last 650ms of the 2-second breeze
      const fadeProgress =
        elapsed > 1350 ? Math.max(0, 1 - (elapsed - 1350) / 650) : 1;
      const alpha = fadeProgress * fadeProgress;

      for (const p of particles) {
        p.vx = p.vx * 0.985 + p.windX;
        p.vy = p.vy * 0.985 + 0.16; // soft air resistance + gentle gravity
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
  slideIndex,
  onChangeSlideIndex,
  answeredQuestions,
  viewedSlideIdsForModule = [],
  onSubmitAnswer,
  onResetSingleQuestion,
  onBackToModuleList,
  onCompleteModule,
  isModuleCompleted = false,
  isPhoneView = false,
  initialSubView = 'lessons',
}) => {
  const [subView, setSubView] = useState<'lessons' | 'player'>(initialSubView);

  const safeSlideIndex = Math.max(
    0,
    Math.min(module.slides.length - 1, slideIndex)
  );
  const slide: ModuleSlide = module.slides[safeSlideIndex] || module.slides[0];

  // Identify current lesson and its slice of slides within the module
  const currentLesson: ModuleLesson =
    module.lessons.find((l) => l.id === slide.lessonId) || module.lessons[0];

  const lessonSlideIndices = module.slides
    .map((s, idx) => (s.lessonId === currentLesson.id ? idx : -1))
    .filter((idx) => idx !== -1);

  const firstLessonSlideIdx = lessonSlideIndices[0] ?? 0;
  const lastLessonSlideIdx =
    lessonSlideIndices[lessonSlideIndices.length - 1] ?? module.slides.length - 1;
  const positionInLesson = Math.max(
    0,
    lessonSlideIndices.indexOf(safeSlideIndex)
  );
  const totalSlidesInLesson = lessonSlideIndices.length || 1;

  const currentLessonIdx = module.lessons.findIndex(
    (l) => l.id === currentLesson.id
  );
  const nextLesson =
    currentLessonIdx >= 0 && currentLessonIdx + 1 < module.lessons.length
      ? module.lessons[currentLessonIdx + 1]
      : null;

  const isFirstSlideOfModule = safeSlideIndex === 0;
  const isLastSlideOfModule = safeSlideIndex === module.slides.length - 1;
  const isLastSlideOfLesson = safeSlideIndex === lastLessonSlideIdx;

  const historyKey = getQuestionHistoryKey(module.id, slide.id);
  const existingRecord = answeredQuestions[historyKey];

  const effectiveViewedSlideIds = Array.from(
    new Set([...viewedSlideIdsForModule, slide.id])
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

  // Interactive states for Matching (MT), Drag-and-Drop Bucket (DD), and Order (DD)
  const [mtSelections, setMtSelections] = useState<Record<string, string>>({});
  const [ddBucketSelections, setDdBucketSelections] = useState<
    Record<string, string>
  >({});
  const [ddOrderedIds, setDdOrderedIds] = useState<string[]>([]);

  // Persist user's exact in-progress selections per slide so submitting a wrong answer or switching slides never erases selected choices
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
  const [battleCompleted, setBattleCompleted] = useState(false);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);
  const [wrongShakeActive, setWrongShakeActive] = useState(false);
  const [wrongGlowActive, setWrongGlowActive] = useState(false);

  // Calculate regular lesson completion percentage for the 70% Badge Battle unlock rule
  const regularLessons = module.lessons.filter((l) => !l.isBadgeBattle);
  const completedRegularLessonsCount = regularLessons.filter((l) => {
    const lSlides = module.slides.filter((s) => s.lessonId === l.id);
    const lQuizSlides = lSlides.filter((s) => s.type !== 'content');
    const lSolvedCorrect = lQuizSlides.filter((q) =>
      Boolean(
        answeredQuestions[getQuestionHistoryKey(module.id, q.id)]?.evaluation
          .isFullyCorrect
      )
    ).length;
    const lViewedCount = lSlides.filter((s) =>
      effectiveViewedSlideIds.includes(s.id)
    ).length;
    return (
      lSlides.length > 0 &&
      lViewedCount === lSlides.length &&
      lSolvedCorrect === lQuizSlides.length
    );
  }).length;
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

  // Scroll to top when changing slide, lesson, or subView
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

  // Reset confetti and wrong-answer glow when navigating to a different slide or module
  useEffect(() => {
    setConfettiBurstKey(0);
    setWrongShakeActive(false);
    setWrongGlowActive(false);
  }, [slide.id, module.id]);

  // Sync problem interactive states ONLY when navigating to a different slide
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

    // Initialize Matching (MT)
    if (slide.problemFormat === 'mt' && slide.matchingPairs) {
      const savedMt = savedMtBySlideRef.current[historyKey];
      if (savedMt && Object.keys(savedMt).length > 0 && existingRecord) {
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

    // Initialize Drag/Sort Bucket (DD)
    if (slide.problemFormat === 'dd-bucket' && slide.ddBucketConfig) {
      const savedBucket = savedBucketBySlideRef.current[historyKey];
      if (
        savedBucket &&
        Object.keys(savedBucket).length > 0 &&
        existingRecord
      ) {
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

    // Initialize Sequence Order (DD)
    if (slide.problemFormat === 'dd-order' && slide.ddOrderConfig) {
      const items = slide.ddOrderConfig.items;
      const savedOrder = savedOrderBySlideRef.current[historyKey];
      if (existingRecord?.evaluation.isFullyCorrect) {
        const sorted = [...items]
          .sort((a, b) => a.correctPosition - b.correctPosition)
          .map((i) => i.id);
        setDdOrderedIds(sorted);
      } else if (savedOrder && savedOrder.length === items.length && existingRecord) {
        setDdOrderedIds(savedOrder);
      } else {
        // Deterministically scramble so it doesn't start already solved
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
        // Sync selectedIds for initial order
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.id, historyKey]);

  // Badge Battle countdown timer
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
        setBattleCompleted(true);
        setBattleActive(false);
      }
    } else {
      // Missed question gets a 5s time penalty and cycles back later
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
    statementId: string,
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

    // Check if the submitted selection is fully correct to trigger the 2-second confetti breeze or subtle wrong shake/red glow
    if (slide.options) {
      const evalResult = evaluateQuestionSelection(slide.options, selectedIds);
      if (evalResult.isFullyCorrect) {
        setWrongGlowActive(false);
        setWrongShakeActive(false);
        // Hide any open side solution hints once solved
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
    setShowLessonComplete(true);
    triggerConfettiBreeze();
    if (lessonCompleteTimerRef.current) {
      window.clearTimeout(lessonCompleteTimerRef.current);
    }
    lessonCompleteTimerRef.current = window.setTimeout(() => {
      setShowLessonComplete(false);
      setSubView('lessons');
    }, 1650);
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

  // =========================================================
  // LEVEL 2: MODULE OVERVIEW & LESSON SELECTOR VIEW (Low-Text, Welcoming)
  // =========================================================
  if (subView === 'lessons') {
    const progressPercent = Math.round(
      (completionGate.viewedSlidesCount /
        Math.max(1, completionGate.totalSlidesCount)) *
        100
    );

    return (
      <div ref={playerTopRef} className="space-y-4 sm:space-y-5">
        {/* Top Module Header Card (Short Title Only — No Description Clutter or +XP Badge) */}
        <div className="glass-panel-elevated rounded-3xl p-4 sm:p-6 border border-white/15 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onBackToModuleList}
              className="min-h-[38px] px-3.5 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/14 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Modules</span>
            </button>

            <div className="flex items-center gap-2">
              {isModuleCompleted ? (
                <span className="px-3 py-1 rounded-2xl bg-emerald-500/20 border border-emerald-400/35 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Completed</span>
                </span>
              ) : completionGate.canComplete ? (
                <button
                  type="button"
                  onClick={() => setShowCelebration(true)}
                  className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-300 to-teal-300 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Complete Module</span>
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/25 via-sky-400/20 to-indigo-400/25 border border-white/20 text-emerald-300 shadow-inner">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {module.title}
              </h1>
            </div>
          </div>

          {/* Clean Visual Progress Bar */}
          <div className="h-2.5 w-full rounded-full bg-slate-950/70 border border-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 transition-all duration-300"
              style={{
                width: `${Math.max(progressPercent, progressPercent > 0 ? 4 : 0)}%`,
              }}
            />
          </div>
        </div>

        {/* Single-Column Lesson List (Minimalist & Intuitive) */}
        <div className="space-y-2.5">
          <div className="flex items-center px-1">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-emerald-300" />
              <span>Lessons</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {module.lessons.map((lesson) => {
              const lSlides = module.slides.filter(
                (s) => s.lessonId === lesson.id
              );
              const lQuizSlides = lSlides.filter((s) => s.type !== 'content');
              const lSolvedCorrect = lQuizSlides.filter((q) => {
                const rec =
                  answeredQuestions[getQuestionHistoryKey(module.id, q.id)];
                return Boolean(rec?.evaluation.isFullyCorrect);
              }).length;
              const lViewedCount = lSlides.filter((s) =>
                effectiveViewedSlideIds.includes(s.id)
              ).length;
              const isLessonDone =
                lViewedCount === lSlides.length &&
                lSolvedCorrect === lQuizSlides.length;

              const isBattleLocked =
                Boolean(lesson.isBadgeBattle) && !isBadgeBattleUnlocked;

              return (
                <button
                  key={lesson.id}
                  type="button"
                  disabled={isBattleLocked}
                  onClick={() => openLessonAtSlide(lesson)}
                  className={`w-full text-left glass-panel rounded-3xl p-3.5 sm:p-4 border transition-all flex items-center justify-between gap-3 ${
                    isBattleLocked
                      ? 'border-white/10 bg-slate-950/50 opacity-75 cursor-not-allowed'
                      : lesson.isBadgeBattle
                      ? 'border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-slate-900/80 to-rose-500/15 hover:border-amber-400 cursor-pointer'
                      : isLessonDone
                      ? 'border-emerald-400/35 hover:border-emerald-400/60 cursor-pointer'
                      : 'border-white/14 hover:border-sky-300/50 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-semibold ${
                        isBattleLocked
                          ? 'bg-white/8 text-slate-400 border border-white/10'
                          : lesson.isBadgeBattle
                          ? 'bg-amber-300 text-slate-950 shadow-sm'
                          : isLessonDone
                          ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/35'
                          : 'bg-white/10 text-sky-300 border border-white/15'
                      }`}
                    >
                      {lesson.isBadgeBattle ? (
                        <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
                      ) : isLessonDone ? (
                        <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                      ) : (
                        <span>{lesson.number}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-white truncate">
                        {lesson.title}
                      </h3>
                      {isBattleLocked && (
                        <p className="text-[11px] text-amber-300/90 mt-0.5">
                          Unlock at 70% ({regularLessonsCompletionPercent}%/70%)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isBattleLocked ? (
                      <span className="p-2 rounded-2xl bg-white/8 border border-white/10 text-amber-300 flex items-center justify-center">
                        <Lock className="h-4 w-4" />
                      </span>
                    ) : isLessonDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    ) : (
                      <span className="p-2 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
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

      {/* Clean Lesson Header (No slide number or progress indicator) */}
      <div className="glass-panel rounded-3xl p-3 sm:p-4 border border-white/14 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setSubView('lessons')}
          className="min-h-[36px] px-3.5 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/14 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Lessons</span>
        </button>

        <span className="text-xs sm:text-sm font-semibold text-white truncate">
          {currentLesson.title}
        </span>
      </div>

      {/* Main Slide Card (Glows emerald green when right, subtle red glow + gentle shake when wrong) */}
      <div
        className={`glass-panel-elevated rounded-3xl border transition-all duration-300 ${
          !isContentSlide && existingRecord?.evaluation.isFullyCorrect
            ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-[0_0_32px_rgba(16,185,129,0.25)]'
            : !isContentSlide && wrongGlowActive
            ? 'border-rose-400/75 ring-1 ring-rose-400/35 shadow-[0_0_24px_rgba(244,63,94,0.22)]'
            : 'border-white/15'
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
                        Module 2 Lightning Badge Battle
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 font-mono-tabular text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-white/15 text-emerald-300">
                        Cleared: {battleClearedIds.length}/
                        {currentLesson.badgeBattleQuestions.length}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
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
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="h-4 w-4 fill-current" />
                      <span>
                        {battleSecondsLeft === 0
                          ? 'Time Up — Retry Badge Battle'
                          : 'Start Timed Badge Battle (17 Questions)'}
                      </span>
                    </button>
                  )}

                  {battleCompleted && (
                    <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/40 p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-emerald-200 text-xs sm:text-sm font-bold">
                        <Trophy className="h-5 w-5 text-amber-300 shrink-0" />
                        <span>
                          All 17 Badge Battle questions cleared! Proceed to the
                          Final Boss on the next slide.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={startBadgeBattle}
                        className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white shrink-0 cursor-pointer"
                      >
                        Replay
                      </button>
                    </div>
                  )}
                </div>

                {battleActive && battleQueue.length > 0 && (() => {
                  const q = battleQueue[0];
                  return (
                    <div className="rounded-2xl bg-slate-950/90 border border-white/15 p-4 sm:p-5 space-y-3.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-amber-300">
                          {q.lessonLabel}
                        </span>
                        <span className="font-mono-tabular">
                          {battleQueue.length} remaining in queue
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-white">
                        {q.prompt}
                      </p>

                      {battleStallMessage ? (
                        <div className="rounded-xl bg-rose-500/20 border border-rose-400 p-4 text-xs sm:text-sm font-bold text-rose-200 flex items-center gap-2 animate-pulse">
                          <AlertCircle className="h-4 w-4 shrink-0 text-rose-300" />
                          <span>{battleStallMessage}</span>
                        </div>
                      ) : q.format === 'sa' ? (
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
                                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between cursor-pointer ${
                                  picked
                                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                    : 'bg-slate-900 border-white/10 text-slate-200'
                                }`}
                              >
                                <span>{choice.label}</span>
                                {picked && <Check className="h-4 w-4 text-cyan-300" />}
                              </button>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => {
                              const expected = q.choices
                                .map((c, idx) => (c.isCorrect ? idx : -1))
                                .filter((idx) => idx !== -1)
                                .sort();
                              const actual = [...battleSaPicks].sort();
                              const match =
                                expected.length === actual.length &&
                                expected.every((v, i) => v === actual[i]);
                              handleAnswerBattleQuestion(match);
                            }}
                            className="mt-2 px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                          >
                            Submit Selection
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.choices.map((choice) => (
                            <button
                              key={choice.id}
                              type="button"
                              onClick={() =>
                                handleAnswerBattleQuestion(choice.isCorrect)
                              }
                              className="p-3.5 rounded-xl bg-slate-900 hover:bg-white/10 border border-white/12 text-left text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
                            >
                              {choice.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

          {/* =========================================================
              PROBLEM SLIDE VIEW (MC, SA, TF, MT, DD-BUCKET, DD-ORDER)
             ========================================================= */}
          {!isContentSlide && slide.options && (() => {
            const attemptsCount = existingRecord?.attemptsCount || 0;
            const isFullyCorrect = Boolean(
              existingRecord?.evaluation.isFullyCorrect
            );
            // Only show the side answers AFTER the user clicks "Show Solution" and BEFORE they fill/solve it
            const isShowingSolution =
              !isFullyCorrect && Boolean(revealedSolutionSlides[historyKey]);
            const canOfferSolution = Boolean(
              existingRecord &&
                !isFullyCorrect &&
                attemptsCount >= 2 &&
                !isShowingSolution
            );

            const handleApplySolution = () => {
              if (!slide.options) return;
              const correctIds = slide.options
                .filter((o) => o.isCorrect)
                .map((o) => o.id);
              setSelectedIds(correctIds);
              // Clear the side solution state so the side answers disappear once filled in
              setRevealedSolutionSlides((prev) => {
                const next = { ...prev };
                delete next[historyKey];
                return next;
              });

              if (slide.problemFormat === 'mt' && slide.matchingPairs) {
                const solvedMt: Record<string, string> = {};
                slide.matchingPairs.forEach((p) => {
                  solvedMt[p.id] = p.right;
                });
                setMtSelections(solvedMt);
                savedMtBySlideRef.current[historyKey] = solvedMt;
              }
              if (slide.problemFormat === 'dd-bucket' && slide.ddBucketConfig) {
                const solvedBuckets: Record<string, string> = {};
                slide.ddBucketConfig.items.forEach((i) => {
                  solvedBuckets[i.id] = i.correctCategory;
                });
                setDdBucketSelections(solvedBuckets);
                savedBucketBySlideRef.current[historyKey] = solvedBuckets;
              }
              if (slide.problemFormat === 'dd-order' && slide.ddOrderConfig) {
                const solvedOrder = [...slide.ddOrderConfig.items]
                  .sort((a, b) => a.correctPosition - b.correctPosition)
                  .map((i) => i.id);
                setDdOrderedIds(solvedOrder);
                savedOrderBySlideRef.current[historyKey] = solvedOrder;
              }
              onSubmitAnswer(module.id, slide.id, correctIds);
              triggerConfettiBreeze();
            };

            const pFormat = slide.problemFormat || 'mc';

            return (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-normal text-slate-100 leading-relaxed">
                    {slide.questionPrompt || slide.title}
                  </h2>
                  <p className="text-xs text-cyan-300/90 mt-1 font-normal">
                    {slide.helperInstruction}
                  </p>
                </div>

                {/* Subtle Non-Exam Helper Actions */}
                {existingRecord && (!isFullyCorrect || isShowingSolution) && (
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 transition-colors ${
                      wrongGlowActive && !isShowingSolution
                        ? 'bg-rose-500/12 border-rose-400/35'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span
                      className={`text-xs font-normal ${
                        wrongGlowActive && !isShowingSolution
                          ? 'text-rose-200'
                          : 'text-slate-300'
                      }`}
                    >
                      {isShowingSolution
                        ? 'Right answers shown on the side — tap Fill Solution to fill them in.'
                        : 'That’s not quite right — please select another.'}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {canOfferSolution && (
                        <button
                          type="button"
                          onClick={() => {
                            setWrongGlowActive(false);
                            setRevealedSolutionSlides((prev) => ({
                              ...prev,
                              [historyKey]: true,
                            }));
                          }}
                          className="min-h-[32px] px-2.5 py-1 rounded-lg bg-amber-400/90 text-slate-950 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Show Solution</span>
                        </button>
                      )}

                      {isShowingSolution && (
                        <button
                          type="button"
                          onClick={() => {
                            setWrongGlowActive(false);
                            handleApplySolution();
                          }}
                          className="min-h-[32px] px-2.5 py-1 rounded-lg bg-emerald-400 text-slate-950 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Fill Solution</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          delete savedMtBySlideRef.current[historyKey];
                          delete savedBucketBySlideRef.current[historyKey];
                          delete savedOrderBySlideRef.current[historyKey];
                          setSelectedIds([]);
                          setMtSelections({});
                          setDdBucketSelections({});
                          setWrongGlowActive(false);
                          setRevealedSolutionSlides((prev) => {
                            const next = { ...prev };
                            delete next[historyKey];
                            return next;
                          });
                          onResetSingleQuestion(module.id, slide.id);
                        }}
                        className="min-h-[32px] px-2.5 py-1 rounded-lg bg-slate-950/70 border border-white/15 text-xs font-normal text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* FORMAT 1: TRUE / FALSE MULTI-STATEMENT (TF) */}
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
                          className="rounded-2xl bg-slate-950/85 border border-white/12 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
                            <p className="text-xs sm:text-sm font-normal text-slate-100">
                              {st.text}
                            </p>
                            {isShowingSolution && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                → {st.isTrue ? 'True' : 'False'}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
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
                              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                pickedTrue
                                  ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                                  : 'bg-white/5 text-slate-300 border-white/12 hover:bg-white/10'
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
                              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                pickedFalse
                                  ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                                  : 'bg-white/5 text-slate-300 border-white/12 hover:bg-white/10'
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

                {/* FORMAT 2: MATCHING PAIRS (MT) */}
                {pFormat === 'mt' && slide.matchingPairs && (
                  <div className="space-y-2.5">
                    {slide.matchingPairs.map((pair) => {
                      const currentPick = mtSelections[pair.id] || '';
                      const allRights = slide.matchingPairs!.map(
                        (p) => p.right
                      );
                      return (
                        <div
                          key={pair.id}
                          className="rounded-2xl bg-slate-950/85 border border-white/12 p-3.5 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-normal text-emerald-300">
                              {pair.left}
                            </span>
                            {isShowingSolution && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/40 text-[11px] font-medium text-amber-300">
                                → {pair.right}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {allRights.map((rText, rIdx) => {
                              const isChosen = currentPick === rText;
                              return (
                                <button
                                  key={rIdx}
                                  type="button"
                                  onClick={() =>
                                    handleMtPick(
                                      pair.id,
                                      rText,
                                      pair.right,
                                      pair.correctOptionId,
                                      pair.wrongOptionId
                                    )
                                  }
                                  className={`px-2.5 py-1.5 rounded-xl text-left text-xs font-normal border transition-all cursor-pointer ${
                                    isChosen
                                      ? 'bg-cyan-400 text-slate-950 font-medium border-cyan-300'
                                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                  }`}
                                >
                                  {rText}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* FORMAT 3: DRAG/SORT INTO CATEGORY BUCKETS (DD-BUCKET) */}
                {pFormat === 'dd-bucket' && slide.ddBucketConfig && (
                  <div className="space-y-2.5">
                    {slide.ddBucketConfig.items.map((item) => {
                      const currentCat = ddBucketSelections[item.id] || '';
                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-slate-950/85 border border-white/12 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center justify-between sm:justify-start gap-2.5">
                            <p className="text-xs sm:text-sm font-normal text-slate-100">
                              {item.label}
                            </p>
                            {isShowingSolution && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                → {item.correctCategory}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5 shrink-0">
                            {slide.ddBucketConfig!.categories.map((cat) => {
                              const active = currentCat === cat;
                              return (
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
                                  className={`px-3 py-1.5 rounded-xl text-xs font-normal border transition-all cursor-pointer ${
                                    active
                                      ? 'bg-emerald-400 text-slate-950 font-medium border-emerald-300'
                                      : 'bg-white/5 text-slate-300 border-white/12 hover:bg-white/10'
                                  }`}
                                >
                                  {cat}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* FORMAT 4: PUT STEPS IN SEQUENCE ORDER (DD-ORDER) */}
                {pFormat === 'dd-order' && slide.ddOrderConfig && (
                  <div className="space-y-2">
                    {ddOrderedIds.map((itemId, idx) => {
                      const item = slide.ddOrderConfig!.items.find(
                        (i) => i.id === itemId
                      );
                      if (!item) return null;
                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-slate-950/85 border border-white/12 p-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 font-mono-tabular text-xs font-medium text-emerald-300 flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                              <p className="text-xs sm:text-sm font-normal text-slate-100">
                                {item.label}
                              </p>
                              {isShowingSolution && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/40 text-[11px] font-medium text-amber-300 whitespace-nowrap shrink-0">
                                  → Step #{item.correctPosition + 1}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleDdMoveOrder(idx, -1)}
                              aria-label="Move step up"
                              className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === ddOrderedIds.length - 1}
                              onClick={() => handleDdMoveOrder(idx, 1)}
                              aria-label="Move step down"
                              className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 disabled:opacity-30 text-white cursor-pointer"
                            >
                              <ArrowDown className="h-4 w-4" />
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
                    onClick={handleCheckAnswer}
                    className={`w-full sm:w-auto min-h-[42px] px-6 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isFullyCorrect
                        ? 'bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.45)]'
                        : 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md hover:brightness-110'
                    }`}
                  >
                    {isFullyCorrect ? 'Got it!' : 'Submit'}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Slide Navigation Bar (No auto-start of next lesson) */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (safeSlideIndex <= firstLessonSlideIdx) {
                setSubView('lessons');
              } else {
                onChangeSlideIndex(Math.max(0, safeSlideIndex - 1));
              }
            }}
            className="min-h-[42px] px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back</span>
          </button>

          {!isLastSlideOfLesson ? (
            <button
              type="button"
              onClick={() =>
                onChangeSlideIndex(
                  Math.min(module.slides.length - 1, safeSlideIndex + 1)
                )
              }
              className="min-h-[42px] px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishLesson}
              className="min-h-[42px] px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
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
          aria-label="Lesson Complete"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xl animate-page-enter"
        >
          <div className="glass-panel-elevated w-full max-w-sm rounded-[32px] p-7 text-center space-y-4 border border-emerald-300/35 shadow-2xl">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-gradient-to-br from-emerald-300/30 via-teal-300/25 to-sky-300/30 border border-emerald-300/45 flex items-center justify-center shadow-lg animate-trophy-pop">
              <CheckCircle2 className="h-9 w-9 text-emerald-300" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Lesson Complete
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentLesson.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                if (lessonCompleteTimerRef.current) {
                  window.clearTimeout(lessonCompleteTimerRef.current);
                }
                setShowLessonComplete(false);
                setSubView('lessons');
              }}
              className="w-full min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
              className="w-full min-h-[46px] px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-300 to-sky-300 text-slate-950 text-sm font-bold shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
