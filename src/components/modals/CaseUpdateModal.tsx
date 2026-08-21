import React, { useState } from 'react';
import { X, Check, AlertCircle, PlusCircle, Scale, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CaseUpdateModal: React.FC = () => {
  const { 
    isCaseUpdateModalOpen, 
    setIsCaseUpdateModalOpen, 
    cases, 
    selectedCaseId, 
    addCaseUpdate, 
    t, 
    language 
  } = useApp();

  const [targetCaseId, setTargetCaseId] = useState(selectedCaseId);
  const [updateText, setUpdateText] = useState('');
  const [nextStage, setNextStage] = useState('Hearing');
  const [isUrgent, setIsUrgent] = useState(false);

  if (!isCaseUpdateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    addCaseUpdate(targetCaseId, updateText.trim());
    setUpdateText('');
    setIsCaseUpdateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="theme-surface-elevated rounded-2xl border shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95">
        <div className="px-5 py-4 border-b border-subtle flex items-center justify-between theme-surface-secondary">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-alt-700 dark:text-alt-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{t.caseUpdateModalTitle}</h2>
          </div>
          <button
            onClick={() => setIsCaseUpdateModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-surface-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.selectCaseLabel}</label>
            <select
              value={targetCaseId}
              onChange={(e) => setTargetCaseId(e.target.value)}
              className="w-full px-3 py-2 text-xs theme-input rounded-lg text-slate-900 dark:text-white font-medium border"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id} — {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName} ({language === 'hi' && c.caseTypeHi ? c.caseTypeHi : c.caseType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.updateDescLabel}
            </label>
            <textarea
              required
              rows={3}
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder={t.updateDescPlaceholder}
              className="w-full p-3 text-xs theme-input rounded-lg text-slate-900 dark:text-white placeholder-slate-400 font-medium border"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.updateStageLabel}</label>
              <select
                value={nextStage}
                onChange={(e) => setNextStage(e.target.value)}
                className="w-full px-3 py-2 text-xs theme-input rounded-lg text-slate-800 dark:text-slate-200 font-semibold border"
              >
                <option value="Case Intake">{t.stageIntake}</option>
                <option value="Documentation">{t.stageDocumentation}</option>
                <option value="Case Analysis">{t.stageAnalysis}</option>
                <option value="Legal Strategy">{t.stageStrategy}</option>
                <option value="Hearing">{t.stageHearing}</option>
                <option value="Monitoring">{t.stageMonitoring}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.priorityFlagLabel}</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="urgentFlag"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="urgentFlag" className="text-xs text-rose-700 dark:text-rose-400 font-bold">
                  {t.markUrgentCheckbox}
                </label>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-subtle flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCaseUpdateModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-surface-hover rounded-xl font-semibold"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-alt-700 hover:bg-alt-800 text-white rounded-xl shadow-xs"
            >
              {t.saveUpdateBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
