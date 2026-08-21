import React, { useState } from 'react';
import { Info, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerBanner: React.FC = () => {
  const { t, language } = useApp();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-100/90 text-slate-800 border-b border-slate-200/80 dark:bg-gradient-to-r dark:from-slate-900 dark:via-navy-850 dark:to-alt-900 dark:text-white dark:border-slate-700/50 text-xs py-2 px-4 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="flex items-center justify-center p-1 rounded bg-alt-100 text-alt-800 border border-alt-200 dark:bg-alt-500/30 dark:text-alt-300 dark:border-alt-400/30 font-semibold uppercase tracking-wider text-[10px] shrink-0">
            <Sparkles className="w-3 h-3 mr-1" />
            {t.conceptBadge}
          </span>
          <p className="text-slate-700 dark:text-slate-200 leading-tight">
            {t.disclaimerBanner}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 p-1 rounded transition-colors"
          title={t.dismiss}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
