import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeAnalysis } from '../types';
import {
  Code2,
  Sparkles,
  Bookmark,
  Check,
  Copy,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

interface CodingViewProps {
  onSaveResource: (title: string, type: 'coding', data: any) => void;
}

export const CodingView: React.FC<CodingViewProps> = ({ onSaveResource }) => {
  const [code, setCode] = useState(`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`);

  const [language, setLanguage] = useState('python');
  const [taskType, setTaskType] = useState<'explain' | 'debug' | 'complexity' | 'optimize'>('explain');
  const [isLoading, setIsLoading] = useState(false);

  const [analysisData, setAnalysisData] = useState<CodeAnalysis | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/coding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          language,
          taskType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze code.');
      }

      setAnalysisData(data);
    } catch (err: any) {
      alert(`Error analyzing code: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!analysisData) return;
    onSaveResource(
      `Code (${language.toUpperCase()}): ${taskType.toUpperCase()}`,
      'coding',
      analysisData
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Code Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Programming & Algorithm Assistant
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Debug code, perform step-by-step algorithmic line analysis, and calculate exact Big O Time & Space Complexity.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++ 20</option>
              <option value="java">Java 17</option>
              <option value="typescript">TypeScript / JavaScript</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="sql">SQL Query</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Analysis Goal:</span>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="explain">Line-by-Line Explanation</option>
              <option value="debug">Debug & Fix Syntax/Logic Errors</option>
              <option value="complexity">Time O(N) & Space Complexity</option>
              <option value="optimize">Optimize Algorithm</option>
            </select>
          </div>
        </div>

        {/* Code Editor Box */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Source Code Snippet
            </span>
            <span>{code.split('\n').length} lines</span>
          </div>

          <div className="relative font-mono text-xs rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4 text-slate-100 shadow-inner">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste or write your code snippet here..."
              rows={8}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none resize-y font-mono leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleAnalyze}
            disabled={!code.trim() || isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Analyzing Code...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Analyze Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output */}
      {analysisData && (
        <div className="space-y-6">
          {/* Header & Badges */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Code Analysis</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 uppercase">
                  {language}
                </span>
              </h3>
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
                  <span>Save Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Big O Complexity Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Time Complexity</p>
                <p className="text-lg font-mono font-extrabold text-cyan-300">
                  {analysisData.timeComplexity}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Space Complexity</p>
                <p className="text-lg font-mono font-extrabold text-blue-300">
                  {analysisData.spaceComplexity}
                </p>
              </div>
            </div>
          </div>

          {/* High Level Explanation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              High-Level Overview
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {analysisData.explanation}
            </p>
          </div>

          {/* Line-by-Line Breakdown Table */}
          {analysisData.lineByLine && analysisData.lineByLine.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Line-by-Line Breakdown
              </h4>

              <div className="space-y-2">
                {analysisData.lineByLine.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row gap-3 text-xs"
                  >
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0 md:w-28 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-center">
                      {item.lines}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimized / Corrected Code Block */}
          {analysisData.fixedCode && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Optimized / Fixed Code Solution
                </h4>

                <button
                  onClick={() => handleCopyCode(analysisData.fixedCode!)}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-xs rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4 text-emerald-300 shadow-inner overflow-x-auto">
                <pre>{analysisData.fixedCode}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
