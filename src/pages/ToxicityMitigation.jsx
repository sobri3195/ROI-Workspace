import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import './ToxicityMitigation.css'

function ToxicityMitigation() {
  const [userNotes, setUserNotes] = useState([])
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    const data = getFromStorage(STORAGE_KEYS.SUPPORTIVE_CARE_NOTES) || []
    setUserNotes(data)
  }

  const toxicityCards = [
    {
      toxicity: 'Acute Radiation Dermatitis',
      grade: 'Grade 1-2',
      management: [
        'Gentle skin cleansing with mild soap',
        'Moisturize with aqueous cream or aloe vera',
        'Avoid sun exposure and tight clothing',
        'Topical corticosteroids if needed',
      ],
    },
    {
      toxicity: 'Radiation Mucositis',
      grade: 'Grade 2-3',
      management: [
        'Maintain oral hygiene (soft toothbrush, saline rinses)',
        'Magic mouthwash (lidocaine + antacid + antihistamine)',
        'Systemic analgesia (opioids for severe cases)',
        'Consider dose interruption if Grade 3-4',
      ],
    },
    {
      toxicity: 'Radiation Pneumonitis',
      grade: 'Grade 1-2',
      management: [
        'Observe if asymptomatic (Grade 1)',
        'Systemic corticosteroids (prednisone 0.5-1 mg/kg)',
        'Bronchodilators and cough suppressants',
        'Rule out infection before steroid initiation',
      ],
    },
    {
      toxicity: 'Esophagitis',
      grade: 'Grade 2-3',
      management: [
        'PPI or H2 blocker for acid suppression',
        'Topical anesthetics (viscous lidocaine)',
        'Soft diet, avoid irritants',
        'Consider dose modification if Grade 3',
      ],
    },
    {
      toxicity: 'Radiation Proctitis',
      grade: 'Grade 1-2',
      management: [
        'Stool softeners and fiber supplements',
        'Topical corticosteroids or sucralfate',
        'Sitz baths for symptomatic relief',
        'Hyperbaric oxygen for chronic bleeding',
      ],
    },
    {
      toxicity: 'Nausea & Vomiting',
      grade: 'Grade 1-2',
      management: [
        '5-HT3 antagonists (ondansetron, granisetron)',
        'NK1 antagonists (aprepitant) for high emetogenic risk',
        'Dexamethasone as adjunct',
        'Dietary modifications (small, frequent meals)',
      ],
    },
    {
      toxicity: 'Radiation Cystitis',
      grade: 'Grade 1-2',
      management: [
        'Increase fluid intake',
        'Urinary analgesics (phenazopyridine)',
        'Anticholinergics for urgency/frequency',
        'Hyperbaric oxygen for chronic hemorrhagic cystitis',
      ],
    },
    {
      toxicity: 'Fatigue',
      grade: 'Grade 1-2',
      management: [
        'Energy conservation strategies',
        'Encourage light exercise (walking, yoga)',
        'Optimize sleep hygiene',
        'Rule out anemia, hypothyroidism, depression',
      ],
    },
  ]

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

    const updated = [newNote, ...userNotes]
    saveToStorage(STORAGE_KEYS.SUPPORTIVE_CARE_NOTES, updated)
    setUserNotes(updated)
    setNoteText('')
  }

  const handleDeleteNote = (id) => {
    const updated = userNotes.filter((n) => n.id !== id)
    saveToStorage(STORAGE_KEYS.SUPPORTIVE_CARE_NOTES, updated)
    setUserNotes(updated)
  }

  return (
    <div className="toxicity-mitigation-page">
      <Card title="Radiation Toxicity Management Library">
        <p className="library-intro">
          Educational reference for managing common acute radiation toxicities.
        </p>
        <div className="toxicity-cards">
          {toxicityCards.map((card, index) => (
            <div key={index} className="toxicity-card">
              <h3 className="toxicity-title">{card.toxicity}</h3>
              <span className="toxicity-grade">{card.grade}</span>
              <h4 className="management-heading">Management:</h4>
              <ul className="management-list">
                {card.management.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Your Study Notes">
        <div className="notes-section">
          <div className="notes-input">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your study notes about toxicity management..."
              rows="4"
            />
            <Button variant="primary" onClick={handleSaveNote}>
              Save Note
            </Button>
          </div>

          {userNotes.length === 0 ? (
            <p className="no-data">No notes saved yet.</p>
          ) : (
            <div className="notes-list">
              {userNotes.map((note) => (
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
        </div>
      </Card>

      <Card title="Important Note">
        <div className="disclaimer">
          <p>
            ⚠️ <strong>Educational Reference Only:</strong> This library provides general educational 
            information about radiation toxicity management. Actual clinical management should be 
            individualized based on patient factors, institutional protocols, and consultation with 
            appropriate specialists.
          </p>
          <p>
            For severe toxicities (Grade 3-4), consider treatment breaks, dose modifications, and 
            multidisciplinary consultation.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ToxicityMitigation
