import React from 'react'
import './StatCard.css'

function StatCard({ icon, label, value, color = 'cyan' }) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-content">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  )
}

export default StatCard
