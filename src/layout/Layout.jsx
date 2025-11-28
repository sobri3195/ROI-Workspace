import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { initializeStorage } from '../utils/storage'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    initializeStorage()
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getPageTitle = () => {
    const path = location.pathname
    switch (path) {
      case '/':
      case '/dashboard':
        return 'Dashboard'
      case '/patients':
        return 'Patients & Case Database'
      case '/mdt':
        return 'Tumor Board MDT'
      case '/toxicity':
        return 'Toxicity Tracker (PROs)'
      case '/oncosim':
        return 'OncoSim - BED/EQD2 Calculator'
      case '/dr-sobri-workflow':
        return 'Dr. Sobri Workflow'
      case '/staging-assistant':
        return 'Staging Assistant (TNM Helper)'
      case '/imaging-diagnostic':
        return 'Imaging & Diagnostic Overview'
      case '/target-volume-tutor':
        return 'Target Volume Definition Tutor'
      case '/oar-constraints':
        return 'OAR Constraints Library'
      case '/dose-prescription':
        return 'Dose Prescription Templates'
      case '/technique-selection':
        return 'Technique Selection Assistant'
      case '/immobilization-setup':
        return 'Immobilization & Setup Planner'
      case '/motion-management':
        return 'Motion Management Planner'
      case '/systemic-therapy':
        return 'Concurrent Systemic Therapy Helper'
      case '/palliative-planner':
        return 'Palliative Radiotherapy Planner'
      case '/reirradiation':
        return 'Re-Irradiation Risk Estimator'
      case '/treatment-schedule':
        return 'Treatment Schedule Generator'
      case '/response-assessment':
        return 'Response Assessment & Follow-Up Tracker'
      case '/toxicity-mitigation':
        return 'Toxicity Mitigation / Supportive Care Library'
      case '/treatment-pathways':
        return 'Site-Specific Treatment Pathways Dashboard'
      default:
        return 'ROI-Workspace'
    }
  }

  return (
    <div className="layout">
      <Sidebar isOpen={isMobileMenuOpen} />
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      />
      <div className="layout-main">
        <Topbar title={getPageTitle()} onMenuToggle={toggleMobileMenu} />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
