import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Shield, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Eye, 
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import supremeCourtBg from '../../assets/supreme_court_india.jpg';

export const LoginView: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    eyeComfort, 
    toggleEyeComfort, 
    login, 
    t 
  } = useApp();

  const [advocateId, setAdvocateId] = useState('advocate@alt.demo');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const isDark = theme === 'dark';

  const startDemoLogin = () => {
    setIsTransitioning(true);
    setTransitionStep(1);
    setProgress(20);
  };

  useEffect(() => {
    if (!isTransitioning) return;

    // Staged step progression
    const timer1 = setTimeout(() => {
      setTransitionStep(2);
      setProgress(50);
    }, 600);

    const timer2 = setTimeout(() => {
      setTransitionStep(3);
      setProgress(80);
    }, 1250);

    const timer3 = setTimeout(() => {
      setTransitionStep(4);
      setProgress(100);
    }, 1900);

    const timerFinal = setTimeout(() => {
      login();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerFinal);
    };
  }, [isTransitioning, login]);

  // Adaptive theme overlay for centered layout
  const getOverlayGradient = () => {
    if (isDark) {
      if (eyeComfort) {
        return 'from-[#14171e]/90 via-[#14171e]/75 to-[#14171e]/92';
      }
      return 'from-[#0a0f1d]/90 via-[#0a0f1d]/75 to-[#0a0f1d]/92';
    } else {
      if (eyeComfort) {
        return 'from-[#fbf9f4]/90 via-[#fbf9f4]/75 to-[#fbf9f4]/92';
      }
      return 'from-[#f8fafc]/90 via-[#f8fafc]/75 to-[#f8fafc]/92';
    }
  };

  const getHeaderBg = () => {
    if (isDark) {
      return eyeComfort 
        ? 'bg-[#1b2029]/80 border-[#313a4a] text-[#e8e5de]' 
        : 'bg-[#111a2e]/80 border-[#1e2d4a] text-slate-100';
    } else {
      return eyeComfort 
        ? 'bg-[#f7f3ea]/90 border-[#e2dac7] text-[#2d251d]' 
        : 'bg-white/90 border-slate-200 text-slate-900';
    }
  };

  const getCardBg = () => {
    if (isDark) {
      return eyeComfort 
        ? 'bg-[#1b2029]/95 border-[#313a4a] text-[#e8e5de]' 
        : 'bg-[#111a2e]/95 border-[#1e2d4a] text-slate-100';
    } else {
      return eyeComfort 
        ? 'bg-[#f7f3ea]/95 border-[#e2dac7] text-[#2d251d]' 
        : 'bg-white/95 border-slate-200 text-slate-900';
    }
  };

  const getInputBg = () => {
    if (isDark) {
      return eyeComfort
        ? 'bg-[#14171e] border-[#313a4a] text-[#e8e5de]'
        : 'bg-[#0a0f1d] border-[#1e2d4a] text-slate-100';
    } else {
      return eyeComfort
        ? 'bg-[#ede7da] border-[#dfd6c2] text-[#2d251d]'
        : 'bg-[#f8fafc] border-slate-300 text-slate-900';
    }
  };

  const getDemoBoxBg = () => {
    if (isDark) {
      return eyeComfort
        ? 'bg-[#242b37]/80 border-[#313a4a]'
        : 'bg-[#16223b]/80 border-[#1e2d4a]';
    } else {
      return eyeComfort
        ? 'bg-[#ede7da]/80 border-[#e2dac7]'
        : 'bg-[#f1f5f9] border-[#e2e8f0]';
    }
  };

  const getTextSecondary = () => {
    if (isDark) {
      return eyeComfort ? 'text-[#a39e94]' : 'text-slate-400';
    } else {
      return eyeComfort ? 'text-[#5c5245]' : 'text-slate-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans select-none transition-colors duration-200">
      
      {/* Supreme Court Architectural Background Image (Crisp & Recognizable) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${supremeCourtBg})` }}
      />

      {/* Adaptive Scrim Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getOverlayGradient()} transition-colors duration-200`} />

      {/* Top Institutional Navigation Bar */}
      <header className={`relative z-10 w-full border-b backdrop-blur-md transition-colors duration-200 ${getHeaderBg()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-alt-800 to-slate-900 flex items-center justify-center text-white shadow-xs border border-alt-700/50">
              <Scale className="w-4 h-4 text-alt-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight leading-snug">ALT</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-alt-500/15 text-alt-700 dark:text-alt-300 border border-alt-500/30 uppercase tracking-wider">
                  {t.conceptBadge}
                </span>
              </div>
              <p className={`text-[10px] font-medium hidden sm:block leading-snug ${getTextSecondary()}`}>
                {t.appTitle}
              </p>
            </div>
          </div>

          {/* Appearance & Language Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Eye Comfort Toggle */}
            <button
              onClick={toggleEyeComfort}
              title={t.eyeComfortTooltip}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                eyeComfort
                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-xs'
                  : 'theme-control text-slate-700 dark:text-slate-300 border-app hover:bg-control-hover'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {eyeComfort ? t.eyeComfortOn : t.eyeComfortOff}
              </span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <div className="flex items-center p-0.5 rounded-lg border theme-control border-app">
              <button
                onClick={() => setTheme('light')}
                title={t.themeLight}
                className={`p-1.5 rounded-md transition-colors ${
                  !isDark
                    ? 'bg-surface text-amber-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                title={t.themeDark}
                className={`p-1.5 rounded-md transition-colors ${
                  isDark
                    ? 'bg-surface text-alt-300 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Language Switcher (EN / हिंदी) */}
            <div className="flex items-center p-0.5 rounded-lg border theme-control border-app">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-alt-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'hi'
                    ? 'bg-alt-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Composition: Centered Advocate Login Experience */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-md mx-auto space-y-5 text-center">
          
          {/* Centered Heading & Institutional Context */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-alt-500/10 border border-alt-500/30 text-alt-700 dark:text-alt-300 text-[11px] font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.loginBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              {t.loginTitle}
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm mx-auto ${getTextSecondary()}`}>
              {t.loginSubtitle}
            </p>
          </div>

          {/* Centered Login Card */}
          <div className={`p-6 sm:p-7 rounded-xl border shadow-2xl backdrop-blur-md space-y-4 text-left transition-colors duration-200 ${getCardBg()}`}>
            
            <div className="border-b pb-3 border-[var(--border)]">
              <h2 className="text-base font-bold flex items-center gap-2 leading-snug">
                <UserCheck className="w-4 h-4 text-alt-600 dark:text-alt-400" />
                <span>{t.advocateLogin}</span>
              </h2>
              <p className={`text-xs mt-0.5 leading-snug ${getTextSecondary()}`}>
                {language === 'hi' 
                  ? 'अधिवक्ता कार्यक्षेत्र एवं केस इंटेलिजेंस कंसोल में प्रवेश करें'
                  : 'Sign in to access your legal operations console'}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  {t.advocateIdOrEmail}
                </label>
                <div className="relative">
                  <Mail className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${getTextSecondary()}`} />
                  <input 
                    type="text" 
                    value={advocateId}
                    onChange={(e) => setAdvocateId(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-mono border focus:outline-hidden focus:ring-1 focus:ring-alt-500 transition-colors ${getInputBg()}`}
                    placeholder={t.advocateIdPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${getTextSecondary()}`} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs font-mono border focus:outline-hidden focus:ring-1 focus:ring-alt-500 transition-colors ${getInputBg()}`}
                    placeholder={t.passwordPlaceholder}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-400 text-alt-600 focus:ring-alt-500" 
                  />
                  <span className={getTextSecondary()}>{t.rememberMe}</span>
                </label>
              </div>
            </div>

            {/* Primary Demo Login Action */}
            <div className="space-y-3 pt-1">
              <button
                onClick={startDemoLogin}
                disabled={isTransitioning}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-alt-700 to-alt-800 hover:from-alt-600 hover:to-alt-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-[0.99] border border-alt-600 group"
              >
                {isTransitioning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.openingWorkspace}</span>
                  </>
                ) : (
                  <>
                    <span>{t.continueWithDemoAdvocate}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              {/* Demo Access Info Box */}
              <div className={`p-3 rounded-lg border space-y-1 text-left ${getDemoBoxBg()}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-alt-700 dark:text-alt-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.demoAccessTitle}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {t.demoEmail}
                  </span>
                </div>
                <p className={`text-[11px] leading-snug ${getTextSecondary()}`}>
                  {t.demoAccessDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Legal Prototype Notice */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 text-center px-1">
            <Shield className="w-3.5 h-3.5 shrink-0 text-alt-600" />
            <p className="leading-snug">
              {t.institutionalSecurityNote}
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 py-2.5 text-center text-[10px] border-t transition-colors ${getHeaderBg()}`}>
        <p className={getTextSecondary()}>
          ALT Legal Aid Platform • Proposed Product Experience • Access to Justice Concept Prototype
        </p>
      </footer>

      {/* ====================================================
          SUPREME COURT TRANSITION SCREEN (Strong & Dignified)
          ==================================================== */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white animate-in fade-in duration-300">
          
          {/* Supreme Court Visual Background with Prominent Presence & Slow Zoom */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-3000 ease-out transform scale-105"
            style={{ backgroundImage: `url(${supremeCourtBg})` }}
          />

          {/* Subtle Scrim Vignette so the Building Facade Remains Strongly Visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/40 backdrop-blur-[1px]" />

          {/* Central Institutional Loading Container */}
          <div className="relative z-10 w-full max-w-md mx-4 p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md text-center space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* National Legal Insignia */}
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-alt-800 to-slate-900 flex items-center justify-center text-white shadow-lg border border-alt-500/30">
              <Scale className="w-6 h-6 text-alt-200" />
            </div>

            {/* Titles */}
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                {t.supremeCourtIndia}
              </h2>
              <p className="text-xs text-alt-300 font-medium">
                {t.preparingLegalWorkspace}
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-alt-500 to-emerald-400 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{language === 'hi' ? 'कार्यक्षेत्र आरंभीकरण' : 'INITIALIZING WORKSPACE'}</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* 4 Staged Loading Sequential Messages */}
            <div className="space-y-2 text-left bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
              {/* Step 1 */}
              <div className={`flex items-center gap-2.5 text-xs transition-opacity ${transitionStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                {transitionStep > 1 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 border-2 border-alt-400 border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                <span className={transitionStep === 1 ? 'font-bold text-alt-300' : 'text-slate-300'}>
                  {t.loadingStep1}
                </span>
              </div>

              {/* Step 2 */}
              <div className={`flex items-center gap-2.5 text-xs transition-opacity ${transitionStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                {transitionStep > 2 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : transitionStep === 2 ? (
                  <div className="w-3.5 h-3.5 border-2 border-alt-400 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={transitionStep === 2 ? 'font-bold text-alt-300' : 'text-slate-300'}>
                  {t.loadingStep2}
                </span>
              </div>

              {/* Step 3 */}
              <div className={`flex items-center gap-2.5 text-xs transition-opacity ${transitionStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                {transitionStep > 3 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : transitionStep === 3 ? (
                  <div className="w-3.5 h-3.5 border-2 border-alt-400 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={transitionStep === 3 ? 'font-bold text-alt-300' : 'text-slate-300'}>
                  {t.loadingStep3}
                </span>
              </div>

              {/* Step 4 */}
              <div className={`flex items-center gap-2.5 text-xs transition-opacity ${transitionStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                {transitionStep >= 4 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={transitionStep === 4 ? 'font-bold text-emerald-400' : 'text-slate-400'}>
                  {t.loadingStep4}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-snug">
              {language === 'hi'
                ? 'न्याय तक पहुँच • कानूनी संचालन • केस इंटेलिजेंस'
                : 'Access to Justice • Case Operations • Legal Intelligence'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
