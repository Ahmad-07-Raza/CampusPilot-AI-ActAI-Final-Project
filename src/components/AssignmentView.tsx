import React, { useState } from 'react';
import { AssignmentPlan } from '../types';
import {
  FileText,
  Sparkles,
  Bookmark,
  Check,
  Calendar,
  Clock,
  Target,
  CheckCircle2,
  ListOrdered,
  BookOpen
} from 'lucide-react';

interface AssignmentViewProps {
  onSaveResource: (title: string, type: 'assignment', data: any) => void;
}

export const AssignmentView: React.FC<AssignmentViewProps> = ({ onSaveResource }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('7 Days');
  const [wordCount, setWordCount] = useState('1500 Words');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [planData, setPlanData] = useState<AssignmentPlan | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGeneratePlan = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          subject: subject.trim() || undefined,
          deadline: deadline.trim() || undefined,
          wordCount: wordCount.trim() || undefined,
          additionalDetails: additionalDetails.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate assignment plan.');
      }

      setPlanData(data);
    } catch (err: any) {
      alert(`Error generating plan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!planData) return;
    onSaveResource(`Assignment: ${planData.title}`, 'assignment', planData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Assignment & Term Project Helper
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formulate a strong thesis statement, section-by-section outline, research milestones, and drafting tips.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assignment / Paper Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Impact of Central Bank Digital Currencies on Commercial Banking"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Subject / Course Code
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. ECON 301 - Monetary Economics"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Target Deadline Timeframe
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. 7 Days, Oct 25th, 2 Weeks"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Word Count / Length
            </label>
            <input
              type="text"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              placeholder="e.g. 1500 Words, 5-7 pages"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Professor's Prompt or Specific Instructions
          </label>
          <textarea
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Paste assignment rubric, research question guidelines, or key required references..."
            rows={3}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleGeneratePlan}
            disabled={!title.trim() || isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Crafting Writing Roadmap...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Generate Assignment Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Display */}
      {planData && (
        <div className="space-y-6">
          {/* Header & Save Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {planData.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subject: {planData.subject || 'General'} • Target: {planData.wordCount} • Deadline: {planData.deadline}
              </p>
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
                  <span>Save Plan</span>
                </>
              )}
            </button>
          </div>

          {/* Core Thesis Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-6 space-y-2">
            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Recommended Core Thesis / Hypothesis
            </h4>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              "{planData.thesisIdea}"
            </p>
          </div>

          {/* Step-by-Step Milestones Timeline */}
          {planData.milestones && planData.milestones.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Execution Timeline & Milestones
              </h4>

              <div className="space-y-4">
                {planData.milestones.map((m, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {m.phase}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                          Target: {m.targetDate}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {m.tasks.map((task, tidx) => (
                          <li key={tidx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section-by-Section Outline */}
          {planData.outline && planData.outline.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <ListOrdered className="w-4 h-4" /> Paper Section Outline
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {planData.outline.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {sec.section}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        ~{sec.recommendedWords}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        Key Arguments & Points:
                      </p>
                      <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                        {sec.keyPoints.map((pt, pidx) => (
                          <li key={pidx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    {sec.researchQuestions && sec.researchQuestions.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        <span className="font-bold text-slate-600 dark:text-slate-300">Research Focus: </span>
                        {sec.researchQuestions.join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scholarly Tips */}
          {planData.writingTips && planData.writingTips.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" /> Academic Tone & Citation Best Practices
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {planData.writingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
