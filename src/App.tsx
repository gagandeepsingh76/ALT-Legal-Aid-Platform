import React from 'react';
import { useApp } from './context/AppContext';
import { LoginView } from './components/auth/LoginView';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { CasesListView } from './components/cases/CasesListView';
import { CaseWorkspaceView } from './components/cases/CaseWorkspaceView';
import { TasksView } from './components/tasks/TasksView';
import { HearingsView } from './components/hearings/HearingsView';
import { DocumentsView } from './components/documents/DocumentsView';
import { SpreadsheetImportView } from './components/import/SpreadsheetImportView';
import { AICaseInsightsView } from './components/ai/AICaseInsightsView';
import { CaseUpdateModal } from './components/modals/CaseUpdateModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { CheckCircle2 } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab, toastMessage } = useApp();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen flex flex-col app-container transition-colors duration-200 animate-in fade-in duration-300">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Header */}
      <Header />

      {/* Body Layout: Sidebar + Main Content View */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'cases' && <CasesListView />}
          {activeTab === 'case-workspace' && <CaseWorkspaceView />}
          {activeTab === 'tasks' && <TasksView />}
          {activeTab === 'hearings' && <HearingsView />}
          {activeTab === 'documents' && <DocumentsView />}
          {activeTab === 'import' && <SpreadsheetImportView />}
          {activeTab === 'ai-insights' && <AICaseInsightsView />}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 theme-surface-elevated px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-app animate-in slide-in-from-bottom-5 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <CaseUpdateModal />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
