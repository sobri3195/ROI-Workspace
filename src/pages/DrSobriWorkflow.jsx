import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './DrSobriWorkflow.css'

function DrSobriWorkflow() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientDetails: '',
    segmentationInstructions: '',
  })

  const [workflowState, setWorkflowState] = useState({
    status: 'idle',
    result: null,
  })

  useEffect(() => {
    loadWorkflow()
  }, [])

  const loadWorkflow = () => {
    const data = getFromStorage(STORAGE_KEYS.DR_SOBRI_WORKFLOW) || {}
    if (data.formData) {
      setFormData(data.formData)
    }
    if (data.workflowState) {
      setWorkflowState(data.workflowState)
    }
  }

  const saveWorkflow = (newFormData, newWorkflowState) => {
    const workflowData = {
      formData: newFormData,
      workflowState: newWorkflowState,
    }
    saveToStorage(STORAGE_KEYS.DR_SOBRI_WORKFLOW, workflowData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    saveWorkflow(newFormData, workflowState)
  }

  const handleStartAnalysis = () => {
    if (!formData.patientName || !formData.segmentationInstructions) {
      alert('Please fill in patient name and segmentation instructions')
      return
    }

    setWorkflowState({ status: 'processing', result: null })

    setTimeout(() => {
      const mockResult = {
        timestamp: new Date().toISOString(),
        analysis: `AI analysis complete for ${formData.patientName}.`,
        suggestion: `Suggested IMRT plan: 70 Gy in 35 fractions (2 Gy/fx).`,
        oars: `Prioritize OARs as per instructions: ${formData.segmentationInstructions}`,
        note: 'Demo simulation only - not real AI output.',
      }

      const newWorkflowState = {
        status: 'completed',
        result: mockResult,
      }

      setWorkflowState(newWorkflowState)
      saveWorkflow(formData, newWorkflowState)
    }, 2000)
  }

  const handleResetWorkflow = () => {
    if (window.confirm('Are you sure you want to reset the entire workflow?')) {
      const resetFormData = {
        patientName: '',
        patientDetails: '',
        segmentationInstructions: '',
      }
      const resetWorkflowState = {
        status: 'idle',
        result: null,
      }

      setFormData(resetFormData)
      setWorkflowState(resetWorkflowState)
      saveWorkflow(resetFormData, resetWorkflowState)
    }
  }

  const workflowSteps = [
    { step: 1, title: 'Open case in ROI-Workspace', icon: '📂' },
    { step: 2, title: 'Upload CT/MRI (simulated)', icon: '🖼️' },
    { step: 3, title: 'Enter clinical details', icon: '📝' },
    { step: 4, title: 'Provide segmentation instructions', icon: '✏️' },
    { step: 5, title: 'Run AI-powered analysis', icon: '🤖' },
    { step: 6, title: 'Review + finalize treatment plan', icon: '✅' },
  ]

  return (
    <div className="workflow-page">
      <div className="workflow-layout">
        <div className="workflow-main">
          <Card title="AI-Assisted Treatment Planning">
            <form className="workflow-form">
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="form-group">
                <label>Patient Details</label>
                <textarea
                  name="patientDetails"
                  value={formData.patientDetails}
                  onChange={handleInputChange}
                  placeholder="Age, comorbidities, medical history..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Segmentation Instructions *</label>
                <textarea
                  name="segmentationInstructions"
                  value={formData.segmentationInstructions}
                  onChange={handleInputChange}
                  placeholder="E.g., Contour GTV/CTV/PTV; spare brainstem, optic nerves, spinal cord..."
                  rows="4"
                />
              </div>

              <div className="workflow-actions">
                <Button
                  onClick={handleStartAnalysis}
                  variant="primary"
                  disabled={workflowState.status === 'processing'}
                >
                  {workflowState.status === 'processing'
                    ? '⏳ Processing...'
                    : '▶️ Start Analysis (Demo)'}
                </Button>
                <Button onClick={handleResetWorkflow} variant="secondary">
                  🔄 Reset Workflow
                </Button>
              </div>
            </form>

            {workflowState.status === 'processing' && (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <p>Running AI-powered analysis...</p>
              </div>
            )}

            {workflowState.status === 'completed' && workflowState.result && (
              <div className="workflow-results">
                <h4>Analysis Results</h4>
                <div className="result-section">
                  <strong>Analysis:</strong>
                  <p>{workflowState.result.analysis}</p>
                </div>
                <div className="result-section">
                  <strong>Treatment Suggestion:</strong>
                  <p>{workflowState.result.suggestion}</p>
                </div>
                <div className="result-section">
                  <strong>OAR Considerations:</strong>
                  <p>{workflowState.result.oars}</p>
                </div>
                <div className="result-section demo-note">
                  <strong>⚠️ Note:</strong>
                  <p>{workflowState.result.note}</p>
                </div>
                <p className="result-timestamp">
                  Generated: {new Date(workflowState.result.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="workflow-sidebar">
          <Card title="Dr. Sobri's Workflow">
            <div className="workflow-steps">
              {workflowSteps.map((item) => (
                <div key={item.step} className="workflow-step">
                  <div className="step-icon">{item.icon}</div>
                  <div className="step-content">
                    <span className="step-number">Step {item.step}</span>
                    <span className="step-title">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="About This Workflow">
            <p className="workflow-info">
              This page demonstrates how <strong>Dr. Sobri</strong>, a radiation oncology
              specialist, interacts with an AI-assisted radiotherapy planning system.
            </p>
            <p className="workflow-info">
              The system simulates AI-powered contouring, treatment planning optimization, and
              organ-at-risk (OAR) analysis to assist in clinical decision-making.
            </p>
            <p className="workflow-info demo-notice">
              ⚠️ This is a portfolio demonstration. All results are simulated and not based on
              real AI algorithms or clinical data.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DrSobriWorkflow
