# 06 · Backend

## Architecture
- **Supabase** (Postgres + Auth + Realtime + Storage + Row Level Security) is the **single source of truth**. Never use client-side stores/localStorage as truth (cache only).
- **Integration service** (Node/TypeScript, Fastify or Express — or Supabase Edge Functions) handles webhooks and third-party APIs: WhatsApp, OCR, ABHA, DigiLocker, Bhashini, scheduled jobs.
- Patient app and staff console talk to Supabase directly (RLS-protected) for reads/realtime, and to the integration service for anything involving secrets or external APIs.

```
Patient app (Expo) ─┐
Staff console (web) ─┼─> Supabase (DB, Auth, Realtime, Storage)
Caregiver page (web)─┘          ▲
                                │
              Integration service (WhatsApp, OCR, ABHA, DigiLocker, Bhashini, cron)
```

## Core data model (Postgres)
```
hospitals(id, name, helpline, emergency_number)
staff_users(id, hospital_id, name, role[navigator|reception|clinician|admin], auth_uid)
patients(id, hospital_id, auth_uid, name, age, sex, cancer_type, language, phone,
         abha_id_ref NULL, scheme_pref, medical_history jsonb, onboarding_done, created_at)
caregivers(id, patient_id, name, whatsapp, consent_at, revoked_at, link_token, link_expires_at, visible_fields jsonb)

pathway_templates(id, hospital_id, cancer_type, name)
pathway_step_templates(id, template_id, order, key, title_i18n jsonb, explain_i18n jsonb,
                       owner_role, expected_days, requires jsonb  -- prerequisite step keys / doc types
                      )
journeys(id, patient_id, template_id, started_at, status)
journey_steps(id, journey_id, step_template_id, status[pending|active|done|held|skipped],
              started_at, completed_at, owner_role, owner_staff_id NULL,
              destination text, directions_id NULL, scheduled_at NULL,
              last_confirmed_at, updated_by, updated_at)
holds(id, journey_step_id, reason_code, reason_i18n jsonb, owner_role, created_by,
      created_at, last_confirmed_at, expected_resolution NULL, resolved_at NULL, resolved_by NULL)
directions(id, hospital_id, department, steps_text_i18n jsonb, photo_path NULL)

documents(id, patient_id, journey_step_id NULL, source[upload|abha|digilocker|hospital],
          storage_path, doc_type, title, doc_date, status[processing|needs_review|verified],
          ocr_confidence, extracted jsonb, created_at)
document_requests(id, journey_step_id, doc_type, requested_by, fulfilled_doc_id NULL)

checkins(id, patient_id, date, answers jsonb, red_flag bool, handled_by NULL)
staff_queue(id, patient_id, type[stalled|red_flag|doc_review|question], payload jsonb, status, assigned_to, created_at)

notifications(id, patient_id, channel[inapp|whatsapp], template, payload, status, sent_at)
message_log(id, patient_id, caregiver_id NULL, direction, wa_message_id, body, created_at)
consents(id, patient_id, subject[caregiver|abha|digilocker|doc_share], granted_at, revoked_at, details jsonb)
audit_log(id, actor_type, actor_id, action, entity, entity_id, before jsonb, after jsonb, at)
schemes(id, name_i18n, summary_i18n, coverage_i18n, how_to_apply_i18n, eligibility_hint jsonb)  -- static content
demo_flags(entity, entity_id, is_mock bool)  -- marks mocked data (tokens, PM-JAY)
```
Every status-bearing row carries `updated_by`, `updated_at`, `last_confirmed_at`.

## Key logic
**Next-step engine** — pure function `nextStep(journey)`:
1. Find first step not done whose prerequisites (`requires`) are met.
2. If an open hold exists → return hold with reason/owner.
3. If a required document is missing → return "document needed".
4. Return step + plain-language explanation + directions.
Only reorder steps where the hospital-approved template allows it.

**Stalled detection** — cron (every 30–60 min): for `active` steps, `stalled = now > started_at + expected_days`; upsert into `staff_queue(type=stalled)`; stalled-for-N-days escalates ordering. Staleness: if `last_confirmed_at` older than threshold, UI shows "not recently confirmed".

