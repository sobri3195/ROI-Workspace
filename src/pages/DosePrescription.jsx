import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './DosePrescription.css'

function DosePrescription() {
  const [customTemplates, setCustomTemplates] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    totalDose: '',
    fractions: '',
    dosePerFraction: '',
    site: '',
    intent: '',
  })

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = () => {
    const data = getFromStorage(STORAGE_KEYS.DOSE_TEMPLATES) || []
    setCustomTemplates(data)
  }

  const standardRegimens = [
    { name: 'Definitive H&N', totalDose: 70, fractions: 35, site: 'Head & Neck', intent: 'Curative' },
    { name: 'Definitive Lung', totalDose: 60, fractions: 30, site: 'Lung', intent: 'Curative' },
    { name: 'Prostate Definitive', totalDose: 78, fractions: 39, site: 'Prostate', intent: 'Curative' },
    { name: 'Breast Whole', totalDose: 50, fractions: 25, site: 'Breast', intent: 'Curative' },
    { name: 'Breast Hypofractionated', totalDose: 42.5, fractions: 16, site: 'Breast', intent: 'Curative' },
    { name: 'Brain SRS', totalDose: 20, fractions: 1, site: 'Brain', intent: 'Curative/Palliative' },
    { name: 'Lung SBRT', totalDose: 54, fractions: 3, site: 'Lung', intent: 'Curative' },
    { name: 'Palliative Bone Mets', totalDose: 20, fractions: 5, site: 'Bone', intent: 'Palliative' },
    { name: 'Palliative Brain', totalDose: 30, fractions: 10, site: 'Brain', intent: 'Palliative' },
    { name: 'Palliative Single Fx', totalDose: 8, fractions: 1, site: 'Various', intent: 'Palliative' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    if (name === 'totalDose' || name === 'fractions') {
      const total = name === 'totalDose' ? parseFloat(value) : parseFloat(formData.totalDose)
      const fx = name === 'fractions' ? parseInt(value) : parseInt(formData.fractions)
      if (total && fx) {
        setFormData(prev => ({ ...prev, dosePerFraction: (total / fx).toFixed(2) }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.totalDose || !formData.fractions) {
      alert('Please fill in required fields')
      return
    }

    const newTemplate = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newTemplate, ...customTemplates]
    saveToStorage(STORAGE_KEYS.DOSE_TEMPLATES, updated)
    setCustomTemplates(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = customTemplates.filter((t) => t.id !== id)
    saveToStorage(STORAGE_KEYS.DOSE_TEMPLATES, updated)
    setCustomTemplates(updated)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      totalDose: '',
      fractions: '',
      dosePerFraction: '',
      site: '',
      intent: '',
    })
  }

  return (
    <div className="dose-prescription-page">
      <Card title="Standard Dose Regimens">
        <div className="regimens-grid">
          {standardRegimens.map((reg, index) => (
            <div key={index} className="regimen-card">
              <h3>{reg.name}</h3>
              <div className="regimen-dose">
                {reg.totalDose} Gy / {reg.fractions} fx
              </div>
              <div className="regimen-details">
                <span>📍 {reg.site}</span>
                <span>🎯 {reg.intent}</span>
              </div>
              <div className="regimen-fx-dose">
                {(reg.totalDose / reg.fractions).toFixed(2)} Gy per fraction
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="prescription-layout">
        <Card title="Create Custom Template">
          <form onSubmit={handleSubmit} className="prescription-form">
            <div className="form-group">
              <label>Template Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Custom Prostate Boost"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Total Dose (Gy) *</label>
                <input
                  type="number"
                  step="0.1"
                  name="totalDose"
                  value={formData.totalDose}
                  onChange={handleInputChange}
                  placeholder="70"
                />
              </div>

              <div className="form-group">
                <label>Fractions *</label>
                <input
                  type="number"
                  name="fractions"
                  value={formData.fractions}
                  onChange={handleInputChange}
                  placeholder="35"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Dose per Fraction (Gy)</label>
              <input
                type="text"
                name="dosePerFraction"
                value={formData.dosePerFraction}
                readOnly
                placeholder="Auto-calculated"
              />
            </div>

            <div className="form-group">
              <label>Site</label>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                placeholder="e.g., Prostate"
              />
            </div>

            <div className="form-group">
              <label>Treatment Intent</label>
              <select name="intent" value={formData.intent} onChange={handleInputChange}>
                <option value="">Select Intent</option>
                <option value="Curative">Curative</option>
                <option value="Palliative">Palliative</option>
                <option value="Adjuvant">Adjuvant</option>
                <option value="Neoadjuvant">Neoadjuvant</option>
              </select>
            </div>

            <Button type="submit" variant="primary">
              Save Template
            </Button>
          </form>
        </Card>

        <Card title="My Custom Templates">
          {customTemplates.length === 0 ? (
            <p className="no-data">No custom templates saved yet.</p>
          ) : (
            <div className="custom-templates-list">
              {customTemplates.map((t) => (
                <div key={t.id} className="template-item">
                  <div className="template-header">
                    <h4>{t.name}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="template-dose">
                    {t.totalDose} Gy / {t.fractions} fx = {t.dosePerFraction} Gy/fx
                  </div>
                  {t.site && <div className="template-detail">📍 {t.site}</div>}
                  {t.intent && <div className="template-detail">🎯 {t.intent}</div>}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default DosePrescription
