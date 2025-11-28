import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './Patients.css'

function Patients() {
  const [patients, setPatients] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    diagnosis: '',
    stage: '',
    status: 'Active',
    riskGroup: 'Intermediate',
  })
  const [editingId, setEditingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = () => {
    const data = getFromStorage(STORAGE_KEYS.PATIENTS) || []
    setPatients(data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.age || !formData.diagnosis) {
      alert('Please fill in all required fields')
      return
    }

    let updatedPatients
    if (editingId !== null) {
      updatedPatients = patients.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } : p
      )
    } else {
      const newPatient = {
        ...formData,
        id: Date.now(),
      }
      updatedPatients = [...patients, newPatient]
    }

    saveToStorage(STORAGE_KEYS.PATIENTS, updatedPatients)
    setPatients(updatedPatients)
    resetForm()
  }

  const handleEdit = (patient) => {
    setFormData(patient)
    setEditingId(patient.id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const updatedPatients = patients.filter((p) => p.id !== id)
      saveToStorage(STORAGE_KEYS.PATIENTS, updatedPatients)
      setPatients(updatedPatients)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      diagnosis: '',
      stage: '',
      status: 'Active',
      riskGroup: 'Intermediate',
    })
    setEditingId(null)
  }

  const filteredPatients = patients.filter(
    (p) => filterStatus === 'All' || p.status === filterStatus
  )

  return (
    <div className="patients-page">
      <div className="patients-layout">
        <Card title={editingId ? 'Edit Patient' : 'Add New Patient'} className="patients-form-card">
          <form onSubmit={handleSubmit} className="patients-form">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Patient name"
                required
              />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
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
                placeholder="e.g., Lung Cancer, Prostate Cancer"
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
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>

            <div className="form-group">
              <label>Risk Group</label>
              <select name="riskGroup" value={formData.riskGroup} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Intermediate">Intermediate</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                {editingId ? 'Update Patient' : 'Add Patient'}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        <div className="patients-list-section">
          <Card title="Patient Database">
            <div className="patients-filters">
              <label>Filter by Status:</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>

            {filteredPatients.length === 0 ? (
              <p className="no-data">No patients found. Add a patient to get started.</p>
            ) : (
              <div className="patients-table-wrapper">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Diagnosis</th>
                      <th>Stage</th>
                      <th>Status</th>
                      <th>Risk Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.diagnosis}</td>
                        <td>{patient.stage || '-'}</td>
                        <td>
                          <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td>
                          <span className={`risk-badge risk-${patient.riskGroup.toLowerCase()}`}>
                            {patient.riskGroup}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-action btn-edit" onClick={() => handleEdit(patient)}>
                              ✏️
                            </button>
                            <button className="btn-action btn-delete" onClick={() => handleDelete(patient.id)}>
                              🗑️
                            </button>
                          </div>
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

export default Patients
