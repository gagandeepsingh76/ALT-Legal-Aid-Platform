import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Plus, 
  Eye, 
  FileCheck, 
  X, 
  FolderOpen, 
  Scale, 
  FileCode, 
  FileBadge, 
  FileSpreadsheet 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types';

export const DocumentsView: React.FC = () => {
  const { documents, cases, setSelectedCaseId, setActiveTab, t, language, showToast } = useApp();

  const [activeTab, setActiveTabFilter] = useState<'all' | 'Verified' | 'Pending Review' | 'Missing / Action Required'>('all');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchDoc, setSearchDoc] = useState('');
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = documents.filter(doc => {
    if (activeTab !== 'all' && doc.status !== activeTab) return false;
    if (selectedCaseFilter !== 'All' && doc.caseId !== selectedCaseFilter) return false;
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;
    if (searchDoc && !doc.title.toLowerCase().includes(searchDoc.toLowerCase())) return false;
    return true;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Verified': return t.verified;
      case 'Pending Review': return t.pendingReview;
      case 'Missing / Action Required': return t.missingRequired;
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800';
      case 'Pending Review': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';
      case 'Missing / Action Required': return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800 font-bold';
      default: return 'theme-control text-slate-700 dark:text-slate-300 border-app';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Petition': return { bg: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800', tag: t.catPetition.toUpperCase() };
      case 'FIR': return { bg: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800', tag: t.catFir.toUpperCase() };
      case 'Affidavit': return { bg: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800', tag: t.catAffidavit.toUpperCase() };
      case 'Identity / Aadhar': return { bg: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800', tag: t.catIdentity.toUpperCase() };
      case 'Court Order': return { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800', tag: t.catCourtOrder.toUpperCase() };
      default: return { bg: 'theme-control text-slate-800 dark:text-slate-300 border-app', tag: 'RECORD' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 theme-card p-5 rounded-2xl border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-alt-50 dark:bg-alt-900/60 text-alt-700 dark:text-alt-300 border border-alt-200 dark:border-alt-700">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              {t.documentsTitle}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-alt-50 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 border border-alt-200 dark:border-alt-700">
              {t.recordsInRepo.replace('{count}', String(documents.length))}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {t.documentsSubtitle}
          </p>
        </div>

        <button
          onClick={() => showToast(language === 'hi' ? 'दस्तावेज़ अपलोड डायलॉग खोला गया' : 'Upload document dialog simulated.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.uploadDoc}</span>
        </button>
      </div>

      {/* 2. Tabs, Search & Multi-Filters */}
      <div className="theme-card p-4 rounded-2xl border shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder={t.searchDocPlaceholder}
              className="w-full pl-9 pr-4 py-2 theme-input rounded-xl text-xs text-slate-900 dark:text-white font-medium placeholder-slate-400 border"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Filter by Case */}
            <select
              value={selectedCaseFilter}
              onChange={(e) => setSelectedCaseFilter(e.target.value)}
              className="px-3 py-2 theme-input rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold border"
            >
              <option value="All">{t.allCasesFilter}</option>
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id} - {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
                </option>
              ))}
            </select>

            {/* Filter by Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 theme-input rounded-xl text-xs text-slate-800 dark:text-slate-200 font-semibold border"
            >
              <option value="All">{t.allCategoriesFilter}</option>
              <option value="Petition">{t.catPetition}</option>
              <option value="Affidavit">{t.catAffidavit}</option>
              <option value="FIR">{t.catFir}</option>
              <option value="Identity / Aadhar">{t.catIdentity}</option>
              <option value="Court Order">{t.catCourtOrder}</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTabFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'all' ? 'bg-alt-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.tabAllDocs} ({documents.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('Verified')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'Verified' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.verified} ({documents.filter(d => d.status === 'Verified').length})
          </button>
          <button
            onClick={() => setActiveTabFilter('Pending Review')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'Pending Review' ? 'bg-amber-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.tabPendingReview} ({documents.filter(d => d.status === 'Pending Review').length})
          </button>
          <button
            onClick={() => setActiveTabFilter('Missing / Action Required')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'Missing / Action Required' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.tabMissingDocs} ({documents.filter(d => d.status === 'Missing / Action Required').length})
          </button>
        </div>
      </div>

      {/* 3. Visual Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const categoryInfo = getCategoryBadge(doc.category);

          return (
            <div
              key={doc.id}
              className="p-5 rounded-2xl theme-card border shadow-xs hover:border-alt-300 dark:hover:border-alt-700 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-extrabold text-alt-800 dark:text-alt-300 px-2 py-0.5 rounded bg-alt-50 dark:bg-alt-900/60 border border-alt-200 dark:border-alt-700">
                      {doc.caseId}
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${categoryInfo.bg}`}>
                      {categoryInfo.tag}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(doc.status)}`}>
                    {getStatusLabel(doc.status)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl theme-control text-alt-700 dark:text-alt-300 shrink-0 border border-app">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[var(--text-primary)] leading-snug">
                      {language === 'hi' && doc.titleHi ? doc.titleHi : doc.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1 font-medium">
                      {t.client}: {doc.clientName}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-subtle text-[11px] text-[var(--text-muted)] space-y-1 font-medium">
                  <div className="flex justify-between">
                    <span>{t.uploadedDateLabel}</span>
                    <span className="font-bold text-[var(--text-primary)]">{doc.uploadedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.verifiedByLabel}</span>
                    <span className="font-bold text-[var(--text-primary)]">{doc.uploadedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.fileSizeLabel}</span>
                    <span className="font-mono font-semibold text-[var(--text-secondary)]">{doc.fileSize || '--'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedCaseId(doc.caseId);
                    setActiveTab('case-workspace');
                  }}
                  className="text-[11px] font-bold text-alt-700 dark:text-alt-400 hover:underline"
                >
                  {t.goToCaseFileBtn}
                </button>
                <button
                  onClick={() => setSelectedPreviewDoc(doc)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 theme-control hover:bg-control-hover border px-3 py-1 rounded-lg transition-colors shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.previewBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Side Document Preview Modal */}
      {selectedPreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="theme-surface-elevated rounded-2xl border shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-subtle pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{selectedPreviewDoc.title}</h3>
                  <p className="text-[11px] text-[var(--text-muted)]">{selectedPreviewDoc.caseId} • {selectedPreviewDoc.clientName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl theme-surface-secondary border font-mono text-xs text-slate-800 dark:text-slate-200 space-y-2 max-h-64 overflow-y-auto">
              <p className="font-bold text-slate-900 dark:text-white">{t.certifiedLegalRecordExtract}</p>
              <p>{t.matterLabel} {selectedPreviewDoc.title}</p>
              <p>{t.associatedDocketLabel} {selectedPreviewDoc.caseId} ({selectedPreviewDoc.clientName})</p>
              <p>{t.classificationLabel} {selectedPreviewDoc.category}</p>
              <p className="text-slate-600 dark:text-slate-400">{t.verificationHashLabel} SHA256-ALT-VERIFIED-DOC-0821-OK</p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-bold text-[11px] mt-2">
                {t.status}: {getStatusLabel(selectedPreviewDoc.status)} ({t.verifiedForJudicialSubmission})
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-subtle">
              <button
                onClick={() => setSelectedPreviewDoc(null)}
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
