import React from 'react';
import { ActiveTab } from '../types';
import { Menu, BookOpenCheck, Bookmark, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: ActiveTab;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  setIsOpenMobile: (open: boolean) => void;
  savedCount: number;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  selectedCourse,
  setSelectedCourse,
  setIsOpenMobile,
  savedCount,
  setActiveTab,
}) => {
  const { theme, toggleTheme } = useTheme();

  const tabTitles: Record<ActiveTab, { title: string; subtitle: string }> = {
    overview: {
      title: 'University Dashboard',
      subtitle: 'Your central command for study tools, schedules, and AI assistance.',
    },
    chat: {
      title: 'AI Study Assistant',
      subtitle: 'Ask questions, clarify complex concepts, and explore real-world academic examples.',
    },
    quiz: {
      title: 'Interactive Quiz Generator',
      subtitle: 'Generate tailored MCQs, True/False, and short questions with instant scoring.',
    },
    assignment: {
      title: 'Assignment Helper',
      subtitle: 'Build structured essay outlines, thesis statements, and research roadmaps.',
    },
    summarizer: {
      title: 'Notes & Flashcard Engine',
      subtitle: 'Transform raw lecture notes into key takeaways, definitions, and flip cards.',
    },
    coding: {
      title: 'Programming Assistant',
      subtitle: 'Line-by-line code breakdowns, debugging, and O(N) complexity analysis.',
    },
    planner: {
      title: 'Study Schedule Planner',
      subtitle: 'AI-generated study calendars tailored to your exam dates and study capacity.',
    },
    saved: {
      title: 'Saved Study Library',
      subtitle: 'Access your saved quizzes, notes summaries, assignment plans, and schedules.',
    },
    developer: {
      title: 'About the Developer',
      subtitle: 'Meet Ahmad Raza, the creator behind CampusPilot AI.',
    },
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles.overview;

  const courses = [
    'All Courses',
    'CS 101: Data Structures',
    'MATH 201: Calculus & Linear Algebra',
    'PHYS 202: Quantum Mechanics',
    'ECON 301: Econometrics',
    'BIOL 110: Molecular Biology',
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {currentTabInfo.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {currentTabInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Course Filter Dropdown */}
        <div className="relative hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <BookOpenCheck className="w-4 h-4 text-indigo-500" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {courses.map((c) => (
              <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline text-amber-300">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden xl:inline text-indigo-600">Dark</span>
            </>
          )}
        </button>

        {/* Saved Library Quick Link */}
        <button
          onClick={() => setActiveTab('saved')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Saved Library</span>
          {savedCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px]">
              {savedCount}
            </span>
          )}
        </button>

        {/* About Developer Nav Link */}
        <button
          onClick={() => setActiveTab('developer')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'developer'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="hidden sm:inline">Developer</span>
        </button>
      </div>
    </header>
  );
};
