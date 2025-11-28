# ROI-Workspace (Radiation Oncology Intelligent Workspace)

A comprehensive React admin panel application for radiation oncology specialists, showcasing modern radiotherapy concepts and AI-assisted clinical workflows.

## 🎯 Overview

ROI-Workspace is a portfolio/demo application designed for radiation oncology professionals. It integrates patient management, multidisciplinary tumor boards, toxicity tracking, radiobiological calculations, and AI-powered treatment planning assistance.

**⚠️ Important:** This is a demonstration application for portfolio purposes only. All data is stored locally using localStorage. Not intended for real patient data.

## ✨ Features

### 📊 Dashboard
- Real-time overview of patient statistics
- Treatment status monitoring
- Risk stratification summary
- AI and clinical concept tags

### 🏥 Patients & Case Database
- Complete patient record management (CRUD operations)
- Patient demographics and clinical details
- Status tracking (Active/Completed/Follow-up)
- Risk group classification (High/Intermediate/Low)

### 👥 Tumor Board MDT
- Multidisciplinary team case management
- Discussion notes and consensus recording
- Treatment plan documentation
- Date-stamped case records

### 📋 Toxicity Tracker (PROs)
- Patient Reported Outcomes tracking
- Symptom severity grading (Mild/Moderate/Severe → Grade 1/2/3)
- Alert system for Grade ≥2 toxicities
- Date-based reporting

### 🧮 OncoSim (BED/EQD2 Calculator)
- Radiobiological dose calculations
- BED (Biological Effective Dose) computation
- EQD2 (Equivalent Dose in 2 Gy fractions) conversion
- α/β ratio customization
- Clinical reference values

### ⚕️ Dr. Sobri Workflow
- AI-assisted treatment planning workflow
- Segmentation instruction interface
- Mock AI analysis simulation
- Treatment plan suggestions
- Workflow state persistence

## 🛠️ Technology Stack

- **Framework:** React 18+ (Functional Components + Hooks)
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Data Persistence:** localStorage
- **Styling:** Pure CSS with CSS Variables (Dark Theme)
- **Design:** Medical/Clinical/AI Aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd roi-workspace
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
roi-workspace/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── StatCard.jsx
│   ├── layout/           # Layout components
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── MDT.jsx
│   │   ├── Toxicity.jsx
│   │   ├── OncoSim.jsx
│   │   └── DrSobriWorkflow.jsx
│   ├── utils/            # Utility functions
│   │   └── storage.js
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design Features

- **Dark Theme:** Navy/slate background with cyan/teal accents
- **Admin Panel Layout:** Sidebar navigation + topbar + main content area
- **Responsive Design:** Mobile-friendly interface
- **Medical Aesthetic:** Clean, professional, clinical UI
- **Interactive Elements:** Cards, pills, badges, tables, and widgets

## 💾 Data Storage

All application data is stored in the browser's localStorage:
- `patients` - Patient records
- `mdtCases` - MDT case discussions
- `toxicityReports` - Toxicity tracking data
- `drSobriWorkflow` - Workflow state and results

Data persists across browser sessions but is local to each browser.

## 🌐 Deployment

This application is ready for deployment to static hosting platforms:

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build command: `npm run build`
4. Configure publish directory: `dist`

### Vercel
1. Import the project to Vercel
2. Build settings are automatically detected
3. Deploy

### GitHub Pages
1. Build the project
2. Deploy the `dist` folder to gh-pages branch

## 🔐 Security & Privacy

- No external API calls
- No backend server required
- All data stored locally in browser
- No sensitive patient data should be entered
- Demo/educational purposes only

## 📚 Clinical Concepts Demonstrated

- AI Contouring & Auto-segmentation
- Adaptive Radiotherapy
- IMRT/VMAT/Proton Planning
- Radiobiological Modeling (BED/EQD2)
- Patient Reported Outcomes (PROs)
- Multidisciplinary Tumor Boards
- Treatment Plan Comparison
- Risk Stratification
- Toxicity Monitoring

## 🤝 Contributing

This is a portfolio project. While contributions are welcome, please note that this is primarily for demonstration purposes.

## 📄 License

MIT License - This is a demonstration/portfolio project.

## 👨‍⚕️ About

Created as a portfolio application for a future radiation oncology specialist, showcasing the integration of modern web technologies with clinical radiotherapy concepts and AI-assisted workflows.

---

**Disclaimer:** This application is for educational and portfolio demonstration purposes only. It should not be used for actual patient care, clinical decision-making, or with real patient data. Always consult appropriate medical professionals and use certified clinical software for actual medical applications.
