import React from 'react';
import { 
  Calendar, 
  FileText, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  PlusCircle, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Briefcase, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Gavel, 
  Scale, 
  MapPin, 
  FileCheck, 
  Flame, 
  Check, 
  Activity, 
  FolderOpen 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaseStage, Priority, CaseStatus } from '../../types';

export const DashboardView: React.FC = () => {
  const { 
    t, 
    language, 
    cases, 
    tasks, 
    hearings, 
    toggleTaskStatus, 
    setSelectedCaseId, 
    setActiveTab,
    setIsCaseUpdateModalOpen
  } = useApp();

  const activeCasesList = cases.slice(0, 6);
  const pendingTasksList = tasks.filter(t => t.status !== 'Completed').slice(0, 4);

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'Urgent': return t.priorityUrgent;
      case 'High': return t.priorityHigh;
      case 'Medium': return t.priorityMedium;
      case 'Low': return t.priorityLow;
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800';
      case 'High': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800';
      default: return 'theme-control text-slate-800 dark:text-slate-200 border-app';
    }
  };

  const getStageLabel = (stage: CaseStage) => {
    switch (stage) {
      case 'Case Intake': return t.stageIntake;
      case 'Documentation': return t.stageDocumentation;
      case 'Case Analysis': return t.stageAnalysis;
      case 'Legal Strategy': return t.stageStrategy;
      case 'Hearing': return t.stageHearing;
      case 'Monitoring': return t.stageMonitoring;
    }
  };

  const getStatusLabel = (status: CaseStatus) => {
    switch (status) {
      case 'Active': return t.statusActive;
      case 'Hearing Scheduled': return t.statusHearingScheduled;
      case 'Under Review': return t.statusUnderReview;
      case 'Pending Documents': return t.statusPendingDocs;
      case 'Disposed': return t.statusDisposed;
      default: return status;
    }
  };

  const getStageBadgeClass = (stage: string) => {
    switch (stage) {
      case 'Case Intake': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'Documentation': return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
      case 'Case Analysis': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'Legal Strategy': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      case 'Hearing': return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Monitoring': return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800';
      default: return 'theme-control text-slate-700 dark:text-slate-300 border-app';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. EDITORIAL HERO & OPERATIONS BANNER */}
      <div className="relative overflow-hidden theme-hero p-6 rounded-2xl border shadow-md">
        {/* Subtle background courthouse / scale watermark illustration */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6 overflow-hidden">
          <Scale className="w-80 h-80 stroke-[0.75]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-white/15 text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Gavel className="w-3 h-3" />
                <span>{t.advocateConsole}</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-600/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t.courtListedToday}
              </span>
            </div>
            
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t.dashboardTitle}
            </h1>
            <p className="text-xs opacity-90 leading-relaxed max-w-xl">
              {t.dashboardSubtitle}
            </p>

            {/* Quick Operational Metrics Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-2xs">
                <Calendar className="w-4 h-4 text-amber-300" />
                <span className="opacity-80">{t.hearingTodayMetric}</span>
                <span className="font-bold">
                  {language === 'hi' ? 'सुबह 11:30 (तीस हजारी)' : '11:30 AM (Tis Hazari)'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-2xs">
                <FileCheck className="w-4 h-4 text-emerald-300" />
                <span className="opacity-80">{t.readyForBenchMetric}</span>
                <span className="font-bold">{t.activeDocketsCount.replace('{count}', '2')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-2xs">
                <Clock className="w-4 h-4 text-rose-300" />
                <span className="opacity-80">{t.pendingFilingMetric}</span>
                <span className="font-bold">{language === 'hi' ? '3 हलफनामे' : '3 Affidavits'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Floating Cluster */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setIsCaseUpdateModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-alt-500 hover:bg-alt-600 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] border border-alt-400/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.actionAddUpdate}</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('import')}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium border border-white/20 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.actionImportData}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCaseId('ALT-2026-104');
                  setActiveTab('ai-insights');
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/40 text-indigo-100 text-xs font-semibold border border-indigo-300/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>{t.actionOpenAI}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S FOCUS: PRIORITY ITEMS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {t.todaysPriorities}
            </h2>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-medium">{t.urgentMattersNotice}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Priority 1: Court Hearing Today */}
          <div 
            onClick={() => {
              setSelectedCaseId('ALT-2026-104');
              setActiveTab('hearings');
            }}
            className="group cursor-pointer theme-card-hearing p-4 rounded-xl border-2 shadow-2xs hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-rose-600 text-white shadow-2xs">
                <Gavel className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono animate-pulse">
                {language === 'hi' ? 'सुबह 11:30' : '11:30 AM'}
              </span>
            </div>
            
            <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-rose-600 transition-colors">
              {t.hearingTodayTitle}
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
              {t.hearingTodayDesc}
            </p>
            
            <div className="mt-3 pt-2.5 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-[11px] text-rose-800 dark:text-rose-300 font-bold">
              <span className="font-mono">ALT-2026-104 ({language === 'hi' ? 'रामेश्वर' : 'Rameshwar'})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Priority 2: Documents Pending */}
          <div 
            onClick={() => setActiveTab('documents')}
            className="group cursor-pointer theme-card p-4 rounded-xl border border-t-4 border-t-amber-500 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <FileText className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {language === 'hi' ? '3 प्रतीक्षित' : '3 Pending'}
              </span>
            </div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-alt-600 dark:group-hover:text-alt-400 transition-colors">
              {t.docsPendingTitle}
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
              {t.docsPendingDesc}
            </p>
            <div className="mt-3 pt-2.5 border-t border-app flex items-center justify-between text-[11px] text-alt-700 dark:text-alt-300 font-semibold">
              <span>{t.tabDocuments}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Priority 3: Client Briefing */}
          <div 
            onClick={() => setActiveTab('tasks')}
            className="group cursor-pointer theme-card p-4 rounded-xl border border-t-4 border-t-blue-500 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <UserCheck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {language === 'hi' ? '2 ब्रीफिंग' : '2 Briefings'}
              </span>
            </div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-alt-600 dark:group-hover:text-alt-400 transition-colors">
              {t.clientFollowupTitle}
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
              {t.clientFollowupDesc}
            </p>
            <div className="mt-3 pt-2.5 border-t border-app flex items-center justify-between text-[11px] text-alt-700 dark:text-alt-300 font-semibold">
              <span>{t.navTasks}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Priority 4: Case Update Required */}
          <div 
            onClick={() => setIsCaseUpdateModalOpen(true)}
            className="group cursor-pointer theme-card p-4 rounded-xl border border-t-4 border-t-purple-500 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                <AlertCircle className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {language === 'hi' ? '1 आदेश' : '1 Order'}
              </span>
            </div>
            <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-alt-600 dark:group-hover:text-alt-400 transition-colors">
              {t.caseUpdateTitle}
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
              {t.caseUpdateDesc}
            </p>
            <div className="mt-3 pt-2.5 border-t border-app flex items-center justify-between text-[11px] text-alt-700 dark:text-alt-300 font-semibold">
              <span>{t.actionAddUpdate}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE CASES TABLE */}
      <div className="theme-card rounded-2xl border shadow-xs overflow-hidden">
        <div className="p-4 border-b border-app flex flex-col sm:flex-row sm:items-center justify-between gap-2 theme-surface-secondary">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-alt-700 dark:text-alt-400" />
              <h2 className="text-sm font-bold text-[var(--text-primary)]">
                {t.activeCases}
              </h2>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              {language === 'hi' ? 'स्पष्ट कानूनी पदानुक्रम: मुवक्किल → अदालत → चरण → अगली तारीख → प्राथमिकता' : 'Clear legal hierarchy: Client → Court → Lifecycle Stage → Next Date → Priority'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('cases')}
            className="text-xs font-bold text-alt-700 dark:text-alt-300 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{t.viewAll} ({t.activeDocketsCount.replace('{count}', '6')})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="theme-surface-secondary border-b border-app text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">{t.caseId} &amp; {t.client}</th>
                <th className="py-3 px-4">{t.court}</th>
                <th className="py-3 px-4">{t.stage}</th>
                <th className="py-3 px-4">{t.nextDate}</th>
                <th className="py-3 px-4">{t.priority}</th>
                <th className="py-3 px-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {activeCasesList.map((c) => {
                const isDeepDive = c.id === 'ALT-2026-104';
                return (
                  <tr 
                    key={c.id} 
                    className={`hover:bg-surface-hover transition-colors group cursor-pointer ${
                      isDeepDive ? 'bg-alt-50/30 dark:bg-alt-950/30' : ''
                    }`}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setActiveTab('case-workspace');
                    }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-alt-100 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border border-alt-200 dark:border-alt-700">
                          {c.id.split('-')[2]}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)] text-xs">
                            {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] truncate max-w-xs font-medium">
                            {language === 'hi' && c.caseTypeHi ? c.caseTypeHi : c.caseType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">
                      <div className="font-semibold truncate max-w-[190px] flex items-center gap-1 text-[var(--text-primary)]">
                        <Scale className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400 shrink-0" />
                        <span>{language === 'hi' && c.courtHi ? c.courtHi : c.court}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{c.assignedAdvocate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] border ${getStageBadgeClass(c.stage)}`}>
                        <Activity className="w-3.5 h-3.5" />
                        <span>{getStageLabel(c.stage)}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{language === 'hi' && c.nextHearingDateHi ? c.nextHearingDateHi : c.nextHearingDate}</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate max-w-[180px]">
                        {language === 'hi' && c.nextHearingPurposeHi ? c.nextHearingPurposeHi : c.nextHearingPurpose}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadgeClass(c.priority)}`}>
                        {getPriorityLabel(c.priority)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCaseId(c.id);
                          setActiveTab('case-workspace');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-alt-50 dark:bg-alt-900/60 hover:bg-alt-100 dark:hover:bg-alt-800 text-alt-800 dark:text-alt-200 text-xs font-bold border border-alt-200 dark:border-alt-700 shadow-2xs transition-colors"
                      >
                        <span>{t.viewWorkspace}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. SPLIT SECTION: TODAY'S COURT DIARY & ACTIONABLE TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hearings Schedule */}
        <div className="theme-card rounded-2xl border shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-app mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  {t.upcomingHearings}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('hearings')}
                className="text-xs font-bold text-alt-700 dark:text-alt-300 hover:underline"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="space-y-3">
              {hearings.slice(0, 3).map((h) => (
                <div 
                  key={h.id}
                  onClick={() => {
                    setSelectedCaseId(h.caseId);
                    setActiveTab('hearings');
                  }}
                  className="p-3.5 rounded-xl border border-app hover:border-alt-300 dark:hover:border-alt-700 hover:bg-surface-hover transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold px-1.5 py-0.5 rounded bg-alt-50 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 border border-alt-200 dark:border-alt-700">
                        {h.caseId}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {language === 'hi' && h.clientNameHi ? h.clientNameHi : h.clientName}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      h.status === 'Today' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 animate-pulse border border-rose-200 dark:border-rose-800' : 'theme-control text-[var(--text-secondary)] border-app'
                    }`}>
                      {language === 'hi' && h.dateHi ? h.dateHi : h.date} • {language === 'hi' && h.timeHi ? h.timeHi : h.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium leading-snug">
                    {language === 'hi' && h.purposeHi ? h.purposeHi : h.purpose}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-subtle text-[10px] text-[var(--text-muted)] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Scale className="w-3 h-3 text-alt-600 dark:text-alt-400" />
                      <span>{language === 'hi' && h.courtHi ? h.courtHi : h.court}</span>
                    </span>
                    <span className="font-semibold text-[var(--text-primary)]">{h.assignedAdvocate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Pending Tasks */}
        <div className="theme-card rounded-2xl border shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-app mb-3.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  {t.pendingTasks}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-bold text-alt-700 dark:text-alt-300 hover:underline"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingTasksList.map((tsk) => (
                <div 
                  key={tsk.id}
                  className="p-3 rounded-xl border border-app theme-surface-secondary hover:bg-surface-hover transition-all flex items-start gap-3 shadow-2xs"
                >
                  <button
                    onClick={() => toggleTaskStatus(tsk.id)}
                    className="mt-0.5 p-0.5 rounded text-slate-400 hover:text-emerald-600 transition-colors"
                    title={t.markComplete}
                  >
                    <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 flex items-center justify-center"></div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                        {language === 'hi' && tsk.titleHi ? tsk.titleHi : tsk.title}
                      </p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getPriorityBadgeClass(tsk.priority)} shrink-0`}>
                        {getPriorityLabel(tsk.priority)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] text-[var(--text-muted)] pt-0.5">
                      <span className="font-mono text-alt-700 dark:text-alt-300 font-bold">{tsk.caseId}</span>
                      <span>•</span>
                      <span>{language === 'hi' && tsk.caseClientNameHi ? tsk.caseClientNameHi : tsk.caseClientName}</span>
                      <span>•</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold">{t.duePrefix} {language === 'hi' && tsk.dueDateHi ? tsk.dueDateHi : tsk.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
