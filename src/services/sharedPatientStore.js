import { initialPatients } from "../data/sharedPatients";

const STORAGE_KEY = "medcode_shared_patients_v2";
const ACTIVE_PATIENT_KEY = "medcode_shared_active_patient_id";
const LANGUAGE_KEY = "medcode_patient_language";
const CHANNEL_NAME = "medcode_shared_patient_sync";
const subscribers = new Set();
let broadcastChannel = null;

try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
} catch (error) {
  console.warn("BroadcastChannel unavailable", error);
}

const cloneInitialPatients = () => JSON.parse(JSON.stringify(initialPatients));
const formatTime = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const formatDate = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

function notify(action, patients) {
  subscribers.forEach((callback) => callback(action));
  broadcastChannel?.postMessage({ ...action, patients, timestamp: Date.now() });
}

export function loadStoredPatients() {
  if (typeof window === "undefined") return cloneInitialPatients();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    const seeded = cloneInitialPatients();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  } catch (error) {
    console.error("Unable to read patient data", error);
    return cloneInitialPatients();
  }
}

export function saveStoredPatients(patients, action = { type: "PATIENTS_UPDATED" }) {
  if (typeof window === "undefined") return patients;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  notify(action, patients);
  return patients;
}

export function getActivePatientId() {
  if (typeof window === "undefined") return initialPatients[0].patientId;
  return localStorage.getItem(ACTIVE_PATIENT_KEY) || initialPatients[0].patientId;
}

export function setActivePatientId(patientId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_PATIENT_KEY, patientId);
  notify({ type: "ACTIVE_PATIENT_CHANGED", patientId }, loadStoredPatients());
}

export function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem(LANGUAGE_KEY) || "en";
}

export function setStoredLanguage(language) {
  if (typeof window !== "undefined") localStorage.setItem(LANGUAGE_KEY, language);
}

export function subscribeToStore(callback) {
  subscribers.add(callback);
  const onBroadcast = (event) => callback(event.data);
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY || event.key === ACTIVE_PATIENT_KEY) callback({ type: "STORAGE_UPDATED" });
  };
  broadcastChannel?.addEventListener("message", onBroadcast);
  window.addEventListener("storage", onStorage);
  return () => {
    subscribers.delete(callback);
    broadcastChannel?.removeEventListener("message", onBroadcast);
    window.removeEventListener("storage", onStorage);
  };
}

export function updatePatient(patientId, updater, actionType = "PATIENT_UPDATED") {
  const patients = loadStoredPatients();
  const index = patients.findIndex((patient) => patient.patientId === patientId);
  if (index < 0) return null;
  const updated = updater(structuredClone(patients[index]));
  patients[index] = updated;
  saveStoredPatients(patients, { type: actionType, patientId });
  return updated;
}

export function setFastingAnswer(patientId, answer) {
  return updatePatient(patientId, (patient) => ({
    ...patient,
    fastingQuestion: { ...patient.fastingQuestion, answer }
  }), "FASTING_ANSWER_UPDATED");
}

export function submitConsult(patientId, consult) {
  return updatePatient(patientId, (patient) => {
    const now = formatTime();
    const currentIndex = Math.min(patient.currentStageIndex, patient.stages.length - 1);
    const nextIndex = Math.min(currentIndex + 1, patient.stages.length - 1);
    patient.stages = patient.stages.map((stage, index) => ({
      ...stage,
      status: index < nextIndex ? "done" : index === nextIndex ? "current" : "upcoming",
      time: index === currentIndex ? now : stage.time
    }));
    patient.currentStageIndex = nextIndex;
    patient.careType = consult.careType;
    patient.nextStep = { ...consult.nextStep, actions: ["How to get there", "Listen", "I've arrived"] };
    patient.estimatedWait = Number(consult.estimatedWait) || 0;
    patient.fastingQuestion = { asked: consult.fastingRequired, answer: null };
    patient.prepChecklist = [
      { label: `Digital token ${patient.token} is ready on this screen`, done: true },
      { label: "Doctor's requisition was sent electronically", done: true }
    ];
    patient.orders = [
      ...patient.orders,
      ...consult.orders.map((order, index) => ({
        ...order,
        ref: `ORD-${patient.token.replace(/\W/g, "")}-${String(Date.now() + index).slice(-6)}`,
        status: "Ordered"
      }))
    ];
    const today = formatDate();
    patient.documents = [
      ...patient.documents,
      { name: "Doctor Consultation Summary & Rx", meta: `${today} · 1.4 MB` },
      { name: "Lab Requisition & Test Order Sheet", meta: `${today} · 820 KB` }
    ];
    return patient;
  }, "CONSULT_SUBMITTED");
}

export function advanceOrderStatus(patientId, orderRef) {
  const sequence = ["Ordered", "In progress", "Result ready"];
  return updatePatient(patientId, (patient) => {
    patient.orders = patient.orders.map((order) => {
      if (order.ref !== orderRef) return order;
      const nextIndex = Math.min(sequence.indexOf(order.status) + 1, sequence.length - 1);
      return { ...order, status: sequence[nextIndex] };
    });
    return patient;
  }, "ORDER_STATUS_ADVANCED");
}

export function completeInsuranceMilestone(patientId, milestoneIndex) {
  return updatePatient(patientId, (patient) => {
    const firstIncomplete = patient.milestones.findIndex((milestone) => !milestone.done);
    if (milestoneIndex !== firstIncomplete) return patient;
    patient.milestones = patient.milestones.map((milestone, index) => index === milestoneIndex ? { ...milestone, done: true, time: formatTime() } : milestone);
    if (milestoneIndex >= 2) {
      patient.insurance.preAuthApproved = true;
      patient.insurance.status = milestoneIndex === 3 ? "Final settlement complete" : "Pre-authorization approved";
    }
    return patient;
  }, "INSURANCE_MILESTONE_COMPLETED");
}
