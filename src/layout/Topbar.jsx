import React from 'react'
import './Topbar.css'

function Topbar({ title }) {
  return (
    <div className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-badges">
        <span className="topbar-badge">DEMO</span>
        <span className="topbar-badge">localStorage Only</span>
      </div>
    </div>
  )
}

export default Topbar
