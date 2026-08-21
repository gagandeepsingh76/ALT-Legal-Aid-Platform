export type Language = 'en' | 'hi';

export type BaseTheme = 'light' | 'dark';

export type NavTab = 
  | 'dashboard'
  | 'cases'
  | 'case-workspace'
  | 'tasks'
  | 'hearings'
  | 'documents'
  | 'import'
  | 'ai-insights';

export type Priority = 'High' | 'Medium' | 'Low' | 'Urgent';

export type CaseStatus = 'Active' | 'Under Review' | 'Hearing Scheduled' | 'Pending Documents' | 'Disposed';

export type CaseStage = 
  | 'Case Intake'
  | 'Documentation'
  | 'Case Analysis'
  | 'Legal Strategy'
  | 'Hearing'
  | 'Monitoring';

export interface Case {
  id: string;
  clientName: string;
  clientNameHi?: string;
  clientPhone: string;
  gender: string;
  genderHi?: string;
  age: number;
  location: string;
  locationHi?: string;
  court: string;
  courtHi?: string;
  caseType: string;
  caseTypeHi?: string;
  stage: CaseStage;
  status: CaseStatus;
  priority: Priority;
  nextHearingDate: string;
  nextHearingDateHi?: string;
  nextHearingPurpose: string;
  nextHearingPurposeHi?: string;
  assignedAdvocate: string;
  assignedParalegal: string;
  fillingDate: string;
  summary: string;
  summaryHi?: string;
  pendingAction: string;
  pendingActionHi?: string;
  keyFacts: string[];
  keyFactsHi?: string[];
  missingDocsCount: number;
  tasksCount: number;
}

export interface Task {
  id: string;
  caseId: string;
  caseClientName: string;
  caseClientNameHi?: string;
  title: string;
  titleHi?: string;
  dueDate: string;
  dueDateHi?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: Priority;
  assignedTo: string;
  category: 'Filing' | 'Client Contact' | 'Document' | 'Verification' | 'Research';
  categoryHi?: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  clientName: string;
  clientNameHi?: string;
  court: string;
  courtHi?: string;
  bench: string;
  benchHi?: string;
  date: string;
  dateHi?: string;
  time: string;
  timeHi?: string;
  hearingType: string;
  hearingTypeHi?: string;
  assignedAdvocate: string;
  purpose: string;
  purposeHi?: string;
  status: 'Today' | 'This Week' | 'Upcoming' | 'Completed';
  requiredDocuments: string[];
  requiredDocumentsHi?: string[];
  preparednessStatus: 'Ready' | 'Needs Brief' | 'Pending Documents';
}

export interface DocumentItem {
  id: string;
  caseId: string;
  clientName: string;
  clientNameHi?: string;
  title: string;
  titleHi?: string;
  category: 'Petition' | 'Affidavit' | 'FIR' | 'Identity / Aadhar' | 'Court Order' | 'Medical Certificate' | 'Vakalatnama';
  categoryHi?: string;
  uploadedDate: string;
  uploadedDateHi?: string;
  status: 'Verified' | 'Pending Review' | 'Missing / Action Required';
  fileSize?: string;
  uploadedBy: string;
  uploadedByHi?: string;
}

export interface ActivityItem {
  id: string;
  caseId: string;
  timestamp: string;
  timestampHi?: string;
  user: string;
  role: string;
  roleHi?: string;
  action: string;
  actionHi?: string;
  type: 'hearing' | 'document' | 'note' | 'status' | 'task';
}

export interface CaseNote {
  id: string;
  caseId: string;
  author: string;
  role: string;
  roleHi?: string;
  date: string;
  dateHi?: string;
  category: 'Client Interview' | 'Investigation' | 'Court Proceedings' | 'Strategy Note';
  categoryHi?: string;
  content: string;
  contentHi?: string;
}

export interface RawSpreadsheetRow {
  id: number;
  clientName: string;
  clientNameHi?: string;
  caseNumber: string;
  courtName: string;
  courtNameHi?: string;
  status: string;
  statusHi?: string;
  nextHearing: string;
  nextHearingHi?: string;
  advocate: string;
  caseType: string;
  caseTypeHi?: string;
  phone: string;
  hasErrors?: boolean;
  notes?: string;
}

export interface AIInsightData {
  caseId: string;
  clientName: string;
  summary: string;
  summaryHi?: string;
  keyFacts: string[];
  keyFactsHi?: string[];
  importantDates: { event: string; eventHi?: string; date: string; dateHi?: string; criticality: 'High' | 'Medium' | 'Normal' }[];
  missingInformation: string[];
  missingInformationHi?: string[];
  pendingDocuments: string[];
  pendingDocumentsHi?: string[];
  suggestedNextActions: {
    title: string;
    titleHi?: string;
    rationale: string;
    rationaleHi?: string;
    impact: string;
    impactHi?: string;
    recommendedTimeframe: string;
    recommendedTimeframeHi?: string;
  }[];
}
