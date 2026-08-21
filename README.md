# ALT Legal Aid Platform

> A product prototype for organizing legal aid operations through a centralized digital workspace.

[**🌐 Live Demo**](https://alt-legal-aid-platform.vercel.app/) &nbsp;•&nbsp; [**📄 Strategy & Product Report (PDF)**](./docs/report/ALT_Legal_Aid_Platform_Strategy_and_Product_Development_Report.pdf) &nbsp;•&nbsp; [**💻 Source Code**](https://github.com/gagandeepsingh76/ALT-Legal-Aid-Platform)

---

## Overview

The **ALT Legal Aid Platform** prototype demonstrates how legal aid operations across high-volume prison complexes (such as Delhi's Tihar, Rohini, and Mandoli) can transition from fragmented spreadsheets, paper notebooks, and phone logs into a unified, advocate-centered digital system.

Developed as the implementation layer of an in-depth **Product Adoption and 4-Week Pilot Strategy**, this prototype translates strategic change-management recommendations into an interactive interface designed for daily operational adoption. It features proactive priority triage, structured case lifecycle progression, non-disruptive spreadsheet migration, and advocate-controlled AI legal synthesis.

---

## Platform Preview

### Executive Operations Dashboard
Centralized operational cockpit providing immediate visibility into daily court priorities (*Hearing Today*, *Documents Pending*, *Client Follow-ups*, *Case Updates*), active case dockets, and upcoming hearings.

<p align="center">
  <img src="docs/images/dashboard.png" alt="Executive Dashboard" width="850" />
</p>

<br />

### Case Workspace & Lifecycle Progression
Complete 360° case view for flagship case **ALT-2026-104** (*Rameshwar Prasad — Section 436A CrPC / 479 BNSS Undertrial Bail*), featuring an interactive 6-stage lifecycle stepper, case notes timeline, and 9-point verification checklist.

<p align="center">
  <img src="docs/images/case-workspace.png" alt="Case Workspace" width="850" />
</p>

<br />

### AI Case Insights & Analytical Synthesis
Split-view legal intelligence workspace pairing source records (police FIR transcripts, intake records) with structured legal synthesis, timeline extraction, and statutory bail precedent citations (*Satender Kumar Antil v. CBI*).

<p align="center">
  <img src="docs/images/ai-case-insights.png" alt="AI Case Insights" width="850" />
</p>

<br />

### Institutional Access & Transition Portal
Advocate login interface with 1-click Demo Advocate access, language toggle, appearance controls, and Supreme Court visual transition.

<p align="center">
  <img src="docs/images/login-page.png" alt="Login Page" width="850" />
</p>

---

## What It Does

- **Centralized Dashboard**: Real-time caseload tracking, daily priority alerts, and court diary schedule.
- **Case Workspace**: Flagship case inspection with connected 6-stage lifecycle stepper and 9-point document verification checklist.
- **Hearings & Calendar**: Categorized court diary (*Today*, *This Week*, *Upcoming*) with bench composition and courtroom briefs.
- **Tasks & Document Vault**: Role-based task management with instant status toggles and categorized document repository with modal previews.
- **Spreadsheet Import Bridge**: 5-step guided wizard (*Upload &rarr; Preview &rarr; Mapping &rarr; Diagnostics &rarr; Ingestion*) for safe migration of legacy Excel rosters.
- **AI Case Insights**: Source document OCR inspection, automated charge extraction (IPC/BNS), and statutory bail precedent recommendations.
- **Bilingual Interface**: Seamless toggle between English and हिंदी with protective `Noto Sans Devanagari` typography.
- **Tri-Mode Appearance Engine**:
  - **Light Mode**: Clean, institutional slate/white surfaces.
  - **Dark Mode**: Midnight navy surfaces with high-contrast text.
  - **Eye Comfort Mode**: Warm ivory/charcoal modifier designed for extended legal reading.
- **Global Command Search**: Quick search modal (`⌘K` / `Ctrl+K`) for instantaneous lookup across cases, clients, and court dates.

---

## From Strategy to Product

| Strategic Recommendation | Prototype Implementation | Operational Benefit |
| :--- | :--- | :--- |
| **Centralized visibility** | Executive Dashboard | Eliminates fragmented tracking across disconnected tools |
| **Structured case workflow** | Case Workspace & 6-Stage Stepper | Provides a single, clear operational view of active files |
| **Hearing visibility & preparation** | Hearings Diary & Priority Badges | Prevents missed court dates and accelerates hearing readiness |
| **Document organization** | Document Repository & Status Markers | Makes document readiness transparent before filings |
| **Spreadsheet transition** | 5-Step Ingestion Wizard | Establishes a safe bridge for moving legacy records without data loss |
| **AI-assisted operations** | AI Case Insights & Precedent Synthesis | Saves 2–3 hours of drafting per case under advocate supervision |
| **Accessibility & usability** | Light, Dark, Eye Comfort + English/Hindi | Reduces eye strain and supports diverse linguistic preferences |

---

## Product Flow

```
Login / Demo Advocate Access
  └── Executive Dashboard
        ├── Today's Priorities (Hearings Today, Pending Docs, Follow-ups)
        ├── Case Workspace (6-Stage Stepper, Checklist, Timeline)
        ├── Hearings Diary & Courtroom Briefs
        ├── Actionable Tasks & Document Vault
        ├── 5-Step Spreadsheet Ingestion Wizard
        └── AI Case Insights & Decision Support
```

---

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS + Custom Semantic CSS Tokens
- **Typography:** Google Fonts (`Inter`, `Plus Jakarta Sans`, `Noto Sans Devanagari`)
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage persistence
- **Deployment:** Vercel (Edge CDN)

---

## Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Clone Repository
```bash
git clone https://github.com/gagandeepsingh76/ALT-Legal-Aid-Platform.git
cd ALT-Legal-Aid-Platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## Strategy & Product Report

This prototype accompanies a formal 11-page strategy document:

- **Document:** [**Download PDF Report**](./docs/report/ALT_Legal_Aid_Platform_Strategy_and_Product_Development_Report.pdf)
- **Report Contents:** Baseline platform analysis, adoption root-cause diagnosis, human-centered "Adoption Bridge", role-based daily workflows, 4-week pilot implementation plan, 3-stage spreadsheet sunsetting model, adoption micro-rituals, success metrics scorecard, Go/Modify/Stop decision framework, and prototype technical validation proof.

---

## Scope & Attribution Disclaimer

> **Implementation Disclaimer & Epistemic Boundaries:**  
> This repository contains an independently developed product prototype and implementation demonstration created as part of a **Strategy & Product Development Assignment**. It is intended to demonstrate the practical operationalization of the strategic recommendations and should **not** be represented as the official production platform of Project ALT.

**Prepared by:** Gagandeep Singh  
**Assignment:** Strategy & Product Development Assignment  
**Date:** August 2026  
