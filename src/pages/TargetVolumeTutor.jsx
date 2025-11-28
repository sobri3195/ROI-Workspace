import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './TargetVolumeTutor.css'

function TargetVolumeTutor() {
  const [notes, setNotes] = useState([])
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    const data = getFromStorage(STORAGE_KEYS.TARGET_VOLUME_NOTES) || []
    setNotes(data)
  }

  const quizQuestions = [
    {
      id: 1,
      question: 'What does GTV stand for?',
      options: ['Gross Tumor Volume', 'General Treatment Volume', 'Guided Target Volume'],
      correct: 0,
    },
    {
      id: 2,
      question: 'CTV typically includes:',
      options: ['Only visible tumor', 'GTV + microscopic extension', 'Setup uncertainty margin'],
      correct: 1,
    },
    {
      id: 3,
      question: 'PTV margin accounts for:',
      options: ['Microscopic disease', 'Setup errors and organ motion', 'Tumor recurrence risk'],
      correct: 1,
    },
  ]

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex })
  }

  const checkQuizAnswers = () => {
    let correct = 0
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        correct++
      }
    })
    alert(`You got ${correct} out of ${quizQuestions.length} correct!`)
  }

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      alert('Please enter a note')
      return
    }

    const newNote = {
      id: Date.now(),
      text: noteText,
      date: new Date().toISOString().split('T')[0],
    }

    const updatedNotes = [newNote, ...notes]
    saveToStorage(STORAGE_KEYS.TARGET_VOLUME_NOTES, updatedNotes)
    setNotes(updatedNotes)
    setNoteText('')
  }

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id)
    saveToStorage(STORAGE_KEYS.TARGET_VOLUME_NOTES, updatedNotes)
    setNotes(updatedNotes)
  }

  return (
    <div className="target-volume-tutor-page">
      <div className="tutor-grid">
        <Card title="Target Volume Definitions">
          <div className="definitions">
            <div className="definition-item">
              <h3 className="definition-title gtv-color">GTV - Gross Tumor Volume</h3>
              <p>
                The gross palpable, visible, or clinically demonstrable extent of malignant growth.
                Defined using clinical examination and imaging (CT, MRI, PET).
              </p>
              <div className="definition-example">
                <strong>Example:</strong> Visible tumor mass on CT scan
              </div>
            </div>

            <div className="definition-item">
              <h3 className="definition-title ctv-color">CTV - Clinical Target Volume</h3>
              <p>
                GTV plus a margin for subclinical microscopic malignant disease. Accounts for 
                suspected microscopic tumor extension beyond the visible tumor.
              </p>
              <div className="definition-example">
                <strong>Example:</strong> GTV + 5-10mm margin (organ/disease specific)
              </div>
            </div>

            <div className="definition-item">
              <h3 className="definition-title ptv-color">PTV - Planning Target Volume</h3>
              <p>
                CTV plus a margin to account for geometric uncertainties: patient setup errors, 
                organ motion, beam alignment. Ensures the CTV receives the prescribed dose.
              </p>
              <div className="definition-example">
                <strong>Example:</strong> CTV + 3-5mm margin for setup uncertainty
              </div>
            </div>
          </div>
        </Card>

        <Card title="Interactive Quiz">
          <div className="quiz-container">
            {quizQuestions.map((q) => (
              <div key={q.id} className="quiz-question">
                <h4>{q.question}</h4>
                <div className="quiz-options">
                  {q.options.map((option, index) => (
                    <label key={index} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={quizAnswers[q.id] === index}
                        onChange={() => handleQuizAnswer(q.id, index)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="primary" onClick={checkQuizAnswers}>
              Check Answers
            </Button>
          </div>
        </Card>
      </div>

      <div className="notes-section">
        <Card title="Your Study Notes">
          <div className="notes-input">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your study notes here..."
              rows="4"
            />
            <Button variant="primary" onClick={handleSaveNote}>
              Save Note
            </Button>
          </div>

          {notes.length === 0 ? (
            <p className="no-data">No notes saved yet.</p>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-header">
                    <span className="note-date">{note.date}</span>
                    <button className="btn-delete" onClick={() => handleDeleteNote(note.id)}>
                      🗑️
                    </button>
                  </div>
                  <p className="note-text">{note.text}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Delineation Checklist">
        <div className="checklist">
          <h4>Key Steps for Target Volume Delineation:</h4>
          <ul>
            <li>Review all available imaging (CT, MRI, PET)</li>
            <li>Identify and contour GTV on all relevant slices</li>
            <li>Apply appropriate CTV margin based on tumor type and site</li>
            <li>Edit CTV to respect anatomical boundaries</li>
            <li>Create PTV with institutional setup margin protocol</li>
            <li>Review in all three planes (axial, sagittal, coronal)</li>
            <li>Document contouring decisions and rationale</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default TargetVolumeTutor
