import React, { useState } from 'react'
import Card from '../components/Card'
import './TreatmentPathways.css'

function TreatmentPathways() {
  const [selectedPathway, setSelectedPathway] = useState(null)

  const pathways = {
    Breast: {
      title: 'Breast Cancer Treatment Pathway',
      steps: [
        { stage: 'Diagnosis', details: 'Mammography, biopsy, pathology review' },
        { stage: 'Staging', details: 'Clinical exam, imaging (ultrasound, MRI, CT)' },
        { stage: 'MDT Discussion', details: 'Surgery, radiation, systemic therapy planning' },
        { stage: 'Treatment', details: 'Surgery → Adjuvant RT (whole breast/partial/nodal) + systemic therapy' },
        { stage: 'Follow-Up', details: 'Clinical exams, annual mammography, survivorship care' },
      ],
      keyPoints: [
        'Whole breast RT: 40-50 Gy / 15-25 fx',
        'Boost to tumor bed: 10-16 Gy',
        'Hypofractionation increasingly standard',
        'Consider nodal RT for node-positive disease',
      ],
    },
    Lung: {
      title: 'Lung Cancer Treatment Pathway',
      steps: [
        { stage: 'Diagnosis', details: 'Imaging, bronchoscopy, biopsy, molecular profiling' },
        { stage: 'Staging', details: 'PET-CT, brain MRI, mediastinal staging' },
        { stage: 'MDT Discussion', details: 'Surgery, chemoRT, immunotherapy options' },
        { stage: 'Treatment', details: 'Stage I-II: Surgery/SBRT | Stage III: Concurrent chemoRT | Stage IV: Systemic therapy' },
        { stage: 'Follow-Up', details: 'CT surveillance, symptom assessment, smoking cessation' },
      ],
      keyPoints: [
        'Early stage (I-II): Surgery or SBRT (48-60 Gy / 3-8 fx)',
        'Locally advanced (III): Concurrent chemoRT 60 Gy / 30 fx',
        'Consolidation immunotherapy for stage III',
        'Brain metastases: SRS or WBRT',
      ],
    },
    'Head & Neck': {
      title: 'Head & Neck Cancer Treatment Pathway',
      steps: [
        { stage: 'Diagnosis', details: 'Clinical exam, endoscopy, biopsy, HPV/p16 testing' },
        { stage: 'Staging', details: 'CT/MRI neck, PET-CT, dental evaluation' },
        { stage: 'MDT Discussion', details: 'Surgery vs. definitive RT, organ preservation' },
        { stage: 'Treatment', details: 'Definitive RT 70 Gy / 35 fx + concurrent cisplatin OR Surgery + adjuvant RT' },
        { stage: 'Follow-Up', details: 'Clinical exams, PET-CT at 3 months, speech/swallow rehab' },
      ],
      keyPoints: [
        'Definitive RT: 70 Gy / 35 fx to primary + involved nodes',
        'Concurrent cisplatin (100 mg/m² q3w or 40 mg/m² weekly)',
        'IMRT/VMAT for parotid sparing',
        'HPV-positive: Better prognosis, potential de-escalation',
      ],
    },
    Prostate: {
      title: 'Prostate Cancer Treatment Pathway',
      steps: [
        { stage: 'Diagnosis', details: 'PSA, digital rectal exam, MRI, biopsy' },
        { stage: 'Staging', details: 'Risk stratification (PSA, Gleason, T stage), bone scan/PET if high risk' },
        { stage: 'MDT Discussion', details: 'Active surveillance, surgery, RT, ADT options' },
        { stage: 'Treatment', details: 'Low risk: AS/Surgery/RT | Intermediate: RT ± short ADT | High: RT + ADT 2-3 years' },
        { stage: 'Follow-Up', details: 'PSA monitoring, toxicity assessment, survivorship' },
      ],
      keyPoints: [
        'Definitive RT: 78-80 Gy / 39-40 fx (or hypofractionated)',
        'Moderate hypofractionation: 60-70 Gy / 20-28 fx',
        'Ultra-hypofractionation: 36.25 Gy / 5 fx',
        'ADT duration based on risk group',
      ],
    },
    Cervix: {
      title: 'Cervical Cancer Treatment Pathway',
      steps: [
        { stage: 'Diagnosis', details: 'Clinical exam, biopsy, colposcopy' },
        { stage: 'Staging', details: 'MRI pelvis, PET-CT for advanced disease' },
        { stage: 'MDT Discussion', details: 'Surgery vs. concurrent chemoRT' },
        { stage: 'Treatment', details: 'Early (IA-IB1): Surgery | Locally advanced (IB2-IVA): Concurrent chemoRT + brachytherapy' },
        { stage: 'Follow-Up', details: 'Clinical exams, imaging, HPV vaccination counseling' },
      ],
      keyPoints: [
        'External beam RT: 45-50 Gy / 25-28 fx to pelvis',
        'Concurrent cisplatin 40 mg/m² weekly',
        'Brachytherapy boost essential (HDR or LDR)',
        'Total EQD2 to point A: 80-90 Gy',
      ],
    },
  }

  return (
    <div className="treatment-pathways-page">
      <Card title="Site-Specific Treatment Pathways">
        <p className="pathways-intro">
          Conceptual treatment workflows for common cancer sites. Click on a site to view the pathway.
        </p>
        <div className="pathways-grid">
          {Object.keys(pathways).map((site) => (
            <button
              key={site}
              className={`pathway-button ${selectedPathway === site ? 'active' : ''}`}
              onClick={() => setSelectedPathway(site)}
            >
              <span className="pathway-icon">🎯</span>
              <span className="pathway-name">{site}</span>
            </button>
          ))}
        </div>
      </Card>

      {selectedPathway && (
        <>
          <Card title={pathways[selectedPathway].title}>
            <div className="pathway-flow">
              {pathways[selectedPathway].steps.map((step, index) => (
                <div key={index} className="flow-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4 className="step-stage">{step.stage}</h4>
                    <p className="step-details">{step.details}</p>
                  </div>
                  {index < pathways[selectedPathway].steps.length - 1 && (
                    <div className="step-arrow">↓</div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Key Treatment Points">
            <ul className="key-points">
              {pathways[selectedPathway].keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </Card>
        </>
      )}

      {!selectedPathway && (
        <Card title="About Treatment Pathways">
          <div className="info-section">
            <p>
              <strong>Treatment pathways</strong> represent the typical journey from diagnosis to 
              treatment and follow-up for cancer patients. These pathways:
            </p>
            <ul>
              <li>Guide multidisciplinary team decisions</li>
              <li>Ensure standardized, evidence-based care</li>
              <li>Help with patient education and expectation setting</li>
              <li>Facilitate care coordination across specialties</li>
            </ul>
            <p className="demo-notice">
              ⚠️ <strong>Conceptual Overview:</strong> These are simplified pathways for educational 
              purposes. Real clinical pathways are more complex and should follow institutional 
              guidelines and current evidence.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default TreatmentPathways
