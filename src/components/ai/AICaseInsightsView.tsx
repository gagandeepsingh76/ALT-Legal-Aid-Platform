import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Scale, 
  ShieldCheck, 
  FileCheck, 
  Plus, 
  ExternalLink, 
  Bot, 
  Layers, 
  HelpCircle, 
  FileSearch, 
  BookOpen, 
  ArrowUpRight, 
  Shield, 
  Lightbulb, 
  Check 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAIInsights } from '../../data/mockData';

export const AICaseInsightsView: React.FC = () => {
  const { 
    selectedCase, 
    cases, 
    setSelectedCaseId, 
    setActiveTab, 
    addTask, 
    t, 
    language, 
    showToast 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'summary' | 'facts' | 'dates' | 'missing' | 'docs' | 'actions'>('summary');
  const [activeDocumentReaderTab, setActiveDocumentReaderTab] = useState<'fir' | 'intake' | 'custody'>('fir');
  const [appliedActionIdx, setAppliedActionIdx] = useState<number | null>(null);

  const insight = mockAIInsights[selectedCase.id] || mockAIInsights['ALT-2026-104'];

  const handleApplyActionToTasks = (actionTitle: string, actionTitleHi: string | undefined, idx: number) => {
    addTask({
      caseId: selectedCase.id,
      caseClientName: selectedCase.clientName,
      caseClientNameHi: selectedCase.clientNameHi,
      title: actionTitle,
      titleHi: actionTitleHi,
      dueDate: 'Today, 11:30 AM',
      dueDateHi: 'आज, सुबह 11:30 बजे',
      status: 'Pending',
      priority: 'Urgent',
      assignedTo: selectedCase.assignedAdvocate,
      category: 'Filing',
      categoryHi: 'फाइलिंग'
    });
    setAppliedActionIdx(idx);
    showToast(t.appliedSuccess);
  };

  const summaryText = language === 'hi' && insight.summaryHi ? insight.summaryHi : insight.summary;
  const factsList = language === 'hi' && insight.keyFactsHi ? insight.keyFactsHi : insight.keyFacts;
  const missingList = language === 'hi' && insight.missingInformationHi ? insight.missingInformationHi : insight.missingInformation;
  const pendingDocsList = language === 'hi' && insight.pendingDocumentsHi ? insight.pendingDocumentsHi : insight.pendingDocuments;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Hero / Header */}
      <div className="theme-hero p-6 rounded-2xl border shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-white/15 text-white border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              {t.aiTitle}
            </h1>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/25">
              {t.simulatedOutputBadge}
            </span>
          </div>
          <p className="text-xs opacity-90 max-w-xl">
            {t.aiSubtitle}
          </p>
        </div>

        {/* Case Switcher inside AI view */}
        <div className="flex items-center gap-2 bg-white/15 p-2 rounded-xl border border-white/20 self-start md:self-auto backdrop-blur-2xs">
          <span className="text-xs opacity-90 font-semibold">{t.activeRecordLabel}</span>
          <select
            value={selectedCase.id}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold theme-input border border-subtle"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} - {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Ethical AI Notice Banner */}
      <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-start gap-3 text-xs text-indigo-950 dark:text-indigo-200 shadow-2xs">
        <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-indigo-900 dark:text-indigo-200">{t.aiFrameworkNotice}: </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {t.aiDisclaimer}
          </span>
        </div>
      </div>

      {/* 3. Split Screen: Document Reader vs Structured Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Source Document Reader Extract */}
        <div className="lg:col-span-5 theme-card p-5 rounded-2xl border shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-alt-700 dark:text-alt-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {t.leftPanelTitle}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {t.ocrCompleteBadge} {t.ocrParsedRate}
              </span>
            </div>

            {/* Document Selector Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveDocumentReaderTab('fir')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  activeDocumentReaderTab === 'fir'
                    ? 'bg-alt-700 text-white shadow-2xs'
                    : 'theme-control text-slate-600 dark:text-slate-300 hover:bg-control-hover border border-app'
                }`}
              >
                {t.tabFirRemand}
              </button>
              <button
                onClick={() => setActiveDocumentReaderTab('intake')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  activeDocumentReaderTab === 'intake'
                    ? 'bg-alt-700 text-white shadow-2xs'
                    : 'theme-control text-slate-600 dark:text-slate-300 hover:bg-control-hover border border-app'
                }`}
              >
                {t.tabIntakeNotes}
              </button>
              <button
                onClick={() => setActiveDocumentReaderTab('custody')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  activeDocumentReaderTab === 'custody'
                    ? 'bg-alt-700 text-white shadow-2xs'
                    : 'theme-control text-slate-600 dark:text-slate-300 hover:bg-control-hover border border-app'
                }`}
              >
                {t.tabCustodyRecord}
              </button>
            </div>

            {/* Simulated OCR Document Viewer Canvas - intentionally styled as a terminal/document reader */}
            <div className="p-4 rounded-xl theme-surface-elevated text-slate-200 font-mono text-[11px] leading-relaxed space-y-3 min-h-[300px] border border-app shadow-inner">
              {activeDocumentReaderTab === 'fir' && (
                <div className="space-y-2">
                  <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
                    [POLICE RECORD - FIR NO. 412/2023]
                  </div>
                  <p>POLICE STATION: Rohini Sector 16</p>
                  <p>DATE OF ARREST: 14/03/2023 | SECTIONS: IPC 379/411</p>
                  <p>ACCUSED: Rameshwar Prasad s/o Late B. Prasad, Age 42</p>
                  <p className="text-slate-400">
                    "Subject apprehended near Sector 16 metro parking with suspected motor vehicle parts. No recovered weapons. First time detention."
                  </p>
                  <div className="pt-2 text-indigo-300">
                    &gt; AI Parser Highlight: Single non-heinous property charge. Maximum statutory penalty 3 years (36 months).
                  </div>
                </div>
              )}

              {activeDocumentReaderTab === 'intake' && (
                <div className="space-y-2">
                  <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
                    [FIELD INTAKE REPORT - 12/01/2026]
                  </div>
                  <p>INTERVIEWER: Sunil Kumar (Field Lead)</p>
                  <p>SURETY CANDIDATE: Elder brother (Suresh Prasad)</p>
                  <p>RESIDENCE: Verified local address with electricity bill (2018-present).</p>
                  <p className="text-slate-400">
                    "Client is sole earning member of 4. Family unable to furnish commercial surety. Willing to furnish personal bond with brother standing guarantor."
                  </p>
                </div>
              )}

              {activeDocumentReaderTab === 'custody' && (
                <div className="space-y-2">
                  <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
                    [CENTRAL JAIL NO. 4 - TIHAR CUSTODY REGISTER]
                  </div>
                  <p>ADMISSION DATE: 15/03/2023 | UT NUMBER: 2023/8892</p>
                  <p>CONTINUOUS CUSTODY: 35 Months 7 Days</p>
                  <p>CONDUCT RECORD: Satisfactory / No jail infractions</p>
                  <div className="pt-2 text-amber-300">
                    &gt; Stat Threshold Flag: Served &gt;97% of maximum 36 month sentence under charge. Sec 436A CrPC threshold is 18 months.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-subtle text-xs flex justify-between items-center text-[var(--text-muted)]">
            <span>{t.client}: {language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName}</span>
            <button
              onClick={() => setActiveTab('case-workspace')}
              className="text-alt-700 dark:text-alt-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>{t.backToCaseWorkspaceBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): Structured AI Synthesis */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Navigation Chips */}
          <div className="flex flex-wrap gap-1.5 theme-card p-2.5 rounded-2xl border shadow-xs">
            {[
              { id: 'summary', label: t.catSummary },
              { id: 'facts', label: t.catKeyFacts },
              { id: 'dates', label: t.catDates },
              { id: 'missing', label: t.catMissingInfo },
              { id: 'docs', label: t.catPendingDocs },
              { id: 'actions', label: t.catSuggestedAction }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-700 text-white shadow-2xs'
                    : 'theme-control text-slate-600 dark:text-slate-300 hover:bg-control-hover border border-app'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Panel */}
          <div className="theme-card p-6 rounded-2xl border shadow-xs space-y-5">
            {/* View 1: Summary */}
            {activeCategory === 'summary' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-sm">
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.catSummary}</span>
                </div>
                <p className="text-xs text-[var(--text-primary)] leading-relaxed font-medium bg-indigo-50/50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                  {summaryText}
                </p>
                <div className="p-3 rounded-xl theme-surface-secondary border text-xs text-[var(--text-secondary)] flex items-center justify-between">
                  <span className="font-semibold">{t.legalPrecedentLabel} Satender Kumar Antil v. CBI (2022)</span>
                  <span className="font-mono text-[11px] text-alt-700 dark:text-alt-400 font-bold">AIR 2022 SC 3386</span>
                </div>
              </div>
            )}

            {/* View 2: Key Facts */}
            {activeCategory === 'facts' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.catKeyFacts}</span>
                </div>
                <div className="space-y-2">
                  {factsList.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl theme-surface-secondary border flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Important Dates */}
            {activeCategory === 'dates' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-sm">
                  <Calendar className="w-4 h-4 text-alt-700 dark:text-alt-400" />
                  <span>{t.catDates}</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {insight.importantDates.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {language === 'hi' && item.eventHi ? item.eventHi : item.event}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {language === 'hi' && item.dateHi ? item.dateHi : item.date}
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.criticality === 'High' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300' : 'theme-control text-slate-700 dark:text-slate-300 border border-app'
                      }`}>
                        {item.criticality}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 4: Missing Information */}
            {activeCategory === 'missing' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-rose-950 dark:text-rose-200 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>{t.catMissingInfo}</span>
                </div>
                <div className="space-y-2">
                  {missingList.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-xs text-rose-950 dark:text-rose-200 font-medium">
                      <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 5: Pending Documents */}
            {activeCategory === 'docs' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-sm">
                  <FileCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.catPendingDocs}</span>
                </div>
                <div className="space-y-2">
                  {pendingDocsList.map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl theme-surface-secondary border flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-alt-700 dark:text-alt-400" />
                        <span>{doc}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        {t.pendingReview}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 6: Suggested Next Actions */}
            {activeCategory === 'actions' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.catSuggestedAction}</span>
                </div>
                <div className="space-y-3">
                  {insight.suggestedNextActions.map((action, idx) => (
                    <div key={idx} className="p-4 rounded-xl theme-surface-secondary border space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {language === 'hi' && action.titleHi ? action.titleHi : action.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-medium leading-relaxed">
                            {language === 'hi' && action.rationaleHi ? action.rationaleHi : action.rationale}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 shrink-0">
                          {language === 'hi' && action.impactHi ? action.impactHi : action.impact}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-subtle flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {t.timeframeLabel} <strong className="text-slate-700 dark:text-slate-200">{language === 'hi' && action.recommendedTimeframeHi ? action.recommendedTimeframeHi : action.recommendedTimeframe}</strong>
                        </span>
                        <button
                          onClick={() => handleApplyActionToTasks(action.title, action.titleHi, idx)}
                          disabled={appliedActionIdx === idx}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            appliedActionIdx === idx
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-700 hover:bg-indigo-800 text-white shadow-2xs'
                          }`}
                        >
                          {appliedActionIdx === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{language === 'hi' ? 'जोड़ा गया' : 'Added'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{t.applyToTasks}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
