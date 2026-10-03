import type {
  JourneyStep, OnboardingDraft, Patient, PatientJourney, PatientRepository,
  StepTemplate, TodayStateKind, TodayView,
} from './repository';

const confirmed = '2026-10-03T03:30:00.000Z';
const metadata = { updated_by: 'staff-navigator', updated_at: confirmed, last_confirmed_at: confirmed };
const hospital = { id: 'hospital-demo', name: 'Demo Cancer Care Hospital', helpline: 'DEMO', emergency_number: 'DEMO' };
const staff_users: PatientJourney['staff_users'] = [
  { id: 'staff-navigator', hospital_id: hospital.id, name: 'Anjali Patil', role: 'navigator', auth_uid: null },
  { id: 'staff-clinician', hospital_id: hospital.id, name: 'Dr. Meera Joshi', role: 'clinician', auth_uid: null },
];
const template = { id: 'breast-demo', hospital_id: hospital.id, cancer_type: 'breast', name: 'Breast pathway · Demo' };
const stages = [
  ['consult', 'First consultation'], ['imaging', 'Breast imaging'], ['biopsy', 'Biopsy'],
  ['pathology', 'Pathology report'], ['staging', 'Staging scans'], ['tumour_board', 'Team review'],
  ['treatment_plan', 'Treatment plan and consent'],
  ...Array.from({ length: 6 }, (_, i) => [`treatment_cycle_${i + 1}`, `Treatment cycle ${i + 1}`]),
  ['follow_up', 'Follow-up'],
];
const step_templates: StepTemplate[] = stages.map(([key, title], index) => ({
  id: `template-${key}`, template_id: template.id, order: index + 1, key,
  title_i18n: { en: title }, explain_i18n: { en: `Your care team will explain ${title.toLowerCase()}.` },
  owner_role: key === 'treatment_plan' || key.startsWith('treatment_cycle') ? 'clinician' : 'navigator',
  expected_days: key.startsWith('treatment_cycle') ? 21 : 3,
  requires: { step_keys: index ? [stages[index - 1][0]] : [], doc_types: key === 'treatment_plan' ? ['consent_form'] : [] },
}));
const directions = [{ id: 'directions-infusion', hospital_id: hospital.id, department: 'Infusion Suite',
  steps_text_i18n: { en: 'Ask reception for the Infusion Suite on floor one.' }, photo_path: null }];

