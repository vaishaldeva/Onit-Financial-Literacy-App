import type { QuizOption } from '../utils/logic';

export type SlideType = 'content' | 'single-choice' | 'select-all';

export type ProblemFormat = 'mc' | 'sa' | 'tf' | 'mt' | 'dd-bucket' | 'dd-order';

export interface ContentTakeawayCard {
  label: string;
  metric: string;
  detail: string;
  tone: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
}

export interface TfStatementItem {
  id: string;
  text: string;
  isTrue: boolean;
  trueOptionId: string;
  falseOptionId: string;
}

export interface MatchingPairItem {
  id: string;
  left: string;
  right: string;
  correctOptionId: string;
  wrongOptionId: string;
}

export interface DdBucketItem {
  id: string;
  label: string;
  correctCategory: string;
  correctOptionId: string;
  wrongOptionId: string;
}

export interface DdOrderItem {
  id: string;
  label: string;
  correctPosition: number;
  correctOptionId: string;
  wrongOptionId: string;
}

export interface ModuleSlide {
  id: string;
  type: SlideType;
  problemFormat?: ProblemFormat;
  codeLabel?: string;
  lessonId?: string;
  lessonNumber?: number;
  lessonTitle?: string;
  badge: string;
  title: string;
  subtitle: string;
  smallNote?: string;
  heroCallout?: {
    stat: string;
    headline: string;
    description: string;
  };
  takeawayCards?: ContentTakeawayCard[];
  comparisonRows?: {
    topic: string;
    smartMove: string;
    costlyMistake: string;
  }[];
  proTip?: string;
  interactiveWidget?: 'utilization-sim' | 'hysa-sim' | 'compound-sim' | 'budget-50-30-20';
  questionPrompt?: string;
  helperInstruction?: string;
  options?: QuizOption[];
  tfStatements?: TfStatementItem[];
  matchingPairs?: MatchingPairItem[];
  ddBucketConfig?: {
    categories: string[];
    items: DdBucketItem[];
  };
  ddOrderConfig?: {
    items: DdOrderItem[];
  };
  overallTakeaway?: string;
}

export interface BadgeBattleQuestion {
  id: string;
  lessonLabel: string;
  format: 'tof' | 'mc' | 'sa';
  prompt: string;
  choices: { id: string; label: string; isCorrect: boolean }[];
}

export interface ModuleLesson {
  id: string;
  number: number;
  title: string;
  isBadgeBattle?: boolean;
  badgeBattleQuestions?: BadgeBattleQuestion[];
  slides: ModuleSlide[];
}

export interface LearningModule {
  id: string;
  numberLabel: string;
  title: string;
  category: string;
  duration: string;
  xpReward: number;
  accentColor: 'emerald' | 'cyan' | 'violet' | 'amber';
  gradientClass: string;
  heroImage: string;
  summary: string;
  keySkills: string[];
  lessons: ModuleLesson[];
  slides: ModuleSlide[];
}

export function makeCSlide(
  id: string,
  codeLabel: string,
  text: string,
  smallNote?: string
): ModuleSlide {
  return {
    id,
    type: 'content',
    codeLabel,
    badge: codeLabel,
    title: text,
    subtitle: '',
    smallNote,
  };
}

export function makeMcSlide(
  id: string,
  codeLabel: string,
  prompt: string,
  choices: string[],
  correctIndex: number,
  takeaway?: string
): ModuleSlide {
  const options: QuizOption[] = choices.map((label, idx) => ({
    id: `${id}-opt-${idx}`,
    label,
    isCorrect: idx === correctIndex,
    explanation:
      idx === correctIndex
        ? 'Correct!'
        : `Not quite — the correct answer is "${choices[correctIndex]}".`,
  }));

  return {
    id,
    type: 'single-choice',
    problemFormat: 'mc',
    codeLabel,
    badge: `${codeLabel} · MULTIPLE CHOICE`,
    title: prompt,
    subtitle: 'Tap the best answer below.',
    questionPrompt: prompt,
    helperInstruction: 'Select one answer, then tap Check Answer.',
    options,
    overallTakeaway: takeaway,
  };
}

