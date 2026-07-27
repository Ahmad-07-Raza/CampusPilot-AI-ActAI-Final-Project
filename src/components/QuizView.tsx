import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Bookmark,
  Award,
  ChevronRight,
  BookOpen,
  Check
} from 'lucide-react';

interface QuizViewProps {
  onSaveResource: (title: string, type: 'quiz', data: any) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onSaveResource }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [customText, setCustomText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [currentQuiz, setCurrentQuiz] = useState<QuizResult | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          difficulty,
          questionCount,
          customText: customText.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate quiz.');
      }

      setCurrentQuiz({
        topic: data.topic || topic,
        difficulty: data.difficulty || difficulty,
        questions: data.questions || [],
      });
    } catch (err: any) {
      alert(`Error generating quiz: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (qId: number, option: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmitQuiz = () => {
    if (!currentQuiz) return;
    let score = 0;
    currentQuiz.questions.forEach((q) => {
      const uAns = userAnswers[q.id] || '';
      if (uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        score += 1;
      }
    });

    setCurrentQuiz((prev) =>
      prev
        ? {
            ...prev,
            score,
            total: prev.questions.length,
            completedAt: new Date().toLocaleTimeString(),
          }
        : null
    );
    setIsSubmitted(true);
  };

  const handleSaveQuiz = () => {
    if (!currentQuiz) return;
    onSaveResource(
      `Quiz: ${currentQuiz.topic} (${currentQuiz.difficulty.toUpperCase()})`,
      'quiz',
      currentQuiz
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const calculateGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 90) return { grade: 'A+', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/60' };
    if (pct >= 75) return { grade: 'A', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/60' };
    if (pct >= 60) return { grade: 'B', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/60' };
    return { grade: 'Needs Review', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/60' };
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Quiz Generator Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Interactive Quiz Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter any course module or topic to generate interactive practice questions with instant scoring.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Study Topic or Module Name *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Quantum Entanglement, Binary Search Trees, Macroeconomics IS-LM Model"
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="easy">Easy (Fundamentals)</option>
              <option value="medium">Medium (Standard Exam)</option>
              <option value="hard">Hard (Advanced Rigor)</option>
            </select>
          </div>
        </div>

        {/* Optional Custom Lecture Text */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>Optional: Paste Lecture Notes or Textbook Excerpt</span>
            <span className="text-[10px] text-slate-400">(Generates quiz strictly from your notes)</span>
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Paste raw lecture text here to build quiz questions directly from your professor's slides..."
            rows={2}
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Questions:</span>
            {[3, 5, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num)}
                className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors ${
                  questionCount === num
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerateQuiz}
            disabled={!topic.trim() || isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4" />
                <span>Generate Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Quiz Display Area */}
      {currentQuiz && (
        <div className="space-y-6">
          {/* Header & Save Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Quiz: {currentQuiz.topic}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 uppercase">
                  {currentQuiz.difficulty}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentQuiz.questions.length} Questions • Select your answers below and click "Submit Quiz".
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveQuiz}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Saved!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Save to Library</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Summary Card if Submitted */}
          {isSubmitted && currentQuiz.score !== undefined && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                  Quiz Completed
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-3xl font-extrabold">
                    {currentQuiz.score} / {currentQuiz.total}
                  </span>
                  <span className="text-lg text-slate-300 font-medium">
                    ({Math.round(((currentQuiz.score || 0) / (currentQuiz.total || 1)) * 100)}%)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Review the detailed explanations below to reinforce any missed concepts.
                </p>
              </div>

              {(() => {
                const { grade, color, bg } = calculateGrade(
                  currentQuiz.score || 0,
                  currentQuiz.total || 1
                );
                return (
                  <div className={`px-6 py-4 rounded-2xl border border-slate-700 ${bg} text-center space-y-1`}>
                    <p className="text-[10px] uppercase font-semibold text-slate-400">Target Grade</p>
                    <p className={`text-2xl font-black ${color}`}>{grade}</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Question List */}
          <div className="space-y-4">
            {currentQuiz.questions.map((q, idx) => {
              const uAns = userAnswers[q.id] || '';
              const isCorrect = uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div
                  key={q.id || idx}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 transition-all space-y-4 ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-rose-500/60 bg-rose-50/20 dark:bg-rose-950/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        Question {idx + 1} ({q.type.toUpperCase()})
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {isSubmitted && (
                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* MCQ or T/F Options */}
                  {q.options && q.options.length > 0 ? (
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isSelected = uAns === opt;
                        const isCorrectOpt = opt === q.correctAnswer;

                        let optClass =
                          'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

                        if (isSubmitted) {
                          if (isCorrectOpt) {
                            optClass =
                              'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 border-emerald-500 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optClass =
                              'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-100 border-rose-500 font-medium line-through';
                          }
                        } else if (isSelected) {
                          optClass =
                            'bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100 border-purple-500 font-semibold';
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${optClass}`}
                          >
                            <span>{opt}</span>
                            {isSelected && !isSubmitted && (
                              <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Short Answer Question */
                    <div className="space-y-2">
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={uAns}
                        onChange={(e) => handleOptionSelect(q.id, e.target.value)}
                        placeholder="Type your short answer here..."
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Explanation Section */}
                  {isSubmitted && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Correct Answer: {q.correctAnswer}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Explanation: </span>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Reset Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleGenerateQuiz}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate New Questions</span>
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <span>Submit Quiz & View Score</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setUserAnswers({});
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
