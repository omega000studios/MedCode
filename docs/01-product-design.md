# 01 · Product Design

**Working name:** medcode (placeholder)
**One-liner:** A mobile journey coordinator for cancer patients in India that tells them what to do next, explains why anything is on hold, and puts the responsible staff member on it.

## Positioning (important)
We are NOT "a map + token app". Integrated hospital apps already do that.
We differentiate on: **detecting stalled/blocked next steps, explaining them in the patient's language, and routing them to the owner who can fix them.**
Do not claim "no lag", "first of its kind", or "continuous live tracking" anywhere in the product or pitch.

## Scope (MVP)
- ONE pathway: suspected cancer → treatment start → cycles → follow-up. Default template: **breast cancer** (configurable per cancer type).
- ONE hospital (seeded). Directions are **staff-written text + optional photo per department**. No maps/indoor positioning.
- Two surfaces: **Patient app** (React Native, mobile) and **Staff console** (web).
- Caregivers get a **consented read-only status link** + WhatsApp updates (no separate app).

## Core principles
1. **One screen, one job.** One primary action per card.
2. **Ask once.** Info is collected in onboarding, never re-asked in forms.
3. **Explain every hold:** what, why, who owns it, when last confirmed.
4. **Staff never double-enter.** Templates + one-click edits.
5. **Local language + voice first.** Icons + short text + read-aloud.
6. **Never claim clinical clearance automatically.** Prep readiness is confirmed by staff.
7. **Label what's mocked.**

## Feature set
### P0 (must ship)
| # | Feature | Notes |
|---|---|---|
| 1 | Phone OTP login + onboarding | Replaces the old check-in form |
| 2 | Today screen with swipe card stack | Next step, Get ready, Docs needed, Check-in, Scheme |
| 3 | Next-step engine | Prerequisites, owner, status, "why held", last_confirmed_at |
| 4 | Journey timeline | Done / Now / Next, cycle tiles in treatment |
| 5 | Document vault | Scan, upload, DigiLocker/ABHA fetch, OCR auto-tag, tied to steps |
| 6 | Staff console | Stalled-first worklist, edit steps, resolve holds, audit trail |
| 7 | Realtime sync | Staff change appears on patient phone; reconnect recovery |
| 8 | WhatsApp updates | Patient + consented caregiver |
| 9 | Language + voice | Bhashini translation/TTS |
| 10 | Schemes info card | Static content + mocked eligibility |

### P1 (if time)
- Daily symptom check-in with red-flag escalation to a staff queue (separate from emergencies)
- Visit bundling suggestions (staff-driven)
- Prep cards per ordered test (staff confirm readiness)
- Calendar export
- Caregiver status link with expiry/revocation UI

### P2 (later)
Home-screen widget, QR checkpoint indoor navigation, teleconsult link, wearables, predictive AI, multi-hospital.

## Pathway template (breast, EXAMPLE — validate with an oncology navigator)
| Step | Owner | Expected days (placeholder) |
|---|---|---|
| Referral + first consult | OPD | 0–3 |
| Imaging (mammogram/USG) | Radiology | 2–5 |
| Biopsy | Surgery/Radiology | 2–5 |
| Pathology report | Pathology | 3–7 |
| Staging scans (CT/PET-CT) | Radiology | 3–7 |
| Tumour board | Oncology | 3–7 |
| Treatment plan + consent | Oncologist | 1–3 |
| Treatment cycles | Infusion/RT/Surgery | per protocol |
| Follow-up | OPD | per protocol |

A step is **stalled** when `now > started_at + expected_days`. Staff worklist sorts by days overdue.

## Holds (core concept)
A hold = a blocked step with: `reason`, `owner_role`, `created_by`, `last_confirmed_at`, `expected_resolution`. Patients see it in plain language. Staff resolve in 2 clicks; the next step updates live.

## Success metrics (demo)
- Days from referral to treatment start (simulated before/after)
- Count of stalled patients surfaced vs. resolved
- Time for a staff update to reach the patient device
- Onboarding completion time (target < 2 min)

## Out of scope (do not build)
Maps/indoor positioning, full insurance integrations, real PM-JAY API, wearables, predictive models, multi-hospital, native iOS/Android-specific modules beyond Expo.

## Mocked and labelled in UI/demo
PM-JAY eligibility, hospital queue/token data. Anything mocked shows a subtle "Demo data" tag in staff console and is stated in the pitch.