export function makeSaSlide(
  id: string,
  codeLabel: string,
  prompt: string,
  items: { label: string; isCorrect: boolean }[],
  takeaway?: string
): ModuleSlide {
  const options: QuizOption[] = items.map((item, idx) => ({
    id: `${id}-opt-${idx}`,
    label: item.label,
    isCorrect: item.isCorrect,
    explanation: item.isCorrect
      ? 'Correct — this statement applies!'
      : 'This one does not apply.',
  }));

  return {
    id,
    type: 'select-all',
    problemFormat: 'sa',
    codeLabel,
    badge: `${codeLabel} · SELECT ALL THAT APPLY`,
    title: prompt,
    subtitle: 'Select every option that applies.',
    questionPrompt: prompt,
    helperInstruction: 'Select all correct options, then tap Check Answer.',
    options,
    overallTakeaway: takeaway,
  };
}

export function makeTfSlide(
  id: string,
  codeLabel: string,
  statements: { text: string; isTrue: boolean }[],
  takeaway?: string
): ModuleSlide {
  const tfStatements: TfStatementItem[] = [];
  const options: QuizOption[] = [];

  statements.forEach((st, idx) => {
    const sId = `${id}-tf-${idx}`;
    const trueOptionId = `${sId}-T`;
    const falseOptionId = `${sId}-F`;

    tfStatements.push({
      id: sId,
      text: st.text,
      isTrue: st.isTrue,
      trueOptionId,
      falseOptionId,
    });

    options.push({
      id: trueOptionId,
      label: `${st.text} → True`,
      isCorrect: st.isTrue,
      explanation: st.isTrue ? 'Correct! This statement is True.' : 'Actually, this statement is False.',
    });

    options.push({
      id: falseOptionId,
      label: `${st.text} → False`,
      isCorrect: !st.isTrue,
      explanation: !st.isTrue ? 'Correct! This statement is False.' : 'Actually, this statement is True.',
    });
  });

  return {
    id,
    type: 'select-all',
    problemFormat: 'tf',
    codeLabel,
    badge: `${codeLabel} · TRUE OR FALSE`,
    title: 'True or False?',
    subtitle: 'Mark each statement below as True or False.',
    questionPrompt: 'Decide whether each statement is True or False:',
    helperInstruction: 'Tap True or False for every statement, then tap Check Answer.',
    options,
    tfStatements,
    overallTakeaway: takeaway,
  };
}

export function makeMtSlide(
  id: string,
  codeLabel: string,
  prompt: string,
  pairs: { left: string; right: string }[],
  takeaway?: string
): ModuleSlide {
  const matchingPairs: MatchingPairItem[] = [];
  const options: QuizOption[] = [];

  pairs.forEach((p, idx) => {
    const pId = `${id}-mt-${idx}`;
    const correctOptionId = `${pId}-ok`;
    const wrongOptionId = `${pId}-err`;

    matchingPairs.push({
      id: pId,
      left: p.left,
      right: p.right,
      correctOptionId,
      wrongOptionId,
    });

    options.push({
      id: correctOptionId,
      label: `${p.left} → ${p.right}`,
      isCorrect: true,
      explanation: `Correct match: ${p.left} → ${p.right}`,
    });

    options.push({
      id: wrongOptionId,
      label: `${p.left} (Mismatched)`,
      isCorrect: false,
      explanation: `Should match with: ${p.right}`,
    });
  });

  return {
    id,
    type: 'select-all',
    problemFormat: 'mt',
    codeLabel,
    badge: `${codeLabel} · MATCHING`,
    title: prompt,
    subtitle: 'Match each item on the left with its partner.',
    questionPrompt: prompt,
    helperInstruction: 'Select the matching definition for each item, then tap Check Answer.',
    options,
    matchingPairs,
    overallTakeaway: takeaway,
  };
}

