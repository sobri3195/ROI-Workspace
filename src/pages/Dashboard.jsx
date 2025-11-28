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
            ⚠️ <strong>Demo Only:</strong> This is a portfolio project. All data is stored locally 
            in your browser using localStorage. Not for real patient data.
          </p>
        </div>
      </Card>

      <Card title="Contact & Social Media">
        <div className="contact-section">
          <div className="contact-info">
            <h3 className="contact-name">Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE</h3>
            <p className="contact-email">
              <span className="contact-icon">📧</span>
              <a href="mailto:muhammadsobrimaulana31@gmail.com">muhammadsobrimaulana31@gmail.com</a>
            </p>
          </div>
          
          <div className="links-grid">
            <div className="links-section">
              <h4 className="links-heading">Social Media</h4>
              <div className="social-links">
                <a href="https://www.youtube.com/@muhammadsobrimaulana6013" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                  <span className="link-icon">▶️</span>
                  <span className="link-text">YouTube</span>
                </a>
                <a href="https://t.me/winlin_exploit" target="_blank" rel="noopener noreferrer" className="social-link telegram">
                  <span className="link-icon">✈️</span>
                  <span className="link-text">Telegram</span>
                </a>
                <a href="https://www.tiktok.com/@dr.sobri" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                  <span className="link-icon">🎵</span>
                  <span className="link-text">TikTok</span>
                </a>
                <a href="https://chat.whatsapp.com/B8nwRZOBMo64GjTwdXV8Bl" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                  <span className="link-icon">💬</span>
                  <span className="link-text">WhatsApp Group</span>
                </a>
              </div>
            </div>

            <div className="links-section">
              <h4 className="links-heading">Support & Donations</h4>
              <div className="social-links">
                <a href="https://lynk.id/muhsobrimaulana" target="_blank" rel="noopener noreferrer" className="social-link donation">
                  <span className="link-icon">💳</span>
                  <span className="link-text">Lynk.id</span>
                </a>
                <a href="https://trakteer.id/g9mkave5gauns962u07t" target="_blank" rel="noopener noreferrer" className="social-link donation">
                  <span className="link-icon">☕</span>
                  <span className="link-text">Trakteer</span>
                </a>
                <a href="https://karyakarsa.com/muhammadsobrimaulana" target="_blank" rel="noopener noreferrer" className="social-link donation">
                  <span className="link-icon">💰</span>
                  <span className="link-text">Karyakarsa</span>
                </a>
                <a href="https://nyawer.co/MuhammadSobriMaulana" target="_blank" rel="noopener noreferrer" className="social-link donation">
                  <span className="link-icon">🎁</span>
                  <span className="link-text">Nyawer</span>
                </a>
              </div>
            </div>

            <div className="links-section">
              <h4 className="links-heading">Portfolio & Store</h4>
              <div className="social-links">
                <a href="https://muhammadsobrimaulana.netlify.app" target="_blank" rel="noopener noreferrer" className="social-link website">
                  <span className="link-icon">🌐</span>
                  <span className="link-text">Main Website</span>
                </a>
                <a href="https://muhammad-sobri-maulana-kvr6a.sevalla.page/" target="_blank" rel="noopener noreferrer" className="social-link website">
                  <span className="link-icon">📄</span>
                  <span className="link-text">Sevalla Page</span>
                </a>
                <a href="https://maulanasobri.gumroad.com/" target="_blank" rel="noopener noreferrer" className="social-link store">
                  <span className="link-icon">📦</span>
                  <span className="link-text">Gumroad</span>
                </a>
                <a href="https://pegasus-shop.netlify.app" target="_blank" rel="noopener noreferrer" className="social-link store">
                  <span className="link-icon">🛒</span>
                  <span className="link-text">Pegasus Shop</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
