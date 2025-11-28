import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './ResponseAssessment.css'

function ResponseAssessment() {
  const [assessments, setAssessments] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    followUpDate: '',
    response: '',
    imaging: '',
    clinicalNotes: '',
  })

  useEffect(() => {
    loadAssessments()
  }, [])

  const loadAssessments = () => {
    const data = getFromStorage(STORAGE_KEYS.RESPONSE_ASSESSMENTS) || []
    setAssessments(data)
  }

  const responseDefinitions = [
    { code: 'CR', full: 'Complete Response', description: 'Disappearance of all target lesions' },
    { code: 'PR', full: 'Partial Response', description: '≥30% decrease in sum of target lesions' },
    { code: 'SD', full: 'Stable Disease', description: 'Neither PR nor PD criteria met' },
    { code: 'PD', full: 'Progressive Disease', description: '≥20% increase or new lesions' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.followUpDate || !formData.response) {
      alert('Please fill in required fields')
      return
    }

    const newAssessment = {
      id: Date.now(),
      ...formData,
      recorded: new Date().toISOString().split('T')[0],
    }

    const updated = [newAssessment, ...assessments]
    saveToStorage(STORAGE_KEYS.RESPONSE_ASSESSMENTS, updated)
    setAssessments(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = assessments.filter((a) => a.id !== id)
    saveToStorage(STORAGE_KEYS.RESPONSE_ASSESSMENTS, updated)
    setAssessments(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      followUpDate: '',
      response: '',
      imaging: '',
      clinicalNotes: '',
    })
  }

  const groupedAssessments = assessments.reduce((acc, assessment) => {
    if (!acc[assessment.patientId]) {
      acc[assessment.patientId] = []
    }
    acc[assessment.patientId].push(assessment)
    return acc
  }, {})

  return (
    <div className="response-assessment-page">
      <Card title="RECIST Response Criteria">
        <div className="response-definitions">
          {responseDefinitions.map((def) => (
            <div key={def.code} className="response-def">
              <h4 className={`response-code response-${def.code.toLowerCase()}`}>
                {def.code}
              </h4>
              <p className="response-full">{def.full}</p>
              <p className="response-desc">{def.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="assessment-layout">
        <Card title="Record Follow-Up Assessment">
          <form onSubmit={handleSubmit} className="assessment-form">
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
              <label>Follow-Up Date *</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Response Assessment *</label>
              <select name="response" value={formData.response} onChange={handleInputChange}>
                <option value="">Select Response</option>
                <option value="CR">CR - Complete Response</option>
                <option value="PR">PR - Partial Response</option>
                <option value="SD">SD - Stable Disease</option>
                <option value="PD">PD - Progressive Disease</option>
              </select>
            </div>

            <div className="form-group">
              <label>Imaging Modality</label>
              <input
                type="text"
                name="imaging"
                value={formData.imaging}
                onChange={handleInputChange}
                placeholder="e.g., CT, PET-CT, MRI"
              />
            </div>

            <div className="form-group">
              <label>Clinical Notes</label>
              <textarea
                name="clinicalNotes"
                value={formData.clinicalNotes}
                onChange={handleInputChange}
                placeholder="Clinical findings and impressions..."
                rows="4"
              />
            </div>

            <Button type="submit" variant="primary">
              Save Assessment
            </Button>
          </form>
        </Card>

        <Card title="Follow-Up Timeline">
          {assessments.length === 0 ? (
            <p className="no-data">No follow-up assessments recorded yet.</p>
          ) : (
            <div className="timeline-container">
              {Object.entries(groupedAssessments).map(([patientId, patientAssessments]) => (
                <div key={patientId} className="patient-timeline">
                  <h3 className="patient-header">Patient: {patientId}</h3>
                  <div className="timeline-items">
                    {patientAssessments
                      .sort((a, b) => new Date(b.followUpDate) - new Date(a.followUpDate))
                      .map((assess) => (
                        <div key={assess.id} className="timeline-item">
                          <div className="timeline-marker" />
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <span className={`response-badge response-${assess.response.toLowerCase()}`}>
                                {assess.response}
                              </span>
                              <span className="timeline-date">{assess.followUpDate}</span>
                              <button className="btn-delete-small" onClick={() => handleDelete(assess.id)}>
                                🗑️
                              </button>
                            </div>
                            {assess.imaging && (
                              <p className="timeline-imaging">📷 {assess.imaging}</p>
                            )}
                            {assess.clinicalNotes && (
                              <p className="timeline-notes">{assess.clinicalNotes}</p>
                            )}
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
    </div>
  )
}

export default ResponseAssessment
