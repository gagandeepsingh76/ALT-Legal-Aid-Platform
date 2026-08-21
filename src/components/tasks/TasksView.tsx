import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Filter, 
  Briefcase, 
  ArrowRight, 
  User, 
  Shield, 
  FileText, 
  Flame, 
  Check 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Priority } from '../../types';

export const TasksView: React.FC = () => {
  const { tasks, toggleTaskStatus, addTask, setSelectedCaseId, setActiveTab, t, language, showToast } = useApp();

  const [activeTab, setActiveTabFilter] = useState<'all' | 'today' | 'upcoming' | 'overdue' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaseId, setNewCaseId] = useState('ALT-2026-104');
  const [newPriority, setNewPriority] = useState<Priority>('High');
  const [newDueDate, setNewDueDate] = useState('Tomorrow, 05:00 PM');

  const filteredTasks = tasks.filter(task => {
    // Tab filter
    if (activeTab === 'completed' && task.status !== 'Completed') return false;
    if (activeTab !== 'completed' && task.status === 'Completed' && activeTab !== 'all') return false;
    
    if (activeTab === 'today' && !task.dueDate.toLowerCase().includes('today')) return false;
    if (activeTab === 'upcoming' && task.dueDate.toLowerCase().includes('today')) return false;
    if (activeTab === 'overdue' && !task.dueDate.toLowerCase().includes('overdue')) return false;

    // Priority filter
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;

    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      caseId: newCaseId,
      caseClientName: newCaseId === 'ALT-2026-104' ? 'Rameshwar Prasad' : 'Sunita Devi',
      title: newTitle.trim(),
      dueDate: newDueDate,
      status: 'Pending',
      priority: newPriority,
      assignedTo: 'Adv. Priya Malhotra',
      category: 'Filing'
    });

    setNewTitle('');
    setIsCreatingTask(false);
    showToast(language === 'hi' ? 'नया कार्य सफलतापूर्वक जोड़ा गया' : 'New task assigned successfully');
  };

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
      default: return 'theme-control text-slate-800 dark:text-slate-300 border-app';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Filing': return t.catFiling;
      case 'Client Contact': return t.catClientContact;
      case 'Document': return t.catDocument;
      case 'Verification': return t.catVerification;
      case 'Research': return t.catResearch;
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Filing': return <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case 'Client Contact': return <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'Document': return <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case 'Verification': return <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      default: return <CheckSquare className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 theme-card p-5 rounded-2xl border shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              {t.tasksTitle}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {tasks.filter(t => t.status !== 'Completed').length} {language === 'hi' ? 'लंबित कार्य' : 'Pending Items'}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            {t.tasksSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsCreatingTask(!isCreatingTask)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-alt-700 hover:bg-alt-800 text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newTask}</span>
        </button>
      </div>

      {/* 2. New Task Form */}
      {isCreatingTask && (
        <form onSubmit={handleCreateTask} className="theme-card p-6 rounded-2xl border-2 border-alt-300 dark:border-alt-700 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-subtle pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-alt-800 dark:text-alt-300 flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>{t.createTaskModalTitle}</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">{t.createTaskAssignedNote}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">{t.taskTitleActionLabel}</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.taskTitlePlaceholder}
                className="w-full px-3.5 py-2 text-xs theme-input rounded-xl text-slate-900 dark:text-white font-medium border"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">{t.relatedCaseLabel}</label>
              <select
                value={newCaseId}
                onChange={(e) => setNewCaseId(e.target.value)}
                className="w-full px-3 py-2 text-xs theme-input rounded-xl text-slate-800 dark:text-slate-200 font-medium border"
              >
                <option value="ALT-2026-104">ALT-2026-104 (Rameshwar Prasad)</option>
                <option value="ALT-2026-108">ALT-2026-108 (Sunita Devi)</option>
                <option value="ALT-2026-112">ALT-2026-112 (Mohammad Irfan)</option>
                <option value="ALT-2026-115">ALT-2026-115 (Laxmi Bai)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">{t.priorityFieldLabel}</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs theme-input rounded-xl text-slate-800 dark:text-slate-200 font-medium border"
              >
                <option value="Urgent">{t.priorityUrgent}</option>
                <option value="High">{t.priorityHigh}</option>
                <option value="Medium">{t.priorityMedium}</option>
                <option value="Low">{t.priorityLow}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">{t.dueDateFieldLabel}</label>
              <input
                type="text"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                placeholder={t.dueDatePlaceholder}
                className="w-full px-3.5 py-2 text-xs theme-input rounded-xl text-slate-900 dark:text-white font-medium border"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-subtle">
            <button
              type="button"
              onClick={() => setIsCreatingTask(false)}
              className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-surface-hover rounded-xl font-semibold"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-alt-700 hover:bg-alt-800 text-white rounded-xl shadow-xs"
            >
              {t.saveAssignTaskBtn}
            </button>
          </div>
        </form>
      )}

      {/* 3. Group Identity Tabs & Priority Filter */}
      <div className="theme-card p-4 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTabFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'all' ? 'bg-alt-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.tabAllTasks} ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('today')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              activeTab === 'today' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.tabDueToday}</span>
          </button>
          <button
            onClick={() => setActiveTabFilter('upcoming')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'upcoming' ? 'bg-alt-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            {t.tabUpcoming}
          </button>
          <button
            onClick={() => setActiveTabFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              activeTab === 'completed' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-surface-hover'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.tabCompleted}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t.priority}:</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 text-xs theme-input rounded-xl text-slate-700 dark:text-slate-200 font-semibold border"
          >
            <option value="All">{t.all} {t.priority}</option>
            <option value="Urgent">{t.priorityUrgent}</option>
            <option value="High">{t.priorityHigh}</option>
            <option value="Medium">{t.priorityMedium}</option>
            <option value="Low">{t.priorityLow}</option>
          </select>
        </div>
      </div>

      {/* 4. Actionable Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isCompleted = task.status === 'Completed';

          return (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all theme-card flex items-start justify-between gap-4 shadow-2xs ${
                isCompleted
                  ? 'border-subtle opacity-65 theme-surface-secondary'
                  : 'border-app hover:border-alt-300 dark:hover:border-alt-700 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 flex items-center justify-center"></div>
                  )}
                </button>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded theme-control text-slate-700 dark:text-slate-300 border border-app">
                      {task.id}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCaseId(task.caseId);
                        setActiveTab('case-workspace');
                      }}
                      className="font-mono text-xs font-bold text-alt-700 dark:text-alt-400 hover:underline"
                    >
                      {task.caseId}
                    </button>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                      ({language === 'hi' && task.caseClientNameHi ? task.caseClientNameHi : task.caseClientName})
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadgeClass(task.priority)}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold leading-snug ${isCompleted ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                    {language === 'hi' && task.titleHi ? task.titleHi : task.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-muted)] pt-0.5">
                    <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t.duePrefix} {language === 'hi' && task.dueDateHi ? task.dueDateHi : task.dueDate}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.assignedTo}</span>
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md theme-control text-slate-700 dark:text-slate-300 font-semibold text-[10px] border border-app">
                      {getCategoryIcon(task.category)}
                      <span>{getCategoryLabel(task.category)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs ${
                    isCompleted
                      ? 'theme-control text-slate-600 dark:text-slate-300 hover:bg-surface-hover'
                      : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  {isCompleted ? t.markPending : t.markComplete}
                </button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 theme-card rounded-2xl border">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-[var(--text-primary)]">{t.noTasksInView}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{t.allTasksUpToDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};
