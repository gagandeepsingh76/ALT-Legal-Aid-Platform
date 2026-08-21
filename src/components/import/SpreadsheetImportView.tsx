import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  Info, 
  Database, 
  RefreshCw, 
  FileCheck, 
  Table, 
  Sliders, 
  ShieldAlert, 
  ArrowDown, 
  CheckCircle, 
  FileText, 
  FolderOpen 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSpreadsheetRows } from '../../data/mockData';

export const SpreadsheetImportView: React.FC = () => {
  const { t, language, setActiveTab, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<'active_cases.xlsx' | 'district_intake_q1.csv'>('active_cases.xlsx');
  const [isImporting, setIsImporting] = useState(false);

  const handleNext = () => {
    if (currentStep === 4) {
      setIsImporting(true);
      setTimeout(() => {
        setIsImporting(false);
        setCurrentStep(5);
        showToast(language === 'hi' ? '52 केस सफलतापूर्वक ALT में आयात किए गए!' : '52 cases successfully mapped and imported to ALT!');
      }, 1200);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 theme-card p-5 rounded-2xl border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.importTitle}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {language === 'hi' ? 'कार्यप्रवाह ब्रिज' : 'Workflow Bridge'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.importSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl theme-control text-slate-700 dark:text-slate-300 border border-app">
            {language === 'hi' ? `चरण ${currentStep} / 5` : `Step ${currentStep} of 5`}
          </span>
        </div>
      </div>

      {/* 2. Visual Transformation Journey Pipeline Diagram */}
      <div className="theme-hero text-white p-5 rounded-2xl border shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.pipelineTitle}</span>
          </span>
          <span className="text-[10px] opacity-80 font-mono">{t.automatedDataNorm}</span>
        </div>

        {/* Visual Pipeline Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className={`p-3 rounded-xl border transition-all ${
            currentStep === 1 || currentStep === 2
              ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-xs'
              : 'bg-white/10 border-white/15 text-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-300">01</span>
              <Table className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="font-bold text-sm">{t.phase1Title}</div>
            <p className="text-[10px] opacity-80 mt-0.5">{t.phase1Desc}</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            currentStep === 3
              ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-xs'
              : 'bg-white/10 border-white/15 text-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-300">02</span>
              <Sliders className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="font-bold text-sm">{t.phase2Title}</div>
            <p className="text-[10px] opacity-80 mt-0.5">{t.phase2Desc}</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            currentStep === 4
              ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-xs'
              : 'bg-white/10 border-white/15 text-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-300">03</span>
              <ShieldAlert className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="font-bold text-sm">{t.phase3Title}</div>
            <p className="text-[10px] opacity-80 mt-0.5">{t.phase3Desc}</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            currentStep === 5
              ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-xs'
              : 'bg-white/10 border-white/15 text-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-300">04</span>
              <Database className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="font-bold text-sm">{t.phase4Title}</div>
            <p className="text-[10px] opacity-80 mt-0.5">{t.phase4Desc}</p>
          </div>
        </div>
      </div>

      {/* 3. Stepper Bar */}
      <div className="theme-card p-4 rounded-2xl border shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { step: 1, title: t.step1Title },
            { step: 2, title: t.step2Title },
            { step: 3, title: t.step3Title },
            { step: 4, title: t.step4Title },
            { step: 5, title: t.step5Title }
          ].map(s => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;

            return (
              <div
                key={s.step}
                onClick={() => s.step < currentStep && setCurrentStep(s.step)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 ring-2 ring-emerald-200 dark:ring-emerald-800 shadow-xs'
                    : isCompleted
                    ? 'theme-surface-secondary cursor-pointer hover:bg-surface-hover'
                    : 'theme-surface-secondary opacity-60'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                      isCurrent ? 'bg-emerald-600 text-white' : 'theme-control text-slate-600 dark:text-slate-300'
                    }`}>
                      {s.step}
                    </span>
                  )}
                </div>
                <div className={`text-[11px] font-bold truncate ${isCurrent ? 'text-emerald-950 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {s.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Wizard Step Body */}
      <div className="theme-card rounded-2xl border shadow-xs p-6">
        {/* STEP 1: SELECT SAMPLE FILE */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto py-3">
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{t.step1Header}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.step1Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedFile('active_cases.xlsx')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedFile === 'active_cases.xlsx'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs'
                    : 'border-app hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  {selectedFile === 'active_cases.xlsx' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">District_Legal_Aid_Active_Cases_Q1.xlsx</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  54 Records • Tis Hazari &amp; Karkardooma court roster
                </p>
                <div className="mt-3 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full inline-block">
                  {t.recommendedSampleTag}
                </div>
              </div>

              <div
                onClick={() => setSelectedFile('district_intake_q1.csv')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedFile === 'district_intake_q1.csv'
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs'
                    : 'border-app hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl theme-control text-slate-700 dark:text-slate-300 border border-app">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  {selectedFile === 'district_intake_q1.csv' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Undertrial_Monitoring_Roster_2026.csv</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  28 Records • Custody &amp; 436A tracking sheet
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-700 dark:text-slate-300 theme-control border border-app px-2 py-0.5 rounded-full inline-block">
                  {t.csvFormatTag}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl theme-surface-secondary border flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-medium">{t.selectedSourceFileLabel}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedFile} (54 {language === 'hi' ? 'पार्स की गई पंक्तियाँ' : 'Parsed rows'})</span>
            </div>
          </div>
        )}

        {/* STEP 2: PREVIEW DATA */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">{t.step2Header}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.step2Desc}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                {t.rowsDetectedCount.replace('{count}', '54')}
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="theme-surface-secondary border-b border-app text-slate-700 dark:text-slate-300 font-bold">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">{t.client}</th>
                    <th className="py-2.5 px-3">{t.caseId}</th>
                    <th className="py-2.5 px-3">{t.court}</th>
                    <th className="py-2.5 px-3">{t.status}</th>
                    <th className="py-2.5 px-3">{t.nextDate}</th>
                    <th className="py-2.5 px-3">{t.advocate}</th>
                    <th className="py-2.5 px-3">{t.category}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[11px]">
                  {mockSpreadsheetRows.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-hover">
                      <td className="py-2.5 px-3 text-slate-400">{row.id}</td>
                      <td className="py-2.5 px-3 font-sans font-bold text-slate-900 dark:text-white">
                        {language === 'hi' && row.clientNameHi ? row.clientNameHi : row.clientName}
                      </td>
                      <td className="py-2.5 px-3 text-alt-700 dark:text-alt-400 font-bold">{row.caseNumber}</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans">
                        {language === 'hi' && row.courtNameHi ? row.courtNameHi : row.courtName}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded theme-control text-slate-800 dark:text-slate-200 text-[10px] font-sans font-semibold border border-app">
                          {language === 'hi' && row.statusHi ? row.statusHi : row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-sans font-bold">
                        {language === 'hi' && row.nextHearingHi ? row.nextHearingHi : row.nextHearing}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans">{row.advocate}</td>
                      <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 font-sans">
                        {language === 'hi' && row.caseTypeHi ? row.caseTypeHi : row.caseType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STEP 3: MAP COLUMNS */}
        {currentStep === 3 && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{t.step3Header}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.step3Desc}
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { col: 'Client Name', field: 'clientName', altLabel: language === 'hi' ? 'मुवक्किल का पूरा नाम (आवश्यक)' : 'Client Full Name (Required)', status: t.autoMatchedTag },
                { col: 'Case Number', field: 'caseNumber', altLabel: language === 'hi' ? 'ALT केस पहचानकर्ता / डॉकेट (आवश्यक)' : 'ALT Case Identifier / Docket (Required)', status: t.autoMatchedTag },
                { col: 'Court Name', field: 'courtName', altLabel: language === 'hi' ? 'पीठासीन अदालत / क्षेत्राधिकार' : 'Presiding Court / Jurisdiction', status: t.autoMatchedTag },
                { col: 'Status', field: 'status', altLabel: language === 'hi' ? 'वर्तमान केस स्थिति' : 'Current Case Lifecycle Status', status: t.autoMatchedTag },
                { col: 'Next Hearing', field: 'nextHearing', altLabel: language === 'hi' ? 'अगली निर्धारित सुनवाई तिथि' : 'Next Scheduled Hearing Date', status: t.autoMatchedTag },
                { col: 'Advocate', field: 'advocate', altLabel: language === 'hi' ? 'नियुक्त मुख्य अधिवक्ता' : 'Assigned Lead Advocate', status: t.autoMatchedTag },
                { col: 'Case Type', field: 'caseType', altLabel: language === 'hi' ? 'कानूनी सहायता मामला वर्गीकरण' : 'Legal Aid Matter Classification', status: t.autoMatchedTag }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl theme-surface-secondary border border-app flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 theme-control px-2.5 py-1 rounded-lg border border-app shadow-2xs">
                      {item.col}
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-bold text-slate-900 dark:text-white">{item.altLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      ✓ {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & VALIDATE */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-2xl mx-auto py-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{t.step4Header}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.step4Desc}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl theme-surface-secondary border border-app text-center">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">54</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">{t.totalRecords}</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">52</span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold block mt-1">{t.readyRecords}</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-center">
                <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-300">2</span>
                <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold block mt-1">{t.possibleDuplicates}</span>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-center">
                <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">0</span>
                <span className="text-[11px] text-blue-800 dark:text-blue-300 font-bold block mt-1">{t.missingFields}</span>
              </div>
            </div>

            {/* Validation Alerts */}
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t.validationPassedMsg}</span>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                    {t.validationPassedDesc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t.validationDuplicatesMsg}</span>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5 font-medium">
                    {t.validationDuplicatesDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION SUCCESS */}
        {currentStep === 5 && (
          <div className="space-y-6 max-w-xl mx-auto text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.importSuccessMsg}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                {t.importSuccessDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl theme-surface-secondary border border-app text-xs text-left space-y-2 font-medium">
              <div className="flex justify-between py-1 border-b border-app">
                <span className="text-slate-500 dark:text-slate-400">{t.selectedSourceFileLabel}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedFile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-app">
                <span className="text-slate-500 dark:text-slate-400">{t.casesActivatedLabel}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{t.activeWorkspacesCreatedDesc}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">{t.importRefLogLabel}</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">IMP-2026-08-21-004</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('cases')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                {t.viewImportedCases}
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl theme-control hover:bg-control-hover text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors border border-app"
              >
                {t.importAnotherSheetBtn}
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-app flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentStep === 1
                  ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'theme-control text-slate-700 dark:text-slate-300 hover:bg-control-hover border border-app shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btnPrevStep}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isImporting}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {isImporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.processingIngestion}</span>
                </>
              ) : currentStep === 4 ? (
                <>
                  <span>{t.btnStartImport}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{t.btnNextStep}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
