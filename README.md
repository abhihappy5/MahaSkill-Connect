# 🏛️ MahaSkill Connect (महास्किल कनेक्ट)
### *Next-Gen Statewide AI-Powered Labour Market Intelligence & Career Empowerment Platform*

[![Government of Maharashtra](https://img.shields.io/badge/Initiative-Government%20of%20Maharashtra-orange.svg)](https://github.com/abhihappy5/MahaSkill-Connect)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80-22c55e.svg)](https://github.com/abhihappy5/MahaSkill-Connect)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview

**MahaSkill Connect** is a flagship digital public infrastructure application engineered to bridge the critical gap between **industry demand, government vocational training capacity (DVET / MSSDS), and youth employment across Maharashtra's 36 constituent districts and 6 administrative revenue divisions**.

The platform provides a unified ecosystem serving four key stakeholders:
1. 🏛️ **Government Policy & Administrative Officers (GovTech Admin Cockpit)**
2. 💼 **Job Seekers & Vocational Trainees**
3. 🌸 **Career Restart Candidates (Women Returnees & Career Transitioners)**
4. 🎓 **Students & Young Learners**

---

## 🚀 Key Modules & Features

### 1. 🏛️ Government Admin & Labour Intelligence Cockpit
*A decision-support cockpit for Directorate of Vocational Education & Training (DVET) and State Skill Mission leadership.*
- **Interactive High-Resolution Geographic Heatmap**:
  - Live spatial demand analysis across **Konkan, Nashik, Pune, Chhatrapati Sambhaji Nagar (Marathwada), Amravati, and Nagpur**.
  - Color layers for *High Demand (Green), Emerging Sectors (Orange), Critical Skill Deficits (Red), and Training Seat Capacity (Blue)*.
- **Real-Time KPI Diagnostics**:
  - 42 High-Demand Industry Clusters (+48% YoY hiring).
  - 18 Critical Skill Shortages (BMS Telemetry, 5-Axis CNC, Robotics PLC).
  - Oversupplied Trade Audits (<32% placement detection).
  - Capacity Gap Tracking (-14,850 statewide training seat deficit).
  - DigiLocker-verified placement metrics and employer satisfaction indices.
- **Course Health Monitor & Curriculum Gap Detector**:
  - Identifies obsolete trades (Manual DTP, 2D Drafting) and generates official board memos to reallocate funds to EV Diagnostics, Green Hydrogen, and AI Data Engineering.
- **AI Government Policy Copilot**:
  - Automated policy resolution drafting, district skill plan generation, and evidence-backed citations.
- **Persistent Sticky Header & Responsive Drawer Navigation**:
  - Keeps district/industry filters and executive controls accessible throughout deep diagnostic audits on all desktop, tablet, and mobile displays.

---

### 2. 💼 Candidate & Job Seeker Dashboard
*Hyper-personalized career acceleration and skill benchmarking.*
- **AI Job & Apprenticeship Matching**:
  - Live vacancies with salary benchmarks across Maharashtra's MIDCs (Chakan, Waluj, MIHAN, Tarapur, Ambad).
  - Precision compatibility scores with required vs. acquired skills.
- **Skill Gap & Upskilling Engine**:
  - Clear breakdown of required credentials with direct 1-click enrolment into accredited ITI, MSBTE, and NSDC programs.
- **1-Click Application Tracker**:
  - Track applications across *Applied, Shortlisted, Interview Scheduled, and Offer Extended* stages with DigiLocker verification badges.

---

### 3. 🌸 Career Restart Hub (Women Empowerment & Reskilling)
*Dedicated pathway to bring experienced women and transitioners back into Maharashtra's high-growth formal economy.*
- **Transferable Skills Mapping**:
  - Evaluates prior experience, breaks career gaps down into strengths, and maps adjacent modern tech/management roles.
- **AI Career Coach & Confidence Builder**:
  - Step-by-step personalized learning paths with flexible hours, mentorship, and returnship listings.
- **Tailored Returnship Listings**:
  - Remote and hybrid openings with leading Maharashtra employers committed to diversity hiring.

---

### 4. 🎓 Student & Learner Pathway Explorer
*Gamified, future-ready career planning for school & college students.*
- **Emerging Skills Radar**:
  - Interactive roadmaps for Generative AI, Electric Mobility, Industrial Robotics, and Renewable Microgrids.
- **Statewide Course Directory**:
  - Search and filter accredited ITI trades, polytechnic diplomas, and certified university micro-credentials.

---

### 5. 🎙️ Universal AI Voice & Multilingual Assistant
- **Trilingual Native Support**: Seamlessly toggle between **English**, **मराठी (Marathi)**, and **हिन्दी (Hindi)**.
- **Voice Interaction Overlay**: Speak or type queries to receive instant career guidance, course recommendations, and policy queries.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Core** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | Modern Vanilla CSS, HSL Color Palettes, Glassmorphism, CSS Grid & Flexbox |
| **Icons & UI Components** | [Lucide React](https://lucide.dev/) (30+ icons) |
| **Interactive Delight** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Code Quality** | [Oxlint](https://oxc.rs/) Fast Linter |

---

## 📂 Repository Structure

```
MahaSkill/
├── public/
│   ├── maharashtra_map.png     # Official HD Administrative Divisions map
│   ├── maharashtra_seal.svg    # Government of Maharashtra official emblem
│   └── favicon.svg             # Application favicon
├── src/
│   ├── assets/                 # Graphics & static assets
│   ├── components/
│   │   ├── admin/              # Gov Admin Dashboard & Intelligence Cockpit
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminKpiCards.jsx
│   │   │   ├── AdminMapSection.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AiGovCopilot.jsx
│   │   │   ├── CourseHealthTable.jsx
│   │   │   ├── CurriculumGapDetector.jsx
│   │   │   ├── EmergingSkillsRadar.jsx
│   │   │   ├── EmployerSignalsView.jsx
│   │   │   ├── PlacementFunnelView.jsx
│   │   │   └── TrainingCapacityView.jsx
│   │   ├── ai/                 # AI Voice & Chatbot overlay components
│   │   ├── dashboard/          # Job Seeker portal components
│   │   ├── restart/            # Career Restart portal components
│   │   ├── student/            # Student & youth explorer components
│   │   └── public/             # Public career & course views
│   ├── data/                   # State labor market data, translations & district profiles
│   ├── styles/                 # Modular CSS stylesheets (admin, global, dashboard, restart)
│   ├── App.jsx                 # Top-level state & multi-portal routing
│   └── main.jsx                # Application root entry point
├── package.json
└── vite.config.js
```

---

## ⚡ Quickstart & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (Version `v20.19+` or `v22.12+` recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/abhihappy5/MahaSkill-Connect.git
cd MahaSkill-Connect
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser to explore the live application.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Multi-Language Support (बहुभाषिक समर्थन)

The platform is designed ground-up with native localization:
- **English** (Default)
- **मराठी (Marathi)**: Tailored Devanagari typography with localized Maharashtra district and department nomenclature.
- **हिन्दी (Hindi)**: Full interface and assistant translation.

---

## 🤝 Contributing

Contributions are welcome! If you would like to contribute new district datasets, additional course integrations, or UI enhancements:

1. Fork the Project: `https://github.com/abhihappy5/MahaSkill-Connect/fork`
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <strong>MahaSkill Connect</strong> — Empowering Maharashtra's Youth & Powering the State's Industrial Future.
</p>
