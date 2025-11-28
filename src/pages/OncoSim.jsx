import React, { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import './OncoSim.css'

function OncoSim() {
  const [formData, setFormData] = useState({
    totalDose: '',
    fractions: '',
    alphabeta: '10',
  })

  const [results, setResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const calculateBED = () => {
    const D = parseFloat(formData.totalDose)
    const n = parseFloat(formData.fractions)
    const ab = parseFloat(formData.alphabeta)

    if (!D || !n || !ab || D <= 0 || n <= 0 || ab <= 0) {
      alert('Please enter valid positive numbers for all fields')
      return
    }

    const d = D / n
    const BED = D * (1 + d / ab)
    const EQD2 = BED / (1 + 2 / ab)

    setResults({
      dosePerFraction: d.toFixed(2),
      BED: BED.toFixed(2),
      EQD2: EQD2.toFixed(2),
    })
  }

  const resetCalculator = () => {
    setFormData({
      totalDose: '',
      fractions: '',
      alphabeta: '10',
    })
    setResults(null)
  }

  return (
    <div className="oncosim-page">
      <div className="oncosim-layout">
        <Card title="BED/EQD2 Calculator" className="oncosim-calculator">
          <div className="calculator-form">
            <div className="form-group">
              <label>Total Dose (Gy) *</label>
              <input
                type="number"
                name="totalDose"
                value={formData.totalDose}
                onChange={handleInputChange}
                placeholder="e.g., 70"
                step="0.1"
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
                step="1"
              />
            </div>

            <div className="form-group">
              <label>α/β Ratio (Gy) *</label>
              <input
                type="number"
                name="alphabeta"
                value={formData.alphabeta}
                onChange={handleInputChange}
                placeholder="Default: 10"
                step="0.1"
              />
              <small className="form-hint">
                Common values: 10 (tumors), 3 (late-responding tissues)
              </small>
            </div>

            <div className="form-actions">
              <Button onClick={calculateBED} variant="primary">
                Calculate
              </Button>
              <Button onClick={resetCalculator} variant="secondary">
                Reset
              </Button>
            </div>
          </div>

          {results && (
            <div className="calculation-results">
              <h4>Results</h4>
              <div className="result-item">
                <span className="result-label">Dose per Fraction (d):</span>
                <span className="result-value">{results.dosePerFraction} Gy</span>
              </div>
              <div className="result-item">
                <span className="result-label">BED (Biological Effective Dose):</span>
                <span className="result-value">{results.BED} Gy</span>
              </div>
              <div className="result-item highlight">
                <span className="result-label">EQD2 (2 Gy Equivalent Dose):</span>
                <span className="result-value">{results.EQD2} Gy</span>
              </div>
            </div>
          )}
        </Card>

        <div className="oncosim-info">
          <Card title="Radiobiology Formulas">
            <div className="formula-section">
              <h4>Dose per Fraction</h4>
              <code className="formula">d = D / n</code>
              <p className="formula-desc">
                Where <strong>D</strong> is total dose and <strong>n</strong> is number of fractions.
              </p>
            </div>

            <div className="formula-section">
              <h4>Biological Effective Dose (BED)</h4>
              <code className="formula">BED = D × (1 + d / (α/β))</code>
              <p className="formula-desc">
                The BED represents the biological effect of a given fractionation schedule.
              </p>
            </div>

            <div className="formula-section">
              <h4>Equivalent Dose in 2 Gy Fractions (EQD2)</h4>
              <code className="formula">EQD2 = BED / (1 + 2 / (α/β))</code>
              <p className="formula-desc">
                Converts any fractionation scheme to an equivalent dose delivered in 2 Gy fractions.
              </p>
            </div>
          </Card>

          <Card title="Clinical Reference Values">
            <div className="reference-table">
              <div className="reference-row">
                <strong>α/β Ratio</strong>
                <strong>Tissue Type</strong>
              </div>
              <div className="reference-row">
                <span>~10 Gy</span>
                <span>Early-responding tissues, most tumors</span>
              </div>
              <div className="reference-row">
                <span>~3 Gy</span>
                <span>Late-responding tissues (lung, spinal cord)</span>
              </div>
              <div className="reference-row">
                <span>~1.5 Gy</span>
                <span>Prostate cancer</span>
              </div>
            </div>
          </Card>

          <Card title="About OncoSim">
            <p className="info-text">
              OncoSim provides radiobiological calculations essential for radiation therapy planning.
              The BED and EQD2 formulas help compare different fractionation schemes and optimize
              treatment plans for tumor control while minimizing normal tissue toxicity.
            </p>
            <p className="info-text">
              <strong>Note:</strong> These calculations are for educational and research purposes.
              Clinical decisions should always involve comprehensive treatment planning systems and
              multidisciplinary consultation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OncoSim
