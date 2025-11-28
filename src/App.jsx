import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import MDT from './pages/MDT'
import Toxicity from './pages/Toxicity'
import OncoSim from './pages/OncoSim'
import DrSobriWorkflow from './pages/DrSobriWorkflow'
import StagingAssistant from './pages/StagingAssistant'
import ImagingDiagnostic from './pages/ImagingDiagnostic'
import TargetVolumeTutor from './pages/TargetVolumeTutor'
import OARConstraints from './pages/OARConstraints'
import DosePrescription from './pages/DosePrescription'
import TechniqueSelection from './pages/TechniqueSelection'
import ImmobilizationSetup from './pages/ImmobilizationSetup'
import MotionManagement from './pages/MotionManagement'
import SystemicTherapy from './pages/SystemicTherapy'
import PalliativePlanner from './pages/PalliativePlanner'
import Reirradiation from './pages/Reirradiation'
import TreatmentSchedule from './pages/TreatmentSchedule'
import ResponseAssessment from './pages/ResponseAssessment'
import ToxicityMitigation from './pages/ToxicityMitigation'
import TreatmentPathways from './pages/TreatmentPathways'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/mdt" element={<MDT />} />
          <Route path="/toxicity" element={<Toxicity />} />
          <Route path="/oncosim" element={<OncoSim />} />
          <Route path="/dr-sobri-workflow" element={<DrSobriWorkflow />} />
          <Route path="/staging-assistant" element={<StagingAssistant />} />
          <Route path="/imaging-diagnostic" element={<ImagingDiagnostic />} />
          <Route path="/target-volume-tutor" element={<TargetVolumeTutor />} />
          <Route path="/oar-constraints" element={<OARConstraints />} />
          <Route path="/dose-prescription" element={<DosePrescription />} />
          <Route path="/technique-selection" element={<TechniqueSelection />} />
          <Route path="/immobilization-setup" element={<ImmobilizationSetup />} />
          <Route path="/motion-management" element={<MotionManagement />} />
          <Route path="/systemic-therapy" element={<SystemicTherapy />} />
          <Route path="/palliative-planner" element={<PalliativePlanner />} />
          <Route path="/reirradiation" element={<Reirradiation />} />
          <Route path="/treatment-schedule" element={<TreatmentSchedule />} />
          <Route path="/response-assessment" element={<ResponseAssessment />} />
          <Route path="/toxicity-mitigation" element={<ToxicityMitigation />} />
          <Route path="/treatment-pathways" element={<TreatmentPathways />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
