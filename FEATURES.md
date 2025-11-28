# ROI-Workspace Features Documentation

Comprehensive documentation of all features and functionality in the Radiation Oncology Intelligent Workspace.

## Core Application Features

### 🏗️ Architecture

- **Framework**: React 18+ with functional components and hooks
- **Routing**: React Router v6 for client-side navigation
- **State Management**: React hooks (useState, useEffect) + localStorage
- **Styling**: Pure CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### 🎨 Design System

#### Color Palette
- **Background Colors**:
  - Primary: `#0f172a` (Deep navy)
  - Secondary: `#1e293b` (Slate)
  - Tertiary: `#334155` (Lighter slate)
  
- **Accent Colors**:
  - Primary: `#06b6d4` (Cyan)
  - Secondary: `#0891b2` (Dark cyan)
  - Hover: `#0e7490` (Darker cyan)

- **Status Colors**:
  - Success: `#10b981` (Green)
  - Warning: `#f59e0b` (Orange)
  - Danger: `#ef4444` (Red)

#### Typography
- Font Family: 'Segoe UI', system fonts
- Responsive text sizing
- Clear hierarchy with font weights

#### Components
- **Cards**: Content containers with optional titles
- **Buttons**: Multiple variants (primary, secondary, danger, success)
- **StatCards**: Dashboard statistics with icons
- **Forms**: Consistent input styling
- **Tables**: Responsive data tables with hover effects

---

## Page-by-Page Features

### 📊 Dashboard

**Purpose**: Central overview of all system data and quick access to key metrics.

**Features**:
- **Statistics Overview**:
  - Total patients count
  - Active treatment patients
  - MDT cases count
  - Toxicity alerts (Grade ≥2)
  
- **Risk Stratification Display**:
  - High Risk patients
  - Intermediate Risk patients
  - Low Risk patients
  - Color-coded visualization

- **AI & Clinical Concepts Tags**:
  - AI Contouring
  - Adaptive Radiotherapy
  - Plan Comparison
  - Radiomics & Genomics
  - Monte Carlo Simulation
  - Federated Learning
  - IMRT/VMAT/Proton
  - CBCT Integration
  - Auto-Segmentation
  - Dose Optimization

- **About Section**: Application description and demo notice

**Data Sources**: 
- Reads from all localStorage keys
- Real-time calculations on every load
- No data persistence needed for dashboard

---

### 🏥 Patients & Case Database

**Purpose**: Complete patient record management system.

**Features**:

#### Patient Form
- **Required Fields**:
  - Name
  - Age (numeric input)
  - Diagnosis
  
- **Optional Fields**:
  - Stage (e.g., cT3N2M0)
  - Status (Active/Completed/Follow-up)
  - Risk Group (Low/Intermediate/High)

#### Patient List
- **Display Columns**:
  - Name
  - Age
  - Diagnosis
  - Stage
  - Status (color-coded badge)
  - Risk Group (color-coded badge)
  - Actions (Edit/Delete)

- **Filters**:
  - Filter by status (All/Active/Completed/Follow-up)
  - Real-time filter updates

- **CRUD Operations**:
  - Create new patients
  - Read/view all patients
  - Update existing patient records
  - Delete patients (with confirmation)

**Data Storage**: `localStorage.patients` (Array of patient objects)

**Data Model**:
```javascript
{
  id: timestamp,
  name: string,
  age: number,
  diagnosis: string,
  stage: string,
  status: "Active" | "Completed" | "Follow-up",
  riskGroup: "Low" | "Intermediate" | "High"
}
```

---

### 👥 Tumor Board MDT (Multidisciplinary Team)

**Purpose**: Document multidisciplinary tumor board discussions and treatment consensus.

**Features**:

#### MDT Case Form
- **Required Fields**:
  - Patient Name
  - Diagnosis
  - Final MDT Consensus Plan
  
- **Optional Fields**:
  - Stage
  - Multidisciplinary Notes (textarea)

