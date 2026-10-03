import assert from 'node:assert/strict';
import { mockRepository } from './mockRepository.ts';

const patients = await mockRepository.listPatients();
assert.equal(patients.length, 2);
const sunita = await mockRepository.getPatientJourney('sunita-demo');
assert(sunita);
assert.equal(sunita.patient.name, 'Sunita Deshmukh');
const cycle4 = sunita.step_templates.find(step => step.key === 'treatment_cycle_4');
assert(cycle4);
assert(sunita.journey_steps.some(step => step.step_template_id === cycle4.id && step.status === 'active' && step.scheduled_at === '2026-10-03T04:30:00.000Z'));
const held = await mockRepository.getPatientJourney('held-demo');
assert(held);
assert(held.holds.some(hold => !hold.resolved_at && hold.reason_i18n.en && hold.owner_role && hold.last_confirmed_at && held.journey_steps.some(step => step.id === hold.journey_step_id && step.status === 'held')));
assert(held.document_requests.some(request => request.fulfilled_doc_id === null));
for (const record of [sunita, held]) {
  for (const step of record.journey_steps) {
    assert(record.step_templates.some(template => template.id === step.step_template_id));
    assert(record.staff_users.some(staff => staff.id === step.owner_staff_id));
    assert(step.updated_by && step.updated_at && step.last_confirmed_at);
  }
  assert(record.demo_flags.every(flag => flag.is_mock));
}
sunita.patient.name = 'Changed';
assert.equal((await mockRepository.getPatientJourney('sunita-demo'))?.patient.name, 'Sunita Deshmukh');
assert.equal(await mockRepository.getPatientJourney('unknown'), null);
for (const state of ['visit_day', 'between_visits', 'on_hold', 'all_done'] as const) {
  const today = await mockRepository.getToday(state);
  assert.equal(today.state, state);
  assert(today.cards.length <= 4);
  assert(today.timeline.length > 0);
  assert(today.careTeam.name);
}
assert.equal((await mockRepository.getToday('visit_day')).token?.isMock, true);
assert.equal((await mockRepository.getToday('on_hold')).status.kind, 'held');
await mockRepository.resetOnboarding();
await mockRepository.saveOnboardingDraft({ currentStep: 4, name: 'Demo patient' });
assert.deepEqual((await mockRepository.getOnboardingDraft()).currentStep, 4);
assert.deepEqual((await mockRepository.getOnboardingDraft()).name, 'Demo patient');
console.log('Mock repository checks passed.');
