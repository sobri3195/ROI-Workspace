import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './Reirradiation.css'

function Reirradiation() {
  const [cases, setCases] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    site: '',
    priorDose: '',
    priorYear: '',
    newDose: '',
    overlap: '',
    assessment: '',
  })

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = () => {
    const data = getFromStorage(STORAGE_KEYS.REIRRADIATION_CASES) || []
    setCases(data)
  }

  const assessRisk = () => {
    if (!formData.priorDose || !formData.priorYear || !formData.newDose) {
      return 'Incomplete data'
    }

    const priorDose = parseFloat(formData.priorDose)
    const newDose = parseFloat(formData.newDose)
    const yearsAgo = new Date().getFullYear() - parseInt(formData.priorYear)
    const hasOverlap = formData.overlap === 'Yes'

    let risk = 'Low'
    let explanation = 'Limited overlap and adequate time interval suggest lower risk.'

    if (hasOverlap && (priorDose + newDose > 100) && yearsAgo < 2) {
      risk = 'High'
      explanation = 'High cumulative dose with recent prior RT and field overlap suggests high toxicity risk.'
    } else if (hasOverlap && (priorDose + newDose > 80)) {
      risk = 'Moderate'
      explanation = 'Moderate cumulative dose with field overlap. Careful OAR evaluation needed.'
    } else if (yearsAgo > 5) {
      risk = 'Low-Moderate'
      explanation = 'Longer time interval allows for some tissue recovery.'
    }

    return { risk, explanation }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAssess = () => {
    const result = assessRisk()
    setFormData({ ...formData, assessment: `Risk: ${result.risk} - ${result.explanation}` })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.site) {
      alert('Please fill in required fields')
      return
    }

    const newCase = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
    }

    const updated = [newCase, ...cases]
    saveToStorage(STORAGE_KEYS.REIRRADIATION_CASES, updated)
    setCases(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = cases.filter((c) => c.id !== id)
    saveToStorage(STORAGE_KEYS.REIRRADIATION_CASES, updated)
    setCases(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      site: '',
      priorDose: '',
      priorYear: '',
      newDose: '',
      overlap: '',
      assessment: '',
    })
  }

  return (
    <div className="reirradiation-page">
      <div className="reir-layout">
        <Card title="Re-Irradiation Risk Estimator">
          <form onSubmit={handleSubmit} className="reir-form">
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
                placeholder="e.g., Head & Neck, Spine"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Prior Dose (Gy)</label>
                <input
                  type="number"
                  name="priorDose"
                  value={formData.priorDose}
                  onChange={handleInputChange}
                  placeholder="60"
                />
              </div>

              <div className="form-group">
                <label>Prior RT Year</label>
                <input
                  type="number"
                  name="priorYear"
                  value={formData.priorYear}
                  onChange={handleInputChange}
                  placeholder="2020"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Proposed New Dose (Gy)</label>
              <input
                type="number"
                name="newDose"
                value={formData.newDose}
                onChange={handleInputChange}
                placeholder="40"
              />
            </div>

            <div className="form-group">
              <label>Field Overlap?</label>
              <select name="overlap" value={formData.overlap} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Yes">Yes - Significant Overlap</option>
                <option value="Partial">Partial Overlap</option>
                <option value="No">No Overlap</option>
              </select>
            </div>

            <Button type="button" variant="secondary" onClick={handleAssess}>
              Assess Risk
            </Button>

            {formData.assessment && (
              <div className="assessment-result">
                <h4>Risk Assessment:</h4>
                <p>{formData.assessment}</p>
              </div>
            )}

            <Button type="submit" variant="primary">
              Save Case
            </Button>
          </form>
        </Card>

        <Card title="Re-Irradiation Case History">
          {cases.length === 0 ? (
            <p className="no-data">No re-irradiation cases logged yet.</p>
          ) : (
            <div className="cases-list">
              {cases.map((c) => (
                <div key={c.id} className="case-item">
                  <div className="case-header">
                    <h4>Patient: {c.patientId}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="case-info">
                    <p><strong>Site:</strong> {c.site}</p>
                    {c.priorDose && <p><strong>Prior Dose:</strong> {c.priorDose} Gy ({c.priorYear})</p>}
                    {c.newDose && <p><strong>New Dose:</strong> {c.newDose} Gy</p>}
                    {c.overlap && <p><strong>Overlap:</strong> {c.overlap}</p>}
                    {c.assessment && (
                      <div className="case-assessment">{c.assessment}</div>
                    )}
                  </div>
                  <p className="case-date">{c.date}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="About Re-Irradiation">
        <div className="info-section">
          <p>
            <strong>Re-irradiation</strong> presents unique challenges due to cumulative normal tissue 
            tolerance and potential for severe toxicity.
          </p>
          <h4>Key Considerations:</h4>
          <ul>
            <li>Time interval since prior RT (tissue recovery over months/years)</li>
            <li>Cumulative dose to critical organs (especially spinal cord, brainstem)</li>
            <li>Field overlap and dose distribution</li>
            <li>Patient performance status and life expectancy</li>
            <li>Alternative treatment options</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Conceptual Tool Only:</strong> This is a simplified educational tool. 
            Real re-irradiation decisions require detailed dosimetric analysis, multidisciplinary 
            discussion, and careful patient selection.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Reirradiation