#### MDT Cases Display
- **Case Cards** showing:
  - Patient name (highlighted)
  - Date of discussion
  - Diagnosis
  - Stage (if provided)
  - Discussion notes
  - MDT consensus (highlighted)
  
- **Ordering**: Newest cases first
- **Actions**: Delete cases (with confirmation)

**Use Cases**:
- Document tumor board meetings
- Record multi-specialty input
- Track treatment decisions
- Historical case review

**Data Storage**: `localStorage.mdtCases` (Array of case objects)

**Data Model**:
```javascript
{
  id: timestamp,
  patientName: string,
  diagnosis: string,
  stage: string,
  notes: string,
  consensus: string,
  date: ISO date string
}
```

---

### 📋 Toxicity Tracker (Patient Reported Outcomes)

**Purpose**: Track and monitor treatment-related side effects and toxicities.

**Features**:

#### Toxicity Report Form
- **Required Fields**:
  - Patient Name
  - Date (date picker)
  - Symptom description
  - Severity (Mild/Moderate/Severe)

- **Automatic Grade Assignment**:
  - Mild → Grade 1
  - Moderate → Grade 2
  - Severe → Grade 3

#### Toxicity Reports Table
- **Display Columns**:
  - Patient
  - Date
  - Symptom
  - Severity
  - Grade (color-coded badge)
  - Actions (Delete)

- **Visual Alerts**:
  - Grade ≥2 rows highlighted with warning color
  - Color-coded grade badges

#### Severity Legend
- Grade 1 (Green): Mild symptoms
- Grade 2 (Orange): Moderate; minimal intervention
- Grade 3 (Red): Severe; medical intervention

**Use Cases**:
- Track patient reported outcomes (PROs)
- Monitor treatment toxicity
- Identify patients needing intervention
- Quality of life assessment

**Data Storage**: `localStorage.toxicityReports` (Array of report objects)

**Data Model**:
```javascript
{
  id: timestamp,
  patientName: string,
  date: string (YYYY-MM-DD),
  symptom: string,
  severity: "Mild" | "Moderate" | "Severe",
  grade: 1 | 2 | 3
}
```

---

### 🧮 OncoSim (BED/EQD2 Calculator)

**Purpose**: Radiobiological dose calculations for treatment planning.

**Features**:

#### Calculator Inputs
- **Total Dose** (Gy): Total prescription dose
- **Number of Fractions**: Treatment fractions
- **α/β Ratio** (Gy): Tissue-specific ratio (default: 10)

#### Calculations
1. **Dose per Fraction (d)**:
   ```
   d = D / n
   ```

2. **Biological Effective Dose (BED)**:
   ```
   BED = D × (1 + d / (α/β))
   ```

3. **Equivalent Dose in 2 Gy Fractions (EQD2)**:
   ```
   EQD2 = BED / (1 + 2 / (α/β))
   ```

#### Information Panels
- **Formula Explanations**: Detailed formula descriptions
- **Clinical Reference Values**:
  - α/β ≈ 10 Gy: Most tumors, early-responding tissues
  - α/β ≈ 3 Gy: Late-responding tissues (lung, spinal cord)
  - α/β ≈ 1.5 Gy: Prostate cancer
  
- **About Section**: Educational context and disclaimers

**Use Cases**:
- Compare different fractionation schemes
- Convert dose prescriptions
- Research and educational purposes
- Treatment planning optimization

**Data Storage**: None (calculator only, no persistence)

---

### ⚕️ Dr. Sobri Workflow

**Purpose**: Demonstrate AI-assisted radiotherapy planning workflow.

**Features**:

#### Workflow Form
- **Patient Name**: Required
- **Patient Details**: Demographics, comorbidities, history (textarea)
- **Segmentation Instructions**: Required - OAR and target volume specifications

#### Workflow Actions
1. **Start Analysis (Demo)**:
   - Validates required fields
   - Shows processing indicator
   - Simulates AI analysis (2-second delay)
   - Generates mock results

