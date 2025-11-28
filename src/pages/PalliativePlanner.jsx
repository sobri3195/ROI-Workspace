import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './PalliativePlanner.css'

function PalliativePlanner() {
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    site: '',
    symptom: '',
    regimen: '',
    customDose: '',
    customFx: '',
  })

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = () => {
    const data = getFromStorage(STORAGE_KEYS.PALLIATIVE_PLANS) || []
    setPlans(data)
  }

  const palliativeRegimens = {
    'Bone Metastases': [
      '8 Gy / 1 fx',
      '20 Gy / 5 fx',
      '30 Gy / 10 fx',
    ],
    'Brain Metastases': [
      '20 Gy / 5 fx (WBRT)',
      '30 Gy / 10 fx (WBRT)',
      '18-24 Gy / 1 fx (SRS)',
    ],
    'Spinal Cord Compression': [
      '8 Gy / 1 fx',
      '20 Gy / 5 fx',
      '30 Gy / 10 fx',
    ],
    'Bleeding': [
      '8 Gy / 1 fx',
      '20 Gy / 5 fx',
      '30 Gy / 10 fx',
    ],
    'Obstruction': [
      '16 Gy / 2 fx',
      '20 Gy / 5 fx',
      '30 Gy / 10 fx',
    ],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.site || !formData.symptom) {
      alert('Please fill in required fields')
      return
    }

    const newPlan = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newPlan, ...plans]
    saveToStorage(STORAGE_KEYS.PALLIATIVE_PLANS, updated)
    setPlans(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = plans.filter((p) => p.id !== id)
    saveToStorage(STORAGE_KEYS.PALLIATIVE_PLANS, updated)
    setPlans(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      site: '',
      symptom: '',
      regimen: '',
      customDose: '',
      customFx: '',
    })
  }

  return (
    <div className="palliative-planner-page">
      <Card title="Common Palliative Regimens">
        <div className="palliative-grid">
          {Object.entries(palliativeRegimens).map(([indication, regimens]) => (
            <div key={indication} className="indication-card">
              <h3>{indication}</h3>
              <ul className="regimen-list">
                {regimens.map((reg, idx) => (
                  <li key={idx}>{reg}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <div className="planner-layout">
        <Card title="Create Palliative Plan">
          <form onSubmit={handleSubmit} className="palliative-form">
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
                placeholder="e.g., L3 vertebra, right femur"
              />
            </div>

            <div className="form-group">
              <label>Primary Symptom *</label>
              <select name="symptom" value={formData.symptom} onChange={handleInputChange}>
                <option value="">Select Symptom</option>
                <option value="Pain">Pain</option>
                <option value="Bleeding">Bleeding</option>
                <option value="Neurological Deficit">Neurological Deficit</option>
                <option value="Obstruction">Obstruction</option>
                <option value="Mass Effect">Mass Effect</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Selected Regimen</label>
              <input
                type="text"
                name="regimen"
                value={formData.regimen}
                onChange={handleInputChange}
                placeholder="e.g., 20 Gy / 5 fx"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Custom Dose (Gy)</label>
                <input
                  type="text"
                  name="customDose"
                  value={formData.customDose}
                  onChange={handleInputChange}
                  placeholder="20"
                />
              </div>

              <div className="form-group">
                <label>Custom Fractions</label>
                <input
                  type="text"
                  name="customFx"
                  value={formData.customFx}
                  onChange={handleInputChange}
                  placeholder="5"
                />
              </div>
            </div>

            <Button type="submit" variant="primary">
              Save Palliative Plan
            </Button>
          </form>
        </Card>

        <Card title="Saved Palliative Plans">
          {plans.length === 0 ? (
            <p className="no-data">No palliative plans saved yet.</p>
          ) : (
            <div className="plans-list">
              {plans.map((plan) => (
                <div key={plan.id} className="plan-item">
                  <div className="plan-header">
                    <h4>Patient: {plan.patientId}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(plan.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="plan-details">
                    <p><strong>Site:</strong> {plan.site}</p>
                    <p><strong>Symptom:</strong> {plan.symptom}</p>
                    {plan.regimen && <p><strong>Regimen:</strong> {plan.regimen}</p>}
                    {plan.customDose && plan.customFx && (
                      <p><strong>Custom:</strong> {plan.customDose} Gy / {plan.customFx} fx</p>
                    )}
                  </div>
                  <p className="plan-date">{plan.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="About Palliative Radiotherapy">
        <div className="info-section">
          <p>
            <strong>Palliative radiotherapy</strong> aims to relieve symptoms and improve quality 
            of life, typically using shorter, hypofractionated regimens.
          </p>
          <ul>
            <li><strong>Single Fraction (8 Gy):</strong> Convenient, cost-effective for bone mets</li>
            <li><strong>Short Course (20 Gy/5 fx):</strong> Balance between convenience and response</li>
            <li><strong>Longer Course (30 Gy/10 fx):</strong> May provide longer symptom control</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Educational Demo:</strong> Treatment decisions should be individualized 
            based on patient performance status, prognosis, and goals of care.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default PalliativePlanner
