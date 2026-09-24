import { initialPatients } from "../data/mockPatients";

const STORAGE_KEY = "medcode_patients_data";
const ACTIVE_PATIENT_KEY = "medcode_active_patient_id";
const LANGUAGE_KEY = "medcode_patient_language";
const CHANNEL_NAME = "medcode_sync_channel";

let broadcastChannel = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  console.warn("BroadcastChannel not supported, falling back to storage events", e);
}

// Helpers
export function loadStoredPatients() {
  if (typeof window === "undefined") return initialPatients;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPatients));
      return initialPatients;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading localStorage", e);
    return initialPatients;
  }
}

export function saveStoredPatients(patients) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: "SYNC_PATIENTS", payload: patients, timestamp: Date.now() });
    }
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

export function getActivePatientId() {
  if (typeof window === "undefined") return initialPatients[0].patientId;
  return localStorage.getItem(ACTIVE_PATIENT_KEY) || initialPatients[0].patientId;
}

export function setActivePatientId(patientId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: "CHANGE_ACTIVE_PATIENT", patientId, timestamp: Date.now() });
  }
}

export function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem(LANGUAGE_KEY) || "en";
}

export function setStoredLanguage(lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANGUAGE_KEY, lang);
}

// Live subscription manager
const subscribers = new Set();

export function subscribeToStore(callback) {
  subscribers.add(callback);

  // Listen to broadcast channel messages
  const handleBroadcast = (event) => {
    callback(event.data);
  };

  if (broadcastChannel) {
    broadcastChannel.addEventListener("message", handleBroadcast);
  }

  // Listen to cross-tab storage changes
  const handleStorage = (e) => {
    if (e.key === STORAGE_KEY || e.key === ACTIVE_PATIENT_KEY) {
      callback({ type: "STORAGE_UPDATE", key: e.key });
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    subscribers.delete(callback);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener("message", handleBroadcast);
    }
    window.removeEventListener("storage", handleStorage);
  };
}

function notifyLocalSubscribers(action) {
  subscribers.forEach((cb) => cb(action));
}

// Store actions
export function advancePatientStage(patientId) {
  const patients = loadStoredPatients();
  const patientIndex = patients.findIndex((p) => p.patientId === patientId);
  if (patientIndex === -1) return null;

  const patient = { ...patients[patientIndex] };
  const currentIdx = patient.stages.findIndex((s) => s.id === patient.currentStageId);

  if (currentIdx !== -1 && currentIdx < patient.stages.length - 1) {
    const updatedStages = patient.stages.map((stage, idx) => {
      if (idx === currentIdx) {
        return { ...stage, status: "completed" };
      }
      if (idx === currentIdx + 1) {
        return { ...stage, status: "in-progress" };
      }
      return stage;
    });

    patient.stages = updatedStages;
    patient.currentStageId = patient.stages[currentIdx + 1].id;

    // Adapt next step card to match new stage
    const nextStage = patient.stages[currentIdx + 1];
    patient.nextStepCard = {
      ...patient.nextStepCard,
      headline: `Step in Progress: ${nextStage.name}`,
      headlineHi: `प्रगतिशील चरण: ${nextStage.name}`,
      headlineMr: `सुरू असलेला टप्पा: ${nextStage.name}`,
      department: nextStage.department,
      location: nextStage.room,
      summary: `You have successfully arrived at ${nextStage.department}. ${nextStage.notes}`,
      estWait: "Under 5 mins",
      audioNarration: `You are now at ${nextStage.name}. Location: ${nextStage.room}.`
    };

    patients[patientIndex] = patient;
    saveStoredPatients(patients);
    notifyLocalSubscribers({ type: "STAGE_ADVANCED", patientId });
    return patient;
  }
  return patient;
}

export function updatePatientConsult(patientId, consultData) {
  const patients = loadStoredPatients();
  const patientIndex = patients.findIndex((p) => p.patientId === patientId);
  if (patientIndex === -1) return null;

  const patient = { ...patients[patientIndex] };
  patient.nextStepCard = {
    ...patient.nextStepCard,
    ...consultData
  };

  patients[patientIndex] = patient;
  saveStoredPatients(patients);
  notifyLocalSubscribers({ type: "CONSULT_UPDATED", patientId, consultData });
  return patient;
}

export function updateOrderStatus(patientId, orderId, newStatus) {
  const patients = loadStoredPatients();
  const patientIndex = patients.findIndex((p) => p.patientId === patientId);
  if (patientIndex === -1) return null;

  const patient = { ...patients[patientIndex] };
  patient.ordersPending = patient.ordersPending.map((ord) => {
    if (ord.id === orderId) {
      return { ...ord, status: newStatus };
    }
    return ord;
  });

  patients[patientIndex] = patient;
  saveStoredPatients(patients);
  notifyLocalSubscribers({ type: "ORDER_UPDATED", patientId, orderId, newStatus });
  return patient;
}

export function approveInsuranceClaim(patientId, approvedAmount = "₹24,500") {
  const patients = loadStoredPatients();
  const patientIndex = patients.findIndex((p) => p.patientId === patientId);
  if (patientIndex === -1) return null;

  const patient = { ...patients[patientIndex] };
  patient.insurance = {
    ...patient.insurance,
    status: "100% Pre-Authorized & Cashless Approved",
    preAuthApproved: approvedAmount,
    stage: 4,
    timeline: patient.insurance.timeline.map((t, idx) => ({
      ...t,
      done: true
    }))
  };

  patients[patientIndex] = patient;
  saveStoredPatients(patients);
  notifyLocalSubscribers({ type: "INSURANCE_APPROVED", patientId });
  return patient;
}

export function resetAllPatientData() {
  saveStoredPatients(initialPatients);
  notifyLocalSubscribers({ type: "RESET_ALL" });
  return initialPatients;
}
