// Relevant rows from docs/06-backend.md; no credentials or raw identity numbers.
export type I18nText = Record<string, string>;
export type StaffRole = 'navigator' | 'reception' | 'clinician' | 'admin';
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export interface StatusMetadata { updated_by: string; updated_at: string; last_confirmed_at: string }
export interface Patient {
  id: string; hospital_id: string; auth_uid: string | null; name: string; age: number;
  sex: string; cancer_type: string; language: string; phone: string | null;
  abha_id_ref: string | null; scheme_pref: string; medical_history: Json;
  onboarding_done: boolean; created_at: string;
}
export interface Hospital { id: string; name: string; helpline: string; emergency_number: string }
export interface StaffUser { id: string; hospital_id: string; name: string; role: StaffRole; auth_uid: string | null }
export interface PathwayTemplate { id: string; hospital_id: string; cancer_type: string; name: string }
export interface StepTemplate {
  id: string; template_id: string; order: number; key: string; title_i18n: I18nText;
  explain_i18n: I18nText; owner_role: StaffRole; expected_days: number;
  requires: { step_keys: string[]; doc_types: string[] };
}
export interface Journey extends StatusMetadata {
  id: string; patient_id: string; template_id: string; started_at: string;
  status: 'active' | 'held' | 'done';
}
export interface JourneyStep extends StatusMetadata {
  id: string; journey_id: string; step_template_id: string;
  status: 'pending' | 'active' | 'done' | 'held' | 'skipped';
  started_at: string | null; completed_at: string | null; owner_role: StaffRole;
  owner_staff_id: string | null; destination: string; directions_id: string | null;
  scheduled_at: string | null;
}
export interface Hold extends StatusMetadata {
  id: string; journey_step_id: string; reason_code: string; reason_i18n: I18nText;
  owner_role: StaffRole; created_by: string; created_at: string;
  expected_resolution: string | null; resolved_at: string | null; resolved_by: string | null;
}
export interface PatientDocument extends StatusMetadata {
  id: string; patient_id: string; journey_step_id: string | null;
  source: 'upload' | 'abha' | 'digilocker' | 'hospital'; storage_path: string;
  doc_type: string; title: string; doc_date: string; status: 'processing' | 'needs_review' | 'verified';
  ocr_confidence: number | null; extracted: Json; created_at: string;
}
export interface DocumentRequest {
  id: string; journey_step_id: string; doc_type: string; requested_by: string; fulfilled_doc_id: string | null;
}
export interface Directions {
  id: string; hospital_id: string; department: string; steps_text_i18n: I18nText; photo_path: string | null;
}
export interface PatientJourney {
  patient: Patient; hospital: Hospital; staff_users: StaffUser[]; template: PathwayTemplate;
  step_templates: StepTemplate[]; journey: Journey; journey_steps: JourneyStep[];
  holds: Hold[]; documents: PatientDocument[]; document_requests: DocumentRequest[];
  directions: Directions[]; demo_flags: { entity: string; entity_id: string; is_mock: boolean }[];
}
export type TodayStateKind = 'visit_day' | 'between_visits' | 'on_hold' | 'all_done';
export interface TodayCard {
  id: string; eyebrow: string; title: string; body: string; action: string;
  detail: string; destination?: string; directions?: string;
}
export interface TodayView {
  state: TodayStateKind; greeting: string; updatedLabel: string;
  status: { kind: 'on_track' | 'held' | 'complete'; reason?: string; owner?: string; lastConfirmedAt?: string };
  cards: TodayCard[];
  token: { number: string; wait: string; destination: string; isMock: true } | null;
  timeline: { time: string; title: string; detail: string; status: 'done' | 'now' | 'next' }[];
  careTeam: { name: string; role: string; availability: string };
  info: { label: string; title: string }[];
  nextUpcoming: string;
}
export interface OnboardingDraft {
  currentStep: number; completed: boolean; language: string; phone: string; phoneVerified: boolean;
  name: string; age: string; sex: string; cancerType: string;
  conditions: string[]; allergies: string[]; medicines: string[]; procedures: string[];
  scheme: string; caregiverName: string; caregiverWhatsApp: string; caregiverConsent: boolean;
  whatsappReminders: boolean; quietHours: string; linkAbha: boolean; linkDigiLocker: boolean;
}
export interface PatientRepository {
  listPatients(): Promise<Patient[]>;
  getPatientJourney(patientId: string): Promise<PatientJourney | null>;
  getToday(state: TodayStateKind): Promise<TodayView>;
  getOnboardingDraft(): Promise<OnboardingDraft>;
  saveOnboardingDraft(patch: Partial<OnboardingDraft>): Promise<OnboardingDraft>;
  resetOnboarding(): Promise<OnboardingDraft>;
}