export function makeDdBucketSlide(
  id: string,
  codeLabel: string,
  prompt: string,
  categories: string[],
  items: { label: string; category: string }[],
  takeaway?: string
): ModuleSlide {
  const bucketItems: DdBucketItem[] = [];
  const options: QuizOption[] = [];

  items.forEach((item, idx) => {
    const itemId = `${id}-ddb-${idx}`;
    const correctOptionId = `${itemId}-ok`;
    const wrongOptionId = `${itemId}-err`;

    bucketItems.push({
      id: itemId,
      label: item.label,
      correctCategory: item.category,
      correctOptionId,
      wrongOptionId,
    });

    options.push({
      id: correctOptionId,
      label: `${item.label} → ${item.category}`,
      isCorrect: true,
      explanation: `Correct: "${item.label}" belongs in ${item.category}.`,
    });

    options.push({
      id: wrongOptionId,
      label: `${item.label} (Wrong category)`,
      isCorrect: false,
      explanation: `"${item.label}" belongs in ${item.category}.`,
    });
  });

  return {
    id,
    type: 'select-all',
    problemFormat: 'dd-bucket',
    codeLabel,
    badge: `${codeLabel} · SORT BUCKETS`,
    title: prompt,
    subtitle: `Sort each item into ${categories.join(' vs. ')}.`,
    questionPrompt: prompt,
    helperInstruction: 'Assign a category to each item below, then tap Check Answer.',
    options,
    ddBucketConfig: {
      categories,
      items: bucketItems,
    },
    overallTakeaway: takeaway,
  };
}

export function makeDdOrderSlide(
  id: string,
  codeLabel: string,
  prompt: string,
  orderedLabels: string[],
  takeaway?: string
): ModuleSlide {
  const orderItems: DdOrderItem[] = [];
  const options: QuizOption[] = [];

  orderedLabels.forEach((label, idx) => {
    const itemId = `${id}-ddo-${idx}`;
    const correctOptionId = `${itemId}-ok`;
    const wrongOptionId = `${itemId}-err`;

    orderItems.push({
      id: itemId,
      label,
      correctPosition: idx,
      correctOptionId,
      wrongOptionId,
    });

    options.push({
      id: correctOptionId,
      label: `Step ${idx + 1}: ${label}`,
      isCorrect: true,
      explanation: `Correct position: #${idx + 1} (${label}).`,
    });

    options.push({
      id: wrongOptionId,
      label: `Step ${idx + 1} misplaced (${label})`,
      isCorrect: false,
      explanation: `"${label}" should be in position #${idx + 1}.`,
    });
  });

  return {
    id,
    type: 'select-all',
    problemFormat: 'dd-order',
    codeLabel,
    badge: `${codeLabel} · PUT IN ORDER`,
    title: prompt,
    subtitle: 'Put these steps into the right order from first to last.',
    questionPrompt: prompt,
    helperInstruction: 'Tap the items in order (or use Move Up / Down), then tap Check Answer.',
    options,
    ddOrderConfig: {
      items: orderItems,
    },
    overallTakeaway: takeaway,
  };
}

export function finalizeModule(
  meta: Omit<LearningModule, 'slides'>
): LearningModule {
  const flattenedSlides: ModuleSlide[] = [];

  const enrichedLessons: ModuleLesson[] = meta.lessons.map((lesson) => {
    const enrichedSlides = lesson.slides.map((slide) => {
      const enriched: ModuleSlide = {
        ...slide,
        lessonId: lesson.id,
        lessonNumber: lesson.number,
        lessonTitle: lesson.title,
        badge: `LESSON ${lesson.number} · ${slide.codeLabel || slide.badge}`,
      };
      flattenedSlides.push(enriched);
      return enriched;
    });

    return {
      ...lesson,
      slides: enrichedSlides,
    };
  });

  return {
    ...meta,
    lessons: enrichedLessons,
    slides: flattenedSlides,
  };
}
