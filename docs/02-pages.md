# 02 · Pages & Screens

## Patient app (React Native / Expo)

### Auth + Onboarding (one question per screen, ~2 min, skippable where marked)
| # | Screen | Collects |
|---|---|---|
| 0 | Splash / Welcome | — |
| 1 | Language | App language (Bhashini-supported) |
| 2 | Phone + OTP | Login |
| 3 | About you | Name, age, sex, cancer type |
| 4 | Medical history | Chips (conditions, allergies, medicines, past procedures) + optional voice note |
| 5 | Scheme / insurance | Pick from list or "not sure" (feeds Schemes card) |
| 6 | Caregiver (skippable) | Name, WhatsApp number, consent toggle |
| 7 | Reminders | WhatsApp on/off, quiet hours |
| 8 | Link accounts (skippable) | ABHA, DigiLocker |
| 9 | All set | Illustration + "Go to Today" |

Rules: progress dots, back always possible, answers autosave per screen, voice read-aloud on every screen. No ID numbers typed (Aadhaar/PAN come via DigiLocker only).

### Main tabs (bottom nav: Today · Journey · Documents · Me)

**Today** (single scrollable screen)
1. Header: avatar, greeting, language toggle, bell, "Updated X min ago"
2. Status banner (on track / on hold + reason)
3. Hero card stack (max 4): Next step → Get ready → Document needed → Daily check-in → Scheme prompt
4. Token + wait tile (visit days only; mocked)
5. Today's timeline (3–4 rows)
6. Care team tile (call / WhatsApp)
7. Quick actions: Upload, Check-in, Ask staff, Share with caregiver
8. Info strip (horizontal): Schemes, daily tip, hospital notice
States: Visit day · Between visits · On hold · All done (never empty)

**Journey**
- Progress header ("Step 3 of 7", "Day 18")
- Vertical timeline: Done (green) / Now (expanded) / Next (greyed)
- Hold state: amber, reason + owner + last confirmed + Contact staff
- Cycle view: tiles per cycle during treatment
- Footer: next appointment + add to calendar
- Tap a step → bottom sheet: plain-language explanation, listen button, related docs, contact

**Documents**
- "Needed now" banner (if requested)
- Add row: Scan · Fetch (DigiLocker/ABHA) · Upload
- Filter chips: All, Reports, Scans, Prescriptions, Bills
- Document cards: thumbnail, auto-title, date, source, status (Verified / Processing / Needs review), linked step
- Empty state with illustration
- Detail screen: preview, extracted fields, share (consent), download, delete, listen

**Me**
- Profile card (name, age, cancer type, patient ID, ABHA, doctor)
- Rows: Health summary (editable) · Caregivers · Linked accounts · Insurance & schemes · Reminders · Language & voice (incl. text size) · Help · Privacy (export/delete, consent log) · Log out

### Secondary screens
- Notifications list (behind bell)
- Scan flow (camera → crop → OCR confirm → attach)
- Check-in flow (3–5 questions, red-flag result screen with "Contact staff now")
- Schemes detail (list of schemes, what they cover, how to apply)
- Caregiver management (add, permissions, revoke)
- Directions sheet (staff-written steps + optional photo)
- Offline / Error states

## Caregiver view (web, read-only link)
Single page: patient first name, current step, hold status, next appointment, last updated. No documents unless the patient explicitly shares. Link has expiry + revoke.

## Staff console (web)
Sidebar: **Patients · Stalled · Holds · Messages · Reports · Settings**. Top: global search (name/ID), notifications, staff name/role.

| Page | Purpose |
|---|---|
| Login | Staff email/OTP, role-based |
| Patients (list) | Filter by pathway step, status, owner; stalled first; "Demo data" tags |
| Stalled | Days past expected time, sortable; one-click "nudge patient" / "assign" |
| Patient detail | Timeline, edit step/status/destination/hold reason, documents (verify OCR), messages, audit trail |
| Holds | Open holds by owner; resolve in 2 clicks |
| Doc review queue | Low-confidence OCR → confirm/correct |
| Messages | Templates + sent log (WhatsApp) |
| Pathway templates | Edit steps, owners, expected days, patient-facing text per language |
| Directions | Per-department text + photo |
| Reports | Stalled count, avg days per step (demo metrics) |
| Settings | Staff users/roles, WhatsApp templates, schemes content |

Every status shows: owner, updated_by, last confirmed time.
