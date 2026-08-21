import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, BaseTheme, NavTab, Case, Task, Hearing, DocumentItem } from '../types';
import { translations } from '../i18n/translations';
import { mockCases, mockTasks, mockHearings, mockDocuments } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: BaseTheme;
  setTheme: (theme: BaseTheme) => void;
  eyeComfort: boolean;
  setEyeComfort: (on: boolean) => void;
  toggleEyeComfort: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  t: typeof translations.en;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  cases: Case[];
  tasks: Task[];
  hearings: Hearing[];
  documents: DocumentItem[];
  toggleTaskStatus: (taskId: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  selectedCase: Case;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isCaseUpdateModalOpen: boolean;
  setIsCaseUpdateModalOpen: (open: boolean) => void;
  addCaseUpdate: (caseId: string, updateText: string) => void;
  notificationCount: number;
  clearNotifications: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('alt_demo_session');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('alt_language');
      return (saved === 'hi' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [theme, setThemeState] = useState<BaseTheme>(() => {
    try {
      const saved = localStorage.getItem('alt_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [eyeComfort, setEyeComfortState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('alt_eye_comfort');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('ALT-2026-104');
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [hearings] = useState<Hearing[]>(mockHearings);
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCaseUpdateModalOpen, setIsCaseUpdateModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('alt_language', lang);
    } catch {}
  };

  const setTheme = (newTheme: BaseTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('alt_theme', newTheme);
    } catch {}
  };

  const setEyeComfort = (on: boolean) => {
    setEyeComfortState(on);
    try {
      localStorage.setItem('alt_eye_comfort', String(on));
    } catch {}
  };

  const toggleEyeComfort = () => {
    setEyeComfort(!eyeComfort);
  };

  const login = () => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem('alt_demo_session', 'true');
    } catch {}
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('alt_demo_session');
    } catch {}
  };

  // Synchronize DOM attributes and CSS classes with language, theme + eyeComfort states
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-eye-comfort', String(eyeComfort));

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (eyeComfort) {
      document.documentElement.classList.add('eye-comfort');
    } else {
      document.documentElement.classList.remove('eye-comfort');
    }
  }, [language, theme, eyeComfort]);

  const t = translations[language];

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        const msg = language === 'hi' 
          ? (nextStatus === 'Completed' ? `कार्य "${(task.titleHi || task.title).slice(0, 30)}..." पूर्ण चिह्नित!` : `कार्य पुनः खोला गया।`)
          : (nextStatus === 'Completed' ? `Task "${task.title.slice(0, 30)}..." marked complete!` : `Task reopened.`);
        showToast(msg);
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `TSK-2026-${String(tasks.length + 1).padStart(2, '0')}`
    };
    setTasks(prev => [newTask, ...prev]);
    const msg = language === 'hi'
      ? `${task.caseClientNameHi || task.caseClientName} के लिए नया कार्य जोड़ा गया`
      : `New task added for ${task.caseClientName}`;
    showToast(msg);
  };

  const addCaseUpdate = (caseId: string, updateText: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          pendingAction: updateText,
          pendingActionHi: updateText,
          tasksCount: c.tasksCount + 1
        };
      }
      return c;
    }));
    const msg = language === 'hi'
      ? `${caseId} के लिए केस अपडेट दर्ज किया गया`
      : `Case update logged for ${caseId}`;
    showToast(msg);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    const msg = language === 'hi' ? 'सभी सूचनाएं पढ़ी गईं' : 'Notifications marked as read';
    showToast(msg);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        eyeComfort,
        setEyeComfort,
        toggleEyeComfort,
        isAuthenticated,
        login,
        logout,
        t,
        activeTab,
        setActiveTab,
        selectedCaseId,
        setSelectedCaseId,
        cases,
        tasks,
        hearings,
        documents,
        toggleTaskStatus,
        addTask,
        selectedCase,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isCaseUpdateModalOpen,
        setIsCaseUpdateModalOpen,
        addCaseUpdate,
        notificationCount,
        clearNotifications,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
