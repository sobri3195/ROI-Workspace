import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './ImagingDiagnostic.css'

function ImagingDiagnostic() {
  const [logs, setLogs] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    modality: '',
    date: '',
    impression: '',
    findings: '',
  })

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = () => {
    const data = getFromStorage(STORAGE_KEYS.IMAGING_LOGS) || []
    setLogs(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.modality || !formData.date || !formData.impression) {
      alert('Please fill in all required fields')
      return
    }

    const newLog = {
      id: Date.now(),
      ...formData,
    }

    const updatedLogs = [newLog, ...logs]
    saveToStorage(STORAGE_KEYS.IMAGING_LOGS, updatedLogs)
    setLogs(updatedLogs)
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this imaging log?')) {
      const updatedLogs = logs.filter((l) => l.id !== id)
      saveToStorage(STORAGE_KEYS.IMAGING_LOGS, updatedLogs)
      setLogs(updatedLogs)
    }
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      modality: '',
      date: '',
      impression: '',
      findings: '',
    })
  }

  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.patientId]) {
      acc[log.patientId] = []
    }
    acc[log.patientId].push(log)
    return acc
  }, {})

  return (
    <div className="imaging-diagnostic-page">
      <div className="imaging-layout">
        <Card title="Add Imaging Study" className="imaging-form-card">
          <form onSubmit={handleSubmit} className="imaging-form">
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
              <label>Imaging Modality *</label>
              <select name="modality" value={formData.modality} onChange={handleInputChange}>
                <option value="">Select Modality</option>
                <option value="CT">CT - Computed Tomography</option>
                <option value="MRI">MRI - Magnetic Resonance Imaging</option>
                <option value="PET-CT">PET-CT - Positron Emission Tomography</option>
                <option value="PET-MRI">PET-MRI</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="X-Ray">X-Ray</option>
                <option value="Bone Scan">Bone Scan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Study Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Diagnostic Impression *</label>
              <input
                type="text"
                name="impression"
                value={formData.impression}
                onChange={handleInputChange}
                placeholder="e.g., Right upper lobe mass, suspicious for malignancy"
              />
            </div>

            <div className="form-group">
              <label>Detailed Findings (Optional)</label>
              <textarea
                name="findings"
                value={formData.findings}
                onChange={handleInputChange}
                placeholder="Detailed imaging findings..."
                rows="4"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Add Imaging Log
              </Button>
            </div>
          </form>
        </Card>

        <Card title="Imaging Timeline">
          {logs.length === 0 ? (
            <p className="no-data">No imaging studies logged yet.</p>
          ) : (
            <div className="timeline-container">
              {Object.entries(groupedLogs).map(([patientId, patientLogs]) => (
                <div key={patientId} className="patient-timeline">
                  <h3 className="patient-id-header">Patient: {patientId}</h3>
                  <div className="timeline-items">
                    {patientLogs
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((log) => (
                        <div key={log.id} className="timeline-item">
                          <div className="timeline-marker" />
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <span className={`modality-badge modality-${log.modality.toLowerCase().replace(/[^a-z]/g, '')}`}>
                                {log.modality}
                              </span>
                              <span className="timeline-date">{log.date}</span>
                              <button className="btn-delete-small" onClick={() => handleDelete(log.id)}>
                                🗑️
                              </button>
                            </div>
                            <p className="timeline-impression">{log.impression}</p>
                            {log.findings && <p className="timeline-findings">{log.findings}</p>}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="About Imaging Modalities">
        <div className="info-section">
          <p>
            <strong>Common imaging modalities in radiation oncology:</strong>
          </p>
          <ul>
            <li><strong>CT:</strong> Primary modality for treatment planning and dose calculation</li>
            <li><strong>MRI:</strong> Superior soft tissue contrast for target delineation</li>
            <li><strong>PET-CT:</strong> Functional imaging for staging and response assessment</li>
            <li><strong>CBCT:</strong> Image-guided radiotherapy for daily setup verification</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Educational Demo:</strong> For demonstration purposes only. Not for clinical use.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ImagingDiagnostic
