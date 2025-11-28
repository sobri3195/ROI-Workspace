import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { getFromStorage, STORAGE_KEYS } from '../utils/storage'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    mdtCases: 0,
    toxicityAlerts: 0,
    riskGroups: { high: 0, intermediate: 0, low: 0 },
  })

  useEffect(() => {
    calculateStats()
  }, [])

  const calculateStats = () => {
    const patients = getFromStorage(STORAGE_KEYS.PATIENTS) || []
    const mdtCases = getFromStorage(STORAGE_KEYS.MDT_CASES) || []
    const toxicityReports = getFromStorage(STORAGE_KEYS.TOXICITY_REPORTS) || []

    const activePatients = patients.filter((p) => p.status === 'Active').length

    const toxicityAlerts = toxicityReports.filter((r) => {
      const severityGradeMap = {
        Mild: 1,
        Moderate: 2,
        Severe: 3,
      }
      return severityGradeMap[r.severity] >= 2
    }).length

    const riskGroups = patients.reduce(
      (acc, patient) => {
        if (patient.riskGroup === 'High') acc.high++
        else if (patient.riskGroup === 'Intermediate') acc.intermediate++
        else if (patient.riskGroup === 'Low') acc.low++
        return acc
      },
      { high: 0, intermediate: 0, low: 0 }
    )

    setStats({
      totalPatients: patients.length,
      activePatients,
      mdtCases: mdtCases.length,
      toxicityAlerts,
      riskGroups,
    })
  }

  const conceptTags = [
    'AI Contouring',
    'Adaptive Radiotherapy',
    'Plan Comparison',
    'Radiomics & Genomics',
    'Monte Carlo Simulation',
    'Federated Learning',
    'IMRT/VMAT/Proton',
    'CBCT Integration',
    'Auto-Segmentation',
    'Dose Optimization',
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <StatCard
          icon="🏥"
          label="Total Patients"
          value={stats.totalPatients}
          color="cyan"
        />
        <StatCard
          icon="⚡"
          label="Active Treatment"
          value={stats.activePatients}
          color="green"
        />
        <StatCard
          icon="👥"
          label="MDT Cases"
          value={stats.mdtCases}
          color="cyan"
        />
        <StatCard
          icon="⚠️"
          label="Toxicity Alerts (≥2)"
          value={stats.toxicityAlerts}
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <Card title="Patient Risk Stratification">
          <div className="risk-stratification">
            <div className="risk-item risk-high">
              <span className="risk-label">High Risk</span>
              <span className="risk-value">{stats.riskGroups.high}</span>
            </div>
            <div className="risk-item risk-intermediate">
              <span className="risk-label">Intermediate Risk</span>
              <span className="risk-value">{stats.riskGroups.intermediate}</span>
            </div>
            <div className="risk-item risk-low">
              <span className="risk-label">Low Risk</span>
              <span className="risk-value">{stats.riskGroups.low}</span>
            </div>
          </div>
        </Card>

        <Card title="AI & Clinical Concepts">
          <div className="concept-tags">
            {conceptTags.map((tag, index) => (
              <span key={index} className="concept-tag">
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card title="About ROI-Workspace">
        <div className="about-section">
          <p>
            <strong>Radiation Oncology Intelligent Workspace (ROI-Workspace)</strong> is a
            portfolio demonstration application showcasing modern radiotherapy concepts and
            AI-assisted clinical workflows.
          </p>
          <p>
            This application integrates patient management, multidisciplinary tumor boards,
            toxicity tracking, radiobiological calculations, and AI-powered treatment planning
            assistance.
          </p>
          <p className="demo-notice">
            ⚠️ <strong>Demo Only:</strong> This is a portfolio project for a future radiation
            oncology specialist. All data is stored locally in your browser using localStorage.
            Not for real patient data.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
