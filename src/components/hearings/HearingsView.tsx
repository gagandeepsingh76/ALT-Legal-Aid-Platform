import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowUpRight, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  Gavel, 
  Scale, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Hearing } from '../../types';

export const HearingsView: React.FC = () => {
  const { hearings, setSelectedCaseId, setActiveTab, t, language } = useApp();

  const [activeTab, setActiveTabFilter] = useState<'All' | 'Today' | 'This Week' | 'Upcoming'>('All');
  const [selectedHearing, setSelectedHearing] = useState<Hearing>(hearings[0]);

  const filteredHearings = hearings.filter(h => {
    if (activeTab === 'All') return true;
    return h.status === activeTab;
  });

  const getPrepLabel = (status: string) => {
    switch (status) {
      case 'Ready': return t.prepReady;
      case 'Needs Brief': return t.prepNeedsBrief;
      case 'Pending Documents': return t.prepPendingDocs;
      default: return status;
    }
  };

  const getPrepBadge = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800';
      case 'Needs Brief': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';
      case 'Pending Documents': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800';
      default: return 'theme-control text-slate-700 dark:text-slate-300 border-app';
    }
  };

  const activeRequiredDocs = language === 'hi' && selectedHearing.requiredDocumentsHi 
    ? selectedHearing.requiredDocumentsHi 
    : selectedHearing.requiredDocuments;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 theme-card p-5 rounded-2xl border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-alt-50 dark:bg-alt-900/60 text-alt-700 dark:text-alt-300 border border-alt-200 dark:border-alt-700">
              <Gavel className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              {t.hearingsTitle}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {t.courtListedToday}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {t.hearingsSubtitle}
          </p>
        </div>

        {/* Schedule Filter Tabs */}
        <div className="flex items-center gap-1 theme-control p-1 rounded-xl border self-start sm:self-auto">
          {(['All', 'Today', 'This Week', 'Upcoming'] as const).map((tab) => {
            const label = tab === 'All' ? t.all : tab === 'Today' ? t.tabToday : tab === 'This Week' ? t.tabThisWeek : t.tabUpcomingHearings;
            return (
              <button
                key={tab}
                onClick={() => setActiveTabFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-surface text-alt-800 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Master-Detail Hearings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Diary Schedule List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredHearings.map((h) => {
            const isSelected = selectedHearing.id === h.id;
            const isToday = h.status === 'Today';

            return (
              <div
                key={h.id}
                onClick={() => setSelectedHearing(h)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer theme-card shadow-xs ${
                  isSelected
                    ? 'border-alt-600 ring-2 ring-alt-100 dark:ring-alt-900'
                    : 'border-app hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-alt-50 dark:bg-alt-900/60 text-alt-900 dark:text-alt-200 border border-alt-200 dark:border-alt-700">
                      {h.caseId}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {language === 'hi' && h.clientNameHi ? h.clientNameHi : h.clientName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getPrepBadge(h.preparednessStatus)}`}>
                      {getPrepLabel(h.preparednessStatus)}
                    </span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isToday ? 'bg-rose-600 text-white animate-pulse' : 'theme-control text-slate-700 dark:text-slate-300 border border-app'
                    }`}>
                      {language === 'hi' && h.timeHi ? h.timeHi : h.time}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs text-[var(--text-primary)] font-semibold leading-snug">
                    {language === 'hi' && h.purposeHi ? h.purposeHi : h.purpose}
                  </p>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <Scale className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400 shrink-0" />
                      <span>{language === 'hi' && h.courtHi ? h.courtHi : h.court}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{language === 'hi' && h.dateHi ? h.dateHi : h.date}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-subtle flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    <span className="font-semibold">{t.hearingType}:</span> {language === 'hi' && h.hearingTypeHi ? h.hearingTypeHi : h.hearingType}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCaseId(h.caseId);
                      setActiveTab('case-workspace');
                    }}
                    className="font-bold text-alt-700 dark:text-alt-300 hover:text-alt-900 dark:hover:text-white flex items-center gap-1 text-xs"
                  >
                    <span>{t.viewWorkspace}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Selected Courtroom Brief Panel */}
        <div className="space-y-4">
          <div className="theme-card p-5 rounded-2xl border shadow-xs space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-subtle pb-3">
              <div className="flex items-center gap-2">
                <Gavel className="w-4 h-4 text-alt-700 dark:text-alt-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {t.courtroomBriefTitle}
                </h2>
              </div>
              <span className="font-mono text-xs font-extrabold text-alt-800 dark:text-alt-300 bg-alt-50 dark:bg-alt-900/60 px-2 py-0.5 rounded border border-alt-200 dark:border-alt-700">
                {selectedHearing.caseId}
              </span>
            </div>

            {/* Presiding Judge & Court info */}
            <div className="p-3 rounded-xl theme-surface-secondary border space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">{t.bench}</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {language === 'hi' && selectedHearing.benchHi ? selectedHearing.benchHi : selectedHearing.bench}
                </span>
              </div>
              <div className="pt-1.5 border-t border-subtle">
                <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">{t.court}</span>
                <span className="font-medium text-[var(--text-secondary)]">
                  {language === 'hi' && selectedHearing.courtHi ? selectedHearing.courtHi : selectedHearing.court}
                </span>
              </div>
            </div>

            {/* Hearing Purpose & Strategy Note */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                {t.hearingType}
              </span>
              <p className="font-bold text-[var(--text-primary)] bg-alt-50/60 dark:bg-alt-950/40 p-3 rounded-xl border border-alt-200 dark:border-alt-800 leading-snug">
                {language === 'hi' && selectedHearing.purposeHi ? selectedHearing.purposeHi : selectedHearing.purpose}
              </p>
            </div>

            {/* Required Courtroom Checklist */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                {t.reqCourtDocsTitle}
              </span>
              <div className="space-y-2 text-xs">
                {activeRequiredDocs.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg theme-surface-secondary border flex items-start gap-2 text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-subtle space-y-2">
              <button
                onClick={() => {
                  setSelectedCaseId(selectedHearing.caseId);
                  setActiveTab('case-workspace');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.openFullCaseWorkspaceBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setSelectedCaseId(selectedHearing.caseId);
                  setActiveTab('ai-insights');
                }}
                className="w-full py-2 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-900 dark:text-indigo-200 text-xs font-bold border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{t.synthesizeHearingArgsBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
