# UniFlow

> **One Profile. Every Stage. Zero Repetition.**  
> An integrated digital ecosystem for cross-domain continuity in a student's life journey.  
> *Built for ColoHacks 2026 (Software Track)*

![UniFlow Banner](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 🛑 The Problem

Modern life is increasingly mediated through fragmented digital systems. As students transition between critical life stages—from education to employment, or routine health management to financial planning—they encounter disconnected systems.

- **Repeated Verification:** Students constantly re-submit the same documents to different institutions.
- **Inconsistent Records:** Information in one environment (e.g., academic credits) is not easily interpretable or usable in another (e.g., job portals or bank loan applications).
- **Lack of Contextual Awareness:** Institutions operate on partial information, limiting their ability to anticipate needs or streamline processes.

## 🚀 The Solution: UniFlow

**UniFlow** is an AI-powered Unified Student Life Platform designed to connect academic, health, career, and financial data into one intelligent, secure hub.

Instead of digitizing yet another disjointed service, UniFlow acts as the **central nervous system** of a student's digital life. It bridges the gap between disparate systems using secure integrations, zero-trust consent protocols, and AI-driven insights to provide true cross-domain continuity.

---

## ✨ Key Features

### 1. 📊 Transition Readiness Score
A real-time, AI-driven metric spanning 5 life domains (Academic, Career, Health, Finance, Identity). It analyzes your data to provide a holistic readiness score and actionable AI recommendations to improve your standing.

### 2. ⚡ One-Click Bundle Generator
Stop hunting for documents. Generate secure, purpose-built verified document bundles (e.g., for Job Applications, Scholarships, College Admissions) in seconds. 

### 3. 🛡️ Zero-Trust Consent Manager
Nothing leaves your vault without explicit approval. Institutions request specific documents, and you retain full control over who accesses your data and for how long.

### 4. 🤖 AI Career Advisor
Powered by Gemini AI, the advisor has full (secure) access to your profile context (CGPA, skills, projects) to provide hyper-personalized career guidance, skill gap analysis, and 30-day placement plans.

### 5. 🔌 Secure Platform Integrations
Seamlessly connects with verified government platforms:
- **DigiLocker** (Identity & Certificates)
- **ABHA** (Health Records)
- **APAAR** (Academic Bank of Credits)

---

## 🛠️ Technology Stack

### Frontend Prototype
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4, Custom Design System (`globals.css`)
- **Animation:** Framer Motion
- **Data Visualization:** Recharts
- **Icons & UI:** Lucide React, React Hot Toast

### Proposed Backend Architecture (See `technical_architecture.md`)
- **API Server:** Node.js + Express / FastAPI
- **Database:** MongoDB (Documents) + PostgreSQL (Transactions/Consent)
- **AI Integration:** Google Gemini API (RAG pipelines)
- **Security:** OAuth 2.0, JWT, AES-256 Encryption

---

## ⚙️ How to Run Locally

Currently, the application is presented as a high-fidelity, fully functional frontend prototype utilizing simulated mock data for demonstrating architectural patterns without a live backend requirement.

1. **Clone the repository**
   ```bash
   git clone https://github.com/TechWithAkash/uniflow.git
   cd uniflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Experience the Demo**
   - Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal).
   - Click **Try the Demo**.
   - Use the **🚀 Demo Login** button for an instant, authenticated dashboard experience.

---

## 📁 Project Structure

```text
colohacks/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes (Main UI)
│   ├── globals.css       # Custom design system and CSS variables
│   └── page.js           # Main landing page
├── components/           # Reusable React components
│   └── layout/           # AppLayout, Sidebar
├── context/              # React Context (Auth State)
├── lib/                  # Utilities and mock data
│   └── mockData.js       # Simulated backend data for the prototype
└── technical_architecture.md # Comprehensive architectural documentation
```

---

## 🔮 Future Scope

- **Real Integrations:** Implementing live OAuth APIs with DigiLocker, ABHA, and APAAR.
- **Blockchain Verification:** Utilizing decentralized ledgers to ensure document immutability.
- **Institutional Portals:** Building the counterpart UI where universities/companies can issue credentials and request data.
- **Advanced Predictive AI:** Forecasting potential loan defaults or academic dropouts before they happen based on multi-domain behavior.

---

*Designed and developed by Akash Vishwakarma.*
