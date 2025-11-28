import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './ImmobilizationSetup.css'

function ImmobilizationSetup() {
  const [plans, setPlans] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    site: '',
    position: '',
    immobilization: [],
    notes: '',
  })

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = () => {
    const data = getFromStorage(STORAGE_KEYS.SETUP_PLANS) || []
    setPlans(data)
  }

  const immobilizationOptions = [
    'Thermoplastic Mask',
    'Vacuum Cushion',
    'Wing Board',
    'Alpha Cradle',
    'Breast Board',
    'Knee Rest',
    'Ankle Rest',
    'Body Frame',
  ]

  const handleCheckboxChange = (option) => {
    const updated = formData.immobilization.includes(option)
      ? formData.immobilization.filter((i) => i !== option)
      : [...formData.immobilization, option]
    setFormData({ ...formData, immobilization: updated })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.site || !formData.position) {
      alert('Please fill in required fields')
      return
    }

    const newPlan = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newPlan, ...plans]
    saveToStorage(STORAGE_KEYS.SETUP_PLANS, updated)
    setPlans(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = plans.filter((p) => p.id !== id)
    saveToStorage(STORAGE_KEYS.SETUP_PLANS, updated)
    setPlans(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      site: '',
      position: '',
      immobilization: [],
      notes: '',
    })
  }

  return (
    <div className="immobilization-setup-page">
      <div className="setup-layout">
        <Card title="Setup Planning">
          <form onSubmit={handleSubmit} className="setup-form">
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
                placeholder="e.g., Head & Neck, Breast"
              />
            </div>

            <div className="form-group">
              <label>Patient Position *</label>
              <select name="position" value={formData.position} onChange={handleInputChange}>
                <option value="">Select Position</option>
                <option value="Supine">Supine</option>
                <option value="Prone">Prone</option>
                <option value="Supine - Arms Up">Supine - Arms Up</option>
                <option value="Supine - Arms Down">Supine - Arms Down</option>
                <option value="Decubitus">Decubitus</option>
              </select>
            </div>

            <div className="form-group">
              <label>Immobilization Devices</label>
              <div className="checkbox-grid">
                {immobilizationOptions.map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.immobilization.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Setup Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional setup instructions..."
                rows="3"
              />
            </div>

            <Button type="submit" variant="primary">
              Save Setup Plan
            </Button>
          </form>
        </Card>

        <Card title="Saved Setup Plans">
          {plans.length === 0 ? (
            <p className="no-data">No setup plans saved yet.</p>
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
                    <div className="detail-row">
                      <span className="detail-label">Site:</span>
                      <span>{plan.site}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Position:</span>
                      <span>{plan.position}</span>
                    </div>
                    {plan.immobilization.length > 0 && (
                      <div className="detail-row">
                        <span className="detail-label">Immobilization:</span>
                        <span>{plan.immobilization.join(', ')}</span>
                      </div>
                    )}
                    {plan.notes && (
                      <div className="detail-row">
                        <span className="detail-label">Notes:</span>
                        <span>{plan.notes}</span>
                      </div>
                    )}
                  </div>
                  <p className="plan-date">{plan.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default ImmobilizationSetup
