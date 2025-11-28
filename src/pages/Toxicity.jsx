import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './Toxicity.css'

function Toxicity() {
  const [reports, setReports] = useState([])
  const [formData, setFormData] = useState({
    patientName: '',
    date: new Date().toISOString().split('T')[0],
    symptom: '',
    severity: 'Mild',
  })

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = () => {
    const data = getFromStorage(STORAGE_KEYS.TOXICITY_REPORTS) || []
    setReports(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientName || !formData.symptom) {
      alert('Please fill in all required fields')
      return
    }

    const severityGradeMap = {
      Mild: 1,
      Moderate: 2,
      Severe: 3,
    }

    const newReport = {
      ...formData,
      grade: severityGradeMap[formData.severity],
      id: Date.now(),
    }

    const updatedReports = [newReport, ...reports]
    saveToStorage(STORAGE_KEYS.TOXICITY_REPORTS, updatedReports)
    setReports(updatedReports)
    resetForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this toxicity report?')) {
      const updatedReports = reports.filter((r) => r.id !== id)
      saveToStorage(STORAGE_KEYS.TOXICITY_REPORTS, updatedReports)
      setReports(updatedReports)
    }
  }

  const resetForm = () => {
    setFormData({
      patientName: '',
      date: new Date().toISOString().split('T')[0],
      symptom: '',
      severity: 'Mild',
    })
  }

  return (
    <div className="toxicity-page">
      <div className="toxicity-layout">
        <Card title="Report Toxicity / PRO" className="toxicity-form-card">
          <form onSubmit={handleSubmit} className="toxicity-form">
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
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Symptom *</label>
              <input
                type="text"
                name="symptom"
                value={formData.symptom}
                onChange={handleInputChange}
                placeholder="e.g., Fatigue, Nausea, Skin reaction"
                required
              />
            </div>

            <div className="form-group">
              <label>Severity *</label>
              <select name="severity" value={formData.severity} onChange={handleInputChange}>
                <option value="Mild">Mild (Grade 1)</option>
                <option value="Moderate">Moderate (Grade 2)</option>
                <option value="Severe">Severe (Grade 3)</option>
              </select>
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Add Report
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Clear
              </Button>
            </div>
          </form>

          <div className="severity-legend">
            <h4>Severity Guidelines</h4>
            <div className="legend-item">
              <span className="legend-badge grade-1">Grade 1</span>
              <span>Mild symptoms</span>
            </div>
            <div className="legend-item">
              <span className="legend-badge grade-2">Grade 2</span>
              <span>Moderate; minimal intervention</span>
            </div>
            <div className="legend-item">
              <span className="legend-badge grade-3">Grade 3</span>
              <span>Severe; medical intervention</span>
            </div>
          </div>
        </Card>

        <div className="toxicity-list-section">
          <Card title="Toxicity Reports (Patient Reported Outcomes)">
            {reports.length === 0 ? (
              <p className="no-data">No toxicity reports recorded. Add a report to get started.</p>
            ) : (
              <div className="toxicity-table-wrapper">
                <table className="toxicity-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Symptom</th>
                      <th>Severity</th>
                      <th>Grade</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr
                        key={report.id}
                        className={report.grade >= 2 ? 'toxicity-alert' : ''}
                      >
                        <td>{report.patientName}</td>
                        <td>{report.date}</td>
                        <td>{report.symptom}</td>
                        <td>{report.severity}</td>
                        <td>
                          <span className={`grade-badge grade-${report.grade}`}>
                            Grade {report.grade}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(report.id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Toxicity
