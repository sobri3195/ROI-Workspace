import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './OARConstraints.css'

function OARConstraints() {
  const [customConstraints, setCustomConstraints] = useState([])
  const [formData, setFormData] = useState({
    organ: '',
    constraint: '',
    dose: '',
    volume: '',
    notes: '',
  })

  useEffect(() => {
    loadConstraints()
  }, [])

  const loadConstraints = () => {
    const data = getFromStorage(STORAGE_KEYS.OAR_CONSTRAINTS) || []
    setCustomConstraints(data)
  }

  const standardConstraints = [
    { organ: 'Spinal Cord', constraint: 'Dmax < 45 Gy', priority: 'High' },
    { organ: 'Brainstem', constraint: 'Dmax < 54 Gy', priority: 'High' },
    { organ: 'Optic Chiasm', constraint: 'Dmax < 55 Gy', priority: 'High' },
    { organ: 'Optic Nerve', constraint: 'Dmax < 55 Gy', priority: 'High' },
    { organ: 'Parotid Gland', constraint: 'Dmean < 26 Gy', priority: 'Medium' },
    { organ: 'Lung (Total)', constraint: 'V20 < 30-35%', priority: 'High' },
    { organ: 'Heart', constraint: 'Dmean < 26 Gy', priority: 'Medium' },
    { organ: 'Esophagus', constraint: 'Dmean < 34 Gy', priority: 'Medium' },
    { organ: 'Kidney (Bilateral)', constraint: 'V20 < 32%', priority: 'High' },
    { organ: 'Liver', constraint: 'Dmean < 30-32 Gy', priority: 'Medium' },
    { organ: 'Bladder', constraint: 'V65 < 50%', priority: 'Medium' },
    { organ: 'Rectum', constraint: 'V50 < 50%', priority: 'High' },
    { organ: 'Femoral Head', constraint: 'V50 < 5%', priority: 'Medium' },
    { organ: 'Small Bowel', constraint: 'V45 < 195cc', priority: 'High' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.organ || !formData.constraint) {
      alert('Please fill in organ and constraint')
      return
    }

    const newConstraint = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newConstraint, ...customConstraints]
    saveToStorage(STORAGE_KEYS.OAR_CONSTRAINTS, updated)
    setCustomConstraints(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = customConstraints.filter((c) => c.id !== id)
    saveToStorage(STORAGE_KEYS.OAR_CONSTRAINTS, updated)
    setCustomConstraints(updated)
  }

  const resetForm = () => {
    setFormData({
      organ: '',
      constraint: '',
      dose: '',
      volume: '',
      notes: '',
    })
  }

  return (
    <div className="oar-constraints-page">
      <div className="constraints-layout">
        <Card title="Standard OAR Dose Constraints">
          <p className="constraints-intro">
            Common dose constraints based on QUANTEC and institutional protocols.
            <span className="demo-badge">DEMO VALUES</span>
          </p>
          <div className="constraints-table-wrapper">
            <table className="constraints-table">
              <thead>
                <tr>
                  <th>Organ at Risk</th>
                  <th>Dose Constraint</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {standardConstraints.map((c, index) => (
                  <tr key={index}>
                    <td>{c.organ}</td>
                    <td className="constraint-value">{c.constraint}</td>
                    <td>
                      <span className={`priority-badge priority-${c.priority.toLowerCase()}`}>
                        {c.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="custom-constraints-section">
          <Card title="Add Custom Constraint">
            <form onSubmit={handleSubmit} className="constraints-form">
              <div className="form-group">
                <label>Organ at Risk *</label>
                <input
                  type="text"
                  name="organ"
                  value={formData.organ}
                  onChange={handleInputChange}
                  placeholder="e.g., Left Parotid"
                />
              </div>

              <div className="form-group">
                <label>Constraint Description *</label>
                <input
                  type="text"
                  name="constraint"
                  value={formData.constraint}
                  onChange={handleInputChange}
                  placeholder="e.g., Dmean < 20 Gy"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Dose (Gy)</label>
                  <input
                    type="text"
                    name="dose"
                    value={formData.dose}
                    onChange={handleInputChange}
                    placeholder="45"
                  />
                </div>

                <div className="form-group">
                  <label>Volume (%)</label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes..."
                  rows="3"
                />
              </div>

              <Button type="submit" variant="primary">
                Save Custom Constraint
              </Button>
            </form>
          </Card>

          <Card title="My Custom Constraints">
            {customConstraints.length === 0 ? (
              <p className="no-data">No custom constraints saved yet.</p>
            ) : (
              <div className="custom-list">
                {customConstraints.map((c) => (
                  <div key={c.id} className="custom-item">
                    <div className="custom-header">
                      <h4>{c.organ}</h4>
                      <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                        🗑️
                      </button>
                    </div>
                    <p className="custom-constraint">{c.constraint}</p>
                    {(c.dose || c.volume) && (
                      <p className="custom-details">
                        {c.dose && `Dose: ${c.dose} Gy`}
                        {c.dose && c.volume && ' | '}
                        {c.volume && `Volume: ${c.volume}%`}
                      </p>
                    )}
                    {c.notes && <p className="custom-notes">{c.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <Card title="About Dose Constraints">
        <div className="info-section">
          <p>
            <strong>Organ at Risk (OAR) Dose Constraints</strong> are critical limits to minimize 
            toxicity while delivering therapeutic doses to the target volume.
          </p>
          <ul>
            <li><strong>Dmax:</strong> Maximum point dose</li>
            <li><strong>Dmean:</strong> Mean dose to the entire organ</li>
            <li><strong>VXX:</strong> Volume receiving XX Gy or more (e.g., V20 = volume receiving ≥20 Gy)</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Educational Demo:</strong> Constraints shown are examples only. 
            Always follow institutional protocols and published guidelines (QUANTEC, RTOG).
          </p>
        </div>
      </Card>
    </div>
  )
}

export default OARConstraints
