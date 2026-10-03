# 09 · Overall Plan

**Goal:** a convincing, demoable MVP that proves one thing: *our system finds a stalled/blocked cancer-care step, explains it to the patient, and gets the responsible staff to resolve it — live across devices.*

**Read first:** `01-product-design.md` (scope + positioning). All other docs support it.
**Doc map:** 02 pages · 03 audience · 04 pain points · 05 UI style · 06 backend · 07 flows · 08 stack.

## Timeline (adjust to remaining hackathon time; the original build window was ~5 weeks and the patient web dashboard is already built)

### Phase 0 — Setup (1–2 days)
- Monorepo, Supabase project, schema + RLS, seed data, design tokens, illustration kit started.
- **Submit WhatsApp templates and ABDM/DigiLocker sandbox requests immediately** (long lead).
- Talk to one oncology navigator/nurse; validate pathway steps + expected days.

### Phase 1 — Patient core (week 1)
- OTP login, onboarding (all screens), Today shell with card stack, bottom nav.
- Next-step engine (unit-tested) reading from Supabase.
**Done when:** a new user onboards and sees a correct Next-step card.

### Phase 2 — Staff console + realtime (week 2)
- Console: login, Patients, Stalled, Patient detail, hold create/resolve, directions editor, audit log.
- Realtime to the app; offline banner + reconnect.
**Done when:** a staff edit appears on a separate phone in seconds, and recovers after airplane-mode toggle.

### Phase 3 — Documents (week 3)
- Journey tab, Documents tab, scan/upload, OCR pipeline + staff review queue, DigiLocker/ABHA fetch (sandbox or mock).
**Done when:** photo of a report → auto-tagged → attached to a step → staff verifies.

### Phase 4 — Messaging, language, caregiver (week 4)
- WhatsApp updates (patient + caregiver), caregiver link page, Bhashini translate + TTS, Schemes card, Me tab.
**Done when:** a hold resolved in the console triggers a WhatsApp message and updates the caregiver page.

### Phase 5 — Polish + demo (final stretch)
- P1 items if time: daily check-in + red flags, prep cards, visit bundling.
- Illustrations placed everywhere, motion polish, empty/error states.
- Seeded demo + rehearsed exception flows, pitch deck, metrics slide.

## Demo script (aim ≤ 5 min)
1. Onboard a new patient in < 2 min (voice + local language).
2. Today: swipe through cards for Sunita (visit day).
3. Staff console → Stalled list shows a patient with pathology pending 6 days → open → create hold with reason.
4. Patient phone updates live to amber hold + WhatsApp arrives; caregiver link shows same.
5. Patient scans a report → OCR tags → staff verifies → hold resolves → next step appears.
6. Toggle airplane mode → offline banner → reconnect → state recovers.
7. Show Schemes card + Documents via DigiLocker (sandbox/mock, labelled).

## Evaluation alignment (typical hackathon criteria)
| Criterion | Our answer |
|---|---|
| Innovation | Stalled-step detection + hold explanation + owner routing (not "yet another tracker") |
| Technical feasibility | Real backend, realtime, tested engine, real integrations where possible |
| Business potential | Fewer drop-offs, faster time-to-treatment; deployment story below |
| Scalability | Pathway templates per cancer type/hospital; multi-tenant by `hospital_id` |
| UX | Onboarding, swipe cards, voice, local language, caregiver view |

## Deployment story (one slide)
Who maintains pathway templates/directions: hospital admin/navigator. Who resolves holds: owner role per step. How to avoid duplicate entry: templates + one-click edits + later EHR/HIS integration (future). Data: consent-based, DPDP-aware, audit-logged.

## Evidence to collect (even small)
- 1–2 interviews (navigator/nurse, patient/caregiver) → quotes in the deck.
- Simulated task-time and "hops to find next step" comparison, **labelled as simulated**.
- Screenshots of the stalled list and hold lifecycle.

## Definition of done (MVP)
- [ ] Onboarding < 2 min, resumable
- [ ] Today stack, Journey, Documents, Me all working
- [ ] Staff console: stalled list, hold create/resolve, patient edit, audit trail
- [ ] Staff → patient live sync + reconnect recovery
- [ ] Upload → OCR → verify flow
- [ ] WhatsApp update to patient + caregiver
- [ ] Language switch + read-aloud
- [ ] Schemes card; mocks labelled
- [ ] Seeded demo runs end-to-end without manual fixes

## Instructions for the build agent
1. Read `01` and `09` first, then the doc relevant to the task.
2. Build P0 only until the demo script runs end-to-end.
3. Do not add maps, insurance integrations, or any item listed under "Out of scope".
4. Never invent clinical content: pathway steps/timings are placeholders until validated.
5. Never store Aadhaar/PAN numbers; never put report contents/diagnoses in WhatsApp text.
6. Keep every status traceable: owner, updated_by, last_confirmed_at.
7. Ask before deviating from the tech stack in `08`.
8. Verify third-party API access/terms (Sarvam, Bhashini, ABDM, DigiLocker, WhatsApp) in their current docs before implementing; use labelled mocks if blocked.
