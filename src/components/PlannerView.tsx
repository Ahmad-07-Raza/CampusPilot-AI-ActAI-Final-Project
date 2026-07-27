import React, { useState } from 'react';
import { StudyPlan, ScheduleBlock } from '../types';
import {
  Calendar,
  Sparkles,
  Bookmark,
  Check,
  Clock,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Target,
  BookOpen
} from 'lucide-react';

interface PlannerViewProps {
  onSaveResource: (title: string, type: 'plan', data: any) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ onSaveResource }) => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [availableHours, setAvailableHours] = useState<number>(3);
  const [subjectsInput, setSubjectsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [planData, setPlanData] = useState<StudyPlan | null>(null);
  const [scheduleState, setScheduleState] = useState<ScheduleBlock[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGeneratePlan = async () => {
    if (!examName.trim() || !examDate.trim()) return;
    setIsLoading(true);
    setSavedSuccess(false);

    try {
      const subjects = subjectsInput
        ? subjectsInput.split(',').map((s) => s.trim())
        : ['Core Course'];

      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examName: examName.trim(),
          examDate: examDate.trim(),
          availableHoursPerDay: availableHours,
          subjects,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate study schedule.');
      }

      setPlanData(data);
      setScheduleState(data.weeklySchedule || []);
    } catch (err: any) {
      alert(`Error generating study plan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBlockCompleted = (id: string) => {
    setScheduleState((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, completed: !block.completed } : block
      )
    );
  };

  const handleSave = () => {
    if (!planData) return;
    const finalData = {
      ...planData,
      weeklySchedule: scheduleState,
    };
    onSaveResource(`Study Schedule: ${planData.examName}`, 'plan', finalData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const completedCount = scheduleState.filter((b) => b.completed).length;
  const progressPct =
    scheduleState.length > 0
      ? Math.round((completedCount / scheduleState.length) * 100)
      : 0;

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Planner Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Study Schedule Planner
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate balanced daily study sessions, active recall targets, and milestone deadlines for your upcoming exams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Exam / Major Milestone Name *
            </label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="e.g. CS 101 Midterm, Organic Chemistry Final"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Exam Date / Deadline *
            </label>
            <input
              type="text"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              placeholder="e.g. Oct 28th, In 14 Days"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Daily Study Capacity
            </label>
            <select
              value={availableHours}
              onChange={(e) => setAvailableHours(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value={1.5}>1.5 Hours / Day (Light)</option>
              <option value={3}>3.0 Hours / Day (Moderate)</option>
              <option value={5}>5.0 Hours / Day (Intensive)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Subjects / Modules to Cover (comma separated)
          </label>
          <input
            type="text"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            placeholder="e.g. Graph Algorithms, Dynamic Programming, Time Complexity, Tree Traversal"
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleGeneratePlan}
            disabled={!examName.trim() || !examDate.trim() || isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Calculating Schedule...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Generate Study Calendar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Schedule */}
      {planData && (
        <div className="space-y-6">
          {/* Header & Save Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{planData.examName}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                  Target: {planData.examDate}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily Goal: {planData.dailyGoalHours} hours • Progress: {completedCount} / {scheduleState.length} sessions completed ({progressPct}%)
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
                  <span>Save Calendar</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Study Completion Progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Interactive Schedule Block List */}
          <div className="space-y-3">
            {scheduleState.map((block, idx) => (
              <div
                key={block.id || idx}
                onClick={() => toggleBlockCompleted(block.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  block.completed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/50 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-500/50'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      block.completed
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    {block.completed && <Check className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {block.day}
                      </span>
                      <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-md">
                        {block.subject}
                      </span>
                    </div>

                    <p className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed ${block.completed ? 'line-through text-slate-400' : ''}`}>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Activity: </span>
                      {block.activity}
                    </p>

                    {block.notes && (
                      <p className="text-[11px] text-slate-400 italic">
                        Tip: {block.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span>{block.timeSlot || `${block.durationMinutes} mins`}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Strategy Tips */}
          {planData.keyTips && planData.keyTips.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-rose-500" /> High-Yield Exam Preparation Tips
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {planData.keyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
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
