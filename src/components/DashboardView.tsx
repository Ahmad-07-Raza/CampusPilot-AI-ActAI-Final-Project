import React, { useState } from 'react';
import { ActiveTab } from '../types';
import {
  MessageSquare,
  BrainCircuit,
  FileText,
  BookOpen,
  Code2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  BookMarked
} from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickAsk: (prompt: string) => void;
  savedCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onQuickAsk,
  savedCount,
}) => {
  const [quickInput, setQuickInput] = useState('');

  const tools = [
    {
      id: 'chat' as ActiveTab,
      title: 'AI Study Assistant',
      description: 'Clear explanations from beginner level to technical depth with real-world examples.',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Popular',
      example: 'Explain Fourier Transforms with a real-world signal example',
    },
    {
      id: 'quiz' as ActiveTab,
      title: 'Interactive Quiz Engine',
      description: 'Generate MCQs, True/False, and short questions with instant grading and explanations.',
      icon: BrainCircuit,
      color: 'from-purple-500 to-pink-600',
      badge: 'Interactive',
      example: 'Generate a medium difficulty quiz on Binary Search Trees',
    },
    {
      id: 'summarizer' as ActiveTab,
      title: 'Notes & Flashcard Engine',
      description: 'Condense long lectures into key takeaways, core formulas, and flip flashcards.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Study Tool',
      example: 'Summarize quantum superposition notes and create flashcards',
    },
    {
      id: 'assignment' as ActiveTab,
      title: 'Assignment Helper',
      description: 'Formulate strong thesis statements, literature outlines, and writing milestones.',
      icon: FileText,
      color: 'from-amber-500 to-orange-600',
      badge: 'Roadmaps',
      example: 'Draft a 1500-word research plan on Econometrics time-series',
    },
    {
      id: 'coding' as ActiveTab,
      title: 'Programming Assistant',
      description: 'Line-by-line algorithm walkthroughs, error debugging, and O(N) complexity analysis.',
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      badge: 'O(N) Complexity',
      example: 'Analyze complexity and debug QuickSort recursion in Python',
    },
    {
      id: 'planner' as ActiveTab,
      title: 'Study Schedule Planner',
      description: 'AI-calculated study calendars based on exam dates and available daily hours.',
      icon: Calendar,
      color: 'from-rose-500 to-red-600',
      badge: 'Schedules',
      example: 'Plan a 14-day study calendar for Calculus & Linear Algebra',
    },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onQuickAsk(quickInput.trim());
    setQuickInput('');
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CampusPilot AI Academic Workspace</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome back, Scholar 👋
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              What academic topic would you like to master today? CampusPilot AI gives you beginner-friendly insights, real-world examples, and structured study roadmaps.
            </p>
          </div>

          {/* Quick Prompt Bar */}
          <form onSubmit={handleQuickSubmit} className="pt-2">
            <div className="relative max-w-2xl flex items-center">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Ask anything (e.g. 'Explain Bayes Theorem', 'Summarize cell mitosis', 'Debug Python array code')..."
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm pl-4 pr-28 py-3.5 rounded-2xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-inner"
              />
              <button
                type="submit"
                disabled={!quickInput.trim()}
                className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 lg:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Study Momentum</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">5 Day Streak</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Interactive Engine</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Gemini 3.6</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Saved Study Items</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{savedCount} Items</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Academic Target</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Grade A Goal</p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Academic Productivity Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a specialized tool below to generate study content, quizzes, and code analyses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-xl hover:border-indigo-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span className="truncate max-w-[200px] text-[11px] text-slate-400 italic">
                    "{tool.example}"
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Quality Callout */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/60 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          CampusPilot Pedagogical Guarantee
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">1. Beginner to Advanced</span>
            Concepts are first explained in simple, intuitive language before diving into rigorous technical formulas.
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-purple-600 dark:text-purple-400 block mb-1">2. Real-World Applications</span>
            Every theoretical concept includes at least one concrete real-life scenario to anchor learning.
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">3. Algorithmic Complexity</span>
            Coding assistance explicitly breaks down Time Complexity (O(N)) and Space Complexity for algorithm mastery.
          </div>
        </div>
      </div>
    </div>
  );
};
