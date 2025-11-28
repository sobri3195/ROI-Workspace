import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './MotionManagement.css'

function MotionManagement() {
  const [strategies, setStrategies] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    site: '',
    strategy: '',
    details: '',
  })

  useEffect(() => {
    loadStrategies()
  }, [])

  const loadStrategies = () => {
    const data = getFromStorage(STORAGE_KEYS.MOTION_STRATEGIES) || []
    setStrategies(data)
  }

  const motionStrategies = [
    {
      name: '4D-CT Simulation',
      description: 'CT acquisition capturing breathing phases for ITV generation',
      sites: ['Lung', 'Liver', 'Upper Abdomen'],
    },
    {
      name: 'Respiratory Gating',
      description: 'Beam delivery only during specific breathing phases',
      sites: ['Lung', 'Breast', 'Liver'],
    },
    {
      name: 'Deep Inspiration Breath Hold (DIBH)',
      description: 'Patient holds breath at deep inspiration for reduced cardiac dose',
      sites: ['Breast', 'Lung', 'Mediastinum'],
    },
    {
      name: 'Abdominal Compression',
      description: 'Physical compression to reduce diaphragm motion',
      sites: ['Liver', 'Pancreas', 'Upper Abdomen'],
    },
    {
      name: 'Tumor Tracking',
      description: 'Real-time tracking and beam adjustment',
      sites: ['Lung', 'Liver', 'Prostate'],
    },
    {
      name: 'Internal Target Volume (ITV)',
      description: 'Expanded CTV encompassing all motion phases',
      sites: ['All sites with motion'],
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.site || !formData.strategy) {
      alert('Please fill in required fields')
      return
    }

    const newStrategy = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newStrategy, ...strategies]
    saveToStorage(STORAGE_KEYS.MOTION_STRATEGIES, updated)
    setStrategies(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = strategies.filter((s) => s.id !== id)
    saveToStorage(STORAGE_KEYS.MOTION_STRATEGIES, updated)
    setStrategies(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      site: '',
      strategy: '',
      details: '',
    })
  }

  return (
    <div className="motion-management-page">
      <Card title="Motion Management Strategies">
        <div className="strategies-grid">
          {motionStrategies.map((strat, index) => (
            <div key={index} className="strategy-card">
              <h3>{strat.name}</h3>
              <p className="strategy-desc">{strat.description}</p>
              <div className="strategy-sites">
                <strong>Typical Sites:</strong>
                <div className="sites-tags">
                  {strat.sites.map((site, idx) => (
                    <span key={idx} className="site-tag">{site}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="motion-layout">
        <Card title="Log Motion Strategy">
          <form onSubmit={handleSubmit} className="motion-form">
            <div className="form-group">
              <label>Patient ID *</label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                placeholder="Patient identifier"
              />
            </div>

            <div className="form-group">
              <label>Treatment Site *</label>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                placeholder="e.g., Lung, Breast"
              />
            </div>

            <div className="form-group">
              <label>Motion Management Strategy *</label>
              <select name="strategy" value={formData.strategy} onChange={handleInputChange}>
                <option value="">Select Strategy</option>
                <option value="4D-CT Simulation">4D-CT Simulation</option>
                <option value="Respiratory Gating">Respiratory Gating</option>
                <option value="DIBH">Deep Inspiration Breath Hold</option>
                <option value="Abdominal Compression">Abdominal Compression</option>
                <option value="Tumor Tracking">Tumor Tracking</option>
                <option value="ITV">Internal Target Volume</option>
              </select>
            </div>

            <div className="form-group">
              <label>Implementation Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Details about motion management implementation..."
                rows="4"
              />
            </div>

            <Button type="submit" variant="primary">
              Save Motion Strategy
            </Button>
          </form>
        </Card>

        <Card title="Saved Motion Strategies">
          {strategies.length === 0 ? (
            <p className="no-data">No motion strategies logged yet.</p>
          ) : (
            <div className="saved-strategies">
              {strategies.map((s) => (
                <div key={s.id} className="saved-item">
                  <div className="saved-header">
                    <h4>Patient: {s.patientId}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="saved-info">
                    <span className="info-site">📍 {s.site}</span>
                    <span className="info-strategy">⚡ {s.strategy}</span>
                  </div>
                  {s.details && <p className="saved-details">{s.details}</p>}
                  <p className="saved-date">{s.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MotionManagement
