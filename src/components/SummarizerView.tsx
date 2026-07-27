import React, { useState } from 'react';
import { NotesSummary, Flashcard } from '../types';
import {
  BookOpen,
  Sparkles,
  Bookmark,
  Check,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  List,
  Layers,
  HelpCircle
} from 'lucide-react';

interface SummarizerViewProps {
  onSaveResource: (title: string, type: 'summary', data: any) => void;
}

export const SummarizerView: React.FC<SummarizerViewProps> = ({ onSaveResource }) => {
  const [topicTitle, setTopicTitle] = useState('');
  const [notesText, setNotesText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [summaryData, setSummaryData] = useState<NotesSummary | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'terms' | 'flashcards'>('overview');

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerateSummary = async () => {
    if (!notesText.trim()) return;
    setIsLoading(true);
    setSavedSuccess(false);
    setCurrentCardIndex(0);
    setIsFlipped(false);

    try {
      const res = await fetch('/api/summarizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notesText: notesText.trim(),
          topicTitle: topicTitle.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to summarize notes.');
      }

      setSummaryData(data);
      setActiveSubTab('overview');
    } catch (err: any) {
      alert(`Error summarizing notes: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMastered = (cardId: string) => {
    setMasteredCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleSave = () => {
    if (!summaryData) return;
    onSaveResource(`Summary: ${summaryData.title}`, 'summary', summaryData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Lecture Notes & Flashcard Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste raw lecture notes, textbook chapters, or transcriptions to generate key takeaways, vocabulary, and flip-cards.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Lecture/Module Title (Optional)
            </label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="e.g. Molecular Biology - DNA Replication & Transcription"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Raw Lecture Notes / Text *
            </label>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Paste raw notes, slides text, or professor's speech transcript here..."
              rows={6}
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {notesText.trim().length > 0
              ? `${notesText.trim().split(/\s+/).length} words entered`
              : 'Paste text above to get started'}
          </span>

          <button
            onClick={handleGenerateSummary}
            disabled={!notesText.trim() || isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Processing Notes...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Generate Summary & Flashcards</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Display */}
      {summaryData && (
        <div className="space-y-6">
          {/* Header & View Switcher */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {summaryData.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {summaryData.flashcards?.length || 0} Flashcards Generated • {summaryData.importantTerms?.length || 0} Core Terms Defined
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveSubTab('overview')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                    activeSubTab === 'overview'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('terms')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                    activeSubTab === 'terms'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Key Terms</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('flashcards')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                    activeSubTab === 'flashcards'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flashcard Deck</span>
                </button>
              </div>

              <button
                onClick={handleSave}
                className="px-3 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Saved!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sub Tab 1: Executive Overview & Takeaways */}
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Executive Summary
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {summaryData.executiveSummary}
                </p>
              </div>

              {summaryData.keyTakeaways && summaryData.keyTakeaways.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Core Academic Takeaways
                  </h4>
                  <ul className="space-y-2.5">
                    {summaryData.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summaryData.keyFormulasOrRules && summaryData.keyFormulasOrRules.length > 0 && (
                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 p-6 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                    Key Formulas / Actionable Rules
                  </h4>
                  <div className="space-y-2">
                    {summaryData.keyFormulasOrRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono text-xs text-slate-800 dark:text-slate-200"
                      >
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub Tab 2: Key Terms Dictionary */}
          {activeSubTab === 'terms' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Key Terminology & Definitions
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {summaryData.importantTerms?.map((termObj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1"
                  >
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {termObj.term}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {termObj.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Tab 3: Interactive Digital Flashcard Deck */}
          {activeSubTab === 'flashcards' && summaryData.flashcards && (
            <div className="space-y-6">
              {/* Flashcard Mastery Stats */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Card {currentCardIndex + 1} of {summaryData.flashcards.length}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Mastered: {Object.values(masteredCards).filter(Boolean).length} / {summaryData.flashcards.length}
                  </span>
                </div>
              </div>

              {/* Digital Flip Card */}
              {(() => {
                const card = summaryData.flashcards[currentCardIndex];
                if (!card) return null;
                const isCardMastered = !!masteredCards[card.id];

                return (
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className={`w-full max-w-2xl h-80 rounded-3xl p-8 border cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-lg relative group ${
                        isFlipped
                          ? 'bg-slate-900 text-white border-indigo-500/80 shadow-indigo-500/10'
                          : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-emerald-500/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {card.category || 'Core Concept'} • {isFlipped ? 'BACK (DEFINITION)' : 'FRONT (TERM)'}
                        </span>

                        <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-emerald-500">
                          <RotateCw className="w-3.5 h-3.5" /> Click to Flip
                        </span>
                      </div>

                      <div className="flex-1 flex items-center justify-center text-center px-4">
                        {!isFlipped ? (
                          <h3 className="text-xl lg:text-2xl font-bold tracking-tight">
                            {card.term}
                          </h3>
                        ) : (
                          <p className="text-sm lg:text-base leading-relaxed text-slate-200">
                            {card.definition}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] text-slate-400">
                          {isFlipped ? 'Tap card to flip back to term' : 'Tap card to view answer/definition'}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMastered(card.id);
                          }}
                          className={`text-xs px-3 py-1 rounded-xl font-semibold flex items-center gap-1 transition-colors ${
                            isCardMastered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isCardMastered ? 'Mastered!' : 'Mark as Mastered'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Controls */}
                    <div className="flex items-center justify-between w-full max-w-2xl px-2">
                      <button
                        disabled={currentCardIndex === 0}
                        onClick={() => {
                          setCurrentCardIndex((prev) => Math.max(0, prev - 1));
                          setIsFlipped(false);
                        }}
                        className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>

                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Card {currentCardIndex + 1} / {summaryData.flashcards.length}
                      </span>

                      <button
                        disabled={currentCardIndex === summaryData.flashcards.length - 1}
                        onClick={() => {
                          setCurrentCardIndex((prev) =>
                            Math.min(summaryData.flashcards.length - 1, prev + 1)
                          );
                          setIsFlipped(false);
                        }}
                        className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
