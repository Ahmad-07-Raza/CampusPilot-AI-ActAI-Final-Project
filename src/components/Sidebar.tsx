import React from 'react';
import { ActiveTab } from '../types';
import {
  LayoutDashboard,
  MessageSquare,
  BrainCircuit,
  FileText,
  BookOpen,
  Code2,
  Calendar,
  BookmarkCheck,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const menuItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
      color: 'text-sky-500',
    },
    {
      id: 'chat' as ActiveTab,
      label: 'AI Study Assistant',
      icon: MessageSquare,
      badge: 'Gemini 3.6',
      color: 'text-indigo-500',
    },
    {
      id: 'quiz' as ActiveTab,
      label: 'Quiz Generator',
      icon: BrainCircuit,
      badge: 'Interactive',
      color: 'text-purple-500',
    },
    {
      id: 'assignment' as ActiveTab,
      label: 'Assignment Helper',
      icon: FileText,
      badge: null,
      color: 'text-amber-500',
    },
    {
      id: 'summarizer' as ActiveTab,
      label: 'Notes & Flashcards',
      icon: BookOpen,
      badge: 'Cards',
      color: 'text-emerald-500',
    },
    {
      id: 'coding' as ActiveTab,
      label: 'Coding Assistant',
      icon: Code2,
      badge: 'O(N) Complexity',
      color: 'text-cyan-500',
    },
    {
      id: 'planner' as ActiveTab,
      label: 'Study Planner',
      icon: Calendar,
      badge: null,
      color: 'text-rose-500',
    },
    {
      id: 'saved' as ActiveTab,
      label: 'Saved Library',
      icon: BookmarkCheck,
      badge: savedCount > 0 ? `${savedCount}` : null,
      color: 'text-blue-500',
    },
    {
      id: 'developer' as ActiveTab,
      label: 'About Developer',
      icon: UserCheck,
      badge: 'Ahmad Raza',
      color: 'text-violet-400',
    },
  ];

  const handleSelect = (id: ActiveTab) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                CampusPilot <span className="text-indigo-400 font-semibold text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">AI</span>
              </div>
              <p className="text-xs text-slate-400">Academic Co-Pilot</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Engine Status Badge */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by Gemini
            </p>
            <p className="text-[11px] text-slate-400 truncate">Academic Engine Ready</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Study Tools
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : item.color
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-indigo-700 text-indigo-100'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer / Course Selector context */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sm text-indigo-300">
              CP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">University Scholar</p>
              <p className="text-[11px] text-slate-400 truncate">Term: Fall Semester 2026</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
