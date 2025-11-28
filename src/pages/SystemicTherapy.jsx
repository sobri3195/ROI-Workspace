import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './SystemicTherapy.css'

function SystemicTherapy() {
  const [therapies, setTherapies] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    concurrent: 'No',
    regimen: '',
    agent: '',
    notes: '',
  })

  useEffect(() => {
    loadTherapies()
  }, [])

  const loadTherapies = () => {
    const data = getFromStorage(STORAGE_KEYS.SYSTEMIC_THERAPY) || []
    setTherapies(data)
  }

  const commonRegimens = [
    { name: 'Cisplatin (weekly)', agent: 'Cisplatin 40mg/m²', site: 'Head & Neck, Cervix' },
    { name: 'Cisplatin (3-weekly)', agent: 'Cisplatin 75-100mg/m²', site: 'Lung, Cervix' },
    { name: 'Carboplatin + Paclitaxel', agent: 'Carboplatin AUC 2 + Paclitaxel 45mg/m²', site: 'Lung, Cervix' },
    { name: 'Temozolomide', agent: 'Temozolomide 75mg/m² daily', site: 'Glioblastoma' },
    { name: '5-FU continuous', agent: '5-Fluorouracil 225mg/m²/day', site: 'Colorectal, H&N' },
    { name: 'Capecitabine', agent: 'Capecitabine 825mg/m² BID', site: 'Rectal, Pancreas' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.concurrent) {
      alert('Please fill in required fields')
      return
    }

    const newTherapy = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newTherapy, ...therapies]
    saveToStorage(STORAGE_KEYS.SYSTEMIC_THERAPY, updated)
    setTherapies(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = therapies.filter((t) => t.id !== id)
    saveToStorage(STORAGE_KEYS.SYSTEMIC_THERAPY, updated)
    setTherapies(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      concurrent: 'No',
      regimen: '',
      agent: '',
      notes: '',
    })
  }

  return (
    <div className="systemic-therapy-page">
      <Card title="Common Concurrent Chemoradiotherapy Regimens">
        <div className="regimens-table-wrapper">
          <table className="regimens-table">
            <thead>
              <tr>
                <th>Regimen</th>
                <th>Agent & Dose</th>
                <th>Typical Sites</th>
              </tr>
            </thead>
            <tbody>
              {commonRegimens.map((reg, index) => (
                <tr key={index}>
                  <td className="regimen-name">{reg.name}</td>
                  <td>{reg.agent}</td>
                  <td className="regimen-site">{reg.site}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="therapy-layout">
        <Card title="Document Systemic Therapy">
          <form onSubmit={handleSubmit} className="therapy-form">
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
              <label>Concurrent Systemic Therapy? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="concurrent"
                    value="Yes"
                    checked={formData.concurrent === 'Yes'}
                    onChange={handleInputChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="concurrent"
                    value="No"
                    checked={formData.concurrent === 'No'}
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {formData.concurrent === 'Yes' && (
              <>
                <div className="form-group">
                  <label>Regimen Name</label>
                  <input
                    type="text"
                    name="regimen"
                    value={formData.regimen}
                    onChange={handleInputChange}
                    placeholder="e.g., Weekly Cisplatin"
                  />
                </div>

                <div className="form-group">
                  <label>Agent & Dosing</label>
                  <input
                    type="text"
                    name="agent"
                    value={formData.agent}
                    onChange={handleInputChange}
                    placeholder="e.g., Cisplatin 40mg/m² weekly"
                  />
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes about systemic therapy..."
                    rows="3"
                  />
                </div>
              </>
            )}

            <Button type="submit" variant="primary">
              Save Systemic Therapy Record
            </Button>
          </form>
        </Card>

        <Card title="Systemic Therapy Summary">
          {therapies.length === 0 ? (
            <p className="no-data">No systemic therapy records yet.</p>
          ) : (
            <div className="therapy-list">
              {therapies.map((t) => (
                <div key={t.id} className="therapy-item">
                  <div className="therapy-header">
                    <h4>Patient: {t.patientId}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="therapy-status">
                    <span className={`status-indicator ${t.concurrent === 'Yes' ? 'status-yes' : 'status-no'}`}>
                      Concurrent: {t.concurrent}
                    </span>
                  </div>
                  {t.concurrent === 'Yes' && (
                    <>
                      {t.regimen && <p className="therapy-regimen">💊 {t.regimen}</p>}
                      {t.agent && <p className="therapy-agent">{t.agent}</p>}
                      {t.notes && <p className="therapy-notes">{t.notes}</p>}
                    </>
                  )}
                  <p className="therapy-date">{t.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="About Concurrent Systemic Therapy">
        <div className="info-section">
          <p>
            <strong>Concurrent chemoradiotherapy</strong> combines systemic therapy with radiation 
            to achieve better local control and potentially improved survival outcomes.
          </p>
          <ul>
            <li>Common in head & neck, lung, cervical, and esophageal cancers</li>
            <li>Requires close monitoring for enhanced toxicities</li>
            <li>Dose modifications may be needed based on tolerance</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Educational Demo:</strong> Not for real clinical documentation. 
            Actual regimens require oncology approval and monitoring.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SystemicTherapy
