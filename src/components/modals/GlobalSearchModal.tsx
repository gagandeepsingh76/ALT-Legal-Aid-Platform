import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, Calendar, FileText, CheckSquare, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    cases, 
    tasks, 
    hearings, 
    documents, 
    setSelectedCaseId, 
    setActiveTab, 
    t,
    language 
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const matchingCases = cases.filter(c => 
    c.clientName.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase()) ||
    c.court.toLowerCase().includes(query.toLowerCase()) ||
    (c.clientNameHi && c.clientNameHi.includes(query))
  );

  const matchingTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.caseId.toLowerCase().includes(query.toLowerCase()) ||
    (t.titleHi && t.titleHi.includes(query))
  );

  const matchingHearings = hearings.filter(h => 
    h.clientName.toLowerCase().includes(query.toLowerCase()) ||
    h.court.toLowerCase().includes(query.toLowerCase()) ||
    h.caseId.toLowerCase().includes(query.toLowerCase())
  );

  const matchingDocs = documents.filter(d => 
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.caseId.toLowerCase().includes(query.toLowerCase()) ||
    (d.titleHi && d.titleHi.includes(query))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div className="theme-surface-elevated rounded-2xl border shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-subtle flex items-center gap-3 theme-surface-secondary">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-hidden font-medium"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-surface-hover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Quick suggestions if query is empty */}
          {!query && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {t.quickJumpTitle}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedCaseId('ALT-2026-104');
                    setActiveTab('case-workspace');
                    setIsSearchModalOpen(false);
                  }}
                  className="p-3 rounded-lg border border-subtle hover:border-alt-300 dark:hover:border-alt-700 hover:bg-surface-hover text-left transition-colors"
                >
                  <div className="font-mono font-bold text-alt-700 dark:text-alt-400">ALT-2026-104</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'hi' ? 'रामेश्वर प्रसाद (धारा 436A जमानत)' : 'Rameshwar Prasad (Sec 436A Bail)'}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('import');
                    setIsSearchModalOpen(false);
                  }}
                  className="p-3 rounded-lg border border-subtle hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-surface-hover text-left transition-colors"
                >
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">{t.spreadsheetBridgeLabel}</div>
                  <div className="text-slate-600 dark:text-slate-400">{t.importFromExcelLabel}</div>
                </button>
              </div>
            </div>
          )}

          {/* Cases Results */}
          {matchingCases.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.navCases} ({matchingCases.length})
              </span>
              <div className="space-y-1">
                {matchingCases.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setActiveTab('case-workspace');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-lg hover:bg-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-alt-600 dark:text-alt-400 shrink-0" />
                      <div>
                        <span className="font-mono font-bold text-alt-700 dark:text-alt-400 mr-2">{c.id}</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">({c.court})</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Results */}
          {matchingTasks.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.navTasks} ({matchingTasks.length})
              </span>
              <div className="space-y-1">
                {matchingTasks.map(tItem => (
                  <div
                    key={tItem.id}
                    onClick={() => {
                      setActiveTab('tasks');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-lg hover:bg-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {language === 'hi' && tItem.titleHi ? tItem.titleHi : tItem.title}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">({tItem.caseId})</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">{tItem.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hearings Results */}
          {matchingHearings.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.navHearings} ({matchingHearings.length})
              </span>
              <div className="space-y-1">
                {matchingHearings.map(h => (
                  <div
                    key={h.id}
                    onClick={() => {
                      setSelectedCaseId(h.caseId);
                      setActiveTab('hearings');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-lg hover:bg-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {language === 'hi' && h.clientNameHi ? h.clientNameHi : h.clientName}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">
                          ({language === 'hi' && h.courtHi ? h.courtHi : h.court})
                        </span>
                      </div>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {language === 'hi' && h.dateHi ? h.dateHi : h.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Results */}
          {matchingDocs.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.navDocuments} ({matchingDocs.length})
              </span>
              <div className="space-y-1">
                {matchingDocs.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      setActiveTab('documents');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-lg hover:bg-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-alt-600 dark:text-alt-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {language === 'hi' && d.titleHi ? d.titleHi : d.title}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">({d.caseId})</span>
                      </div>
                    </div>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && matchingCases.length === 0 && matchingTasks.length === 0 && matchingHearings.length === 0 && matchingDocs.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="font-bold text-xs">{t.noTasksInView}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
