# ALT Legal Aid Platform

> An integrated legal operations and case progression workspace designed to streamline undertrial defense workflows, eliminate administrative spreadsheet fragmentation, and support legal aid teams through a centralized digital system.

**[🌐 Live Demo](https://alt-legal-aid-platform.vercel.app/)** &nbsp;|&nbsp; **[📄 Strategy & Product Development Report (PDF)](docs/report/ALT_Legal_Aid_Platform_Strategy_and_Product_Development_Report.pdf)** &nbsp;|&nbsp; **[💻 GitHub Repository](https://github.com/gagandeepsingh76/ALT-Legal-Aid-Platform)**

---

## Overview

The **ALT Legal Aid Platform** prototype demonstrates how legal aid operations across high-volume prison complexes can transition from fragmented spreadsheets, paper notebooks, and phone logs into a unified, advocate-centered digital workspace.

Developed as the implementation demonstration for a **Strategy & Product Development Assignment**, this functional prototype translates strategic change-management recommendations into an interactive software experience. It incorporates proactive priority triage, structured case lifecycle progression, non-disruptive spreadsheet migration, and advocate-supervised AI legal synthesis.

> **Disclaimer:** This prototype is an independently developed implementation demonstration created for product and strategy evaluation purposes and is not the official Project ALT production platform.

---

## Key Capabilities

- **Centralized legal case dashboard** highlighting daily court priorities, active caseloads, and urgent filings
- **Structured case lifecycle and workspace** tracking dockets through a connected six-stage progression model
- **Hearing and deadline management** with court diary briefs, judge bench information, and preparation checklists
- **Task and follow-up tracking** with role-based filtering and instant status updates
- **Document repository and verification workflow** tracking document collection readiness across cases
- **Spreadsheet-based data transition workflow** enabling guided column mapping and diagnostic validation
- **AI-assisted case insights and structured synthesis** under direct advocate supervision
- **Global case search** for quick retrieval across cases, clients, and court dates
- **Bilingual interface support** with complete English and Hindi localization
- **Light, Dark, and Eye Comfort appearance modes** designed for extended legal reading

---

## Product Preview

### Executive Dashboard

<p align="center">
  <img src="docs/images/dashboard.png" alt="ALT Legal Aid Platform Executive Dashboard" width="780" />
</p>

<p align="center">
  <em>Centralized operational visibility for hearings, priorities, documents, and active cases.</em>
</p>


### Case Workspace

<p align="center">
  <img src="docs/images/case-workspace.png" alt="ALT Legal Aid Platform Case Workspace" width="780" />
</p>

<p align="center">
  <em>Structured workspace for case lifecycle tracking, information, notes, and operational actions.</em>
</p>


### Hearings Management

<p align="center">
  <img src="docs/images/hearings.png" alt="ALT Legal Aid Platform Hearings Management" width="780" />
</p>

<p align="center">
  <em>Court diary schedule categorized by court dates with courtroom briefs and required filing checklists.</em>
</p>


### AI Case Insights

<p align="center">
  <img src="docs/images/ai-case-insights.png" alt="ALT Legal Aid Platform AI Case Insights" width="780" />
</p>

<p align="center">
  <em>AI-assisted workspace for organizing source case information into structured legal insights.</em>
</p>


---

## Strategy to Product Mapping

| Strategy Recommendation | Prototype Implementation |
| :--- | :--- |
| **Centralized operational visibility** | Executive Dashboard |
| **Structured case workflow** | Case Workspace and lifecycle tracking |
| **Hearing and deadline visibility** | Hearings and priority alerts |
| **Document workflow** | Document repository |
| **Spreadsheet transition** | Guided import workflow |
| **AI-assisted operations** | AI Case Insights |
| **Accessibility and usability** | Hindi support and appearance modes |

---

## Technology Stack

- **React** (v18)
- **TypeScript**
- **Vite** (v6)
- **Tailwind CSS**
- **Lucide React** (Iconography)
- **React Context API** (Client State & Persistence)

---

## Project Architecture

```
Access / Demo
      ↓
Executive Dashboard
      ↓
Case Workspace
      ↓
Hearings · Tasks · Documents
      ↓
Spreadsheet Import
      ↓
AI Case Insights
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Local Run

```bash
# Clone the repository
git clone https://github.com/gagandeepsingh76/ALT-Legal-Aid-Platform.git

# Navigate to project directory
cd ALT-Legal-Aid-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

---

## Strategy & Product Report

A comprehensive 11-page strategy report accompanies this repository, providing detailed problem diagnosis, role-based workflows, 4-week pilot implementation plans, spreadsheet sunsetting models, and success metrics:

📄 **[Download Full Strategy Report (PDF)](docs/report/ALT_Legal_Aid_Platform_Strategy_and_Product_Development_Report.pdf)**

---

## Disclaimer & Attribution

This repository contains an independently developed product prototype and implementation demonstration created as part of a **Strategy & Product Development Assignment**. It is intended to demonstrate the practical implementation of the proposed recommendations and should not be represented as the official production platform of Project ALT.

**Prepared by:** Gagandeep Singh  
**Assignment:** Strategy & Product Development Assignment  
**Date:** August 2026  