2. **Reset Workflow**:
   - Clears all form fields
   - Resets workflow state
   - Confirms before reset

#### AI Analysis Results (Demo)
- **Analysis Summary**: Completion confirmation
- **Treatment Suggestion**: Mock IMRT plan recommendation
- **OAR Considerations**: Based on user instructions
- **Demo Notice**: Clear disclaimer
- **Timestamp**: Generation date/time

#### Workflow Steps Panel
1. Open case in ROI-Workspace
2. Upload CT/MRI (simulated)
3. Enter clinical details
4. Provide segmentation instructions
5. Run AI-powered analysis
6. Review + finalize treatment plan

**Use Cases**:
- Demonstrate clinical workflow
- Show AI integration concepts
- Portfolio/demo presentation
- Educational purposes

**Data Storage**: `localStorage.drSobriWorkflow` (Object)

**Data Model**:
```javascript
{
  formData: {
    patientName: string,
    patientDetails: string,
    segmentationInstructions: string
  },
  workflowState: {
    status: "idle" | "processing" | "completed",
    result: {
      timestamp: ISO string,
      analysis: string,
      suggestion: string,
      oars: string,
      note: string
    }
  }
}
```

---

## Technical Features

### Data Persistence

**localStorage Schema**:
- `patients`: Array of patient objects
- `mdtCases`: Array of MDT case objects
- `toxicityReports`: Array of toxicity report objects
- `drSobriWorkflow`: Single workflow state object

**Storage Utilities** (`src/utils/storage.js`):
- `getFromStorage(key)`: Retrieve and parse JSON data
- `saveToStorage(key, data)`: Stringify and save data
- `removeFromStorage(key)`: Clear specific key
- `initializeStorage()`: Set up default empty structures

### Navigation

**Routes**:
- `/` → Dashboard
- `/dashboard` → Dashboard
- `/patients` → Patients & Case Database
- `/mdt` → Tumor Board MDT
- `/toxicity` → Toxicity Tracker
- `/oncosim` → OncoSim Calculator
- `/dr-sobri-workflow` → Dr. Sobri Workflow

**Navigation Features**:
- Active route highlighting
- Sidebar navigation
- Client-side routing (no page refresh)
- Dynamic page titles in topbar

### Responsive Design

- Mobile-friendly layouts
- Flexible grid systems
- Sticky sidebars on desktop
- Responsive tables with horizontal scroll
- Media queries for < 1024px breakpoints

### User Experience

- **Form Validation**: Required field checks
- **Confirmation Dialogs**: Delete confirmations
- **Visual Feedback**: 
  - Hover effects
  - Loading indicators
  - Color-coded status badges
  
- **Data Persistence**: Auto-save on all changes
- **Empty States**: Helpful messages when no data exists

---

## Future Enhancement Ideas

While this is a demo application, potential enhancements could include:

- Export data to CSV/PDF
- Import patient data
- Advanced filtering and search
- Data visualization (charts/graphs)
- Multi-user support with authentication
- Backend API integration
- Real AI model integration
- DICOM image viewer
- Treatment planning visualization
- Calendar for appointments
- Notification system
- Data backup/restore
- Print-friendly reports

---

## Limitations & Disclaimers

⚠️ **Important Notes**:

1. **Demo Only**: Not for clinical use or real patient data
2. **localStorage Limits**: 
   - ~5-10 MB storage limit per domain
   - Data cleared if browser cache is cleared
   - Data not synced across devices/browsers
3. **No Backend**: No server, no database, no authentication
4. **Simulated AI**: Dr. Sobri workflow uses mock results, not real AI
5. **Browser-Specific**: Data stored per browser profile
6. **No Data Validation**: Minimal input validation for demo purposes
7. **Educational Purpose**: For portfolio and learning only

---

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

Requires JavaScript enabled and localStorage support.

---

For more information, see:
- [README.md](README.md) - General overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
