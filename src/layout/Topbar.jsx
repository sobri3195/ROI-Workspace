import React from 'react'
import './Topbar.css'

function Topbar({ title, onMenuToggle }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-button" onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-badges">
        <span className="topbar-badge">DEMO</span>
        <span className="topbar-badge">localStorage Only</span>
      </div>
    </div>
  )
}

export default Topbar
