import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  FileCheck, 
  MessageSquare, 
  Activity, 
  Eye, 
  X, 
  Gavel, 
  Shield, 
  Layers 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaseStage, Priority, CaseStatus, DocumentItem, CaseNote } from '../../types';

export const CaseWorkspaceView: React.FC = () => {
  const { 
    selectedCase, 
    cases, 
    setSelectedCaseId, 
    setActiveTab, 
    documents, 
    tasks, 
    toggleTaskStatus, 
    t, 
    language, 
    setIsCaseUpdateModalOpen, 
    showToast 
  } = useApp();

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'notes' | 'documents' | 'tasks' | 'activity'>('overview');
  const [inspectedStage, setInspectedStage] = useState<CaseStage | null>(selectedCase.stage);

  // Initial mock notes for active case
  const initialNotes: CaseNote[] = [
    {
      id: 'NOTE-1',
      caseId: selectedCase.id,
      author: 'Adv. Priya Malhotra',
      role: 'Lead Defense Counsel',
      date: '18 Feb 2026',
      dateHi: '18 फरवरी 2026',
      category: 'Strategy Note',
      categoryHi: 'रणनीति टिप्पणी',
      content: 'Met with client at Tihar Jail Consultation Room No. 2. Confirmed client has completed 35 months in judicial custody. Filing bail application under Sec 436A CrPC / 479 BNSS.',
      contentHi: 'तिहाड़ जेल परामर्श कक्ष 2 में मुवक्किल से मुलाकात। पुष्टि की गई कि मुवक्किल ने 35 महीने पूरे कर लिए हैं।'
    },
    {
      id: 'NOTE-2',
      caseId: selectedCase.id,
      author: 'Sunil Kumar',
      role: 'Field Paralegal',
      date: '12 Feb 2026',
      dateHi: '12 फरवरी 2026',
      category: 'Investigation',
      categoryHi: 'जांच',
      content: 'Verified surety candidate (brother Suresh Prasad). Property documents & Aadhar card verified.',
      contentHi: 'जमानतदार (भाई सुरेश प्रसाद) का सत्यापन पूर्ण।'
    }
  ];

  const [localNotes, setLocalNotes] = useState<CaseNote[]>(initialNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'Strategy Note' | 'Client Interview' | 'Investigation' | 'Court Proceedings'>('Strategy Note');
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);

  const stages: { id: CaseStage; title: string; desc: string }[] = [
    { id: 'Case Intake', title: t.stageIntake, desc: t.stageDescIntake },
    { id: 'Documentation', title: t.stageDocumentation, desc: t.stageDescDoc },
    { id: 'Case Analysis', title: t.stageAnalysis, desc: t.stageDescAnalysis },
    { id: 'Legal Strategy', title: t.stageStrategy, desc: t.stageDescStrategy },
    { id: 'Hearing', title: t.stageHearing, desc: t.stageDescHearing },
    { id: 'Monitoring', title: t.stageMonitoring, desc: t.stageDescMonitoring }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === selectedCase.stage);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNoteObj: CaseNote = {
      id: `NOTE-${Date.now()}`,
      caseId: selectedCase.id,
      author: 'Adv. Priya Malhotra',
      role: 'Lead Defense Counsel',
      date: 'Today, 02:45 PM',
      dateHi: 'आज, दोपहर 02:45 बजे',
      content: newNoteText.trim(),
      category: newNoteCategory
    };

    setLocalNotes([newNoteObj, ...localNotes]);
    setNewNoteText('');
    setIsAddingNote(false);
    showToast(language === 'hi' ? 'मामला टिप्पणी सफलतापूर्वक सहेजी गई' : 'Case note saved to docket timeline');
  };

  const caseDocuments = documents.filter(d => d.caseId === selectedCase.id);
  const caseTasks = tasks.filter(t => t.caseId === selectedCase.id);

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'Urgent': return t.priorityUrgent;
      case 'High': return t.priorityHigh;
      case 'Medium': return t.priorityMedium;
      case 'Low': return t.priorityLow;
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

  const displayFacts = language === 'hi' && selectedCase.keyFactsHi 
    ? selectedCase.keyFactsHi 
    : selectedCase.keyFacts;

  const caseActivities = [
    { action: 'Bail Petition Argument Listed', actionHi: 'जमानत याचिका बहस सूचीबद्ध', user: 'Tis Hazari Court Room 14', timestamp: 'Today, 09:30 AM', timestampHi: 'आज, सुबह 09:30 बजे' },
    { action: 'Custody Certificate Attached', actionHi: 'अभिरक्षा प्रमाण पत्र संलग्न', user: 'Central Jail No. 4 Tihar', timestamp: 'Yesterday, 04:15 PM', timestampHi: 'कल, दोपहर 04:15 बजे' },
    { action: 'Sec 436A CrPC Threshold Verified', actionHi: 'धारा 436A CrPC सीमा सत्यापित', user: 'System Legal Engine', timestamp: '20 Jan 2026', timestampHi: '20 जनवरी 2026' },
    { action: 'Surety Verification Initiated', actionHi: 'जमानतदार सत्यापन प्रारंभ', user: 'Field Lead Sunil Kumar', timestamp: '14 Jan 2026', timestampHi: '14 जनवरी 2026' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP CASE CONTEXT BANNER */}
      <div className="theme-card p-6 rounded-2xl border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-alt-50 dark:bg-alt-900/60 text-alt-900 dark:text-alt-200 border border-alt-200 dark:border-alt-700">
              {selectedCase.id}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-mono">
              {t.priorityUrgent}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {t.statusActive}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full theme-control text-slate-700 dark:text-slate-300 border border-app">
              {language === 'hi' && selectedCase.caseTypeHi ? selectedCase.caseTypeHi : selectedCase.caseType}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName}
          </h1>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Scale className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400 shrink-0" />
              <span>{language === 'hi' && selectedCase.courtHi ? selectedCase.courtHi : selectedCase.court}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.advocate}: {selectedCase.assignedAdvocate}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.nextDate}: <strong className="text-rose-600 dark:text-rose-400">{language === 'hi' && selectedCase.nextHearingDateHi ? selectedCase.nextHearingDateHi : selectedCase.nextHearingDate}</strong></span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsCaseUpdateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            {t.actionAddUpdate}
          </button>
          <button
            onClick={() => setActiveTab('ai-insights')}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-900 dark:text-indigo-200 text-xs font-bold border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t.actionOpenAI}</span>
          </button>
        </div>
      </div>

      {/* 2. LIFECYCLE PROGRESS STEPPER */}
      <div className="theme-card p-5 rounded-2xl border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-alt-700 dark:text-alt-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.caseLifecycleWorkflow}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-alt-800 dark:text-alt-300 bg-alt-50 dark:bg-alt-900/60 px-2.5 py-0.5 rounded-full border border-alt-200 dark:border-alt-700">
            {t.stageProgressTemplate
              .replace('{current}', String(currentStageIndex + 1))
              .replace('{total}', String(stages.length))
              .replace('{stage}', getStageLabel(selectedCase.stage))}
          </span>
        </div>

        {/* 6-Stage Progress Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 relative">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stage.id}
                onClick={() => setInspectedStage(stage.id)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'border-alt-600 bg-alt-50/50 dark:bg-alt-950/50 shadow-xs ring-2 ring-alt-100 dark:ring-alt-900'
                    : isCompleted
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/30 hover:border-emerald-400'
                    : 'border-app theme-surface-secondary opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-alt-700 text-white animate-pulse'
                      : 'theme-control text-slate-600 dark:text-slate-300 border border-app'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    isCurrent
                      ? 'bg-alt-100 dark:bg-alt-900 text-alt-800 dark:text-alt-200'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                      : 'theme-control text-slate-600 dark:text-slate-400 border border-subtle'
                  }`}>
                    {isCurrent ? t.stageStateCurrent : isCompleted ? t.stageStatePassed : t.stageStatePending}
                  </span>
                </div>

                <div className="font-bold text-slate-900 dark:text-white text-xs truncate">
                  {stage.title}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug font-medium">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Drawer Note */}
        {inspectedStage && (
          <div className="p-3.5 rounded-xl theme-surface-secondary border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">{t.stage}: {getStageLabel(inspectedStage)}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {stages.find(s => s.id === inspectedStage)?.desc}
              </span>
            </div>
            {inspectedStage === selectedCase.stage && (
              <span className="text-[10px] font-bold text-alt-800 dark:text-alt-300 bg-alt-100 dark:bg-alt-900/60 px-2 py-0.5 rounded-md self-start sm:self-auto">
                {language === 'hi' ? 'वर्तमान में सक्रिय' : 'Currently Active'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. WORKSPACE TABBED SECTIONS */}
      <div className="theme-card rounded-2xl border shadow-xs overflow-hidden">
        {/* Workspace Navigation Tabs */}
        <div className="flex border-b border-subtle px-4 pt-2 gap-1 overflow-x-auto theme-surface-secondary">
          {[
            { id: 'overview', label: t.tabOverview, icon: FileText },
            { id: 'notes', label: `${t.tabNotes} (${localNotes.length})`, icon: MessageSquare },
            { id: 'documents', label: `${t.tabDocuments} (${caseDocuments.length})`, icon: FileCheck },
            { id: 'tasks', label: `${t.tabTasks} (${caseTasks.length})`, icon: CheckCircle2 },
            { id: 'activity', label: t.tabActivity, icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeWorkspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspaceTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-alt-700 text-alt-800 dark:text-alt-300 bg-surface rounded-t-xl shadow-2xs'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-surface-hover rounded-t-xl'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-alt-700 dark:text-alt-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeWorkspaceTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Urgent Action Callout */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    {t.pendingRequiredAction}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    {language === 'hi' && selectedCase.pendingActionHi ? selectedCase.pendingActionHi : selectedCase.pendingAction}
                  </h3>
                  <p className="text-[11px] text-amber-900 dark:text-amber-300 mt-0.5 font-medium">
                    {language === 'hi' && selectedCase.nextHearingDateHi ? selectedCase.nextHearingDateHi : selectedCase.nextHearingDate} • {language === 'hi' && selectedCase.courtHi ? selectedCase.courtHi : selectedCase.court}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCaseUpdateModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0 self-start sm:self-auto"
              >
                {t.resolveOrLog}
              </button>
            </div>

            {/* Strategic Summary & Client Profile Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Summary & Facts */}
              <div className="lg:col-span-2 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-alt-700 dark:text-alt-400" />
                    <span>{t.caseSummary}</span>
                  </h3>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium theme-surface-secondary p-4 rounded-xl border">
                    {language === 'hi' && selectedCase.summaryHi ? selectedCase.summaryHi : selectedCase.summary}
                  </p>
                </div>

                {/* Key Facts Timeline */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.keyFacts}</span>
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {t.verifiedFactsCount.replace('{count}', String(displayFacts.length))}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {displayFacts.map((fact, idx) => (
                      <div key={idx} className="p-3 rounded-xl theme-surface-secondary border flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 shadow-2xs font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conceptual AI Strategy Synthesis Card */}
                <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{t.aiLegalStrategySynthesis}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                      {t.conceptBadge}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-medium">
                    {language === 'hi' 
                      ? 'सांविधिक विश्लेषण पुष्टि करता है कि मुवक्किल ने अधिकतम 3 वर्ष की सजा में से 35 महीने पूरे कर लिए हैं। धारा 436A CrPC / धारा 479 BNSS के तहत नियमित जमानत याचिका तुरंत दायर करने योग्य है।'
                      : 'Statutory threshold analysis confirms client has completed 35 months in judicial custody out of 36 months maximum sentence. Section 436A CrPC / Section 479 BNSS mandatory release benchmark achieved.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCaseId(selectedCase.id);
                      setActiveTab('ai-insights');
                    }}
                    className="font-bold text-indigo-700 dark:text-indigo-400 hover:underline flex items-center gap-1 text-[11px] pt-1"
                  >
                    <span>{t.exploreAiSynthesis}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 1 Col: Client Demographics & Legal Team */}
              <div className="space-y-5">
                {/* Client Profile */}
                <div className="theme-surface-secondary p-4 rounded-xl border space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-subtle pb-2">
                    <User className="w-3.5 h-3.5 text-alt-700 dark:text-alt-400" />
                    <span>{t.clientProfile}</span>
                  </h3>
                  <div className="space-y-2 text-xs font-medium">
                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-slate-500 dark:text-slate-400">{t.fullNameLabel}</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-slate-500 dark:text-slate-400">{t.ageGenderLabel}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {selectedCase.age} {language === 'hi' ? 'वर्ष' : 'Yrs'} / {language === 'hi' && selectedCase.genderHi ? selectedCase.genderHi : selectedCase.gender}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-slate-500 dark:text-slate-400">{t.contactNumberLabel}</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{selectedCase.clientPhone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-subtle">
                      <span className="text-slate-500 dark:text-slate-400">{t.addressLabel}</span>
                      <span className="text-slate-800 dark:text-slate-200 text-right max-w-[150px]">
                        {language === 'hi' && selectedCase.locationHi ? selectedCase.locationHi : selectedCase.location}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 dark:text-slate-400">{t.filingIntakeDateLabel}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCase.fillingDate}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Legal Team */}
                <div className="theme-surface-secondary p-4 rounded-xl border space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-subtle pb-2">
                    <Shield className="w-3.5 h-3.5 text-alt-700 dark:text-alt-400" />
                    <span>{t.assignedTeam}</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">{t.advocate}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedCase.assignedAdvocate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">{t.paralegal}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedCase.assignedParalegal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Case Notes Timeline */}
        {activeWorkspaceTab === 'notes' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.notesTimelineTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.notesTimelineSubtitle}</p>
              </div>
              <button
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addNote}</span>
              </button>
            </div>

            {/* Note Composer Form */}
            {isAddingNote && (
              <form onSubmit={handleSaveNote} className="p-4 rounded-xl theme-surface-secondary border-2 border-alt-300 dark:border-alt-700 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.noteClassification}</label>
                  <select
                    value={newNoteCategory}
                    onChange={(e) => setNewNoteCategory(e.target.value as any)}
                    className="px-2.5 py-1 rounded-lg text-xs theme-input font-semibold border"
                  >
                    <option value="Strategy Note">Strategy Note ({t.stageStrategy})</option>
                    <option value="Client Interview">Client Interview ({t.catClientContact})</option>
                    <option value="Investigation">Investigation ({t.catVerification})</option>
                    <option value="Court Proceedings">Court Proceedings ({t.stageHearing})</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={t.notePlaceholder}
                  className="w-full p-3 rounded-xl theme-input text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium border"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-surface-hover font-medium"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-alt-700 text-white shadow-2xs"
                  >
                    {t.saveNoteBtn}
                  </button>
                </div>
              </form>
            )}

            {/* Notes Feed */}
            <div className="space-y-3">
              {localNotes.map((note) => (
                <div key={note.id} className="p-4 rounded-xl theme-surface-secondary border space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{note.author}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-alt-100 dark:bg-alt-900 text-alt-800 dark:text-alt-200">
                        {language === 'hi' && note.categoryHi ? note.categoryHi : note.category}
                      </span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {language === 'hi' && note.dateHi ? note.dateHi : note.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {language === 'hi' && note.contentHi ? note.contentHi : note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Documents */}
        {activeWorkspaceTab === 'documents' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.attachedDocsTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.attachedDocsSubtitle}</p>
              </div>
              <button
                onClick={() => showToast(language === 'hi' ? 'दस्तावेज़ अपलोड डायलॉग खोला गया' : 'Upload document dialog simulated.')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.uploadDoc}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseDocuments.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl theme-surface-secondary border flex items-start justify-between gap-3 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-alt-100 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 shrink-0">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'hi' && doc.titleHi ? doc.titleHi : doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {language === 'hi' && doc.categoryHi ? doc.categoryHi : doc.category} • {language === 'hi' && doc.uploadedDateHi ? doc.uploadedDateHi : doc.uploadedDate}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block mt-2">
                        {t.verified}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewDocument(doc)}
                    className="p-1.5 rounded-lg theme-control text-slate-700 dark:text-slate-300 hover:bg-surface-hover transition-colors shadow-2xs border"
                    title={t.previewBtn}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Tasks */}
        {activeWorkspaceTab === 'tasks' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.caseTasksTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.tasksSubtitle}</p>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-alt-700 text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.newTask}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {caseTasks.map((tsk) => {
                const isCompleted = tsk.status === 'Completed';
                return (
                  <div key={tsk.id} className="p-3.5 rounded-xl theme-surface-secondary border flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTaskStatus(tsk.id)}
                        className="text-slate-400 hover:text-emerald-600"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600"></div>
                        )}
                      </button>
                      <div>
                        <p className={`text-xs font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {language === 'hi' && tsk.titleHi ? tsk.titleHi : tsk.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {t.duePrefix} {language === 'hi' && tsk.dueDateHi ? tsk.dueDateHi : tsk.dueDate} • {t.assignedToPrefix} {tsk.assignedTo}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                      {tsk.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 5: Activity Audit */}
        {activeWorkspaceTab === 'activity' && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.auditTrailTitle}</h3>
            <div className="space-y-3">
              {caseActivities.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl theme-surface-secondary border flex items-start justify-between gap-3 text-xs shadow-2xs font-medium">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400 shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {language === 'hi' && item.actionHi ? item.actionHi : item.action}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 dark:text-slate-400">{item.user}</span>
                  </div>
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] shrink-0">
                    {language === 'hi' && item.timestampHi ? item.timestampHi : item.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="theme-surface-elevated rounded-2xl border shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-subtle pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'hi' && previewDocument.titleHi ? previewDocument.titleHi : previewDocument.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedCase.id} • {language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDocument(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl theme-surface-secondary border font-mono text-xs text-slate-800 dark:text-slate-200 space-y-2 max-h-64 overflow-y-auto">
              <p className="font-bold text-slate-900 dark:text-white">{t.certifiedLegalRecordExtract}</p>
              <p>{t.matterLabel} {language === 'hi' && previewDocument.titleHi ? previewDocument.titleHi : previewDocument.title}</p>
              <p>{t.associatedDocketLabel} {selectedCase.id} ({language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName})</p>
              <p>{t.classificationLabel} {language === 'hi' && previewDocument.categoryHi ? previewDocument.categoryHi : previewDocument.category}</p>
              <p className="text-slate-600 dark:text-slate-400">{t.verificationHashLabel} SHA256-ALT-VERIFIED-DOC-0821-OK</p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-bold text-[11px] mt-2">
                {t.status}: {t.verifiedForJudicialSubmission}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-subtle">
              <button
                onClick={() => setPreviewDocument(null)}
                className="px-4 py-2 text-xs font-bold bg-alt-700 text-white rounded-xl shadow-xs"
              >
                {t.closePreviewBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
