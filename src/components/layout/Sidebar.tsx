import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  CheckSquare, 
  Calendar, 
  FileText, 
  FileSpreadsheet, 
  Sparkles, 
  Info,
  ChevronRight,
  Gavel,
  Shield,
  Scale,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, tasks, hearings, selectedCaseId, language } = useApp();

  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const todayHearingsCount = hearings.filter(h => h.status === 'Today').length;

  const navItems: { 
    id: NavTab; 
    label: string; 
    icon: React.FC<{ className?: string }>; 
    badge?: string | number; 
    badgeColor?: string;
    subtext?: string;
  }[] = [
    { 
      id: 'dashboard', 
      label: t.navDashboard, 
      icon: LayoutDashboard,
      subtext: t.dailyActionCenter
    },
    { 
      id: 'cases', 
      label: t.navCases, 
      icon: Briefcase, 
      badge: language === 'hi' ? `6 ${t.activeTag}` : '6 Active',
      subtext: t.portfolioTracker
    },
    { 
      id: 'case-workspace', 
      label: t.navWorkspace, 
      icon: Layers, 
      badge: selectedCaseId.split('-')[2], 
      badgeColor: 'bg-alt-100 text-alt-800 border border-alt-200 dark:bg-alt-900/60 dark:text-alt-300 dark:border-alt-700',
      subtext: t.unifiedCaseFile
    },
    { 
      id: 'tasks', 
      label: t.navTasks, 
      icon: CheckSquare, 
      badge: pendingTasksCount, 
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      subtext: t.actionQueue
    },
    { 
      id: 'hearings', 
      label: t.navHearings, 
      icon: Calendar, 
      badge: todayHearingsCount > 0 ? (language === 'hi' ? `${todayHearingsCount} आज` : `${todayHearingsCount} Today`) : undefined, 
      badgeColor: 'bg-rose-100 text-rose-900 font-bold border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
      subtext: t.courtDiary
    },
    { 
      id: 'documents', 
      label: t.navDocuments, 
      icon: FileText, 
      badge: language === 'hi' ? '8 दस्तावेज़' : '8 Files',
      subtext: t.verifiedRepo
    },
    { 
      id: 'import', 
      label: t.navImport, 
      icon: FileSpreadsheet, 
      badge: language === 'hi' ? 'ब्रिज' : 'Bridge', 
      badgeColor: 'bg-emerald-100 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      subtext: t.spreadsheetToAlt
    },
    { 
      id: 'ai-insights', 
      label: t.navAIInsights, 
      icon: Sparkles, 
      badge: t.conceptBadge.split(' ')[0], 
      badgeColor: 'bg-indigo-100 text-indigo-900 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
      subtext: t.legalSynthesis
    }
  ];

  return (
    <aside className="w-64 theme-sidebar flex flex-col shrink-0 border-r min-h-[calc(100vh-65px)] transition-colors">
      {/* Navigation list */}
      <div className="p-3 space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>{t.coreWorkflows}</span>
          <span className="text-[9px] font-mono opacity-75">v1.2</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-alt-700 text-white font-semibold shadow-sm ring-1 ring-alt-400/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-surface-hover'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'theme-control text-slate-500 dark:text-slate-400 group-hover:text-alt-700 dark:group-hover:text-alt-300 group-hover:bg-control-hover border border-subtle'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <div className="truncate font-semibold">{item.label}</div>
                  <div className={`text-[10px] truncate leading-snug ${
                    isActive ? 'text-alt-100 dark:text-alt-200' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {item.subtext}
                  </div>
                </div>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1 ${
                    item.badgeColor
                      ? item.badgeColor
                      : isActive
                      ? 'bg-alt-800 text-alt-100'
                      : 'theme-control text-slate-600 dark:text-slate-400 border border-app'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Strategic Problem Framing & Operational Visual Card */}
      <div className="p-3 m-3 rounded-xl theme-surface-elevated border shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-alt-700 dark:text-alt-300 font-bold text-[11px]">
            <Gavel className="w-3.5 h-3.5" />
            <span>{t.operationalFocus}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        
        {/* Visual Mini Metrics */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
          <div className="p-1.5 rounded-lg theme-card border">
            <span className="text-slate-500 dark:text-slate-400 block">{t.courtHearingListed}</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">11:30 AM (14)</span>
          </div>
          <div className="p-1.5 rounded-lg theme-card border">
            <span className="text-slate-500 dark:text-slate-400 block">{t.activeRosterCount}</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{t.activeDocketsCount.replace('{count}', '6')}</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
          {t.bridgingDailyWorkflows}
        </p>

        <button
          onClick={() => setActiveTab('import')}
          className="w-full flex items-center justify-between text-[10px] text-alt-800 dark:text-alt-300 hover:text-alt-900 dark:hover:text-white font-bold theme-card hover:bg-surface-hover px-2 py-1.5 rounded-lg transition-colors border"
        >
          <span className="flex items-center gap-1">
            <FileSpreadsheet className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <span>{t.testSpreadsheetBridge}</span>
          </span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Footer Branding */}
      <div className="px-4 py-2.5 border-t border-subtle text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Scale className="w-3 h-3 text-alt-600 dark:text-alt-400" />
          <span>{t.appTitle.split(' ')[0]} {t.conceptBadge.split(' ')[0]}</span>
        </span>
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded theme-control text-slate-600 dark:text-slate-400 border border-subtle">
          {t.prototypeTag}
        </span>
      </div>
    </aside>
  );
};
