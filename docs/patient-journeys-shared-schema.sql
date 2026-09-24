-- Shared patient object for the patient and doctor applications.
-- This migration is additive so the current prototype columns remain available
-- while the backend moves from the old names to the shared contract.

alter table public.patient_journeys
  add column if not exists name text,
  add column if not exists token text,
  add column if not exists care_type text,
  add column if not exists current_stage_index integer not null default 0,
  add column if not exists stages jsonb not null default '[]'::jsonb,
  add column if not exists next_step jsonb not null default '{}'::jsonb,
  add column if not exists estimated_wait integer not null default 0,
  add column if not exists prep_checklist jsonb not null default '[]'::jsonb,
  add column if not exists fasting_question jsonb not null default '{"asked": false, "answer": null}'::jsonb,
  add column if not exists orders jsonb not null default '[]'::jsonb,
  add column if not exists insurance jsonb not null default '{}'::jsonb,
  add column if not exists milestones jsonb not null default '[]'::jsonb;

alter table public.patient_journeys
  add constraint patient_journeys_current_stage_index_nonnegative
  check (current_stage_index >= 0);

alter table public.patient_journeys
  add constraint patient_journeys_fasting_question_shape
  check (
    jsonb_typeof(fasting_question) = 'object'
    and (fasting_question ? 'asked')
    and (fasting_question ->> 'answer' is null
      or fasting_question ->> 'answer' in ('fasted', 'ate'))
  );

create index if not exists patient_journeys_patient_id_idx
  on public.patient_journeys (patient_id);

create index if not exists patient_journeys_current_stage_idx
  on public.patient_journeys (current_stage_index);

-- Recommended contract for the JSON columns:
-- stages: [{"name":"Doctor consultation","status":"current","time":"10:10 AM"}]
-- next_step: {"title":"...","location":"...","floorTape":"Yellow","actions":["How to get there","Listen","I've arrived"]}
-- prep_checklist: [{"label":"...","done":true}]
-- fasting_question: {"asked":true,"answer":null}
-- orders: [{"name":"...","location":"...","ref":"...","cost":"₹1,450","coverage":"Covered","status":"Ordered"}]
-- insurance: {"provider":"...","claimId":"...","preAuthApproved":false,"patientCoPay":"₹0","policy":"...","status":"..."}
-- milestones: [{"label":"...","done":false,"time":null}]
-- documents: [{"name":"...","meta":"24 Sep 2026 · 1.4 MB"}]

-- Before enabling production writes, add RLS policies tied to your auth model.
-- Do not expose this table to anonymous update requests: doctors should be
-- allowed to update their assigned queue, while patients should only read
-- their own patient_id.
