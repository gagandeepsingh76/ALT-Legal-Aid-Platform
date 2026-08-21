import React, { useState } from 'react';
import { Info, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerBanner: React.FC = () => {
  const { t, language } = useApp();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-navy-850 to-alt-900 text-white text-xs py-2 px-4 shadow-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="flex items-center justify-center p-1 rounded bg-alt-500/30 text-alt-300 font-semibold uppercase tracking-wider text-[10px] shrink-0 border border-alt-400/30">
            <Sparkles className="w-3 h-3 mr-1" />
            {t.conceptBadge}
          </span>
          <p className="text-slate-200 leading-tight">
            {t.disclaimerBanner}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title={t.dismiss}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
