import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  FileText, 
  Scale, 
  Gavel, 
  User, 
  Eye, 
  X, 
  Calendar, 
  Sparkles, 
  Activity, 
  FolderOpen 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Case, CaseStage, CaseStatus, Priority } from '../../types';

export const CasesListView: React.FC = () => {
  const { cases, setSelectedCaseId, setActiveTab, t, language, setIsCaseUpdateModalOpen } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [previewCase, setPreviewCase] = useState<Case | null>(null);

  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.clientNameHi && c.clientNameHi.includes(searchTerm)) ||
      (c.courtHi && c.courtHi.includes(searchTerm));

    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesStage = selectedStage === 'All' || c.stage === selectedStage;
    const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesStage && matchesPriority;
  });

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'Urgent': return t.priorityUrgent;
      case 'High': return t.priorityHigh;
      case 'Medium': return t.priorityMedium;
      case 'Low': return t.priorityLow;
      default: return priority;
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800';
      case 'High': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800';
      default: return 'theme-control text-slate-700 dark:text-slate-300 border border-app';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'Case Intake': return t.stageIntake;
      case 'Documentation': return t.stageDocumentation;
      case 'Case Analysis': return t.stageAnalysis;
      case 'Legal Strategy': return t.stageStrategy;
      case 'Hearing': return t.stageHearing;
      case 'Monitoring': return t.stageMonitoring;
      default: return stage;
    }
  };

  const getStatusLabel = (status: string) => {
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
      default: return 'theme-control text-slate-700 dark:text-slate-300 border border-app';
    }
  };

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header with Register Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.navCases}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-alt-50 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 border border-alt-200 dark:border-alt-700">
              {t.totalRecordsCount.replace('{count}', String(filteredCases.length))}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.casesHeaderSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsCaseUpdateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.actionNewCase}</span>
        </button>
      </div>

      {/* 2. Search & Multi-Filter Controls */}
      <div className="theme-card p-4 rounded-2xl border shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchCasesPlaceholder}
              className="w-full pl-9 pr-4 py-2 theme-input rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:bg-surface transition-colors font-medium border"
            />
          </div>

          {/* Filter: Stage */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 theme-input rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold border"
            >
              <option value="All">{t.all} {t.stage}</option>
              <option value="Case Intake">{t.stageIntake}</option>
              <option value="Documentation">{t.stageDocumentation}</option>
              <option value="Case Analysis">{t.stageAnalysis}</option>
              <option value="Legal Strategy">{t.stageStrategy}</option>
              <option value="Hearing">{t.stageHearing}</option>
              <option value="Monitoring">{t.stageMonitoring}</option>
            </select>

            {/* Filter: Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 theme-input rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold border"
            >
              <option value="All">{t.all} {t.status}</option>
              <option value="Active">{t.statusActive}</option>
              <option value="Hearing Scheduled">{t.statusHearingScheduled}</option>
              <option value="Under Review">{t.statusUnderReview}</option>
              <option value="Pending Documents">{t.statusPendingDocs}</option>
            </select>

            {/* Filter: Priority */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 theme-input rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold border"
            >
              <option value="All">{t.all} {t.priority}</option>
              <option value="Urgent">{t.priorityUrgent}</option>
              <option value="High">{t.priorityHigh}</option>
              <option value="Medium">{t.priorityMedium}</option>
              <option value="Low">{t.priorityLow}</option>
            </select>
          </div>
        </div>

        {/* Featured Sample Case Highlight Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-alt-50/70 dark:bg-alt-950/40 border border-alt-200 dark:border-alt-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-alt-100 dark:bg-alt-900 text-alt-800 dark:text-alt-200 font-bold text-[10px] uppercase">
              {t.flagshipCaseTitle}
            </span>
            <span className="font-mono font-bold text-alt-900 dark:text-alt-100 theme-control px-2 py-0.5 rounded border border-app shadow-2xs">
              ALT-2026-104
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-medium hidden sm:inline">
              {language === 'hi' ? 'रामेश्वर प्रसाद (धारा 436A CrPC जमानत एवं त्वरित सुनवाई)' : 'Rameshwar Prasad (Sec 436A CrPC Bail & Speedy Trial)'}
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedCaseId('ALT-2026-104');
              setActiveTab('case-workspace');
            }}
            className="font-bold text-alt-800 dark:text-alt-300 hover:text-alt-950 dark:hover:text-white flex items-center gap-1 shrink-0"
          >
            <span>{t.openFullWorkspaceBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Cases Table with Quick Visual Scanning */}
      <div className="theme-card rounded-2xl border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="theme-surface-secondary border-b border-app text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.caseId} &amp; {t.client}</th>
                <th className="py-3.5 px-4">{t.court} &amp; {t.advocate}</th>
                <th className="py-3.5 px-4">{t.stage}</th>
                <th className="py-3.5 px-4">{t.status}</th>
                <th className="py-3.5 px-4">{t.nextDate}</th>
                <th className="py-3.5 px-4">{t.priority}</th>
                <th className="py-3.5 px-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filteredCases.map((c) => {
                const isSelected = c.id === 'ALT-2026-104';
                return (
                  <tr
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setActiveTab('case-workspace');
                    }}
                    className={`hover:bg-surface-hover transition-colors cursor-pointer group ${
                      isSelected ? 'bg-alt-50/30 dark:bg-alt-950/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-alt-100 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 flex items-center justify-center font-bold text-xs shrink-0 border border-alt-200 dark:border-alt-700 group-hover:scale-105 transition-transform">
                          {getClientInitials(c.clientName)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-alt-800 dark:text-alt-300">{c.id}</span>
                            {isSelected && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-alt-100 dark:bg-alt-900 text-alt-900 dark:text-alt-200 uppercase">
                                {t.deepDiveTag}
                              </span>
                            )}
                          </div>
                          <div className="font-bold text-slate-900 dark:text-white text-xs mt-0.5">
                            {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xs truncate font-medium">
                            {language === 'hi' && c.caseTypeHi ? c.caseTypeHi : c.caseType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400 shrink-0" />
                        <span>{language === 'hi' && c.courtHi ? c.courtHi : c.court}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{c.assignedAdvocate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border ${getStageBadgeClass(c.stage)}`}>
                        <Activity className="w-3.5 h-3.5" />
                        <span>{getStageLabel(c.stage)}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {getStatusLabel(c.status)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{language === 'hi' && c.nextHearingDateHi ? c.nextHearingDateHi : c.nextHearingDate}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                        {language === 'hi' && c.nextHearingPurposeHi ? c.nextHearingPurposeHi : c.nextHearingPurpose}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadgeClass(c.priority)}`}>
                        {getPriorityLabel(c.priority)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewCase(c);
                          }}
                          title={t.quickPeekTitle}
                          className="p-1.5 rounded-lg theme-control hover:bg-control-hover text-slate-700 dark:text-slate-300 transition-colors border border-app"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCaseId(c.id);
                            setActiveTab('case-workspace');
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-2xs transition-colors"
                        >
                          <span>{t.viewWorkspace}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12 px-4">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.noCasesFound}</p>
            <p className="text-xs text-slate-400 mt-1">{t.tryClearingFilters}</p>
          </div>
        )}
      </div>

      {/* 4. Quick Peek Drawer / Modal */}
      {previewCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="theme-surface-elevated rounded-2xl border shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-app pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-alt-50 dark:bg-alt-900/60 text-alt-900 dark:text-alt-200 border border-alt-200 dark:border-alt-700">
                  {previewCase.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'hi' && previewCase.clientNameHi ? previewCase.clientNameHi : previewCase.clientName}
                </h3>
              </div>
              <button
                onClick={() => setPreviewCase(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl theme-surface-secondary border border-app">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.caseSummary}</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium mt-1 leading-relaxed">
                  {language === 'hi' && previewCase.summaryHi ? previewCase.summaryHi : previewCase.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl theme-surface-secondary border border-app">
                  <span className="text-[10px] text-slate-400 block font-bold">{t.court}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'hi' && previewCase.courtHi ? previewCase.courtHi : previewCase.court}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800">
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-bold">{t.nextDate}</span>
                  <span className="font-bold text-rose-800 dark:text-rose-300">
                    {language === 'hi' && previewCase.nextHearingDateHi ? previewCase.nextHearingDateHi : previewCase.nextHearingDate}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200">
                <span className="text-[10px] font-bold uppercase tracking-wider block">{t.pendingRequiredAction}</span>
                <p className="font-bold mt-0.5">
                  {language === 'hi' && previewCase.pendingActionHi ? previewCase.pendingActionHi : previewCase.pendingAction}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-app">
              <button
                onClick={() => setPreviewCase(null)}
                className="px-4 py-2 text-xs font-medium theme-control hover:bg-control-hover rounded-xl transition-colors border border-app"
              >
                {t.closeBtn}
              </button>
              <button
                onClick={() => {
                  setSelectedCaseId(previewCase.id);
                  setActiveTab('case-workspace');
                  setPreviewCase(null);
                }}
                className="px-4 py-2 text-xs font-bold bg-alt-700 text-white rounded-xl shadow-xs"
              >
                {t.openFullWorkspaceBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
