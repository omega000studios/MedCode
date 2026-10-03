# 03 · Target Audience

> Personas below are **hypotheses** drawn from the problem space, not validated research. Validate with at least 1–2 conversations with an oncology navigator/nurse and a patient or caregiver before the final pitch.

## Primary user: the cancer patient (India)
- Age mostly 40–70, newly diagnosed or in treatment.
- Phone: low-to-mid range Android, often shared or hand-me-down; patchy data; WhatsApp is the main app.
- Language: Hindi/Marathi/Tamil/Bengali etc. Literacy and English fluency vary widely.
- Emotional state: anxious, overwhelmed, information-starved. Interface must be calm, never alarming.
- Often travels from another district; each extra trip costs money and wages.
- Carries paper files; unsure which report is needed next.

### Persona A — Sunita, 52 (seeded demo patient)
Homemaker, Marathi-first, basic English. Breast cancer, in chemo cycle 4. Uses WhatsApp daily, never installs new apps unless a family member helps. Needs: know where to go, what to bring, who to call.

### Persona B — Ramesh, 61
Farmer from outside the city, newly diagnosed (oral cancer). Low literacy, relies on voice and icons. Needs: fewer trips, clear next step, scheme info.

## Secondary user: the caregiver
- Usually a spouse or adult child; manages appointments, files, payments, and medicine.
- Often not at the hospital (works elsewhere) → needs status without calling.
- Needs: live status, next appointment, what's pending. Not full clinical detail.

### Persona C — Aditi, 29 (daughter of Sunita)
Works in another city, comfortable with apps. Wants WhatsApp updates and a link she can open.

## Tertiary user: hospital staff
| Role | Needs |
|---|---|
| **Patient navigator / nurse coordinator** (primary staff user) | See who is stalled, resolve holds fast, message patients |
| **Reception / OPD desk** | Update destination/token, verify documents |
| **Clinician** | Order steps, confirm prep readiness, minimal clicks |
| **Admin** | Manage pathway templates, directions, users |

Staff constraint: **no duplicate data entry.** If the console adds work, it fails.

## Accessibility requirements
- Large tap targets (min 48dp), adjustable text size, high contrast.
- Voice read-aloud on every screen; icon + short text everywhere.
- Works on low bandwidth: cached last state, offline banner, small images.
- Multi-language with Indic font support.
- Never rely on colour alone (amber/green always paired with icon + text).

## Context of use
- Hospital waiting areas (noisy, stressful), at home between cycles, in transit.
- Often one-handed, short sessions (<1 min), interrupted.

## Not our users (for MVP)
Emergency/trauma patients, inpatient bed management, billing departments, insurers/TPAs.
