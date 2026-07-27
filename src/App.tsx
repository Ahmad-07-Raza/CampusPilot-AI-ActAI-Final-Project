import React, { useState, useEffect } from 'react';
import { ActiveTab, SavedResource } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ChatView } from './components/ChatView';
import { QuizView } from './components/QuizView';
import { SummarizerView } from './components/SummarizerView';
import { AssignmentView } from './components/AssignmentView';
import { CodingView } from './components/CodingView';
import { PlannerView } from './components/PlannerView';
import { SavedView } from './components/SavedView';
import { DeveloperView } from './components/DeveloperView';
import { GraduationCap, Heart, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/developer') {
      return 'developer';
    }
    return 'overview';
  });

  const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');

  // Sync window location path when activeTab changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetPath = activeTab === 'developer' ? '/developer' : '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
  }, [activeTab]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/developer') {
        setActiveTab('developer');
      } else {
        setActiveTab('overview');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Local storage persistence for saved study resources
  const [savedResources, setSavedResources] = useState<SavedResource[]>(() => {
    try {
      const stored = localStorage.getItem('campuspilot_saved');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse saved items from localStorage:', e);
    }
    return [
      {
        id: 'sample-1',
        title: 'Quiz: Quantum Mechanics & Wavefunctions (MEDIUM)',
        type: 'quiz',
        date: new Date().toLocaleDateString(),
        data: {
          topic: 'Quantum Mechanics',
          difficulty: 'medium',
          questions: [
            {
              id: 1,
              type: 'mcq',
              question: 'What physical concept is described by the square modulus of Schrödinger wave function |Ψ|^2?',
              options: [
                'Exact momentum of the particle',
                'Probability density of finding the particle',
                'Electric potential energy',
                'Kinetic energy operator'
              ],
              correctAnswer: 'Probability density of finding the particle',
              explanation: 'In Born\'s statistical interpretation of quantum mechanics, |Ψ|^2 represents the probability density of locating the particle at a given point in space.'
            }
          ]
        }
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('campuspilot_saved', JSON.stringify(savedResources));
    } catch (e) {
      console.error('Failed to save items to localStorage:', e);
    }
  }, [savedResources]);

  const handleSaveResource = (
    title: string,
    type: 'quiz' | 'summary' | 'assignment' | 'coding' | 'plan',
    data: any
  ) => {
    const newItem: SavedResource = {
      id: `saved-${Date.now()}`,
      title,
      type,
      date: new Date().toLocaleDateString(),
      data,
    };
    setSavedResources((prev) => [newItem, ...prev]);
  };

  const handleDeleteResource = (id: string) => {
    setSavedResources((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuickAskFromDashboard = (promptText: string) => {
    setInitialChatPrompt(promptText);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedResources.length}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          activeTab={activeTab}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          setIsOpenMobile={setIsOpenMobile}
          savedCount={savedResources.length}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onQuickAsk={handleQuickAskFromDashboard}
              savedCount={savedResources.length}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView
              initialPrompt={initialChatPrompt}
              selectedCourse={selectedCourse}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizView onSaveResource={handleSaveResource} />
          )}

          {activeTab === 'summarizer' && (
            <SummarizerView onSaveResource={handleSaveResource} />
          )}

          {activeTab === 'assignment' && (
            <AssignmentView onSaveResource={handleSaveResource} />
          )}

          {activeTab === 'coding' && (
            <CodingView onSaveResource={handleSaveResource} />
          )}

          {activeTab === 'planner' && (
            <PlannerView onSaveResource={handleSaveResource} />
          )}

          {activeTab === 'saved' && (
            <SavedView
              savedResources={savedResources}
              onDeleteResource={handleDeleteResource}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'developer' && (
            <DeveloperView setActiveTab={setActiveTab} />
          )}

          {/* Footer Component */}
          <footer className="mt-12 py-8 px-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs text-xs text-slate-500 dark:text-slate-400">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">CampusPilot AI</span>
                <span>— Final Project by Ahmad Raza</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  AI Study Assistant
                </button>
                <button
                  onClick={() => setActiveTab('developer')}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>About Developer</span>
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
