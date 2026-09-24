# Patient Navigation & Access Dashboard — build plan

Health-a-thon 2026, Track 2, Use Case 8. Covers Cancer Care, Diabetes Care, and Maternal & Child Health.

## Core idea

The design brief specifies the patient-facing dashboard in full detail, but a patient's screen can only show what a hospital staff member has entered. The product only works if there's a doctor/staff console feeding it — that's the half this plan adds.

## 1. Patient experience

- **Journey tracker** — single stepper showing current stage, live across the general and specialist-extended pathway
- **What's next card** — the doctor's consult turned into a plain-language card, in the patient's chosen language
- **Insurance & docs** — claim status tracker + a vault so referral letters, scans and reports travel with the patient automatically

## 2. Doctor / staff console

- **Queue view** — every active patient, current stage, token/wait time. What front desk and doctors check all day.
- **Structured consult form** — dropdowns and checkboxes for diagnosis category, tests ordered, next department, prep instructions (fasting, documents to bring). Structured input, not free text — this is what lets the "what's next" card generate itself with no parsing required.
- **One-tap status updates** — diagnostics staff mark test stages, billing marks insurance confirmed. Each tap advances the patient's tracker live.

## 3. How they connect

One shared patient-journey record. Staff console writes to it; patient app subscribes and re-renders live. No manual sync step, no polling required if using a real-time backend.

```json
{
  "patientId": "",
  "currentStage": "",
  "stageHistory": [],
  "nextStepCard": {
    "summary": "",
    "sendTo": "",
    "bring": [],
    "estWait": ""
  },
  "ordersPending": [],
  "insuranceStatus": "",
  "documents": [],
  "language": "en"
}
```

## 4. Screens to build

**Patient app**
1. Journey tracker (home screen)
2. What's next card
3. Insurance & documents

**Staff console**
1. Patient queue
2. Consult form (doctor)
3. Status update panel (diagnostics + billing)

## 5. Tech stack

- Frontend: React + Tailwind, shared component library across both apps
- Backend/data: Firebase or Supabase for real-time sync — avoids building a custom backend in 5 weeks
- Auth: simple role-based login (patient / staff), can be minimal for a demo
- Queue: mocked token feed; real ABDM/hospital integration is out of scope for the sprint

## 6. Build order (5 weeks)

| Week | Focus | Notes |
|---|---|---|
| 1 | Data model + journey tracker | Shared JSON schema, Firebase/Supabase wiring, patient tracker screen on mock data |
| 2 | Staff console + consult form → what's next card | Core demo moment: consult form input updates patient's card live |
| 3 | Live queue sync + diagnostics/billing updates | Mock token feed; one-tap stage updates from staff |
| 4 | Document vault + multilingual toggle | English/Hindi/Marathi via pre-translated strings |
| 5 | Insurance stub + caregiver view + polish | Both cheap once core exists; remaining time on bug fixes and demo rehearsal |

## 7. Demo script

Show both screens side by side. A judge (playing doctor) fills the consult form on the console; the patient's phone updates in real time with the next-step card. That single moment demonstrates the whole product.

## 8. Open items

- Confirm with the hackathon's healthcare partner which P0 modules are realistic to demo as a working prototype
- Scope insurance tracker and caregiver access as roadmap, not sprint work, per the brief's own priority table
