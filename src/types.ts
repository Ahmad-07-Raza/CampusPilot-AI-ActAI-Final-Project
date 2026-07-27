export type ActiveTab = 'overview' | 'chat' | 'quiz' | 'assignment' | 'summarizer' | 'coding' | 'planner' | 'saved' | 'developer';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  course?: string;
  realWorldExample?: string;
}

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'true_false' | 'short';
  question: string;
  options?: string[]; // for MCQ and T/F
  correctAnswer: string;
  explanation: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface QuizResult {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  score?: number;
  total?: number;
  completedAt?: string;
}

export interface AssignmentPlan {
  title: string;
  subject: string;
  deadline: string;
  wordCount: string;
  thesisIdea: string;
  milestones: {
    phase: string;
    targetDate: string;
    tasks: string[];
  }[];
  outline: {
    section: string;
    recommendedWords: string;
    keyPoints: string[];
    researchQuestions: string[];
  }[];
  writingTips: string[];
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category?: string;
  mastered?: boolean;
}

export interface NotesSummary {
  title: string;
  executiveSummary: string;
  keyTakeaways: string[];
  importantTerms: { term: string; definition: string }[];
  keyFormulasOrRules?: string[];
  flashcards: Flashcard[];
}

export interface CodeAnalysis {
  code: string;
  language: string;
  explanation: string;
  lineByLine: { lines: string; explanation: string }[];
  timeComplexity: string;
  spaceComplexity: string;
  improvements?: string[];
  fixedCode?: string;
}

export interface ScheduleBlock {
  id: string;
  day: string; // e.g., "Monday, Oct 12"
  timeSlot: string; // e.g., "09:00 AM - 10:30 AM"
  subject: string;
  activity: string;
  durationMinutes: number;
  completed: boolean;
  notes?: string;
}

export interface StudyPlan {
  examName: string;
  examDate: string;
  totalDaysRemaining: number;
  dailyGoalHours: number;
  weeklySchedule: ScheduleBlock[];
  keyTips: string[];
}

export interface SavedResource {
  id: string;
  title: string;
  type: 'quiz' | 'summary' | 'assignment' | 'coding' | 'plan';
  date: string;
  data: any;
}
