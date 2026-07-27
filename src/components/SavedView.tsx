import React, { useState } from 'react';
import { SavedResource, ActiveTab } from '../types';
import {
  BookmarkCheck,
  BrainCircuit,
  BookOpen,
  FileText,
  Code2,
  Calendar,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2
} from 'lucide-react';

interface SavedViewProps {
  savedResources: SavedResource[];
  onDeleteResource: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedResources,
  onDeleteResource,
  setActiveTab,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<SavedResource | null>(null);

  const filteredItems = savedResources.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'quiz':
        return <BrainCircuit className="w-5 h-5 text-purple-500" />;
      case 'summary':
        return <BookOpen className="w-5 h-5 text-emerald-500" />;
      case 'assignment':
        return <FileText className="w-5 h-5 text-amber-500" />;
      case 'coding':
        return <Code2 className="w-5 h-5 text-cyan-500" />;
      case 'plan':
        return <Calendar className="w-5 h-5 text-rose-500" />;
      default:
        return <BookmarkCheck className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Header & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Saved Study Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {savedResources.length} total study resources saved for review.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved resources..."
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'quiz', label: 'Quizzes' },
            { id: 'summary', label: 'Notes & Cards' },
            { id: 'assignment', label: 'Assignments' },
            { id: 'coding', label: 'Coding' },
            { id: 'plan', label: 'Schedules' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold border transition-all ${
                filterType === pill.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid / Details Modal */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <BookmarkCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No saved resources found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Generate quizzes, notes summaries, or study schedules in any tool and click "Save to Library" to keep them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-500/50 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIconForType(item.type)}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedResource(item)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Details
                </button>

                <button
                  onClick={() => onDeleteResource(item.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                  title="Delete from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                  {selectedResource.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 font-sans text-xs text-slate-800 dark:text-slate-200">
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl overflow-x-auto font-mono text-xs">
                {JSON.stringify(selectedResource.data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
