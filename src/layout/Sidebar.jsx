import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/patients', label: 'Patients & Case DB', icon: '🏥' },
    { path: '/mdt', label: 'Tumor Board MDT', icon: '👥' },
    { path: '/toxicity', label: 'Toxicity Tracker (PROs)', icon: '📋' },
    { path: '/oncosim', label: 'OncoSim (BED/EQD2)', icon: '🧮' },
    { path: '/dr-sobri-workflow', label: 'Dr. Sobri Workflow', icon: '⚕️' },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">⚛️</div>
        <h2 className="sidebar-title">ROI-Workspace</h2>
        <p className="sidebar-subtitle">Radiation Oncology Intelligent Workspace</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-nav-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-badge">Demo Application</div>
        <p className="sidebar-footer-text">Portfolio Project</p>
      </div>
    </div>
  )
}

export default Sidebar
