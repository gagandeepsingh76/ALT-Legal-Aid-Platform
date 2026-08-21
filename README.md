# ALT Legal Aid Platform — Proposed Product Experience

> **Concept Prototype Disclaimer**  
> *This interface demonstrates proposed product and workflow improvements based on an independent analysis of the ALT Legal Aid Platform. It is a standalone frontend concept prototype and not an official production system or affiliated release.*

---

## 📌 Project Overview & Purpose

The central idea behind this interactive concept prototype is:

> *"The existing platform may already contain important capabilities. This concept explores how those capabilities and workflows could be made easier to adopt, easier to navigate, and more naturally integrated into the daily work of legal professionals and field teams."*

This prototype addresses key workflow challenges identified in legal aid operations:
1. **Workflow Friction:** Replaces fragmented spreadsheets, notebooks, and chat threads with an integrated daily action center.
2. **Next Action Clarity:** Directly answers *"What should I do next?"* via priority cards and actionable docket summaries.
3. **Information Fragmentation:** Unifies case intake, lifecycle progression, filings, notes, and hearings into one cohesive **Unified Case Workspace**.
4. **Spreadsheet Transition Bridge:** Demonstrates an assisted, 5-step column-mapping ingestion wizard to transition legacy Excel roster sheets into ALT without data loss.
5. **Bilingual Accessibility:** Features a toggle between **English and हिंदी** with localized legal terminology.
6. **Triple Appearance Modes:** Seamlessly toggles between **Light**, **Dark**, and **Eye Comfort Mode** (optimized for extended legal reading).
7. **Conceptual AI Assistance:** Visualizes how AI could safely assist legal advocates by extracting timelines, missing documents, and strategic arguments—always under advocate review.

---

## 🎨 Visual Design & Domain Iconography Upgrades

| Visual Domain Feature | Implementation in Prototype |
| :--- | :--- |
| **Consistent Legal Icon System** | Scaled domain icons for Courts (`Scale`, `Gavel`), Case Files (`Folder`, `Briefcase`), Advocates & Clients (`User`, `Shield`), Courtroom Calendars (`Calendar`, `Clock`), and Document Verifications (`FileCheck`, `FileText`). |
| **3-Mode Appearance Engine** | **Light Mode** (clean institutional slate/white), **Dark Mode** (deep midnight navy `#0a0f1d`), and **Eye Comfort Mode** (warm soothing sepia `#fbf7ee` for long legal reading). |
| **Editorial Dashboard Layout** | Replaced generic cards with a hero operations console, courthouse watermark illustration, today's focus indicators, and priority action items. |
| **Interactive Case Lifecycle Diagram** | Connected 6-node progression workflow (`Intake` &rarr; `Documentation` &rarr; `Analysis` &rarr; `Strategy` &rarr; `Hearing` &rarr; `Monitoring`) with active stage pulses and stage inspection drawers. |
| **Spreadsheet Ingestion Pipeline** | 4-phase transformation journey visual: `[Raw Excel / CSV]` &rarr; `[Schema Mapping]` &rarr; `[Validation Diagnostics]` &rarr; `[ALT Case Files]`. |
| **Analytical AI Workspace** | Split-screen analytical interface: realistic document paper mockup with police FIR seals on the left, structured category chips on the right. |
| **Document Thumbnails & Previews** | Document type badges (`PETITION`, `FIR`, `AFFIDAVIT`, `IDENTITY`, `JUDICIAL`), verification status markers, and interactive modal previews. |

---

## 🚀 Key Features & Product Pages

| Page / Module | Purpose & User Workflow |
| :--- | :--- |
| **1. Role-Oriented Dashboard** | Focuses on immediate priorities (*Hearing Today*, *Documents Pending*, *Client Follow-up*, *Case Updates*), active case tables, upcoming court diary, and quick actions. |
| **2. Case Management** | Filterable, searchable portfolio of active cases with multi-criteria filtering by Stage, Status, and Priority, plus quick-peek drawers. |
| **3. Unified Case Workspace** | Deep dive into flagship case **ALT-2026-104** (*Rameshwar Prasad - Sec 436A CrPC Undertrial Bail*). Includes a 6-stage lifecycle stepper, case notes timeline, document verification status, audit trail, and task checklist. |
| **4. Bilingual Interaction** | Working English / हिंदी switcher translating navigation, dashboard priorities, lifecycle stages, and action labels. |
| **5. Spreadsheet Transition Concept** | Interactive 5-step import workflow: File Selection &rarr; Data Preview &rarr; Column-to-Field Mapping &rarr; Diagnostic Validation &rarr; Simulated Ingestion. |
| **6. AI Case Insights** | Side-by-side conceptual legal intelligence: Source case records (FIR transcript / Intake notes) on the left, structured legal synthesis (Summary, Key Facts, Important Dates, Missing Info, Suggested Next Actions) on the right with direct *"Add to Task List"* integration. |
| **7. My Tasks** | Actionable task queue categorized by *Due Today*, *Upcoming*, *Overdue*, and *Completed* with instant completion toggles. |
| **8. Hearings Diary** | Court diary schedule organized by *Today*, *This Week*, and *Upcoming* with judge bench info, courtroom briefs, and document checklists. |
| **9. Document Repository** | Categorized repository tracking *Verified*, *Pending Review*, and *Action Required* case documents with instant preview. |

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables for Themes (Light / Dark / Eye Comfort)
- **Icons:** Lucide React (Consistent Legal Domain Iconography)
- **Architecture:** Client-side State Architecture (React Context API + Mock Data, zero backend/API/database dependencies)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔒 Scope & Data Integrity

- **Frontend Only:** All data, AI insights, and spreadsheet import flows are completely simulated using static mock data and local client state.
- **Privacy & Safety:** All names, case numbers, and situations are strictly fictional demonstration records.
- **Isolation:** This project resides entirely within its dedicated folder and makes zero modifications to parent reports or PDF documents.
