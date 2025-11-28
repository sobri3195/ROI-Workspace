import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './TechniqueSelection.css'

function TechniqueSelection() {
  const [choices, setChoices] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    site: '',
    technique: '',
    rationale: '',
  })
  const [suggestion, setSuggestion] = useState(null)

  useEffect(() => {
    loadChoices()
  }, [])

  const loadChoices = () => {
    const data = getFromStorage(STORAGE_KEYS.TECHNIQUE_CHOICES) || []
    setChoices(data)
  }

  const techniques = {
    'Head & Neck': { recommended: 'IMRT / VMAT', alternatives: ['3DCRT', 'Proton'] },
    'Lung': { recommended: 'VMAT / IMRT', alternatives: ['3DCRT', 'SBRT', 'Proton'] },
    'Prostate': { recommended: 'VMAT / IMRT', alternatives: ['3DCRT', 'Proton', 'Brachytherapy'] },
    'Breast': { recommended: '3DCRT / VMAT', alternatives: ['IMRT', 'Proton'] },
    'Brain': { recommended: 'SRS / VMAT', alternatives: ['3DCRT', 'IMRT', 'Proton'] },
    'Spine': { recommended: 'SBRT / SRS', alternatives: ['3DCRT', 'IMRT'] },
    'Liver': { recommended: 'SBRT', alternatives: ['3DCRT', 'Proton'] },
    'Pancreas': { recommended: 'IMRT / VMAT', alternatives: ['SBRT', 'Proton'] },
  }

  const techniqueDefinitions = [
    { name: '3DCRT', full: '3D Conformal Radiotherapy', description: 'Traditional conformal technique' },
    { name: 'IMRT', full: 'Intensity Modulated RT', description: 'Modulated beam intensities for dose sculpting' },
    { name: 'VMAT', full: 'Volumetric Modulated Arc Therapy', description: 'Rotational IMRT with continuous delivery' },
    { name: 'SBRT', full: 'Stereotactic Body RT', description: 'High dose per fraction, precise targeting' },
    { name: 'SRS', full: 'Stereotactic Radiosurgery', description: 'Single or few fractions to brain lesions' },
    { name: 'Proton', full: 'Proton Beam Therapy', description: 'Charged particle therapy with Bragg peak' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGetSuggestion = () => {
    if (!formData.site) {
      alert('Please select a site')
      return
    }

    const siteData = techniques[formData.site]
    if (siteData) {
      setSuggestion(siteData)
    } else {
      setSuggestion({ recommended: 'Site-specific evaluation needed', alternatives: [] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.site || !formData.technique) {
      alert('Please fill in required fields')
      return
    }

    const newChoice = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newChoice, ...choices]
    saveToStorage(STORAGE_KEYS.TECHNIQUE_CHOICES, updated)
    setChoices(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = choices.filter((c) => c.id !== id)
    saveToStorage(STORAGE_KEYS.TECHNIQUE_CHOICES, updated)
    setChoices(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      site: '',
      technique: '',
      rationale: '',
    })
    setSuggestion(null)
  }

  return (
    <div className="technique-selection-page">
      <div className="technique-grid">
        <Card title="Technique Definitions">
          <div className="techniques-list">
            {techniqueDefinitions.map((tech, index) => (
              <div key={index} className="technique-def">
                <h4>{tech.name}</h4>
                <p className="tech-full">{tech.full}</p>
                <p className="tech-desc">{tech.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="selection-section">
          <Card title="Technique Selection Assistant">
            <form onSubmit={handleSubmit} className="technique-form">
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
                <select name="site" value={formData.site} onChange={handleInputChange}>
                  <option value="">Select Site</option>
                  {Object.keys(techniques).map((site) => (
                    <option key={site} value={site}>{site}</option>
                  ))}
                </select>
              </div>

              <Button type="button" variant="secondary" onClick={handleGetSuggestion}>
                Get Technique Suggestion
              </Button>

              {suggestion && (
                <div className="suggestion-box">
                  <h4>Recommended:</h4>
                  <p className="suggested-tech">{suggestion.recommended}</p>
                  {suggestion.alternatives.length > 0 && (
                    <>
                      <h4>Alternatives:</h4>
                      <p className="alternative-techs">{suggestion.alternatives.join(', ')}</p>
                    </>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Selected Technique *</label>
                <select name="technique" value={formData.technique} onChange={handleInputChange}>
                  <option value="">Select Technique</option>
                  <option value="3DCRT">3DCRT</option>
                  <option value="IMRT">IMRT</option>
                  <option value="VMAT">VMAT</option>
                  <option value="SBRT">SBRT</option>
                  <option value="SRS">SRS</option>
                  <option value="Proton">Proton</option>
                </select>
              </div>

              <div className="form-group">
                <label>Rationale</label>
                <textarea
                  name="rationale"
                  value={formData.rationale}
                  onChange={handleInputChange}
                  placeholder="Reason for technique selection..."
                  rows="3"
                />
              </div>

              <Button type="submit" variant="primary">
                Log Technique Choice
              </Button>
            </form>
          </Card>

          <Card title="Logged Technique Choices">
            {choices.length === 0 ? (
              <p className="no-data">No technique choices logged yet.</p>
            ) : (
              <div className="choices-list">
                {choices.map((c) => (
                  <div key={c.id} className="choice-item">
                    <div className="choice-header">
                      <span className="choice-patient">Patient: {c.patientId}</span>
                      <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                        🗑️
                      </button>
                    </div>
                    <div className="choice-details">
                      <span className="choice-site">📍 {c.site}</span>
                      <span className="choice-tech">⚡ {c.technique}</span>
                    </div>
                    {c.rationale && <p className="choice-rationale">{c.rationale}</p>}
                    <p className="choice-date">{c.date}</p>
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

export default TechniqueSelection
