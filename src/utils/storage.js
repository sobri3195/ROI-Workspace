export const STORAGE_KEYS = {
  PATIENTS: 'patients',
  MDT_CASES: 'mdtCases',
  TOXICITY_REPORTS: 'toxicityReports',
  DR_SOBRI_WORKFLOW: 'drSobriWorkflow',
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
}
