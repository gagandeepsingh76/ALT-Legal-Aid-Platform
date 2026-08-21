import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Scale, 
  Check, 
  ChevronDown,
  Sparkles,
  User,
  CheckCircle2,
  Calendar,
  FileText,
  Sun,
  Moon,
  Eye,
  Gavel,
  ShieldAlert,
  Sliders,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme,
    setTheme,
    eyeComfort,
    toggleEyeComfort,
    logout,
    t, 
    setIsSearchModalOpen, 
    notificationCount, 
    clearNotifications,
    cases,
    selectedCaseId,
    setSelectedCaseId,
    setActiveTab
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCaseSelectOpen, setIsCaseSelectOpen] = useState(false);

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-30 theme-header border-b shadow-2xs transition-colors">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand / Logo with Court Gavel / Scale */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-alt-800 to-slate-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform border border-alt-700/50">
              <Scale className="w-5 h-5 text-alt-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight leading-snug">
                  ALT
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-alt-50 dark:bg-alt-900/60 text-alt-800 dark:text-alt-300 border border-alt-200 dark:border-alt-700 uppercase tracking-wider">
                  {t.conceptBadge}
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block leading-snug mt-0.5">
                {t.appTitle}
              </p>
            </div>
          </div>

          {/* Quick Case Switcher Pill */}
          <div className="relative ml-2 hidden lg:block">
            <button
              onClick={() => setIsCaseSelectOpen(!isCaseSelectOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg theme-control theme-control-hover text-xs font-medium border shadow-2xs transition-colors"
            >
              <Gavel className="w-3.5 h-3.5 text-alt-600 dark:text-alt-400" />
              <span className="font-mono font-bold text-alt-800 dark:text-alt-300">{selectedCase.id}</span>
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[130px]">
                {language === 'hi' && selectedCase.clientNameHi ? selectedCase.clientNameHi : selectedCase.clientName}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            </button>

            {isCaseSelectOpen && (
              <div className="absolute left-0 mt-1 w-72 theme-surface-elevated rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-subtle">
                  <span>{t.switchActiveDocket}</span>
                  <span>{t.totalRecordsCount.replace('{count}', String(cases.length))}</span>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCaseId(c.id);
                        setIsCaseSelectOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-surface-hover transition-colors ${
                        c.id === selectedCaseId ? 'bg-alt-50 dark:bg-alt-950/60 text-alt-900 dark:text-alt-200 font-semibold' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-alt-700 dark:text-alt-300 font-bold">{c.id}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded theme-control text-slate-600 dark:text-slate-300 font-medium border border-app">
                            {c.stage}
                          </span>
                        </div>
                        <div className="font-medium truncate mt-0.5 text-slate-900 dark:text-slate-100">
                          {language === 'hi' && c.clientNameHi ? c.clientNameHi : c.clientName}
                        </div>
                      </div>
                      {c.id === selectedCaseId && <Check className="w-4 h-4 text-alt-600 dark:text-alt-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div 
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg theme-input hover:bg-control-hover border text-xs cursor-pointer transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span className="text-slate-400 dark:text-slate-400">{t.searchPlaceholder}</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono theme-control text-slate-600 dark:text-slate-300 rounded border border-app shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls: Theme (Light/Dark), Separate Eye Comfort Toggle, Language, Notifications, Profile */}
        <div className="flex items-center gap-2">
          {/* 1. Base Theme Switcher: Light / Dark */}
          <div className="flex items-center theme-control p-0.5 rounded-lg border">
            <button
              onClick={() => setTheme('light')}
              title={t.themeLight}
              className={`p-1.5 rounded-md text-xs transition-all ${
                theme === 'light'
                  ? 'bg-surface text-amber-600 shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title={t.themeDark}
              className={`p-1.5 rounded-md text-xs transition-all ${
                theme === 'dark'
                  ? 'bg-surface text-alt-400 shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Independent Reading Comfort Control: Eye Comfort (ON / OFF) */}
          <button
            onClick={toggleEyeComfort}
            title={t.eyeComfortTooltip}
            className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all border ${
              eyeComfort
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700 font-bold shadow-2xs'
                : 'theme-control theme-control-hover text-slate-700 dark:text-slate-300 border font-medium'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 ${eyeComfort ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[11px] whitespace-nowrap hidden sm:inline">
              {eyeComfort ? t.eyeComfortOn : t.eyeComfortOff}
            </span>
          </button>

          {/* 3. Bilingual Language Switcher with Globe Icon */}
          <div className="flex items-center rounded-lg theme-control p-0.5 border">
            <div className="pl-1.5 pr-1 text-slate-400 dark:text-slate-500">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-surface text-alt-800 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-surface text-alt-800 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Search Trigger for Mobile */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-control"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-control transition-colors border border-transparent hover:border-app"
              title={t.notifications}
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-header"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 theme-surface-elevated rounded-xl shadow-xl border py-2 z-50 animate-in fade-in">
                <div className="px-4 py-2 border-b border-subtle flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{t.notifications}</span>
                  {notificationCount > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] text-alt-600 dark:text-alt-400 hover:underline font-semibold"
                    >
                      {t.markRead}
                    </button>
                  )}
                </div>
                <div className="divide-y divide-[var(--border-subtle)] text-xs">
                  <div className="p-3 hover:bg-surface-hover transition-colors flex gap-2.5 items-start">
                    <span className="p-1 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-200 dark:border-amber-800">
                      <Calendar className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{t.hearingAt.replace('{time}', '11:30 AM')}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {language === 'hi' ? 'रामेश्वर प्रसाद (ALT-2026-104) कोर्ट 14 में सूचीबद्ध।' : 'Rameshwar Prasad (ALT-2026-104) in Court 14.'}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-surface-hover transition-colors flex gap-2.5 items-start">
                    <span className="p-1 rounded bg-alt-50 dark:bg-alt-950/60 text-alt-600 dark:text-alt-400 shrink-0 border border-alt-200 dark:border-alt-800">
                      <FileText className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{t.custodyCertReq}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {language === 'hi' ? 'दोपहर से पहले तिहाड़ जेल से प्रमाणित प्रति आवश्यक।' : 'Certified copy from Tihar Jail needed before noon.'}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-surface-hover transition-colors flex gap-2.5 items-start">
                    <span className="p-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-200 dark:border-indigo-800">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">{t.aiSynthesisReady}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {language === 'hi' ? 'सक्रिय डॉकेट हेतु धारा 436A विश्लेषण संकलित।' : 'Sec 436A analysis compiled for active docket.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Sign Out */}
          <div className="flex items-center gap-2 pl-2 border-l border-app">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-alt-700 to-indigo-700 flex items-center justify-center text-white text-xs font-bold ring-2 ring-slate-200 dark:ring-slate-700 shadow-2xs">
              PM
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">Adv. Priya Malhotra</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.userRole}</div>
            </div>
            <button
              onClick={logout}
              title={t.exitDemo}
              className="ml-1 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-800"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
