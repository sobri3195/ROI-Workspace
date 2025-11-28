import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import MDT from './pages/MDT'
import Toxicity from './pages/Toxicity'
import OncoSim from './pages/OncoSim'
import DrSobriWorkflow from './pages/DrSobriWorkflow'

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
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
