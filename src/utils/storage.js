export const STORAGE_KEYS = {
  PATIENTS: 'patients',
  MDT_CASES: 'mdtCases',
  TOXICITY_REPORTS: 'toxicityReports',
  DR_SOBRI_WORKFLOW: 'drSobriWorkflow',
  STAGING_CASES: 'stagingCases',
  IMAGING_LOGS: 'imagingLogs',
  TARGET_VOLUME_NOTES: 'targetVolumeNotes',
  OAR_CONSTRAINTS: 'oarConstraints',
  DOSE_TEMPLATES: 'doseTemplates',
  TECHNIQUE_CHOICES: 'techniqueChoices',
  SETUP_PLANS: 'setupPlans',
  MOTION_STRATEGIES: 'motionStrategies',
  SYSTEMIC_THERAPY: 'systemicTherapy',
  PALLIATIVE_PLANS: 'palliativePlans',
  REIRRADIATION_CASES: 'reirradiationCases',
  TREATMENT_SCHEDULES: 'treatmentSchedules',
  RESPONSE_ASSESSMENTS: 'responseAssessments',
  SUPPORTIVE_CARE_NOTES: 'supportiveCareNotes',
}

export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return null
  }
}

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
    return false
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
    return false
  }
}

export const initializeStorage = () => {
  if (!getFromStorage(STORAGE_KEYS.PATIENTS)) {
    saveToStorage(STORAGE_KEYS.PATIENTS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.MDT_CASES)) {
    saveToStorage(STORAGE_KEYS.MDT_CASES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.TOXICITY_REPORTS)) {
    saveToStorage(STORAGE_KEYS.TOXICITY_REPORTS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.DR_SOBRI_WORKFLOW)) {
    saveToStorage(STORAGE_KEYS.DR_SOBRI_WORKFLOW, {})
  }
  if (!getFromStorage(STORAGE_KEYS.STAGING_CASES)) {
    saveToStorage(STORAGE_KEYS.STAGING_CASES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.IMAGING_LOGS)) {
    saveToStorage(STORAGE_KEYS.IMAGING_LOGS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.TARGET_VOLUME_NOTES)) {
    saveToStorage(STORAGE_KEYS.TARGET_VOLUME_NOTES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.OAR_CONSTRAINTS)) {
    saveToStorage(STORAGE_KEYS.OAR_CONSTRAINTS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.DOSE_TEMPLATES)) {
    saveToStorage(STORAGE_KEYS.DOSE_TEMPLATES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.TECHNIQUE_CHOICES)) {
    saveToStorage(STORAGE_KEYS.TECHNIQUE_CHOICES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.SETUP_PLANS)) {
    saveToStorage(STORAGE_KEYS.SETUP_PLANS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.MOTION_STRATEGIES)) {
    saveToStorage(STORAGE_KEYS.MOTION_STRATEGIES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.SYSTEMIC_THERAPY)) {
    saveToStorage(STORAGE_KEYS.SYSTEMIC_THERAPY, [])
  }
  if (!getFromStorage(STORAGE_KEYS.PALLIATIVE_PLANS)) {
    saveToStorage(STORAGE_KEYS.PALLIATIVE_PLANS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.REIRRADIATION_CASES)) {
    saveToStorage(STORAGE_KEYS.REIRRADIATION_CASES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.TREATMENT_SCHEDULES)) {
    saveToStorage(STORAGE_KEYS.TREATMENT_SCHEDULES, [])
  }
  if (!getFromStorage(STORAGE_KEYS.RESPONSE_ASSESSMENTS)) {
    saveToStorage(STORAGE_KEYS.RESPONSE_ASSESSMENTS, [])
  }
  if (!getFromStorage(STORAGE_KEYS.SUPPORTIVE_CARE_NOTES)) {
    saveToStorage(STORAGE_KEYS.SUPPORTIVE_CARE_NOTES, [])
  }
}
