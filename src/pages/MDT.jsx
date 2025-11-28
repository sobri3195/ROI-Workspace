import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './MDT.css'

function MDT() {
  const [mdtCases, setMdtCases] = useState([])
  const [formData, setFormData] = useState({
    patientName: '',
    diagnosis: '',
    stage: '',
    notes: '',
    consensus: '',
  })

  useEffect(() => {
    loadMdtCases()
  }, [])

  const loadMdtCases = () => {
    const data = getFromStorage(STORAGE_KEYS.MDT_CASES) || []
    setMdtCases(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientName || !formData.diagnosis || !formData.consensus) {
      alert('Please fill in all required fields')
      return
    }

    const newCase = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
    }

    const updatedCases = [newCase, ...mdtCases]
    saveToStorage(STORAGE_KEYS.MDT_CASES, updatedCases)
    setMdtCases(updatedCases)
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this MDT case?')) {
      const updatedCases = mdtCases.filter((c) => c.id !== id)
      saveToStorage(STORAGE_KEYS.MDT_CASES, updatedCases)
      setMdtCases(updatedCases)
    }
  }

  const resetForm = () => {
    setFormData({
      patientName: '',
      diagnosis: '',
      stage: '',
      notes: '',
      consensus: '',
    })
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="mdt-page">
      <div className="mdt-layout">
        <Card title="Add MDT Case" className="mdt-form-card">
          <form onSubmit={handleSubmit} className="mdt-form">
            <div className="form-group">
              <label>Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Patient name"
                required
              />
            </div>

            <div className="form-group">
              <label>Diagnosis *</label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                placeholder="Primary diagnosis"
                required
              />
            </div>

            <div className="form-group">
              <label>Stage</label>
              <input
                type="text"
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                placeholder="e.g., cT3N2M0"
              />
            </div>

            <div className="form-group">
              <label>Multidisciplinary Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Discussion points, imaging findings, pathology results..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Final MDT Consensus Plan *</label>
              <textarea
                name="consensus"
                value={formData.consensus}
                onChange={handleInputChange}
                placeholder="Agreed treatment plan and recommendations..."
                rows="3"
                required
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Add MDT Case
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Clear
              </Button>
            </div>
          </form>
        </Card>

        <div className="mdt-list-section">
          <Card title="MDT Case Board">
            {mdtCases.length === 0 ? (
              <p className="no-data">No MDT cases recorded. Add a case to get started.</p>
            ) : (
              <div className="mdt-cases">
                {mdtCases.map((mdtCase) => (
                  <div key={mdtCase.id} className="mdt-case-card">
                    <div className="mdt-case-header">
                      <div>
                        <h4 className="mdt-case-patient">{mdtCase.patientName}</h4>
                        <p className="mdt-case-date">{formatDate(mdtCase.date)}</p>
                      </div>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(mdtCase.id)}
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="mdt-case-content">
                      <div className="mdt-case-field">
                        <strong>Diagnosis:</strong> {mdtCase.diagnosis}
                      </div>
                      {mdtCase.stage && (
                        <div className="mdt-case-field">
                          <strong>Stage:</strong> {mdtCase.stage}
                        </div>
                      )}
                      {mdtCase.notes && (
                        <div className="mdt-case-field">
                          <strong>Notes:</strong>
                          <p className="mdt-case-text">{mdtCase.notes}</p>
                        </div>
                      )}
                      <div className="mdt-case-field mdt-consensus">
                        <strong>MDT Consensus:</strong>
                        <p className="mdt-case-text">{mdtCase.consensus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MDT
