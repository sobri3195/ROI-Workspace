import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './StagingAssistant.css'

function StagingAssistant() {
  const [cases, setCases] = useState([])
  const [formData, setFormData] = useState({
    tumorSite: '',
    tStage: '',
    nStage: '',
    mStatus: '',
    notes: '',
  })
  const [result, setResult] = useState('')

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = () => {
    const data = getFromStorage(STORAGE_KEYS.STAGING_CASES) || []
    setCases(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const determineClinicalStage = (t, n, m) => {
    if (m === 'M1') return 'Stage IV'
    if (t === 'T4' || n === 'N3') return 'Stage III'
    if (t === 'T3' || n === 'N2') return 'Stage III'
    if (t === 'T2' && n === 'N1') return 'Stage II'
    if (t === 'T2' && n === 'N0') return 'Stage I'
    if (t === 'T1' && n === 'N1') return 'Stage II'
    if (t === 'T1' && n === 'N0') return 'Stage I'
    return 'Stage Undetermined'
  }

  const handleCalculate = () => {
    if (!formData.tumorSite || !formData.tStage || !formData.nStage || !formData.mStatus) {
      alert('Please fill in all staging fields')
      return
    }

    const stage = determineClinicalStage(formData.tStage, formData.nStage, formData.mStatus)
    const stagingResult = `c${formData.tStage}${formData.nStage}${formData.mStatus} – ${stage}`
    setResult(stagingResult)
  }

  const handleSave = () => {
    if (!result) {
      alert('Please calculate staging first')
      return
    }

    const newCase = {
      id: Date.now(),
      ...formData,
      result,
      date: new Date().toISOString().split('T')[0],
    }

    const updatedCases = [newCase, ...cases]
    saveToStorage(STORAGE_KEYS.STAGING_CASES, updatedCases)
    setCases(updatedCases)
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this staging case?')) {
      const updatedCases = cases.filter((c) => c.id !== id)
      saveToStorage(STORAGE_KEYS.STAGING_CASES, updatedCases)
      setCases(updatedCases)
    }
  }

  const resetForm = () => {
    setFormData({
      tumorSite: '',
      tStage: '',
      nStage: '',
      mStatus: '',
      notes: '',
    })
    setResult('')
  }

  return (
    <div className="staging-assistant-page">
      <div className="staging-layout">
        <Card title="TNM Staging Helper" className="staging-form-card">
          <form className="staging-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Tumor Site *</label>
              <input
                type="text"
                name="tumorSite"
                value={formData.tumorSite}
                onChange={handleInputChange}
                placeholder="e.g., Lung, Breast, Prostate"
              />
            </div>

            <div className="form-group">
              <label>T Stage *</label>
              <select name="tStage" value={formData.tStage} onChange={handleInputChange}>
                <option value="">Select T Stage</option>
                <option value="Tis">Tis - Carcinoma in situ</option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
              </select>
            </div>

            <div className="form-group">
              <label>N Stage *</label>
              <select name="nStage" value={formData.nStage} onChange={handleInputChange}>
                <option value="">Select N Stage</option>
                <option value="N0">N0 - No regional lymph nodes</option>
                <option value="N1">N1</option>
                <option value="N2">N2</option>
                <option value="N3">N3</option>
              </select>
            </div>

            <div className="form-group">
              <label>M Status *</label>
              <select name="mStatus" value={formData.mStatus} onChange={handleInputChange}>
                <option value="">Select M Status</option>
                <option value="M0">M0 - No distant metastasis</option>
                <option value="M1">M1 - Distant metastasis present</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional clinical notes..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <Button type="button" variant="primary" onClick={handleCalculate}>
                Calculate Stage
              </Button>
              {result && (
                <Button type="button" variant="secondary" onClick={handleSave}>
                  Save Case
                </Button>
              )}
            </div>

            {result && (
              <div className="staging-result">
                <h3>Clinical Stage:</h3>
                <p className="result-text">{result}</p>
              </div>
            )}
          </form>
        </Card>

        <Card title="Saved Staging Cases">
          {cases.length === 0 ? (
            <p className="no-data">No staging cases saved yet.</p>
          ) : (
            <div className="cases-list">
              {cases.map((c) => (
                <div key={c.id} className="case-item">
                  <div className="case-header">
                    <h4>{c.tumorSite}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                      🗑️
                    </button>
                  </div>
                  <p className="case-result">{c.result}</p>
                  <p className="case-date">Date: {c.date}</p>
                  {c.notes && <p className="case-notes">Notes: {c.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="About TNM Staging">
        <div className="info-section">
          <p>
            <strong>TNM Staging</strong> is the standard classification system for cancer staging:
          </p>
          <ul>
            <li><strong>T (Tumor):</strong> Size and extent of the primary tumor</li>
            <li><strong>N (Nodes):</strong> Regional lymph node involvement</li>
            <li><strong>M (Metastasis):</strong> Presence of distant metastasis</li>
          </ul>
          <p className="demo-notice">
            ⚠️ <strong>Educational Demo:</strong> This is a simplified staging calculator for 
            educational purposes only. Real TNM staging is site-specific and more complex.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default StagingAssistant