function seed(id: string, name: string, held: boolean): PatientJourney {
  const currentKey = held ? 'treatment_plan' : 'treatment_cycle_4';
  const currentIndex = step_templates.findIndex(step => step.key === currentKey);
  const journeyId = `journey-${id}`;
  const patient: Patient = { id, hospital_id: hospital.id, auth_uid: null, name, age: held ? 46 : 52,
    sex: 'female', cancer_type: 'breast', language: 'en', phone: null, abha_id_ref: null,
    scheme_pref: 'not_sure', medical_history: { conditions: [], allergies: [], medicines: [], procedures: [] },
    onboarding_done: true, created_at: '2026-06-01T03:30:00.000Z' };
  const journey_steps: JourneyStep[] = step_templates.map((step, index) => ({
    ...metadata, id: `${id}-${step.key}`, journey_id: journeyId, step_template_id: step.id,
    status: index < currentIndex ? 'done' : index === currentIndex ? held ? 'held' : 'active' : 'pending',
    started_at: index === currentIndex ? confirmed : index < currentIndex ? '2026-06-01T03:30:00.000Z' : null,
    completed_at: index < currentIndex ? '2026-10-02T03:30:00.000Z' : null,
    owner_role: step.owner_role, owner_staff_id: step.owner_role === 'clinician' ? 'staff-clinician' : 'staff-navigator',
    destination: step.key.startsWith('treatment_cycle') ? 'Infusion Suite' : 'Oncology OPD',
    directions_id: step.key.startsWith('treatment_cycle') ? directions[0].id : null,
    scheduled_at: index === currentIndex && !held ? '2026-10-03T04:30:00.000Z' : null,
  }));
  const planId = `${id}-treatment_plan`;
  return { patient, hospital, staff_users, template, step_templates, directions,
    journey: { ...metadata, id: journeyId, patient_id: id, template_id: template.id,
      started_at: patient.created_at, status: held ? 'held' : 'active' }, journey_steps,
    holds: held ? [{ ...metadata, id: 'hold-missing-consent', journey_step_id: planId,
      reason_code: 'document_missing', reason_i18n: { en: 'Your signed consent form is missing. Ask Anjali for help.' },
      owner_role: 'navigator', created_by: 'staff-navigator', created_at: confirmed,
      expected_resolution: '2026-10-03T08:30:00.000Z', resolved_at: null, resolved_by: null }] : [],
    documents: held ? [] : [{ ...metadata, id: `${id}-consent`, patient_id: id, journey_step_id: planId,
      source: 'hospital', storage_path: 'demo/consent-placeholder.png', doc_type: 'consent_form',
      title: 'Treatment consent · Demo', doc_date: '2026-06-01', status: 'verified', ocr_confidence: null,
      extracted: {}, created_at: patient.created_at }],
    document_requests: [{ id: `${id}-consent-request`, journey_step_id: planId,
      doc_type: 'consent_form', requested_by: 'staff-clinician', fulfilled_doc_id: held ? null : `${id}-consent` }],
    demo_flags: [{ entity: 'patients', entity_id: id, is_mock: true }],
  };
}
const patients = [seed('sunita-demo', 'Sunita Deshmukh', false), seed('held-demo', 'Kavita Patil', true)];
export const initialOnboardingDraft: OnboardingDraft = {
  currentStep: 0, completed: false, language: 'English', phone: '', phoneVerified: false,
  name: '', age: '', sex: '', cancerType: 'Breast cancer', conditions: [], allergies: [],
  medicines: [], procedures: [], scheme: 'Not sure', caregiverName: '', caregiverWhatsApp: '',
  caregiverConsent: false, whatsappReminders: true, quietHours: '9:00 pm – 7:00 am',
  linkAbha: false, linkDigiLocker: false,
};

const baseCards = {
  next: { id: 'next', eyebrow: 'NEXT STEP', title: 'Go to the Infusion Suite',
    body: 'Cycle 4 starts at 10:00 am.', action: 'I understand',
    detail: 'Check in at reception, then go to the Infusion Suite on floor one.',
    destination: 'Infusion Suite · Floor 1', directions: 'Ask reception for the Infusion Suite on floor one.' },
  ready: { id: 'ready', eyebrow: 'GET READY', title: 'Eat a light breakfast',
    body: 'Bring water and your medicines list.', action: 'Got it',
    detail: 'Follow the preparation advice already confirmed by your care team.' },
  checkin: { id: 'checkin', eyebrow: 'DAILY CHECK-IN', title: 'How are you feeling?',
    body: 'Answer four short questions.', action: 'Start check-in',
    detail: 'This demo check-in helps your care team spot when you need a call.' },
  scheme: { id: 'scheme', eyebrow: 'SCHEME · DEMO', title: 'Review support schemes',
    body: 'See possible help with treatment costs.', action: 'View schemes',
    detail: 'Eligibility is mocked for this demo. Staff can help you apply.' },
};

