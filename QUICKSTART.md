# ROI-Workspace Quick Start Guide

Get up and running with ROI-Workspace in under 5 minutes!

## 🚀 Quick Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd roi-workspace

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

That's it! The application is now running locally.

## 📝 First Steps

### 1. Explore the Dashboard
- Open http://localhost:5173 in your browser
- You'll see the main dashboard with empty statistics
- This is normal - no data exists yet!

### 2. Add Your First Patient
1. Click **"Patients & Case DB"** in the sidebar
2. Fill in the form on the left:
   - Name: `John Doe`
   - Age: `65`
   - Diagnosis: `Lung Cancer`
   - Stage: `cT3N2M0`
   - Status: `Active`
   - Risk Group: `High`
3. Click **"Add Patient"**
4. The patient appears in the table on the right
5. Go back to **Dashboard** to see updated statistics!

### 3. Create an MDT Case
1. Click **"Tumor Board MDT"** in the sidebar
2. Fill in the form:
   - Patient Name: `John Doe`
   - Diagnosis: `Lung Cancer`
   - Stage: `cT3N2M0`
   - Notes: `PET shows FDG-avid mass in right upper lobe. Mediastinal lymph nodes involved.`
   - Consensus: `Concurrent chemoradiotherapy followed by consolidation immunotherapy. 60 Gy in 30 fractions.`
3. Click **"Add MDT Case"**
4. The case appears as a card below

### 4. Track Toxicity
1. Click **"Toxicity Tracker (PROs)"** in the sidebar
2. Add a toxicity report:
   - Patient Name: `John Doe`
   - Date: Select today's date
   - Symptom: `Fatigue`
   - Severity: `Moderate` (→ Grade 2)
3. Click **"Add Report"**
4. Notice the row is highlighted (Grade ≥2 alert!)

### 5. Use the BED/EQD2 Calculator
1. Click **"OncoSim (BED/EQD2)"** in the sidebar
2. Enter values:
   - Total Dose: `60` Gy
   - Fractions: `30`
   - α/β: `10` (default for tumors)
3. Click **"Calculate"**
4. See the results:
   - Dose per fraction: 2.00 Gy
   - BED: 72.00 Gy
   - EQD2: 60.00 Gy

### 6. Try Dr. Sobri's Workflow
1. Click **"Dr. Sobri Workflow"** in the sidebar
2. Fill in the form:
   - Patient Name: `John Doe`
   - Patient Details: `65 yo male, COPD, former smoker`
   - Segmentation Instructions: `Contour GTV, CTV, PTV. Spare spinal cord (max 45 Gy), esophagus (mean <34 Gy), heart (V30 <40%).`
3. Click **"▶️ Start Analysis (Demo)"**
4. Watch the processing indicator
5. View the simulated AI results!

## 💾 Understanding Data Storage

All data is stored in your browser's localStorage:
- Open browser DevTools (F12)
- Go to **Application** → **Local Storage**
- See keys: `patients`, `mdtCases`, `toxicityReports`, `drSobriWorkflow`

**Important**: 
- Data persists across sessions
- Data is browser-specific (not synced)
- Clearing browser cache deletes all data

## 🎨 Interface Overview

### Sidebar (Left)
- Navigation menu
- Always visible
- Active page highlighted in cyan
- Demo badges at bottom

### Topbar (Top)
- Current page title
- Demo and localStorage badges
- Fixed at top

### Main Content (Right)
- Page-specific content
- Scrollable area
- Forms and data displays

## 📊 Sample Data Ideas

To make the demo more impressive, add varied data:

**Patients**:
- Mix of Active/Completed/Follow-up statuses
- Various diagnoses: Lung, Prostate, Breast, Brain tumors
- Different risk groups
- Age range: 45-80 years

**MDT Cases**:
- Different specialties involved
- Various treatment modalities
- Complex vs. straightforward cases

**Toxicity Reports**:
- Different symptoms: Fatigue, Nausea, Skin reaction, Dysphagia
- Range of severities
- Multiple patients
- Date progression

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The `dist` folder contains your production-ready application!

## 🌐 Deploy in 1 Minute

### Netlify Drop
1. Build: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder
4. Done! Your site is live!

### Vercel
```bash
npm install -g vercel
vercel
```

Follow the prompts - your site is deployed!

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
# Kill the process using the port
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Build fails?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data not persisting?
- Check if localStorage is enabled in your browser
- Check if you're in private/incognito mode (data doesn't persist)
- Check browser console for errors

### White screen after build?
- Check browser console for errors
- Verify all files in `dist` folder
- Try `npm run preview` to test the build locally

## 🎯 What to Explore Next

1. **Try the Edit Feature**: Edit a patient record
2. **Filter Patients**: Use the status filter
3. **Delete & Confirm**: Try deleting records (with confirmation)
4. **Reset Workflow**: Clear Dr. Sobri's workflow
5. **Different α/β Values**: Try calculator with α/β = 3 (late effects)
6. **Multiple Patients**: Add 5-10 patients and see dashboard stats
7. **Grade 3 Toxicity**: Add a severe toxicity and see the alert

## 📱 Mobile View

Open the app on your phone:
1. Start dev server: `npm run dev`
2. Note the network URL (or use `npm run dev -- --host`)
3. Open on your phone (same WiFi network)
4. Experience the responsive design!

## 🔗 Useful Links

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com

## 💡 Tips & Tricks

1. **Keyboard Navigation**: Use Tab to navigate forms quickly
2. **Browser DevTools**: Inspect localStorage to see data structure
3. **Multiple Browsers**: Data is separate in each browser - test isolation
4. **Screenshot**: Take screenshots for your portfolio!
5. **Share**: Deploy and share the link with potential employers

## 🎓 Learning Outcomes

By exploring this application, you'll understand:
- React functional components and hooks
- React Router for SPA navigation
- localStorage for browser-based persistence
- Form handling and validation
- CRUD operations
- Responsive CSS design
- Medical/clinical UI patterns
- Dark theme implementation

## 🎉 You're Ready!

Start exploring and have fun with ROI-Workspace!

---

**Need more details?**
- [README.md](README.md) - Full documentation
- [FEATURES.md](FEATURES.md) - Feature details
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