**Hold lifecycle** — create (staff or rule) → patient/caregiver notified → resolve (staff) → step status updates → notifications → audit entry.

**Realtime** — subscribe to `journey_steps`, `holds`, `documents` filtered by patient on the app; to `staff_queue` on console. On reconnect, refetch + resume. Show "Updated X min ago" and offline banner.

## Auth
- **Patients:** phone OTP. Note: SMS OTP in India needs a provider and DLT registration (e.g. MSG91/Twilio) → lead time; fallback: WhatsApp OTP or a fixed demo OTP in dev.
- **Staff:** email + password/OTP with role claims.
- **Caregiver:** signed, expiring link token (no login); revocable.
- RLS: patient sees own rows; caregiver link sees only `visible_fields`; staff sees their hospital's patients by role.

## Integrations
| Integration | Approach | MVP status |
|---|---|---|
| **WhatsApp Cloud API** | Webhook + sender. Business-initiated messages must use **pre-approved templates** (approval takes time; submit early). Free-form allowed only within 24h of user reply. Templates: step update, hold created/resolved, reminder, document needed, caregiver status. | Real |
| **OCR (Sarvam AI document/vision API; fallback Google Vision/Tesseract)** | Async job on upload: extract text → classify doc_type/date/lab → confidence. < threshold → `needs_review` + staff queue. Verify current Sarvam API access, pricing, language/handwriting support before committing. | Real |
| **Bhashini** | Proxy translate + TTS through the service (keeps keys server-side); cache translations; fall back to device TTS. Pathway text is pre-translated where possible. | Real |
| **ABHA (ABDM sandbox)** | ABHA create/link, consent-based record fetch. Store only a reference + consent log, never raw ID numbers beyond what's needed. Check sandbox onboarding steps/timeline. | Real (sandbox) |
| **DigiLocker** | OAuth fetch of identity docs; store as documents, never ask for Aadhaar/PAN numbers. Check partner/requester onboarding requirements. | Real if access works; else mock |
| **PM-JAY eligibility** | Mocked service returning plausible results; UI tag "Demo". | Mocked |
| **Queue/token** | Mocked token + wait, staff-adjustable. | Mocked |

## API surface (integration service, REST)
```
POST /otp/send, /otp/verify            (if not using Supabase phone auth)
POST /documents/:id/ocr                trigger/retry OCR
POST /documents/fetch/abha | /digilocker
POST /translate  { text, to }          Bhashini
POST /tts        { text, lang }        Bhashini TTS -> audio url
POST /holds                            create hold (staff)
POST /holds/:id/resolve
POST /notify     { patient_id, template, payload }   -> WhatsApp + in-app
GET  /caregiver/:token                 read-only status
POST /caregiver/:id/revoke
POST /webhooks/whatsapp                inbound + delivery status
POST /checkins                         + red-flag handling
GET  /schemes?lang=
POST /mock/pmjay-eligibility
```

## Scheduled jobs
- Stalled detection · reminder sends (respect quiet hours) · stale-status flag · caregiver link expiry cleanup · OCR retry.

## Security & privacy (DPDP Act 2023 mindset)
- Explicit, logged **consent** for caregiver, ABHA, DigiLocker, doc sharing; revocable.
- Encrypt at rest/in transit; private Storage buckets with signed URLs; short TTL.
- No Aadhaar/PAN numbers stored; health data minimised in WhatsApp messages (no diagnoses or report contents in message text, just "Open the app").
- Audit log for all staff reads/edits of patient data.
- Data export + delete in Me → Privacy.
- Verify current regulatory requirements (DPDP rules, ABDM policies) before any real deployment; this MVP uses demo data only.

## Seed data (for demo)
- 1 hospital, 1 pathway template (breast), 2 staff users, 6–8 patients across steps.
- **Sunita Deshmukh** (cycle 4 infusion, healthy path), **a stalled patient** (pathology pending 6 days), **a held patient** (doc missing), plus 1 caregiver link.
- Scripted exceptions: delayed report, hold created+resolved live, reconnect after offline, OCR low-confidence review.
