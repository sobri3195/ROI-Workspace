import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './TreatmentSchedule.css'

function TreatmentSchedule() {
  const [schedules, setSchedules] = useState([])
  const [formData, setFormData] = useState({
    patientId: '',
    startDate: '',
    fractions: '',
  })
  const [generatedDates, setGeneratedDates] = useState([])

  useEffect(() => {
    loadSchedules()
  }, [])

  const loadSchedules = () => {
    const data = getFromStorage(STORAGE_KEYS.TREATMENT_SCHEDULES) || []
    setSchedules(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const generateSchedule = () => {
    if (!formData.startDate || !formData.fractions) {
      alert('Please fill in start date and number of fractions')
      return
    }

    const start = new Date(formData.startDate)
    const fxCount = parseInt(formData.fractions)
    const dates = []
    let current = new Date(start)
    let addedFractions = 0

    while (addedFractions < fxCount) {
      if (!isWeekend(current)) {
        dates.push({
          fraction: addedFractions + 1,
          date: current.toISOString().split('T')[0],
          day: current.toLocaleDateString('en-US', { weekday: 'long' }),
        })
        addedFractions++
      }
      current.setDate(current.getDate() + 1)
    }

    setGeneratedDates(dates)
  }

  const handleSave = () => {
    if (generatedDates.length === 0) {
      alert('Please generate a schedule first')
      return
    }

    if (!formData.patientId) {
      alert('Please enter a patient ID')
      return
    }

    const newSchedule = {
      id: Date.now(),
      patientId: formData.patientId,
      startDate: formData.startDate,
      fractions: formData.fractions,
      dates: generatedDates,
      created: new Date().toISOString().split('T')[0],
    }

    const updated = [newSchedule, ...schedules]
    saveToStorage(STORAGE_KEYS.TREATMENT_SCHEDULES, updated)
    setSchedules(updated)
    resetForm()
  }

  const handleDelete = (id) => {
    const updated = schedules.filter((s) => s.id !== id)
    saveToStorage(STORAGE_KEYS.TREATMENT_SCHEDULES, updated)
    setSchedules(updated)
  }

  const resetForm = () => {
    setFormData({
      patientId: '',
      startDate: '',
      fractions: '',
    })
    setGeneratedDates([])
  }

  return (
    <div className="treatment-schedule-page">
      <div className="schedule-layout">
        <Card title="Treatment Schedule Generator">
          <div className="schedule-form">
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
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Number of Fractions *</label>
              <input
                type="number"
                name="fractions"
                value={formData.fractions}
                onChange={handleInputChange}
                placeholder="e.g., 35"
              />
            </div>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={generateSchedule}>
                Generate Schedule
              </Button>
              {generatedDates.length > 0 && (
                <Button type="button" variant="primary" onClick={handleSave}>
                  Save Schedule
                </Button>
              )}
            </div>

            {generatedDates.length > 0 && (
              <div className="generated-preview">
                <h4>Generated Treatment Dates:</h4>
                <div className="dates-preview">
                  <p className="preview-summary">
                    {generatedDates.length} fractions from {generatedDates[0].date} to {generatedDates[generatedDates.length - 1].date}
                  </p>
                  <p className="preview-note">
                    (Weekends automatically skipped)
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Saved Schedules">
          {schedules.length === 0 ? (
            <p className="no-data">No schedules saved yet.</p>
          ) : (
            <div className="schedules-list">
              {schedules.map((sched) => (
                <div key={sched.id} className="schedule-item">
                  <div className="schedule-header">
                    <h4>Patient: {sched.patientId}</h4>
                    <button className="btn-delete" onClick={() => handleDelete(sched.id)}>
                      🗑️
                    </button>
                  </div>
                  <div className="schedule-summary">
                    <p><strong>Fractions:</strong> {sched.fractions}</p>
                    <p><strong>Start:</strong> {sched.dates[0].date}</p>
                    <p><strong>End:</strong> {sched.dates[sched.dates.length - 1].date}</p>
                  </div>
                  <details className="schedule-details">
                    <summary>View All Dates</summary>
                    <div className="dates-list">
                      {sched.dates.map((d) => (
                        <div key={d.fraction} className="date-item">
                          <span className="fx-number">Fx {d.fraction}</span>
                          <span className="fx-date">{d.date}</span>
                          <span className="fx-day">{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default TreatmentSchedule
