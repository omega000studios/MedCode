# 04 · Pain Points → Features

> These are working hypotheses. Confirm with a navigator/patient and cite their words in the pitch.

| # | Pain point | Who | How we address it | Feature (priority) |
|---|---|---|---|---|
| 1 | Doesn't know what's next after a consult | Patient | Plain-language next-step card in local language + voice | Next-step engine, Today stack (P0) |
| 2 | Steps stall silently (e.g. pathology pending for days) | Patient, staff | Stalled worklist sorted by days overdue; hold reasons visible to patient | Stalled list, Holds (P0) |
| 3 | Lost / scattered reports, repeated tests | Patient, caregiver | Vault + DigiLocker/ABHA fetch + OCR auto-tagging tied to steps | Documents (P0) |
| 4 | Doesn't know why they're waiting | Patient | Every hold shows reason, owner, last confirmed | Journey hold state (P0) |
| 5 | Missed follow-ups / drop-off | Patient | WhatsApp nudges; staff "nudge" button on stalled patients | WhatsApp updates (P0) |
| 6 | Repeated trips for out-of-town patients | Patient | Staff-suggested visit bundling on one day | Visit bundling (P1) |
| 7 | Test prep confusion (fasting, creatinine, etc.) | Patient | Prep card only when a test is ordered; staff confirm readiness (no auto-clearance) | Prep cards (P1) |
| 8 | Cost anxiety / scheme confusion | Patient, caregiver | Schemes info card; mocked PM-JAY eligibility | Schemes card (P0) |
| 9 | Caregiver burden, caregiver not present | Caregiver | Consented WhatsApp status + read-only link | Caregiver view (P0/P1) |
| 10 | Side effects / adherence between cycles | Patient | Daily check-in; red flags go to a staff queue | Check-in (P1) |
| 11 | Language/literacy barriers | Patient | Bhashini translation + read-aloud, icon-led cards | Language & voice (P0) |
| 12 | Long forms at check-in | Patient, staff | Onboarding replaces the form; DigiLocker replaces Aadhaar/PAN entry | Onboarding (P0) |
| 13 | Finding the department inside the hospital | Patient | Staff-written step-by-step directions + photo (no maps) | Directions sheet (P0) |
| 14 | Staff overload / duplicate entry | Staff | Templates, one-click edits, stalled-first view, audit trail | Staff console (P0) |

## Explicitly NOT solved (be honest in the pitch)
- Clinical decision-making or treatment advice
- Real-time hospital queue accuracy (mocked)
- Insurance claim processing
- Indoor positioning

## Safety note on check-ins
Red-flag answers (e.g. fever during chemo) show "Contact the hospital now" with the helpline number AND create a staff queue item. This is **not** an emergency service; the UI must say so and show the hospital's emergency number.