const todayViews: Record<TodayStateKind, TodayView> = {
  visit_day: {
    state: 'visit_day', greeting: 'Good morning, Sunita', updatedLabel: 'Updated 2 min ago',
    status: { kind: 'on_track', reason: 'Cycle 4 is ready for today.' },
    cards: [baseCards.next, baseCards.ready, baseCards.checkin, baseCards.scheme],
    token: { number: 'A-14', wait: 'About 18 min', destination: 'Infusion Suite', isMock: true },
    timeline: [
      { time: '9:30 am', title: 'Check in', detail: 'Main reception', status: 'done' },
      { time: '10:00 am', title: 'Cycle 4 infusion', detail: 'Infusion Suite', status: 'now' },
      { time: '1:00 pm', title: 'Review before leaving', detail: 'Dr. Meera', status: 'next' },
    ],
    careTeam: { name: 'Anjali Patil', role: 'Patient navigator', availability: 'Available until 5:00 pm' },
    info: [{ label: 'SCHEMES · DEMO', title: 'Support with travel costs' },
      { label: 'DAILY TIP', title: 'Keep water close today' }, { label: 'HOSPITAL', title: 'Pharmacy closes at 7 pm' }],
    nextUpcoming: 'Review before leaving at 1:00 pm',
  },
  between_visits: {
    state: 'between_visits', greeting: 'Good afternoon, Sunita', updatedLabel: 'Updated today at 10:42',
    status: { kind: 'on_track', reason: 'Your next visit is in 18 days.' },
    cards: [
      { ...baseCards.next, id: 'next-visit', title: 'Next visit: Cycle 5', body: 'Tuesday, 21 October at 10:00 am.',
        detail: 'Your care team will confirm this appointment before the visit.' },
      baseCards.checkin, baseCards.scheme,
    ], token: null,
    timeline: [{ time: 'Today', title: 'Rest and recover', detail: 'Follow your care team’s advice', status: 'now' },
      { time: '21 Oct', title: 'Cycle 5 visit', detail: 'Infusion Suite', status: 'next' }],
    careTeam: { name: 'Anjali Patil', role: 'Patient navigator', availability: 'Replies within one working day' },
    info: [{ label: 'DAILY TIP', title: 'Note questions for your next visit' },
      { label: 'SCHEMES · DEMO', title: 'Travel support may be available' }],
    nextUpcoming: 'Cycle 5 on 21 October at 10:00 am',
  },
  on_hold: {
    state: 'on_hold', greeting: 'Hello, Kavita', updatedLabel: 'Confirmed today at 9:00 am',
    status: { kind: 'held', reason: 'Your signed consent form is missing.', owner: 'Anjali Patil · Patient navigator',
      lastConfirmedAt: confirmed },
    cards: [{ id: 'held-consent', eyebrow: 'ON HOLD', title: 'Consent form needed',
      body: 'Anjali is helping resolve this.', action: 'Contact Anjali',
      detail: 'Your treatment plan can continue after staff confirm the signed consent form.' }],
    token: null,
    timeline: [{ time: 'Now', title: 'Treatment plan on hold', detail: 'Waiting for signed consent', status: 'now' },
      { time: 'Next', title: 'Staff confirms the form', detail: 'Anjali owns this step', status: 'next' }],
    careTeam: { name: 'Anjali Patil', role: 'Owner of this hold', availability: 'Expected update by 2:00 pm' },
    info: [{ label: 'WHAT HAPPENS NEXT', title: 'Staff confirms the form, then care continues' }],
    nextUpcoming: 'Anjali will confirm the next step',
  },
  all_done: {
    state: 'all_done', greeting: 'You’re all set, Sunita', updatedLabel: 'Updated just now',
    status: { kind: 'complete', reason: 'Nothing else is needed today.' }, cards: [], token: null,
    timeline: [{ time: 'Done', title: 'Today’s visit completed', detail: 'Cycle 4', status: 'done' },
      { time: '21 Oct', title: 'Cycle 5 visit', detail: 'Infusion Suite', status: 'next' }],
    careTeam: { name: 'Anjali Patil', role: 'Patient navigator', availability: 'Available until 5:00 pm' },
    info: [{ label: 'DAILY TIP', title: 'Rest and follow your care team’s advice' }],
    nextUpcoming: 'Cycle 5 on 21 October at 10:00 am',
  },
};

let onboardingDraft = { ...initialOnboardingDraft };
// Detached JSON snapshots keep the read-only demo seed safe in both Hermes and Node.
const snapshot = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
export const mockRepository: PatientRepository = {
  async listPatients() { return snapshot(patients.map(record => record.patient)); },
  async getPatientJourney(patientId) { return snapshot(patients.find(record => record.patient.id === patientId) ?? null); },
  async getToday(state) { return snapshot(todayViews[state]); },
  async getOnboardingDraft() { return snapshot(onboardingDraft); },
  async saveOnboardingDraft(patch) { onboardingDraft = { ...onboardingDraft, ...patch }; return snapshot(onboardingDraft); },
  async resetOnboarding() { onboardingDraft = { ...initialOnboardingDraft }; return snapshot(onboardingDraft); },
};

